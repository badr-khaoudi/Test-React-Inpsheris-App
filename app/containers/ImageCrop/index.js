/**
 *
 * ImageCrop
 *
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectCropImage } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { cropImage, cleanCropImage } from './actions';

export function ImageCrop(props) {
  useInjectReducer({ key: 'imageCrop', reducer });
  useInjectSaga({ key: 'imageCrop', saga });

  const {
    handleClose,
    image,
    imageMap,
    cropImage: cropImageResult,
    dispatchCropImage,
    dispatchCleanCropImage,
    handleImageCrop,
  } = props;

  useEffect(() => () => dispatchCleanCropImage(), []);

  useEffect(() => {
    if (cropImageResult.uid) {
      handleImageCrop(cropImageResult);
      handleClose();
    }
  }, [cropImageResult]);

  const [images, setImages] = useState(imageMap);

  const handleOkay = () => {
    dispatchCropImage({
      images: _.map(images, ({ crop, resize }) => ({
        width: crop.width / crop.widthConversionUnitValue,
        height: crop.height / crop.heightConversionUnitValue,
        left: crop.x / crop.widthConversionUnitValue,
        top: crop.y / crop.heightConversionUnitValue,
        resize,
      })),
      path: image.url,
      uid: image.uid,
    });
  };

  const onImageLoaded = useCallback(
    (key, reactCropImage) => {
      const widthConversionUnitValue =
        reactCropImage.width / reactCropImage.naturalWidth;
      const heightConversionUnitValue =
        reactCropImage.height / reactCropImage.naturalHeight;
      const minWidth = images[key].crop.minWidth * widthConversionUnitValue;
      const minHeight = images[key].crop.minHeight * heightConversionUnitValue;
      setImages({
        ...images,
        [key]: {
          ...images[key],
          crop: {
            ...images[key].crop,
            width: minWidth,
            height: minHeight,
            x: (reactCropImage.width - minWidth) / 2,
            y: (reactCropImage.height - minHeight) / 2,
            widthConversionUnitValue,
            heightConversionUnitValue,
          },
          minWidth,
          minHeight,
        },
      });
      return false;
    },
    [images],
  );

  return (
    <Dialog open onClose={handleClose} scroll="body" fullWidth maxWidth="md">
      <DialogTitle>
        Image Crop
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{ position: 'absolute', top: 5, right: 5 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          {_.map(imageMap, (img, key) => (
            <Grid item xs={12} key={key}>
              <Typography>{img.title}</Typography>
              <ReactCrop
                src={image.url}
                crop={images[key].crop}
                onChange={c =>
                  setImages({
                    ...images,
                    [key]: {
                      ...images[key],
                      crop: { ...images[key].crop, ...c },
                    },
                  })
                }
                onImageLoaded={reactCropImage =>
                  onImageLoaded(key, reactCropImage)
                }
                minWidth={images[key].minWidth}
                minHeight={images[key].minHeight}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={handleOkay}>
          Okay
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ImageCrop.propTypes = {
  handleClose: PropTypes.func,
  image: PropTypes.object,
  imageMap: PropTypes.object,
  cropImage: PropTypes.object,
  dispatchCropImage: PropTypes.func,
  dispatchCleanCropImage: PropTypes.func,
  handleImageCrop: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  cropImage: makeSelectCropImage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCropImage: options => dispatch(cropImage(options)),
    dispatchCleanCropImage: () => dispatch(cleanCropImage()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ImageCrop);

/* eslint-disable indent */
/**
 *
 * CreatePin
 *
 */

import React, { memo, useEffect, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useSnackbar } from 'notistack';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Close, Image } from '@material-ui/icons';
import Dropzone from 'react-dropzone';
import ReactPlayer from 'react-player';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { checkFavicon } from 'utils/helpers/checkFavicon';
import { transformImage } from 'utils/helpers/transformBlock';
import { Thumbnail } from 'components/FeedTypes/Wrapper';
import { BlockButton } from 'containers/ContentCreation/Wrapper';
import ImageCrop from 'containers/ImageCrop/Loadable';
import { LinkEmbed } from 'components/FeedTypes';
import DocumentBlock from 'containers/DocumentBlock/Loadable';
import {
  makeSelectPinnedPostType,
  makeSelectUploadFile,
  makeSelectCreatePinnedPostSuccess,
  makeSelectEmbedUrl,
  makeSelectOEmbed,
  makeSelectOEmbedError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  pinnedPostType as pinnedPostTypeAction,
  uploadFile as uploadFileAction,
  createPinnedPost,
  editPinnedPost,
  getEmbedUrl,
  getOEmbed,
  cleanCreatePin,
} from './actions';
import { CreatePinSchema } from './Schema';
// import messages from './messages';

const imageDimensions = {
  thumb: {
    title: '',
    crop: {
      unit: 'px',
      minWidth: 150,
      minHeight: 150,
      aspect: 150 / 150,
    },
    resize: { width: 150, height: 150 },
  },
};

const transformVideo = video => ({
  description: video.description,
  embedVideo: video.html,
  embedVideoTitle: video.title,
  thumbUrl: video.thumbnail_url,
  url: video.url,
});

const transformLink = async link => {
  let { favicon } = link;
  if (favicon === undefined) {
    const result = await checkFavicon(`${link.provider_url}/favicon.ico`);
    if (result.status === 'Ok') {
      favicon = result.path;
    }
  }
  return {
    description: link.description,
    favicon,
    location: link.url,
    path: link.url,
    subTitle: link.provider_name,
    thumbnail_height: link.thumbnail_height,
    thumbnail_url: link.thumbnail_url,
    thumbnail_width: link.thumbnail_width,
    title: link.title,
    type: link.type,
    version: link.version,
  };
};

export function CreatePin(props) {
  useInjectReducer({ key: 'createPin', reducer });
  useInjectSaga({ key: 'createPin', saga });

  const { enqueueSnackbar } = useSnackbar();

  const {
    open,
    handleClose,
    dispatchPinnedPostType,
    dispatchUploadFile,
    dispatchCreatePinnedPost,
    dispatchEditPinnedPost,
    pinnedPostType,
    uploadFile,
    createPinnedPostSuccess,
    dispatchGetEmbedUrl,
    dispatchGetOEmbed,
    dispatchCleanCreatePin,
    embedUrl,
    oEmbed,
    oEmbedError,
    pinnedPost,
  } = props;

  const [pinType, setPinType] = useState('');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [image, setImage] = useState({});
  const [imageCropOpen, setImageCropOpen] = useState(false);

  useEffect(() => {
    if (_.isEmpty(pinnedPostType)) {
      dispatchPinnedPostType();
    }
    return () => dispatchCleanCreatePin();
  }, []);

  useEffect(() => {
    if (!_.isEmpty(pinnedPostType)) {
      if (_.isEmpty(pinnedPost)) {
        setPinType(_.head(pinnedPostType));
      }
      if (!_.isEmpty(pinnedPost)) {
        setPinType(pinnedPost.pinType);
        setTitle(pinnedPost.title || '');
        setDescription(pinnedPost.description || '');
        setImages(pinnedPost.images || []);
        setImage(pinnedPost.image || {});
      }
    }
  }, [pinnedPostType, pinnedPost]);

  useEffect(() => {
    if (pinType === 'Link') {
      dispatchGetEmbedUrl({ name: 'EMBED_URL' });
    }
  }, [pinType]);

  useEffect(() => {
    if (url) {
      dispatchGetOEmbed({ url, key: embedUrl.key });
    }
  }, [url]);

  useEffect(() => {
    if (pinType === 'Video' && oEmbed.type && oEmbed.type !== 'video') {
      enqueueSnackbar('Invalid Video', {
        variant: 'error',
      });
    }
  }, [oEmbed]);

  useEffect(() => {
    if (oEmbedError)
      enqueueSnackbar(oEmbedError, {
        variant: 'error',
      });
  }, [oEmbedError]);

  const oEmbedData = useMemo(
    () => ({ url: oEmbed.url ? oEmbed.url : url, ...oEmbed }),
    [oEmbed],
  );

  const handleOnDrop = useCallback(files => {
    const file = _.head(files);
    const formData = new FormData();
    formData.append('fileName', file.name);
    formData.append('file', file);
    dispatchUploadFile(formData);
  }, []);

  useEffect(() => {
    if (!_.isEmpty(uploadFile)) {
      setImageCropOpen(true);
    }
  }, [uploadFile]);

  const handleImageCrop = cropImage => {
    setImage({
      ...cropImage,
      originalUrl: cropImage.urls[0],
      url: `${cropImage.urls[1]}/?t=${moment().format('x')}`,
    });
  };

  const handleImageCropClose = () => {
    setImageCropOpen(false);
  };

  useEffect(() => {
    if (createPinnedPostSuccess) {
      enqueueSnackbar('Success', { variant: 'success' });
      handleClose();
    }
  }, [createPinnedPostSuccess]);

  const handleSave = async () => {
    let payload = { pinType };
    if (pinType === 'Link') {
      const link = await transformLink(oEmbedData);
      payload = { ...payload, link };
    }
    if (pinType === 'Video') {
      const video = transformVideo(oEmbedData);
      payload = { ...payload, video };
    }
    if (pinType === 'Text') {
      payload = {
        ...payload,
        imageUid: !_.isEmpty(image) ? image.uid : undefined,
        title,
        description,
      };
    }
    if (pinType === 'ImageGallery') {
      payload = {
        ...payload,
        images: _.map(images, img => transformImage(img)),
        title,
        description,
      };
    }
    const result = CreatePinSchema.validate(payload);
    if (result.error) {
      enqueueSnackbar(`${result.error}`, {
        variant: 'error',
      });
    }
    if (!result.error) {
      if (_.isEmpty(pinnedPost)) {
        dispatchCreatePinnedPost(payload);
      }
      if (!_.isEmpty(pinnedPost)) {
        dispatchEditPinnedPost(payload);
      }
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="body"
        fullWidth
        maxWidth="md"
        disableEnforceFocus
      >
        <DialogTitle>
          {_.isEmpty(pinnedPost) ? 'Create ' : 'Edit '}Pin
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
            <Grid item xs={12}>
              <TextField
                label="Pin Type"
                variant="outlined"
                fullWidth
                size="small"
                select
                value={pinType}
                onChange={e => setPinType(e.target.value)}
              >
                {_.map(pinnedPostType, type => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {(pinType === 'Link' || pinType === 'Video') && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="URL"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  {pinType === 'Video' && oEmbedData.type === 'video' && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <ReactPlayer
                        style={{ background: '#000000' }}
                        url={oEmbedData.url}
                      />
                    </div>
                  )}
                  {pinType === 'Link' && oEmbedData.type && (
                    <LinkEmbed
                      links={[
                        {
                          path: oEmbedData.url,
                          thumbnail_url: oEmbedData.thumbnail_url,
                          title: oEmbedData.title,
                          description: oEmbedData.description,
                        },
                      ]}
                    />
                  )}
                </Grid>
              </>
            )}
            {(pinType === 'Text' || pinType === 'ImageGallery') && (
              <>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    {pinType === 'Text' && (
                      <Grid item xs={4}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Thumbnail style={{ color: 'inherit' }}>
                              <Dropzone
                                accept="image/png, image/jpg, image/gif, image/jpeg"
                                maxFiles={1}
                                onDrop={handleOnDrop}
                              >
                                {({ getRootProps, getInputProps }) => (
                                  <BlockButton
                                    style={
                                      _.isEmpty(image)
                                        ? {
                                            backgroundColor: '#eceeef',
                                            border:
                                              '1px solid rgba(0, 0, 0, 0.12)',
                                          }
                                        : {}
                                    }
                                    {...getRootProps()}
                                  >
                                    <input {...getInputProps()} />
                                    {_.isEmpty(image) ? (
                                      <>
                                        <Image fontSize="large" />
                                        <Typography>
                                          Upload Pin Image
                                        </Typography>
                                      </>
                                    ) : (
                                      <img
                                        src={image.url}
                                        alt={image.title}
                                        width="100%"
                                      />
                                    )}
                                  </BlockButton>
                                )}
                              </Dropzone>
                            </Thumbnail>
                          </Grid>
                          {!_.isEmpty(image) && (
                            <Grid item xs={12}>
                              <Grid container spacing={2}>
                                <Grid item xs={6}>
                                  <Button
                                    variant="outlined"
                                    fullWidth
                                    color="primary"
                                    onClick={() => setImageCropOpen(true)}
                                  >
                                    Recrop Image
                                  </Button>
                                </Grid>
                                <Dropzone
                                  accept="image/png, image/jpg, image/gif, image/jpeg"
                                  maxFiles={1}
                                  onDrop={handleOnDrop}
                                >
                                  {({ getRootProps, getInputProps }) => (
                                    <Grid item xs={6} {...getRootProps()}>
                                      <input {...getInputProps()} />
                                      <Button
                                        variant="outlined"
                                        fullWidth
                                        color="primary"
                                      >
                                        Update Image
                                      </Button>
                                    </Grid>
                                  )}
                                </Dropzone>
                              </Grid>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                    )}
                    <Grid item xs>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            label="Title"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="Description"
                            variant="outlined"
                            fullWidth
                            size="small"
                            multiline
                            rows={3}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            )}
            {pinType === 'ImageGallery' && (
              <Grid item xs={12}>
                <DocumentBlock
                  type="Images"
                  id="createPin"
                  items={images}
                  setItems={setImages}
                />
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {imageCropOpen && (
        <ImageCrop
          image={
            !_.isEmpty(uploadFile)
              ? _.head(uploadFile)
              : { ...image, url: image.originalUrl }
          }
          handleClose={handleImageCropClose}
          handleImageCrop={handleImageCrop}
          imageMap={imageDimensions}
        />
      )}
    </>
  );
}

CreatePin.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  dispatchPinnedPostType: PropTypes.func,
  dispatchUploadFile: PropTypes.func,
  dispatchCreatePinnedPost: PropTypes.func,
  dispatchEditPinnedPost: PropTypes.func,
  pinnedPostType: PropTypes.array,
  uploadFile: PropTypes.array,
  createPinnedPostSuccess: PropTypes.bool,
  dispatchGetEmbedUrl: PropTypes.func,
  dispatchGetOEmbed: PropTypes.func,
  dispatchCleanCreatePin: PropTypes.func,
  embedUrl: PropTypes.object,
  oEmbed: PropTypes.object,
  oEmbedError: PropTypes.string,
  pinnedPost: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  pinnedPostType: makeSelectPinnedPostType(),
  uploadFile: makeSelectUploadFile(),
  createPinnedPostSuccess: makeSelectCreatePinnedPostSuccess(),
  embedUrl: makeSelectEmbedUrl(),
  oEmbed: makeSelectOEmbed(),
  oEmbedError: makeSelectOEmbedError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchPinnedPostType: () => dispatch(pinnedPostTypeAction()),
    dispatchUploadFile: formData => dispatch(uploadFileAction(formData)),
    dispatchCreatePinnedPost: options => dispatch(createPinnedPost(options)),
    dispatchEditPinnedPost: options => dispatch(editPinnedPost(options)),
    dispatchGetEmbedUrl: options => dispatch(getEmbedUrl(options)),
    dispatchGetOEmbed: options => dispatch(getOEmbed(options)),
    dispatchCleanCreatePin: () => dispatch(cleanCreatePin()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CreatePin);

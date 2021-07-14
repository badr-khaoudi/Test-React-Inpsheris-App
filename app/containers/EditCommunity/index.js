/* eslint-disable indent */
/**
 *
 * EditCommunity
 *
 */

import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import Dropzone from 'react-dropzone';
import moment from 'moment';
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
import { Close, Image } from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Thumbnail } from 'components/FeedTypes/Wrapper';
import { BlockButton } from 'containers/ContentCreation/Wrapper';
import ImageCrop from 'containers/ImageCrop/Loadable';
import { Header } from 'containers/CommunityHome/Wrapper';
import { closeEditCommunityImage } from 'containers/AuthBase/actions';
import { makeSelectCommunity } from 'containers/GlobalEntities/selectors';
import {
  makeSelectUploadFile,
  makeSelectChangeImageLoading,
  makeSelectChangeImageSuccess,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { uploadFile, changeImage, cleanEditCommunity } from './actions';

export function EditCommunity(props) {
  useInjectReducer({ key: 'editCommunity', reducer });
  useInjectSaga({ key: 'editCommunity', saga });

  const theme = useTheme();
  const {
    communityUid,
    dispatchCloseEditCommunityImage,
    dispatchUploadFile,
    logoImage,
    bannerImage,
    community,
    dispatchChangeImage,
    changeImageLoading,
    changeImageSuccess,
    dispatchCleanEditCommunity,
  } = props;

  const [logo, setLogo] = useState({});
  const [banner, setBanner] = useState({});
  const [logoCropOpen, setLogoCropOpen] = useState(false);
  const [bannerCropOpen, setBannerCropOpen] = useState(false);

  useEffect(() => {
    if (!_.isEmpty(community)) {
      setLogo({
        logoUid: community.logoUid,
        logoUrl: community.logoUrl,
        headerLogoUrl: community.headerLogoUrl,
      });
      setBanner({
        bannerUid: community.bannerUid,
        bannerUrl: community.bannerUrl,
        headerBannerUrl: community.headerBannerUrl,
      });
    }
  }, [community]);

  const handleOnDrop = useCallback((field, files) => {
    const file = _.head(files);
    const formData = new FormData();
    formData.append('fileName', file.name);
    formData.append('file', file);
    dispatchUploadFile(field, formData);
  }, []);

  useEffect(() => {
    if (!_.isEmpty(logoImage)) {
      setLogoCropOpen(true);
    }
  }, [logoImage]);

  useEffect(() => {
    if (!_.isEmpty(bannerImage)) {
      setBannerCropOpen(true);
    }
  }, [bannerImage]);

  const handleLogoCrop = cropImage => {
    setLogo({
      ...cropImage,
      logoUid: cropImage.uid,
      logoUrl: cropImage.urls[0],
      headerLogoUrl: `${cropImage.urls[1]}/?t=${moment().format('x')}`,
    });
  };

  const handleBannerCrop = cropImage => {
    setBanner({
      ...cropImage,
      bannerUid: cropImage.uid,
      bannerUrl: cropImage.urls[0],
      headerBannerUrl: `${cropImage.urls[1]}/?t=${moment().format('x')}`,
    });
  };

  const handlePublish = () => {
    dispatchChangeImage(
      { uid: communityUid },
      {
        logo: !_.isEmpty(logo) ? logo.logoUid : undefined,
        banner: !_.isEmpty(banner) ? banner.bannerUid : undefined,
      },
    );
  };

  useEffect(() => {
    if (changeImageSuccess) {
      dispatchCloseEditCommunityImage();
    }
  }, [changeImageSuccess]);

  useEffect(() => dispatchCleanEditCommunity, []);

  return (
    <>
      <Helmet>
        <title>EditCommunity</title>
        <meta name="description" content="Description of EditCommunity" />
      </Helmet>
      <Dialog open scroll="paper" fullWidth maxWidth="lg" disableEnforceFocus>
        <DialogTitle>
          Edit Community
          <IconButton
            aria-label="close"
            onClick={dispatchCloseEditCommunityImage}
            style={{ position: 'absolute', top: 5, right: 5 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2} justify="center">
                <Grid item xs={3}>
                  <Thumbnail style={{ color: 'inherit' }}>
                    <Dropzone
                      accept="image/png, image/jpg, image/gif, image/jpeg"
                      maxFiles={1}
                      onDrop={acceptedFiles =>
                        handleOnDrop('logoImage', acceptedFiles)
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <BlockButton
                          style={
                            !logo.headerLogoUrl
                              ? {
                                  backgroundColor: '#eceeef',
                                  border: '1px solid rgba(0, 0, 0, 0.12)',
                                }
                              : {}
                          }
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
                          {!logo.headerLogoUrl ? (
                            <>
                              <Image fontSize="large" />
                              <Typography>Upload Logo Image</Typography>
                            </>
                          ) : (
                            <img
                              src={logo.headerLogoUrl}
                              alt="Logo"
                              width="100%"
                            />
                          )}
                        </BlockButton>
                      )}
                    </Dropzone>
                  </Thumbnail>
                </Grid>
                {logo.headerLogoUrl && (
                  <Grid item xs={12}>
                    <Grid container spacing={2} justify="center">
                      <Grid item xs={3}>
                        <Button
                          variant="outlined"
                          fullWidth
                          color="primary"
                          onClick={() => setLogoCropOpen(true)}
                        >
                          Recrop Image
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} justify="center">
                <Grid item xs={12}>
                  <Header>
                    <Dropzone
                      accept="image/png, image/jpg, image/gif, image/jpeg"
                      maxFiles={1}
                      onDrop={acceptedFiles =>
                        handleOnDrop('bannerImage', acceptedFiles)
                      }
                    >
                      {({ getRootProps, getInputProps }) => (
                        <BlockButton
                          style={
                            !banner.headerBannerUrl
                              ? {
                                  backgroundColor: '#eceeef',
                                  border: '1px solid rgba(0, 0, 0, 0.12)',
                                }
                              : {}
                          }
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
                          {!banner.headerBannerUrl ? (
                            <>
                              <Image fontSize="large" />
                              <Typography>Upload Banner Image</Typography>
                            </>
                          ) : (
                            <img
                              src={banner.headerBannerUrl}
                              alt="Banner"
                              width="100%"
                            />
                          )}
                        </BlockButton>
                      )}
                    </Dropzone>
                  </Header>
                </Grid>
                {banner.headerBannerUrl && (
                  <Grid item xs={3}>
                    <Button
                      variant="outlined"
                      fullWidth
                      color="primary"
                      onClick={() => setBannerCropOpen(true)}
                    >
                      Recrop Image
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handlePublish}
            variant="outlined"
            color="primary"
            disabled={changeImageLoading}
          >
            Publish
          </Button>
        </DialogActions>
      </Dialog>
      {logoCropOpen && (
        <ImageCrop
          image={
            !_.isEmpty(logoImage)
              ? _.head(logoImage)
              : { url: logo.logoUrl, uid: logo.logoUid }
          }
          handleClose={() => setLogoCropOpen(false)}
          handleImageCrop={handleLogoCrop}
          imageMap={theme.imageMap.logoDimensions}
        />
      )}
      {bannerCropOpen && (
        <ImageCrop
          image={
            !_.isEmpty(bannerImage)
              ? _.head(bannerImage)
              : {
                  url: banner.bannerUrl,
                  uid: banner.bannerUid,
                }
          }
          handleClose={() => setBannerCropOpen(false)}
          handleImageCrop={handleBannerCrop}
          imageMap={theme.imageMap.communityBanner}
        />
      )}
    </>
  );
}

EditCommunity.propTypes = {
  communityUid: PropTypes.string,
  dispatchCloseEditCommunityImage: PropTypes.func,
  dispatchUploadFile: PropTypes.func,
  logoImage: PropTypes.array,
  bannerImage: PropTypes.array,
  community: PropTypes.object,
  dispatchChangeImage: PropTypes.func,
  changeImageLoading: PropTypes.bool,
  changeImageSuccess: PropTypes.bool,
  dispatchCleanEditCommunity: PropTypes.func,
};

const mapStateToProps = (state, props) =>
  createStructuredSelector({
    logoImage: makeSelectUploadFile('logoImage'),
    bannerImage: makeSelectUploadFile('bannerImage'),
    changeImageLoading: makeSelectChangeImageLoading(),
    changeImageSuccess: makeSelectChangeImageSuccess(),
    community: makeSelectCommunity(props.communityUid),
  });

function mapDispatchToProps(dispatch) {
  return {
    dispatchUploadFile: (field, options) =>
      dispatch(uploadFile(field, options)),
    dispatchCloseEditCommunityImage: () => dispatch(closeEditCommunityImage()),
    dispatchChangeImage: (params, options) =>
      dispatch(changeImage(params, options)),
    dispatchCleanEditCommunity: () => dispatch(cleanEditCommunity()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EditCommunity);

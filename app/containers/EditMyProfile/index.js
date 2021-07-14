/* eslint-disable indent */
/**
 *
 * EditMyProfile
 *
 */

import React, { memo, useState, useEffect, useCallback } from 'react';
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
  Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Close, Image } from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Thumbnail } from 'components/FeedTypes/Wrapper';
import { BlockButton } from 'containers/ContentCreation/Wrapper';
import ImageCrop from 'containers/ImageCrop/Loadable';
import { Header } from 'containers/CommunityHome/Wrapper';
import {
  makeSelectUploadFile,
  makeSelectChangePhotoLoading,
  makeSelectChangePhotoSuccess,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  uploadFile as uploadFileAction,
  changePhoto,
  cleanEditMyProfile,
} from './actions';
// import messages from './messages';

export function EditMyProfile(props) {
  useInjectReducer({ key: 'editMyProfile', reducer });
  useInjectSaga({ key: 'editMyProfile', saga });

  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const {
    open,
    handleClose,
    user,
    dispatchUploadFile,
    bannerImageFile,
    logoImageFile,
    dispatchChangePhoto,
    dispatchCleanEditMyProfile,
    changePhotoLoading,
    changePhotoSuccess,
  } = props;

  const [bannerCropOpen, setBannerCropOpen] = useState(false);
  const [logoCropOpen, setLogoCropOpen] = useState(false);
  const [bannerImage, setBannerImage] = useState({});
  const [logoImage, setLogoImage] = useState({});

  useEffect(() => {
    setBannerImage({
      bannerUid: user.bannerUid,
      bannerUrl: user.bannerUrl,
      headerBannerUrl: user.headerBannerUrl,
    });
    setLogoImage({
      logoUid: user.logoUid,
      logoUrl: user.logoUrl,
      headerLogoUrl: user.headerLogoUrl,
    });
  }, [user]);

  useEffect(() => () => dispatchCleanEditMyProfile(), []);

  useEffect(() => {
    if (changePhotoSuccess) {
      enqueueSnackbar('Success', { variant: 'success' });
      handleClose();
    }
  }, [changePhotoSuccess]);

  const handleOnDrop = useCallback((field, files) => {
    const file = _.head(files);
    const formData = new FormData();
    formData.append('fileName', file.name);
    formData.append('file', file);
    dispatchUploadFile(field, formData);
  }, []);

  useEffect(() => {
    if (!_.isEmpty(bannerImageFile)) {
      setBannerCropOpen(true);
    }
  }, [bannerImageFile]);

  useEffect(() => {
    if (!_.isEmpty(logoImageFile)) {
      setLogoCropOpen(true);
    }
  }, [logoImageFile]);

  const handleBannerCrop = cropImage => {
    setBannerImage({
      ...cropImage,
      bannerUid: cropImage.uid,
      bannerUrl: cropImage.urls[0],
      headerBannerUrl: `${cropImage.urls[1]}/?t=${moment().format('x')}`,
    });
  };

  const handleLogoCrop = cropImage => {
    setLogoImage({
      ...cropImage,
      logoUid: cropImage.uid,
      logoUrl: cropImage.urls[0],
      headerLogoUrl: `${cropImage.urls[1]}/?t=${moment().format('x')}`,
    });
  };

  const handleOk = () => {
    const payload = {
      bannerUid: bannerImage.bannerUid,
      logoUid: logoImage.logoUid,
      uid: user.uid,
    };
    dispatchChangePhoto(payload);
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
          Edit My Profile
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
              <Grid container spacing={2}>
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
                            !bannerImage.headerBannerUrl
                              ? {
                                  backgroundColor: '#eceeef',
                                  border: '1px solid rgba(0, 0, 0, 0.12)',
                                }
                              : {}
                          }
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
                          {!bannerImage.headerBannerUrl ? (
                            <>
                              <Image fontSize="large" />
                              <Typography>Upload Banner Image</Typography>
                            </>
                          ) : (
                            <img
                              src={bannerImage.headerBannerUrl}
                              alt="Banner"
                              width="100%"
                            />
                          )}
                        </BlockButton>
                      )}
                    </Dropzone>
                  </Header>
                </Grid>
                {bannerImage.headerBannerUrl && (
                  <Grid item xs={12}>
                    <Grid container spacing={2} justify="center">
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
                      <Dropzone
                        accept="image/png, image/jpg, image/gif, image/jpeg"
                        maxFiles={1}
                        onDrop={acceptedFiles =>
                          handleOnDrop('bannerImage', acceptedFiles)
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <Grid item xs={3} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Button
                              variant="outlined"
                              fullWidth
                              color="primary"
                              onClick={() => {}}
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
            <Grid item xs={12}>
              <Grid container spacing={2} justify="center">
                <Grid item xs={4}>
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
                            !logoImage.headerLogoUrl
                              ? {
                                  backgroundColor: '#eceeef',
                                  border: '1px solid rgba(0, 0, 0, 0.12)',
                                }
                              : {}
                          }
                          {...getRootProps()}
                        >
                          <input {...getInputProps()} />
                          {!logoImage.headerLogoUrl ? (
                            <>
                              <Image fontSize="large" />
                              <Typography>Upload Logo Image</Typography>
                            </>
                          ) : (
                            <img
                              src={logoImage.headerLogoUrl}
                              alt="Logo"
                              width="100%"
                            />
                          )}
                        </BlockButton>
                      )}
                    </Dropzone>
                  </Thumbnail>
                </Grid>
                {logoImage.headerLogoUrl && (
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
                      <Dropzone
                        accept="image/png, image/jpg, image/gif, image/jpeg"
                        maxFiles={1}
                        onDrop={acceptedFiles =>
                          handleOnDrop('logoImage', acceptedFiles)
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <Grid item xs={3} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Button
                              variant="outlined"
                              fullWidth
                              color="primary"
                              onClick={() => {}}
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
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleOk}
            disabled={changePhotoLoading}
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {bannerCropOpen && (
        <ImageCrop
          image={
            !_.isEmpty(bannerImageFile)
              ? _.head(bannerImageFile)
              : {
                  url: bannerImage.bannerUrl,
                  uid: bannerImage.bannerUid,
                }
          }
          handleClose={() => setBannerCropOpen(false)}
          handleImageCrop={handleBannerCrop}
          imageMap={theme.imageMap.bannerDimensions}
        />
      )}
      {logoCropOpen && (
        <ImageCrop
          image={
            !_.isEmpty(logoImageFile)
              ? _.head(logoImageFile)
              : { url: logoImage.logoUrl, uid: logoImage.logoUid }
          }
          handleClose={() => setLogoCropOpen(false)}
          handleImageCrop={handleLogoCrop}
          imageMap={theme.imageMap.logoDimensions}
        />
      )}
    </>
  );
}

EditMyProfile.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  user: PropTypes.object,
  dispatchUploadFile: PropTypes.func,
  bannerImageFile: PropTypes.array,
  logoImageFile: PropTypes.array,
  dispatchChangePhoto: PropTypes.func,
  dispatchCleanEditMyProfile: PropTypes.func,
  changePhotoLoading: PropTypes.bool,
  changePhotoSuccess: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  bannerImageFile: makeSelectUploadFile('bannerImage'),
  logoImageFile: makeSelectUploadFile('logoImage'),
  changePhotoLoading: makeSelectChangePhotoLoading(),
  changePhotoSuccess: makeSelectChangePhotoSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchUploadFile: (field, options) =>
      dispatch(uploadFileAction(field, options)),
    dispatchChangePhoto: options => dispatch(changePhoto(options)),
    dispatchCleanEditMyProfile: () => dispatch(cleanEditMyProfile()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(EditMyProfile);

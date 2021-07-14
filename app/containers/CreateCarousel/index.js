/* eslint-disable indent */
/**
 *
 * CreateCarousel
 *
 */

import React, { memo, useMemo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useSnackbar } from 'notistack';
import Dropzone from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';
import * as Vibrant from 'node-vibrant';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
  TextField,
  Typography,
  FormControlLabel,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { Close, Image } from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import rgbHex from 'rgb-hex';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useEffectAfterMount } from 'utils/helpers/useEffectAfterMount';
import { useCloseEffect } from 'utils/helpers/useCloseEffect';
import {
  closeCreateCarousel,
  getCommunityList,
} from 'containers/AuthBase/actions';
import ColorPicker from 'components/ColorPicker/Loadable';
import { Thumbnail } from 'components/FeedTypes/Wrapper';
import { BlockButton } from 'containers/ContentCreation/Wrapper';
import ImageCrop from 'containers/ImageCrop/Loadable';
import {
  makeSelectCommunityList,
  makeSelectConfig,
} from 'containers/AuthBase/selectors';
import VideoUrl from 'containers/VideoUrl/Loadable';
import { makeSelectCarousel } from 'containers/CarouselManager/selectors';
import CarouselLevelOne from 'components/CarouselLevelOne/Loadable';
import CarouselLevelTwo from 'components/CarouselLevelTwo/Loadable';
import {
  makeSelectUploadFile,
  makeSelectCreateCarouselSuccess,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { ColorPaper, Carousel } from './Wrapper';
import {
  uploadFile,
  createCarousel,
  cleanCreateCarousel,
  carouselContent as carouselContentAction,
} from './actions';
import { CreateCarouselSchema } from './Schema';
// import messages from './messages';

const carouselTypes = [
  { type: 'image', levels: [1, 2] },
  { type: 'video', levels: [1, 2] },
  { type: 'lively-call', levels: [1, 2], config: 'livelyTransfer' },
  { type: 'document-bar', levels: [1, 2], config: 'documentBar' },
  { type: 'lively-transfer', levels: [1, 2], config: 'livelyCall' },
  {
    type: 'community-carousel',
    levels: [2],
    config: 'notificationByTypeCommunityCarousel',
    disable: 'communityUid',
  },
];

export function CreateCarousel(props) {
  useInjectReducer({ key: 'createCarousel', reducer });
  useInjectSaga({ key: 'createCarousel', saga });

  const {
    dispatchCloseCreateCarousel,
    createCarouselLevel,
    uid,
    dispatchUploadFile,
    imageLevel1File,
    imageLevel2File,
    communityList,
    dispatchCommunityList,
    dispatchCreateCarousel,
    createCarouselSuccess,
    dispatchCleanCreateCarousel,
    dispatchCarouselContent,
    carouselContent,
    communityUid: _communityUid,
  } = props;

  const level = useMemo(() => createCarouselLevel || carouselContent.level, [
    createCarouselLevel,
    carouselContent,
  ]);

  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [type, setType] = useState('image');
  const [communityUid, setCommunityUid] = useState('');
  const [url, setUrl] = useState('');
  const [titleColor, setTitleColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [displayTitle, setDisplayTitle] = useState(true);
  const [displayBackgroundColor, setDisplayBackgroundColor] = useState(true);
  const [openSameTab, setOpenSameTab] = useState(true);
  const [imageLevel1, setImageLevel1] = useState({});
  const [imageLevel2, setImageLevel2] = useState({});
  const [titleAnchorEl, setTitleAnchorEl] = React.useState(null);
  const [backgroundAnchorEl, setBackgroundAnchorEl] = React.useState(null);
  const [imageLevel1CropOpen, setImageLevel1CropOpen] = useState(false);
  const [imageLevel2CropOpen, setImageLevel2CropOpen] = useState(false);
  const [videoUrlOpen, setVideoUrlOpen] = useState(false);
  const [video, setVideo] = useState({});
  const [paletteOptions, setPaletteOptions] = useState([]);

  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  useEffect(() => {
    if (uid !== undefined) {
      dispatchCarouselContent({ uid });
    }
  }, []);

  useEffect(() => {
    if (!_.isEmpty(carouselContent)) {
      setTitle(carouselContent.title);
      setSubTitle(carouselContent.subTitle || '');
      setType(carouselContent.type);
      setUrl(carouselContent.url || '');
      setTitleColor(
        _.startsWith(carouselContent.titleColor, 'rgb')
          ? `#${rgbHex(carouselContent.titleColor)}`
          : carouselContent.titleColor,
      );
      setBackgroundColor(
        _.startsWith(carouselContent.backgroundColor, 'rgb')
          ? `#${rgbHex(carouselContent.backgroundColor)}`
          : carouselContent.backgroundColor,
      );
      setDisplayTitle(carouselContent.displayTitle);
      setDisplayBackgroundColor(carouselContent.displayBackgroundColor);
      setOpenSameTab(carouselContent.openSameTab);
      setImageLevel1(carouselContent.imageLevel1 || {});
      setImageLevel2(carouselContent.imageLevel2 || {});
      if (carouselContent.type === 'video') {
        setVideo({
          thumbUrl: carouselContent.thumbUrl,
          embedVideo: carouselContent.embedVideo,
        });
      }
    }
  }, [carouselContent]);

  useEffect(() => {
    if (!_.isEmpty(carouselContent) && !_.isEmpty(communityList)) {
      setCommunityUid(carouselContent.community);
    }
  }, [carouselContent, communityList]);

  useEffect(() => {
    if (type === 'community-carousel') {
      dispatchCommunityList({
        filter: 'lively',
        format: 'list',
        gplusCommunity: 'ALL',
        isPrivate: false,
      });
    }
  }, [type]);

  const handleOnDrop = useCallback((field, files) => {
    const file = _.head(files);
    const formData = new FormData();
    formData.append('fileName', file.name);
    formData.append('file', file);
    dispatchUploadFile(field, formData);
  }, []);

  useEffect(() => {
    if (!_.isEmpty(imageLevel1File)) {
      setImageLevel1CropOpen(true);
    }
  }, [imageLevel1File]);

  useEffect(() => {
    if (!_.isEmpty(imageLevel2File)) {
      setImageLevel2CropOpen(true);
    }
  }, [imageLevel2File]);

  const handleImageLevel1Crop = async cropImage => {
    setImageLevel1({
      ...cropImage,
      sliderUrl: `${cropImage.urls[1]}?t=${moment().format('x')}`,
    });
  };

  const handleImageLevel2Crop = cropImage =>
    setImageLevel2({
      ...cropImage,
      sliderUrl: `${cropImage.urls[1]}?t=${moment().format('x')}`,
    });

  useEffectAfterMount(() => {
    let isCancelled = false;
    if (level === 1 && !_.isEmpty(imageLevel1)) {
      (async () => {
        const palettes = await Vibrant.from(imageLevel1.sliderUrl).getPalette();
        if (!isCancelled) {
          setPaletteOptions(
            _.map(palettes, palette => ({
              id: uuidv4(),
              titleColor: palette.getTitleTextColor(),
              backgroundColor: palette.getHex(),
            })),
          );
        }
      })();
    }
    return () => {
      isCancelled = true;
    };
  }, [imageLevel1.sliderUrl]);

  useEffectAfterMount(() => {
    let isCancelled = false;
    if (level === 2 && !_.isEmpty(imageLevel2)) {
      (async () => {
        const palettes = await Vibrant.from(imageLevel2.sliderUrl).getPalette();
        if (!isCancelled) {
          setPaletteOptions(
            _.map(palettes, palette => ({
              id: uuidv4(),
              titleColor: palette.getTitleTextColor(),
              backgroundColor: palette.getHex(),
            })),
          );
        }
      })();
    }
    return () => {
      isCancelled = true;
    };
  }, [imageLevel2.sliderUrl]);

  const handleSetColors = id => {
    const selected = _.find(paletteOptions, { id });
    setTitleColor(selected.titleColor);
    setBackgroundColor(selected.backgroundColor);
  };

  const handleVideoUrlSelect = videoItem => {
    setVideoUrlOpen(false);
    setVideo(videoItem);
  };

  useEffect(() => {
    if (createCarouselSuccess) {
      enqueueSnackbar('Success', { variant: 'success' });
      dispatchCloseCreateCarousel();
    }
  }, [createCarouselSuccess]);

  const [previewCarousel, setPreviewCarousel] = useState({});

  useEffect(() => {
    setPreviewCarousel({
      backgroundColor,
      communityUid: type === 'community-carousel' ? communityUid : undefined,
      displayBackgroundColor,
      displayOption: 'Home',
      displayTitle,
      embedVideo: type === 'video' ? video.html || video.embedVideo : undefined,
      thumbUrl:
        type === 'video' ? video.thumbnail_url || video.thumbUrl : undefined,
      imageLevel1,
      imageLevel2,
      level,
      openSameTab,
      subTitle,
      title,
      titleColor,
      type,
      uid,
      url,
    });
  }, [
    backgroundColor,
    communityUid,
    displayBackgroundColor,
    displayTitle,
    imageLevel1,
    imageLevel2,
    level,
    openSameTab,
    subTitle,
    title,
    titleColor,
    type,
    uid,
    url,
    video,
    carouselContent,
  ]);

  const handleOkay = () => {
    const payload = {
      backgroundColor,
      communityUid:
        type === 'community-carousel' ? communityUid : _communityUid,
      displayBackgroundColor,
      displayOption: _communityUid ? 'Community' : 'Home',
      displayTitle,
      embedVideo: type === 'video' ? video.html : undefined,
      thumbUrl: type === 'video' ? video.thumbnail_url : undefined,
      imageLevel1:
        level === 1 && type !== 'video' ? imageLevel1.uid : undefined,
      imageLevel2:
        level === 2 && type !== 'video' ? imageLevel2.uid : undefined,
      level,
      openSameTab,
      subTitle,
      title,
      titleColor,
      type,
      uid,
      url,
    };
    const result = CreateCarouselSchema.validate(payload);
    if (result.error) {
      enqueueSnackbar(`${result.error}`, {
        variant: 'error',
      });
    }
    if (!result.error) {
      dispatchCreateCarousel(payload);
    }
  };

  useEffect(() => () => dispatchCleanCreateCarousel(), []);
  useCloseEffect(dispatchCloseCreateCarousel);

  return (
    <>
      <Dialog
        open
        onClose={dispatchCloseCreateCarousel}
        scroll="paper"
        fullWidth
        maxWidth="md"
        disableEnforceFocus
      >
        <DialogTitle>
          Create Carousel
          <IconButton
            aria-label="close"
            onClick={dispatchCloseCreateCarousel}
            style={{ position: 'absolute', top: 5, right: 5 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Type"
                variant="outlined"
                fullWidth
                size="small"
                select
                value={type}
                onChange={e => setType(e.target.value)}
              >
                {_.map(
                  carouselTypes,
                  carouselType =>
                    _.includes(carouselType.levels, level) &&
                    ((!carouselType.config ||
                      props[carouselType.config].value) &&
                      (!carouselType.disable ||
                        !props[carouselType.disable])) && (
                      <MenuItem
                        key={carouselType.type}
                        value={carouselType.type}
                      >
                        {carouselType.type}
                      </MenuItem>
                    ),
                )}
              </TextField>
            </Grid>
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
                label="Sub Title"
                variant="outlined"
                fullWidth
                size="small"
                value={subTitle}
                onChange={e => setSubTitle(e.target.value)}
              />
            </Grid>
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
            {type === 'community-carousel' && (
              <Grid item xs={12}>
                <TextField
                  label="Select Community"
                  variant="outlined"
                  fullWidth
                  size="small"
                  select
                  value={communityUid}
                  onChange={e => setCommunityUid(e.target.value)}
                >
                  {_.map(communityList, community => (
                    <MenuItem key={community.uid} value={community.uid}>
                      {community.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}
            <Grid item xs={6}>
              <Typography gutterBottom>Title Color</Typography>
              <Paper
                variant="outlined"
                style={{ flex: 1, cursor: 'pointer' }}
                onClick={e => setTitleAnchorEl(e.currentTarget)}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={2}>
                    <ColorPaper variant="outlined" background={titleColor} />
                  </Grid>
                  <Grid item xs>
                    <Typography>{titleColor}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>Background Color</Typography>
              <Paper
                variant="outlined"
                style={{ flex: 1, cursor: 'pointer' }}
                onClick={e => setBackgroundAnchorEl(e.currentTarget)}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={2}>
                    <ColorPaper
                      variant="outlined"
                      background={backgroundColor}
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography>{backgroundColor}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            {!_.isEmpty(paletteOptions) && (
              <Grid item xs={12}>
                <Typography gutterBottom>
                  Suggested color combination from image
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  {_.map(paletteOptions, palette => (
                    <Grid item xs={1} key={palette.id}>
                      <ColorPaper
                        variant="outlined"
                        background={palette.backgroundColor}
                        title={palette.titleColor}
                        onClick={() => handleSetColors(palette.id)}
                      >
                        <Typography align="center" color="inherit">
                          Aa
                        </Typography>
                      </ColorPaper>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={displayTitle}
                    onChange={e => setDisplayTitle(e.target.checked)}
                    color="primary"
                  />
                }
                label="Display title"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={displayBackgroundColor}
                    onChange={e => setDisplayBackgroundColor(e.target.checked)}
                    color="primary"
                  />
                }
                label="Display background color"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={openSameTab}
                    onChange={e => setOpenSameTab(e.target.checked)}
                    color="primary"
                  />
                }
                label="Open in same tab"
              />
            </Grid>
            {type === 'video' ? (
              <Grid item xs={12}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => {
                        setVideoUrlOpen(true);
                      }}
                    >
                      Add video
                    </Button>
                  </Grid>
                  {!_.isEmpty(video) && (
                    <Grid item xs={12} style={{ marginBottom: 50 }}>
                      {level === 1 && (
                        <Carousel>
                          <CarouselLevelOne carouselContent={previewCarousel} />
                        </Carousel>
                      )}
                      {level === 2 && (
                        <Grid container justify="center">
                          <Grid item style={{ width: 226, height: 226 }}>
                            <Thumbnail>
                              <CarouselLevelTwo
                                carouselContent={previewCarousel}
                              />
                            </Thumbnail>
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  )}
                </Grid>
              </Grid>
            ) : (
              <Grid item xs={12}>
                {level === 1 && (
                  <Grid container spacing={2} justify="center">
                    <Grid item xs={12}>
                      <Carousel>
                        <Dropzone
                          accept="image/png, image/jpg, image/gif, image/jpeg"
                          maxFiles={1}
                          onDrop={acceptedFiles =>
                            handleOnDrop('imageLevel1', acceptedFiles)
                          }
                        >
                          {({ getRootProps, getInputProps }) => (
                            <BlockButton
                              style={
                                (!uid && _.isEmpty(imageLevel1.urls)) ||
                                (uid && _.isEmpty(imageLevel1))
                                  ? {
                                      backgroundColor: '#eceeef',
                                      border: '1px solid rgba(0, 0, 0, 0.12)',
                                    }
                                  : {}
                              }
                              {...getRootProps()}
                            >
                              <input {...getInputProps()} />
                              {(!uid && _.isEmpty(imageLevel1.urls)) ||
                              (uid && _.isEmpty(imageLevel1)) ? (
                                <>
                                  <Image fontSize="large" />
                                  <Typography>
                                    Upload Level 1 Image (1500x315 px)
                                  </Typography>
                                </>
                              ) : (
                                <CarouselLevelOne
                                  carouselContent={previewCarousel}
                                />
                              )}
                            </BlockButton>
                          )}
                        </Dropzone>
                      </Carousel>
                    </Grid>
                    {((!uid && !_.isEmpty(imageLevel1.urls)) ||
                      (uid && !_.isEmpty(imageLevel1))) && (
                      <Grid
                        item
                        style={{ marginTop: displayTitle ? 50 : 'unset' }}
                      >
                        <Button
                          variant="outlined"
                          fullWidth
                          color="primary"
                          onClick={() => {
                            setImageLevel1CropOpen(true);
                          }}
                        >
                          Recrop Level 1 Image
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                )}
                {level === 2 && (
                  <Grid
                    container
                    spacing={2}
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item style={{ width: 226, height: 226 }}>
                      <Thumbnail style={{ color: 'inherit' }}>
                        <Dropzone
                          accept="image/png, image/jpg, image/gif, image/jpeg"
                          maxFiles={1}
                          onDrop={acceptedFiles =>
                            handleOnDrop('imageLevel2', acceptedFiles)
                          }
                        >
                          {({ getRootProps, getInputProps }) => (
                            <BlockButton
                              style={
                                !uid && _.isEmpty(imageLevel2.urls)
                                  ? {
                                      backgroundColor: '#eceeef',
                                      border: '1px solid rgba(0, 0, 0, 0.12)',
                                    }
                                  : {}
                              }
                              {...getRootProps()}
                            >
                              <input {...getInputProps()} />
                              {!uid && _.isEmpty(imageLevel2.urls) ? (
                                <>
                                  <Image fontSize="large" />
                                  <Typography>
                                    Upload Level 2 Image (226x226 px)
                                  </Typography>
                                </>
                              ) : (
                                <CarouselLevelTwo
                                  carouselContent={previewCarousel}
                                />
                              )}
                            </BlockButton>
                          )}
                        </Dropzone>
                      </Thumbnail>
                    </Grid>
                    {((!uid && !_.isEmpty(imageLevel2.urls)) || uid) && (
                      <Grid item>
                        <Button
                          variant="outlined"
                          fullWidth
                          color="primary"
                          onClick={() => {
                            setImageLevel2CropOpen(true);
                          }}
                        >
                          Recrop Level 2 Image
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                )}
              </Grid>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOkay} variant="outlined" color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {titleAnchorEl && (
        <ColorPicker
          anchorEl={titleAnchorEl}
          handleClose={() => setTitleAnchorEl(null)}
          color={titleColor}
          setColor={setTitleColor}
        />
      )}
      {backgroundAnchorEl && (
        <ColorPicker
          anchorEl={backgroundAnchorEl}
          handleClose={() => setBackgroundAnchorEl(null)}
          color={backgroundColor}
          setColor={setBackgroundColor}
        />
      )}
      {imageLevel1CropOpen && (
        <ImageCrop
          image={
            !_.isEmpty(imageLevel1File) ? _.head(imageLevel1File) : imageLevel1
          }
          handleClose={() => setImageLevel1CropOpen(false)}
          handleCancel={() => setImageLevel1CropOpen(false)}
          handleImageCrop={handleImageLevel1Crop}
          imageMap={theme.imageMap.imageLevel1}
        />
      )}
      {imageLevel2CropOpen && (
        <ImageCrop
          image={
            !_.isEmpty(imageLevel2File) ? _.head(imageLevel2File) : imageLevel2
          }
          handleClose={() => setImageLevel2CropOpen(false)}
          handleCancel={() => setImageLevel2CropOpen(false)}
          handleImageCrop={handleImageLevel2Crop}
          imageMap={theme.imageMap.imageLevel2}
        />
      )}
      {videoUrlOpen && (
        <VideoUrl
          type="video"
          open={videoUrlOpen}
          onClose={() => setVideoUrlOpen(false)}
          handleVideoUrlSelect={handleVideoUrlSelect}
        />
      )}
    </>
  );
}

CreateCarousel.propTypes = {
  dispatchCloseCreateCarousel: PropTypes.func,
  createCarouselLevel: PropTypes.number,
  uid: PropTypes.string,
  dispatchUploadFile: PropTypes.func,
  imageLevel1File: PropTypes.array,
  imageLevel2File: PropTypes.array,
  dispatchCommunityList: PropTypes.func,
  communityList: PropTypes.array,
  dispatchCreateCarousel: PropTypes.func,
  createCarouselSuccess: PropTypes.bool,
  dispatchCleanCreateCarousel: PropTypes.func,
  dispatchCarouselContent: PropTypes.func,
  carouselContent: PropTypes.object,
  communityUid: PropTypes.string,
};

const mapStateToProps = (state, props) =>
  createStructuredSelector({
    imageLevel1File: makeSelectUploadFile('imageLevel1'),
    imageLevel2File: makeSelectUploadFile('imageLevel2'),
    communityList: makeSelectCommunityList(),
    createCarouselSuccess: makeSelectCreateCarouselSuccess(),
    carouselContent: makeSelectCarousel(props.uid),
    documentBar: makeSelectConfig('DOCUMENT_BAR'),
    livelyCall: makeSelectConfig('LIVELY_CALL'),
    livelyTransfer: makeSelectConfig('LIVELY_TRANSFER'),
    notificationByTypeCommunityCarousel: makeSelectConfig(
      'NOTIFICATION_BY_TYPE_COMMUNITY_CAROUSEL',
    ),
  });

function mapDispatchToProps(dispatch) {
  return {
    dispatchCloseCreateCarousel: () => dispatch(closeCreateCarousel()),
    dispatchUploadFile: (field, options) =>
      dispatch(uploadFile(field, options)),
    dispatchCommunityList: options => dispatch(getCommunityList(options)),
    dispatchCreateCarousel: options => dispatch(createCarousel(options)),
    dispatchCleanCreateCarousel: () => dispatch(cleanCreateCarousel()),
    dispatchCarouselContent: options =>
      dispatch(carouselContentAction(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CreateCarousel);

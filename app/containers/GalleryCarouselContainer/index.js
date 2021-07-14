/* eslint-disable indent */
/**
 *
 * GalleryCarouselContainer
 *
 */

import { DateTime } from 'luxon';
import _ from 'lodash';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { useEffect, useState } from 'react';

import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Lazy, Thumbs, Pagination, Virtual } from 'swiper';

import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import Alert from '@material-ui/lab/Alert';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

import { makeStyles } from '@material-ui/core/styles';
import { LinkEmbed } from '../../components/FeedTypes';

import 'swiper/swiper.scss';
import 'swiper/components/thumbs/thumbs.scss';

import saga from './saga';
import reducer from './reducer';
import {
  makeSelectMediaManagerList,
  makeSelectMediaManagerListSuccess,
  makeSelectAllImagesAsZip,
  makeSelectAllImagesAsZipLoading,
} from './selectors';

import { ReactComponent as InfoIcon } from '../../images/svg/info.svg';
import { ReactComponent as DownloadIcon } from '../../images/svg/download.svg';
import { ReactComponent as ChevronUpIcon } from '../../images/svg/chevron-up.svg';
import { ReactComponent as ChevronDownIcon } from '../../images/svg/chevron-down.svg';

import {
  getMediaManagerList,
  getAllImagesAsZip,
  resetToInitialState,
} from './actions';

import CarouselHeader from './CarouselHeader';
import ImageCarouselItem from './ImageCarouselItem';
import VideoCarouselItem from './VideoCarouselItem';
import DocumentCarouselItem from './DocumentCarouselItem';
import { CarouselThumb } from './CarouselThumb';

import { DownloadButton, CustomListItemIcon } from './wrapper';

SwiperCore.use([Lazy, Thumbs, Pagination, Virtual]);

const useStyles = makeStyles(theme => ({
  documentsInfoTooltip: {
    minWidth: 600,
    maxWidth: 800,
    background: 'white',
    color: 'black',
    boxShadow:
      '2px 3px 5px rgba(191, 227, 253, 0.25), 0px -2px 13px 1px rgba(191, 227, 253, 0.25)',
  },
  documentsInfoTooltipGrid: {
    width: '100%',
  },
  svg: {
    width: 20,
    height: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 150,
    zIndex: 900,
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
}));
export function GalleryCarouselContainer({
  handleClose,
  activeIndex,
  options,
  type,
  dispatchGetAllImagesAsZip,
  dispatchGetMediaManagerList,
  dispatchResetToInitialState,
  allImagesAsZip,
  allImagesAsZipLoading,
  mediaManagerList,
  links,
  isMediaListLoadedSuccess,
}) {
  useInjectReducer({ key: 'galleryCarouselContainer', reducer });
  useInjectSaga({ key: 'galleryCarouselContainer', saga });
  const classes = useStyles();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(activeIndex);
  const [searchQuery, setSearchQuery] = useState('');
  const [thumbsSwiperHidden, setThumbSwiperHidden] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mediaItems, setMediaItems] = useState([]);
  const internalMediaUIds = options.reduce((uidAccumulator, media) => {
    if (media.isInternal) {
      uidAccumulator.push(media.uid);
    }
    return uidAccumulator;
  }, []);

  useEffect(() => {
    if (type === 'image' || type === 'documents' || type === 'document') {
      dispatchGetMediaManagerList({ format: 'List', uid: internalMediaUIds });
    } else {
      if (options.length === 1) {
        setThumbSwiperHidden(true);
      }
      setMediaItems(
        options.map(mediaItem => {
          if (!mediaItem.uid) {
            return { ...mediaItem, ...{ uid: _.uniqueId('gallery-item') } };
          }
          return mediaItem;
        }),
      );
    }
    return () => dispatchResetToInitialState();
  }, []);

  useEffect(() => {
    if (
      isMediaListLoadedSuccess &&
      (type === 'image' || type === 'documents' || type === 'document')
    ) {
      const newMediaItems = [];
      _.forEach(options, propMediaItem => {
        let isInApiResponse = false;
        _.forEach(mediaManagerList, apiMediaItem => {
          if (apiMediaItem.uid === propMediaItem.uid) {
            isInApiResponse = true;
            newMediaItems.push({ ...apiMediaItem, ...{ isInternal: true } });
            return false;
          }
          return true;
        });
        if (!isInApiResponse) {
          newMediaItems.push(propMediaItem);
        }
      });
      if (newMediaItems.length === 0) {
        setThumbSwiperHidden(true);
      }
      setMediaItems(newMediaItems);
    }
  }, [isMediaListLoadedSuccess]);

  const downloadZip = url => {
    setDownloadZipSnackBar(false);
    window.open(url, '_blank');
  };

  const downloadMedia = (url, name) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadCurrentImageOrDocument = () => {
    downloadMedia(mediaItems[currentIndex].url, mediaItems[currentIndex].title);
  };

  const [downloadZipSnackBar, setDownloadZipSnackBar] = useState(false);

  const downloadAllAsZip = () => {
    const params = {
      fileUids: internalMediaUIds,
      fileName: `${type}.zip`,
    };
    // dispatch the download
    dispatchGetAllImagesAsZip(params);
    setDownloadMenuAnchorEl(null);
    setDownloadZipSnackBar(true);
  };

  const renderCarouselItems = () => {
    switch (type) {
      case 'image':
        return mediaItems.map((media, i) => (
          <SwiperSlide key={media.uid} virtualIndex={i}>
            <ImageCarouselItem media={media} />
          </SwiperSlide>
        ));
      case 'document':
      case 'documents':
        return mediaItems.map((media, i) => (
          <SwiperSlide key={media.uid} virtualIndex={i}>
            <DocumentCarouselItem media={media} />
          </SwiperSlide>
        ));
      case 'video':
        return options.map((media, i) => (
          <SwiperSlide key={media.uid} virtualIndex={i}>
            <VideoCarouselItem isPlaying={isPlaying} index={i} media={media} />
          </SwiperSlide>
        ));
      case 'links':
        return (
          <SwiperSlide virtualIndex={0}>
            <Box
              style={{ height: '100vh' }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <LinkEmbed links={links} />
            </Box>
          </SwiperSlide>
        );
      default:
        return null;
    }
  };

  const renderCarouselThumbs = () => {
    const filteredMediaItems = mediaItems.reduce(
      (mediaItemsAcc, item, index) => {
        let searchAgainstText = item.title;
        if (item.internalVideo) {
          searchAgainstText = item.videoName;
        }
        if (item.embedVideoTitle) {
          searchAgainstText = item.embedVideoTitle;
        }

        if (
          searchAgainstText.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          mediaItemsAcc.push({
            item,
            index,
          });
        }
        return mediaItemsAcc;
      },
      [],
    );
    switch (type) {
      case 'image':
      case 'document':
      case 'documents':
        return filteredMediaItems.map(filteredMediaItem => (
          <SwiperSlide
            key={filteredMediaItem.item.uid}
            onClick={() => {
              mainSwiper.slideTo(filteredMediaItem.index);
            }}
          >
            <CarouselThumb
              imgSrc={filteredMediaItem.item.thumbGalleryUrl}
              title={filteredMediaItem.item.title}
            />
          </SwiperSlide>
        ));

      case 'video':
        return filteredMediaItems.map(filteredMediaItem => (
          <SwiperSlide
            key={filteredMediaItem.item.uid}
            onClick={() => {
              mainSwiper.slideTo(filteredMediaItem.index);
            }}
          >
            <CarouselThumb
              imgSrc={filteredMediaItem.item.thumbUrl}
              title={filteredMediaItem.item.videoName}
            />
          </SwiperSlide>
        ));
      default:
        return filteredMediaItems.map(filteredMediaItem => (
          <SwiperSlide
            key={filteredMediaItem.item.uid}
            onClick={() => mainSwiper.slideTo(filteredMediaItem.index)}
          >
            No preview available
          </SwiperSlide>
        ));
    }
  };

  const handlePopupClose = () => {
    // dispatch a event to reset the state
    dispatchResetToInitialState();

    mainSwiper.destroy(true);
    thumbsSwiper.destroy(true);

    // close the model
    handleClose();
  };

  const renderCarouselHeader = () => {
    if (type === 'video') {
      return (
        <CarouselHeader
          title={
            options[currentIndex].internalVideo
              ? options[currentIndex].videoName
              : options[currentIndex].embedVideoTitle
          }
          handleClose={handleClose}
          searchQuery={searchQuery}
          onSearchQueryChange={e => {
            setSearchQuery(e.target.value);
          }}
        />
      );
    }
    if (type === 'links') {
      return (
        <CarouselHeader
          title={links[0].title}
          handleClose={handleClose}
          searchQuery={searchQuery}
          onSearchQueryChange={e => {
            setSearchQuery(e.target.value);
          }}
        />
      );
    }
    if (type === 'image') {
      return (
        <CarouselHeader
          title={`${mediaItems[currentIndex].title}`}
          handleClose={handlePopupClose}
          searchQuery={searchQuery}
          onSearchQueryChange={e => {
            setSearchQuery(e.target.value);
          }}
        >
          <DownloadButton
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="outlined"
            size="medium"
            color="primary"
            onClick={handleDownloadMenuOpenClick}
          >
            <DownloadIcon />
          </DownloadButton>
          <Menu
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            anchorEl={downloadMenuAnchorEl}
            keepMounted
            open={Boolean(downloadMenuAnchorEl)}
            onClose={handleDownloadMenuOpenClose}
          >
            <MenuItem onClick={downloadCurrentImageOrDocument}>
              <CustomListItemIcon>
                <DownloadIcon />
              </CustomListItemIcon>
              <ListItemText primary="Download current image" />
            </MenuItem>
            <MenuItem onClick={downloadAllAsZip}>
              <CustomListItemIcon>
                <DownloadIcon />
              </CustomListItemIcon>
              <ListItemText primary="Download all as zip" />
            </MenuItem>
          </Menu>
        </CarouselHeader>
      );
    }
    if (type === 'documents' || type === 'document') {
      const currentDocument = mediaItems[currentIndex];
      return (
        <CarouselHeader
          title={currentDocument.title}
          handleClose={handlePopupClose}
          searchQuery={searchQuery}
          onSearchQueryChange={e => {
            setSearchQuery(e.target.value);
          }}
        >
          <Tooltip
            classes={{ tooltip: classes.documentsInfoTooltip }}
            placement="bottom-end"
            title={
              <Grid
                container
                spacing={3}
                classes={{ root: classes.documentsInfoTooltipGrid }}
              >
                <Grid item sm={4}>
                  <Typography>
                    <strong>Version:</strong> {currentDocument.version}
                  </Typography>
                  {currentDocument.author && (
                    <Typography>
                      <strong>Through:</strong>{' '}
                      {currentDocument.author.displayName}
                    </Typography>
                  )}
                </Grid>
                <Grid item sm={4}>
                  <Typography>
                    <strong>File:</strong> {currentDocument.fileName}
                  </Typography>
                  <Typography>
                    <strong>Language:</strong> {currentDocument.language}
                  </Typography>
                </Grid>
                <Grid item sm={4}>
                  <Typography>
                    <strong>Audience:</strong> {currentDocument.audience}
                  </Typography>
                  <Typography>
                    <strong>Creation Date:</strong>
                    {DateTime.fromISO(
                      currentDocument.uploadedDate,
                    ).toLocaleString(DateTime.DATE_FULL)}
                  </Typography>
                </Grid>
              </Grid>
            }
            interactive
          >
            <DownloadButton
              aria-controls="customized-menu"
              aria-haspopup="true"
              variant="outlined"
              size="medium"
              color="primary"
            >
              <InfoIcon />
            </DownloadButton>
          </Tooltip>
          <DownloadButton
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="outlined"
            size="medium"
            color="primary"
            onClick={handleDownloadMenuOpenClick}
          >
            <DownloadIcon />
          </DownloadButton>
          <Menu
            elevation={0}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            anchorEl={downloadMenuAnchorEl}
            keepMounted
            open={Boolean(downloadMenuAnchorEl)}
            onClose={handleDownloadMenuOpenClose}
          >
            <MenuItem onClick={downloadCurrentImageOrDocument}>
              <CustomListItemIcon>
                <DownloadIcon />
              </CustomListItemIcon>
              <ListItemText primary="Download Document" />
            </MenuItem>
            <MenuItem onClick={downloadAllAsZip}>
              <CustomListItemIcon>
                <DownloadIcon />
              </CustomListItemIcon>
              <ListItemText primary="Download all as zip" />
            </MenuItem>
          </Menu>
        </CarouselHeader>
      );
    }
    return null;
  };

  const [downloadMenuAnchorEl, setDownloadMenuAnchorEl] = React.useState(null);

  const handleDownloadMenuOpenClick = e => {
    setDownloadMenuAnchorEl(e.currentTarget);
  };

  const handleDownloadMenuOpenClose = () => {
    setDownloadMenuAnchorEl(null);
  };

  return mediaItems.length === 0 ? (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <CircularProgress />
    </Box>
  ) : (
    <>
      {renderCarouselHeader()}
      <Swiper
        onSlideChange={() => setIsPlaying(false)}
        spaceBetween={10}
        virtual
        preloadImages={false}
        lazy
        freeMode
        watchSlidesVisibility
        watchSlidesProgress
        onSwiper={swiper => {
          swiper.slideTo(activeIndex);
          setMainSwiper(swiper);
        }}
        pagination={{
          el: '.swiper-fractioned-pagination',
          type: 'fraction',
        }}
        thumbs={{
          swiper: thumbsSwiper,
        }}
        className="gallery-top"
        onSlideChangeTransitionEnd={swiper =>
          setCurrentIndex(swiper.activeIndex)
        }
      >
        {renderCarouselItems()}
      </Swiper>
      <Swiper
        onSlideChange={() => setIsPlaying(false)}
        onSwiper={setThumbsSwiper}
        style={{ display: thumbsSwiperHidden ? 'none' : '' }}
        spaceBetween={20}
        slidesPerView="auto"
        freeMode
        watchSlidesVisibility
        watchSlidesProgress
        className="gallery-thumbs"
      >
        {renderCarouselThumbs()}
      </Swiper>
      <Snackbar
        open={downloadZipSnackBar}
        classes={{ root: classes.downloadAsZipSnackBar }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        autoHideDuration={6000}
        TransitionComponent={Slide}
        message={
          allImagesAsZipLoading ? (
            <Alert severity="info">
              <Typography>Generating Link...</Typography>
              <CircularProgress />
            </Alert>
          ) : (
            <Alert severity="info">
              <Typography>The download link has been generated.</Typography>
              <Button
                color="secondary"
                variant="outlined"
                onClick={() => downloadZip(allImagesAsZip)}
                startIcon={<DownloadIcon className={classes.svg} />}
              >
                Download All as Zip
              </Button>
            </Alert>
          )
        }
      />
      <Fab
        className={classes.fab}
        color="primary"
        aria-label="hide-thumb-swiper"
        onClick={() => setThumbSwiperHidden(!thumbsSwiperHidden)}
      >
        {thumbsSwiperHidden && <ChevronUpIcon className={classes.svg} />}
        {!thumbsSwiperHidden && <ChevronDownIcon className={classes.svg} />}
      </Fab>
    </>
  );
}

GalleryCarouselContainer.propTypes = {
  dispatchGetMediaManagerList: PropTypes.func,
  dispatchGetAllImagesAsZip: PropTypes.func,
  dispatchResetToInitialState: PropTypes.func,
  handleClose: PropTypes.func,
  activeIndex: PropTypes.number,
  options: PropTypes.array,
  type: PropTypes.string.isRequired,
  // videoData: PropTypes.array,
  allImagesAsZip: PropTypes.string,
  allImagesAsZipLoading: PropTypes.bool,
  mediaManagerList: PropTypes.array,
  links: PropTypes.array,
  isMediaListLoadedSuccess: PropTypes.bool,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetMediaManagerList: options =>
      dispatch(getMediaManagerList(options)),
    dispatchGetAllImagesAsZip: options => dispatch(getAllImagesAsZip(options)),
    dispatchResetToInitialState: options =>
      dispatch(resetToInitialState(options)),
  };
}

const mapStateToProps = createStructuredSelector({
  mediaManagerList: makeSelectMediaManagerList(),
  isMediaListLoadedSuccess: makeSelectMediaManagerListSuccess(),
  allImagesAsZip: makeSelectAllImagesAsZip(),
  allImagesAsZipLoading: makeSelectAllImagesAsZipLoading(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(GalleryCarouselContainer);

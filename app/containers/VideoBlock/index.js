/**
 *
 * VideoBlock
 *
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import { v4 as uuidv4 } from 'uuid';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactFilestack from 'filestack-react';
import * as filestack from 'filestack-js';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  LinearProgress,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import MenuItem from '@material-ui/core/MenuItem';
import { Close, Info, AddCircleOutline, Delete } from '@material-ui/icons';
import { useConfirm } from 'material-ui-confirm';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import SelectVideo from 'containers/SelectVideo/Loadable';
import VideoPlayer from 'components/VideoPlayer/Loadable';
import VideoUrl from 'containers/VideoUrl/Loadable';
import {
  UploadGrid,
  Actions,
  ActionButton,
} from 'containers/QuickPost/Wrapper';
import { Thumbnail } from 'components/FeedTypes/Wrapper';
import { SimpleMenu } from 'containers/Feed/Wrapper';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import {
  makeSelectUploadFile,
  makeSelectFileStack,
  makeSelectSaveVideoFileStack,
} from './selectors';
import {
  uploadFile,
  cleanUploadFile,
  getFileStack,
  saveVideoFileStack,
  cleanVideoFileStack,
} from './actions';

const transformVideo = video => ({
  embedVideo: video.embedVideo || video.html,
  embedVideoTitle: video.embedVideoTitle || video.title,
  url: video.url,
  description: video.description,
  originalThumbUrl: video.originalThumbUrl,
  thumbUrl: video.thumbUrl || video.thumbnail_url,
  videoName: video.videoName || video.title,
  handle: video.handle,
  videoFormat: video.videoFormat,
  videoUrl: video.videoUrl,
  thumbName: video.thumbName,
  thumbUid: video.thumbUid,
  isDefaultThumb: video.isDefaultThumb,
  internalVideo: video.internalVideo,
  id: video.id || uuidv4(),
  originalPath: video.originalPath,
  source: video.source,
  status: video.status,
  container: video.container,
  uploadId: video.uploadId,
  uploadedFrom: video.uploadedFrom,
  // lastModifiedDate: video.lastModifiedDate,
});

export function VideoBlock(props) {
  useInjectReducer({ key: 'videoBlock', reducer });
  useInjectSaga({ key: 'videoBlock', saga });

  const confirm = useConfirm();

  const {
    dispatchUploadFile,
    dispatchCleanUploadFile,
    dispatchGetFileStack,
    dispatchSaveVideoFileStack,
    dispatchCleanVideoFileStack,
    uploadedFile,
    fileStack,
    videoFileStack,
    videos,
    setVideos,
    handleClose,
  } = props;

  useEffect(() => {
    dispatchCleanUploadFile();
    dispatchCleanVideoFileStack();
    dispatchGetFileStack({ name: 'FILE_STACK' });
  }, []);

  const [browseAnchorEl, setBrowseAnchorEl] = useState(null);
  const handleBrowseOpen = e => setBrowseAnchorEl(e.currentTarget);
  const handleBrowseClose = () => setBrowseAnchorEl(null);

  const [selectVideoOpen, setSelectVideoOpen] = useState(false);

  const [videoUrlOpen, setVideoUrlOpen] = useState(false);

  const handleVideoUrlSelect = video => {
    setVideoUrlOpen(false);
    setVideos([...videos, transformVideo(video)]);
    handleBrowseClose();
  };

  const [videoPlayerOpen, setVideoPlayerOpen] = useState(false);
  const [tempVideo, setTempVideo] = useState({});

  const handleSelectVideoOk = useCallback(video => {
    setTempVideo(transformVideo(video));
    setTimeout(() => {
      setVideoPlayerOpen(true);
    }, 0);
  }, []);

  const handleSelectVideo = (thumbnail, thumbName, thumbUid) => {
    dispatchCleanVideoFileStack();
    setVideos([
      ...videos,
      {
        ...tempVideo,
        thumbUrl: thumbnail || tempVideo.thumbUrl,
        originalThumbUrl: thumbnail ? tempVideo.thumbUrl : '',
        thumbName,
        thumbUid,
      },
    ]);
    setVideoPlayerOpen(false);
    setSelectVideoOpen(false);
    handleBrowseClose();
  };

  const [fileStackOpen, setFileStackOpen] = useState(false);

  const handleUploadVideo = () => {
    setFileStackOpen(true);
  };

  let client;
  if (fileStack.key) client = filestack.init(fileStack.key);

  const [videoOpen, setVideoOpen] = useState(false);
  const fileStackCheck = useRef(null);

  const handleVideoClose = () => {
    setVideoOpen(false);
    clearInterval(fileStackCheck.current);
  };

  const fileStackSuccess = res => {
    setVideoOpen(true);
    const transformedUrl = client.transform(res.filesUploaded[0].handle, {
      video_convert: {
        path: `${fileStack.details.path}transformed_videos/`,
      },
    });
    fileStackCheck.current = setInterval(async () => {
      const { data } = await axios.get(transformedUrl, {
        params: { timestamp: new Date().getTime() },
      });
      if (data.status === 'completed') {
        clearInterval(fileStackCheck.current);
        setVideoOpen(false);
        dispatchSaveVideoFileStack({
          container: res.filesUploaded[0].container,
          fileName: res.filesUploaded[0].filename,
          handle: res.filesUploaded[0].handle,
          isTransform: true,
          mimeType: data.metadata.result.mime_type,
          size: data.metadata.result.file_size,
          source: 'filestack',
          thumbUrl: data.data.thumb,
          url: data.data.url,
        });
      }
    }, 3000);
  };

  useEffect(() => {
    if (videoFileStack.videoUrl) {
      setTempVideo(transformVideo(videoFileStack));
      setTimeout(() => {
        setVideoPlayerOpen(true);
      }, 0);
    }
  }, [videoFileStack]);

  const handleDelete = async id => {
    try {
      await confirm({
        description: 'Are you sure, you want to delete this video?',
      });
      setVideos(_.filter(videos, video => video.id !== id));
    } catch {
      return false;
    }
    return false;
  };

  return (
    <>
      <Grid container wrap="nowrap" spacing={1}>
        <Grid item>*</Grid>
        <Grid item xs zeroMinWidth>
          <Paper
            elevation={0}
            style={{
              backgroundColor: '#eceeef',
              padding: 10,
              paddingRight: 44,
              position: 'relative',
            }}
          >
            <IconButton
              aria-label="close"
              onClick={handleClose}
              style={{ position: 'absolute', top: 0, right: 0 }}
            >
              <Close fontSize="small" />
            </IconButton>
            <Grid container spacing={1}>
              <Grid item>
                <Info fontSize="small" />
              </Grid>
              <Grid item xs>
                <Typography variant="caption">
                  * 3GP, AVI, FLV, MKV, MOV, MP4, OGV, WEBM, WMV compatible.
                  Maximum size 50MB.
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              {videos &&
                _.map(videos, video => (
                  <Grid item xs={3} key={video.id}>
                    <Thumbnail thumbnail_url={video.thumbUrl}>
                      <Actions>
                        <ActionButton onClick={() => handleDelete(video.id)}>
                          <Delete />
                        </ActionButton>
                      </Actions>
                    </Thumbnail>
                  </Grid>
                ))}
              <Grid item xs={3}>
                <UploadGrid>
                  <Grid container style={{ height: '100%' }}>
                    <Grid
                      item
                      xs={12}
                      style={{
                        borderBottom: '2px dotted #768493',
                        height: '75%',
                      }}
                    >
                      <ButtonBase
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        onClick={handleUploadVideo}
                      >
                        <Grid container direction="column" alignItems="center">
                          <AddCircleOutline />
                          Upload video
                        </Grid>
                      </ButtonBase>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      style={{
                        height: '25%',
                      }}
                    >
                      <ButtonBase
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                        onClick={handleBrowseOpen}
                      >
                        Browse
                      </ButtonBase>
                      <SimpleMenu
                        elevation={0}
                        anchorEl={browseAnchorEl}
                        open={Boolean(browseAnchorEl)}
                        onClose={handleBrowseClose}
                      >
                        <MenuItem
                          dense
                          onClick={() => {
                            handleBrowseClose();
                            setSelectVideoOpen(true);
                          }}
                        >
                          Browse All
                        </MenuItem>
                        <MenuItem
                          dense
                          onClick={() => {
                            handleBrowseClose();
                            setVideoUrlOpen(true);
                          }}
                        >
                          URL
                        </MenuItem>
                      </SimpleMenu>
                    </Grid>
                  </Grid>
                </UploadGrid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        open={videoOpen}
        onClose={handleVideoClose}
        scroll="paper"
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Video
          <IconButton
            aria-label="close"
            onClick={handleVideoClose}
            style={{ position: 'absolute', top: 5, right: 5 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <LinearProgress />
          <Typography noWrap>
            Processing uploaded video. Please wait...
          </Typography>
        </DialogContent>
      </Dialog>
      {selectVideoOpen && (
        <SelectVideo
          selectVideoOpen={selectVideoOpen}
          handleClose={() => setSelectVideoOpen(false)}
          setTempVideo={video => setTempVideo(transformVideo(video))}
          handleSelectVideoOk={handleSelectVideoOk}
        />
      )}
      {videoPlayerOpen && (
        <VideoPlayer
          open={videoPlayerOpen}
          onClose={() => setVideoPlayerOpen(false)}
          handleSelectVideo={handleSelectVideo}
          video={tempVideo}
          uploadFile={dispatchUploadFile}
          uploadedFile={_.head(uploadedFile)}
          cleanUploadFile={dispatchCleanUploadFile}
        />
      )}
      {videoUrlOpen && (
        <VideoUrl
          type="video"
          open={videoUrlOpen}
          onClose={() => {
            setVideoUrlOpen(false);
            handleBrowseClose();
          }}
          handleVideoUrlSelect={handleVideoUrlSelect}
        />
      )}
      {fileStackOpen && (
        <ReactFilestack
          apikey={fileStack.key}
          componentDisplayMode={{
            type: 'immediate',
          }}
          actionOptions={{
            onClose: () => setFileStackOpen(false),
            accept: 'video/mp4',
            fromSources: ['local_file_system'],
            storeTo: { path: `${fileStack.details.path}original_videos/` },
            uploadInBackground: false,
            lang: 'fr',
          }}
          onSuccess={res => fileStackSuccess(res)}
        />
      )}
    </>
  );
}

VideoBlock.propTypes = {
  dispatchUploadFile: PropTypes.func,
  dispatchCleanUploadFile: PropTypes.func,
  dispatchGetFileStack: PropTypes.func,
  dispatchSaveVideoFileStack: PropTypes.func,
  dispatchCleanVideoFileStack: PropTypes.func,
  uploadedFile: PropTypes.array,
  fileStack: PropTypes.object,
  videoFileStack: PropTypes.object,
  videos: PropTypes.array,
  setVideos: PropTypes.func,
  handleClose: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  uploadedFile: makeSelectUploadFile(),
  fileStack: makeSelectFileStack(),
  videoFileStack: makeSelectSaveVideoFileStack(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchUploadFile: (tempUid, options, config) =>
      dispatch(uploadFile(tempUid, options, config)),
    dispatchCleanUploadFile: () => dispatch(cleanUploadFile()),
    dispatchGetFileStack: options => dispatch(getFileStack(options)),
    dispatchSaveVideoFileStack: options =>
      dispatch(saveVideoFileStack(options)),
    dispatchCleanVideoFileStack: () => dispatch(cleanVideoFileStack()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(VideoBlock);

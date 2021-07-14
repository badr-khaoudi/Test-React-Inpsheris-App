/**
 *
 * VideoPlayer
 *
 */

import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import ReactPlayer from 'react-player';
import captureVideoFrame from 'capture-video-frame';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function VideoPlayer(props) {
  const {
    open,
    onClose,
    handleSelectVideo,
    video,
    uploadFile,
    uploadedFile,
    cleanUploadFile,
  } = props;
  const reactPlayer = useRef(null);
  const absolutePath = _.startsWith(video.videoUrl, 'http');

  const [played, setPlayed] = useState(false);
  const [frame, setFrame] = useState({});

  const handleCapture = () => {
    setFrame(captureVideoFrame(reactPlayer.current.getInternalPlayer()));
  };

  const [thumbnail, setThumbnail] = useState(video.thumbUrl);

  useEffect(() => {
    if (uploadedFile && uploadedFile.thumbGalleryUrl) {
      setThumbnail(uploadedFile.thumbGalleryUrl);
    }
  }, [uploadedFile]);

  useEffect(() => {
    if (frame.dataUri) {
      setThumbnail(frame.dataUri);
    }
  }, [frame]);

  const handleFileChange = e => {
    const file = _.head(e.target.files);
    const formData = new FormData();
    formData.append('fileName', file.name);
    formData.append('file', file);
    uploadFile(formData);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        cleanUploadFile();
      }}
      scroll="paper"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        {video.videoName}
        <IconButton
          aria-label="close"
          onClick={() => {
            onClose();
            cleanUploadFile();
          }}
          style={{ position: 'absolute', top: 5, right: 5 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} justify="center">
          <Grid item xs={9} style={{ position: 'relative' }}>
            <ReactPlayer
              onPlay={() => setPlayed(true)}
              style={{ background: '#000000' }}
              ref={reactPlayer}
              controls
              light={
                uploadedFile && uploadedFile.thumbGalleryUrl ? thumbnail : false
              }
              url={video.videoUrl}
              width="100%"
              config={{
                file: {
                  attributes: {
                    crossOrigin: 'Anonymous',
                  },
                },
              }}
            />
            {absolutePath && (
              <>
                {!played ? (
                  <div
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'rgba(58,56,56,.5)',
                      color: '#ffffff',
                      padding: '5px 10px',
                    }}
                  >
                    <Typography color="inherit">
                      Play video to capture frame
                    </Typography>
                  </div>
                ) : (
                  <div
                    style={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      color: '#ffffff',
                      padding: 10,
                    }}
                  >
                    <Button
                      variant="outlined"
                      color="inherit"
                      onClick={handleCapture}
                    >
                      Select this frame
                    </Button>
                  </div>
                )}
              </>
            )}
          </Grid>
          {absolutePath && (
            <Grid item xs={3}>
              <Paper style={{ padding: 10 }}>
                <Typography>Select a thumbnail from frame:</Typography>
                <img width="100%" src={thumbnail} alt="thumbnail" />
                <Typography align="center">
                  or <label htmlFor="thumbnail">upload</label> a thumbnail
                </Typography>
                <input
                  type="file"
                  id="thumbnail"
                  name="thumbnail"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={e => handleFileChange(e)}
                />
              </Paper>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            cleanUploadFile();
            handleSelectVideo(
              thumbnail,
              uploadedFile ? uploadedFile.fileName : '',
              uploadedFile ? uploadedFile.uid : '',
            );
          }}
          variant="outlined"
          color="primary"
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

VideoPlayer.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  handleSelectVideo: PropTypes.func,
  video: PropTypes.object,
  uploadFile: PropTypes.func,
  uploadedFile: PropTypes.object,
  cleanUploadFile: PropTypes.func,
};

export default VideoPlayer;

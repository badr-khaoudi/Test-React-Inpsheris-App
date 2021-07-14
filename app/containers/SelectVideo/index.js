/**
 *
 * SelectVideo
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import LazyLoad from 'react-lazyload';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import { Close, ViewList, ViewModule } from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';
import { Thumbnail } from 'components/FeedTypes/Wrapper';
import { VideoGridItem, VideoListItem } from 'containers/QuickPost/Wrapper';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { getVideoListing } from './actions';
import {
  makeSelectVideoListing,
  makeSelectVideoListingLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

export function SelectVideo(props) {
  useInjectReducer({ key: 'selectVideo', reducer });
  useInjectSaga({ key: 'selectVideo', saga });

  const {
    dispatchVideoListing,
    videoListing,
    selectVideoOpen,
    handleClose,
    handleSelectVideoOk,
    videoListingLoading,
  } = props;

  useEffect(() => {
    dispatchVideoListing();
  }, []);

  const [viewMode, setViewMode] = useState('grid');
  const [tempVideo, setTempVideo] = useState({});

  const changeViewMode = () => {
    if (viewMode === 'grid') {
      setViewMode('list');
    } else {
      setViewMode('grid');
    }
  };

  return (
    <Dialog
      open={selectVideoOpen}
      onClose={handleClose}
      scroll="paper"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Select Video
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{ position: 'absolute', top: 5, right: 5 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {!_.isEmpty(videoListing) && (
          <Grid container justify="flex-end">
            <IconButton onClick={changeViewMode}>
              {viewMode === 'grid' ? (
                <ViewList fontSize="small" />
              ) : (
                <ViewModule fontSize="small" />
              )}
            </IconButton>
          </Grid>
        )}
        {videoListingLoading && (
          <Grid container spacing={2}>
            {_.map(_.range(3), index => (
              <Grid item xs={4} key={index}>
                <Skeleton variant="rect" height={250} />
              </Grid>
            ))}
          </Grid>
        )}
        <RadioGroup
          onChange={e =>
            setTempVideo(
              _.head(_.filter(videoListing, { handle: e.target.value })),
            )
          }
        >
          <Grid container spacing={2}>
            {viewMode === 'grid' &&
              _.map(videoListing, video => (
                <Grid item xs={4} key={video.handle}>
                  <LazyLoad
                    offset={200}
                    placeholder={<Skeleton variant="rect" height={250} />}
                    debounce
                    once
                    overflow
                  >
                    <VideoGridItem>
                      <Thumbnail thumbnail_url={video.thumbUrl} />
                      <FormControlLabel
                        value={video.handle}
                        control={<Radio />}
                        label={video.videoName}
                      />
                    </VideoGridItem>
                  </LazyLoad>
                </Grid>
              ))}
            {viewMode === 'list' &&
              _.map(videoListing, video => (
                <Grid item xs={12} key={video.handle}>
                  <LazyLoad
                    offset={200}
                    placeholder={<Skeleton variant="rect" height={120} />}
                    debounce
                    once
                    overflow
                  >
                    <VideoListItem>
                      <FormControlLabel
                        value={video.handle}
                        control={<Radio />}
                        label={
                          <Grid container spacing={2}>
                            <Grid item xs={2}>
                              <Thumbnail thumbnail_url={video.thumbUrl} />
                            </Grid>
                            <Grid item style={{ alignSelf: 'center' }}>
                              <Typography noWrap>{video.videoName}</Typography>
                            </Grid>
                          </Grid>
                        }
                      />
                    </VideoListItem>
                  </LazyLoad>
                </Grid>
              ))}
          </Grid>
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleSelectVideoOk(tempVideo)}
          variant="outlined"
          color="primary"
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SelectVideo.propTypes = {
  dispatchVideoListing: PropTypes.func,
  videoListing: PropTypes.array,
  selectVideoOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSelectVideoOk: PropTypes.func,
  videoListingLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  videoListing: makeSelectVideoListing(),
  videoListingLoading: makeSelectVideoListingLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchVideoListing: options => dispatch(getVideoListing(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(SelectVideo);

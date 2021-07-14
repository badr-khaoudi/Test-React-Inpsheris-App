/**
 *
 * VideoGallery
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import { Thumbnail, Play } from 'components/FeedTypes/Wrapper';
import { openGallery } from 'containers/AuthBase/actions';

function VideoGallery({ videoGallery }) {
  const dispatch = useDispatch();
  return (
    <Grid container spacing={2}>
      {_.map(videoGallery, (video, index) => (
        <Grid key={`${video.uid}${index}`} item xs={6}>
          <Thumbnail
            thumbnail_url={video.thumbUrl || video.thumbGalleryUrl}
            onClick={() => {
              dispatch(openGallery('video', index, videoGallery));
            }}
            style={{ cursor: 'pointer' }}
          >
            <Play color="inherit" fontSize="large" />
          </Thumbnail>
        </Grid>
      ))}
    </Grid>
  );
}

VideoGallery.propTypes = {
  videoGallery: PropTypes.array,
};

export default memo(VideoGallery);

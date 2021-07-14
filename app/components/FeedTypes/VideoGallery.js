/**
 *
 * VideoGallery
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { Grid, Box, Avatar } from '@material-ui/core';
import { Videocam } from '@material-ui/icons';
import { openGallery } from 'containers/AuthBase/actions';
import { Thumbnail, Play } from './Wrapper';
import ListMore from './ListMore';

function VideoGallery({ videos, isFeedModal }) {
  const dispatch = useDispatch();
  return (
    <>
      {isFeedModal && (
        <Box marginTop={1} marginBottom={1}>
          <Avatar style={{ backgroundColor: '#F5F5F5' }}>
            <Videocam style={{ color: '#AEAEAE' }} />
          </Avatar>
        </Box>
      )}
      <Grid container spacing={2}>
        {_.map(_.slice(videos, 0, 4), (video, index) => (
          <Grid item xs={6} md={3} key={`${video.videoName}${index}`}>
            {video.isInternal ? (
              <Thumbnail
                thumbnail_url={video.thumbUrl || video.thumbGalleryUrl}
                onClick={e => {
                  e.stopPropagation();
                  dispatch(openGallery('video', index, videos));
                }}
              >
                <Play color="inherit" fontSize="large" />
                {_.size(videos) > 4 && index === 3 && (
                  <ListMore count={_.size(videos) - 3} />
                )}
              </Thumbnail>
            ) : (
              <a
                href={video.videoUrl}
                target="_blank"
                rel="nofollow noopener noreferrer"
                onClick={e => e.stopPropagation()}
              >
                <Thumbnail
                  thumbnail_url={video.thumbUrl || video.thumbGalleryUrl}
                >
                  <Play color="inherit" fontSize="large" />
                  {_.size(videos) > 4 && index === 3 && (
                    <ListMore count={_.size(videos) - 3} />
                  )}
                </Thumbnail>
              </a>
            )}
          </Grid>
        ))}
      </Grid>
    </>
  );
}

VideoGallery.propTypes = {
  videos: PropTypes.array,
  isFeedModal: PropTypes.bool,
};

export default memo(VideoGallery);

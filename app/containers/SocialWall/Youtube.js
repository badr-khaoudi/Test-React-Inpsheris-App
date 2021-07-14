/**
 *
 * Youtube
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import abbreviate from 'number-abbreviate';
import { Grid, Typography } from '@material-ui/core';
import YouTubeIcon from 'components/Icons/YouTube';
import { Thumbnail } from 'components/FeedBlocksP2V8/Wrapper';
import { WidgetItemCard } from './Wrapper';

function Youtube({ video }) {
  return (
    <a href={video.id.videoUrl} target="_blank">
      <WidgetItemCard>
        <Grid container spacing={2} wrap="nowrap">
          <Grid item xs={4}>
            <Thumbnail
              $background_image={video.snippet.thumbnails.defaultThumb.url}
              $count={2}
            />
          </Grid>
          <Grid item xs={8} zeroMinWidth>
            <Typography variant="h6" gutterBottom>
              {video.snippet.title}
            </Typography>
            <Typography>{`${abbreviate(
              video.statistics.viewCount,
              2,
            )} views • ${
              moment().diff(moment(video.snippet.publishTime), 'days') > 1
                ? moment(video.snippet.publishTime).format('LL')
                : moment(video.snippet.publishTime).fromNow()
            }`}</Typography>
          </Grid>
        </Grid>
        <YouTubeIcon className="widget-icon" />
      </WidgetItemCard>
    </a>
  );
}

Youtube.propTypes = {
  video: PropTypes.object,
};

export default memo(Youtube);

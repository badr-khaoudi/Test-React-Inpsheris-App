/**
 *
 * Dailymotion
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import abbreviate from 'number-abbreviate';
import { Grid, Typography } from '@material-ui/core';
import DailymotionIcon from 'components/Icons/Dailymotion';
import { Thumbnail } from 'components/FeedBlocksP2V8/Wrapper';
import { WidgetItemCard } from './Wrapper';

function Dailymotion({ video }) {
  return (
    <a href={video.url} target="_blank">
      <WidgetItemCard>
        <Grid container spacing={2} wrap="nowrap">
          <Grid item xs={4}>
            <Thumbnail $background_image={video.thumbnail_360_url} $count={2} />
          </Grid>
          <Grid item xs={8} zeroMinWidth>
            <Typography variant="h6" gutterBottom>
              {video.title}
            </Typography>
            <Typography>{`${abbreviate(video.views_total, 2)} views • ${
              moment().diff(moment.unix(video.created_time), 'days') > 1
                ? moment.unix(video.created_time).format('LL')
                : moment.unix(video.created_time).fromNow()
            }`}</Typography>
          </Grid>
        </Grid>
        <DailymotionIcon className="widget-icon" />
      </WidgetItemCard>
    </a>
  );
}

Dailymotion.propTypes = {
  video: PropTypes.object,
};

export default memo(Dailymotion);

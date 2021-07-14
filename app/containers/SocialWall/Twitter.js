/**
 *
 * Twitter
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Typography } from '@material-ui/core';
import TwitterIcon from 'components/Icons/Twitter';
import { linkifyTwitterEntities } from 'utils/helpers/linkifyEntities';
import { createMarkup } from 'utils/helpers/createMarkup';
import { Thumbnail } from 'components/FeedBlocksP2V8/Wrapper';
import { WidgetItemCard } from './Wrapper';

function Twitter({ tweet }) {
  return (
    <a
      href={`https://twitter.com/i/web/status/${tweet.id_str}`}
      target="_blank"
    >
      <WidgetItemCard>
        <Grid container spacing={2} wrap="nowrap">
          {!_.isEmpty(tweet.entities.media) && (
            <Grid item xs={4}>
              <Thumbnail
                $background_image={`${
                  _.head(tweet.entities.media).media_url_https
                }:small`}
                $count={2}
              />
            </Grid>
          )}
          <Grid item xs zeroMinWidth>
            <Typography
              color="textPrimary"
              dangerouslySetInnerHTML={createMarkup(
                linkifyTwitterEntities(tweet),
              )}
            />
          </Grid>
        </Grid>
        <TwitterIcon className="widget-icon" />
      </WidgetItemCard>
    </a>
  );
}

Twitter.propTypes = {
  tweet: PropTypes.object,
};

export default memo(Twitter);

/* eslint-disable indent */
/**
 *
 * LinkedIn
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Typography } from '@material-ui/core';
import LinkedInIcon from 'components/Icons/LinkedIn';
import { linkifyLinkedInEntities } from 'utils/helpers/linkifyEntities';
import { createMarkup } from 'utils/helpers/createMarkup';
import { Thumbnail } from 'components/FeedBlocksP2V8/Wrapper';
import { WidgetItemCard } from './Wrapper';

function LinkedIn({ feed }) {
  return (
    <a href={`https://www.linkedin.com/feed/update/${feed.id}`} target="_blank">
      <WidgetItemCard>
        <Grid container spacing={2} wrap="nowrap">
          {!_.isEmpty(
            feed.specificContent['com.linkedin.ugc.ShareContent'].media,
          ) &&
            !_.isEmpty(
              _.head(
                feed.specificContent['com.linkedin.ugc.ShareContent'].media,
              ).thumbnails,
            ) && (
              <Grid item xs={4}>
                <Thumbnail
                  $background_image={
                    _.head(
                      _.head(
                        feed.specificContent['com.linkedin.ugc.ShareContent']
                          .media,
                      ).thumbnails,
                    ).url
                  }
                  $count={2}
                />
              </Grid>
            )}
          <Grid item xs zeroMinWidth>
            <Typography
              color="textPrimary"
              dangerouslySetInnerHTML={createMarkup(
                linkifyLinkedInEntities(feed),
              )}
            />
          </Grid>
        </Grid>
        <LinkedInIcon className="widget-icon" />
      </WidgetItemCard>
    </a>
  );
}

LinkedIn.propTypes = {
  feed: PropTypes.object,
};

export default memo(LinkedIn);

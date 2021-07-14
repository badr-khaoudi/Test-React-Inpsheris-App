/**
 *
 * Instagram
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import { Thumbnail } from 'components/FeedTypes/Wrapper';

function Instagram({ instagramData }) {
  return (
    <Grid container spacing={2}>
      {_.map(instagramData.posts, post => (
        <Grid key={post.id} item xs={6}>
          <a
            href={post.permalink}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <Thumbnail thumbnail_url={post.media_url} />
          </a>
        </Grid>
      ))}
    </Grid>
  );
}

Instagram.propTypes = {
  instagramData: PropTypes.object,
};

export default memo(Instagram);

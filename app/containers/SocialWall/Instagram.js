/**
 *
 * Instagram
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { OpenInNew } from '@material-ui/icons';
import { Thumbnail } from 'components/FeedBlocksP2V8/Wrapper';
import { Overlay } from './Wrapper';

function Instagram({ post }) {
  return (
    <a component="a" href={post.permalink} target="_blank">
      <Thumbnail $background_image={post.media_url}>
        <Overlay>
          <OpenInNew color="inherit" fontSize="large" />
        </Overlay>
      </Thumbnail>
    </a>
  );
}

Instagram.propTypes = {
  post: PropTypes.object,
};

export default memo(Instagram);

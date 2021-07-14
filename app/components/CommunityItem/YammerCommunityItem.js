/**
 *
 * YammerCommunityItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CommunityThumb, CommunityTag, CommunityFeed } from './Wrapper';

const YammerCommunityItem = ({ community }) => (
  <a
    href={community.yammerWebUrl}
    target="_blank"
    rel="nofollow noopener noreferrer"
  >
    <CommunityThumb elevation={0} image={community.gridviewThumbBannerUrl}>
      <CommunityTag>{community.label}</CommunityTag>
      <CommunityFeed
        variant="subtitle2"
        image={community.gridviewThumbBannerUrl}
      >
        {community.description}
      </CommunityFeed>
    </CommunityThumb>
  </a>
);

YammerCommunityItem.propTypes = {
  community: PropTypes.object,
};

export default YammerCommunityItem;

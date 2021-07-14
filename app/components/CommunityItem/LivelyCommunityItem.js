/**
 *
 * LivelyCommunityItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CommunityThumb, CommunityTag, CommunityFeed } from './Wrapper';

const LivelyCommunityItem = ({ community }) => (
  <Link
    to={`/community/${encodeURIComponent(community.label)}/${community.uid}`}
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
  </Link>
);

LivelyCommunityItem.propTypes = {
  community: PropTypes.object,
};

export default LivelyCommunityItem;

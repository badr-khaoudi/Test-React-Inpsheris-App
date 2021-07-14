/**
 *
 * CommunityItem
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import Skeleton from '@material-ui/lab/Skeleton';

import { Community } from './Wrapper';
import LivelyCommunityItem from './LivelyCommunityItem';
import YammerCommunityItem from './YammerCommunityItem';

function CommunityItem(props) {
  const { community } = props;
  return (
    <Community item xs={12} sm={6} md={4} lg={4} xl={3}>
      <LazyLoad
        offset={200}
        placeholder={<Skeleton variant="rect" height="100%" />}
        debounce
        once
      >
        {community.isYammerCommunity !== true ? (
          <LivelyCommunityItem community={community} />
        ) : (
          <YammerCommunityItem community={community} />
        )}
      </LazyLoad>
    </Community>
  );
}

CommunityItem.propTypes = {
  community: PropTypes.object,
};

export default memo(CommunityItem);

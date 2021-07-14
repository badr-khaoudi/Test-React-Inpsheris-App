/**
 *
 * CommunityModalItem
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import LivelyCommunityModalItem from './LivelyCommunityModalItem';
import YammerCommunityModalItem from './YammerCommunityModalItem';

const CommunitySkeleton = () => (
  <>
    <Skeleton
      variant="rect"
      style={{ width: 150, height: 150, marginBottom: 10 }}
    />
    <Skeleton variant="rect" style={{ width: 150, height: 20 }} />
  </>
);

function CommunityModalItem(props) {
  const { community, activeAnchor } = props;
  const id = `${community.uid}anchor`;
  return (
    <Grid id={id} item style={{ minHeight: 205 }}>
      <LazyLoad
        offset={200}
        placeholder={<CommunitySkeleton />}
        debounce
        once
        overflow
        scrollContainer="backdrop"
      >
        {community.isYammerCommunity !== true ? (
          <LivelyCommunityModalItem
            active={id === activeAnchor}
            community={community}
          />
        ) : (
          <YammerCommunityModalItem
            active={id === activeAnchor}
            community={community}
          />
        )}
      </LazyLoad>
    </Grid>
  );
}

CommunityModalItem.propTypes = {
  community: PropTypes.object,
  activeAnchor: PropTypes.string,
};

export default memo(CommunityModalItem);

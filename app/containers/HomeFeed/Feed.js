import React, { memo } from 'react';
import PropTypes from 'prop-types';
import FeedP2V8 from 'components/FeedP2V8';
import WidgetsP2V8 from 'components/WidgetsP2V8';
import { PinCommunity } from 'components/WidgetsP2V8/exports';

const Feed = ({ content }) => {
  if (content.type === 'feed') {
    return <FeedP2V8 contentUid={content.uid} referrer="HP" />;
  }
  if (content.type === 'pin-community') {
    return <PinCommunity />;
  }
  if (content.type === 'widget') {
    return <WidgetsP2V8 uid={content.uid} />;
  }
  return 'null';
};

Feed.propTypes = {
  content: PropTypes.object,
};

export default memo(Feed);

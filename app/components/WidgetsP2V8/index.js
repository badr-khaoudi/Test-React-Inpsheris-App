/**
 *
 * WidgetsP2V8
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import LazyLoad from 'react-lazyload';
import FeedSkeleton from 'components/FeedP2V8/FeedSkeleton';
import { makeSelectWidget } from 'containers/GlobalEntities/selectors';
// import messages from './messages';
import CheckType from './CheckType';

function WidgetsP2V8({ uid }) {
  const widget = useSelector(makeSelectWidget(uid));
  return (
    <LazyLoad
      offset={700}
      placeholder={<FeedSkeleton />}
      debounce
      once
      style={{
        marginBottom: 24,
      }}
    >
      {CheckType(widget)}
    </LazyLoad>
  );
}

WidgetsP2V8.propTypes = {
  uid: PropTypes.string,
};

export default memo(WidgetsP2V8);

/**
 *
 * Activities
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Feed from 'containers/FeedV8';
import PrivateMessageWrapper from 'components/PrivateMessageWrapper';
import FeedSkeleton from 'components/FeedTypesV8/FeedSkeleton';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { makeSelectProfile, makeSelectProfileLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { profile as profileAction, profileMore } from './actions';
// import messages from './messages';

export function Activities(props) {
  useInjectReducer({ key: 'activities', reducer });
  useInjectSaga({ key: 'activities', saga });

  const {
    author,
    activityFilter,
    statusFilters,
    communityFilters,
    authorFilters,
    dateFromFilter,
    dateToFilter,
    // viewMode,
    dispatchProfile,
    dispatchProfileMore,
    profile,
    profileLoading,
    locale,
  } = props;

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatchProfile({
      author,
      page: 1,
      language: locale,
      activityFilter,
      statusFilters,
      communityFilters,
      authorFilters,
      dateFromFilter,
      dateToFilter,
    });
  }, [
    author,
    activityFilter,
    statusFilters,
    communityFilters,
    authorFilters,
    dateFromFilter,
    dateToFilter,
  ]);

  useEffect(() => {
    if (page > 1) {
      dispatchProfileMore({
        author,
        page,
        language: locale,
        activityFilter,
        statusFilters,
        communityFilters,
        authorFilters,
        dateFromFilter,
        dateToFilter,
      });
    }
  }, [page]);

  return (
    <>
      {activityFilter === 'myActivities' &&
        !_.isEmpty(profile.myActivities) &&
        _.map(profile.myActivities.contents, content => (
          <Feed contentUid={content} key={content} referrer="MyProfile" />
        ))}
      {activityFilter === 'privateMessage' &&
        !_.isEmpty(profile.privateMessage) &&
        _.map(profile.privateMessage.contents, content => (
          <PrivateMessageWrapper contentUid={content} key={content} />
        ))}
      {profileLoading &&
        _.map(_.range(4), index => <FeedSkeleton key={index} />)}
      {page * 10 === _.size(profile.contents) && (
        <Button
          onClick={() => setPage(page + 1)}
          variant="outlined"
          color="primary"
        >
          View More
        </Button>
      )}
    </>
  );
}

Activities.propTypes = {
  author: PropTypes.string,
  activityFilter: PropTypes.string,
  statusFilters: PropTypes.array,
  communityFilters: PropTypes.array,
  authorFilters: PropTypes.array,
  dateFromFilter: PropTypes.string,
  dateToFilter: PropTypes.string,
  // viewMode: PropTypes.string,
  dispatchProfile: PropTypes.func,
  dispatchProfileMore: PropTypes.func,
  profile: PropTypes.object,
  profileLoading: PropTypes.bool,
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  profile: makeSelectProfile(),
  profileLoading: makeSelectProfileLoading(),
  locale: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchProfile: options => dispatch(profileAction(options)),
    dispatchProfileMore: options => dispatch(profileMore(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Activities);

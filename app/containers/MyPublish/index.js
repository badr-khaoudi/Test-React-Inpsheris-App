/**
 *
 * MyPublish
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
import FeedP2V8 from 'components/FeedP2V8';
import FeedSkeleton from 'components/FeedP2V8/FeedSkeleton';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import {
  makeSelectPublications,
  makeSelectPublicationsLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  publications as publicationsAction,
  publicationsMore,
} from './actions';
// import messages from './messages';

export function MyPublish(props) {
  useInjectReducer({ key: 'myPublish', reducer });
  useInjectSaga({ key: 'myPublish', saga });

  const {
    author,
    statusFilters,
    communityFilters,
    authorFilters,
    dateFromFilter,
    dateToFilter,
    // viewMode,
    dispatchPublications,
    dispatchPublicationsMore,
    publications,
    publicationsLoading,
    locale,
  } = props;

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatchPublications({
      author,
      page: 1,
      status: 'publish',
      language: locale,
      statusFilters,
      communityFilters,
      authorFilters,
      dateFromFilter,
      dateToFilter,
    });
  }, [
    author,
    statusFilters,
    communityFilters,
    authorFilters,
    dateFromFilter,
    dateToFilter,
  ]);

  useEffect(() => {
    if (page > 1) {
      dispatchPublicationsMore({
        author,
        page,
        status: 'publish',
        language: locale,
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
      {publications.contents &&
        _.map(publications.contents, content => (
          <FeedP2V8 contentUid={content} key={content} referrer="MyProfile" />
        ))}
      {publicationsLoading &&
        _.map(_.range(4), index => <FeedSkeleton key={index} />)}
      {page * 10 === _.size(publications.contents) && (
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

MyPublish.propTypes = {
  author: PropTypes.string,
  statusFilters: PropTypes.array,
  communityFilters: PropTypes.array,
  authorFilters: PropTypes.array,
  dateFromFilter: PropTypes.string,
  dateToFilter: PropTypes.string,
  // viewMode: PropTypes.string,
  dispatchPublications: PropTypes.func,
  dispatchPublicationsMore: PropTypes.func,
  publications: PropTypes.object,
  publicationsLoading: PropTypes.bool,
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  publications: makeSelectPublications(),
  publicationsLoading: makeSelectPublicationsLoading(),
  locale: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchPublications: options => dispatch(publicationsAction(options)),
    dispatchPublicationsMore: options => dispatch(publicationsMore(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MyPublish);

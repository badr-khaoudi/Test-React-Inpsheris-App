/**
 *
 * MyDraft
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import FeedP2V8 from 'components/FeedP2V8';
import FeedSkeleton from 'components/FeedP2V8/FeedSkeleton';
import { makeSelectDrafts, makeSelectDraftsLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { drafts as draftsAction, draftsMore } from './actions';
// import messages from './messages';

export function MyDraft(props) {
  useInjectReducer({ key: 'myDraft', reducer });
  useInjectSaga({ key: 'myDraft', saga });

  const {
    author,
    statusFilters,
    communityFilters,
    authorFilters,
    dateFromFilter,
    dateToFilter,
    // viewMode,
    dispatchDrafts,
    dispatchDraftsMore,
    drafts,
    draftsLoading,
    locale,
    darftFilter,
  } = props;

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatchDrafts({
      author,
      page: 1,
      status: 'draft',
      language: locale,
      darftFilter,
      statusFilters,
      communityFilters,
      authorFilters,
      dateFromFilter,
      dateToFilter,
    });
  }, [
    author,
    darftFilter,
    statusFilters,
    communityFilters,
    authorFilters,
    dateFromFilter,
    dateToFilter,
  ]);

  useEffect(() => {
    if (page > 1) {
      dispatchDraftsMore({
        author,
        page,
        status: 'draft',
        language: locale,
        darftFilter,
        statusFilters,
        communityFilters,
        authorFilters,
        dateFromFilter,
        dateToFilter,
      });
    }
  }, [page]);

  return (
    <Grid container spacing={2}>
      <Grid item xs>
        {drafts.contents &&
          _.map(drafts.contents, content => (
            <FeedP2V8 contentUid={content} key={content} referrer="MyProfile" />
          ))}
        {draftsLoading &&
          _.map(_.range(4), index => <FeedSkeleton key={index} />)}
        {page * 10 === _.size(drafts.contents) && (
          <Button
            onClick={() => setPage(page + 1)}
            variant="outlined"
            color="primary"
          >
            View More
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

MyDraft.propTypes = {
  author: PropTypes.string,
  statusFilters: PropTypes.array,
  communityFilters: PropTypes.array,
  authorFilters: PropTypes.array,
  dateFromFilter: PropTypes.string,
  dateToFilter: PropTypes.string,
  // viewMode: PropTypes.string,
  dispatchDrafts: PropTypes.func,
  dispatchDraftsMore: PropTypes.func,
  drafts: PropTypes.object,
  draftsLoading: PropTypes.bool,
  locale: PropTypes.string,
  darftFilter: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  drafts: makeSelectDrafts(),
  draftsLoading: makeSelectDraftsLoading(),
  locale: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchDrafts: options => dispatch(draftsAction(options)),
    dispatchDraftsMore: options => dispatch(draftsMore(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MyDraft);

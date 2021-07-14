/**
 *
 * HomeFeed
 *
 */

import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import axios from 'axios';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { animateScroll as scroll } from 'react-scroll';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Grid, FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { Tune } from '@material-ui/icons';
import Pagination from '@material-ui/lab/Pagination';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import './navigation.scss';
// import Feed from 'containers/FeedV8';
// import FeedP2V8 from 'components/FeedP2V8';
import FeedSkeleton from 'components/FeedP2V8/FeedSkeleton';
import Empty from 'components/Empty/Loadable';
import { makeSelectConfig } from 'containers/AuthBase/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import {
  makeSelectHomeFeed,
  makeSelectHomeFeedLoading,
  makeSelectHomeFeedError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { getHomeFeed } from './actions';
import { ChipButton } from './Wrapper';
import Feed from './Feed';

export function HomeFeed(props) {
  useInjectReducer({ key: 'homeFeed', reducer });
  useInjectSaga({ key: 'homeFeed', saga });

  const {
    dispatchHomeFeed,
    homeFeed,
    homeFeedLoading,
    yammerIntegration,
    locale,
  } = props;
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('lively');
  const [widgets, setWidgets] = useState(false);
  const cancelToken = useRef();

  const handleHomeFeed = _page => {
    if (cancelToken.current) {
      cancelToken.current.cancel();
    }
    cancelToken.current = axios.CancelToken.source();
    dispatchHomeFeed(
      widgets,
      {
        page: _page,
        type: filter,
        itemsPerPage: 12,
        showPinnedArticle: false,
        language: locale,
      },
      cancelToken.current.token,
    );
  };

  useEffect(() => {
    if (page > 1) {
      setPage(1);
    }
    handleHomeFeed(1);
    return () => cancelToken.current.cancel();
  }, [filter, widgets]);

  const scrollRef = useRef(null);

  const handleChange = useCallback(
    (event, value) => {
      if (scrollRef.current) {
        scroll.scrollTo(scrollRef.current.offsetTop - 100, { duration: 500 });
      }
      setPage(value);
      handleHomeFeed(value);
    },
    [filter],
  );

  return (
    <>
      <Grid
        container
        justify="flex-end"
        alignItems="center"
        style={{ marginBottom: 24 }}
        ref={scrollRef}
      >
        {yammerIntegration.value && (
          <Grid item xs>
            <ChipButton
              onClick={() => setFilter('lively')}
              variant="outlined"
              color={filter === 'lively' ? 'secondary' : 'default'}
            >
              Lively
            </ChipButton>
            <ChipButton
              onClick={() => setFilter('yammer')}
              variant="outlined"
              color={filter === 'yammer' ? 'secondary' : 'default'}
            >
              Yammer
            </ChipButton>
          </Grid>
        )}
        {filter === 'lively' && (
          <>
            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    color="secondary"
                    checked={widgets}
                    onChange={() => setWidgets(!widgets)}
                  />
                }
                label="Widgets"
              />
            </Grid>
            <Grid item>
              <Button variant="outlined" startIcon={<Tune />}>
                Filter
              </Button>
            </Grid>
          </>
        )}
      </Grid>
      {homeFeedLoading &&
        _.map(_.range(4), index => <FeedSkeleton key={index} />)}
      {_.isEmpty(homeFeed) && homeFeed.totalPages === 0 && (
        <Empty title="No content available." />
      )}
      {!_.isEmpty(homeFeed) && (
        <>
          {_.map(homeFeed.contents, content => (
            <Feed key={content.uid} content={content} />
          ))}
          <Pagination
            shape="rounded"
            color="primary"
            count={homeFeed.totalPages}
            page={page}
            onChange={handleChange}
          />
        </>
      )}
    </>
  );
}

HomeFeed.propTypes = {
  dispatchHomeFeed: PropTypes.func,
  homeFeed: PropTypes.object,
  homeFeedLoading: PropTypes.bool,
  yammerIntegration: PropTypes.object,
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  homeFeed: makeSelectHomeFeed(),
  homeFeedLoading: makeSelectHomeFeedLoading(),
  homeFeedError: makeSelectHomeFeedError(),
  yammerIntegration: makeSelectConfig('YAMMER_INTEGRATION'),
  locale: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchHomeFeed: (widgets, options, cancelToken) =>
      dispatch(getHomeFeed(widgets, options, cancelToken)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomeFeed);

/* eslint-disable no-underscore-dangle */
/**
 *
 * Tab
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import * as microsoftTeams from '@microsoft/teams-js';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import {
  makeSelectCommunityList,
  makeSelectCommunityTab,
  makeSelectCommunityTabLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import {
  getCommunityList,
  getCommunityTab,
  getCommunityTabMore,
} from './actions';
import Feed from '../FeedV8';
import FeedModal from '../FeedModal/Loadable';

export function Tab(props) {
  useInjectReducer({ key: 'tab', reducer });
  useInjectSaga({ key: 'tab', saga });

  const {
    dispatchCommunityList,
    dispatchCommunityTab,
    dispatchCommunityTabMore,
    communityList,
    communityTab,
    communityTabLoading,
  } = props;

  const [microsoftTeamsContext, setMicrosoftTeamsContext] = useState();
  const [microsoftCommunity, setMicrosoftCommunity] = useState({});
  const [tab, setTab] = useState({});
  const itemsPerPage = 4;
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState('');

  useEffect(() => {
    microsoftTeams.getContext(context => {
      setMicrosoftTeamsContext(context);
    });
    if (_.isEmpty(communityList)) {
      dispatchCommunityList({ isLinkMSTeam: true });
    }
  }, []);

  useEffect(() => {
    if (microsoftTeamsContext && !_.isEmpty(communityList)) {
      const _microsoftCommunity = _.head(
        _.filter(
          communityList,
          community =>
            community.microsoftTeamId === microsoftTeamsContext.groupId &&
            _.size(
              _.find(community.tabs, {
                microsoftChannelId: microsoftTeamsContext.teamId,
              }),
            ) >= 1,
        ),
      );
      const _tab = _.find(_microsoftCommunity.tabs, {
        microsoftChannelId: microsoftTeamsContext.teamId,
      });
      setMicrosoftCommunity(_microsoftCommunity);
      setTab(_tab);
      dispatchCommunityTab({
        communityUid: _microsoftCommunity.uid,
        tabUid: _tab.uid,
        tabType: _tab.tabType,
        page,
        itemsPerPage,
      });
    }
  }, [microsoftTeamsContext, communityList]);

  useEffect(() => {
    if (window.parent === window.self && !_.isEmpty(communityList)) {
      const _microsoftCommunity = _.head(
        _.filter(
          communityList,
          community =>
            community.microsoftTeamId ===
              '1524b214-376d-4e03-b399-ed1b79e6ea08' &&
            _.size(
              _.find(community.tabs, {
                microsoftChannelId:
                  '19:a1664ed7b56849468e87e847f459de46@thread.tacv2',
              }),
            ) >= 1,
        ),
      );
      const _tab = _.find(_microsoftCommunity.tabs, {
        microsoftChannelId: '19:a1664ed7b56849468e87e847f459de46@thread.tacv2',
      });
      setMicrosoftCommunity(_microsoftCommunity);
      setTab(_tab);
      dispatchCommunityTab({
        communityUid: _microsoftCommunity.uid,
        tabUid: _tab.uid,
        tabType: _tab.tabType,
        page,
        itemsPerPage,
      });
    }
  }, [communityList]);

  useEffect(() => {
    if (microsoftCommunity.uid && tab.uid && page > 1) {
      dispatchCommunityTabMore({
        communityUid: microsoftCommunity.uid,
        tabUid: tab.uid,
        tabType: tab.tabType,
        page,
        itemsPerPage,
      });
    }
  }, [microsoftCommunity, tab, page]);

  return (
    <>
      {communityTab && !_.isEmpty(communityTab.contents) && (
        <InfiniteScroll
          dataLength={_.size(communityTab.contents)}
          next={() => setPage(page + 1)}
          hasMore={page * itemsPerPage === _.size(communityTab.contents)}
        >
          {_.map(communityTab.contents, content => (
            <Feed
              content={content}
              key={content.uid}
              setSelected={setSelected}
            />
          ))}
        </InfiniteScroll>
      )}
      {communityTabLoading && (
        <Grid container>
          <Grid item style={{ marginRight: 30 }}>
            <Skeleton variant="circle" height={60} width={60} />
            <Skeleton variant="text" height={30} />
          </Grid>
          <Grid item xs style={{ marginBottom: 30 }}>
            <Skeleton variant="rect" height={200} />
          </Grid>
        </Grid>
      )}
      {selected !== '' && (
        <FeedModal uid={selected} handleClose={() => setSelected('')} />
      )}
    </>
  );
}

Tab.propTypes = {
  dispatchCommunityList: PropTypes.func,
  dispatchCommunityTab: PropTypes.func,
  dispatchCommunityTabMore: PropTypes.func,
  communityList: PropTypes.array,
  communityTab: PropTypes.object,
  communityTabLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  communityList: makeSelectCommunityList(),
  communityTab: makeSelectCommunityTab(),
  communityTabLoading: makeSelectCommunityTabLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCommunityList: options => dispatch(getCommunityList(options)),
    dispatchCommunityTab: options => dispatch(getCommunityTab(options)),
    dispatchCommunityTabMore: options => dispatch(getCommunityTabMore(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Tab);

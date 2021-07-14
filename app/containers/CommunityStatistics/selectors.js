import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the communityStatistics state domain
 */

const selectCommunityStatisticsDomain = state =>
  state.communityStatistics || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CommunityStatistics
 */

const makeSelectCountContentCreatedByCommunity = () =>
  createSelector(
    selectCommunityStatisticsDomain,
    substate => substate.countContentCreatedByCommunity,
  );

const makeSelectCountContentCreatedByCommunityTable = () =>
  createSelector(
    selectCommunityStatisticsDomain,
    substate => substate.countContentCreatedByCommunityTable,
  );

const makeSelectAnalyzeContentViewedByCommunity = () =>
  createSelector(
    selectCommunityStatisticsDomain,
    substate => substate.analyzeContentViewedByCommunity,
  );

const makeSelectAnalyzeContentViewedByCommunityTable = () =>
  createSelector(
    selectCommunityStatisticsDomain,
    substate => substate.analyzeContentViewedByCommunityTable,
  );

const makeSelectViewActivityCommunity = () =>
  createSelector(
    selectCommunityStatisticsDomain,
    substate => substate.viewActivityCommunity,
  );

const makeSelectCountCommunityStatisticsLoading = () =>
  createSelector(
    selectCommunityStatisticsDomain,
    substate => substate.communityStatisticsLoading,
  );

// const makeSelectCommunityStatistics = () =>
//   createSelector(
//     selectCommunityStatisticsDomain,
//     substate => substate,
//   );

// export default makeSelectCommunityStatistics;
export {
  makeSelectCountContentCreatedByCommunity,
  makeSelectCountContentCreatedByCommunityTable,
  makeSelectAnalyzeContentViewedByCommunity,
  makeSelectAnalyzeContentViewedByCommunityTable,
  makeSelectViewActivityCommunity,
  makeSelectCountCommunityStatisticsLoading,
};

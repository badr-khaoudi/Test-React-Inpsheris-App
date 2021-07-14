import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the statistics state domain
 */

const selectStatisticsDomain = state => state.statistics || initialState;

const makeSelectLastUpdatedDate = () =>
  createSelector(
    selectStatisticsDomain,
    substate => substate.lastUpdatedDate,
  );

const makeSelectJobListLoading = () =>
  createSelector(
    selectStatisticsDomain,
    substate => substate.jobListLoading,
  );

const makeSelectJobListSuccess = () =>
  createSelector(
    selectStatisticsDomain,
    substate => substate.jobListSuccess,
  );

// const makeSelectStatistics = () =>
//   createSelector(
//     selectStatisticsDomain,
//     substate => substate,
//   );

// export default makeSelectStatistics;
export {
  makeSelectLastUpdatedDate,
  makeSelectJobListLoading,
  makeSelectJobListSuccess,
};

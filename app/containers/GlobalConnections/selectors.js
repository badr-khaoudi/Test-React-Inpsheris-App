import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the globalConnections state domain
 */

const selectGlobalConnectionsDomain = state =>
  state.globalConnections || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GlobalConnections
 */

const makeSelectGlobalConnectionsLoading = () =>
  createSelector(
    selectGlobalConnectionsDomain,
    substate => substate.globalConnectionsLoading,
  );

const makeSelectCountTotal = () =>
  createSelector(
    selectGlobalConnectionsDomain,
    substate => substate.countTotal,
  );

const makeSelectCountTotalTable = () =>
  createSelector(
    selectGlobalConnectionsDomain,
    substate => substate.countTotalTable,
  );

const makeSelectCountByDepartment = () =>
  createSelector(
    selectGlobalConnectionsDomain,
    substate => substate.countByDepartment,
  );

const makeSelectCountByStatus = () =>
  createSelector(
    selectGlobalConnectionsDomain,
    substate => substate.countByStatus,
  );

const makeSelectCountByCommunityStatus = () =>
  createSelector(
    selectGlobalConnectionsDomain,
    substate => substate.countByCommunityStatus,
  );

// export default makeSelectGlobalConnections;
export {
  makeSelectGlobalConnectionsLoading,
  makeSelectCountTotal,
  makeSelectCountTotalTable,
  makeSelectCountByDepartment,
  makeSelectCountByStatus,
  makeSelectCountByCommunityStatus,
};

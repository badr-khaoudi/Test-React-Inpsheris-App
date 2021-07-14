import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sessionsByOrigin state domain
 */

const selectSessionsByOriginDomain = state =>
  state.sessionsByOrigin || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by SessionsByOrigin
 */

const makeSelectCountCommunityMemberConnection = () =>
  createSelector(
    selectSessionsByOriginDomain,
    substate => substate.countCommunityMemberConnection,
  );

const makeSelectCountCommunityMemberConnectionLoading = () =>
  createSelector(
    selectSessionsByOriginDomain,
    substate => substate.countCommunityMemberConnectionLoading,
  );

// const makeSelectSessionsByOrigin = () =>
//   createSelector(
//     selectSessionsByOriginDomain,
//     substate => substate,
//   );

// export default makeSelectSessionsByOrigin;
export {
  makeSelectCountCommunityMemberConnection,
  makeSelectCountCommunityMemberConnectionLoading,
};

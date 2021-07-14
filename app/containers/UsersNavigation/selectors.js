import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the usersNavigation state domain
 */

const selectUsersNavigationDomain = state =>
  state.usersNavigation || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UsersNavigation
 */

const makeSelectListContentViewedBySource = () =>
  createSelector(
    selectUsersNavigationDomain,
    substate => substate.listContentViewedBySource,
  );

const makeSelectListContentViewedBySourceLoading = () =>
  createSelector(
    selectUsersNavigationDomain,
    substate => substate.listContentViewedBySourceLoading,
  );

// const makeSelectUsersNavigation = () =>
//   createSelector(
//     selectUsersNavigationDomain,
//     substate => substate,
//   );

// export default makeSelectUsersNavigation;
export {
  makeSelectListContentViewedBySource,
  makeSelectListContentViewedBySourceLoading,
};

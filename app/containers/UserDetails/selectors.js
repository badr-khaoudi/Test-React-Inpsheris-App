import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userDetails state domain
 */

const selectUserDetailsDomain = state => state.userDetails || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserDetails
 */

const makeSelectListUserDetailsAndActions = () =>
  createSelector(
    selectUserDetailsDomain,
    substate => substate.listUserDetailsAndActions,
  );

const makeSelectTotalConnectAtTheMoment = () =>
  createSelector(
    selectUserDetailsDomain,
    substate => substate.totalConnectAtTheMoment,
  );

const makeSelectViewDetails = () =>
  createSelector(
    selectUserDetailsDomain,
    substate => substate.viewDetails,
  );

const makeSelectViewDetailsLoading = () =>
  createSelector(
    selectUserDetailsDomain,
    substate => substate.viewDetailsLoading,
  );

const makeSelectListUserNeverConnect = () =>
  createSelector(
    selectUserDetailsDomain,
    substate => substate.listUserNeverConnect,
  );

const makeSelectListUserConnect = () =>
  createSelector(
    selectUserDetailsDomain,
    substate => substate.listUserConnect,
  );

const makeSelectListUserConnectLessEqualTenTimes = () =>
  createSelector(
    selectUserDetailsDomain,
    substate => substate.listUserConnectLessEqualTenTimes,
  );

const makeSelectListUserConnectionSummary = () =>
  createSelector(
    selectUserDetailsDomain,
    substate => substate.listUserConnectionSummary,
  );

const makeSelectUserDetailsLoading = () =>
  createSelector(
    selectUserDetailsDomain,
    substate => substate.userDetailsLoading,
  );

// const makeSelectUserDetails = () =>
//   createSelector(
//     selectUserDetailsDomain,
//     substate => substate,
//   );

// export default makeSelectUserDetails;
export {
  makeSelectListUserDetailsAndActions,
  makeSelectTotalConnectAtTheMoment,
  makeSelectViewDetails,
  makeSelectViewDetailsLoading,
  makeSelectListUserNeverConnect,
  makeSelectListUserConnect,
  makeSelectListUserConnectLessEqualTenTimes,
  makeSelectListUserConnectionSummary,
  makeSelectUserDetailsLoading,
};

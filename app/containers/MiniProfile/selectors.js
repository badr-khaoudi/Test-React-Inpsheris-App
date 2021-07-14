import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the miniProfile state domain
 */

const selectMiniProfileDomain = state => state.miniProfile || initialState;

const makeSelectUserProfileLoading = () =>
  createSelector(
    selectMiniProfileDomain,
    globalState => globalState.userProfileLoading,
  );

const makeSelectUserProfileSuccess = () =>
  createSelector(
    selectMiniProfileDomain,
    globalState => globalState.userProfileSuccess,
  );

// const makeSelectMiniProfile = () =>
//   createSelector(
//     selectMiniProfileDomain,
//     substate => substate,
//   );

// export default makeSelectMiniProfile;
export { makeSelectUserProfileLoading, makeSelectUserProfileSuccess };

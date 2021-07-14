import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the activities state domain
 */

const selectActivitiesDomain = state => state.activities || initialState;

const makeSelectProfile = () =>
  createSelector(
    selectActivitiesDomain,
    globalState => globalState.profile,
  );

const makeSelectProfileLoading = () =>
  createSelector(
    selectActivitiesDomain,
    globalState => globalState.profileLoading,
  );

// const makeSelectActivities = () =>
//   createSelector(
//     selectActivitiesDomain,
//     substate => substate,
//   );

// export default makeSelectActivities;
export { makeSelectProfile, makeSelectProfileLoading };

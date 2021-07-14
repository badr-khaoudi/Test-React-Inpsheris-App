import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the userAutocomplete state domain
 */

const selectUserAutocompleteDomain = state =>
  state.userAutocomplete || initialState;

const makeSelectUserList = () =>
  createSelector(
    selectUserAutocompleteDomain,
    substate => substate.userList,
  );

const makeSelectUserListLoading = () =>
  createSelector(
    selectUserAutocompleteDomain,
    substate => substate.userListLoading,
  );

// const makeSelectUserAutocomplete = () =>
//   createSelector(
//     selectUserAutocompleteDomain,
//     substate => substate,
//   );

// export default makeSelectUserAutocomplete;
export { makeSelectUserList, makeSelectUserListLoading };

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the editAbout state domain
 */

const selectEditAboutDomain = state => state.editAbout || initialState;

const makeSelectCustomFieldList = () =>
  createSelector(
    selectEditAboutDomain,
    globalState => globalState.customFieldList,
  );

const makeSelectServiceFilterList = () =>
  createSelector(
    selectEditAboutDomain,
    globalState => globalState.serviceFilterList,
  );

const makeSelectHobbyList = () =>
  createSelector(
    selectEditAboutDomain,
    globalState => globalState.hobbyList,
  );

const makeSelectEmployeeList = () =>
  createSelector(
    selectEditAboutDomain,
    globalState => globalState.employeeList,
  );

const makeSelectEditUserSuccess = () =>
  createSelector(
    selectEditAboutDomain,
    globalState => globalState.editUserSuccess,
  );

// const makeSelectEditAbout = () =>
//   createSelector(
//     selectEditAboutDomain,
//     substate => substate,
//   );

// export default makeSelectEditAbout;
export {
  makeSelectCustomFieldList,
  makeSelectServiceFilterList,
  makeSelectHobbyList,
  makeSelectEmployeeList,
  makeSelectEditUserSuccess,
};

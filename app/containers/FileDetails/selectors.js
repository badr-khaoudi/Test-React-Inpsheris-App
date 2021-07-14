import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the fileDetails state domain
 */

const selectFileDetailsDomain = state => state.fileDetails || initialState;

/**
 * Other specific selectors
 */

const makeSelectFileDetails = () =>
  createSelector(
    selectFileDetailsDomain,
    globalState => globalState.fileDetails,
  );

const makeSelectEditFileDetails = () =>
  createSelector(
    selectFileDetailsDomain,
    globalState => globalState.editFileDetails,
  );

/**
 * Default selector used by FileDetails
 */

// const makeSelectFileDetails = () =>
//   createSelector(
//     selectFileDetailsDomain,
//     substate => substate,
//   );

// export default makeSelectFileDetails;
export { makeSelectFileDetails, makeSelectEditFileDetails };

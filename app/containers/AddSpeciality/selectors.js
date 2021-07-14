import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the addSpeciality state domain
 */

const selectAddSpecialityDomain = state => state.addSpeciality || initialState;

const makeSelectUploadFile = () =>
  createSelector(
    selectAddSpecialityDomain,
    globalState => globalState.uploadFile,
  );

const makeSelectAddSpecialitySuccess = () =>
  createSelector(
    selectAddSpecialityDomain,
    globalState => globalState.addSpecialitySuccess,
  );

// const makeSelectAddSpeciality = () =>
//   createSelector(
//     selectAddSpecialityDomain,
//     substate => substate,
//   );

// export default makeSelectAddSpeciality;
export { makeSelectUploadFile, makeSelectAddSpecialitySuccess };

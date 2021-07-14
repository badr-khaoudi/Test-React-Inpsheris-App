import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the editMyProfile state domain
 */

const selectEditMyProfileDomain = state => state.editMyProfile || initialState;

const makeSelectUploadFile = field =>
  createSelector(
    selectEditMyProfileDomain,
    globalState => globalState.uploadFile[field],
  );

const makeSelectChangePhotoLoading = () =>
  createSelector(
    selectEditMyProfileDomain,
    globalState => globalState.changePhotoLoading,
  );

const makeSelectChangePhotoSuccess = () =>
  createSelector(
    selectEditMyProfileDomain,
    globalState => globalState.changePhotoSuccess,
  );

// const makeSelectEditMyProfile = () =>
//   createSelector(
//     selectEditMyProfileDomain,
//     substate => substate,
//   );

// export default makeSelectEditMyProfile;
export {
  makeSelectUploadFile,
  makeSelectChangePhotoLoading,
  makeSelectChangePhotoSuccess,
};

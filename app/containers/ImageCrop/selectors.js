import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the imageCrop state domain
 */

const selectImageCropDomain = state => state.imageCrop || initialState;

const makeSelectCropImage = () =>
  createSelector(
    selectImageCropDomain,
    globalState => globalState.cropImage,
  );

const makeSelectCropImageSuccess = () =>
  createSelector(
    selectImageCropDomain,
    globalState => globalState.cropImageSuccess,
  );

// const makeSelectImageCrop = () =>
//   createSelector(
//     selectImageCropDomain,
//     substate => substate,
//   );

// export default makeSelectImageCrop;
export { makeSelectCropImage, makeSelectCropImageSuccess };

/*
 *
 * ImageCrop reducer
 *
 */
import produce from 'immer';
import {
  CROP_IMAGE,
  CROP_IMAGE_SUCCESS,
  CROP_IMAGE_ERROR,
  CLEAN_CROP_IMAGE,
} from './constants';

export const initialState = {
  cropImage: {},
  cropImageLoading: false,
  cropImageSuccess: false,
  cropImageError: '',
};

/* eslint-disable default-case, no-param-reassign */
const imageCropReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case CLEAN_CROP_IMAGE:
      case CROP_IMAGE:
        draft.cropImage = {};
        draft.cropImageLoading = true;
        draft.cropImageSuccess = false;
        draft.cropImageError = '';
        break;
      case CROP_IMAGE_SUCCESS:
        draft.cropImage = action.data;
        draft.cropImageLoading = false;
        draft.cropImageSuccess = true;
        draft.cropImageError = '';
        break;
      case CROP_IMAGE_ERROR:
        draft.cropImageLoading = false;
        draft.cropImageSuccess = false;
        draft.cropImageError = action.error;
        break;
      default:
        return state;
    }
  });

export default imageCropReducer;

/*
 *
 * EditCommunity reducer
 *
 */
import produce from 'immer';
import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CHANGE_IMAGE,
  CHANGE_IMAGE_SUCCESS,
  CHANGE_IMAGE_ERROR,
  CLEAN_EDIT_COMMUNITY,
} from './constants';

export const initialState = {
  uploadFile: {},
  uploadFileLoading: false,
  uploadFileSuccess: false,
  uploadFileError: '',
  changeImageLoading: false,
  changeImageSuccess: false,
  changeImageError: '',
};

/* eslint-disable default-case, no-param-reassign */
const editCommunityReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case UPLOAD_FILE:
        draft.uploadFileLoading = true;
        draft.uploadFileSuccess = false;
        draft.uploadFileError = '';
        break;
      case UPLOAD_FILE_SUCCESS:
        draft.uploadFile[action.field] = action.data;
        draft.uploadFileLoading = false;
        draft.uploadFileSuccess = true;
        draft.uploadFileError = '';
        break;
      case UPLOAD_FILE_ERROR:
        draft.uploadFileLoading = false;
        draft.uploadFileSuccess = false;
        draft.uploadFileError = action.error;
        break;
      case CHANGE_IMAGE:
        draft.changeImageLoading = true;
        draft.changeImageSuccess = false;
        draft.changeImageError = '';
        break;
      case CHANGE_IMAGE_SUCCESS:
        draft.changeImageLoading = false;
        draft.changeImageSuccess = true;
        draft.changeImageError = '';
        break;
      case CHANGE_IMAGE_ERROR:
        draft.changeImageLoading = false;
        draft.changeImageSuccess = false;
        draft.changeImageError = action.error;
        break;
      case CLEAN_EDIT_COMMUNITY:
        draft.changeImageLoading = false;
        draft.changeImageSuccess = false;
        draft.changeImageError = '';
        break;
      default:
        return state;
    }
  });

export default editCommunityReducer;

/*
 *
 * EditMyProfile reducer
 *
 */
import produce from 'immer';
import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CHANGE_PHOTO,
  CHANGE_PHOTO_SUCCESS,
  CHANGE_PHOTO_ERROR,
  CLEAN_EDIT_MY_PROFILE,
} from './constants';

export const initialState = {
  uploadFile: {},
  uploadFileLoading: false,
  uploadFileSuccess: false,
  uploadFileError: '',
  changePhotoLoading: false,
  changePhotoSuccess: false,
  changePhotoError: '',
};

/* eslint-disable default-case, no-param-reassign */
const editMyProfileReducer = (state = initialState, action) =>
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
      case CHANGE_PHOTO:
        draft.changePhotoLoading = true;
        draft.changePhotoSuccess = false;
        draft.changePhotoError = '';
        break;
      case CHANGE_PHOTO_SUCCESS:
        draft.changePhotoLoading = false;
        draft.changePhotoSuccess = true;
        draft.changePhotoError = '';
        break;
      case CHANGE_PHOTO_ERROR:
        draft.changePhotoLoading = false;
        draft.changePhotoSuccess = false;
        draft.changePhotoError = action.error;
        break;
      case CLEAN_EDIT_MY_PROFILE:
        draft.uploadFile = {};
        draft.uploadFileLoading = false;
        draft.uploadFileSuccess = false;
        draft.uploadFileError = '';
        draft.changePhotoLoading = false;
        draft.changePhotoSuccess = false;
        draft.changePhotoError = '';
        break;
      default:
        return state;
    }
  });

export default editMyProfileReducer;

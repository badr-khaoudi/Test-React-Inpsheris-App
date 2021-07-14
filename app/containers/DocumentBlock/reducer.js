/*
 *
 * DocumentBlock reducer
 *
 */
import produce from 'immer';
import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CLEAN_UPLOAD_FILE,
} from './constants';

export const initialState = {
  uploadFile: {},
  uploadFileLoading: false,
  uploadFileSuccess: false,
  uploadFileError: '',
};

/* eslint-disable default-case, no-param-reassign */
const documentBlockReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case UPLOAD_FILE:
        // draft.uploadFile = [];
        draft.uploadFileLoading = true;
        draft.uploadFileSuccess = false;
        draft.uploadFileError = '';
        break;
      case UPLOAD_FILE_SUCCESS:
        // draft.uploadFile = [...draft.uploadFile, action.data];
        draft.uploadFile = {
          ...draft.uploadFile,
          [action.id]: [action.data],
        };
        draft.uploadFileLoading = false;
        draft.uploadFileSuccess = true;
        draft.uploadFileError = '';
        break;
      case UPLOAD_FILE_ERROR:
        draft.uploadFileLoading = false;
        draft.uploadFileSuccess = false;
        draft.uploadFileError = action.error;
        break;
      case CLEAN_UPLOAD_FILE:
        draft.uploadFile = {
          ...draft.uploadFile,
          [action.id]: [],
        };
        break;
      default:
        return state;
    }
  });

export default documentBlockReducer;

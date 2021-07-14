/*
 *
 * VideoBlock reducer
 *
 */
import produce from 'immer';
import {
  GET_FILE_STACK,
  GET_FILE_STACK_SUCCESS,
  GET_FILE_STACK_ERROR,
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CLEAN_UPLOAD_FILE,
  SAVE_VIDEO_FILE_STACK,
  SAVE_VIDEO_FILE_STACK_SUCCESS,
  SAVE_VIDEO_FILE_STACK_ERROR,
  CLEAN_VIDEO_FILE_STACK,
} from './constants';

export const initialState = {
  fileStack: {},
  fileStackLoading: false,
  fileStackSuccess: false,
  fileStackError: '',
  uploadFile: [],
  uploadFileLoading: false,
  uploadFileSuccess: false,
  uploadFileError: '',
  saveVideoFileStack: {},
  saveVideoFileStackLoading: false,
  saveVideoFileStackSuccess: false,
  saveVideoFileStackError: '',
};

/* eslint-disable default-case, no-param-reassign */
const videoBlockReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case GET_FILE_STACK:
        draft.fileStack = {};
        draft.fileStackLoading = true;
        draft.fileStackSuccess = false;
        draft.fileStackError = '';
        break;
      case GET_FILE_STACK_SUCCESS:
        draft.fileStack = action.data;
        draft.fileStackLoading = false;
        draft.fileStackSuccess = true;
        draft.fileStackError = '';
        break;
      case GET_FILE_STACK_ERROR:
        draft.fileStackLoading = false;
        draft.fileStackSuccess = false;
        draft.fileStackError = action.error;
        break;
      case UPLOAD_FILE:
        draft.uploadFile = [];
        draft.uploadFileLoading = true;
        draft.uploadFileSuccess = false;
        draft.uploadFileError = '';
        break;
      case UPLOAD_FILE_SUCCESS:
        draft.uploadFile = action.data;
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
        draft.uploadFile = [];
        break;
      case SAVE_VIDEO_FILE_STACK:
        draft.saveVideoFileStack = {};
        draft.saveVideoFileStackLoading = true;
        draft.saveVideoFileStackSuccess = false;
        draft.saveVideoFileStackError = '';
        break;
      case SAVE_VIDEO_FILE_STACK_SUCCESS:
        draft.saveVideoFileStack = action.data;
        draft.saveVideoFileStackLoading = false;
        draft.saveVideoFileStackSuccess = true;
        draft.saveVideoFileStackError = '';
        break;
      case SAVE_VIDEO_FILE_STACK_ERROR:
        draft.saveVideoFileStackLoading = false;
        draft.saveVideoFileStackSuccess = false;
        draft.saveVideoFileStackError = action.error;
        break;
      case CLEAN_VIDEO_FILE_STACK:
        draft.saveVideoFileStack = {};
        break;
      default:
        return state;
    }
  });

export default videoBlockReducer;

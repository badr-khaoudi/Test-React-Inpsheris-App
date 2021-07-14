/*
 *
 * FileDetails reducer
 *
 */
import produce from 'immer';
import {
  GET_FILE_DETAILS,
  GET_FILE_DETAILS_SUCCESS,
  GET_FILE_DETAILS_ERROR,
  EDIT_FILE_DETAILS,
  EDIT_FILE_DETAILS_SUCCESS,
  EDIT_FILE_DETAILS_ERROR,
} from './constants';

export const initialState = {
  fileDetails: [],
  fileDetailsLoading: false,
  fileDetailsSuccess: false,
  fileDetailsError: '',
  editFileDetails: {},
  editFileDetailsLoading: false,
  editFileDetailsSuccess: false,
  editFileDetailsError: '',
};

/* eslint-disable default-case, no-param-reassign */
const fileDetailsReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case GET_FILE_DETAILS:
        draft.fileDetails = [];
        draft.fileDetailsLoading = true;
        draft.fileDetailsSuccess = false;
        draft.fileDetailsError = '';
        break;
      case GET_FILE_DETAILS_SUCCESS:
        draft.fileDetails = action.data;
        draft.fileDetailsLoading = false;
        draft.fileDetailsSuccess = true;
        draft.fileDetailsError = '';
        break;
      case GET_FILE_DETAILS_ERROR:
        draft.fileDetailsLoading = false;
        draft.fileDetailsSuccess = false;
        draft.fileDetailsError = action.error;
        break;
      case EDIT_FILE_DETAILS:
        draft.editFileDetails = {};
        draft.editFileDetailsLoading = true;
        draft.editFileDetailsSuccess = false;
        draft.editFileDetailsError = '';
        break;
      case EDIT_FILE_DETAILS_SUCCESS:
        draft.editFileDetails = action.data;
        draft.editFileDetailsLoading = false;
        draft.editFileDetailsSuccess = true;
        draft.editFileDetailsError = '';
        break;
      case EDIT_FILE_DETAILS_ERROR:
        draft.editFileDetailsLoading = false;
        draft.editFileDetailsSuccess = false;
        draft.editFileDetailsError = action.error;
        break;
      default:
        return state;
    }
  });

export default fileDetailsReducer;

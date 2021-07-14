/*
 *
 * AddSpeciality reducer
 *
 */
import produce from 'immer';
import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  RESET_ADD_SPECIALITY,
  ADD_SPECIALITY,
  ADD_SPECIALITY_SUCCESS,
  ADD_SPECIALITY_ERROR,
  EDIT_SPECIALITY,
  EDIT_SPECIALITY_SUCCESS,
  EDIT_SPECIALITY_ERROR,
} from './constants';

export const initialState = {
  uploadFile: [],
  uploadFileLoading: false,
  uploadFileSuccess: false,
  uploadFileError: '',
  addSpecialityLoading: false,
  addSpecialitySuccess: false,
  addSpecialityError: '',
};

/* eslint-disable default-case, no-param-reassign */
const addSpecialityReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
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
      case RESET_ADD_SPECIALITY:
        draft.uploadFile = [];
        draft.uploadFileLoading = false;
        draft.uploadFileSuccess = false;
        draft.uploadFileError = '';
        draft.addSpecialityLoading = false;
        draft.addSpecialitySuccess = false;
        draft.addSpecialityError = '';
        break;
      case ADD_SPECIALITY:
        draft.addSpecialityLoading = true;
        draft.addSpecialitySuccess = false;
        draft.addSpecialityError = '';
        break;
      case ADD_SPECIALITY_SUCCESS:
        draft.addSpecialityLoading = false;
        draft.addSpecialitySuccess = true;
        draft.addSpecialityError = '';
        break;
      case ADD_SPECIALITY_ERROR:
        draft.addSpecialityLoading = false;
        draft.addSpecialitySuccess = false;
        draft.addSpecialityError = action.error;
        break;
      case EDIT_SPECIALITY:
        draft.addSpecialityLoading = true;
        draft.addSpecialitySuccess = false;
        draft.addSpecialityError = '';
        break;
      case EDIT_SPECIALITY_SUCCESS:
        draft.addSpecialityLoading = false;
        draft.addSpecialitySuccess = true;
        draft.addSpecialityError = '';
        break;
      case EDIT_SPECIALITY_ERROR:
        draft.addSpecialityLoading = false;
        draft.addSpecialitySuccess = false;
        draft.addSpecialityError = action.error;
        break;
      default:
        return state;
    }
  });

export default addSpecialityReducer;

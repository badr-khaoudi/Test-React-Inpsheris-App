/*
 *
 * CreateCarousel reducer
 *
 */
import produce from 'immer';
import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CREATE_CAROUSEL,
  CREATE_CAROUSEL_SUCCESS,
  CREATE_CAROUSEL_ERROR,
  CLEAN_CREATE_CAROUSEL,
  CAROUSEL_CONTENT,
  CAROUSEL_CONTENT_SUCCESS,
  CAROUSEL_CONTENT_ERROR,
} from './constants';

export const initialState = {
  uploadFile: {},
  uploadFileLoading: false,
  uploadFileSuccess: false,
  uploadFileError: '',
  createCarouselLoading: false,
  createCarouselSuccess: false,
  createCarouselError: '',
  carouselContent: '',
  carouselContentLoading: false,
  carouselContentSuccess: false,
  carouselContentError: '',
};

/* eslint-disable default-case, no-param-reassign */
const createCarouselReducer = (state = initialState, action) =>
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
      case CREATE_CAROUSEL:
        draft.createCarouselLoading = true;
        draft.createCarouselSuccess = false;
        draft.createCarouselError = '';
        break;
      case CREATE_CAROUSEL_SUCCESS:
        draft.createCarouselLoading = false;
        draft.createCarouselSuccess = true;
        draft.createCarouselError = '';
        break;
      case CREATE_CAROUSEL_ERROR:
        draft.createCarouselLoading = false;
        draft.createCarouselSuccess = false;
        draft.createCarouselError = action.error;
        break;
      case CLEAN_CREATE_CAROUSEL:
        draft.createCarouselLoading = false;
        draft.createCarouselSuccess = false;
        draft.createCarouselError = '';
        draft.uploadFile = {};
        draft.uploadFileLoading = false;
        draft.uploadFileSuccess = false;
        draft.uploadFileError = '';
        break;
      case CAROUSEL_CONTENT:
        draft.carouselContent = '';
        draft.carouselContentLoading = true;
        draft.carouselContentSuccess = false;
        draft.carouselContentError = '';
        break;
      case CAROUSEL_CONTENT_SUCCESS:
        draft.carouselContent = action.data;
        draft.carouselContentLoading = false;
        draft.carouselContentSuccess = true;
        draft.carouselContentError = '';
        break;
      case CAROUSEL_CONTENT_ERROR:
        draft.carouselContentLoading = false;
        draft.carouselContentSuccess = false;
        draft.carouselContentError = action.error;
        break;
      default:
        return state;
    }
  });

export default createCarouselReducer;

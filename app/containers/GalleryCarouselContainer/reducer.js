/*
 *
 * GalleryCarouselContainer reducer
 *
 */
import produce from 'immer';
import {
  GET_MEDIA_MANAGER_LIST,
  GET_MEDIA_MANAGER_LIST_SUCCESS,
  GET_MEDIA_MANAGER_LIST_ERROR,
  GET_ALL_IMAGES_AS_ZIP,
  GET_ALL_IMAGES_AS_ZIP_SUCCESS,
  GET_ALL_IMAGES_AS_ZIP_ERROR,
  RESET_TO_INITIAL_STATE,
} from './constants';

export const initialState = {
  mediaManagerList: [],
  getMediaManagerListLoading: false,
  getMediaManagerListSuccess: false,
  getMediaManagerListError: {},
  allImagesAsZip: '',
  getAllImagesAsZipLoading: false,
  getAllImagesAsZipSuccess: false,
  getAllImagesAsZipError: {},
};

/* eslint-disable default-case, no-param-reassign */
const galleryCarouselContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_MEDIA_MANAGER_LIST:
        draft.mediaManagerList = [];
        draft.getMediaManagerListLoading = true;
        draft.getMediaManagerListSuccess = false;
        break;
      case GET_MEDIA_MANAGER_LIST_SUCCESS:
        draft.mediaManagerList = action.data;
        draft.getMediaManagerListLoading = false;
        draft.getMediaManagerListSuccess = true;
        break;
      case GET_MEDIA_MANAGER_LIST_ERROR:
        draft.getMediaManagerListLoading = false;
        draft.getMediaManagerListSuccess = false;
        draft.mediaManagerListError = action.error;
        break;
      case GET_ALL_IMAGES_AS_ZIP:
        draft.allImagesAsZip = [];
        draft.getAllImagesAsZipLoading = true;
        draft.getAllImagesAsZipSuccess = false;
        break;
      case GET_ALL_IMAGES_AS_ZIP_SUCCESS:
        draft.allImagesAsZip = action.data;
        draft.getAllImagesAsZipLoading = false;
        draft.getAllImagesAsZipSuccess = true;
        break;
      case GET_ALL_IMAGES_AS_ZIP_ERROR:
        draft.getAllImagesAsZipLoading = false;
        draft.getAllImagesAsZipSuccess = false;
        draft.getAllImagesAsZipError = action.error;
        break;
      case RESET_TO_INITIAL_STATE:
        draft.mediaManagerList = [];
        draft.getMediaManagerListLoading = false;
        draft.getMediaManagerListSuccess = false;
        draft.getMediaManagerListError = {};
        draft.allImagesAsZip = '';
        draft.getAllImagesAsZipLoading = false;
        draft.getAllImagesAsZipSuccess = false;
        draft.getAllImagesAsZipError = {};
        break;
    }
  });

export default galleryCarouselContainerReducer;

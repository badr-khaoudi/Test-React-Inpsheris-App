/*
 *
 * GalleryCarouselContainer actions
 *
 */

import {
  GET_MEDIA_MANAGER_LIST,
  GET_MEDIA_MANAGER_LIST_SUCCESS,
  GET_MEDIA_MANAGER_LIST_ERROR,
  GET_ALL_IMAGES_AS_ZIP,
  GET_ALL_IMAGES_AS_ZIP_SUCCESS,
  GET_ALL_IMAGES_AS_ZIP_ERROR,
  RESET_TO_INITIAL_STATE,
} from './constants';

export function getMediaManagerList(options) {
  return {
    type: GET_MEDIA_MANAGER_LIST,
    options: { ...options },
  };
}

export function getMediaManagerListSuccess(data) {
  return {
    type: GET_MEDIA_MANAGER_LIST_SUCCESS,
    data,
  };
}

export function getMediaManagerListError(error) {
  return {
    type: GET_MEDIA_MANAGER_LIST_ERROR,
    error,
  };
}

export function getAllImagesAsZip(options) {
  return {
    type: GET_ALL_IMAGES_AS_ZIP,
    options: { ...options },
  };
}

export function getAllImagesAsZipSuccess(data) {
  return {
    type: GET_ALL_IMAGES_AS_ZIP_SUCCESS,
    data,
  };
}

export function getAllImagesAsZipError(error) {
  return {
    type: GET_ALL_IMAGES_AS_ZIP_ERROR,
    error,
  };
}

export function resetToInitialState() {
  return {
    type: RESET_TO_INITIAL_STATE,
  };
}

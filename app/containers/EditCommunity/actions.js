/*
 *
 * EditCommunity actions
 *
 */

import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CHANGE_IMAGE,
  CHANGE_IMAGE_SUCCESS,
  CHANGE_IMAGE_ERROR,
  CLEAN_EDIT_COMMUNITY,
} from './constants';

export function uploadFile(field, formData) {
  return {
    type: UPLOAD_FILE,
    field,
    formData,
  };
}

export function uploadFileSuccess(field, data) {
  return {
    type: UPLOAD_FILE_SUCCESS,
    field,
    data,
  };
}

export function uploadFileError(error) {
  return {
    type: UPLOAD_FILE_ERROR,
    error,
  };
}

export function changeImage(params, options) {
  return {
    type: CHANGE_IMAGE,
    params,
    options,
  };
}

export function changeImageSuccess() {
  return {
    type: CHANGE_IMAGE_SUCCESS,
  };
}

export function changeImageError(error) {
  return {
    type: CHANGE_IMAGE_ERROR,
    error,
  };
}

export function cleanEditCommunity() {
  return {
    type: CLEAN_EDIT_COMMUNITY,
  };
}

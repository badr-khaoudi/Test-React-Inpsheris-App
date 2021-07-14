/*
 *
 * EditMyProfile actions
 *
 */

import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CHANGE_PHOTO,
  CHANGE_PHOTO_SUCCESS,
  CHANGE_PHOTO_ERROR,
  CLEAN_EDIT_MY_PROFILE,
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

export function changePhoto(options) {
  return {
    type: CHANGE_PHOTO,
    options,
  };
}

export function changePhotoSuccess() {
  return {
    type: CHANGE_PHOTO_SUCCESS,
  };
}

export function changePhotoError(error) {
  return {
    type: CHANGE_PHOTO_ERROR,
    error,
  };
}

export function cleanEditMyProfile() {
  return {
    type: CLEAN_EDIT_MY_PROFILE,
  };
}

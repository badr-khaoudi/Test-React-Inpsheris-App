/*
 *
 * DocumentBlock actions
 *
 */

import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CLEAN_UPLOAD_FILE,
} from './constants';

export function uploadFile(id, tempUid, data, config) {
  return {
    type: UPLOAD_FILE,
    id,
    tempUid,
    data,
    config,
  };
}

export function uploadFileSuccess(id, data) {
  return {
    type: UPLOAD_FILE_SUCCESS,
    id,
    data,
  };
}

export function uploadFileError(error) {
  return {
    type: UPLOAD_FILE_ERROR,
    error,
  };
}

export function cleanUploadFile(id) {
  return {
    type: CLEAN_UPLOAD_FILE,
    id,
  };
}

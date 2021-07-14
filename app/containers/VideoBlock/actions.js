/*
 *
 * VideoBlock actions
 *
 */

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

export function getFileStack(options) {
  return {
    type: GET_FILE_STACK,
    options,
  };
}

export function getFileStackSuccess(data) {
  return {
    type: GET_FILE_STACK_SUCCESS,
    data,
  };
}

export function getFileStackError(error) {
  return {
    type: GET_FILE_STACK_ERROR,
    error,
  };
}

export function uploadFile(data) {
  return {
    type: UPLOAD_FILE,
    data,
  };
}

export function uploadFileSuccess(data) {
  return {
    type: UPLOAD_FILE_SUCCESS,
    data,
  };
}

export function uploadFileError(error) {
  return {
    type: UPLOAD_FILE_ERROR,
    error,
  };
}

export function cleanUploadFile() {
  return {
    type: CLEAN_UPLOAD_FILE,
  };
}

export function saveVideoFileStack(options) {
  return {
    type: SAVE_VIDEO_FILE_STACK,
    options,
  };
}

export function saveVideoFileStackSuccess(data) {
  return {
    type: SAVE_VIDEO_FILE_STACK_SUCCESS,
    data,
  };
}

export function saveVideoFileStackError(error) {
  return {
    type: SAVE_VIDEO_FILE_STACK_ERROR,
    error,
  };
}

export function cleanVideoFileStack() {
  return {
    type: CLEAN_VIDEO_FILE_STACK,
  };
}

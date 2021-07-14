/*
 *
 * FileDetails actions
 *
 */

import {
  GET_FILE_DETAILS,
  GET_FILE_DETAILS_SUCCESS,
  GET_FILE_DETAILS_ERROR,
  EDIT_FILE_DETAILS,
  EDIT_FILE_DETAILS_SUCCESS,
  EDIT_FILE_DETAILS_ERROR,
} from './constants';

export function getFileDetails(options) {
  return {
    type: GET_FILE_DETAILS,
    options,
  };
}

export function getFileDetailsSuccess(data) {
  return {
    type: GET_FILE_DETAILS_SUCCESS,
    data,
  };
}

export function getFileDetailsError(error) {
  return {
    type: GET_FILE_DETAILS_ERROR,
    error,
  };
}

export function editFileDetails(options) {
  return {
    type: EDIT_FILE_DETAILS,
    options,
  };
}

export function editFileDetailsSuccess(data) {
  return {
    type: EDIT_FILE_DETAILS_SUCCESS,
    data,
  };
}

export function editFileDetailsError(error) {
  return {
    type: EDIT_FILE_DETAILS_ERROR,
    error,
  };
}

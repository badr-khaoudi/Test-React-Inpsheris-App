/*
 *
 * AddSpeciality actions
 *
 */

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

export function uploadFile(formData) {
  return {
    type: UPLOAD_FILE,
    formData,
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

export function resetAddSpeciality() {
  return {
    type: RESET_ADD_SPECIALITY,
  };
}

export function addSpeciality(key, options) {
  return {
    type: ADD_SPECIALITY,
    key,
    options,
  };
}

export function addSpecialitySuccess(data) {
  return {
    type: ADD_SPECIALITY_SUCCESS,
    data,
  };
}

export function addSpecialityError(error) {
  return {
    type: ADD_SPECIALITY_ERROR,
    error,
  };
}

export function editSpeciality(key, params, options) {
  return {
    type: EDIT_SPECIALITY,
    key,
    params,
    options,
  };
}

export function editSpecialitySuccess(data) {
  return {
    type: EDIT_SPECIALITY_SUCCESS,
    data,
  };
}

export function editSpecialityError(error) {
  return {
    type: EDIT_SPECIALITY_ERROR,
    error,
  };
}

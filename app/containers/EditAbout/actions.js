/*
 *
 * EditAbout actions
 *
 */

import {
  CUSTOM_FIELD_LIST,
  CUSTOM_FIELD_LIST_SUCCESS,
  CUSTOM_FIELD_LIST_ERROR,
  SERVICE_FILTER_LIST,
  SERVICE_FILTER_LIST_SUCCESS,
  SERVICE_FILTER_LIST_ERROR,
  HOBBY_LIST,
  HOBBY_LIST_SUCCESS,
  HOBBY_LIST_ERROR,
  EMPLOYEE_LIST,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_LIST_ERROR,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  RESET_EDIT_ABOUT,
} from './constants';

export function customFieldList(options) {
  return {
    type: CUSTOM_FIELD_LIST,
    options,
  };
}

export function customFieldListSuccess(data) {
  return {
    type: CUSTOM_FIELD_LIST_SUCCESS,
    data,
  };
}

export function customFieldListError(error) {
  return {
    type: CUSTOM_FIELD_LIST_ERROR,
    error,
  };
}

export function serviceFilterList(options) {
  return {
    type: SERVICE_FILTER_LIST,
    options,
  };
}

export function serviceFilterListSuccess(data) {
  return {
    type: SERVICE_FILTER_LIST_SUCCESS,
    data,
  };
}

export function serviceFilterListError(error) {
  return {
    type: SERVICE_FILTER_LIST_ERROR,
    error,
  };
}

export function hobbyList(options) {
  return {
    type: HOBBY_LIST,
    options,
  };
}

export function hobbyListSuccess(data) {
  return {
    type: HOBBY_LIST_SUCCESS,
    data,
  };
}

export function hobbyListError(error) {
  return {
    type: HOBBY_LIST_ERROR,
    error,
  };
}

export function employeeList(options) {
  return {
    type: EMPLOYEE_LIST,
    options,
  };
}

export function employeeListSuccess(data) {
  return {
    type: EMPLOYEE_LIST_SUCCESS,
    data,
  };
}

export function employeeListError(error) {
  return {
    type: EMPLOYEE_LIST_ERROR,
    error,
  };
}

export function editUser(options) {
  return {
    type: EDIT_USER,
    options,
  };
}

export function editUserSuccess() {
  return {
    type: EDIT_USER_SUCCESS,
  };
}

export function editUserError(error) {
  return {
    type: EDIT_USER_ERROR,
    error,
  };
}

export function resetEditAbout() {
  return {
    type: RESET_EDIT_ABOUT,
  };
}

/*
 *
 * Statistics actions
 *
 */

import {
  LAST_UPDATED_DATE,
  LAST_UPDATED_DATE_SUCCESS,
  LAST_UPDATED_DATE_ERROR,
  EXPORT_ALL,
  EXPORT_ALL_SUCCESS,
  EXPORT_ALL_ERROR,
  EXPORT_TABLE,
  EXPORT_TABLE_SUCCESS,
  EXPORT_TABLE_ERROR,
  JOB_LIST,
  JOB_LIST_SUCCESS,
  JOB_LIST_ERROR,
  CANCEL_JOB_LIST,
} from './constants';

export function lastUpdatedDate() {
  return {
    type: LAST_UPDATED_DATE,
  };
}

export function lastUpdatedDateSuccess(data) {
  return {
    type: LAST_UPDATED_DATE_SUCCESS,
    data,
  };
}

export function lastUpdatedDateError(error) {
  return {
    type: LAST_UPDATED_DATE_ERROR,
    error,
  };
}

export function exportAll(options, fileName) {
  return {
    type: EXPORT_ALL,
    options,
    fileName,
  };
}

export function exportAllSuccess(data) {
  return {
    type: EXPORT_ALL_SUCCESS,
    data,
  };
}

export function exportAllError(error) {
  return {
    type: EXPORT_ALL_ERROR,
    error,
  };
}

export function exportTable(options, fileName) {
  return {
    type: EXPORT_TABLE,
    options,
    fileName,
  };
}

export function exportTableSuccess(data) {
  return {
    type: EXPORT_TABLE_SUCCESS,
    data,
  };
}

export function exportTableError(error) {
  return {
    type: EXPORT_TABLE_ERROR,
    error,
  };
}

export function jobList(fileName) {
  return {
    type: JOB_LIST,
    fileName,
  };
}

export function jobListSuccess() {
  return {
    type: JOB_LIST_SUCCESS,
  };
}

export function jobListError(error) {
  return {
    type: JOB_LIST_ERROR,
    error,
  };
}

export function cancelJobList() {
  return {
    type: CANCEL_JOB_LIST,
  };
}

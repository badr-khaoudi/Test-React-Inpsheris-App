/*
 *
 * GlobalContent actions
 *
 */

import {
  COUNT_CONTENT_CREATED_BY_DATE,
  COUNT_CONTENT_CREATED_BY_DATE_SUCCESS,
  COUNT_CONTENT_CREATED_BY_DATE_ERROR,
} from './constants';

export function countContentCreatedByDate(options, cancelToken) {
  return {
    type: COUNT_CONTENT_CREATED_BY_DATE,
    options,
    cancelToken,
  };
}

export function countContentCreatedByDateSuccess(data) {
  return {
    type: COUNT_CONTENT_CREATED_BY_DATE_SUCCESS,
    data,
  };
}

export function countContentCreatedByDateError(error) {
  return {
    type: COUNT_CONTENT_CREATED_BY_DATE_ERROR,
    error,
  };
}

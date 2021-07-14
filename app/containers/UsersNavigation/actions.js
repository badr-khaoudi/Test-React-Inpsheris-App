/*
 *
 * UsersNavigation actions
 *
 */

import {
  LIST_CONTENT_VIEWED_BY_SOURCE,
  LIST_CONTENT_VIEWED_BY_SOURCE_SUCCESS,
  LIST_CONTENT_VIEWED_BY_SOURCE_ERROR,
} from './constants';

export function listContentViewedBySource(options, cancelToken) {
  return {
    type: LIST_CONTENT_VIEWED_BY_SOURCE,
    options,
    cancelToken,
  };
}

export function listContentViewedBySourceSuccess(data) {
  return {
    type: LIST_CONTENT_VIEWED_BY_SOURCE_SUCCESS,
    data,
  };
}

export function listContentViewedBySourceError(error) {
  return {
    type: LIST_CONTENT_VIEWED_BY_SOURCE_ERROR,
    error,
  };
}

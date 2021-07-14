/*
 *
 * ChooseContent actions
 *
 */

import {
  CONTENT_FILTER,
  CONTENT_FILTER_SUCCESS,
  CONTENT_FILTER_ERROR,
  CONTENT_FILTER_MORE,
  CONTENT_FILTER_MORE_SUCCESS,
  CONTENT_FILTER_MORE_ERROR,
} from './constants';

export function contentFilter(options) {
  return {
    type: CONTENT_FILTER,
    options,
  };
}

export function contentFilterSuccess(data) {
  return {
    type: CONTENT_FILTER_SUCCESS,
    data,
  };
}

export function contentFilterError(error) {
  return {
    type: CONTENT_FILTER_ERROR,
    error,
  };
}

export function contentFilterMore(options) {
  return {
    type: CONTENT_FILTER_MORE,
    options,
  };
}

export function contentFilterMoreSuccess(data) {
  return {
    type: CONTENT_FILTER_MORE_SUCCESS,
    data,
  };
}

export function contentFilterMoreError(error) {
  return {
    type: CONTENT_FILTER_MORE_ERROR,
    error,
  };
}

/*
 *
 * FeedModal actions
 *
 */

import {
  GET_CONTENT_DETAILS,
  GET_CONTENT_DETAILS_SUCCESS,
  GET_CONTENT_DETAILS_ERROR,
} from './constants';

export function getContentDetails(options) {
  return {
    type: GET_CONTENT_DETAILS,
    options,
  };
}

export function getContentDetailsSuccess() {
  return {
    type: GET_CONTENT_DETAILS_SUCCESS,
  };
}

export function getContentDetailsError(error) {
  return {
    type: GET_CONTENT_DETAILS_ERROR,
    error,
  };
}

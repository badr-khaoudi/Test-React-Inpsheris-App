/*
 *
 * ApplicationLinksPage actions
 *
 */

import {
  GET_APPLICATION_LINKS,
  GET_APPLICATION_LINKS_SUCCESS,
  GET_APPLICATION_LINKS_ERROR,
} from './constants';

export function getApplicationLinks() {
  return {
    type: GET_APPLICATION_LINKS,
  };
}

export function getApplicationLinksSuccess(data) {
  return {
    type: GET_APPLICATION_LINKS_SUCCESS,
    data,
  };
}

export function getApplicationLinksError(error) {
  return {
    type: GET_APPLICATION_LINKS_ERROR,
    error,
  };
}

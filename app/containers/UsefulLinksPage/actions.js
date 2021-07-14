/*
 *
 * UsefulLinksPage actions
 *
 */

import {
  GET_USEFUL_LINKS,
  GET_USEFUL_LINKS_SUCCESS,
  GET_USEFUL_LINKS_ERROR,
} from './constants';

export function getUsefulLinks() {
  return {
    type: GET_USEFUL_LINKS,
  };
}

export function getUsefulLinksSuccess(data) {
  return {
    type: GET_USEFUL_LINKS_SUCCESS,
    data,
  };
}

export function getUsefulLinksError(error) {
  return {
    type: GET_USEFUL_LINKS_ERROR,
    error,
  };
}

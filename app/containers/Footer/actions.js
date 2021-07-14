/*
 *
 * Footer actions
 *
 */

import {
  GET_FOOTER_LINKS,
  GET_FOOTER_LINKS_SUCCESS,
  GET_FOOTER_LINKS_ERROR,
} from './constants';

export function getFooterLinks() {
  return {
    type: GET_FOOTER_LINKS,
  };
}

export function getFooterLinksSuccess(data) {
  return {
    type: GET_FOOTER_LINKS_SUCCESS,
    data,
  };
}

export function getFooterLinksError(error) {
  return {
    type: GET_FOOTER_LINKS_ERROR,
    error,
  };
}

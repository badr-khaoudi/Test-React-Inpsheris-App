/*
 *
 * Comment actions
 *
 */

import { VIEW_MORE, VIEW_MORE_SUCCESS, VIEW_MORE_ERROR } from './constants';

export function viewMore(options) {
  return {
    type: VIEW_MORE,
    options,
  };
}

export function viewMoreSuccess() {
  return {
    type: VIEW_MORE_SUCCESS,
  };
}

export function viewMoreError(error) {
  return {
    type: VIEW_MORE_ERROR,
    error,
  };
}

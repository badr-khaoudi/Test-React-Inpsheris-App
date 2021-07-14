/*
 *
 * DigestList actions
 *
 */

import {
  DIGEST_LIST,
  DIGEST_LIST_SUCCESS,
  DIGEST_LIST_ERROR,
} from './constants';

export function digestList(options) {
  return {
    type: DIGEST_LIST,
    options,
  };
}

export function digestListSuccess(data) {
  return {
    type: DIGEST_LIST_SUCCESS,
    data,
  };
}

export function digestListError(error) {
  return {
    type: DIGEST_LIST_ERROR,
    error,
  };
}

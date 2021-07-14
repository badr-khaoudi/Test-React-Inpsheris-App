/*
 *
 * Share actions
 *
 */

import { SHARE, SHARE_SUCCESS, SHARE_ERROR, CLEAN_SHARE } from './constants';

export function share(options) {
  return {
    type: SHARE,
    options,
  };
}

export function shareSuccess(data) {
  return {
    type: SHARE_SUCCESS,
    data,
  };
}

export function shareError(error) {
  return {
    type: SHARE_ERROR,
    error,
  };
}

export function cleanShare() {
  return {
    type: CLEAN_SHARE,
  };
}

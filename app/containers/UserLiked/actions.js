/*
 *
 * UserLiked actions
 *
 */

import { USER_LIKED, USER_LIKED_SUCCESS, USER_LIKED_ERROR } from './constants';

export function userLiked(options) {
  return {
    type: USER_LIKED,
    options,
  };
}

export function userLikedSuccess(data) {
  return {
    type: USER_LIKED_SUCCESS,
    data,
  };
}

export function userLikedError(error) {
  return {
    type: USER_LIKED_ERROR,
    error,
  };
}

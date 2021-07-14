/*
 *
 * MiniProfile actions
 *
 */

import {
  USER_PROFILE,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_ERROR,
} from './constants';

export function userProfile(options, cancelToken) {
  return {
    type: USER_PROFILE,
    options,
    cancelToken,
  };
}

export function userProfileSuccess(data) {
  return {
    type: USER_PROFILE_SUCCESS,
    data,
  };
}

export function userProfileError(error) {
  return {
    type: USER_PROFILE_ERROR,
    error,
  };
}

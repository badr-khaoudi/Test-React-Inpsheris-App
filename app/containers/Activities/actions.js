/*
 *
 * Activities actions
 *
 */

import {
  PROFILE,
  PROFILE_SUCCESS,
  PROFILE_ERROR,
  PROFILE_MORE,
  PROFILE_MORE_SUCCESS,
  PROFILE_MORE_ERROR,
} from './constants';

export function profile(options) {
  return {
    type: PROFILE,
    options,
  };
}

export function profileSuccess(options, data) {
  return {
    type: PROFILE_SUCCESS,
    options,
    data,
  };
}

export function profileError(error) {
  return {
    type: PROFILE_ERROR,
    error,
  };
}

export function profileMore(options) {
  return {
    type: PROFILE_MORE,
    options,
  };
}

export function profileMoreSuccess(options, data) {
  return {
    type: PROFILE_MORE_SUCCESS,
    options,
    data,
  };
}

export function profileMoreError(error) {
  return {
    type: PROFILE_MORE_ERROR,
    error,
  };
}

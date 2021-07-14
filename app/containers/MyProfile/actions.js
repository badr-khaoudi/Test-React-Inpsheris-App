/*
 *
 * MyProfile actions
 *
 */

import {
  USER,
  USER_SUCCESS,
  USER_ERROR,
  AUTHOR_LIST,
  AUTHOR_LIST_SUCCESS,
  AUTHOR_LIST_ERROR,
  COMMUNITY_LIST,
  COMMUNITY_LIST_SUCCESS,
  COMMUNITY_LIST_ERROR,
  FOLLOW,
  FOLLOW_SUCCESS,
  FOLLOW_ERROR,
} from './constants';

export function user(options) {
  return {
    type: USER,
    options,
  };
}

export function userSuccess(data) {
  return {
    type: USER_SUCCESS,
    data,
  };
}

export function userError(error) {
  return {
    type: USER_ERROR,
    error,
  };
}

export function authorList(options) {
  return {
    type: AUTHOR_LIST,
    options,
  };
}

export function authorListSuccess(data) {
  return {
    type: AUTHOR_LIST_SUCCESS,
    data,
  };
}

export function authorListError(error) {
  return {
    type: AUTHOR_LIST_ERROR,
    error,
  };
}

export function communityList(options) {
  return {
    type: COMMUNITY_LIST,
    options,
  };
}

export function communityListSuccess(data) {
  return {
    type: COMMUNITY_LIST_SUCCESS,
    data,
  };
}

export function communityListError(error) {
  return {
    type: COMMUNITY_LIST_ERROR,
    error,
  };
}

export function follow(options) {
  return {
    type: FOLLOW,
    options,
  };
}

export function followSuccess(options, data) {
  return {
    type: FOLLOW_SUCCESS,
    options,
    data,
  };
}

export function followError(error) {
  return {
    type: FOLLOW_ERROR,
    error,
  };
}

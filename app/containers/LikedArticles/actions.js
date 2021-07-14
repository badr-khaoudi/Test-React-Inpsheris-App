/*
 *
 * LikedArticles actions
 *
 */

import {
  USER_LIKED_LIST,
  USER_LIKED_LIST_SUCCESS,
  USER_LIKED_LIST_ERROR,
  USER_LIKED_LIST_MORE,
  USER_LIKED_LIST_MORE_SUCCESS,
  USER_LIKED_LIST_MORE_ERROR,
} from './constants';

export function userLikedList(options) {
  return {
    type: USER_LIKED_LIST,
    options,
  };
}

export function userLikedListSuccess(data) {
  return {
    type: USER_LIKED_LIST_SUCCESS,
    data,
  };
}

export function userLikedListError(error) {
  return {
    type: USER_LIKED_LIST_ERROR,
    error,
  };
}

export function userLikedListMore(options) {
  return {
    type: USER_LIKED_LIST_MORE,
    options,
  };
}

export function userLikedListMoreSuccess(data) {
  return {
    type: USER_LIKED_LIST_MORE_SUCCESS,
    data,
  };
}

export function userLikedListMoreError(error) {
  return {
    type: USER_LIKED_LIST_MORE_ERROR,
    error,
  };
}

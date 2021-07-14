/*
 *
 * Tab actions
 *
 */

import {
  GET_COMMUNITY_LIST,
  GET_COMMUNITY_LIST_SUCCESS,
  GET_COMMUNITY_LIST_ERROR,
  GET_COMMUNITY_TAB,
  GET_COMMUNITY_TAB_SUCCESS,
  GET_COMMUNITY_TAB_ERROR,
  GET_COMMUNITY_TAB_MORE,
  GET_COMMUNITY_TAB_MORE_SUCCESS,
  GET_COMMUNITY_TAB_MORE_ERROR,
} from './constants';

export function getCommunityList(options) {
  return {
    type: GET_COMMUNITY_LIST,
    options,
  };
}

export function getCommunityListSuccess(data) {
  return {
    type: GET_COMMUNITY_LIST_SUCCESS,
    data,
  };
}

export function getCommunityListError(error) {
  return {
    type: GET_COMMUNITY_LIST_ERROR,
    error,
  };
}

export function getCommunityTab(options) {
  return {
    type: GET_COMMUNITY_TAB,
    options,
  };
}

export function getCommunityTabSuccess(data) {
  return {
    type: GET_COMMUNITY_TAB_SUCCESS,
    data,
  };
}

export function getCommunityTabError(error) {
  return {
    type: GET_COMMUNITY_TAB_ERROR,
    error,
  };
}

export function getCommunityTabMore(options) {
  return {
    type: GET_COMMUNITY_TAB_MORE,
    options,
  };
}

export function getCommunityTabMoreSuccess(data) {
  return {
    type: GET_COMMUNITY_TAB_MORE_SUCCESS,
    data,
  };
}

export function getCommunityTabMoreError(error) {
  return {
    type: GET_COMMUNITY_TAB_MORE_ERROR,
    error,
  };
}

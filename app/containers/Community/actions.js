/*
 *
 * Community actions
 *
 */

import {
  GET_COMMUNITY_LIST,
  GET_COMMUNITY_LIST_SUCCESS,
  GET_COMMUNITY_LIST_ERROR,
  GET_COMMUNITY_GROUP_LIST,
  GET_COMMUNITY_GROUP_LIST_SUCCESS,
  GET_COMMUNITY_GROUP_LIST_ERROR,
  FILTER_COMMUNITY_LIST,
  REQUESTED_COMMUNITY,
  REQUESTED_COMMUNITY_SUCCESS,
  REQUESTED_COMMUNITY_ERROR,
  CLEAN_REQUESTED_COMMUNITY,
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

export function getCommunityGroupList(options) {
  return {
    type: GET_COMMUNITY_GROUP_LIST,
    options,
  };
}

export function getCommunityGroupListSuccess(data) {
  return {
    type: GET_COMMUNITY_GROUP_LIST_SUCCESS,
    data,
  };
}

export function getCommunityGroupListError(error) {
  return {
    type: GET_COMMUNITY_GROUP_LIST_ERROR,
    error,
  };
}

export function filterCommunityList(options) {
  return {
    type: FILTER_COMMUNITY_LIST,
    options,
  };
}

export function requestedCommunity(options) {
  return {
    type: REQUESTED_COMMUNITY,
    options,
  };
}

export function requestedCommunitySuccess() {
  return {
    type: REQUESTED_COMMUNITY_SUCCESS,
  };
}

export function requestedCommunityError(error) {
  return {
    type: REQUESTED_COMMUNITY_ERROR,
    error,
  };
}

export function cleanRequestedCommunity() {
  return {
    type: CLEAN_REQUESTED_COMMUNITY,
  };
}

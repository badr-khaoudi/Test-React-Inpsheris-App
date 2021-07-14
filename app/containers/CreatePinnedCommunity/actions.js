/*
 *
 * CreatePinnedCommunity actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_PINNED_COMMUNITY,
  GET_PINNED_COMMUNITY_ERROR,
  GET_PINNED_COMMUNITY_SUCCESS,
  PINNED_COMMUNITY_RESET,
  UPDATE_PINNED_COMMUNITY,
  UPDATE_PINNED_COMMUNITY_ERROR,
  UPDATE_PINNED_COMMUNITY_SUCCESS,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getPinnedCommunity({ id, cancelToken }) {
  return {
    type: GET_PINNED_COMMUNITY,
    id,
    cancelToken,
  };
}

export function getPinnedCommunitySuccess(data) {
  return {
    type: GET_PINNED_COMMUNITY_SUCCESS,
    data,
  };
}

export function getPinnedCommunityError(error) {
  return {
    type: GET_PINNED_COMMUNITY_ERROR,
    error,
  };
}

export function updatePinnedCommunity({ payload, cancelToken }) {
  return {
    type: UPDATE_PINNED_COMMUNITY,
    payload,
    cancelToken,
  };
}

export function updatePinnedCommunitySuccess() {
  return {
    type: UPDATE_PINNED_COMMUNITY_SUCCESS,
  };
}

export function updatePinnedCommunityError(error) {
  return {
    type: UPDATE_PINNED_COMMUNITY_ERROR,
    error,
  };
}

export function resetPinnedCommunityCreation() {
  return {
    type: PINNED_COMMUNITY_RESET,
  };
}

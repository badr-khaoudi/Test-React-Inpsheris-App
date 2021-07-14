/*
 *
 * SessionsByOrigin actions
 *
 */

import {
  COUNT_COMMUNITY_MEMBER_CONNECTION,
  COUNT_COMMUNITY_MEMBER_CONNECTION_SUCCESS,
  COUNT_COMMUNITY_MEMBER_CONNECTION_ERROR,
} from './constants';

export function countCommunityMemberConnection(options, cancelToken) {
  return {
    type: COUNT_COMMUNITY_MEMBER_CONNECTION,
    options,
    cancelToken,
  };
}

export function countCommunityMemberConnectionSuccess(data) {
  return {
    type: COUNT_COMMUNITY_MEMBER_CONNECTION_SUCCESS,
    data,
  };
}

export function countCommunityMemberConnectionError(error) {
  return {
    type: COUNT_COMMUNITY_MEMBER_CONNECTION_ERROR,
    error,
  };
}

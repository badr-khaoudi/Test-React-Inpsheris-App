/*
 *
 * CommunityStatistics actions
 *
 */

import {
  COUNT_CONTENT_CREATED_BY_COMMUNITY,
  COUNT_CONTENT_CREATED_BY_COMMUNITY_SUCCESS,
  COUNT_CONTENT_CREATED_BY_COMMUNITY_TABLE,
  COUNT_CONTENT_CREATED_BY_COMMUNITY_TABLE_SUCCESS,
  ANALYZE_CONTENT_VIEWED_BY_COMMUNITY,
  ANALYZE_CONTENT_VIEWED_BY_COMMUNITY_SUCCESS,
  ANALYZE_CONTENT_VIEWED_BY_COMMUNITY_TABLE,
  ANALYZE_CONTENT_VIEWED_BY_COMMUNITY_TABLE_SUCCESS,
  VIEW_ACTIVITY_COMMUNITY,
  VIEW_ACTIVITY_COMMUNITY_SUCCESS,
  COMMUNITY_STATISTICS_ERROR,
} from './constants';

export function countContentCreatedByCommunity(options, cancelToken) {
  return {
    type: COUNT_CONTENT_CREATED_BY_COMMUNITY,
    options,
    cancelToken,
  };
}

export function countContentCreatedByCommunitySuccess(data) {
  return {
    type: COUNT_CONTENT_CREATED_BY_COMMUNITY_SUCCESS,
    data,
  };
}

export function countContentCreatedByCommunityTable(options, cancelToken) {
  return {
    type: COUNT_CONTENT_CREATED_BY_COMMUNITY_TABLE,
    options,
    cancelToken,
  };
}

export function countContentCreatedByCommunityTableSuccess(data) {
  return {
    type: COUNT_CONTENT_CREATED_BY_COMMUNITY_TABLE_SUCCESS,
    data,
  };
}

export function analyzeContentViewedByCommunity(options, cancelToken) {
  return {
    type: ANALYZE_CONTENT_VIEWED_BY_COMMUNITY,
    options,
    cancelToken,
  };
}

export function analyzeContentViewedByCommunitySuccess(data) {
  return {
    type: ANALYZE_CONTENT_VIEWED_BY_COMMUNITY_SUCCESS,
    data,
  };
}

export function analyzeContentViewedByCommunityTable(options, cancelToken) {
  return {
    type: ANALYZE_CONTENT_VIEWED_BY_COMMUNITY_TABLE,
    options,
    cancelToken,
  };
}

export function analyzeContentViewedByCommunityTableSuccess(data) {
  return {
    type: ANALYZE_CONTENT_VIEWED_BY_COMMUNITY_TABLE_SUCCESS,
    data,
  };
}

export function viewActivityCommunity(options, cancelToken) {
  return {
    type: VIEW_ACTIVITY_COMMUNITY,
    options,
    cancelToken,
  };
}

export function viewActivityCommunitySuccess(data) {
  return {
    type: VIEW_ACTIVITY_COMMUNITY_SUCCESS,
    data,
  };
}

export function communityStatisticsError(error) {
  return {
    type: COMMUNITY_STATISTICS_ERROR,
    error,
  };
}

/*
 *
 * GlobalConnections actions
 *
 */

import {
  COUNT_TOTAL,
  COUNT_TOTAL_SUCCESS,
  COUNT_TOTAL_TABLE,
  COUNT_TOTAL_TABLE_SUCCESS,
  COUNT_BY_DEPARTMENT,
  COUNT_BY_DEPARTMENT_SUCCESS,
  COUNT_BY_STATUS,
  COUNT_BY_STATUS_SUCCESS,
  COUNT_BY_COMMUNITY_STATUS,
  COUNT_BY_COMMUNITY_STATUS_SUCCESS,
  GLOBAL_CONNECTIONS_ERROR,
} from './constants';

export function countTotal(options, cancelToken) {
  return {
    type: COUNT_TOTAL,
    options,
    cancelToken,
  };
}

export function countTotalSuccess(data) {
  return {
    type: COUNT_TOTAL_SUCCESS,
    data,
  };
}

export function countTotalTable(options, cancelToken) {
  return {
    type: COUNT_TOTAL_TABLE,
    options,
    cancelToken,
  };
}

export function countTotalTableSuccess(data) {
  return {
    type: COUNT_TOTAL_TABLE_SUCCESS,
    data,
  };
}

export function countByDepartment(options, cancelToken) {
  return {
    type: COUNT_BY_DEPARTMENT,
    options,
    cancelToken,
  };
}

export function countByDepartmentSuccess(data) {
  return {
    type: COUNT_BY_DEPARTMENT_SUCCESS,
    data,
  };
}

export function countByStatus(options, cancelToken) {
  return {
    type: COUNT_BY_STATUS,
    options,
    cancelToken,
  };
}

export function countByStatusSuccess(data) {
  return {
    type: COUNT_BY_STATUS_SUCCESS,
    data,
  };
}

export function countByCommunityStatus(options, cancelToken) {
  return {
    type: COUNT_BY_COMMUNITY_STATUS,
    options,
    cancelToken,
  };
}

export function countByCommunityStatusSuccess(data) {
  return {
    type: COUNT_BY_COMMUNITY_STATUS_SUCCESS,
    data,
  };
}

export function globalConnectionsError(error) {
  return {
    type: GLOBAL_CONNECTIONS_ERROR,
    error,
  };
}

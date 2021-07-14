/*
 *
 * UserDetails actions
 *
 */

import {
  LIST_USER_DETAILS_AND_ACTIONS,
  LIST_USER_DETAILS_AND_ACTIONS_SUCCESS,
  TOTAL_CONNECT_AT_THE_MOMENT,
  TOTAL_CONNECT_AT_THE_MOMENT_SUCCESS,
  VIEW_DETAILS,
  VIEW_DETAILS_SUCCESS,
  VIEW_DETAILS_EXPORT,
  VIEW_DETAILS_EXPORT_SUCCESS,
  VIEW_DETAILS_EXPORT_ERROR,
  LIST_USER_NEVER_CONNECT,
  LIST_USER_NEVER_CONNECT_SUCCESS,
  LIST_USER_CONNECT,
  LIST_USER_CONNECT_SUCCESS,
  LIST_USER_CONNECT_LESS_EQUAL_TEN_TIMES,
  LIST_USER_CONNECT_LESS_EQUAL_TEN_TIMES_SUCCESS,
  LIST_USER_CONNECTION_SUMMARY,
  LIST_USER_CONNECTION_SUMMARY_SUCCESS,
  USER_DETAILS_ERROR,
} from './constants';

export function listUserDetailsAndActions(options, cancelToken) {
  return {
    type: LIST_USER_DETAILS_AND_ACTIONS,
    options,
    cancelToken,
  };
}

export function listUserDetailsAndActionsSuccess(data) {
  return {
    type: LIST_USER_DETAILS_AND_ACTIONS_SUCCESS,
    data,
  };
}

export function totalConnectAtTheMoment(options, cancelToken) {
  return {
    type: TOTAL_CONNECT_AT_THE_MOMENT,
    options,
    cancelToken,
  };
}

export function totalConnectAtTheMomentSuccess(data) {
  return {
    type: TOTAL_CONNECT_AT_THE_MOMENT_SUCCESS,
    data,
  };
}

export function viewDetails(options, cancelToken) {
  return {
    type: VIEW_DETAILS,
    options,
    cancelToken,
  };
}

export function viewDetailsSuccess(data) {
  return {
    type: VIEW_DETAILS_SUCCESS,
    data,
  };
}

export function viewDetailsExport(options, fileName) {
  return {
    type: VIEW_DETAILS_EXPORT,
    options,
    fileName,
  };
}

export function viewDetailsExportSuccess(data) {
  return {
    type: VIEW_DETAILS_EXPORT_SUCCESS,
    data,
  };
}

export function viewDetailsExportError(error) {
  return {
    type: VIEW_DETAILS_EXPORT_ERROR,
    error,
  };
}

export function listUserNeverConnect(options, cancelToken) {
  return {
    type: LIST_USER_NEVER_CONNECT,
    options,
    cancelToken,
  };
}

export function listUserNeverConnectSuccess(data) {
  return {
    type: LIST_USER_NEVER_CONNECT_SUCCESS,
    data,
  };
}

export function listUserConnect(options, cancelToken) {
  return {
    type: LIST_USER_CONNECT,
    options,
    cancelToken,
  };
}

export function listUserConnectSuccess(data) {
  return {
    type: LIST_USER_CONNECT_SUCCESS,
    data,
  };
}

export function listUserConnectLessEqualTenTimes(options, cancelToken) {
  return {
    type: LIST_USER_CONNECT_LESS_EQUAL_TEN_TIMES,
    options,
    cancelToken,
  };
}

export function listUserConnectLessEqualTenTimesSuccess(data) {
  return {
    type: LIST_USER_CONNECT_LESS_EQUAL_TEN_TIMES_SUCCESS,
    data,
  };
}

export function listUserConnectionSummary(options, cancelToken) {
  return {
    type: LIST_USER_CONNECTION_SUMMARY,
    options,
    cancelToken,
  };
}

export function listUserConnectionSummarySuccess(data) {
  return {
    type: LIST_USER_CONNECTION_SUMMARY_SUCCESS,
    data,
  };
}

export function userDetailsError(error) {
  return {
    type: USER_DETAILS_ERROR,
    error,
  };
}

/*
 *
 * Notifications actions
 *
 */

import {
  NOTIFICATION_LIST,
  NOTIFICATION_LIST_SUCCESS,
  NOTIFICATION_LIST_ERROR,
  NOTIFICATION_LIST_MORE,
  NOTIFICATION_LIST_MORE_SUCCESS,
  NOTIFICATION_LIST_MORE_ERROR,
} from './constants';

export function notificationList(options) {
  return {
    type: NOTIFICATION_LIST,
    options,
  };
}

export function notificationListSuccess(data) {
  return {
    type: NOTIFICATION_LIST_SUCCESS,
    data,
  };
}

export function notificationListError(error) {
  return {
    type: NOTIFICATION_LIST_ERROR,
    error,
  };
}

export function notificationListMore(options) {
  return {
    type: NOTIFICATION_LIST_MORE,
    options,
  };
}

export function notificationListMoreSuccess(data) {
  return {
    type: NOTIFICATION_LIST_MORE_SUCCESS,
    data,
  };
}

export function notificationListMoreError(error) {
  return {
    type: NOTIFICATION_LIST_MORE_ERROR,
    error,
  };
}

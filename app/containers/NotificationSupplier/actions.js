/*
 *
 * NotificationSupplier actions
 *
 */

import {
  GET_NOTIFICATION_COUNT,
  GET_NOTIFICATION_COUNT_SUCCESS,
  GET_NOTIFICATION_COUNT_ERROR,
  GET_NOTIFICATION_LIST,
  GET_NOTIFICATION_LIST_SUCCESS,
  GET_NOTIFICATION_LIST_ERROR,
  PARTICIPANT,
  PARTICIPANT_SUCCESS,
  PARTICIPANT_ERROR,
} from './constants';

export function getNotificationCount() {
  return {
    type: GET_NOTIFICATION_COUNT,
  };
}

export function getNotificationCountSuccess(data) {
  return {
    type: GET_NOTIFICATION_COUNT_SUCCESS,
    data,
  };
}

export function getNotificationCountError(error) {
  return {
    type: GET_NOTIFICATION_COUNT_ERROR,
    error,
  };
}

export function getNotificationList() {
  return {
    type: GET_NOTIFICATION_LIST,
  };
}

export function getNotificationListSuccess(data) {
  return {
    type: GET_NOTIFICATION_LIST_SUCCESS,
    data,
  };
}

export function getNotificationListError(error) {
  return {
    type: GET_NOTIFICATION_LIST_ERROR,
    error,
  };
}

export function participant(uid, options) {
  return {
    type: PARTICIPANT,
    uid,
    options,
  };
}

export function participantSuccess(uid, data) {
  return {
    type: PARTICIPANT_SUCCESS,
    uid,
    data,
  };
}

export function participantError(error) {
  return {
    type: PARTICIPANT_ERROR,
    error,
  };
}

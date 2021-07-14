/*
 *
 * About actions
 *
 */

import {
  COMMUNITY_LIST_USER,
  COMMUNITY_LIST_USER_SUCCESS,
  COMMUNITY_LIST_USER_ERROR,
  WIDGET_LIST,
  WIDGET_LIST_SUCCESS,
  WIDGET_LIST_ERROR,
  WIDGET_LIST_ORDER,
} from './constants';

export function communityListUser(options) {
  return {
    type: COMMUNITY_LIST_USER,
    options,
  };
}

export function communityListUserSuccess(data) {
  return {
    type: COMMUNITY_LIST_USER_SUCCESS,
    data,
  };
}

export function communityListUserError(error) {
  return {
    type: COMMUNITY_LIST_USER_ERROR,
    error,
  };
}

export function widgetList(options) {
  return {
    type: WIDGET_LIST,
    options,
  };
}

export function widgetListSuccess(data) {
  return {
    type: WIDGET_LIST_SUCCESS,
    data,
  };
}

export function widgetListError(error) {
  return {
    type: WIDGET_LIST_ERROR,
    error,
  };
}

export function widgetListOrder(data) {
  return {
    type: WIDGET_LIST_ORDER,
    data,
  };
}

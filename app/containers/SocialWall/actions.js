/*
 *
 * SocialWall actions
 *
 */

import {
  WIDGET_LIST,
  WIDGET_LIST_SUCCESS,
  WIDGET_LIST_ERROR,
} from './constants';

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

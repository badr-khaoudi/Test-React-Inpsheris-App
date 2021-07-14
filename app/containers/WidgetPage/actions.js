/*
 *
 * WidgetPage actions
 *
 */

import { GET_WIDGET, GET_WIDGET_SUCCESS, GET_WIDGET_ERROR } from './constants';

export function getWidget(options) {
  return {
    type: GET_WIDGET,
    options,
  };
}

export function getWidgetSuccess() {
  return {
    type: GET_WIDGET_SUCCESS,
  };
}

export function getWidgetError(error) {
  return {
    type: GET_WIDGET_ERROR,
    error,
  };
}

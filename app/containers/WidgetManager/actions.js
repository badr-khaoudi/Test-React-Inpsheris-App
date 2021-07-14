/*
 *
 * WidgetManager actions
 *
 */

import {
  WIDGET,
  WIDGET_SUCCESS,
  WIDGET_ERROR,
  DELETE_WIDGET,
  DELETE_WIDGET_SUCCESS,
  DELETE_WIDGET_ERROR,
  ADD_WIDGET,
  WIDGET_ORDER,
  WIDGET_ORDER_SUCCESS,
  WIDGET_ORDER_ERROR,
} from './constants';

export function widget(options) {
  return {
    type: WIDGET,
    options,
  };
}

export function widgetSuccess(data) {
  return {
    type: WIDGET_SUCCESS,
    data,
  };
}

export function widgetError(error) {
  return {
    type: WIDGET_ERROR,
    error,
  };
}

export function deleteWidget(options) {
  return {
    type: DELETE_WIDGET,
    options,
  };
}

export function deleteWidgetSuccess(options) {
  return {
    type: DELETE_WIDGET_SUCCESS,
    options,
  };
}

export function deleteWidgetError(error) {
  return {
    type: DELETE_WIDGET_ERROR,
    error,
  };
}

export function addWidget(data) {
  return {
    type: ADD_WIDGET,
    data,
  };
}

export function widgetOrder(order, request) {
  return {
    type: WIDGET_ORDER,
    order,
    request,
  };
}

export function widgetOrderSuccess() {
  return {
    type: WIDGET_ORDER_SUCCESS,
  };
}

export function widgetOrderError(error) {
  return {
    type: WIDGET_ORDER_ERROR,
    error,
  };
}

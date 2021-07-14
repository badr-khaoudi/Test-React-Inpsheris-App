/*
 *
 * CreateWidget actions
 *
 */

import {
  DISPLAY_OPTIONS,
  DISPLAY_OPTIONS_SUCCESS,
  DISPLAY_OPTIONS_ERROR,
  WIDGET_TYPES,
  WIDGET_TYPES_SUCCESS,
  WIDGET_TYPES_ERROR,
  SOCIAL_WALL_TYPES,
  SOCIAL_WALL_TYPES_SUCCESS,
  SOCIAL_WALL_TYPES_ERROR,
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  TYPEFORM_LIST,
  TYPEFORM_LIST_SUCCESS,
  TYPEFORM_LIST_ERROR,
  TYPEFORM_LIST_MORE,
  TYPEFORM_LIST_MORE_SUCCESS,
  FILTER_TYPEFORM_LIST,
  FILTER_TYPEFORM_LIST_SUCCESS,
  WIDGET,
  WIDGET_SUCCESS,
  WIDGET_ERROR,
  CREATE_WIDGET,
  CREATE_WIDGET_SUCCESS,
  CREATE_WIDGET_ERROR,
  CLEAN_CREATE_WIDGET,
} from './constants';

export function displayOptions() {
  return {
    type: DISPLAY_OPTIONS,
  };
}

export function displayOptionsSuccess(data) {
  return {
    type: DISPLAY_OPTIONS_SUCCESS,
    data,
  };
}

export function displayOptionsError(error) {
  return {
    type: DISPLAY_OPTIONS_ERROR,
    error,
  };
}

export function widgetTypes() {
  return {
    type: WIDGET_TYPES,
  };
}

export function widgetTypesSuccess(data) {
  return {
    type: WIDGET_TYPES_SUCCESS,
    data,
  };
}

export function widgetTypesError(error) {
  return {
    type: WIDGET_TYPES_ERROR,
    error,
  };
}

export function socialWallTypes() {
  return {
    type: SOCIAL_WALL_TYPES,
  };
}

export function socialWallTypesSuccess(data) {
  return {
    type: SOCIAL_WALL_TYPES_SUCCESS,
    data,
  };
}

export function socialWallTypesError(error) {
  return {
    type: SOCIAL_WALL_TYPES_ERROR,
    error,
  };
}

export function uploadFile(widgetType, formData) {
  return {
    type: UPLOAD_FILE,
    widgetType,
    formData,
  };
}

export function uploadFileSuccess(widgetType, data) {
  return {
    type: UPLOAD_FILE_SUCCESS,
    widgetType,
    data,
  };
}

export function uploadFileError(error) {
  return {
    type: UPLOAD_FILE_ERROR,
    error,
  };
}

export function typeformList(options) {
  return {
    type: TYPEFORM_LIST,
    options,
  };
}

export function typeformListSuccess(data) {
  return {
    type: TYPEFORM_LIST_SUCCESS,
    data,
  };
}

export function typeformListError(error) {
  return {
    type: TYPEFORM_LIST_ERROR,
    error,
  };
}

export function typeformListMore(options) {
  return {
    type: TYPEFORM_LIST_MORE,
    options,
  };
}

export function typeformListMoreSuccess(data) {
  return {
    type: TYPEFORM_LIST_MORE_SUCCESS,
    data,
  };
}

export function filterTypeformList(options) {
  return {
    type: FILTER_TYPEFORM_LIST,
    options,
  };
}

export function filterTypeformListSuccess(data) {
  return {
    type: FILTER_TYPEFORM_LIST_SUCCESS,
    data,
  };
}

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

export function createWidget(options) {
  return {
    type: CREATE_WIDGET,
    options,
  };
}

export function createWidgetSuccess() {
  return {
    type: CREATE_WIDGET_SUCCESS,
  };
}

export function createWidgetError(error) {
  return {
    type: CREATE_WIDGET_ERROR,
    error,
  };
}

export function cleanCreateWidget() {
  return {
    type: CLEAN_CREATE_WIDGET,
  };
}

/*
 *
 * WidgetVideoViewedByUser actions
 *
 */

import {
  VIEW_ACTIVITY_WIDGET_VIDEO,
  VIEW_ACTIVITY_WIDGET_VIDEO_SUCCESS,
  VIEW_ACTIVITY_WIDGET_VIDEO_ERROR,
} from './constants';

export function viewActivityWidgetVideo(options, cancelToken) {
  return {
    type: VIEW_ACTIVITY_WIDGET_VIDEO,
    options,
    cancelToken,
  };
}

export function viewActivityWidgetVideoSuccess(data) {
  return {
    type: VIEW_ACTIVITY_WIDGET_VIDEO_SUCCESS,
    data,
  };
}

export function viewActivityWidgetVideoError(error) {
  return {
    type: VIEW_ACTIVITY_WIDGET_VIDEO_ERROR,
    error,
  };
}

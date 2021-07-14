/*
 *
 * WidgetVideoViewedByUser reducer
 *
 */
import produce from 'immer';
import {
  VIEW_ACTIVITY_WIDGET_VIDEO,
  VIEW_ACTIVITY_WIDGET_VIDEO_SUCCESS,
  VIEW_ACTIVITY_WIDGET_VIDEO_ERROR,
} from './constants';

export const initialState = {
  viewActivityWidgetVideo: {},
  viewActivityWidgetVideoSuccess: false,
  viewActivityWidgetVideoLoading: false,
  viewActivityWidgetVideoError: '',
};

/* eslint-disable default-case, no-param-reassign */
const widgetVideoViewedByUserReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case VIEW_ACTIVITY_WIDGET_VIDEO:
        draft.viewActivityWidgetVideo = {};
        draft.viewActivityWidgetVideoLoading = true;
        draft.viewActivityWidgetVideoSuccess = false;
        draft.viewActivityWidgetVideoError = '';
        break;
      case VIEW_ACTIVITY_WIDGET_VIDEO_SUCCESS:
        draft.viewActivityWidgetVideo = action.data;
        draft.viewActivityWidgetVideoLoading = false;
        draft.viewActivityWidgetVideoSuccess = true;
        draft.viewActivityWidgetVideoError = '';
        break;
      case VIEW_ACTIVITY_WIDGET_VIDEO_ERROR:
        draft.viewActivityWidgetVideoLoading = false;
        draft.viewActivityWidgetVideoSuccess = false;
        draft.viewActivityWidgetVideoError = action.error;
        break;
      default:
        return state;
    }
  });

export default widgetVideoViewedByUserReducer;

/*
 *
 * WidgetPage reducer
 *
 */
import produce from 'immer';

import { GET_WIDGET, GET_WIDGET_SUCCESS, GET_WIDGET_ERROR } from './constants';

export const initialState = {
  getWidgetLoading: false,
  getWidgetSuccess: false,
  getWidgetError: {},
};

/* eslint-disable default-case, no-param-reassign */
const widgetPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_WIDGET:
        draft.getWidgetLoading = true;
        draft.getWidgetSuccess = false;
        draft.getWidgetError = '';
        break;
      case GET_WIDGET_SUCCESS:
        draft.getWidgetLoading = false;
        draft.getWidgetSuccess = true;
        draft.getWidgetError = '';
        break;
      case GET_WIDGET_ERROR:
        draft.getWidgetLoading = false;
        draft.getWidgetSuccess = false;
        draft.getWidgetError = action.error;
        break;
    }
  });

export default widgetPageReducer;

/*
 *
 * WidgetManager reducer
 *
 */
import produce from 'immer';
import _ from 'lodash';
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

export const initialState = {
  widget: [],
  widgetLoading: false,
  widgetSuccess: false,
  widgetError: '',
  deleteWidgetLoading: false,
  deleteWidgetSuccess: false,
  deleteWidgetError: '',
  widgetOrderLoading: false,
  widgetOrderSuccess: false,
  widgetOrderError: '',
};

/* eslint-disable default-case, no-param-reassign */
const widgetManagerReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case WIDGET:
        draft.widget = [];
        draft.widgetLoading = true;
        draft.widgetSuccess = false;
        draft.widgetError = '';
        break;
      case WIDGET_SUCCESS:
        draft.widget = action.data;
        draft.widgetLoading = false;
        draft.widgetSuccess = true;
        draft.widgetError = '';
        break;
      case WIDGET_ERROR:
        draft.widgetLoading = false;
        draft.widgetSuccess = false;
        draft.widgetError = action.error;
        break;
      case DELETE_WIDGET:
        draft.deleteWidgetLoading = true;
        draft.deleteWidgetSuccess = false;
        draft.deleteWidgetError = '';
        break;
      case DELETE_WIDGET_SUCCESS:
        draft.widget = _.filter(
          draft.widget,
          uid => uid !== action.options.uid,
        );
        draft.deleteWidgetLoading = false;
        draft.deleteWidgetSuccess = true;
        draft.deleteWidgetError = '';
        break;
      case DELETE_WIDGET_ERROR:
        draft.deleteWidgetLoading = false;
        draft.deleteWidgetSuccess = false;
        draft.deleteWidgetError = action.error;
        break;
      case ADD_WIDGET:
        draft.widget = _.uniq([...draft.widget, action.data]);
        break;
      case WIDGET_ORDER:
        draft.widget = action.order;
        draft.widgetOrderLoading = true;
        draft.widgetOrderSuccess = false;
        draft.widgetOrderError = '';
        break;
      case WIDGET_ORDER_SUCCESS:
        draft.widgetOrderLoading = false;
        draft.widgetOrderSuccess = true;
        draft.widgetOrderError = '';
        break;
      case WIDGET_ORDER_ERROR:
        draft.widgetOrderLoading = false;
        draft.widgetOrderSuccess = false;
        draft.widgetOrderError = action.error;
        break;
      default:
        return state;
    }
  });

export default widgetManagerReducer;

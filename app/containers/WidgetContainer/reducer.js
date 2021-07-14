/*
 *
 * WidgetContainer reducer
 *
 */
import produce from 'immer';

import {
  SET_WIDGET_ORDER,
  SET_WIDGET_ORDER_SUCCESS,
  SET_WIDGET_ORDER_ERROR,
  SUBMIT_POLL,
  SUBMIT_POLL_SUCCESS,
  SUBMIT_POLL_ERROR,
  OPEN_CREATE_EVENT,
  EDIT_CREATE_EVENT,
  CLOSE_CREATE_EVENT,
  CREATE_EVENT,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_ERROR,
  CLEAN_CREATE_EVENT,
  CALENDAR_OPTIONS,
} from './constants';

export const initialState = {
  widgetOrderLoading: true,
  widgetOrderSuccess: false,
  widgetOrderError: {},
  submitPollLoading: false,
  submitPollSuccess: false,
  submitPollError: {},
  openCreateEvent: false,
  widgetUid: '',
  event: undefined,
  createEventLoading: true,
  createEventSuccess: false,
  createEventError: {},
  calendarOptions: {},
};

/* eslint-disable default-case, no-param-reassign */
const widgetContainerReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case SET_WIDGET_ORDER:
        draft.widgetOrderLoading = true;
        draft.widgetOrderSuccess = false;
        draft.widgetOrderError = '';
        break;
      case SET_WIDGET_ORDER_SUCCESS:
        draft.widgetOrderLoading = false;
        draft.widgetOrderSuccess = true;
        draft.widgetOrderError = '';
        break;
      case SET_WIDGET_ORDER_ERROR:
        draft.widgetOrderLoading = false;
        draft.widgetOrderSuccess = false;
        draft.widgetOrderError = action.error;
        break;
      case SUBMIT_POLL:
        draft.submitPollLoading = true;
        draft.submitPollSuccess = false;
        draft.submitPollError = {};
        break;
      case SUBMIT_POLL_SUCCESS:
        draft.submitPollLoading = false;
        draft.submitPollSuccess = true;
        draft.submitPollError = {};
        break;
      case SUBMIT_POLL_ERROR:
        draft.submitPollLoading = false;
        draft.submitPollSuccess = false;
        draft.submitPollError = action.error;
        break;
      case OPEN_CREATE_EVENT:
        draft.openCreateEvent = true;
        draft.widgetUid = action.widgetUid;
        break;
      case EDIT_CREATE_EVENT:
        draft.openCreateEvent = true;
        draft.widgetUid = action.widgetUid;
        draft.event = action.event;
        break;
      case CLOSE_CREATE_EVENT:
        draft.openCreateEvent = false;
        draft.widgetUid = undefined;
        draft.event = {};
        break;
      case CREATE_EVENT:
        draft.createEventLoading = true;
        draft.createEventSuccess = false;
        draft.createEventError = '';
        break;
      case CREATE_EVENT_SUCCESS:
        draft.createEventLoading = false;
        draft.createEventSuccess = true;
        draft.createEventError = '';
        break;
      case CREATE_EVENT_ERROR:
        draft.createEventLoading = false;
        draft.createEventSuccess = false;
        draft.createEventError = action.error;
        break;
      case CLEAN_CREATE_EVENT:
        draft.createEventLoading = false;
        draft.createEventSuccess = false;
        draft.createEventError = '';
        break;
      case CALENDAR_OPTIONS:
        draft.calendarOptions = action.options;
        break;
      default:
        return state;
    }
  });

export default widgetContainerReducer;

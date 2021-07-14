/*
 *
 * WidgetContainer actions
 *
 */

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
  DELETE_EVENT,
  DELETE_EVENT_SUCCESS,
  DELETE_EVENT_ERROR,
  DELETE_AGENDA,
  DELETE_AGENDA_SUCCESS,
  DELETE_AGENDA_ERROR,
} from './constants';

export function setWidgetOrder(data) {
  return {
    type: SET_WIDGET_ORDER,
    data,
  };
}

export function setWidgetOrderSuccess() {
  return {
    type: SET_WIDGET_ORDER_SUCCESS,
  };
}

export function setWidgetOrderError(error) {
  return {
    type: SET_WIDGET_ORDER_ERROR,
    error,
  };
}

export function submitPoll(widgetUid, data) {
  return {
    type: SUBMIT_POLL,
    widgetUid,
    data,
  };
}

export function submitPollSuccess() {
  return {
    type: SUBMIT_POLL_SUCCESS,
  };
}

export function submitPollError(error) {
  return {
    type: SUBMIT_POLL_ERROR,
    error,
  };
}

export function openCreateEvent(widgetUid) {
  return {
    type: OPEN_CREATE_EVENT,
    widgetUid,
  };
}

export function editCreateEvent(widgetUid, event) {
  return {
    type: EDIT_CREATE_EVENT,
    widgetUid,
    event,
  };
}

export function closeCreateEvent() {
  return {
    type: CLOSE_CREATE_EVENT,
  };
}

export function createEvent(options) {
  return {
    type: CREATE_EVENT,
    options,
  };
}

export function createEventSuccess() {
  return {
    type: CREATE_EVENT_SUCCESS,
  };
}

export function createEventError(error) {
  return {
    type: CREATE_EVENT_ERROR,
    error,
  };
}

export function cleanCreateEvent() {
  return {
    type: CLEAN_CREATE_EVENT,
  };
}

export function calendarOptions(options) {
  return {
    type: CALENDAR_OPTIONS,
    options,
  };
}

export function deleteEvent(widgetUid, options) {
  return {
    type: DELETE_EVENT,
    widgetUid,
    options,
  };
}

export function deleteEventSuccess() {
  return {
    type: DELETE_EVENT_SUCCESS,
  };
}

export function deleteEventError(error) {
  return {
    type: DELETE_EVENT_ERROR,
    error,
  };
}

export function deleteAgenda(widgetUid, options) {
  return {
    type: DELETE_AGENDA,
    widgetUid,
    options,
  };
}

export function deleteAgendaSuccess() {
  return {
    type: DELETE_AGENDA_SUCCESS,
  };
}

export function deleteAgendaError(error) {
  return {
    type: DELETE_AGENDA_ERROR,
    error,
  };
}

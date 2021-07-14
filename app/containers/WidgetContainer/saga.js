import { takeLatest, call, put, select } from 'redux-saga/effects';
import { widgetItem } from 'utils/api/WidgetManagerApi';
import {
  entitiesUpdate,
  entitiesReplace,
} from 'containers/GlobalEntities/actions';
import { calendar } from 'containers/GlobalEntities/saga';
import {
  widgetOrder,
  submitPollApi,
  event,
  deleteEvent as deleteEventApi,
  deleteAgenda as deleteAgendaApi,
} from 'utils/api/WidgetApi';
import {
  SET_WIDGET_ORDER,
  SUBMIT_POLL,
  CREATE_EVENT,
  DELETE_EVENT,
  DELETE_AGENDA,
} from './constants';
import {
  setWidgetOrderSuccess,
  setWidgetOrderError,
  submitPollSuccess,
  submitPollError,
  createEventSuccess,
  createEventError,
  deleteEventSuccess,
  deleteEventError,
  deleteAgendaSuccess,
  deleteAgendaError,
} from './actions';
import { makeSelectWidgetUid, makeSelectCalendarOptions } from './selectors';

// Individual exports for testing

export function* setWidgetOrder({ data }) {
  try {
    yield call(widgetOrder, data);
    yield put(setWidgetOrderSuccess());
  } catch (error) {
    yield put(setWidgetOrderError(error));
  }
}

export function* submitPoll({ widgetUid, data }) {
  try {
    yield call(submitPollApi, data);
    yield put(submitPollSuccess());
    const { entities } = yield call(widgetItem, { uid: widgetUid });
    yield put(entitiesUpdate(entities));
  } catch (error) {
    yield put(submitPollError(error));
  }
}

export function* createEvent({ options }) {
  try {
    const widgetUid = yield select(makeSelectWidgetUid());
    const calendarOptions = yield select(makeSelectCalendarOptions());
    yield call(event, { widgetUid }, options);
    yield put(createEventSuccess());
    yield call(calendar, { uid: widgetUid, options: calendarOptions });
  } catch (error) {
    yield put(createEventError(error));
  }
}

export function* deleteEvent({ widgetUid, options }) {
  try {
    const calendarOptions = yield select(makeSelectCalendarOptions());
    yield call(deleteEventApi, options);
    yield put(deleteEventSuccess());
    yield call(calendar, { uid: widgetUid, options: calendarOptions });
  } catch (error) {
    yield put(deleteEventError(error));
  }
}

export function* deleteAgenda({ widgetUid, options }) {
  try {
    yield call(deleteAgendaApi, options);
    yield put(deleteAgendaSuccess());
    const {
      entities: { widgets },
    } = yield call(widgetItem, { uid: widgetUid });
    yield put(entitiesReplace('widgets', widgetUid, widgets[widgetUid]));
  } catch (error) {
    yield put(deleteAgendaError(error));
  }
}

export default function* widgetContainerSaga() {
  yield takeLatest(SET_WIDGET_ORDER, setWidgetOrder);
  yield takeLatest(SUBMIT_POLL, submitPoll);
  yield takeLatest(CREATE_EVENT, createEvent);
  yield takeLatest(DELETE_EVENT, deleteEvent);
  yield takeLatest(DELETE_AGENDA, deleteAgenda);
}

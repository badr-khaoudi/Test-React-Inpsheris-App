import { takeLatest, call, put } from 'redux-saga/effects';
import {
  widget as widgetApi,
  deleteWidget as deleteWidgetApi,
} from 'utils/api/WidgetManagerApi';
import { widgetOrder as widgetOrderApi } from 'utils/api/WidgetApi';
import {
  entitiesUpdate,
  deleteWidgetEntity,
} from 'containers/GlobalEntities/actions';
import {
  widgetSuccess,
  widgetError,
  deleteWidgetSuccess,
  deleteWidgetError,
  widgetOrderSuccess,
  widgetOrderError,
} from './actions';
import { WIDGET, DELETE_WIDGET, WIDGET_ORDER } from './constants';

export function* widget({ options }) {
  try {
    const { entities, result } = yield call(widgetApi, options);
    yield put(entitiesUpdate(entities));
    yield put(widgetSuccess(result));
  } catch (error) {
    yield put(widgetError(error.message));
  }
}

export function* deleteWidget({ options }) {
  try {
    yield call(deleteWidgetApi, options);
    yield put(deleteWidgetSuccess(options));
    yield put(deleteWidgetEntity(options));
  } catch (error) {
    yield put(deleteWidgetError(error.message));
  }
}

export function* widgetOrder({ request }) {
  try {
    yield call(widgetOrderApi, request);
    yield put(widgetOrderSuccess());
  } catch (error) {
    yield put(widgetOrderError(error.message));
  }
}

export default function* widgetManagerSaga() {
  yield takeLatest(WIDGET, widget);
  yield takeLatest(DELETE_WIDGET, deleteWidget);
  yield takeLatest(WIDGET_ORDER, widgetOrder);
}

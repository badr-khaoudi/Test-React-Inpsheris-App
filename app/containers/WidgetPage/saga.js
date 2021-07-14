import { takeLatest, call, put } from 'redux-saga/effects';
import { widgetItem } from 'utils/api/WidgetManagerApi';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import { GET_WIDGET } from './constants';
import { getWidgetSuccess, getWidgetError } from './actions';

export function* getWidget({ options }) {
  try {
    const { entities } = yield call(widgetItem, options);
    yield put(entitiesUpdate(entities));
    yield put(getWidgetSuccess());
  } catch (error) {
    yield put(getWidgetError(error.message));
  }
}

export default function* widgetPageSaga() {
  yield takeLatest(GET_WIDGET, getWidget);
}

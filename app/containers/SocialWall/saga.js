import { takeLatest, call, put } from 'redux-saga/effects';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import { widgetList as widgetListApi } from 'utils/api/HomeApi';
import { WIDGET_LIST } from './constants';
import { widgetListSuccess, widgetListError } from './actions';

export function* widgetList({ options }) {
  try {
    const { entities, result } = yield call(widgetListApi, options);
    yield put(entitiesUpdate(entities));
    yield put(widgetListSuccess(result));
  } catch (error) {
    yield put(widgetListError(error));
  }
}

export default function* socialWallSaga() {
  yield takeLatest(WIDGET_LIST, widgetList);
}

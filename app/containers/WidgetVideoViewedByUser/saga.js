import { takeLatest, call, put } from 'redux-saga/effects';
import { viewActivityWidgetVideo as viewActivityWidgetVideoApi } from 'utils/api/StatisticsApi';
import { VIEW_ACTIVITY_WIDGET_VIDEO } from './constants';
import {
  viewActivityWidgetVideoSuccess,
  viewActivityWidgetVideoError,
} from './actions';

export function* viewActivityWidgetVideo({ options, cancelToken }) {
  try {
    const { data } = yield call(
      viewActivityWidgetVideoApi,
      options,
      cancelToken,
    );
    yield put(viewActivityWidgetVideoSuccess(data));
  } catch (error) {
    yield put(viewActivityWidgetVideoError(error.message));
  }
}

export default function* widgetVideoViewedByUserSaga() {
  yield takeLatest(VIEW_ACTIVITY_WIDGET_VIDEO, viewActivityWidgetVideo);
}

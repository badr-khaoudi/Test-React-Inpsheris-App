import { takeLatest, call, put } from 'redux-saga/effects';
import { flexdesk as flexdeskApi } from 'utils/api/StatisticsApi';
import { FLEXDESK } from './constants';
import { flexdeskSuccess, flexdeskError } from './actions';

export function* flexdesk({ options, cancelToken }) {
  try {
    const { data } = yield call(flexdeskApi, options, cancelToken);
    yield put(flexdeskSuccess(data));
  } catch (error) {
    yield put(flexdeskError(error.message));
  }
}

export default function* flexdeskReportSaga() {
  yield takeLatest(FLEXDESK, flexdesk);
}

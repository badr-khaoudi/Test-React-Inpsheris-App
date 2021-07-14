import { takeLatest, call, put } from 'redux-saga/effects';
import { countContentCreatedByDate as countContentCreatedByDateApi } from 'utils/api/StatisticsApi';
import { COUNT_CONTENT_CREATED_BY_DATE } from './constants';
import {
  countContentCreatedByDateSuccess,
  countContentCreatedByDateError,
} from './actions';

export function* countContentCreatedByDate({ options, cancelToken }) {
  try {
    const { data } = yield call(
      countContentCreatedByDateApi,
      options,
      cancelToken,
    );
    yield put(countContentCreatedByDateSuccess(data));
  } catch (error) {
    yield put(countContentCreatedByDateError(error.message));
  }
}

export default function* globalContentSaga() {
  yield takeLatest(COUNT_CONTENT_CREATED_BY_DATE, countContentCreatedByDate);
}

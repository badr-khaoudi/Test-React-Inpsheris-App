import { takeLatest, call, put } from 'redux-saga/effects';
import { listContentViewedBySource as listContentViewedBySourceApi } from 'utils/api/StatisticsApi';
import { LIST_CONTENT_VIEWED_BY_SOURCE } from './constants';
import {
  listContentViewedBySourceSuccess,
  listContentViewedBySourceError,
} from './actions';

export function* listContentViewedBySource({ options, cancelToken }) {
  try {
    const { data } = yield call(
      listContentViewedBySourceApi,
      options,
      cancelToken,
    );
    yield put(listContentViewedBySourceSuccess(data));
  } catch (error) {
    yield put(listContentViewedBySourceError(error.message));
  }
}

export default function* usersNavigationSaga() {
  yield takeLatest(LIST_CONTENT_VIEWED_BY_SOURCE, listContentViewedBySource);
}

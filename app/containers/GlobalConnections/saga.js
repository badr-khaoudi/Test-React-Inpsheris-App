import { takeLatest, call, put } from 'redux-saga/effects';
import {
  countTotal as countTotalApi,
  countTotalTable as countTotalTableApi,
  countByDepartment as countByDepartmentApi,
  countByStatus as countByStatusApi,
  countByCommunityStatus as countByCommunityStatusApi,
} from 'utils/api/StatisticsApi';
import {
  COUNT_TOTAL,
  COUNT_TOTAL_TABLE,
  COUNT_BY_DEPARTMENT,
  COUNT_BY_STATUS,
  COUNT_BY_COMMUNITY_STATUS,
} from './constants';
import {
  countTotalSuccess,
  countTotalTableSuccess,
  countByDepartmentSuccess,
  countByStatusSuccess,
  countByCommunityStatusSuccess,
  globalConnectionsError,
} from './actions';

export function* countTotal({ options, cancelToken }) {
  try {
    const { data } = yield call(countTotalApi, options, cancelToken);
    yield put(countTotalSuccess(data));
  } catch (error) {
    yield put(globalConnectionsError(error.message));
  }
}

export function* countTotalTable({ options, cancelToken }) {
  try {
    const { data } = yield call(countTotalTableApi, options, cancelToken);
    yield put(countTotalTableSuccess(data));
  } catch (error) {
    yield put(globalConnectionsError(error.message));
  }
}

export function* countByDepartment({ options, cancelToken }) {
  try {
    const { data } = yield call(countByDepartmentApi, options, cancelToken);
    yield put(countByDepartmentSuccess(data));
  } catch (error) {
    yield put(globalConnectionsError(error.message));
  }
}

export function* countByStatus({ options, cancelToken }) {
  try {
    const { data } = yield call(countByStatusApi, options, cancelToken);
    yield put(countByStatusSuccess(data));
  } catch (error) {
    yield put(globalConnectionsError(error.message));
  }
}

export function* countByCommunityStatus({ options, cancelToken }) {
  try {
    const { data } = yield call(
      countByCommunityStatusApi,
      options,
      cancelToken,
    );
    yield put(countByCommunityStatusSuccess(data));
  } catch (error) {
    yield put(globalConnectionsError(error.message));
  }
}

export default function* globalConnectionsSaga() {
  yield takeLatest(COUNT_TOTAL, countTotal);
  yield takeLatest(COUNT_TOTAL_TABLE, countTotalTable);
  yield takeLatest(COUNT_BY_DEPARTMENT, countByDepartment);
  yield takeLatest(COUNT_BY_STATUS, countByStatus);
  yield takeLatest(COUNT_BY_COMMUNITY_STATUS, countByCommunityStatus);
}

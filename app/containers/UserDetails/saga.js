import { takeLatest, call, put } from 'redux-saga/effects';
import {
  listUserDetailsAndActions as listUserDetailsAndActionsApi,
  totalConnectAtTheMoment as totalConnectAtTheMomentApi,
  viewDetails as viewDetailsApi,
  viewDetailsExport as viewDetailsExportApi,
  listUserNeverConnect as listUserNeverConnectApi,
  listUserConnect as listUserConnectApi,
  listUserConnectLessEqualTenTimes as listUserConnectLessEqualTenTimesApi,
  listUserConnectionSummary as listUserConnectionSummaryApi,
} from 'utils/api/StatisticsApi';
import { jobList } from 'containers/Statistics/actions';
import {
  LIST_USER_DETAILS_AND_ACTIONS,
  TOTAL_CONNECT_AT_THE_MOMENT,
  VIEW_DETAILS,
  VIEW_DETAILS_EXPORT,
  LIST_USER_NEVER_CONNECT,
  LIST_USER_CONNECT,
  LIST_USER_CONNECT_LESS_EQUAL_TEN_TIMES,
  LIST_USER_CONNECTION_SUMMARY,
} from './constants';
import {
  listUserDetailsAndActionsSuccess,
  totalConnectAtTheMomentSuccess,
  viewDetailsSuccess,
  viewDetailsExportSuccess,
  viewDetailsExportError,
  listUserNeverConnectSuccess,
  listUserConnectSuccess,
  listUserConnectLessEqualTenTimesSuccess,
  listUserConnectionSummarySuccess,
  userDetailsError,
} from './actions';

export function* listUserDetailsAndActions({ options, cancelToken }) {
  try {
    const { data } = yield call(
      listUserDetailsAndActionsApi,
      options,
      cancelToken,
    );
    yield put(listUserDetailsAndActionsSuccess(data));
  } catch (error) {
    yield put(userDetailsError(error.message));
  }
}

export function* totalConnectAtTheMoment({ options, cancelToken }) {
  try {
    const { data } = yield call(
      totalConnectAtTheMomentApi,
      options,
      cancelToken,
    );
    yield put(totalConnectAtTheMomentSuccess(data));
  } catch (error) {
    yield put(userDetailsError(error.message));
  }
}

export function* viewDetails({ options, cancelToken }) {
  try {
    const { data } = yield call(viewDetailsApi, options, cancelToken);
    yield put(viewDetailsSuccess(data));
  } catch (error) {
    yield put(userDetailsError(error.message));
  }
}

export function* viewDetailsExport({ options, fileName }) {
  try {
    const { data } = yield call(viewDetailsExportApi, options);
    yield put(viewDetailsExportSuccess(data));
    yield put(jobList(fileName));
  } catch (error) {
    yield put(viewDetailsExportError(error.message));
  }
}

export function* listUserNeverConnect({ options, cancelToken }) {
  try {
    const { data } = yield call(listUserNeverConnectApi, options, cancelToken);
    yield put(listUserNeverConnectSuccess(data));
  } catch (error) {
    yield put(userDetailsError(error.message));
  }
}

export function* listUserConnect({ options, cancelToken }) {
  try {
    const { data } = yield call(listUserConnectApi, options, cancelToken);
    yield put(listUserConnectSuccess(data));
  } catch (error) {
    yield put(userDetailsError(error.message));
  }
}

export function* listUserConnectLessEqualTenTimes({ options, cancelToken }) {
  try {
    const { data } = yield call(
      listUserConnectLessEqualTenTimesApi,
      options,
      cancelToken,
    );
    yield put(listUserConnectLessEqualTenTimesSuccess(data));
  } catch (error) {
    yield put(userDetailsError(error.message));
  }
}

export function* listUserConnectionSummary({ options, cancelToken }) {
  try {
    const { data } = yield call(
      listUserConnectionSummaryApi,
      options,
      cancelToken,
    );
    yield put(listUserConnectionSummarySuccess(data));
  } catch (error) {
    yield put(userDetailsError(error.message));
  }
}

export default function* userDetailsSaga() {
  yield takeLatest(LIST_USER_DETAILS_AND_ACTIONS, listUserDetailsAndActions);
  yield takeLatest(TOTAL_CONNECT_AT_THE_MOMENT, totalConnectAtTheMoment);
  yield takeLatest(VIEW_DETAILS, viewDetails);
  yield takeLatest(VIEW_DETAILS_EXPORT, viewDetailsExport);
  yield takeLatest(LIST_USER_NEVER_CONNECT, listUserNeverConnect);
  yield takeLatest(LIST_USER_CONNECT, listUserConnect);
  yield takeLatest(
    LIST_USER_CONNECT_LESS_EQUAL_TEN_TIMES,
    listUserConnectLessEqualTenTimes,
  );
  yield takeLatest(LIST_USER_CONNECTION_SUMMARY, listUserConnectionSummary);
}

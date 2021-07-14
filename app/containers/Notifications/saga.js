import { takeLatest, call, put } from 'redux-saga/effects';
import { notificationList as notificationListApi } from 'utils/api/NotificationApi';
import { NOTIFICATION_LIST, NOTIFICATION_LIST_MORE } from './constants';
import {
  notificationListSuccess,
  notificationListError,
  notificationListMoreSuccess,
  notificationListMoreError,
} from './actions';

export function* notificationList({ options }) {
  try {
    const { data } = yield call(notificationListApi, options);
    yield put(notificationListSuccess(data));
  } catch (error) {
    yield put(notificationListError(error.message));
  }
}

export function* notificationListMore({ options }) {
  try {
    const { data } = yield call(notificationListApi, options);
    yield put(notificationListMoreSuccess(data));
  } catch (error) {
    yield put(notificationListMoreError(error.message));
  }
}

export default function* notificationsSaga() {
  yield takeLatest(NOTIFICATION_LIST, notificationList);
  yield takeLatest(NOTIFICATION_LIST_MORE, notificationListMore);
}

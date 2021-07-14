import {
  take,
  takeLatest,
  call,
  put,
  race,
  delay,
  takeEvery,
} from 'redux-saga/effects';
import {
  GET_CURRENT_USER_SUCCESS,
  CHECK_SESSION_ERROR,
} from 'containers/AuthBase/constants';
import {
  notificationCount,
  notificationList,
  participant as participantApi,
} from 'utils/api/NotificationApi';
import { GET_NOTIFICATION_LIST, PARTICIPANT } from './constants';

import {
  getNotificationCountSuccess,
  getNotificationCountError,
  getNotificationListSuccess,
  getNotificationListError,
  participantSuccess,
  participantError,
} from './actions';

export function* getNotificationCount() {
  while (true) {
    try {
      const { data } = yield call(notificationCount);
      yield put(getNotificationCountSuccess(data));
    } catch (error) {
      yield put(getNotificationCountError(error));
    } finally {
      yield delay(60000);
    }
  }
}

export function* getNotificationList() {
  try {
    const { data } = yield call(notificationList);
    yield put(getNotificationListSuccess(data));
  } catch (error) {
    yield put(getNotificationListError(error));
  }
}

export function* participant({ uid, options }) {
  try {
    const { data } = yield call(participantApi, options);
    yield put(participantSuccess(uid, data));
  } catch (error) {
    yield put(participantError(error));
  }
}

export default function* notificationSupplierSaga() {
  yield takeLatest(GET_NOTIFICATION_LIST, getNotificationList);
  yield takeEvery(PARTICIPANT, participant);
  while (true) {
    yield take(GET_CURRENT_USER_SUCCESS);
    yield race([call(getNotificationCount), take(CHECK_SESSION_ERROR)]);
  }
}

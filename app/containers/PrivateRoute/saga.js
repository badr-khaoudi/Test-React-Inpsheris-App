import { call, put, delay, takeLatest, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  checkSessionSuccess,
  checkSessionError,
} from 'containers/AuthBase/actions';
import { checkSession as checkSessionApi } from 'utils/api/AuthApi';
import { CHECK_SESSION } from 'containers/AuthBase/constants';
import { checkSessionSuccess as checkSessionSuccessSelector } from 'containers/AuthBase/selectors';

export function* checkSession() {
  try {
    const { data } = yield call(checkSessionApi);
    if (data.status === 'alive') {
      yield put(checkSessionSuccess(data));
    } else {
      yield put(checkSessionError('Error'));
      yield put(push('/login'));
    }
  } catch (error) {
    yield put(checkSessionError(error.message));
  }
}

export function* checkSessionWithTimeout() {
  try {
    const { data } = yield call(checkSessionApi);
    const sessionSuccess = yield select(checkSessionSuccessSelector());
    if (!sessionSuccess) {
      if (data.status === 'alive') {
        yield put(checkSessionSuccess(data));
      }
    }
    if (data.status !== 'alive') {
      yield put(checkSessionError('Error'));
    }
  } catch (error) {
    yield put(checkSessionError(error.message));
  }
}

export default function* privateRouteSaga() {
  yield takeLatest(CHECK_SESSION, checkSession);
  while (true) {
    yield delay(60000);
    yield call(checkSessionWithTimeout);
  }
}

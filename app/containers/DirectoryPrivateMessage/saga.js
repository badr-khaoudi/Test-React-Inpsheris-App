import { takeLatest, call, put } from 'redux-saga/effects';
import { directoryPrivateMessage } from 'utils/api/AuthApi';
import { PRIVATE_MESSAGE } from './constants';
import { privateMessageSuccess, privateMessageError } from './actions';

export function* privateMessage({ options }) {
  try {
    const { data } = yield call(directoryPrivateMessage, options);
    yield put(privateMessageSuccess(data));
  } catch (error) {
    yield put(privateMessageError(error.message));
  }
}

export default function* directoryPrivateMessageSaga() {
  yield takeLatest(PRIVATE_MESSAGE, privateMessage);
}

import { takeLatest, call, put } from 'redux-saga/effects';
import { privateMessage } from 'utils/api/AuthApi';
import { PRIVATE_MESSAGE } from './constants';
import { privateMessageSuccess, privateMessageError } from './actions';

export function* sendPrivateMessage({ options }) {
  try {
    const { data } = yield call(privateMessage, options);
    yield put(privateMessageSuccess(data));
  } catch (error) {
    yield put(privateMessageError(error.message));
  }
}

export default function* privateMessageSaga() {
  yield takeLatest(PRIVATE_MESSAGE, sendPrivateMessage);
}

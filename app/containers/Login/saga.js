import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router/immutable';
import { currentUser as currentUserApi } from 'utils/api/AuthApi';
import { CURRENT_USER } from './constants';

export function* currentUser() {
  try {
    yield call(currentUserApi);
    yield put(push('/'));
  } catch (error) {
    console.log(error);
  }
}

export default function* loginSaga() {
  yield takeLatest(CURRENT_USER, currentUser);
}

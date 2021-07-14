import { takeLatest, call, put } from 'redux-saga/effects';
import { share } from 'utils/api/AuthApi';

import { SHARE } from './constants';
import { shareSuccess, shareError } from './actions';

export function* shareContent({ options }) {
  try {
    const { data } = yield call(share, options);
    yield put(shareSuccess(data));
  } catch (error) {
    yield put(shareError(error.message));
  }
}

export default function* shareSaga() {
  yield takeLatest(SHARE, shareContent);
}

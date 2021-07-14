import { takeLatest, call, put } from 'redux-saga/effects';
import { contentDetails } from 'utils/api/HomeFeedApi';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import { CONTENT } from './constants';
import { contentSuccess, contentError } from './actions';

export function* content({ options }) {
  try {
    const { entities } = yield call(contentDetails, options);
    yield put(entitiesUpdate(entities));
    yield put(contentSuccess());
  } catch (error) {
    yield put(contentError(error.message));
  }
}

export default function* grandArticleSaga() {
  yield takeLatest(CONTENT, content);
}

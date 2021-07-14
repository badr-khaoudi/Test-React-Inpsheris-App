import { takeLatest, call, put } from 'redux-saga/effects';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import { contentFilter as contentFilterApi } from 'utils/api/DigestApi';
import { CONTENT_FILTER, CONTENT_FILTER_MORE } from './constants';
import {
  contentFilterSuccess,
  contentFilterError,
  contentFilterMoreSuccess,
  contentFilterMoreError,
} from './actions';

export function* contentFilter({ options }) {
  try {
    const { response, entities, result } = yield call(
      contentFilterApi,
      options,
    );
    yield put(entitiesUpdate(entities));
    yield put(contentFilterSuccess({ ...response, contents: result }));
  } catch (error) {
    yield put(contentFilterError(error.message));
  }
}

export function* contentFilterMore({ options }) {
  try {
    const { response, entities, result } = yield call(
      contentFilterApi,
      options,
    );
    yield put(entitiesUpdate(entities));
    yield put(contentFilterMoreSuccess({ ...response, contents: result }));
  } catch (error) {
    yield put(contentFilterMoreError(error.message));
  }
}

export default function* chooseContentSaga() {
  yield takeLatest(CONTENT_FILTER, contentFilter);
  yield takeLatest(CONTENT_FILTER_MORE, contentFilterMore);
}

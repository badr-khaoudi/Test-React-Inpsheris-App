import { takeLatest, call, put } from 'redux-saga/effects';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import { publications as publicationsApi } from 'utils/api/MyProfileApi';
import { PUBLICATIONS, PUBLICATIONS_MORE } from './constants';
import {
  publicationsSuccess,
  publicationsError,
  publicationsMoreSuccess,
  publicationsMoreError,
} from './actions';

export function* publications({ options }) {
  try {
    const { response, entities, result } = yield call(publicationsApi, options);
    yield put(entitiesUpdate(entities));
    yield put(publicationsSuccess({ ...response, contents: result }));
  } catch (error) {
    yield put(publicationsError(error.message));
  }
}

export function* publicationsMore({ options }) {
  try {
    const { response, entities, result } = yield call(publicationsApi, options);
    yield put(entitiesUpdate(entities));
    yield put(publicationsMoreSuccess({ ...response, contents: result }));
  } catch (error) {
    yield put(publicationsMoreError(error.message));
  }
}

export default function* myPublishSaga() {
  yield takeLatest(PUBLICATIONS, publications);
  yield takeLatest(PUBLICATIONS_MORE, publicationsMore);
}

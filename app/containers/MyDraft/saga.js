import { takeLatest, call, put } from 'redux-saga/effects';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import { drafts as draftsApi } from 'utils/api/MyProfileApi';
import { DRAFTS, DRAFTS_MORE } from './constants';
import {
  draftsSuccess,
  draftsError,
  draftsMoreSuccess,
  draftsMoreError,
} from './actions';

export function* drafts({ options }) {
  try {
    const { response, entities, result } = yield call(draftsApi, options);
    yield put(entitiesUpdate(entities));
    yield put(draftsSuccess({ ...response, contents: result }));
  } catch (error) {
    yield put(draftsError(error.message));
  }
}

export function* draftsMore({ options }) {
  try {
    const { response, entities, result } = yield call(draftsApi, options);
    yield put(entitiesUpdate(entities));
    yield put(draftsMoreSuccess({ ...response, contents: result }));
  } catch (error) {
    yield put(draftsMoreError(error.message));
  }
}

export default function* myDraftSaga() {
  yield takeLatest(DRAFTS, drafts);
  yield takeLatest(DRAFTS_MORE, draftsMore);
}

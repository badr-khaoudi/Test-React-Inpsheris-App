import { takeLatest, call, put } from 'redux-saga/effects';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import { profile as profileApi } from 'utils/api/MyProfileApi';
import { PROFILE, PROFILE_MORE } from './constants';
import {
  profileSuccess,
  profileError,
  profileMoreSuccess,
  profileMoreError,
} from './actions';

export function* profile({ options }) {
  try {
    const { response, entities, result } = yield call(profileApi, options);
    yield put(entitiesUpdate(entities));
    yield put(profileSuccess(options, { ...response, contents: result }));
  } catch (error) {
    yield put(profileError(error.message));
  }
}

export function* profileMore({ options }) {
  try {
    const { response, entities, result } = yield call(profileApi, options);
    yield put(entitiesUpdate(entities));
    yield put(profileMoreSuccess(options, { ...response, contents: result }));
  } catch (error) {
    yield put(profileMoreError(error.message));
  }
}

export default function* activitiesSaga() {
  yield takeLatest(PROFILE, profile);
  yield takeLatest(PROFILE_MORE, profileMore);
}

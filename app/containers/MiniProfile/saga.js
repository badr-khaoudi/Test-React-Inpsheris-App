import { takeLatest, call, put } from 'redux-saga/effects';
import { userProfile as userProfileApi } from 'utils/api/MyProfileApi';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import { userProfileSuccess, userProfileError } from './actions';
import { USER_PROFILE } from './constants';

export function* userProfile({ options, cancelToken }) {
  try {
    const { entities, result } = yield call(
      userProfileApi,
      options,
      cancelToken,
    );
    yield put(entitiesUpdate(entities));
    yield put(userProfileSuccess(result));
  } catch (error) {
    yield put(userProfileError(error.message));
  }
}

export default function* miniProfileSaga() {
  yield takeLatest(USER_PROFILE, userProfile);
}

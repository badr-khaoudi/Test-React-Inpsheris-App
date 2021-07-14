import { takeLatest, call, put } from 'redux-saga/effects';
import { userLiked } from 'utils/api/AuthApi';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import { userLikedSuccess, userLikedError } from './actions';
import { USER_LIKED } from './constants';

export function* getUserLiked({ options }) {
  try {
    const { entities, result } = yield call(userLiked, options);
    yield put(entitiesUpdate(entities));
    yield put(userLikedSuccess(result));
  } catch (error) {
    yield put(userLikedError(error.message));
  }
}

export default function* userLikedSaga() {
  yield takeLatest(USER_LIKED, getUserLiked);
}

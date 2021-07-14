import { takeLatest, call, put } from 'redux-saga/effects';
import { userLikedList as userLikedListApi } from 'utils/api/MyProfileApi';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import { USER_LIKED_LIST, USER_LIKED_LIST_MORE } from './constants';
import {
  userLikedListSuccess,
  userLikedListError,
  userLikedListMoreSuccess,
  userLikedListMoreError,
} from './actions';

export function* userLikedList({ options }) {
  try {
    const { entities, response, result } = yield call(
      userLikedListApi,
      options,
    );
    yield put(entitiesUpdate(entities));
    yield put(userLikedListSuccess({ ...response, rows: result }));
  } catch (error) {
    yield put(userLikedListError(error.message));
  }
}

export function* userLikedListMore({ options }) {
  try {
    const { entities, response, result } = yield call(
      userLikedListApi,
      options,
    );
    yield put(entitiesUpdate(entities));
    yield put(userLikedListMoreSuccess({ ...response, rows: result }));
  } catch (error) {
    yield put(userLikedListMoreError(error.message));
  }
}

export default function* likedArticlesSaga() {
  yield takeLatest(USER_LIKED_LIST, userLikedList);
  yield takeLatest(USER_LIKED_LIST_MORE, userLikedListMore);
}

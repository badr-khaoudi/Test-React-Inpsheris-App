import { takeLatest, call, put } from 'redux-saga/effects';
import {
  user as userApi,
  authorList as authorListApi,
  follow as followApi,
} from 'utils/api/MyProfileApi';
import { communityList as communityListApi } from 'utils/api/CommunityApi';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import {
  userSuccess,
  userError,
  communityListSuccess,
  communityListError,
  authorListSuccess,
  authorListError,
  followSuccess,
  followError,
} from './actions';
import { USER, COMMUNITY_LIST, AUTHOR_LIST, FOLLOW } from './constants';

export function* user({ options }) {
  try {
    const { entities, result } = yield call(userApi, options);
    yield put(entitiesUpdate(entities));
    yield put(userSuccess(result));
  } catch (error) {
    yield put(userError(error.message));
  }
}

export function* communityList({ options }) {
  try {
    const { entities, result } = yield call(communityListApi, options);
    yield put(entitiesUpdate(entities));
    yield put(communityListSuccess(result));
  } catch (error) {
    yield put(communityListError(error.message));
  }
}

export function* authorList({ options }) {
  try {
    const { entities, result } = yield call(authorListApi, options);
    yield put(entitiesUpdate(entities));
    yield put(authorListSuccess(result));
  } catch (error) {
    yield put(authorListError(error.message));
  }
}

export function* follow({ options }) {
  try {
    const { data } = yield call(followApi, options);
    yield put(followSuccess(options, data));
  } catch (error) {
    yield put(followError(error.message));
  }
}

export default function* myProfileSaga() {
  yield takeLatest(USER, user);
  yield takeLatest(COMMUNITY_LIST, communityList);
  yield takeLatest(AUTHOR_LIST, authorList);
  yield takeLatest(FOLLOW, follow);
}

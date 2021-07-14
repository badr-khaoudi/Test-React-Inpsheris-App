import { takeLatest, call, put } from 'redux-saga/effects';
import {
  community,
  like as likeApi,
  deleteLike as deleteLikeApi,
  follow as followApi,
} from 'utils/api/CommunityApi';
import { authorList } from 'utils/api/BrowseAllApi';
import { carouselList as carouselListApi } from 'utils/api/HomeApi';
import {
  entitiesUpdate,
  likeCommunity,
  deleteLikeCommunity,
  followCommunity,
  unfollowCommunity,
} from 'containers/GlobalEntities/actions';
import {
  COMMUNITY,
  LIKE,
  DELETE_LIKE,
  FOLLOW,
  UNFOLLOW,
  GET_AUTHOR_LIST,
  CAROUSEL_LIST,
} from './constants';
import {
  communitySuccess,
  communityError,
  likeSuccess,
  likeError,
  deleteLikeSuccess,
  deleteLikeError,
  followSuccess,
  followError,
  unfollowSuccess,
  unfollowError,
  getAuthorListSuccess,
  getAuthorListError,
  carouselListSuccess,
  carouselListError,
} from './actions';

export function* getCommunity({ options }) {
  try {
    const { entities, result } = yield call(community, options);
    yield put(entitiesUpdate(entities));
    yield put(communitySuccess(result));
  } catch (error) {
    yield put(communityError(error.message));
  }
}

export function* like({ options }) {
  try {
    yield call(likeApi, options);
    yield put(likeCommunity(options));
    yield put(likeSuccess());
  } catch (error) {
    yield put(likeError(error.message));
  }
}

export function* deleteLike({ options }) {
  try {
    yield call(deleteLikeApi, options);
    yield put(deleteLikeCommunity(options));
    yield put(deleteLikeSuccess());
  } catch (error) {
    yield put(deleteLikeError(error.message));
  }
}

export function* follow({ options }) {
  try {
    yield call(followApi, options);
    yield put(followCommunity(options));
    yield put(followSuccess());
  } catch (error) {
    yield put(followError(error.message));
  }
}

export function* unfollow({ options }) {
  try {
    yield call(followApi, options);
    yield put(unfollowCommunity(options));
    yield put(unfollowSuccess());
  } catch (error) {
    yield put(unfollowError(error.message));
  }
}

export function* getAuthorList({ options }) {
  try {
    const { entities, result } = yield call(authorList, options);
    yield put(entitiesUpdate(entities));
    yield put(getAuthorListSuccess(result));
  } catch (error) {
    yield put(getAuthorListError(error.message));
  }
}

export function* carouselList({ options }) {
  try {
    const { data } = yield call(carouselListApi, options);
    yield put(carouselListSuccess(data));
  } catch (error) {
    yield put(carouselListError(error.message));
  }
}

export default function* communityHomeSaga() {
  yield takeLatest(COMMUNITY, getCommunity);
  yield takeLatest(LIKE, like);
  yield takeLatest(DELETE_LIKE, deleteLike);
  yield takeLatest(FOLLOW, follow);
  yield takeLatest(UNFOLLOW, unfollow);
  yield takeLatest(GET_AUTHOR_LIST, getAuthorList);
  yield takeLatest(CAROUSEL_LIST, carouselList);
}

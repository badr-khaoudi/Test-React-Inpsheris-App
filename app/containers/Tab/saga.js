import { takeLatest, call, put } from 'redux-saga/effects';

import {
  GET_COMMUNITY_LIST,
  GET_COMMUNITY_TAB,
  GET_COMMUNITY_TAB_MORE,
} from './constants';
import {
  getCommunityListSuccess,
  getCommunityListError,
  getCommunityTabSuccess,
  getCommunityTabError,
  getCommunityTabMoreSuccess,
  getCommunityTabMoreError,
} from './actions';
import { communityList, communityTab } from '../../utils/api/CommunityApi';

export function* getCommunityList({ options }) {
  try {
    const { data } = yield call(communityList, options);
    yield put(getCommunityListSuccess(data));
  } catch (error) {
    yield put(getCommunityListError(error.message));
  }
}

export function* getCommunityTab({ options }) {
  try {
    const { data } = yield call(communityTab, options);
    yield put(getCommunityTabSuccess(data));
  } catch (error) {
    yield put(getCommunityTabError(error.message));
  }
}

export function* getCommunityTabMore({ options }) {
  try {
    const { data } = yield call(communityTab, options);
    yield put(getCommunityTabMoreSuccess(data));
  } catch (error) {
    yield put(getCommunityTabMoreError(error.message));
  }
}

export default function* tabSaga() {
  yield takeLatest(GET_COMMUNITY_LIST, getCommunityList);
  yield takeLatest(GET_COMMUNITY_TAB, getCommunityTab);
  yield takeLatest(GET_COMMUNITY_TAB_MORE, getCommunityTabMore);
}

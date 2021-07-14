import { takeLatest, call, put, debounce } from 'redux-saga/effects';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import {
  communityList,
  communityGroupList,
  requestedCommunity as requestedCommunityApi,
} from 'utils/api/CommunityApi';
import {
  GET_COMMUNITY_LIST,
  GET_COMMUNITY_GROUP_LIST,
  FILTER_COMMUNITY_LIST,
  REQUESTED_COMMUNITY,
} from './constants';
import {
  getCommunityListSuccess,
  getCommunityListError,
  getCommunityGroupListSuccess,
  getCommunityGroupListError,
  requestedCommunitySuccess,
  requestedCommunityError,
} from './actions';

export function* getCommunityList({ options }) {
  try {
    const { entities, result } = yield call(communityList, options);
    yield put(entitiesUpdate(entities));
    yield put(getCommunityListSuccess(result));
  } catch (error) {
    yield put(getCommunityListError(error.message));
  }
}

export function* getCommunityGroupList({ options }) {
  try {
    const { data } = yield call(communityGroupList, options);
    yield put(getCommunityGroupListSuccess(data));
  } catch (error) {
    yield put(getCommunityGroupListError(error.message));
  }
}

export function* filterCommunityList({ options }) {
  try {
    const { entities, result } = yield call(communityList, options);
    yield put(entitiesUpdate(entities));
    yield put(getCommunityListSuccess(result));
  } catch (error) {
    yield put(getCommunityListError(error.message));
  }
}

export function* requestedCommunity({ options }) {
  try {
    yield call(requestedCommunityApi, options);
    yield put(requestedCommunitySuccess());
  } catch (error) {
    yield put(requestedCommunityError(error.message));
  }
}

export default function* communitySaga() {
  yield takeLatest(GET_COMMUNITY_LIST, getCommunityList);
  yield takeLatest(GET_COMMUNITY_GROUP_LIST, getCommunityGroupList);
  yield debounce(1000, FILTER_COMMUNITY_LIST, filterCommunityList);
  yield takeLatest(REQUESTED_COMMUNITY, requestedCommunity);
}

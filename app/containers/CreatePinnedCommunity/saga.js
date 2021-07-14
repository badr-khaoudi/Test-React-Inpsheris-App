import { takeLatest, call, put } from 'redux-saga/effects';
import {
  getPinnedCommunityById,
  createPinnedCommunity,
} from '../../utils/api/PinnedApi';
import { getPinnedCommunityList } from '../HomePage/actions';
import {
  getPinnedCommunityError,
  getPinnedCommunitySuccess,
  updatePinnedCommunityError,
  updatePinnedCommunitySuccess,
} from './actions';

import { GET_PINNED_COMMUNITY, UPDATE_PINNED_COMMUNITY } from './constants';

export function* getPinnedCommunityDetail({ id, cancelToken }) {
  try {
    const { data } = yield call(getPinnedCommunityById, { id }, cancelToken);
    yield put(getPinnedCommunitySuccess(data));
  } catch (error) {
    yield put(getPinnedCommunityError(error.message));
  }
}

export function* updatePinnedCommunity({ payload, cancelToken }) {
  try {
    const { data } = yield call(createPinnedCommunity, payload, cancelToken);
    yield put(updatePinnedCommunitySuccess(data));
    yield put(getPinnedCommunityList());
  } catch (error) {
    yield put(updatePinnedCommunityError(error.message));
  }
}

export default function* createPinnedCommunitySaga() {
  yield takeLatest(GET_PINNED_COMMUNITY, getPinnedCommunityDetail);
  yield takeLatest(UPDATE_PINNED_COMMUNITY, updatePinnedCommunity);
}

import { takeLatest, call, put } from 'redux-saga/effects';
import {
  countContentCreatedByCommunity as countContentCreatedByCommunityApi,
  countContentCreatedByCommunityTable as countContentCreatedByCommunityTableApi,
  analyzeContentViewedByCommunity as analyzeContentViewedByCommunityApi,
  analyzeContentViewedByCommunityTable as analyzeContentViewedByCommunityTableApi,
  viewActivityCommunity as viewActivityCommunityApi,
} from 'utils/api/StatisticsApi';
import {
  COUNT_CONTENT_CREATED_BY_COMMUNITY,
  COUNT_CONTENT_CREATED_BY_COMMUNITY_TABLE,
  ANALYZE_CONTENT_VIEWED_BY_COMMUNITY,
  ANALYZE_CONTENT_VIEWED_BY_COMMUNITY_TABLE,
  VIEW_ACTIVITY_COMMUNITY,
} from './constants';
import {
  countContentCreatedByCommunitySuccess,
  countContentCreatedByCommunityTableSuccess,
  analyzeContentViewedByCommunitySuccess,
  analyzeContentViewedByCommunityTableSuccess,
  viewActivityCommunitySuccess,
  communityStatisticsError,
} from './actions';

export function* countContentCreatedByCommunity({ options, cancelToken }) {
  try {
    const { data } = yield call(
      countContentCreatedByCommunityApi,
      options,
      cancelToken,
    );
    yield put(countContentCreatedByCommunitySuccess(data));
  } catch (error) {
    yield put(communityStatisticsError(error.message));
  }
}

export function* countContentCreatedByCommunityTable({ options, cancelToken }) {
  try {
    const { data } = yield call(
      countContentCreatedByCommunityTableApi,
      options,
      cancelToken,
    );
    yield put(countContentCreatedByCommunityTableSuccess(data));
  } catch (error) {
    yield put(communityStatisticsError(error.message));
  }
}

export function* analyzeContentViewedByCommunity({ options, cancelToken }) {
  try {
    const { data } = yield call(
      analyzeContentViewedByCommunityApi,
      options,
      cancelToken,
    );
    yield put(analyzeContentViewedByCommunitySuccess(data));
  } catch (error) {
    yield put(communityStatisticsError(error.message));
  }
}

export function* analyzeContentViewedByCommunityTable({
  options,
  cancelToken,
}) {
  try {
    const { data } = yield call(
      analyzeContentViewedByCommunityTableApi,
      options,
      cancelToken,
    );
    yield put(analyzeContentViewedByCommunityTableSuccess(data));
  } catch (error) {
    yield put(communityStatisticsError(error.message));
  }
}

export function* viewActivityCommunity({ options, cancelToken }) {
  try {
    const { data } = yield call(viewActivityCommunityApi, options, cancelToken);
    yield put(viewActivityCommunitySuccess(data));
  } catch (error) {
    yield put(communityStatisticsError(error.message));
  }
}

export default function* communityStatisticsSaga() {
  yield takeLatest(
    COUNT_CONTENT_CREATED_BY_COMMUNITY,
    countContentCreatedByCommunity,
  );
  yield takeLatest(
    COUNT_CONTENT_CREATED_BY_COMMUNITY_TABLE,
    countContentCreatedByCommunityTable,
  );
  yield takeLatest(
    ANALYZE_CONTENT_VIEWED_BY_COMMUNITY,
    analyzeContentViewedByCommunity,
  );
  yield takeLatest(
    ANALYZE_CONTENT_VIEWED_BY_COMMUNITY_TABLE,
    analyzeContentViewedByCommunityTable,
  );
  yield takeLatest(VIEW_ACTIVITY_COMMUNITY, viewActivityCommunity);
}

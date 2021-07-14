import { takeLatest, call, put } from 'redux-saga/effects';
import { countCommunityMemberConnection as countCommunityMemberConnectionApi } from 'utils/api/StatisticsApi';
import { COUNT_COMMUNITY_MEMBER_CONNECTION } from './constants';
import {
  countCommunityMemberConnectionSuccess,
  countCommunityMemberConnectionError,
} from './actions';

export function* countCommunityMemberConnection({ options, cancelToken }) {
  try {
    const { data } = yield call(
      countCommunityMemberConnectionApi,
      options,
      cancelToken,
    );
    yield put(countCommunityMemberConnectionSuccess(data));
  } catch (error) {
    yield put(countCommunityMemberConnectionError(error.message));
  }
}

export default function* sessionsByOriginSaga() {
  yield takeLatest(
    COUNT_COMMUNITY_MEMBER_CONNECTION,
    countCommunityMemberConnection,
  );
}

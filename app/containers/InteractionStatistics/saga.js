import { takeLatest, call, put } from 'redux-saga/effects';
import { listCommentLike as listCommentLikeApi } from 'utils/api/StatisticsApi';
import { LIST_COMMENT_LIKE } from './constants';
import { listCommentLikeSuccess, listCommentLikeError } from './actions';

export function* listCommentLike({ options, cancelToken }) {
  try {
    const { data } = yield call(listCommentLikeApi, options, cancelToken);
    yield put(listCommentLikeSuccess(data));
  } catch (error) {
    yield put(listCommentLikeError(error.message));
  }
}

export default function* interactionStatisticsSaga() {
  yield takeLatest(LIST_COMMENT_LIKE, listCommentLike);
}

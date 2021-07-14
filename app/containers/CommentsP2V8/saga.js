import { takeLatest, call, put } from 'redux-saga/effects';
import { commentList } from 'utils/api/CommentApi';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import { COMMENTS } from './constants';
import { commentsSuccess, commentsError } from './actions';

export function* comments({ options }) {
  try {
    const { entities, result } = yield call(commentList, options);
    yield put(commentsSuccess(options));
    yield put(
      entitiesUpdate({
        ...entities,
        feed: {
          [options.content || options.followerQuickpostUid]: {
            comments: result,
          },
        },
      }),
    );
  } catch (error) {
    yield put(commentsError(error.message));
  }
}

export default function* commentsP2V8Saga() {
  yield takeLatest(COMMENTS, comments);
}

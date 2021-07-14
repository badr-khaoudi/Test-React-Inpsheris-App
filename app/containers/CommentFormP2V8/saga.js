import { takeLatest, call, put, select } from 'redux-saga/effects';
import { comment as commentApi } from 'utils/api/CommentApi';
import {
  entitiesUpdate,
  entitiesReplace,
} from 'containers/GlobalEntities/actions';
import { makeSelectFeed } from 'containers/GlobalEntities/selectors';
import { commentSuccess, commentError } from './actions';
import { COMMENT, COMMENT_EDIT } from './constants';

export function* comment({ options }) {
  try {
    const { entities, result } = yield call(commentApi, options);
    const feed = yield select(
      makeSelectFeed(options.content || options.followerQuickpostUid),
    );
    yield put(
      entitiesUpdate({
        ...entities,
        feed: {
          [options.content || options.followerQuickpostUid]: {
            commentCount: feed.commentCount + 1,
            comments: [result, ...feed.comments],
          },
        },
      }),
    );
    yield put(commentSuccess());
  } catch (error) {
    yield put(commentError(error.message));
  }
}

export function* commentEdit({ options }) {
  try {
    const {
      entities: { comments },
    } = yield call(commentApi, options);
    yield put(
      entitiesReplace(
        'comments',
        options.commentUid,
        comments[options.commentUid],
      ),
    );
    yield put(commentSuccess());
  } catch (error) {
    yield put(commentError(error.message));
  }
}

export default function* commentFormP2V8Saga() {
  yield takeLatest(COMMENT, comment);
  yield takeLatest(COMMENT_EDIT, commentEdit);
}

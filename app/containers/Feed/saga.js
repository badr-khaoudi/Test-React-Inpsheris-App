import { takeLatest, call, put } from 'redux-saga/effects';
import { contentDetails } from 'utils/api/HomeFeedApi';
import { commentList } from 'utils/api/CommentApi';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import {
  translateContentSuccess,
  translateContentError,
  commentListSuccess,
  commentListError,
} from './actions';
import { TRANSLATE_CONTENT, COMMENT_LIST } from './constants';

// const isCustomTab = window.parent !== window.self;

export function* getContentDetails({ options }) {
  try {
    const { data } = yield call(contentDetails, options);
    yield put(translateContentSuccess(data));
  } catch (error) {
    yield put(translateContentError(error.message));
  }
}

export function* getCommentList({ options }) {
  try {
    const { entities, result } = yield call(commentList, options);
    yield put(commentListSuccess());
    yield put(
      entitiesUpdate({
        ...entities,
        feed: { [options.content]: { comments: result } },
      }),
    );
  } catch (error) {
    yield put(commentListError(error.message));
  }
}

export default function* feedSaga() {
  yield takeLatest(TRANSLATE_CONTENT, getContentDetails);
  yield takeLatest(COMMENT_LIST, getCommentList);
}

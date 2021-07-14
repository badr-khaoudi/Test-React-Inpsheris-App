import { takeLatest, call, put } from 'redux-saga/effects';
import { commentList } from 'utils/api/CommentApi';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import { VIEW_MORE } from './constants';
import { viewMoreSuccess, viewMoreError } from './actions';

export function* viewMore({ options }) {
  try {
    const { entities, result } = yield call(commentList, options);
    yield put(viewMoreSuccess());
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
    yield put(viewMoreError(error.message));
  }
}

export default function* commentSaga() {
  yield takeLatest(VIEW_MORE, viewMore);
}

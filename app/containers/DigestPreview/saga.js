import { takeLatest, call, put } from 'redux-saga/effects';
import { digestContent as digestContentApi } from 'utils/api/DigestApi';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import { digestEntitiesUpdate } from 'containers/Digest/actions';
import { DIGEST_CONTENT } from './constants';
import { digestContentSuccess, digestContentError } from './actions';

export function* digestContent({ options }) {
  try {
    const {
      entities: { digest, ...rest },
      result,
    } = yield call(digestContentApi, options);
    yield put(entitiesUpdate(rest));
    yield put(digestEntitiesUpdate(digest));
    yield put(digestContentSuccess(result));
  } catch (error) {
    yield put(digestContentError(error.message));
  }
}

export default function* digestPreviewSaga() {
  yield takeLatest(DIGEST_CONTENT, digestContent);
}

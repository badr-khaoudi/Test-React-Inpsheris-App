import { takeLatest, call, put } from 'redux-saga/effects';
import { userDigestList } from 'utils/api/DigestApi';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import { digestEntitiesUpdate } from 'containers/Digest/actions';
import { DIGEST_LIST } from './constants';
import { digestListSuccess, digestListError } from './actions';

export function* digestList({ options }) {
  try {
    const {
      entities: { digest, ...rest },
      result,
    } = yield call(userDigestList, options);
    yield put(entitiesUpdate(rest));
    yield put(digestEntitiesUpdate(digest));
    yield put(digestListSuccess(result));
  } catch (error) {
    yield put(digestListError(error.message));
  }
}

export default function* digestListSaga() {
  yield takeLatest(DIGEST_LIST, digestList);
}

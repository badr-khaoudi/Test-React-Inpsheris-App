import { takeLatest, call, put } from 'redux-saga/effects';
import {
  templates as templatesApi,
  types as typesApi,
  repeat as repeatApi,
  contentTypes as contentTypesApi,
  digest as digestApi,
  digestContent as digestContentApi,
} from 'utils/api/DigestApi';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import { digestEntitiesUpdate, addDigest } from 'containers/Digest/actions';

import {
  TEMPLATES,
  TYPES,
  REPEAT,
  CONTENT_TYPES,
  CREATE_DIGEST,
  DIGEST_CONTENT,
} from './constants';
import {
  templatesSuccess,
  templatesError,
  typesSuccess,
  typesError,
  repeatSuccess,
  repeatError,
  contentTypesSuccess,
  contentTypesError,
  createDigestSuccess,
  createDigestError,
  digestContentSuccess,
  digestContentError,
} from './actions';

export function* templates() {
  try {
    const { data } = yield call(templatesApi);
    yield put(templatesSuccess(data));
  } catch (error) {
    yield put(templatesError(error.message));
  }
}

export function* types() {
  try {
    const { data } = yield call(typesApi);
    yield put(typesSuccess(data));
  } catch (error) {
    yield put(typesError(error.message));
  }
}

export function* repeat() {
  try {
    const { data } = yield call(repeatApi);
    yield put(repeatSuccess(data));
  } catch (error) {
    yield put(repeatError(error.message));
  }
}

export function* contentTypes() {
  try {
    const { data } = yield call(contentTypesApi);
    yield put(contentTypesSuccess(data));
  } catch (error) {
    yield put(contentTypesError(error.message));
  }
}

export function* createDigest({ options }) {
  try {
    const {
      entities: { digest, ...rest },
      result,
    } = yield call(digestApi, options);
    yield put(entitiesUpdate(rest));
    yield put(digestEntitiesUpdate(digest));
    yield put(addDigest(result));
    yield put(createDigestSuccess());
  } catch (error) {
    yield put(createDigestError(error.message));
  }
}

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

export default function* createDigestSaga() {
  yield takeLatest(TEMPLATES, templates);
  yield takeLatest(TYPES, types);
  yield takeLatest(REPEAT, repeat);
  yield takeLatest(CONTENT_TYPES, contentTypes);
  yield takeLatest(CREATE_DIGEST, createDigest);
  yield takeLatest(DIGEST_CONTENT, digestContent);
}

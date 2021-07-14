import { takeLatest, call, put, select } from 'redux-saga/effects';
import _ from 'lodash';
import {
  digestList as digestListApi,
  activateDigest as activateDigestApi,
  deleteDigest as deleteDigestApi,
} from 'utils/api/DigestApi';
import {
  carouselList as carouselListApi,
  pinnedContent as pinnedContentApi,
} from 'utils/api/HomeApi';
import {
  makeSelectCarouselList,
  makeSelectPinnedContent,
} from 'containers/HomePage/selectors';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import {
  DIGEST_LIST,
  ACTIVATE_DIGEST,
  CAROUSEL_LIST,
  PINNED_CONTENT,
  DELETE_DIGEST,
} from './constants';
import {
  digestListSuccess,
  digestListError,
  activateDigestSuccess,
  activateDigestError,
  carouselListSuccess,
  carouselListError,
  pinnedContentSuccess,
  pinnedContentError,
  deleteDigestSuccess,
  deleteDigestError,
} from './actions';

export function* digestList({ options }) {
  try {
    const {
      response,
      entities: { digest, ...rest },
      result,
    } = yield call(digestListApi, options);
    yield put(entitiesUpdate(rest));
    yield put(digestListSuccess(digest, { ...response, rows: result }));
  } catch (error) {
    yield put(digestListError(error.message));
  }
}

export function* activateDigest({ params, options }) {
  try {
    yield call(activateDigestApi, params, options);
    yield put(activateDigestSuccess(params, options));
  } catch (error) {
    yield put(activateDigestError(error.message));
  }
}

export function* carouselList() {
  try {
    const list = yield select(makeSelectCarouselList());
    if (_.isEmpty(list)) {
      const { data } = yield call(carouselListApi);
      yield put(carouselListSuccess(data));
    } else {
      yield put(carouselListSuccess(list));
    }
  } catch (error) {
    yield put(carouselListError(error.message));
  }
}

export function* pinnedContent({ options }) {
  try {
    const contentUids = yield select(makeSelectPinnedContent());
    if (_.isEmpty(contentUids)) {
      const { entities, result } = yield call(pinnedContentApi, options);
      yield put(entitiesUpdate(entities));
      yield put(pinnedContentSuccess(result));
    } else {
      yield put(pinnedContentSuccess(contentUids));
    }
  } catch (error) {
    yield put(pinnedContentError(error));
  }
}

export function* deleteDigest({ options }) {
  try {
    yield call(deleteDigestApi, options);
    yield put(deleteDigestSuccess(options));
  } catch (error) {
    yield put(deleteDigestError(error.message));
  }
}

export default function* digestSaga() {
  yield takeLatest(DIGEST_LIST, digestList);
  yield takeLatest(ACTIVATE_DIGEST, activateDigest);
  yield takeLatest(CAROUSEL_LIST, carouselList);
  yield takeLatest(PINNED_CONTENT, pinnedContent);
  yield takeLatest(DELETE_DIGEST, deleteDigest);
}

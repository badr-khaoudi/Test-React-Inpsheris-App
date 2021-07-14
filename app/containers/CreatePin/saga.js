import { takeLatest, call, put, debounce } from 'redux-saga/effects';
import {
  uploadFile as uploadFileApi,
  externalSource,
  oEmbed,
} from 'utils/api/AuthApi';
import {
  createPinnedPost as createPinnedPostApi,
  editPinnedPost as editPinnedPostApi,
  pinnedPostType as pinnedPostTypeApi,
} from 'utils/api/MyProfileApi';
import {
  PINNED_POST_TYPE,
  UPLOAD_FILE,
  CREATE_PINNED_POST,
  EDIT_PINNED_POST,
  GET_EMBED_URL,
  GET_OEMBED,
} from './constants';
import {
  pinnedPostTypeSuccess,
  pinnedPostTypeError,
  uploadFileSuccess,
  uploadFileError,
  createPinnedPostSuccess,
  createPinnedPostError,
  editPinnedPostSuccess,
  editPinnedPostError,
  getEmbedUrlSuccess,
  getEmbedUrlError,
  getOEmbedSuccess,
  getOEmbedError,
} from './actions';

export function* pinnedPostType() {
  try {
    const { data } = yield call(pinnedPostTypeApi);
    yield put(pinnedPostTypeSuccess(data));
  } catch (error) {
    yield put(pinnedPostTypeError(error.message));
  }
}

export function* uploadFile({ formData }) {
  try {
    const { data } = yield call(uploadFileApi, formData);
    yield put(uploadFileSuccess(data));
  } catch (error) {
    yield put(uploadFileError(error.message));
  }
}

export function* createPinnedPost({ options }) {
  try {
    const { data } = yield call(createPinnedPostApi, options);
    yield put(createPinnedPostSuccess(data));
  } catch (error) {
    yield put(createPinnedPostError(error.message));
  }
}

export function* editPinnedPost({ options }) {
  try {
    const { data } = yield call(editPinnedPostApi, options);
    yield put(editPinnedPostSuccess(data));
  } catch (error) {
    yield put(editPinnedPostError(error.message));
  }
}

export function* getEmbedUrl({ options }) {
  try {
    const { data } = yield call(externalSource, options);
    yield put(getEmbedUrlSuccess(data));
  } catch (error) {
    yield put(getEmbedUrlError(error.message));
  }
}

export function* getOEmbed({ options }) {
  try {
    const { data } = yield call(oEmbed, options);
    yield put(getOEmbedSuccess(data));
  } catch (error) {
    const {
      response: { data },
    } = error;
    yield put(getOEmbedError(data.error_message));
  }
}

export default function* createPinSaga() {
  yield takeLatest(PINNED_POST_TYPE, pinnedPostType);
  yield takeLatest(UPLOAD_FILE, uploadFile);
  yield takeLatest(CREATE_PINNED_POST, createPinnedPost);
  yield takeLatest(EDIT_PINNED_POST, editPinnedPost);
  yield takeLatest(GET_EMBED_URL, getEmbedUrl);
  yield debounce(1000, GET_OEMBED, getOEmbed);
}

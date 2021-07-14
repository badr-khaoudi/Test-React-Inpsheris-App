import { takeLatest, call, put, debounce } from 'redux-saga/effects';

import { GET_EMBED_URL, GET_OEMBED } from './constants';
import {
  getEmbedUrlSuccess,
  getEmbedUrlError,
  getOEmbedSuccess,
  getOEmbedError,
} from './actions';
import { externalSource, oEmbed } from '../../utils/api/AuthApi';

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

export default function* videoUrlSaga() {
  yield takeLatest(GET_EMBED_URL, getEmbedUrl);
  yield debounce(1000, GET_OEMBED, getOEmbed);
}

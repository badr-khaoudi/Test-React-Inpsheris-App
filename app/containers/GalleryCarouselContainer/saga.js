import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';

import { GET_MEDIA_MANAGER_LIST, GET_ALL_IMAGES_AS_ZIP } from './constants';

import {
  getMediaManagerListSuccess,
  getMediaManagerListError,
  getAllImagesAsZipSuccess,
  getAllImagesAsZipError,
} from './actions';

import {
  getMediaManagerList,
  downloadAllAsZip as getAllImagesAsZipApi,
} from '../../utils/api/GalleryCarouselApi';

export function* getMediaManager({ options }) {
  try {
    const { data } = yield call(getMediaManagerList, options);
    yield put(getMediaManagerListSuccess(data));
  } catch (error) {
    yield put(getMediaManagerListError(error.message));
  }
}

export function* getAllImagesAsZip({ options }) {
  try {
    const { data } = yield call(getAllImagesAsZipApi, options);
    yield put(getAllImagesAsZipSuccess(data));
  } catch (error) {
    yield put(getAllImagesAsZipError(error.message));
  }
}

// Individual exports for testing
export default function* galleryCarouselContainerSaga() {
  yield takeEvery(GET_MEDIA_MANAGER_LIST, getMediaManager);
  yield takeLatest(GET_ALL_IMAGES_AS_ZIP, getAllImagesAsZip);
}

import { takeEvery, takeLatest, call, put } from 'redux-saga/effects';
import {
  createCarousel as createCarouselApi,
  carousel as carouselApi,
} from 'utils/api/CarouselManagerApi';
import { uploadFile as uploadFileApi } from 'utils/api/AuthApi';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import {
  carouselEntitiesUpdate,
  addCarousel,
} from 'containers/CarouselManager/actions';
import { UPLOAD_FILE, CREATE_CAROUSEL, CAROUSEL_CONTENT } from './constants';
import {
  uploadFileSuccess,
  uploadFileError,
  createCarouselSuccess,
  createCarouselError,
  carouselContentSuccess,
  carouselContentError,
} from './actions';

export function* uploadFile({ field, formData }) {
  try {
    const { data } = yield call(uploadFileApi, formData);
    yield put(uploadFileSuccess(field, data));
  } catch (error) {
    yield put(uploadFileError(error.message));
  }
}

export function* createCarousel({ options }) {
  try {
    const {
      entities: { carousel, ...rest },
      result,
    } = yield call(createCarouselApi, options);
    yield put(entitiesUpdate(rest));
    yield put(carouselEntitiesUpdate(carousel));
    yield put(addCarousel(result));
    yield put(createCarouselSuccess());
  } catch (error) {
    yield put(createCarouselError(error.message));
  }
}

export function* carouselContent({ options }) {
  try {
    const {
      entities: { digest, ...rest },
      result,
    } = yield call(carouselApi, options);
    yield put(entitiesUpdate(rest));
    yield put(carouselEntitiesUpdate(digest));
    yield put(carouselContentSuccess(result));
  } catch (error) {
    yield put(carouselContentError(error.message));
  }
}

export default function* createCarouselSaga() {
  yield takeEvery(UPLOAD_FILE, uploadFile);
  yield takeLatest(CREATE_CAROUSEL, createCarousel);
  yield takeLatest(CAROUSEL_CONTENT, carouselContent);
}

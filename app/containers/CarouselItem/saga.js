import { takeLatest, call, put } from 'redux-saga/effects';
import {
  publishCarousel as publishCarouselApi,
  deleteCarousel as deleteCarouselApi,
} from 'utils/api/CarouselManagerApi';
import {
  carouselEntitiesUpdate,
  deleteCarousel as deleteCarouselAction,
} from 'containers/CarouselManager/actions';
import {
  publishCarouselSuccess,
  publishCarouselError,
  deleteCarouselSuccess,
  deleteCarouselError,
} from './actions';
import { PUBLISH_CAROUSEL, DELETE_CAROUSEL } from './constants';

export function* publishCarousel({ options }) {
  try {
    yield call(publishCarouselApi, options);
    yield put(carouselEntitiesUpdate(options));
    yield put(publishCarouselSuccess());
  } catch (error) {
    yield put(publishCarouselError(error.message));
  }
}

export function* deleteCarousel({ options }) {
  try {
    yield call(deleteCarouselApi, options);
    yield put(deleteCarouselAction(options));
    yield put(deleteCarouselSuccess());
  } catch (error) {
    yield put(deleteCarouselError(error.message));
  }
}

export default function* carouselItemSaga() {
  yield takeLatest(PUBLISH_CAROUSEL, publishCarousel);
  yield takeLatest(DELETE_CAROUSEL, deleteCarousel);
}

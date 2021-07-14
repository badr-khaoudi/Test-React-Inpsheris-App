import { takeLatest, call, put } from 'redux-saga/effects';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import { carouselList as carouselListApi } from 'utils/api/CarouselManagerApi';
import { CAROUSEL_LIST, CAROUSEL_LIST_MORE } from './constants';
import {
  carouselListSuccess,
  carouselListError,
  carouselListMoreSuccess,
  carouselListMoreError,
} from './actions';

export function* carouselList({ options }) {
  try {
    const {
      entities: { carousel, ...rest },
      result,
    } = yield call(carouselListApi, options);
    yield put(entitiesUpdate(rest));
    yield put(carouselListSuccess(carousel, result));
  } catch (error) {
    yield put(carouselListError(error.message));
  }
}

export function* carouselListMore({ options }) {
  try {
    const {
      entities: { carousel, ...rest },
      result,
    } = yield call(carouselListApi, options);
    yield put(entitiesUpdate(rest));
    yield put(carouselListMoreSuccess(carousel, result));
  } catch (error) {
    yield put(carouselListMoreError(error.message));
  }
}

export default function* carouselManagerSaga() {
  yield takeLatest(CAROUSEL_LIST, carouselList);
  yield takeLatest(CAROUSEL_LIST_MORE, carouselListMore);
}

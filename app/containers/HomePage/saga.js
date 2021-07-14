import { takeLatest, call, put } from 'redux-saga/effects';

import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import {
  GET_CAROUSEL_LIST,
  GET_PINNED_CONTENT,
  GET_WIDGET_LIST,
  GET_PINNED_COMMUNITY_LIST,
  GET_CONTENT,
} from './constants';

import {
  getCarouselListSuccess,
  getCarouselListError,
  getPinnedContentSuccess,
  getPinnedContentError,
  getWidgetListSuccess,
  getWidgetListError,
  getPinnedCommunityListSuccess,
  getPinnedCommunityListError,
  getContentSuccess,
  getContentError,
} from './actions';

import {
  carouselList,
  pinnedContent,
  widgetList,
  pinnedCommunityList,
  content,
} from '../../utils/api/HomeApi';

// Individual exports for testing

export function* getCarouselList() {
  try {
    const { data } = yield call(carouselList);
    yield put(getCarouselListSuccess(data));
  } catch (error) {
    yield put(getCarouselListError(error));
  }
}

export function* getPinnedContent({ options }) {
  try {
    const { entities, result } = yield call(pinnedContent, options);
    yield put(entitiesUpdate(entities));
    yield put(getPinnedContentSuccess(result));
  } catch (error) {
    yield put(getPinnedContentError(error));
  }
}

export function* getWidgetList() {
  try {
    const { entities, result } = yield call(widgetList);
    yield put(entitiesUpdate(entities));
    yield put(getWidgetListSuccess(result));
  } catch (error) {
    yield put(getWidgetListError(error));
  }
}

export function* getPinnedCommunityList() {
  try {
    const { data } = yield call(pinnedCommunityList);
    yield put(getPinnedCommunityListSuccess(data));
  } catch (error) {
    yield put(getPinnedCommunityListError(error));
  }
}

export function* getContent({ options }) {
  try {
    const { data } = yield call(content, options);
    yield put(getContentSuccess(data));
  } catch (error) {
    yield put(getContentError(error));
  }
}

export default function* homePageSaga() {
  yield takeLatest(GET_CAROUSEL_LIST, getCarouselList);
  yield takeLatest(GET_PINNED_CONTENT, getPinnedContent);
  yield takeLatest(GET_WIDGET_LIST, getWidgetList);
  yield takeLatest(GET_PINNED_COMMUNITY_LIST, getPinnedCommunityList);
  yield takeLatest(GET_CONTENT, getContent);
}

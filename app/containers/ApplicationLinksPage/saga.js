import { takeLatest, call, put } from 'redux-saga/effects';

import { GET_APPLICATION_LINKS } from './constants';

import {
  getApplicationLinksSuccess,
  getApplicationLinksError,
} from './actions';

import { applicationLinks as applicationLinksApi } from '../../utils/api/LinksApi';

export function* getApplicationLinks() {
  try {
    const applicationLinks = yield call(applicationLinksApi);
    yield put(getApplicationLinksSuccess(applicationLinks.data));
  } catch (error) {
    yield put(getApplicationLinksError(error));
  }
}

export default function* applicationLinksSaga() {
  yield takeLatest(GET_APPLICATION_LINKS, getApplicationLinks);
}

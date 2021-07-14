import { takeLatest, call, put } from 'redux-saga/effects';

import { GET_USEFUL_LINKS } from './constants';

import { getUsefulLinksSuccess, getUsefulLinksError } from './actions';

import { usefulLinks as usefulLinksApi } from '../../utils/api/LinksApi';

export function* getUsefulLinks() {
  try {
    const usefulLinks = yield call(usefulLinksApi);
    yield put(getUsefulLinksSuccess(usefulLinks.data));
  } catch (error) {
    yield put(getUsefulLinksError(error));
  }
}

export default function* usefulLinksSaga() {
  yield takeLatest(GET_USEFUL_LINKS, getUsefulLinks);
}

import { call, put, takeLatest } from 'redux-saga/effects';

import { GET_FOOTER_LINKS } from './constants';

import { getFooterLinksSuccess, getFooterLinksError } from './actions';

import { FooterLinks } from '../../utils/api/FooterApi';

export function* getFooterLinks() {
  try {
    const footerLinks = yield call(FooterLinks);
    yield put(getFooterLinksSuccess(footerLinks.data));
  } catch (error) {
    yield put(getFooterLinksError(error));
  }
}
export default function* footerSaga() {
  yield takeLatest(GET_FOOTER_LINKS, getFooterLinks);
}

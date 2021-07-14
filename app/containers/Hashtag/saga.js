import { takeLatest, call, put } from 'redux-saga/effects';
import { hashtagListing } from 'utils/api/AuthApi';
import { GET_HASHTAG_LISTING } from './constants';
import { getHashtagListingSuccess, getHashtagListingError } from './actions';

export function* getHashtagListing({ options }) {
  try {
    const { data } = yield call(hashtagListing, options);
    yield put(getHashtagListingSuccess(data));
  } catch (error) {
    yield put(getHashtagListingError(error.message));
  }
}
export default function* hashtagSaga() {
  yield takeLatest(GET_HASHTAG_LISTING, getHashtagListing);
}

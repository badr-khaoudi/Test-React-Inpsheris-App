import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_VIDEO_LISTING } from './constants';
import { getVideoListingSuccess, getVideoListingError } from './actions';
import { videoListing } from '../../utils/api/AuthApi';

export function* getVideoListing({ options }) {
  try {
    const { data } = yield call(videoListing, options);
    yield put(getVideoListingSuccess(data));
  } catch (error) {
    yield put(getVideoListingError(error.message));
  }
}

export default function* selectVideoSaga() {
  yield takeLatest(GET_VIDEO_LISTING, getVideoListing);
}

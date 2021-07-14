import { takeLatest, call, put } from 'redux-saga/effects';
import { cropImage as cropImageApi } from 'utils/api/AuthApi';
import { CROP_IMAGE } from './constants';
import { cropImageSuccess, cropImageError } from './actions';

export function* cropImage({ options }) {
  try {
    const { data } = yield call(cropImageApi, options);
    yield put(cropImageSuccess(data));
  } catch (error) {
    yield put(cropImageError(error.message));
  }
}

export default function* imageCropSaga() {
  yield takeLatest(CROP_IMAGE, cropImage);
}

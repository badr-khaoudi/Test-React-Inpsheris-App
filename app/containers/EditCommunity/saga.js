import { takeEvery, takeLatest, call, put } from 'redux-saga/effects';
import { changeImage as changeImageApi } from 'utils/api/CommunityApi';
import { uploadFile as uploadFileApi } from 'utils/api/AuthApi';
import {
  uploadFileSuccess,
  uploadFileError,
  changeImageSuccess,
  changeImageError,
} from './actions';
import { UPLOAD_FILE, CHANGE_IMAGE } from './constants';

export function* uploadFile({ field, formData }) {
  try {
    const { data } = yield call(uploadFileApi, formData);
    yield put(uploadFileSuccess(field, data));
  } catch (error) {
    yield put(uploadFileError(error.message));
  }
}

export function* changeImage({ params, options }) {
  try {
    yield call(changeImageApi, params, options);
    yield put(changeImageSuccess());
  } catch (error) {
    yield put(changeImageError(error.message));
  }
}

export default function* editCommunitySaga() {
  yield takeEvery(UPLOAD_FILE, uploadFile);
  yield takeLatest(CHANGE_IMAGE, changeImage);
}

import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import { uploadFile as uploadFileApi } from 'utils/api/AuthApi';
import { changePhoto as changePhotoApi } from 'utils/api/MyProfileApi';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';

import { UPLOAD_FILE, CHANGE_PHOTO } from './constants';
import {
  uploadFileSuccess,
  uploadFileError,
  changePhotoSuccess,
  changePhotoError,
} from './actions';

export function* uploadFile({ field, formData }) {
  try {
    const { data } = yield call(uploadFileApi, formData);
    yield put(uploadFileSuccess(field, data));
  } catch (error) {
    yield put(uploadFileError(error.message));
  }
}

export function* changePhoto({ options }) {
  try {
    const { entities } = yield call(changePhotoApi, options);
    yield put(entitiesUpdate(entities));
    yield put(changePhotoSuccess());
  } catch (error) {
    yield put(changePhotoError(error.message));
  }
}

export default function* editMyProfileSaga() {
  yield takeEvery(UPLOAD_FILE, uploadFile);
  yield takeLatest(CHANGE_PHOTO, changePhoto);
}

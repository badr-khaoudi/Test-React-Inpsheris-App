import { takeLatest, call, put } from 'redux-saga/effects';
import {
  GET_FILE_STACK,
  UPLOAD_FILE,
  SAVE_VIDEO_FILE_STACK,
} from './constants';
import {
  getFileStackSuccess,
  getFileStackError,
  uploadFileSuccess,
  uploadFileError,
  saveVideoFileStackSuccess,
  saveVideoFileStackError,
} from './actions';
import {
  externalSource,
  uploadFile as uploadFileApi,
  saveVideoFileStack as saveVideoFileStackApi,
} from '../../utils/api/AuthApi';

export function* getFileStack({ options }) {
  try {
    const { data } = yield call(externalSource, options);
    yield put(getFileStackSuccess(data));
  } catch (error) {
    yield put(getFileStackError(error.message));
  }
}

export function* uploadFile({ data: formData }) {
  try {
    const { data } = yield call(uploadFileApi, formData);
    yield put(uploadFileSuccess(data));
  } catch (error) {
    yield put(uploadFileError(error.message));
  }
}

export function* saveVideoFileStack({ options }) {
  try {
    const { data } = yield call(saveVideoFileStackApi, options);
    yield put(saveVideoFileStackSuccess(data));
  } catch (error) {
    yield put(saveVideoFileStackError(error.message));
  }
}
export default function* videoBlockSaga() {
  yield takeLatest(GET_FILE_STACK, getFileStack);
  yield takeLatest(UPLOAD_FILE, uploadFile);
  yield takeLatest(SAVE_VIDEO_FILE_STACK, saveVideoFileStack);
}

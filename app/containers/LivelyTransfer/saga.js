import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import {
  uploadFile as uploadFileApi,
  transferDocument as transferDocumentApi,
} from 'utils/api/AuthApi';
import {
  livelyTransferDocuments,
  updateLivelyTransferDocuments,
} from 'containers/AuthBase/actions';
import { UPLOAD_FILE, TRANSFER_DOCUMENT } from './constants';
import {
  uploadFileSuccess,
  uploadFileError,
  transferDocumentSuccess,
  transferDocumentError,
} from './actions';

export function* uploadFile({ file, formData, cancelToken }) {
  try {
    yield put(livelyTransferDocuments([{ ...file, cancelToken }]));
    const { data } = yield call(uploadFileApi, formData, {
      cancelToken: cancelToken.token,
    });
    yield put(uploadFileSuccess());
    yield put(updateLivelyTransferDocuments(file, data));
  } catch (error) {
    yield put(uploadFileError(error.message));
  }
}

export function* transferDocument({ options }) {
  try {
    yield call(transferDocumentApi, options);
    yield put(transferDocumentSuccess());
  } catch (error) {
    yield put(transferDocumentError(error.message));
  }
}

export default function* livelyTransferSaga() {
  yield takeEvery(UPLOAD_FILE, uploadFile);
  yield takeLatest(TRANSFER_DOCUMENT, transferDocument);
}

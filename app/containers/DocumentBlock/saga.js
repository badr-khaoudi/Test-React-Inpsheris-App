import { call, put, takeEvery } from 'redux-saga/effects';
import _ from 'lodash';
import { UPLOAD_FILE } from './constants';
import { uploadFileSuccess, uploadFileError } from './actions';
import { uploadFile as uploadFileApi } from '../../utils/api/AuthApi';

export function* uploadFile({
  id,
  tempUid = null,
  data: formData,
  config = {},
}) {
  try {
    const { data } = yield call(uploadFileApi, formData, config);
    yield put(uploadFileSuccess(id, { tempUid, ..._.head(data) }));
  } catch (error) {
    yield put(uploadFileError(error.message));
  }
}

export default function* documentBlockSaga() {
  yield takeEvery(UPLOAD_FILE, uploadFile);
}

import { takeLatest, call, put } from 'redux-saga/effects';

import { GET_FILE_DETAILS, EDIT_FILE_DETAILS } from './constants';
import {
  getFileDetailsSuccess,
  getFileDetailsError,
  editFileDetailsSuccess,
  editFileDetailsError,
} from './actions';
import {
  fileDetails,
  editFileDetails as editFileDetailsApi,
} from '../../utils/api/AuthApi';

export function* getFileDetails({ options }) {
  try {
    const { data } = yield call(fileDetails, options);
    yield put(getFileDetailsSuccess(data));
  } catch (error) {
    yield put(getFileDetailsError(error.message));
  }
}

export function* editFileDetails({ options }) {
  try {
    const { data } = yield call(editFileDetailsApi, options);
    yield put(editFileDetailsSuccess(data));
  } catch (error) {
    yield put(editFileDetailsError(error.message));
  }
}

// Individual exports for testing
export default function* fileDetailsSaga() {
  yield takeLatest(GET_FILE_DETAILS, getFileDetails);
  yield takeLatest(EDIT_FILE_DETAILS, editFileDetails);
}

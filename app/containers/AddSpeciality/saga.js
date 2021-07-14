import { takeLatest, call, put } from 'redux-saga/effects';
import { uploadFile as uploadFileApi } from 'utils/api/AuthApi';
import {
  addSpeciality as addSpecialityApi,
  editSpeciality as editSpecialityApi,
} from 'utils/api/MyProfileApi';
import {
  addProject,
  addExperience,
  editProject,
  editExperience,
} from 'containers/MyBoard/actions';
import { UPLOAD_FILE, ADD_SPECIALITY, EDIT_SPECIALITY } from './constants';
import {
  uploadFileSuccess,
  uploadFileError,
  addSpecialitySuccess,
  addSpecialityError,
  editSpecialitySuccess,
  editSpecialityError,
} from './actions';

export function* uploadFile({ formData }) {
  try {
    const { data } = yield call(uploadFileApi, formData);
    yield put(uploadFileSuccess(data));
  } catch (error) {
    yield put(uploadFileError(error.message));
  }
}

export function* addSpeciality({ key, options }) {
  try {
    const { data } = yield call(addSpecialityApi, options);
    if (key === 'projects') {
      yield put(addProject(data));
    }
    if (key === 'experiences') {
      yield put(addExperience(data));
    }
    yield put(addSpecialitySuccess());
  } catch (error) {
    yield put(addSpecialityError(error.message));
  }
}

export function* editSpeciality({ key, params, options }) {
  try {
    const { data } = yield call(editSpecialityApi, params, options);
    if (key === 'projects') {
      yield put(editProject(params, data));
    }
    if (key === 'experiences') {
      yield put(editExperience(params, data));
    }
    yield put(editSpecialitySuccess());
  } catch (error) {
    yield put(editSpecialityError(error.message));
  }
}

export default function* addSpecialitySaga() {
  yield takeLatest(UPLOAD_FILE, uploadFile);
  yield takeLatest(ADD_SPECIALITY, addSpeciality);
  yield takeLatest(EDIT_SPECIALITY, editSpeciality);
}

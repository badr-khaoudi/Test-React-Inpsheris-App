import { takeLatest, call, put } from 'redux-saga/effects';
import { deleteSpeciality, specialityList } from 'utils/api/MyProfileApi';
import {
  projectsSuccess,
  projectsError,
  projectsMoreSuccess,
  projectsMoreError,
  deleteProjectSuccess,
  deleteProjectError,
  experiencesSuccess,
  experiencesError,
  experiencesMoreSuccess,
  experiencesMoreError,
  deleteExperienceSuccess,
  deleteExperienceError,
} from './actions';
import {
  PROJECTS,
  PROJECTS_MORE,
  DELETE_PROJECT,
  EXPERIENCES,
  EXPERIENCES_MORE,
  DELETE_EXPERIENCE,
} from './constants';

export function* projects({ options }) {
  try {
    const { data } = yield call(specialityList, options);
    yield put(projectsSuccess(data));
  } catch (error) {
    yield put(projectsError(error.message));
  }
}

export function* projectsMore({ options }) {
  try {
    const { data } = yield call(specialityList, options);
    yield put(projectsMoreSuccess(data));
  } catch (error) {
    yield put(projectsMoreError(error.message));
  }
}

export function* deleteProject({ options }) {
  try {
    yield call(deleteSpeciality, options);
    yield put(deleteProjectSuccess(options));
  } catch (error) {
    yield put(deleteProjectError(error.message));
  }
}

export function* experiences({ options }) {
  try {
    const { data } = yield call(specialityList, options);
    yield put(experiencesSuccess(data));
  } catch (error) {
    yield put(experiencesError(error.message));
  }
}

export function* experiencesMore({ options }) {
  try {
    const { data } = yield call(specialityList, options);
    yield put(experiencesMoreSuccess(data));
  } catch (error) {
    yield put(experiencesMoreError(error.message));
  }
}

export function* deleteExperience({ options }) {
  try {
    yield call(deleteSpeciality, options);
    yield put(deleteExperienceSuccess(options));
  } catch (error) {
    yield put(deleteExperienceError(error.message));
  }
}

export default function* myBoardSaga() {
  yield takeLatest(PROJECTS, projects);
  yield takeLatest(PROJECTS_MORE, projectsMore);
  yield takeLatest(DELETE_PROJECT, deleteProject);
  yield takeLatest(EXPERIENCES, experiences);
  yield takeLatest(EXPERIENCES_MORE, experiencesMore);
  yield takeLatest(DELETE_EXPERIENCE, deleteExperience);
}

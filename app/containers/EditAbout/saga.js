import { takeLatest, call, put } from 'redux-saga/effects';
import {
  customFieldList as customFieldListApi,
  editUser as editUserApi,
} from 'utils/api/MyProfileApi';
import { filterList, hobbyList as hobbyListApi } from 'utils/api/DirectoryApi';
import { userList } from 'utils/api/AuthApi';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import {
  customFieldListSuccess,
  customFieldListError,
  serviceFilterListSuccess,
  serviceFilterListError,
  hobbyListSuccess,
  hobbyListError,
  employeeListSuccess,
  employeeListError,
  editUserSuccess,
  editUserError,
} from './actions';
import {
  CUSTOM_FIELD_LIST,
  SERVICE_FILTER_LIST,
  HOBBY_LIST,
  EMPLOYEE_LIST,
  EDIT_USER,
} from './constants';

export function* customFieldList({ options }) {
  try {
    const { data } = yield call(customFieldListApi, options);
    yield put(customFieldListSuccess(data));
  } catch (error) {
    yield put(customFieldListError(error.message));
  }
}

export function* serviceFilterList({ options }) {
  try {
    const { data } = yield call(filterList, options);
    yield put(serviceFilterListSuccess(data));
  } catch (error) {
    yield put(serviceFilterListError(error.message));
  }
}

export function* hobbyList({ options }) {
  try {
    const { data } = yield call(hobbyListApi, options);
    yield put(hobbyListSuccess(data));
  } catch (error) {
    yield put(hobbyListError(error.message));
  }
}

export function* employeeList({ options }) {
  try {
    const { data } = yield call(userList, options);
    yield put(employeeListSuccess(data));
  } catch (error) {
    yield put(employeeListError(error.message));
  }
}

export function* editUser({ options }) {
  try {
    const { entities } = yield call(editUserApi, options);
    yield put(entitiesUpdate(entities));
    yield put(editUserSuccess());
  } catch (error) {
    yield put(editUserError(error.message));
  }
}

export default function* editAboutSaga() {
  yield takeLatest(CUSTOM_FIELD_LIST, customFieldList);
  yield takeLatest(SERVICE_FILTER_LIST, serviceFilterList);
  yield takeLatest(HOBBY_LIST, hobbyList);
  yield takeLatest(EMPLOYEE_LIST, employeeList);
  yield takeLatest(EDIT_USER, editUser);
}

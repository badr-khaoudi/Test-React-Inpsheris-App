import { debounce, call, put } from 'redux-saga/effects';
import { userList as userListApi } from 'utils/api/AuthApi';
import { USER_LIST } from './constants';
import { userListSuccess, userListError } from './actions';

export function* userList({ options }) {
  try {
    const { data } = yield call(userListApi, options);
    yield put(userListSuccess(data));
  } catch (error) {
    yield put(userListError(error.message));
  }
}

export default function* userAutocompleteSaga() {
  yield debounce(500, USER_LIST, userList);
}

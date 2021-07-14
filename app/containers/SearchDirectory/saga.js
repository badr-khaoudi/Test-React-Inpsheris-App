import { takeLatest, call, put, debounce, select } from 'redux-saga/effects';
import {
  entitiesUpdate,
  addCoworkerGlobal,
  addPartnerGlobal,
} from 'containers/GlobalEntities/actions';
import { makeSelectUserUid } from 'containers/MyProfile/selectors';
import { searchDirectory as searchDirectoryApi } from 'utils/api/DirectoryApi';
import {
  addCoworker as addCoworkerApi,
  addPartner as addPartnerApi,
} from 'utils/api/MyProfileApi';
import {
  searchDirectorySuccess,
  searchDirectoryError,
  searchDirectoryMoreSuccess,
  searchDirectoryMoreError,
  addCoworkerSuccess,
  addCoworkerError,
  addPartnerSuccess,
  addPartnerError,
} from './actions';
import {
  SEARCH_DIRECTORY,
  SEARCH_DIRECTORY_MORE,
  SEARCH_DIRECTORY_FILTER,
  ADD_COWORKER,
  ADD_PARTNER,
} from './constants';

export function* searchDirectory({ options }) {
  try {
    const { response, entities, result } = yield call(
      searchDirectoryApi,
      options,
    );
    yield put(entitiesUpdate(entities));
    yield put(searchDirectorySuccess(response.totalMembers, result));
  } catch (error) {
    yield put(searchDirectoryError(error.message));
  }
}

export function* searchDirectoryMore({ options }) {
  try {
    const { entities, result } = yield call(searchDirectoryApi, options);
    yield put(entitiesUpdate(entities));
    yield put(searchDirectoryMoreSuccess(result));
  } catch (error) {
    yield put(searchDirectoryMoreError(error.message));
  }
}

export function* addCoworker({ options }) {
  try {
    yield call(addCoworkerApi, options);
    yield put(addCoworkerSuccess(options));
    const uid = yield select(makeSelectUserUid());
    yield put(addCoworkerGlobal(uid, options));
  } catch (error) {
    yield put(addCoworkerError(error.message));
  }
}

export function* addPartner({ options }) {
  try {
    yield call(addPartnerApi, options);
    yield put(addPartnerSuccess(options));
    const uid = yield select(makeSelectUserUid());
    yield put(addPartnerGlobal(uid, options));
  } catch (error) {
    yield put(addPartnerError(error.message));
  }
}

export default function* searchDirectorySaga() {
  yield takeLatest(SEARCH_DIRECTORY, searchDirectory);
  yield debounce(1000, SEARCH_DIRECTORY_FILTER, searchDirectory);
  yield takeLatest(SEARCH_DIRECTORY_MORE, searchDirectoryMore);
  yield takeLatest(ADD_COWORKER, addCoworker);
  yield takeLatest(ADD_PARTNER, addPartner);
}

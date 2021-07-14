import { takeLatest, call, put, debounce } from 'redux-saga/effects';
import axios from 'axios';
import { suggestion as suggestionApi } from 'utils/api/DirectoryApi';
import {
  externalSites as externalSitesApi,
  search as searchApi,
  communityFiles as communityFilesApi,
} from 'utils/api/AuthApi';
import { fileType, authorList } from 'utils/api/BrowseAllApi';
import { communityList } from 'utils/api/CommunityApi';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import {
  suggestionSuccess,
  suggestionError,
  externalSitesSuccess,
  externalSitesError,
  searchSuccess,
  searchError,
  searchMoreSuccess,
  searchMoreError,
  getFileTypeSuccess,
  getFileTypeError,
  getCommunityListSuccess,
  getCommunityListError,
  getAuthorListSuccess,
  getAuthorListError,
  communityFilesSuccess,
  communityFilesError,
  communityFilesMoreSuccess,
  communityFilesMoreError,
} from './actions';
import {
  SUGGESTION,
  EXTERNAL_SITES,
  SEARCH,
  SEARCH_MORE,
  GET_FILE_TYPE,
  GET_COMMUNITY_LIST,
  GET_AUTHOR_LIST,
  COMMUNITY_FILES,
  COMMUNITY_FILES_MORE,
} from './constants';

export function* suggestion({ options, config }) {
  try {
    const { data } = yield call(suggestionApi, options, config);
    yield put(suggestionSuccess(data));
  } catch (error) {
    if (axios.isCancel(error)) {
      yield put(suggestionSuccess([]));
    } else {
      yield put(suggestionError(error.message));
    }
  }
}

export function* externalSites() {
  try {
    const { data } = yield call(externalSitesApi);
    yield put(externalSitesSuccess(data));
  } catch (error) {
    yield put(externalSitesError(error.message));
  }
}

export function* search({ options }) {
  try {
    const { data, entities } = yield call(searchApi, options);
    yield put(entitiesUpdate(entities));
    yield put(searchSuccess(data));
  } catch (error) {
    yield put(searchError(error.message));
  }
}

export function* searchMore({ options }) {
  try {
    const { data, entities } = yield call(searchApi, options);
    yield put(entitiesUpdate(entities));
    yield put(searchMoreSuccess(data));
  } catch (error) {
    yield put(searchMoreError(error.message));
  }
}

export function* getFileType() {
  try {
    const { data } = yield call(fileType);
    yield put(getFileTypeSuccess(data));
  } catch (error) {
    yield put(getFileTypeError(error.message));
  }
}

export function* getCommunityList({ options }) {
  try {
    const { entities, result } = yield call(communityList, options);
    yield put(entitiesUpdate(entities));
    yield put(getCommunityListSuccess(result));
  } catch (error) {
    yield put(getCommunityListError(error.message));
  }
}

export function* getAuthorList({ options }) {
  try {
    const { entities, result } = yield call(authorList, options);
    yield put(entitiesUpdate(entities));
    yield put(getAuthorListSuccess(result));
  } catch (error) {
    yield put(getAuthorListError(error.message));
  }
}

export function* communityFiles({ options }) {
  try {
    const { data } = yield call(communityFilesApi, options);
    yield put(communityFilesSuccess(data));
  } catch (error) {
    yield put(communityFilesError(error.message));
  }
}

export function* communityFilesMore({ options }) {
  try {
    const { data } = yield call(communityFilesApi, options);
    yield put(communityFilesMoreSuccess(data));
  } catch (error) {
    yield put(communityFilesMoreError(error.message));
  }
}

export default function* mySearchSaga() {
  yield takeLatest(GET_FILE_TYPE, getFileType);
  yield takeLatest(GET_COMMUNITY_LIST, getCommunityList);
  yield takeLatest(GET_AUTHOR_LIST, getAuthorList);
  yield debounce(1000, SUGGESTION, suggestion);
  yield takeLatest(EXTERNAL_SITES, externalSites);
  yield takeLatest(SEARCH, search);
  yield takeLatest(SEARCH_MORE, searchMore);
  yield takeLatest(COMMUNITY_FILES, communityFiles);
  yield takeLatest(COMMUNITY_FILES_MORE, communityFilesMore);
}

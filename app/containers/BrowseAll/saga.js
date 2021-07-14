import { takeLatest, call, put, debounce } from 'redux-saga/effects';
import fileDownload from 'js-file-download';
import _ from 'lodash';
import { downloadFile } from 'utils/api/StatisticsApi';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import {
  fileType,
  authorList,
  fileList,
  downloadAllAsZip,
} from 'utils/api/BrowseAllApi';
import { communityList } from 'utils/api/CommunityApi';
import {
  GET_FILE_TYPE,
  GET_COMMUNITY_LIST,
  GET_AUTHOR_LIST,
  GET_FILE_LIST,
  SEARCH_FILE_LIST,
  DOWNLOAD_ALL,
  GET_FILE_LIST_MORE,
} from './constants';
import {
  getFileTypeSuccess,
  getFileTypeError,
  getCommunityListSuccess,
  getCommunityListError,
  getAuthorListSuccess,
  getAuthorListError,
  getFileListSuccess,
  getFileListError,
  downloadAllSuccess,
  downloadAllError,
  getFileListMoreSuccess,
  getFileListMoreError,
} from './actions';

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

export function* getFileList({ options }) {
  try {
    const { data } = yield call(fileList, options);
    yield put(getFileListSuccess(data));
  } catch (error) {
    yield put(getFileListError(error.message));
  }
}

export function* downloadAll({ options }) {
  try {
    const { data } = yield call(downloadAllAsZip, options);
    const fileName = _.last(_.split(data, '='));
    const { data: file } = yield call(downloadFile, { file: fileName });
    fileDownload(file, fileName);
    yield put(downloadAllSuccess());
  } catch (error) {
    yield put(downloadAllError(error.message));
  }
}

export function* getFileListMore({ options }) {
  try {
    const { data } = yield call(fileList, options);
    yield put(getFileListMoreSuccess(data));
  } catch (error) {
    yield put(getFileListMoreError(error.message));
  }
}

export default function* browseAllSaga() {
  yield takeLatest(GET_FILE_TYPE, getFileType);
  yield takeLatest(GET_COMMUNITY_LIST, getCommunityList);
  yield takeLatest(GET_AUTHOR_LIST, getAuthorList);
  yield takeLatest(GET_FILE_LIST, getFileList);
  yield debounce(1000, SEARCH_FILE_LIST, getFileList);
  yield takeLatest(DOWNLOAD_ALL, downloadAll);
  yield takeLatest(GET_FILE_LIST_MORE, getFileListMore);
}

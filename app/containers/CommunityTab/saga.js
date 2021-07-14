import { takeLatest, takeEvery, call, put, debounce } from 'redux-saga/effects';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import {
  communityTab,
  communityHomeTab,
  pinOnCommunity,
  communityFileSearch as communityFileSearchApi,
  documentTreeList as documentTreeListApi,
  newDocument,
  renameFolder as renameFolderApi,
  deleteDocument as deleteDocumentApi,
  orderDocument as orderDocumentApi,
  faqSearch as faqSearchApi,
  communityOtherTab,
} from 'utils/api/CommunityApi';
import { fileType } from 'utils/api/BrowseAllApi';
import { uploadFile as uploadFileApi } from 'utils/api/AuthApi';
import { widgetList as widgetListApi } from 'utils/api/HomeApi';
import {
  GET_COMMUNITY_TAB,
  GET_COMMUNITY_TAB_MORE,
  GET_COMMUNITY_DOCUMENT_TREE_TAB,
  GET_COMMUNITY_FILES_TAB,
  GET_COMMUNITY_GRDIVE_TAB,
  GET_COMMUNITY_HOME_TAB,
  GET_COMMUNITY_HOME_TAB_MORE,
  PIN_ON_COMMUNITY,
  GET_FILE_TYPE,
  COMMUNITY_FILE_SEARCH,
  COMMUNITY_FILE_SEARCH_MORE,
  DOCUMENT_TREE_LIST,
  CREATE_NEW_FOLDER,
  RENAME_FOLDER,
  DELETE_DOCUMENT,
  ORDER_DOCUMENT,
  CREATE_NEW_DOCUMENT,
  UPLOAD_FILE,
  FAQ_SEARCH,
  FAQ_SEARCH_MORE,
  WIDGET_LIST,
} from './constants';
import {
  getCommunityTabSuccess,
  getCommunityTabError,
  getCommunityTabMoreSuccess,
  getCommunityTabMoreError,
  getPinOnCommunitySuccess,
  getPinOnCommunityError,
  getFileTypeSuccess,
  getFileTypeError,
  communityFileSearchSuccess,
  communityFileSearchError,
  communityFileSearchMoreSuccess,
  communityFileSearchMoreError,
  documentTreeListSuccess,
  documentTreeListError,
  createNewFolderSuccess,
  createNewFolderError,
  renameFolderSuccess,
  renameFolderError,
  deleteDocumentSuccess,
  deleteDocumentError,
  orderDocumentSuccess,
  orderDocumentError,
  createNewDocumentSuccess,
  createNewDocumentError,
  uploadFileSuccess,
  uploadFileError,
  faqSearchSuccess,
  faqSearchError,
  faqSearchMoreSuccess,
  faqSearchMoreError,
  communityDocumentTreeTabSuccess,
  communityFilesTabSuccess,
  communityGdriveTabSuccess,
  widgetListSuccess,
  widgetListError,
} from './actions';

export function* getCommunityTab({ options }) {
  try {
    const { entities, result } = yield call(communityTab, options);
    yield put(entitiesUpdate(entities));
    yield put(getCommunityTabSuccess(result));
  } catch (error) {
    yield put(getCommunityTabError(error.message));
  }
}

export function* getCommunityTabMore({ options }) {
  try {
    const { entities, result } = yield call(communityTab, options);
    yield put(entitiesUpdate(entities));
    yield put(getCommunityTabMoreSuccess(result));
  } catch (error) {
    yield put(getCommunityTabMoreError(error.message));
  }
}

export function* getCommunityDocumentTreeTab({ options }) {
  try {
    const { data } = yield call(communityOtherTab, options);
    yield put(communityDocumentTreeTabSuccess(data));
  } catch (error) {
    yield put(getCommunityTabError(error.message));
  }
}

export function* getCommunityFilesTab({ options }) {
  try {
    const { data } = yield call(communityOtherTab, options);
    yield put(communityFilesTabSuccess(data));
  } catch (error) {
    yield put(getCommunityTabError(error.message));
  }
}

export function* getCommunityGdriveTab({ options }) {
  try {
    const { data } = yield call(communityOtherTab, options);
    yield put(communityGdriveTabSuccess(data));
  } catch (error) {
    yield put(getCommunityTabError(error.message));
  }
}

export function* getCommunityHomeTab({ options }) {
  try {
    const { entities, result } = yield call(communityHomeTab, options);
    yield put(entitiesUpdate(entities));
    yield put(getCommunityTabSuccess(result));
  } catch (error) {
    yield put(getCommunityTabError(error.message));
  }
}

export function* getCommunityHomeTabMore({ options }) {
  try {
    const { entities, result } = yield call(communityHomeTab, options);
    yield put(entitiesUpdate(entities));
    yield put(getCommunityTabMoreSuccess(result));
  } catch (error) {
    yield put(getCommunityTabMoreError(error.message));
  }
}

export function* getPinOnCommunity({ options }) {
  try {
    const { entities, result } = yield call(pinOnCommunity, options);
    yield put(entitiesUpdate(entities));
    yield put(getPinOnCommunitySuccess(result));
  } catch (error) {
    yield put(getPinOnCommunityError(error.message));
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

export function* communityFileSearch({ options }) {
  try {
    const { data } = yield call(communityFileSearchApi, options);
    yield put(communityFileSearchSuccess(data));
  } catch (error) {
    yield put(communityFileSearchError(error.message));
  }
}

export function* communityFileSearchMore({ options }) {
  try {
    const { data } = yield call(communityFileSearchApi, options);
    yield put(communityFileSearchMoreSuccess(data));
  } catch (error) {
    yield put(communityFileSearchMoreError(error.message));
  }
}

export function* documentTreeList({ options }) {
  try {
    const { data } = yield call(documentTreeListApi, options);
    yield put(documentTreeListSuccess(data));
  } catch (error) {
    yield put(documentTreeListError(error.message));
  }
}

export function* createNewFolder({ options }) {
  try {
    const { data } = yield call(newDocument, options);
    yield put(createNewFolderSuccess(data));
  } catch (error) {
    yield put(createNewFolderError(error.message));
  }
}

export function* renameFolder({ params, options }) {
  try {
    const { data } = yield call(renameFolderApi, params, options);
    yield put(renameFolderSuccess(data));
  } catch (error) {
    yield put(renameFolderError(error.message));
  }
}

export function* deleteDocument({ options }) {
  try {
    yield call(deleteDocumentApi, options);
    yield put(deleteDocumentSuccess(options));
  } catch (error) {
    yield put(deleteDocumentError(error.message));
  }
}

export function* orderDocument({ options }) {
  try {
    const { data } = yield call(orderDocumentApi, options);
    yield put(orderDocumentSuccess(data));
  } catch (error) {
    yield put(orderDocumentError(error.message));
  }
}

export function* createNewDocument({ options }) {
  try {
    const { data } = yield call(newDocument, options);
    yield put(createNewDocumentSuccess(data));
  } catch (error) {
    yield put(createNewDocumentError(error.message));
  }
}

export function* uploadFile({ options }) {
  try {
    const { data } = yield call(uploadFileApi, options);
    yield put(uploadFileSuccess(data));
  } catch (error) {
    yield put(uploadFileError(error.message));
  }
}

export function* faqSearch({ options }) {
  try {
    const { data } = yield call(faqSearchApi, options);
    yield put(faqSearchSuccess(data));
  } catch (error) {
    yield put(faqSearchError(error.message));
  }
}

export function* faqSearchMore({ options }) {
  try {
    const { data } = yield call(faqSearchApi, options);
    yield put(faqSearchMoreSuccess(data));
  } catch (error) {
    yield put(faqSearchMoreError(error.message));
  }
}

export function* widgetList({ options }) {
  try {
    const { entities, result } = yield call(widgetListApi, options);
    yield put(entitiesUpdate(entities));
    yield put(widgetListSuccess(result));
  } catch (error) {
    yield put(widgetListError(error));
  }
}

export default function* communityTabSaga() {
  yield takeLatest(GET_COMMUNITY_TAB, getCommunityTab);
  yield takeLatest(GET_COMMUNITY_TAB_MORE, getCommunityTabMore);
  yield takeLatest(
    GET_COMMUNITY_DOCUMENT_TREE_TAB,
    getCommunityDocumentTreeTab,
  );
  yield takeLatest(GET_COMMUNITY_FILES_TAB, getCommunityFilesTab);
  yield takeLatest(GET_COMMUNITY_GRDIVE_TAB, getCommunityGdriveTab);
  yield takeLatest(GET_COMMUNITY_HOME_TAB, getCommunityHomeTab);
  yield takeLatest(GET_COMMUNITY_HOME_TAB_MORE, getCommunityHomeTabMore);
  yield takeLatest(PIN_ON_COMMUNITY, getPinOnCommunity);
  yield takeLatest(GET_FILE_TYPE, getFileType);
  yield takeLatest(COMMUNITY_FILE_SEARCH, communityFileSearch);
  yield takeLatest(COMMUNITY_FILE_SEARCH_MORE, communityFileSearchMore);
  yield takeLatest(DOCUMENT_TREE_LIST, documentTreeList);
  yield takeLatest(CREATE_NEW_FOLDER, createNewFolder);
  yield takeLatest(RENAME_FOLDER, renameFolder);
  yield takeLatest(DELETE_DOCUMENT, deleteDocument);
  yield takeLatest(ORDER_DOCUMENT, orderDocument);
  yield takeLatest(CREATE_NEW_DOCUMENT, createNewDocument);
  yield takeEvery(UPLOAD_FILE, uploadFile);
  yield debounce(1000, FAQ_SEARCH, faqSearch);
  yield takeLatest(FAQ_SEARCH_MORE, faqSearchMore);
  yield takeLatest(WIDGET_LIST, widgetList);
}

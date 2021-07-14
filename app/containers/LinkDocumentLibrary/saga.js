import { takeLatest, debounce, call, put } from 'redux-saga/effects';
import {
  sharePointSites as sharePointSitesApi,
  documentLibraries as documentLibrariesApi,
  listItemsDrive as listItemsDriveApi,
  listChildrenDriveItem as listChildrenDriveItemApi,
} from 'utils/api/DocumentBarApi';
import {
  searchDriveItems as searchDriveItemsApi,
  searchChildrenDriveItem as searchChildrenDriveItemApi,
} from 'utils/api/CommunityApi';
import { contentsSuccess, contentsError } from './actions';
import {
  SHARE_POINT_SITES,
  SEARCH_SHARE_POINT_SITES,
  DOCUMENT_LIBRARIES,
  LIST_ITEMS_DRIVE,
  LIST_CHILDREN_DRIVE_ITEM,
  SEARCH_DRIVE_ITEMS,
  SEARCH_CHILDREN_DRIVE_ITEM,
} from './constants';

export function* sharePointSites({ options, cancelToken }) {
  try {
    const { data } = yield call(sharePointSitesApi, options, cancelToken);
    yield put(contentsSuccess(data));
  } catch (error) {
    yield put(contentsError(error.message));
  }
}

export function* documentLibraries({ siteId, options, cancelToken }) {
  try {
    const { data } = yield call(
      documentLibrariesApi,
      siteId,
      options,
      cancelToken,
    );
    yield put(contentsSuccess(data));
  } catch (error) {
    yield put(contentsError(error.message));
  }
}

export function* listItemsDrive({ driveId, options, cancelToken }) {
  try {
    const { data } = yield call(
      listItemsDriveApi,
      driveId,
      options,
      cancelToken,
    );
    yield put(contentsSuccess(data));
  } catch (error) {
    yield put(contentsError(error.message));
  }
}

export function* listChildrenDriveItem({
  driveId,
  itemId,
  options,
  cancelToken,
}) {
  try {
    const { data } = yield call(
      listChildrenDriveItemApi,
      driveId,
      itemId,
      options,
      cancelToken,
    );
    yield put(contentsSuccess(data));
  } catch (error) {
    yield put(contentsError(error.message));
  }
}

export function* searchDriveItems({
  driveId,
  searchText,
  options,
  cancelToken,
}) {
  try {
    const { data } = yield call(
      searchDriveItemsApi,
      driveId,
      searchText,
      options,
      cancelToken,
    );
    yield put(contentsSuccess(data));
  } catch (error) {
    yield put(contentsError(error.message));
  }
}

export function* searchChildrenDriveItem({
  driveId,
  itemId,
  searchText,
  options,
  cancelToken,
}) {
  try {
    const { data } = yield call(
      searchChildrenDriveItemApi,
      driveId,
      itemId,
      searchText,
      options,
      cancelToken,
    );
    yield put(contentsSuccess(data));
  } catch (error) {
    yield put(contentsError(error.message));
  }
}

export default function* linkDocumentLibrarySaga() {
  yield takeLatest(SHARE_POINT_SITES, sharePointSites);
  yield debounce(1000, SEARCH_SHARE_POINT_SITES, sharePointSites);
  yield takeLatest(DOCUMENT_LIBRARIES, documentLibraries);
  yield takeLatest(LIST_ITEMS_DRIVE, listItemsDrive);
  yield takeLatest(LIST_CHILDREN_DRIVE_ITEM, listChildrenDriveItem);
  yield debounce(1000, SEARCH_DRIVE_ITEMS, searchDriveItems);
  yield debounce(1000, SEARCH_CHILDREN_DRIVE_ITEM, searchChildrenDriveItem);
}

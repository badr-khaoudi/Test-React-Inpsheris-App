import { takeLatest, call, put, select } from 'redux-saga/effects';
import _ from 'lodash';
import {
  latestOpens as latestOpensApi,
  latestUpdates as latestUpdatesApi,
  listTabs,
  list,
  config as configApi,
  externalSource as externalSourceApi,
  driveRecent as driveRecentApi,
  listChildrenRoot as listChildrenRootApi,
  listChildrenDriveItem as listChildrenDriveItemApi,
  listItemsDrive as listItemsDriveApi,
  sharePointSites as sharePointSitesApi,
  documentLibraries as documentLibrariesApi,
  searchEntity as searchEntityApi,
  batch as batchApi,
} from 'utils/api/DocumentBarApi';
import {
  communityGroupList as communityGroupListApi,
  communityList as communityListApi,
} from 'utils/api/CommunityApi';
import {
  fileType as fileTypeApi,
  authorList as authorListApi,
} from 'utils/api/BrowseAllApi';
import { communityFiles } from 'utils/api/AuthApi';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import {
  latestOpensSuccess,
  latestOpensError,
  latestUpdatesSuccess,
  latestUpdatesError,
  communityGroupListSuccess,
  communityGroupListError,
  communityListSuccess,
  communityListError,
  communityTabListSuccess,
  communityTabListError,
  communityFileListSuccess,
  communityFileListError,
  searchCommunityFileSuccess,
  searchCommunityFileError,
  searchCommunityFileMoreSuccess,
  searchCommunityFileMoreError,
  communityOptionsSuccess,
  communityOptionsError,
  fileTypeSuccess,
  fileTypeError,
  authorListSuccess,
  authorListError,
  configSuccess,
  configError,
  externalSourceSuccess,
  externalSourceError,
  driveRecentSuccess,
  driveRecentError,
  contentsSuccess,
  contentsError,
  searchEntitySuccess,
  searchEntityError,
  searchEntityMoreSuccess,
  searchEntityMoreError,
  searchCommunityAndEntitySuccess,
  searchCommunityAndEntityError,
  searchCommunityAndEntityMoreSuccess,
  searchCommunityAndEntityMoreError,
  batch,
  livelyAndDriveRecentSuccess,
  livelyAndDriveRecentError,
} from './actions';
import {
  LATEST_OPENS,
  LATEST_UPDATES,
  COMMUNITY_GROUP_LIST,
  COMMUNITY_LIST,
  COMMUNITY_TAB_LIST,
  COMMUNITY_FILE_LIST,
  SEARCH_COMMUNITY_FILE,
  SEARCH_COMMUNITY_FILE_MORE,
  COMMUNITY_OPTIONS,
  FILE_TYPE,
  AUTHOR_LIST,
  CONFIG,
  EXTERNAL_SOURCE,
  DRIVE_RECENT,
  DRIVE_RECENT_MORE,
  LIST_CHILDREN_ROOT,
  LIST_CHILDREN_DRIVE_ITEM,
  LIST_ITEMS_DRIVE,
  SHARE_POINT_SITES,
  DOCUMENT_LIBRARIES,
  SEARCH_ENTITY,
  SEARCH_ENTITY_MORE,
  SEARCH_COMMUNITY_AND_ENTITY,
  SEARCH_COMMUNITY_AND_ENTITY_MORE,
  LIVELY_AND_DRIVE_RECENT,
  LIVELY_AND_DRIVE_RECENT_MORE,
} from './constants';
import {
  makeSelectLatestOpensPage,
  makeSelectLatestUpdatesPage,
  makeSelectSearchCommunityPage,
  makeSelectLivelyAndDriveRecentPage,
  makeSelectLivelyAndDriveRecent,
  makeSelectDriveRecent,
} from './selectors';

export function* latestOpens({ options, cancelToken }) {
  try {
    const page = yield select(makeSelectLatestOpensPage());
    const { data } = yield call(
      latestOpensApi,
      { ...options, page },
      cancelToken,
    );
    yield put(latestOpensSuccess(data));
  } catch (error) {
    yield put(latestOpensError(error.message));
  }
}

export function* latestUpdates({ options, cancelToken }) {
  try {
    const page = yield select(makeSelectLatestUpdatesPage());
    const { data } = yield call(
      latestUpdatesApi,
      { ...options, page },
      cancelToken,
    );
    yield put(latestUpdatesSuccess(data));
  } catch (error) {
    yield put(latestUpdatesError(error.message));
  }
}

export function* communityGroupList({ options, cancelToken }) {
  try {
    const { data } = yield call(communityGroupListApi, options, cancelToken);
    yield put(communityGroupListSuccess(data));
  } catch (error) {
    yield put(communityGroupListError(error.message));
  }
}

export function* communityList({ options, cancelToken }) {
  try {
    const { entities, result } = yield call(
      communityListApi,
      options,
      cancelToken,
    );
    yield put(entitiesUpdate(entities));
    yield put(communityListSuccess(result));
  } catch (error) {
    yield put(communityListError(error.message));
  }
}

export function* communityTabList({ options, cancelToken }) {
  try {
    const { entities, result } = yield call(listTabs, options, cancelToken);
    yield put(entitiesUpdate(entities));
    yield put(communityTabListSuccess(result));
  } catch (error) {
    yield put(communityTabListError(error.message));
  }
}

export function* communityFileList({ options, cancelToken }) {
  try {
    const { data } = yield call(list, options, cancelToken);
    yield put(communityFileListSuccess(data));
  } catch (error) {
    yield put(communityFileListError(error.message));
  }
}

export function* searchCommunityFile({ options, cancelToken }) {
  try {
    const { data } = yield call(communityFiles, options, cancelToken);
    yield put(searchCommunityFileSuccess(data));
  } catch (error) {
    yield put(searchCommunityFileError(error.message));
  }
}

export function* searchCommunityFileMore({ options, cancelToken }) {
  try {
    const page = yield select(makeSelectSearchCommunityPage());
    const { data } = yield call(
      communityFiles,
      { ...options, page },
      cancelToken,
    );
    yield put(searchCommunityFileMoreSuccess(data));
  } catch (error) {
    yield put(searchCommunityFileMoreError(error.message));
  }
}

export function* communityOptions({ options }) {
  try {
    const { entities, result } = yield call(communityListApi, options);
    yield put(entitiesUpdate(entities));
    yield put(communityOptionsSuccess(result));
  } catch (error) {
    yield put(communityOptionsError(error.message));
  }
}

export function* fileType() {
  try {
    const { data } = yield call(fileTypeApi);
    yield put(fileTypeSuccess(data));
  } catch (error) {
    yield put(fileTypeError(error.message));
  }
}

export function* authorList({ options }) {
  try {
    const { entities, result } = yield call(authorListApi, options);
    yield put(entitiesUpdate(entities));
    yield put(authorListSuccess(result));
  } catch (error) {
    yield put(authorListError(error.message));
  }
}

export function* config({ options }) {
  try {
    const { data } = yield call(configApi, options);
    yield put(configSuccess(data));
  } catch (error) {
    yield put(configError(error.message));
  }
}

export function* externalSource({ options }) {
  try {
    const { data } = yield call(externalSourceApi, options);
    yield put(externalSourceSuccess(data));
  } catch (error) {
    yield put(externalSourceError(error.message));
  }
}

function* batchRequest(data) {
  try {
    if (!_.isEmpty(data.value)) {
      const requests = _.map(data.value, value => ({
        id: value.remoteItem ? value.remoteItem.id : value.id,
        method: 'GET',
        url: `/drives/${
          value.remoteItem
            ? value.remoteItem.parentReference.driveId
            : value.parentReference.driveId
        }/items/${
          value.remoteItem ? value.remoteItem.id : value.id
        }/thumbnails?select=medium`,
      }));
      const {
        data: { responses },
      } = yield call(batchApi, { requests });
      yield put(batch(responses));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* driveRecent({ options, cancelToken }) {
  try {
    const { data } = yield call(driveRecentApi, options, cancelToken);
    yield put(driveRecentSuccess(data));
    yield call(batchRequest, data);
  } catch (error) {
    yield put(driveRecentError(error.message));
  }
}

export function* driveRecentMore({ options, cancelToken }) {
  try {
    const recent = yield select(makeSelectDriveRecent());
    if (recent['@odata.nextLink']) {
      const { data } = yield call(
        driveRecentApi,
        {
          ...options,
          $skiptoken: _.last(_.split(recent['@odata.nextLink'], '=')),
        },
        cancelToken,
      );
      yield put(driveRecentSuccess(data));
      yield call(batchRequest, data);
    } else {
      yield put(driveRecentSuccess({ value: [] }));
    }
  } catch (error) {
    yield put(driveRecentError(error.message));
  }
}

export function* listChildrenRoot({ options, cancelToken }) {
  try {
    const { data } = yield call(listChildrenRootApi, options, cancelToken);
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

export function* searchEntity({ options, cancelToken }) {
  try {
    const { data } = yield call(searchEntityApi, options, cancelToken);
    yield put(searchEntitySuccess(data));
  } catch (error) {
    yield put(searchEntityError(error.message));
  }
}

export function* searchEntityMore({ options, cancelToken }) {
  try {
    const { data } = yield call(searchEntityApi, options, cancelToken);
    yield put(searchEntityMoreSuccess(data));
  } catch (error) {
    yield put(searchEntityMoreError(error.message));
  }
}

export function* searchCommunityAndEntity({
  communityFileOptions,
  entityOptions,
  cancelToken,
}) {
  try {
    const { data: communityData } = yield call(
      communityFiles,
      communityFileOptions,
      cancelToken,
    );
    const { data: entityData } = yield call(
      searchEntityApi,
      entityOptions,
      cancelToken,
    );
    yield put(searchCommunityAndEntitySuccess(communityData, entityData));
  } catch (error) {
    yield put(searchCommunityAndEntityError(error.message));
  }
}

export function* searchCommunityAndEntityMore({
  communityFileOptions,
  entityOptions,
  cancelToken,
}) {
  try {
    const { data: communityData } = yield call(
      communityFiles,
      communityFileOptions,
      cancelToken,
    );
    const { data: entityData } = yield call(
      searchEntityApi,
      entityOptions,
      cancelToken,
    );
    yield put(searchCommunityAndEntityMoreSuccess(communityData, entityData));
  } catch (error) {
    yield put(searchCommunityAndEntityMoreError(error.message));
  }
}

export function* livelyAndDriveRecent({
  livelyOptions,
  driveOptions,
  cancelToken,
}) {
  try {
    const { data: livelyData } = yield call(
      latestOpensApi,
      livelyOptions,
      cancelToken,
    );
    const { data: driveData } = yield call(
      driveRecentApi,
      driveOptions,
      cancelToken,
    );
    yield put(livelyAndDriveRecentSuccess(livelyData, driveData));
    yield call(batchRequest, driveData);
  } catch (error) {
    yield put(livelyAndDriveRecentError(error.message));
  }
}

export function* livelyAndDriveRecentMore({
  livelyOptions,
  driveOptions,
  cancelToken,
}) {
  try {
    const page = yield select(makeSelectLivelyAndDriveRecentPage());
    const recent = yield select(makeSelectLivelyAndDriveRecent());
    const { data: livelyData } = yield call(
      latestOpensApi,
      { ...livelyOptions, page },
      cancelToken,
    );
    if (recent.driveData && recent.driveData['@odata.nextLink']) {
      const { data: driveData } = yield call(
        driveRecentApi,
        {
          ...driveOptions,
          $skiptoken: _.last(_.split(recent.driveData['@odata.nextLink'], '=')),
        },
        cancelToken,
      );
      yield put(livelyAndDriveRecentSuccess(livelyData, driveData));
      yield call(batchRequest, driveData);
    } else {
      yield put(livelyAndDriveRecentSuccess(livelyData, { value: [] }));
    }
  } catch (error) {
    yield put(livelyAndDriveRecentError(error.message));
  }
}

export default function* documentBarSaga() {
  yield takeLatest(LATEST_OPENS, latestOpens);
  yield takeLatest(LATEST_UPDATES, latestUpdates);
  yield takeLatest(COMMUNITY_GROUP_LIST, communityGroupList);
  yield takeLatest(COMMUNITY_LIST, communityList);
  yield takeLatest(COMMUNITY_TAB_LIST, communityTabList);
  yield takeLatest(COMMUNITY_FILE_LIST, communityFileList);
  yield takeLatest(SEARCH_COMMUNITY_FILE, searchCommunityFile);
  yield takeLatest(SEARCH_COMMUNITY_FILE_MORE, searchCommunityFileMore);
  yield takeLatest(COMMUNITY_OPTIONS, communityOptions);
  yield takeLatest(FILE_TYPE, fileType);
  yield takeLatest(AUTHOR_LIST, authorList);
  yield takeLatest(CONFIG, config);
  yield takeLatest(EXTERNAL_SOURCE, externalSource);
  yield takeLatest(DRIVE_RECENT, driveRecent);
  yield takeLatest(DRIVE_RECENT_MORE, driveRecentMore);
  yield takeLatest(LIST_CHILDREN_ROOT, listChildrenRoot);
  yield takeLatest(LIST_CHILDREN_DRIVE_ITEM, listChildrenDriveItem);
  yield takeLatest(LIST_ITEMS_DRIVE, listItemsDrive);
  yield takeLatest(SHARE_POINT_SITES, sharePointSites);
  yield takeLatest(DOCUMENT_LIBRARIES, documentLibraries);
  yield takeLatest(SEARCH_ENTITY, searchEntity);
  yield takeLatest(SEARCH_ENTITY_MORE, searchEntityMore);
  yield takeLatest(SEARCH_COMMUNITY_AND_ENTITY, searchCommunityAndEntity);
  yield takeLatest(
    SEARCH_COMMUNITY_AND_ENTITY_MORE,
    searchCommunityAndEntityMore,
  );
  yield takeLatest(LIVELY_AND_DRIVE_RECENT, livelyAndDriveRecent);
  yield takeLatest(LIVELY_AND_DRIVE_RECENT_MORE, livelyAndDriveRecentMore);
}

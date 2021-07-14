/*
 *
 * DocumentBar actions
 *
 */

import {
  LATEST_OPENS,
  LATEST_OPENS_SUCCESS,
  LATEST_OPENS_ERROR,
  LATEST_UPDATES,
  LATEST_UPDATES_SUCCESS,
  LATEST_UPDATES_ERROR,
  COMMUNITY_GROUP_LIST,
  COMMUNITY_GROUP_LIST_SUCCESS,
  COMMUNITY_GROUP_LIST_ERROR,
  COMMUNITY_LIST,
  COMMUNITY_LIST_SUCCESS,
  COMMUNITY_LIST_ERROR,
  COMMUNITY_TAB_LIST,
  COMMUNITY_TAB_LIST_SUCCESS,
  COMMUNITY_TAB_LIST_ERROR,
  COMMUNITY_FILE_LIST,
  COMMUNITY_FILE_LIST_SUCCESS,
  COMMUNITY_FILE_LIST_ERROR,
  SEARCH_COMMUNITY_FILE,
  SEARCH_COMMUNITY_FILE_SUCCESS,
  SEARCH_COMMUNITY_FILE_ERROR,
  SEARCH_COMMUNITY_FILE_MORE,
  SEARCH_COMMUNITY_FILE_MORE_SUCCESS,
  SEARCH_COMMUNITY_FILE_MORE_ERROR,
  COMMUNITY_OPTIONS,
  COMMUNITY_OPTIONS_SUCCESS,
  COMMUNITY_OPTIONS_ERROR,
  FILE_TYPE,
  FILE_TYPE_SUCCESS,
  FILE_TYPE_ERROR,
  AUTHOR_LIST,
  AUTHOR_LIST_SUCCESS,
  AUTHOR_LIST_ERROR,
  CONFIG,
  CONFIG_SUCCESS,
  CONFIG_ERROR,
  EXTERNAL_SOURCE,
  EXTERNAL_SOURCE_SUCCESS,
  EXTERNAL_SOURCE_ERROR,
  DRIVE_RECENT,
  DRIVE_RECENT_SUCCESS,
  DRIVE_RECENT_ERROR,
  LIST_CHILDREN_ROOT,
  LIST_CHILDREN_DRIVE_ITEM,
  LIST_ITEMS_DRIVE,
  SHARE_POINT_SITES,
  DOCUMENT_LIBRARIES,
  CONTENTS_SUCCESS,
  CONTENTS_ERROR,
  SEARCH_ENTITY,
  SEARCH_ENTITY_SUCCESS,
  SEARCH_ENTITY_ERROR,
  SEARCH_ENTITY_MORE,
  SEARCH_ENTITY_MORE_SUCCESS,
  SEARCH_ENTITY_MORE_ERROR,
  SEARCH_COMMUNITY_AND_ENTITY,
  SEARCH_COMMUNITY_AND_ENTITY_SUCCESS,
  SEARCH_COMMUNITY_AND_ENTITY_ERROR,
  SEARCH_COMMUNITY_AND_ENTITY_MORE,
  SEARCH_COMMUNITY_AND_ENTITY_MORE_SUCCESS,
  SEARCH_COMMUNITY_AND_ENTITY_MORE_ERROR,
  BATCH,
  LIVELY_AND_DRIVE_RECENT,
  LIVELY_AND_DRIVE_RECENT_SUCCESS,
  LIVELY_AND_DRIVE_RECENT_ERROR,
  LIVELY_AND_DRIVE_RECENT_MORE,
  DRIVE_RECENT_MORE,
} from './constants';

export function latestOpens(options, cancelToken) {
  return {
    type: LATEST_OPENS,
    options,
    cancelToken,
  };
}

export function latestOpensSuccess(data) {
  return {
    type: LATEST_OPENS_SUCCESS,
    data,
  };
}

export function latestOpensError(error) {
  return {
    type: LATEST_OPENS_ERROR,
    error,
  };
}

export function latestUpdates(options, cancelToken) {
  return {
    type: LATEST_UPDATES,
    options,
    cancelToken,
  };
}

export function latestUpdatesSuccess(data) {
  return {
    type: LATEST_UPDATES_SUCCESS,
    data,
  };
}

export function latestUpdatesError(error) {
  return {
    type: LATEST_UPDATES_ERROR,
    error,
  };
}

export function communityGroupList(options, cancelToken) {
  return {
    type: COMMUNITY_GROUP_LIST,
    options,
    cancelToken,
  };
}

export function communityGroupListSuccess(data) {
  return {
    type: COMMUNITY_GROUP_LIST_SUCCESS,
    data,
  };
}

export function communityGroupListError(error) {
  return {
    type: COMMUNITY_GROUP_LIST_ERROR,
    error,
  };
}

export function communityList(options, cancelToken) {
  return {
    type: COMMUNITY_LIST,
    options,
    cancelToken,
  };
}

export function communityListSuccess(data) {
  return {
    type: COMMUNITY_LIST_SUCCESS,
    data,
  };
}

export function communityListError(error) {
  return {
    type: COMMUNITY_LIST_ERROR,
    error,
  };
}

export function communityTabList(options, cancelToken) {
  return {
    type: COMMUNITY_TAB_LIST,
    options,
    cancelToken,
  };
}

export function communityTabListSuccess(data) {
  return {
    type: COMMUNITY_TAB_LIST_SUCCESS,
    data,
  };
}

export function communityTabListError(error) {
  return {
    type: COMMUNITY_TAB_LIST_ERROR,
    error,
  };
}

export function communityFileList(options, cancelToken) {
  return {
    type: COMMUNITY_FILE_LIST,
    options,
    cancelToken,
  };
}

export function communityFileListSuccess(data) {
  return {
    type: COMMUNITY_FILE_LIST_SUCCESS,
    data,
  };
}

export function communityFileListError(error) {
  return {
    type: COMMUNITY_FILE_LIST_ERROR,
    error,
  };
}

export function searchCommunityFile(options, cancelToken) {
  return {
    type: SEARCH_COMMUNITY_FILE,
    options,
    cancelToken,
  };
}

export function searchCommunityFileSuccess(data) {
  return {
    type: SEARCH_COMMUNITY_FILE_SUCCESS,
    data,
  };
}

export function searchCommunityFileError(error) {
  return {
    type: SEARCH_COMMUNITY_FILE_ERROR,
    error,
  };
}

export function searchCommunityFileMore(options, cancelToken) {
  return {
    type: SEARCH_COMMUNITY_FILE_MORE,
    options,
    cancelToken,
  };
}

export function searchCommunityFileMoreSuccess(data) {
  return {
    type: SEARCH_COMMUNITY_FILE_MORE_SUCCESS,
    data,
  };
}

export function searchCommunityFileMoreError(error) {
  return {
    type: SEARCH_COMMUNITY_FILE_MORE_ERROR,
    error,
  };
}

export function communityOptions(options) {
  return {
    type: COMMUNITY_OPTIONS,
    options,
  };
}

export function communityOptionsSuccess(data) {
  return {
    type: COMMUNITY_OPTIONS_SUCCESS,
    data,
  };
}

export function communityOptionsError(error) {
  return {
    type: COMMUNITY_OPTIONS_ERROR,
    error,
  };
}

export function fileType() {
  return {
    type: FILE_TYPE,
  };
}

export function fileTypeSuccess(data) {
  return {
    type: FILE_TYPE_SUCCESS,
    data,
  };
}

export function fileTypeError(error) {
  return {
    type: FILE_TYPE_ERROR,
    error,
  };
}

export function authorList(options) {
  return {
    type: AUTHOR_LIST,
    options,
  };
}

export function authorListSuccess(data) {
  return {
    type: AUTHOR_LIST_SUCCESS,
    data,
  };
}

export function authorListError(error) {
  return {
    type: AUTHOR_LIST_ERROR,
    error,
  };
}

export function config(options) {
  return {
    type: CONFIG,
    options,
  };
}

export function configSuccess(data) {
  return {
    type: CONFIG_SUCCESS,
    data,
  };
}

export function configError(error) {
  return {
    type: CONFIG_ERROR,
    error,
  };
}

export function externalSource(options) {
  return {
    type: EXTERNAL_SOURCE,
    options,
  };
}

export function externalSourceSuccess(data) {
  return {
    type: EXTERNAL_SOURCE_SUCCESS,
    data,
  };
}

export function externalSourceError(error) {
  return {
    type: EXTERNAL_SOURCE_ERROR,
    error,
  };
}

export function driveRecent(options, cancelToken) {
  return {
    type: DRIVE_RECENT,
    options,
    cancelToken,
  };
}

export function driveRecentSuccess(data) {
  return {
    type: DRIVE_RECENT_SUCCESS,
    data,
  };
}

export function driveRecentError(error) {
  return {
    type: DRIVE_RECENT_ERROR,
    error,
  };
}

export function listChildrenRoot(options, cancelToken) {
  return {
    type: LIST_CHILDREN_ROOT,
    options,
    cancelToken,
  };
}

export function listChildrenDriveItem(driveId, itemId, options, cancelToken) {
  return {
    type: LIST_CHILDREN_DRIVE_ITEM,
    driveId,
    itemId,
    options,
    cancelToken,
  };
}

export function listItemsDrive(driveId, options, cancelToken) {
  return {
    type: LIST_ITEMS_DRIVE,
    driveId,
    options,
    cancelToken,
  };
}

export function sharePointSites(options, cancelToken) {
  return {
    type: SHARE_POINT_SITES,
    options,
    cancelToken,
  };
}

export function documentLibraries(siteId, options, cancelToken) {
  return {
    type: DOCUMENT_LIBRARIES,
    siteId,
    options,
    cancelToken,
  };
}

export function contentsSuccess(data) {
  return {
    type: CONTENTS_SUCCESS,
    data,
  };
}

export function contentsError(error) {
  return {
    type: CONTENTS_ERROR,
    error,
  };
}

export function searchEntity(options, cancelToken) {
  return {
    type: SEARCH_ENTITY,
    options,
    cancelToken,
  };
}

export function searchEntitySuccess(data) {
  return {
    type: SEARCH_ENTITY_SUCCESS,
    data,
  };
}

export function searchEntityError(error) {
  return {
    type: SEARCH_ENTITY_ERROR,
    error,
  };
}

export function searchEntityMore(options, cancelToken) {
  return {
    type: SEARCH_ENTITY_MORE,
    options,
    cancelToken,
  };
}

export function searchEntityMoreSuccess(data) {
  return {
    type: SEARCH_ENTITY_MORE_SUCCESS,
    data,
  };
}

export function searchEntityMoreError(error) {
  return {
    type: SEARCH_ENTITY_MORE_ERROR,
    error,
  };
}

export function searchCommunityAndEntity(
  communityFileOptions,
  entityOptions,
  cancelToken,
) {
  return {
    type: SEARCH_COMMUNITY_AND_ENTITY,
    communityFileOptions,
    entityOptions,
    cancelToken,
  };
}

export function searchCommunityAndEntitySuccess(communityData, entityData) {
  return {
    type: SEARCH_COMMUNITY_AND_ENTITY_SUCCESS,
    communityData,
    entityData,
  };
}

export function searchCommunityAndEntityError(error) {
  return {
    type: SEARCH_COMMUNITY_AND_ENTITY_ERROR,
    error,
  };
}

export function searchCommunityAndEntityMore(
  communityFileOptions,
  entityOptions,
  cancelToken,
) {
  return {
    type: SEARCH_COMMUNITY_AND_ENTITY_MORE,
    communityFileOptions,
    entityOptions,
    cancelToken,
  };
}

export function searchCommunityAndEntityMoreSuccess(communityData, entityData) {
  return {
    type: SEARCH_COMMUNITY_AND_ENTITY_MORE_SUCCESS,
    communityData,
    entityData,
  };
}

export function searchCommunityAndEntityMoreError(error) {
  return {
    type: SEARCH_COMMUNITY_AND_ENTITY_MORE_ERROR,
    error,
  };
}

export function batch(data) {
  return {
    type: BATCH,
    data,
  };
}

export function livelyAndDriveRecent(livelyOptions, driveOptions, cancelToken) {
  return {
    type: LIVELY_AND_DRIVE_RECENT,
    livelyOptions,
    driveOptions,
    cancelToken,
  };
}

export function livelyAndDriveRecentSuccess(livelyData, driveData) {
  return {
    type: LIVELY_AND_DRIVE_RECENT_SUCCESS,
    livelyData,
    driveData,
  };
}

export function livelyAndDriveRecentError(error) {
  return {
    type: LIVELY_AND_DRIVE_RECENT_ERROR,
    error,
  };
}

export function livelyAndDriveRecentMore(
  livelyOptions,
  driveOptions,
  cancelToken,
) {
  return {
    type: LIVELY_AND_DRIVE_RECENT_MORE,
    livelyOptions,
    driveOptions,
    cancelToken,
  };
}

export function driveRecentMore(options, cancelToken) {
  return {
    type: DRIVE_RECENT_MORE,
    options,
    cancelToken,
  };
}

/*
 *
 * LinkDocumentLibrary actions
 *
 */

import {
  SHARE_POINT_SITES,
  SEARCH_SHARE_POINT_SITES,
  DOCUMENT_LIBRARIES,
  LIST_ITEMS_DRIVE,
  LIST_CHILDREN_DRIVE_ITEM,
  SEARCH_DRIVE_ITEMS,
  SEARCH_CHILDREN_DRIVE_ITEM,
  CONTENTS_SUCCESS,
  CONTENTS_ERROR,
} from './constants';

export function sharePointSites(options, cancelToken) {
  return {
    type: SHARE_POINT_SITES,
    options,
    cancelToken,
  };
}

export function searchSharePointSites(options, cancelToken) {
  return {
    type: SEARCH_SHARE_POINT_SITES,
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

export function listItemsDrive(driveId, options, cancelToken) {
  return {
    type: LIST_ITEMS_DRIVE,
    driveId,
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

export function searchDriveItems(driveId, searchText, options, cancelToken) {
  return {
    type: SEARCH_DRIVE_ITEMS,
    driveId,
    searchText,
    options,
    cancelToken,
  };
}

export function searchChildrenDriveItem(
  driveId,
  itemId,
  searchText,
  options,
  cancelToken,
) {
  return {
    type: SEARCH_CHILDREN_DRIVE_ITEM,
    driveId,
    itemId,
    searchText,
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

/*
 *
 * CommunityTab actions
 *
 */

import {
  GET_COMMUNITY_TAB,
  GET_COMMUNITY_TAB_SUCCESS,
  GET_COMMUNITY_TAB_ERROR,
  GET_COMMUNITY_TAB_MORE,
  GET_COMMUNITY_TAB_MORE_SUCCESS,
  GET_COMMUNITY_TAB_MORE_ERROR,
  GET_COMMUNITY_DOCUMENT_TREE_TAB,
  GET_COMMUNITY_DOCUMENT_TREE_TAB_SUCCESS,
  GET_COMMUNITY_FILES_TAB,
  GET_COMMUNITY_FILES_TAB_SUCCESS,
  GET_COMMUNITY_GRDIVE_TAB,
  GET_COMMUNITY_GRDIVE_TAB_SUCCESS,
  GET_COMMUNITY_HOME_TAB,
  GET_COMMUNITY_HOME_TAB_MORE,
  PIN_ON_COMMUNITY,
  PIN_ON_COMMUNITY_SUCCESS,
  PIN_ON_COMMUNITY_ERROR,
  GET_FILE_TYPE,
  GET_FILE_TYPE_SUCCESS,
  GET_FILE_TYPE_ERROR,
  COMMUNITY_FILE_SEARCH,
  COMMUNITY_FILE_SEARCH_SUCCESS,
  COMMUNITY_FILE_SEARCH_ERROR,
  COMMUNITY_FILE_SEARCH_MORE,
  COMMUNITY_FILE_SEARCH_MORE_SUCCESS,
  COMMUNITY_FILE_SEARCH_MORE_ERROR,
  DOCUMENT_TREE_LIST,
  DOCUMENT_TREE_LIST_SUCCESS,
  DOCUMENT_TREE_LIST_ERROR,
  CREATE_NEW_FOLDER,
  CREATE_NEW_FOLDER_SUCCESS,
  CREATE_NEW_FOLDER_ERROR,
  RENAME_FOLDER,
  RENAME_FOLDER_SUCCESS,
  RENAME_FOLDER_ERROR,
  DELETE_DOCUMENT,
  DELETE_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_ERROR,
  ORDER_DOCUMENT,
  ORDER_DOCUMENT_SUCCESS,
  ORDER_DOCUMENT_ERROR,
  CREATE_NEW_DOCUMENT,
  CREATE_NEW_DOCUMENT_SUCCESS,
  CREATE_NEW_DOCUMENT_ERROR,
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CLEAN_UPLOAD_FILE,
  FAQ_SEARCH,
  FAQ_SEARCH_SUCCESS,
  FAQ_SEARCH_ERROR,
  FAQ_SEARCH_MORE,
  FAQ_SEARCH_MORE_SUCCESS,
  FAQ_SEARCH_MORE_ERROR,
  WIDGET_LIST,
  WIDGET_LIST_SUCCESS,
  WIDGET_LIST_ERROR,
  WIDGET_LIST_ORDER,
} from './constants';

export function getCommunityTab(options) {
  return {
    type: GET_COMMUNITY_TAB,
    options,
  };
}

export function getCommunityTabSuccess(data) {
  return {
    type: GET_COMMUNITY_TAB_SUCCESS,
    data,
  };
}

export function getCommunityTabError(error) {
  return {
    type: GET_COMMUNITY_TAB_ERROR,
    error,
  };
}

export function getCommunityTabMore(options) {
  return {
    type: GET_COMMUNITY_TAB_MORE,
    options,
  };
}

export function getCommunityTabMoreSuccess(data) {
  return {
    type: GET_COMMUNITY_TAB_MORE_SUCCESS,
    data,
  };
}

export function getCommunityTabMoreError(error) {
  return {
    type: GET_COMMUNITY_TAB_MORE_ERROR,
    error,
  };
}

export function communityDocumentTreeTab(options) {
  return {
    type: GET_COMMUNITY_DOCUMENT_TREE_TAB,
    options,
  };
}

export function communityDocumentTreeTabSuccess(data) {
  return {
    type: GET_COMMUNITY_DOCUMENT_TREE_TAB_SUCCESS,
    data,
  };
}

export function communityFilesTab(options) {
  return {
    type: GET_COMMUNITY_FILES_TAB,
    options,
  };
}

export function communityFilesTabSuccess(data) {
  return {
    type: GET_COMMUNITY_FILES_TAB_SUCCESS,
    data,
  };
}

export function communityGdriveTab(options) {
  return {
    type: GET_COMMUNITY_GRDIVE_TAB,
    options,
  };
}

export function communityGdriveTabSuccess(data) {
  return {
    type: GET_COMMUNITY_GRDIVE_TAB_SUCCESS,
    data,
  };
}

export function communityHomeTab(options) {
  return {
    type: GET_COMMUNITY_HOME_TAB,
    options,
  };
}

export function communityHomeTabMore(options) {
  return {
    type: GET_COMMUNITY_HOME_TAB_MORE,
    options,
  };
}

export function getPinOnCommunity(options) {
  return {
    type: PIN_ON_COMMUNITY,
    options,
  };
}

export function getPinOnCommunitySuccess(data) {
  return {
    type: PIN_ON_COMMUNITY_SUCCESS,
    data,
  };
}

export function getPinOnCommunityError(error) {
  return {
    type: PIN_ON_COMMUNITY_ERROR,
    error,
  };
}

export function getFileType() {
  return {
    type: GET_FILE_TYPE,
  };
}

export function getFileTypeSuccess(data) {
  return {
    type: GET_FILE_TYPE_SUCCESS,
    data,
  };
}

export function getFileTypeError(error) {
  return {
    type: GET_FILE_TYPE_ERROR,
    error,
  };
}

export function communityFileSearch(options) {
  return {
    type: COMMUNITY_FILE_SEARCH,
    options,
  };
}

export function communityFileSearchSuccess(data) {
  return {
    type: COMMUNITY_FILE_SEARCH_SUCCESS,
    data,
  };
}

export function communityFileSearchError(error) {
  return {
    type: COMMUNITY_FILE_SEARCH_ERROR,
    error,
  };
}

export function communityFileSearchMore(options) {
  return {
    type: COMMUNITY_FILE_SEARCH_MORE,
    options,
  };
}

export function communityFileSearchMoreSuccess(data) {
  return {
    type: COMMUNITY_FILE_SEARCH_MORE_SUCCESS,
    data,
  };
}

export function communityFileSearchMoreError(error) {
  return {
    type: COMMUNITY_FILE_SEARCH_MORE_ERROR,
    error,
  };
}

export function documentTreeList(options) {
  return {
    type: DOCUMENT_TREE_LIST,
    options,
  };
}

export function documentTreeListSuccess(data) {
  return {
    type: DOCUMENT_TREE_LIST_SUCCESS,
    data,
  };
}

export function documentTreeListError(error) {
  return {
    type: DOCUMENT_TREE_LIST_ERROR,
    error,
  };
}

export function createNewFolder(options) {
  return {
    type: CREATE_NEW_FOLDER,
    options,
  };
}

export function createNewFolderSuccess(data) {
  return {
    type: CREATE_NEW_FOLDER_SUCCESS,
    data,
  };
}

export function createNewFolderError(error) {
  return {
    type: CREATE_NEW_FOLDER_ERROR,
    error,
  };
}

export function renameFolder(params, options) {
  return {
    type: RENAME_FOLDER,
    params,
    options,
  };
}

export function renameFolderSuccess(data) {
  return {
    type: RENAME_FOLDER_SUCCESS,
    data,
  };
}

export function renameFolderError(error) {
  return {
    type: RENAME_FOLDER_ERROR,
    error,
  };
}

export function deleteDocument(options) {
  return {
    type: DELETE_DOCUMENT,
    options,
  };
}

export function deleteDocumentSuccess(data) {
  return {
    type: DELETE_DOCUMENT_SUCCESS,
    data,
  };
}

export function deleteDocumentError(error) {
  return {
    type: DELETE_DOCUMENT_ERROR,
    error,
  };
}

export function orderDocument(options) {
  return {
    type: ORDER_DOCUMENT,
    options,
  };
}

export function orderDocumentSuccess(data) {
  return {
    type: ORDER_DOCUMENT_SUCCESS,
    data,
  };
}

export function orderDocumentError(error) {
  return {
    type: ORDER_DOCUMENT_ERROR,
    error,
  };
}

export function createNewDocument(options) {
  return {
    type: CREATE_NEW_DOCUMENT,
    options,
  };
}

export function createNewDocumentSuccess(data) {
  return {
    type: CREATE_NEW_DOCUMENT_SUCCESS,
    data,
  };
}

export function createNewDocumentError(error) {
  return {
    type: CREATE_NEW_DOCUMENT_ERROR,
    error,
  };
}

export function uploadFile(options) {
  return {
    type: UPLOAD_FILE,
    options,
  };
}

export function uploadFileSuccess(data) {
  return {
    type: UPLOAD_FILE_SUCCESS,
    data,
  };
}

export function uploadFileError(error) {
  return {
    type: UPLOAD_FILE_ERROR,
    error,
  };
}

export function cleanUploadFile() {
  return {
    type: CLEAN_UPLOAD_FILE,
  };
}

export function faqSearch(options) {
  return {
    type: FAQ_SEARCH,
    options,
  };
}

export function faqSearchSuccess(data) {
  return {
    type: FAQ_SEARCH_SUCCESS,
    data,
  };
}

export function faqSearchError(error) {
  return {
    type: FAQ_SEARCH_ERROR,
    error,
  };
}

export function faqSearchMore(options) {
  return {
    type: FAQ_SEARCH_MORE,
    options,
  };
}

export function faqSearchMoreSuccess(data) {
  return {
    type: FAQ_SEARCH_MORE_SUCCESS,
    data,
  };
}

export function faqSearchMoreError(error) {
  return {
    type: FAQ_SEARCH_MORE_ERROR,
    error,
  };
}

export function widgetList(options) {
  return {
    type: WIDGET_LIST,
    options,
  };
}

export function widgetListSuccess(data) {
  return {
    type: WIDGET_LIST_SUCCESS,
    data,
  };
}

export function widgetListError(error) {
  return {
    type: WIDGET_LIST_ERROR,
    error,
  };
}

export function widgetListOrder(data) {
  return {
    type: WIDGET_LIST_ORDER,
    data,
  };
}

/*
 *
 * BrowseAll actions
 *
 */

import {
  GET_FILE_TYPE,
  GET_FILE_TYPE_SUCCESS,
  GET_FILE_TYPE_ERROR,
  GET_COMMUNITY_LIST,
  GET_COMMUNITY_LIST_SUCCESS,
  GET_COMMUNITY_LIST_ERROR,
  GET_AUTHOR_LIST,
  GET_AUTHOR_LIST_SUCCESS,
  GET_AUTHOR_LIST_ERROR,
  GET_FILE_LIST,
  GET_FILE_LIST_SUCCESS,
  GET_FILE_LIST_ERROR,
  SEARCH_FILE_LIST,
  DOWNLOAD_ALL,
  DOWNLOAD_ALL_SUCCESS,
  DOWNLOAD_ALL_ERROR,
  GET_FILE_LIST_MORE,
  GET_FILE_LIST_MORE_SUCCESS,
  GET_FILE_LIST_MORE_ERROR,
} from './constants';

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

export function getCommunityList(options) {
  return {
    type: GET_COMMUNITY_LIST,
    options,
  };
}

export function getCommunityListSuccess(data) {
  return {
    type: GET_COMMUNITY_LIST_SUCCESS,
    data,
  };
}

export function getCommunityListError(error) {
  return {
    type: GET_COMMUNITY_LIST_ERROR,
    error,
  };
}

export function getAuthorList(options) {
  return {
    type: GET_AUTHOR_LIST,
    options,
  };
}

export function getAuthorListSuccess(data) {
  return {
    type: GET_AUTHOR_LIST_SUCCESS,
    data,
  };
}

export function getAuthorListError(error) {
  return {
    type: GET_AUTHOR_LIST_ERROR,
    error,
  };
}

export function getFileList(options) {
  return {
    type: GET_FILE_LIST,
    options,
  };
}

export function getFileListSuccess(data) {
  return {
    type: GET_FILE_LIST_SUCCESS,
    data,
  };
}

export function getFileListError(error) {
  return {
    type: GET_FILE_LIST_ERROR,
    error,
  };
}

export function searchFileList(options) {
  return {
    type: SEARCH_FILE_LIST,
    options,
  };
}

export function downloadAll(options) {
  return {
    type: DOWNLOAD_ALL,
    options,
  };
}

export function downloadAllSuccess() {
  return {
    type: DOWNLOAD_ALL_SUCCESS,
  };
}

export function downloadAllError(error) {
  return {
    type: DOWNLOAD_ALL_ERROR,
    error,
  };
}

export function getFileListMore(options) {
  return {
    type: GET_FILE_LIST_MORE,
    options,
  };
}

export function getFileListMoreSuccess(data) {
  return {
    type: GET_FILE_LIST_MORE_SUCCESS,
    data,
  };
}

export function getFileListMoreError(error) {
  return {
    type: GET_FILE_LIST_MORE_ERROR,
    error,
  };
}

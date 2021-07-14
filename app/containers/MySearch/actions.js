/*
 *
 * MySearch actions
 *
 */

import {
  SUGGESTION,
  SUGGESTION_SUCCESS,
  SUGGESTION_ERROR,
  EXTERNAL_SITES,
  EXTERNAL_SITES_SUCCESS,
  EXTERNAL_SITES_ERROR,
  SEARCH,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  SEARCH_MORE,
  SEARCH_MORE_SUCCESS,
  SEARCH_MORE_ERROR,
  GET_FILE_TYPE,
  GET_FILE_TYPE_SUCCESS,
  GET_FILE_TYPE_ERROR,
  GET_COMMUNITY_LIST,
  GET_COMMUNITY_LIST_SUCCESS,
  GET_COMMUNITY_LIST_ERROR,
  GET_AUTHOR_LIST,
  GET_AUTHOR_LIST_SUCCESS,
  GET_AUTHOR_LIST_ERROR,
  COMMUNITY_FILES,
  COMMUNITY_FILES_SUCCESS,
  COMMUNITY_FILES_ERROR,
  COMMUNITY_FILES_MORE,
  COMMUNITY_FILES_MORE_SUCCESS,
  COMMUNITY_FILES_MORE_ERROR,
} from './constants';

export function suggestion(options, config) {
  return {
    type: SUGGESTION,
    options,
    config,
  };
}

export function suggestionSuccess(data) {
  return {
    type: SUGGESTION_SUCCESS,
    data,
  };
}

export function suggestionError(error) {
  return {
    type: SUGGESTION_ERROR,
    error,
  };
}

export function externalSites(options) {
  return {
    type: EXTERNAL_SITES,
    options,
  };
}

export function externalSitesSuccess(data) {
  return {
    type: EXTERNAL_SITES_SUCCESS,
    data,
  };
}

export function externalSitesError(error) {
  return {
    type: EXTERNAL_SITES_ERROR,
    error,
  };
}

export function search(options) {
  return {
    type: SEARCH,
    options,
  };
}

export function searchSuccess(data) {
  return {
    type: SEARCH_SUCCESS,
    data,
  };
}

export function searchError(error) {
  return {
    type: SEARCH_ERROR,
    error,
  };
}

export function searchMore(options) {
  return {
    type: SEARCH_MORE,
    options,
  };
}

export function searchMoreSuccess(data) {
  return {
    type: SEARCH_MORE_SUCCESS,
    data,
  };
}

export function searchMoreError(error) {
  return {
    type: SEARCH_MORE_ERROR,
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

export function communityFiles(options) {
  return {
    type: COMMUNITY_FILES,
    options,
  };
}

export function communityFilesSuccess(data) {
  return {
    type: COMMUNITY_FILES_SUCCESS,
    data,
  };
}

export function communityFilesError(error) {
  return {
    type: COMMUNITY_FILES_ERROR,
    error,
  };
}

export function communityFilesMore(options) {
  return {
    type: COMMUNITY_FILES_MORE,
    options,
  };
}

export function communityFilesMoreSuccess(data) {
  return {
    type: COMMUNITY_FILES_MORE_SUCCESS,
    data,
  };
}

export function communityFilesMoreError(error) {
  return {
    type: COMMUNITY_FILES_MORE_ERROR,
    error,
  };
}

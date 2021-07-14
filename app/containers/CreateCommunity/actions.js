/*
 *
 * CreateCommunity actions
 *
 */

import {
  COMMUNITY_GROUP_LIST,
  COMMUNITY_GROUP_LIST_SUCCESS,
  COMMUNITY_GROUP_LIST_ERROR,
  TAB_TYPE_LIST,
  TAB_TYPE_LIST_SUCCESS,
  TAB_TYPE_LIST_ERROR,
  CREATE_COMMUNITY,
  CREATE_COMMUNITY_SUCCESS,
  CREATE_COMMUNITY_ERROR,
  CLEAN_CREATE_COMMUNITY,
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  COMMUNITY,
  COMMUNITY_SUCCESS,
  COMMUNITY_ERROR,
  DELETE_TAB,
  DELETE_TAB_SUCCESS,
  DELETE_TAB_ERROR,
  RESET_COMMUNITY,
  HAS_CONTENT,
  HAS_CONTENT_SUCCESS,
  HAS_CONTENT_ERROR,
  JOINED_TEAMS,
  JOINED_TEAMS_SUCCESS,
  JOINED_TEAMS_ERROR,
  LIST_CHANNELS,
  LIST_CHANNELS_SUCCESS,
  LIST_CHANNELS_ERROR,
  FILES_FOLDER,
  FILES_FOLDER_SUCCESS,
  FILES_FOLDER_ERROR,
} from './constants';

export function communityGroupList() {
  return {
    type: COMMUNITY_GROUP_LIST,
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

export function tabTypeList() {
  return {
    type: TAB_TYPE_LIST,
  };
}

export function tabTypeListSuccess(data) {
  return {
    type: TAB_TYPE_LIST_SUCCESS,
    data,
  };
}

export function tabTypeListError(error) {
  return {
    type: TAB_TYPE_LIST_ERROR,
    error,
  };
}

export function createCommunity(options) {
  return {
    type: CREATE_COMMUNITY,
    options,
  };
}

export function createCommunitySuccess() {
  return {
    type: CREATE_COMMUNITY_SUCCESS,
  };
}

export function createCommunityError(error) {
  return {
    type: CREATE_COMMUNITY_ERROR,
    error,
  };
}

export function cleanCreateCommunity() {
  return {
    type: CLEAN_CREATE_COMMUNITY,
  };
}

export function uploadFile(field, formData) {
  return {
    type: UPLOAD_FILE,
    field,
    formData,
  };
}

export function uploadFileSuccess(field, data) {
  return {
    type: UPLOAD_FILE_SUCCESS,
    field,
    data,
  };
}

export function uploadFileError(error) {
  return {
    type: UPLOAD_FILE_ERROR,
    error,
  };
}

export function community(options) {
  return {
    type: COMMUNITY,
    options,
  };
}

export function communitySuccess(data) {
  return {
    type: COMMUNITY_SUCCESS,
    data,
  };
}

export function communityError(error) {
  return {
    type: COMMUNITY_ERROR,
    error,
  };
}

export function deleteTab(communityUid, options) {
  return {
    type: DELETE_TAB,
    communityUid,
    options,
  };
}

export function deleteTabSuccess(tabUid) {
  return {
    type: DELETE_TAB_SUCCESS,
    tabUid,
  };
}

export function deleteTabError(error) {
  return {
    type: DELETE_TAB_ERROR,
    error,
  };
}

export function resetCommunity() {
  return {
    type: RESET_COMMUNITY,
  };
}

export function hasContent(options) {
  return {
    type: HAS_CONTENT,
    options,
  };
}

export function hasContentSuccess(options, data) {
  return {
    type: HAS_CONTENT_SUCCESS,
    options,
    data,
  };
}

export function hasContentError(error) {
  return {
    type: HAS_CONTENT_ERROR,
    error,
  };
}

export function joinedTeams() {
  return {
    type: JOINED_TEAMS,
  };
}

export function joinedTeamsSuccess(data) {
  return {
    type: JOINED_TEAMS_SUCCESS,
    data,
  };
}

export function joinedTeamsError(error) {
  return {
    type: JOINED_TEAMS_ERROR,
    error,
  };
}

export function listChannels(teamId) {
  return {
    type: LIST_CHANNELS,
    teamId,
  };
}

export function listChannelsSuccess(data) {
  return {
    type: LIST_CHANNELS_SUCCESS,
    data,
  };
}

export function listChannelsError(error) {
  return {
    type: LIST_CHANNELS_ERROR,
    error,
  };
}

export function filesFolder(tabUid, teamId, channelId) {
  return {
    type: FILES_FOLDER,
    tabUid,
    teamId,
    channelId,
  };
}

export function filesFolderSuccess(data) {
  return {
    type: FILES_FOLDER_SUCCESS,
    data,
  };
}

export function filesFolderError(error) {
  return {
    type: FILES_FOLDER_ERROR,
    error,
  };
}

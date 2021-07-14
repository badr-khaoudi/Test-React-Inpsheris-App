/*
 *
 * CreatePin actions
 *
 */

import {
  PINNED_POST_TYPE,
  PINNED_POST_TYPE_SUCCESS,
  PINNED_POST_TYPE_ERROR,
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CREATE_PINNED_POST,
  CREATE_PINNED_POST_SUCCESS,
  CREATE_PINNED_POST_ERROR,
  EDIT_PINNED_POST,
  EDIT_PINNED_POST_SUCCESS,
  EDIT_PINNED_POST_ERROR,
  GET_EMBED_URL,
  GET_EMBED_URL_SUCCESS,
  GET_EMBED_URL_ERROR,
  GET_OEMBED,
  GET_OEMBED_SUCCESS,
  GET_OEMBED_ERROR,
  CLEAN_CREATE_PIN,
} from './constants';

export function pinnedPostType() {
  return {
    type: PINNED_POST_TYPE,
  };
}

export function pinnedPostTypeSuccess(data) {
  return {
    type: PINNED_POST_TYPE_SUCCESS,
    data,
  };
}

export function pinnedPostTypeError(error) {
  return {
    type: PINNED_POST_TYPE_ERROR,
    error,
  };
}

export function uploadFile(formData) {
  return {
    type: UPLOAD_FILE,
    formData,
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

export function createPinnedPost(options) {
  return {
    type: CREATE_PINNED_POST,
    options,
  };
}

export function createPinnedPostSuccess(data) {
  return {
    type: CREATE_PINNED_POST_SUCCESS,
    data,
  };
}

export function createPinnedPostError(error) {
  return {
    type: CREATE_PINNED_POST_ERROR,
    error,
  };
}

export function editPinnedPost(options) {
  return {
    type: EDIT_PINNED_POST,
    options,
  };
}

export function editPinnedPostSuccess(data) {
  return {
    type: EDIT_PINNED_POST_SUCCESS,
    data,
  };
}

export function editPinnedPostError(error) {
  return {
    type: EDIT_PINNED_POST_ERROR,
    error,
  };
}

export function getEmbedUrl(options) {
  return {
    type: GET_EMBED_URL,
    options,
  };
}

export function getEmbedUrlSuccess(data) {
  return {
    type: GET_EMBED_URL_SUCCESS,
    data,
  };
}

export function getEmbedUrlError(error) {
  return {
    type: GET_EMBED_URL_ERROR,
    error,
  };
}

export function getOEmbed(options) {
  return {
    type: GET_OEMBED,
    options,
  };
}

export function getOEmbedSuccess(data) {
  return {
    type: GET_OEMBED_SUCCESS,
    data,
  };
}

export function getOEmbedError(error) {
  return {
    type: GET_OEMBED_ERROR,
    error,
  };
}

export function cleanCreatePin() {
  return {
    type: CLEAN_CREATE_PIN,
  };
}

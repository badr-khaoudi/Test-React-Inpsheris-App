/*
 *
 * ContentCreation actions
 *
 */

import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CLEAN_UPLOAD_FILE,
  USER_COMMUNITY,
  USER_COMMUNITY_SUCCESS,
  USER_COMMUNITY_ERROR,
  TEMPLATE_TYPE,
  TEMPLATE_TYPE_SUCCESS,
  TEMPLATE_TYPE_ERROR,
  CONTENT_CREATION_EVENT,
  CONTENT_CREATION_ARTICLE,
  CONTENT_CREATION_GRAND_ARTICLE,
  CONTENT_CREATION_IMAGE_GALLERY,
  CONTENT_CREATION_DOCUMENT,
  CONTENT_CREATION_SUCCESS,
  CONTENT_CREATION_ERROR,
  CLEAN_CONTENT_CREATION,
  GET_CONTENT_DETAILS,
  GET_CONTENT_DETAILS_SUCCESS,
  GET_CONTENT_DETAILS_ERROR,
  CLEAN_CONTENT_DETAILS,
} from './constants';

export function uploadFile(field, data) {
  return {
    type: UPLOAD_FILE,
    field,
    data,
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

export function cleanUploadFile() {
  return {
    type: CLEAN_UPLOAD_FILE,
  };
}

export function userCommunity(options) {
  return {
    type: USER_COMMUNITY,
    options,
  };
}

export function userCommunitySuccess(data) {
  return {
    type: USER_COMMUNITY_SUCCESS,
    data,
  };
}

export function userCommunityError(error) {
  return {
    type: USER_COMMUNITY_ERROR,
    error,
  };
}

export function templateType() {
  return {
    type: TEMPLATE_TYPE,
  };
}

export function templateTypeSuccess(data) {
  return {
    type: TEMPLATE_TYPE_SUCCESS,
    data,
  };
}

export function templateTypeError(error) {
  return {
    type: TEMPLATE_TYPE_ERROR,
    error,
  };
}

export function createEvent(content) {
  return {
    type: CONTENT_CREATION_EVENT,
    content,
  };
}

export function createArticle(content) {
  return {
    type: CONTENT_CREATION_ARTICLE,
    content,
  };
}

export function createGrandArticle(content) {
  return {
    type: CONTENT_CREATION_GRAND_ARTICLE,
    content,
  };
}

export function createImageGallery(content) {
  return {
    type: CONTENT_CREATION_IMAGE_GALLERY,
    content,
  };
}

export function createDocument(content) {
  return {
    type: CONTENT_CREATION_DOCUMENT,
    content,
  };
}

export function contentCreationSuccess() {
  return {
    type: CONTENT_CREATION_SUCCESS,
  };
}

export function contentCreationError(error) {
  return {
    type: CONTENT_CREATION_ERROR,
    error,
  };
}

export function cleanContentCreation() {
  return {
    type: CLEAN_CONTENT_CREATION,
  };
}

export function getContentDetails(options) {
  return {
    type: GET_CONTENT_DETAILS,
    options,
  };
}

export function getContentDetailsSuccess() {
  return {
    type: GET_CONTENT_DETAILS_SUCCESS,
  };
}

export function getContentDetailsError(error) {
  return {
    type: GET_CONTENT_DETAILS_ERROR,
    error,
  };
}

export function cleanContentDetails() {
  return {
    type: CLEAN_CONTENT_DETAILS,
  };
}

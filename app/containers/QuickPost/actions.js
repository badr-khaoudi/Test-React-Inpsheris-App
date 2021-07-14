/*
 *
 * QuickPost actions
 *
 */

import {
  CREATE_QUICKPOST,
  CREATE_QUICKPOST_SUCCESS,
  CREATE_QUICKPOST_ERROR,
  GET_CONTENT_DETAILS,
  GET_CONTENT_DETAILS_SUCCESS,
  GET_CONTENT_DETAILS_ERROR,
  ENABLE_PUBLISH,
  DISABLE_PUBLISH,
  RESET_QUICKPOST,
  CREATE_FAQ,
  QUICK_SHARING_OF_THE_LINK,
  GET_EMBED_URL,
  GET_EMBED_URL_SUCCESS,
  GET_EMBED_URL_ERROR,
  GET_OEMBED,
  GET_OEMBED_SUCCESS,
  GET_OEMBED_ERROR,
} from './constants';

export function createQuickPost(options) {
  return {
    type: CREATE_QUICKPOST,
    options,
  };
}

export function createQuickPostSuccess() {
  return {
    type: CREATE_QUICKPOST_SUCCESS,
  };
}

export function createQuickPostError(error) {
  return {
    type: CREATE_QUICKPOST_ERROR,
    error,
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

export function enablePublish() {
  return {
    type: ENABLE_PUBLISH,
  };
}

export function disablePublish() {
  return {
    type: DISABLE_PUBLISH,
  };
}

export function resetQuickPost() {
  return {
    type: RESET_QUICKPOST,
  };
}

export function createFAQ(options) {
  return {
    type: CREATE_FAQ,
    options,
  };
}

export function quickSharingOfTheLink(options) {
  return {
    type: QUICK_SHARING_OF_THE_LINK,
    options,
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

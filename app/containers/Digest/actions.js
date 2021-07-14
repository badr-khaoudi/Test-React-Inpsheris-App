/*
 *
 * Digest actions
 *
 */

import {
  DIGEST_LIST,
  DIGEST_LIST_SUCCESS,
  DIGEST_LIST_ERROR,
  ADD_DIGEST,
  DIGEST_ENTITIES_UPDATE,
  ACTIVATE_DIGEST,
  ACTIVATE_DIGEST_SUCCESS,
  ACTIVATE_DIGEST_ERROR,
  CAROUSEL_LIST,
  CAROUSEL_LIST_SUCCESS,
  CAROUSEL_LIST_ERROR,
  PINNED_CONTENT,
  PINNED_CONTENT_SUCCESS,
  PINNED_CONTENT_ERROR,
  DELETE_DIGEST,
  DELETE_DIGEST_SUCCESS,
  DELETE_DIGEST_ERROR,
} from './constants';

export function digestList(options) {
  return {
    type: DIGEST_LIST,
    options,
  };
}

export function digestListSuccess(data, response) {
  return {
    type: DIGEST_LIST_SUCCESS,
    data,
    response,
  };
}

export function digestListError(error) {
  return {
    type: DIGEST_LIST_ERROR,
    error,
  };
}

export function addDigest(data) {
  return {
    type: ADD_DIGEST,
    data,
  };
}

export function digestEntitiesUpdate(data) {
  return {
    type: DIGEST_ENTITIES_UPDATE,
    data,
  };
}

export function activateDigest(params, options) {
  return {
    type: ACTIVATE_DIGEST,
    params,
    options,
  };
}

export function activateDigestSuccess(params, options) {
  return {
    type: ACTIVATE_DIGEST_SUCCESS,
    params,
    options,
  };
}

export function activateDigestError(error) {
  return {
    type: ACTIVATE_DIGEST_ERROR,
    error,
  };
}

export function carouselList() {
  return {
    type: CAROUSEL_LIST,
  };
}

export function carouselListSuccess(data) {
  return {
    type: CAROUSEL_LIST_SUCCESS,
    data,
  };
}

export function carouselListError(error) {
  return {
    type: CAROUSEL_LIST_ERROR,
    error,
  };
}

export function pinnedContent() {
  return {
    type: PINNED_CONTENT,
  };
}

export function pinnedContentSuccess(data) {
  return {
    type: PINNED_CONTENT_SUCCESS,
    data,
  };
}

export function pinnedContentError(error) {
  return {
    type: PINNED_CONTENT_ERROR,
    error,
  };
}

export function deleteDigest(options) {
  return {
    type: DELETE_DIGEST,
    options,
  };
}

export function deleteDigestSuccess(options) {
  return {
    type: DELETE_DIGEST_SUCCESS,
    options,
  };
}

export function deleteDigestError(error) {
  return {
    type: DELETE_DIGEST_ERROR,
    error,
  };
}

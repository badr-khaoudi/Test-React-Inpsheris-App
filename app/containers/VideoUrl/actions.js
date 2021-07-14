/*
 *
 * VideoUrl actions
 *
 */

import {
  GET_EMBED_URL,
  GET_EMBED_URL_SUCCESS,
  GET_EMBED_URL_ERROR,
  GET_OEMBED,
  GET_OEMBED_SUCCESS,
  GET_OEMBED_ERROR,
  CLEAN_OEMBED,
} from './constants';

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

export function cleanOEmbed() {
  return {
    type: CLEAN_OEMBED,
  };
}

/*
 *
 * Feed actions
 *
 */

import {
  TRANSLATE_CONTENT,
  TRANSLATE_CONTENT_SUCCESS,
  TRANSLATE_CONTENT_ERROR,
  COMMENT_LIST,
  COMMENT_LIST_SUCCESS,
  COMMENT_LIST_ERROR,
} from './constants';

export function translateContent(options) {
  return {
    type: TRANSLATE_CONTENT,
    options,
  };
}

export function translateContentSuccess(data) {
  return {
    type: TRANSLATE_CONTENT_SUCCESS,
    data,
  };
}

export function translateContentError(error) {
  return {
    type: TRANSLATE_CONTENT_ERROR,
    error,
  };
}

export function commentList(options) {
  return {
    type: COMMENT_LIST,
    options,
  };
}

export function commentListSuccess(data) {
  return {
    type: COMMENT_LIST_SUCCESS,
    data,
  };
}

export function commentListError(error) {
  return {
    type: COMMENT_LIST_ERROR,
    error,
  };
}

/*
 *
 * GrandArticle actions
 *
 */

import { CONTENT, CONTENT_SUCCESS, CONTENT_ERROR } from './constants';

export function content(options) {
  return {
    type: CONTENT,
    options,
  };
}

export function contentSuccess() {
  return {
    type: CONTENT_SUCCESS,
  };
}

export function contentError(error) {
  return {
    type: CONTENT_ERROR,
    error,
  };
}

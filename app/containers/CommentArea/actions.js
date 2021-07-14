/*
 *
 * CommentArea actions
 *
 */

import {
  COMMENT,
  COMMENT_EDIT,
  COMMENT_SUCCESS,
  COMMENT_ERROR,
  RESET_COMMENT,
} from './constants';

export function comment(options) {
  return {
    type: COMMENT,
    options,
  };
}

export function commentEdit(options) {
  return {
    type: COMMENT_EDIT,
    options,
  };
}

export function commentSuccess() {
  return {
    type: COMMENT_SUCCESS,
  };
}

export function commentError(error) {
  return {
    type: COMMENT_ERROR,
    error,
  };
}

export function resetComment(error) {
  return {
    type: RESET_COMMENT,
    error,
  };
}

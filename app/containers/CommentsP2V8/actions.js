/*
 *
 * CommentsP2V8 actions
 *
 */

import {
  COMMENTS,
  COMMENTS_SUCCESS,
  COMMENTS_ERROR,
  OPEN_EDIT_COMMENT,
  CLOSE_EDIT_COMMENT,
} from './constants';

export function comments(options) {
  return {
    type: COMMENTS,
    options,
  };
}

export function commentsSuccess(options) {
  return {
    type: COMMENTS_SUCCESS,
    options,
  };
}

export function commentsError(error) {
  return {
    type: COMMENTS_ERROR,
    error,
  };
}

export function openEditComment(options) {
  return {
    type: OPEN_EDIT_COMMENT,
    options,
  };
}

export function closeEditComment() {
  return {
    type: CLOSE_EDIT_COMMENT,
  };
}

/*
 *
 * InteractionStatistics actions
 *
 */

import {
  LIST_COMMENT_LIKE,
  LIST_COMMENT_LIKE_SUCCESS,
  LIST_COMMENT_LIKE_ERROR,
} from './constants';

export function listCommentLike(options, cancelToken) {
  return {
    type: LIST_COMMENT_LIKE,
    options,
    cancelToken,
  };
}

export function listCommentLikeSuccess(data) {
  return {
    type: LIST_COMMENT_LIKE_SUCCESS,
    data,
  };
}

export function listCommentLikeError(error) {
  return {
    type: LIST_COMMENT_LIKE_ERROR,
    error,
  };
}

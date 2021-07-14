/*
 *
 * InteractionStatistics reducer
 *
 */
import produce from 'immer';
import {
  LIST_COMMENT_LIKE,
  LIST_COMMENT_LIKE_SUCCESS,
  LIST_COMMENT_LIKE_ERROR,
} from './constants';

export const initialState = {
  listCommentLike: {},
  listCommentLikeSuccess: false,
  listCommentLikeLoading: false,
  listCommentLikeError: '',
};

/* eslint-disable default-case, no-param-reassign */
const interactionStatisticsReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case LIST_COMMENT_LIKE:
        draft.listCommentLike = {};
        draft.listCommentLikeLoading = true;
        draft.listCommentLikeSuccess = false;
        draft.listCommentLikeError = '';
        break;
      case LIST_COMMENT_LIKE_SUCCESS:
        draft.listCommentLike = action.data;
        draft.listCommentLikeLoading = false;
        draft.listCommentLikeSuccess = true;
        draft.listCommentLikeError = '';
        break;
      case LIST_COMMENT_LIKE_ERROR:
        draft.listCommentLikeLoading = false;
        draft.listCommentLikeSuccess = false;
        draft.listCommentLikeError = action.error;
        break;
      default:
        return state;
    }
  });

export default interactionStatisticsReducer;

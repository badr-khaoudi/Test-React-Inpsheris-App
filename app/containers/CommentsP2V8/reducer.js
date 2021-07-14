/*
 *
 * CommentsP2V8 reducer
 *
 */
import produce from 'immer';
import {
  COMMENTS,
  COMMENTS_SUCCESS,
  COMMENTS_ERROR,
  OPEN_EDIT_COMMENT,
  CLOSE_EDIT_COMMENT,
} from './constants';

export const initialState = {
  commentsPage: {},
  commentsLoading: false,
  commentsSuccess: false,
  commentsError: '',
  openEditComment: false,
  commentUid: undefined,
};

/* eslint-disable default-case, no-param-reassign */
const commentsP2V8Reducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case COMMENTS:
        if (action.options.lastTwoComments) {
          draft.commentsPage[
            [action.options.content || action.options.followerQuickpostUid]
          ] = 0;
        }
        draft.commentsLoading = true;
        draft.commentsSuccess = false;
        draft.commentsError = '';
        break;
      case COMMENTS_SUCCESS:
        draft.commentsPage[
          [action.options.content || action.options.followerQuickpostUid]
        ] += 1;
        draft.commentsLoading = false;
        draft.commentsSuccess = true;
        draft.commentsError = '';
        break;
      case COMMENTS_ERROR:
        draft.commentsLoading = false;
        draft.commentsSuccess = false;
        draft.commentsError = action.error;
        break;
      case OPEN_EDIT_COMMENT:
        draft.openEditComment = true;
        draft.commentUid = action.options;
        break;
      case CLOSE_EDIT_COMMENT:
        draft.openEditComment = false;
        draft.commentUid = undefined;
        break;
      default:
        return state;
    }
  });

export default commentsP2V8Reducer;

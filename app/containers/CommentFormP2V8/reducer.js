/*
 *
 * CommentFormP2V8 reducer
 *
 */
import produce from 'immer';
import {
  COMMENT,
  COMMENT_SUCCESS,
  COMMENT_ERROR,
  RESET_COMMENT,
} from './constants';

export const initialState = {
  commentLoading: false,
  commentSuccess: false,
  commentError: '',
};

/* eslint-disable default-case, no-param-reassign */
const commentFormP2V8Reducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case COMMENT:
        draft.commentLoading = true;
        draft.commentSuccess = false;
        draft.commentError = '';
        break;
      case COMMENT_SUCCESS:
        draft.commentLoading = false;
        draft.commentSuccess = true;
        draft.commentError = '';
        break;
      case COMMENT_ERROR:
        draft.commentLoading = false;
        draft.commentSuccess = false;
        draft.commentError = action.error;
        break;
      case RESET_COMMENT:
        draft.commentLoading = false;
        draft.commentSuccess = false;
        draft.commentError = '';
        break;
      default:
        return state;
    }
  });

export default commentFormP2V8Reducer;

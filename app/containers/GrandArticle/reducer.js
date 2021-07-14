/*
 *
 * GrandArticle reducer
 *
 */
import produce from 'immer';
import { CONTENT, CONTENT_SUCCESS, CONTENT_ERROR } from './constants';

export const initialState = {
  contentLoading: false,
  contentSuccess: false,
  contentError: '',
};

/* eslint-disable default-case, no-param-reassign */
const grandArticleReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case CONTENT:
        draft.contentLoading = true;
        draft.contentSuccess = false;
        draft.contentError = '';
        break;
      case CONTENT_SUCCESS:
        draft.contentLoading = false;
        draft.contentSuccess = true;
        draft.contentError = '';
        break;
      case CONTENT_ERROR:
        draft.contentLoading = false;
        draft.contentSuccess = false;
        draft.contentError = action.error;
        break;
      default:
        return state;
    }
  });

export default grandArticleReducer;

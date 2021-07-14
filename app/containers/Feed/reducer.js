/*
 *
 * Feed reducer
 *
 */
import produce from 'immer';
import _ from 'lodash';
import {
  TRANSLATE_CONTENT,
  TRANSLATE_CONTENT_SUCCESS,
  TRANSLATE_CONTENT_ERROR,
  COMMENT_LIST,
  COMMENT_LIST_SUCCESS,
  COMMENT_LIST_ERROR,
} from './constants';

export const initialState = {
  contents: [],
  translateContentLoading: false,
  translateContentSuccess: false,
  translateContentError: '',
  commentList: [],
  commentListLoading: false,
  commentListSuccess: false,
  commentListError: '',
};

/* eslint-disable default-case, no-param-reassign */
const feedReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case TRANSLATE_CONTENT:
        draft.translateContentLoading = true;
        draft.translateContentSuccess = false;
        draft.translateContentError = '';
        break;
      case TRANSLATE_CONTENT_SUCCESS: {
        const uid = action.data.sourceId || action.data.uid;
        draft.contents = [
          ..._.filter(draft.contents, content => content.sourceId !== uid),
          { ...action.data, sourceId: uid },
        ];
        draft.translateContentLoading = false;
        draft.translateContentSuccess = true;
        draft.translateContentError = '';
        break;
      }
      case TRANSLATE_CONTENT_ERROR:
        draft.translateContentLoading = false;
        draft.translateContentSuccess = false;
        draft.translateContentError = action.error;
        break;
      case COMMENT_LIST:
        draft.commentList = [];
        draft.commentListLoading = true;
        draft.commentListSuccess = false;
        draft.commentListError = '';
        break;
      case COMMENT_LIST_SUCCESS:
        draft.commentList = action.data;
        draft.commentListLoading = false;
        draft.commentListSuccess = true;
        draft.commentListError = '';
        break;
      case COMMENT_LIST_ERROR:
        draft.commentListLoading = false;
        draft.commentListSuccess = false;
        draft.commentListError = action.error;
        break;
      default:
        return state;
    }
  });

export default feedReducer;

/*
 *
 * LikedArticles reducer
 *
 */
import produce from 'immer';
import {
  USER_LIKED_LIST,
  USER_LIKED_LIST_SUCCESS,
  USER_LIKED_LIST_ERROR,
  USER_LIKED_LIST_MORE,
  USER_LIKED_LIST_MORE_SUCCESS,
  USER_LIKED_LIST_MORE_ERROR,
} from './constants';

export const initialState = {
  userLikedList: {},
  userLikedListLoading: false,
  userLikedListSuccess: false,
  userLikedListError: '',
  userLikedListMoreLoading: false,
  userLikedListMoreSuccess: false,
  userLikedListMoreError: '',
};

/* eslint-disable default-case, no-param-reassign */
const likedArticlesReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case USER_LIKED_LIST:
        draft.userLikedList = {};
        draft.userLikedListLoading = true;
        draft.userLikedListSuccess = false;
        draft.userLikedListError = '';
        break;
      case USER_LIKED_LIST_SUCCESS:
        draft.userLikedList = action.data;
        draft.userLikedListLoading = false;
        draft.userLikedListSuccess = true;
        draft.userLikedListError = '';
        break;
      case USER_LIKED_LIST_ERROR:
        draft.userLikedListLoading = false;
        draft.userLikedListSuccess = false;
        draft.userLikedListError = action.error;
        break;
      case USER_LIKED_LIST_MORE:
        draft.userLikedListMoreLoading = true;
        draft.userLikedListMoreSuccess = false;
        draft.userLikedListMoreError = '';
        break;
      case USER_LIKED_LIST_MORE_SUCCESS:
        draft.userLikedList.rows = [
          ...draft.userLikedList.rows,
          ...action.data.rows,
        ];
        draft.userLikedListMoreLoading = false;
        draft.userLikedListMoreSuccess = true;
        draft.userLikedListMoreError = '';
        break;
      case USER_LIKED_LIST_MORE_ERROR:
        draft.userLikedListMoreLoading = false;
        draft.userLikedListMoreSuccess = false;
        draft.userLikedListMoreError = action.error;
        break;
      default:
        return state;
    }
  });

export default likedArticlesReducer;

/*
 *
 * UserLiked reducer
 *
 */
import produce from 'immer';
import { USER_LIKED, USER_LIKED_SUCCESS, USER_LIKED_ERROR } from './constants';

export const initialState = {
  userLiked: [],
  userLikedLoading: false,
  userLikedSuccess: false,
  userLikedError: '',
};

/* eslint-disable default-case, no-param-reassign */
const userLikedReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case USER_LIKED:
        draft.userLiked = [];
        draft.userLikedLoading = true;
        draft.userLikedSuccess = false;
        draft.userLikedError = '';
        break;
      case USER_LIKED_SUCCESS:
        draft.userLiked = action.data;
        draft.userLikedLoading = false;
        draft.userLikedSuccess = true;
        draft.userLikedError = '';
        break;
      case USER_LIKED_ERROR:
        draft.userLikedLoading = false;
        draft.userLikedSuccess = false;
        draft.userLikedError = action.error;
        break;
      default:
        return state;
    }
  });

export default userLikedReducer;

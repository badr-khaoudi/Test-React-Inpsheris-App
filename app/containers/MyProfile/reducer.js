/*
 *
 * MyProfile reducer
 *
 */
import produce from 'immer';
import {
  USER,
  USER_SUCCESS,
  USER_ERROR,
  AUTHOR_LIST,
  AUTHOR_LIST_SUCCESS,
  AUTHOR_LIST_ERROR,
  COMMUNITY_LIST,
  COMMUNITY_LIST_SUCCESS,
  COMMUNITY_LIST_ERROR,
  FOLLOW,
  FOLLOW_SUCCESS,
  FOLLOW_ERROR,
} from './constants';

export const initialState = {
  user: '',
  userLoading: false,
  userSuccess: false,
  userError: '',
  authorList: [],
  authorListLoading: false,
  authorListSuccess: false,
  authorListError: '',
  communityList: [],
  communityListLoading: false,
  communityListSuccess: false,
  communityListError: '',
  followLoading: false,
  followSuccess: false,
  followError: '',
};

/* eslint-disable default-case, no-param-reassign */
const myProfileReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case USER:
        draft.user = '';
        draft.userLoading = true;
        draft.userSuccess = false;
        draft.userError = '';
        break;
      case USER_SUCCESS:
        draft.user = action.data;
        draft.userLoading = false;
        draft.userSuccess = true;
        draft.userError = '';
        break;
      case USER_ERROR:
        draft.userLoading = false;
        draft.userSuccess = false;
        draft.userError = action.error;
        break;
      case AUTHOR_LIST:
        draft.authorList = [];
        draft.authorListLoading = true;
        draft.authorListSuccess = false;
        draft.authorListError = '';
        break;
      case AUTHOR_LIST_SUCCESS:
        draft.authorList = action.data;
        draft.authorListLoading = false;
        draft.authorListSuccess = true;
        draft.authorListError = '';
        break;
      case AUTHOR_LIST_ERROR:
        draft.authorListLoading = false;
        draft.authorListSuccess = false;
        draft.authorListError = action.error;
        break;
      case COMMUNITY_LIST:
        draft.communityList = [];
        draft.communityListLoading = true;
        draft.communityListSuccess = false;
        draft.communityListError = '';
        break;
      case COMMUNITY_LIST_SUCCESS:
        draft.communityList = action.data;
        draft.communityListLoading = false;
        draft.communityListSuccess = true;
        draft.communityListError = '';
        break;
      case COMMUNITY_LIST_ERROR:
        draft.communityListLoading = false;
        draft.communityListSuccess = false;
        draft.communityListError = action.error;
        break;
      case FOLLOW:
        draft.followLoading = true;
        draft.followSuccess = false;
        draft.followError = '';
        break;
      case FOLLOW_SUCCESS:
        draft.user.followed = action.options.action === 'follow';
        draft.followLoading = false;
        draft.followSuccess = true;
        draft.followError = '';
        break;
      case FOLLOW_ERROR:
        draft.followLoading = false;
        draft.followSuccess = false;
        draft.followError = action.error;
        break;
      default:
        return state;
    }
  });

export default myProfileReducer;

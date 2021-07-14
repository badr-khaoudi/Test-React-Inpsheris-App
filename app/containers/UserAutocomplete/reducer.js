/*
 *
 * UserAutocomplete reducer
 *
 */
import produce from 'immer';
import { USER_LIST, USER_LIST_SUCCESS, USER_LIST_ERROR } from './constants';

export const initialState = {
  userList: [],
  userListLoading: false,
  userListSuccess: false,
  userListError: '',
};

/* eslint-disable default-case, no-param-reassign */
const userAutocompleteReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case USER_LIST:
        draft.userList = [];
        draft.userListLoading = true;
        draft.userListSuccess = false;
        draft.userListError = '';
        break;
      case USER_LIST_SUCCESS:
        draft.userList = action.data;
        draft.userListLoading = false;
        draft.userListSuccess = true;
        draft.userListError = '';
        break;
      case USER_LIST_ERROR:
        draft.userListLoading = false;
        draft.userListSuccess = false;
        draft.userListError = action.error;
        break;
      default:
        return state;
    }
  });

export default userAutocompleteReducer;

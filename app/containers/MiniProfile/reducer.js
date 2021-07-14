/*
 *
 * MiniProfile reducer
 *
 */
import produce from 'immer';
import {
  USER_PROFILE,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_ERROR,
} from './constants';

export const initialState = {
  userProfileLoading: false,
  userProfileSuccess: false,
  userProfileError: '',
};

/* eslint-disable default-case, no-param-reassign */
const miniProfileReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case USER_PROFILE:
        draft.userProfileLoading = true;
        draft.userProfileSuccess = false;
        draft.userProfileError = '';
        break;
      case USER_PROFILE_SUCCESS:
        draft.userProfileLoading = false;
        draft.userProfileSuccess = true;
        draft.userProfileError = '';
        break;
      case USER_PROFILE_ERROR:
        draft.userProfileLoading = false;
        draft.userProfileSuccess = false;
        draft.userProfileError = action.error;
        break;
      default:
        return state;
    }
  });

export default miniProfileReducer;

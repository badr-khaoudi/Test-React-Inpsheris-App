/*
 *
 * SessionsByOrigin reducer
 *
 */
import produce from 'immer';
import {
  COUNT_COMMUNITY_MEMBER_CONNECTION,
  COUNT_COMMUNITY_MEMBER_CONNECTION_SUCCESS,
  COUNT_COMMUNITY_MEMBER_CONNECTION_ERROR,
} from './constants';

export const initialState = {
  countCommunityMemberConnection: {},
  countCommunityMemberConnectionSuccess: false,
  countCommunityMemberConnectionLoading: false,
  countCommunityMemberConnectionError: '',
};

/* eslint-disable default-case, no-param-reassign */
const sessionsByOriginReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case COUNT_COMMUNITY_MEMBER_CONNECTION:
        draft.countCommunityMemberConnection = {};
        draft.countCommunityMemberConnectionLoading = true;
        draft.countCommunityMemberConnectionSuccess = false;
        draft.countCommunityMemberConnectionError = '';
        break;
      case COUNT_COMMUNITY_MEMBER_CONNECTION_SUCCESS:
        draft.countCommunityMemberConnection = action.data;
        draft.countCommunityMemberConnectionLoading = false;
        draft.countCommunityMemberConnectionSuccess = true;
        draft.countCommunityMemberConnectionError = '';
        break;
      case COUNT_COMMUNITY_MEMBER_CONNECTION_ERROR:
        draft.countCommunityMemberConnectionLoading = false;
        draft.countCommunityMemberConnectionSuccess = false;
        draft.countCommunityMemberConnectionError = action.error;
        break;
      default:
        return state;
    }
  });

export default sessionsByOriginReducer;

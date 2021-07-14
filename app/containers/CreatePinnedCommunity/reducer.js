/*
 *
 * CreatePinnedCommunity reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  GET_PINNED_COMMUNITY,
  GET_PINNED_COMMUNITY_ERROR,
  GET_PINNED_COMMUNITY_SUCCESS,
  PINNED_COMMUNITY_RESET,
  UPDATE_PINNED_COMMUNITY,
  UPDATE_PINNED_COMMUNITY_SUCCESS,
  UPDATE_PINNED_COMMUNITY_ERROR,
} from './constants';

export const initialState = {
  isPinnedDetailLoading: false,
  isPinnedDetailFailed: false,
  pinnedCommunity: null,
  pinnedCommunityError: '',
  pinnedCommunityId: '',
  updateStatus: {
    inProgress: false,
    isSucess: false,
    error: '',
  },
};

/* eslint-disable default-case, no-param-reassign */
const createPinnedCommunityReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_PINNED_COMMUNITY:
        draft.isPinnedDetailLoading = true;
        draft.isPinnedDetailFailed = false;
        draft.pinnedCommunityError = '';
        draft.pinnedCommunityId = action.id;
        draft.pinnedCommunity = null;
        break;
      case GET_PINNED_COMMUNITY_SUCCESS:
        draft.isPinnedDetailLoading = false;
        draft.isPinnedDetailFailed = false;
        draft.pinnedCommunityError = '';
        draft.pinnedCommunity = action.data;
        break;
      case GET_PINNED_COMMUNITY_ERROR:
        draft.isPinnedDetailLoading = false;
        draft.isPinnedDetailFailed = true;
        draft.pinnedCommunity = null;
        draft.pinnedCommunityError = action.error;
        break;
      case UPDATE_PINNED_COMMUNITY:
        draft.updateStatus = {
          inProgress: true,
          isSucess: false,
          error: '',
        };
        break;
      case UPDATE_PINNED_COMMUNITY_SUCCESS:
        draft.updateStatus = {
          inProgress: false,
          isSucess: true,
          error: '',
        };
        break;
      case UPDATE_PINNED_COMMUNITY_ERROR:
        draft.updateStatus = {
          inProgress: false,
          isSucess: false,
          error: action.error,
        };
        break;
      case PINNED_COMMUNITY_RESET:
        draft.updateStatus = {
          inProgress: false,
          isSucess: false,
          error: '',
        };
        draft.isPinnedDetailLoading = false;
        draft.isPinnedDetailFailed = false;
        draft.pinnedCommunityError = '';
        draft.pinnedCommunityId = '';
        draft.pinnedCommunity = null;
        break;
      case DEFAULT_ACTION:
        break;
    }
  });

export default createPinnedCommunityReducer;

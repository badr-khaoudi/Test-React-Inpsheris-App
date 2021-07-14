/*
 *
 * Community reducer
 *
 */
import produce from 'immer';
import {
  GET_COMMUNITY_LIST,
  GET_COMMUNITY_LIST_SUCCESS,
  GET_COMMUNITY_LIST_ERROR,
  GET_COMMUNITY_GROUP_LIST,
  GET_COMMUNITY_GROUP_LIST_SUCCESS,
  GET_COMMUNITY_GROUP_LIST_ERROR,
  FILTER_COMMUNITY_LIST,
  REQUESTED_COMMUNITY,
  REQUESTED_COMMUNITY_SUCCESS,
  REQUESTED_COMMUNITY_ERROR,
  CLEAN_REQUESTED_COMMUNITY,
} from './constants';

export const initialState = {
  communityList: [],
  communityListLoading: false,
  communityListSuccess: false,
  communityListError: '',
  communityGroupList: [],
  communityGroupListLoading: false,
  communityGroupListSuccess: false,
  communityGroupListError: '',
  requestedCommunityLoading: false,
  requestedCommunitySuccess: false,
  requestedCommunityError: '',
};

/* eslint-disable default-case, no-param-reassign */
const communityReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case GET_COMMUNITY_LIST:
        draft.communityList = [];
        draft.communityListLoading = true;
        draft.communityListSuccess = false;
        draft.communityListError = '';
        break;
      case GET_COMMUNITY_LIST_SUCCESS:
        draft.communityList = action.data;
        draft.communityListLoading = false;
        draft.communityListSuccess = true;
        draft.communityListError = '';
        break;
      case GET_COMMUNITY_LIST_ERROR:
        draft.communityListLoading = false;
        draft.communityListSuccess = false;
        draft.communityListError = action.error;
        break;
      case GET_COMMUNITY_GROUP_LIST:
        draft.communityGroupListLoading = true;
        draft.communityGroupListSuccess = false;
        draft.communityGroupListError = '';
        break;
      case GET_COMMUNITY_GROUP_LIST_SUCCESS:
        draft.communityGroupList = action.data;
        draft.communityGroupListLoading = false;
        draft.communityGroupListSuccess = true;
        draft.communityGroupListError = '';
        break;
      case GET_COMMUNITY_GROUP_LIST_ERROR:
        draft.communityGroupListLoading = false;
        draft.communityGroupListSuccess = false;
        draft.communityGroupListError = action.error;
        break;
      case FILTER_COMMUNITY_LIST:
        draft.communityList = [];
        draft.communityListLoading = true;
        draft.communityListSuccess = false;
        draft.communityListError = '';
        break;
      case REQUESTED_COMMUNITY:
        draft.requestedCommunityLoading = true;
        draft.requestedCommunitySuccess = false;
        draft.requestedCommunityError = '';
        break;
      case REQUESTED_COMMUNITY_SUCCESS:
        draft.requestedCommunityLoading = false;
        draft.requestedCommunitySuccess = true;
        draft.requestedCommunityError = '';
        break;
      case REQUESTED_COMMUNITY_ERROR:
        draft.requestedCommunityLoading = false;
        draft.requestedCommunitySuccess = false;
        draft.requestedCommunityError = action.error;
        break;
      case CLEAN_REQUESTED_COMMUNITY:
        draft.requestedCommunityLoading = false;
        draft.requestedCommunitySuccess = false;
        draft.requestedCommunityError = '';
        break;
      default:
        return state;
    }
  });

export default communityReducer;

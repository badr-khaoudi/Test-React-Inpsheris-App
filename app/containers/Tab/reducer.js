/* eslint-disable indent */
/*
 *
 * Tab reducer
 *
 */
import produce from 'immer';
// import _ from 'lodash';
import {
  GET_COMMUNITY_LIST,
  GET_COMMUNITY_LIST_SUCCESS,
  GET_COMMUNITY_LIST_ERROR,
  GET_COMMUNITY_TAB,
  GET_COMMUNITY_TAB_SUCCESS,
  GET_COMMUNITY_TAB_ERROR,
  GET_COMMUNITY_TAB_MORE,
  GET_COMMUNITY_TAB_MORE_SUCCESS,
  GET_COMMUNITY_TAB_MORE_ERROR,
} from './constants';

export const initialState = {
  communityList: [],
  communityListLoading: false,
  communityListSuccess: false,
  communityListError: '',
  communityTab: {},
  communityTabLoading: false,
  communityTabSuccess: false,
  communityTabError: '',
};

/* eslint-disable default-case, no-param-reassign */
const tabReducer = (state = initialState, action) =>
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
      case GET_COMMUNITY_TAB:
        draft.communityTab = {};
        draft.communityTabLoading = true;
        draft.communityTabSuccess = false;
        draft.communityTabError = '';
        break;
      case GET_COMMUNITY_TAB_SUCCESS:
        draft.communityTab = action.data;
        draft.communityTabLoading = false;
        draft.communityTabSuccess = true;
        draft.communityTabError = '';
        break;
      case GET_COMMUNITY_TAB_ERROR:
        draft.communityTabLoading = false;
        draft.communityTabSuccess = false;
        draft.communityTabError = action.error;
        break;
      case GET_COMMUNITY_TAB_MORE:
        draft.communityTabLoading = true;
        draft.communityTabSuccess = false;
        draft.communityTabError = '';
        break;
      case GET_COMMUNITY_TAB_MORE_SUCCESS:
        draft.communityTab = {
          contents: [...draft.communityTab.contents, ...action.data.contents],
        };
        draft.communityTabLoading = false;
        draft.communityTabSuccess = true;
        draft.communityTabError = '';
        break;
      case GET_COMMUNITY_TAB_MORE_ERROR:
        draft.communityTabLoading = false;
        draft.communityTabSuccess = false;
        draft.communityTabError = action.error;
        break;
      default:
        return state;
    }
  });

export default tabReducer;

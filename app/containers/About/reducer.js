/*
 *
 * About reducer
 *
 */
import produce from 'immer';
import {
  COMMUNITY_LIST_USER,
  COMMUNITY_LIST_USER_SUCCESS,
  COMMUNITY_LIST_USER_ERROR,
  WIDGET_LIST,
  WIDGET_LIST_SUCCESS,
  WIDGET_LIST_ERROR,
  WIDGET_LIST_ORDER,
} from './constants';

export const initialState = {
  communityListUser: [],
  communityListUserLoading: false,
  communityListUserSuccess: false,
  communityListUserError: '',
  widgetList: [],
  widgetListLoading: false,
  widgetListSuccess: false,
  widgetListError: '',
};

/* eslint-disable default-case, no-param-reassign */
const aboutReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case COMMUNITY_LIST_USER:
        draft.communityListUser = [];
        draft.communityListUserLoading = true;
        draft.communityListUserSuccess = false;
        draft.communityListUserError = '';
        break;
      case COMMUNITY_LIST_USER_SUCCESS:
        draft.communityListUser = action.data;
        draft.communityListUserLoading = false;
        draft.communityListUserSuccess = true;
        draft.communityListUserError = '';
        break;
      case COMMUNITY_LIST_USER_ERROR:
        draft.communityListUserLoading = false;
        draft.communityListUserSuccess = false;
        draft.communityListUserError = action.error;
        break;
      case WIDGET_LIST:
        draft.widgetList = [];
        draft.widgetListLoading = true;
        draft.widgetListSuccess = false;
        draft.widgetListError = '';
        break;
      case WIDGET_LIST_SUCCESS:
        draft.widgetList = action.data;
        draft.widgetListLoading = false;
        draft.widgetListSuccess = true;
        draft.widgetListError = '';
        break;
      case WIDGET_LIST_ERROR:
        draft.widgetListLoading = false;
        draft.widgetListSuccess = false;
        draft.widgetListError = action.error;
        break;
      case WIDGET_LIST_ORDER:
        draft.widgetList = action.data;
        break;
      default:
        return state;
    }
  });

export default aboutReducer;

/* eslint-disable indent */
/*
 *
 * HomePage reducer
 *
 */
import produce from 'immer';
import _ from 'lodash';
import { DELETE_FEED_UID } from 'containers/GlobalEntities/constants';
import {
  GET_CAROUSEL_LIST,
  GET_CAROUSEL_LIST_SUCCESS,
  GET_CAROUSEL_LIST_ERROR,
  GET_PINNED_CONTENT,
  GET_PINNED_CONTENT_SUCCESS,
  GET_PINNED_CONTENT_ERROR,
  GET_WIDGET_LIST,
  GET_WIDGET_LIST_SUCCESS,
  GET_WIDGET_LIST_ERROR,
  GET_PINNED_COMMUNITY_LIST,
  GET_PINNED_COMMUNITY_LIST_SUCCESS,
  GET_PINNED_COMMUNITY_LIST_ERROR,
  GET_CONTENT,
  GET_CONTENT_SUCCESS,
  GET_CONTENT_ERROR,
  SET_WIDGET_LIST_ORDER,
} from './constants';

export const initialState = {
  carouselList: {},
  carouselListLoading: true,
  carouselListSuccess: false,
  carouselListError: {},
  pinnedContent: [],
  pinnedContentLoading: true,
  pinnedContentSuccess: false,
  pinnedContentError: {},
  widgetList: [],
  widgetListLoading: true,
  widgetListSuccess: false,
  widgetListError: {},
  pinnedCommunityList: [],
  pinnedCommunityListLoading: true,
  pinnedCommunityListSuccess: false,
  pinnedCommunityListError: {},
  content: [],
  contentLoading: true,
  contentSuccess: false,
  contentError: {},
  tabList: [],
  tabListLoading: true,
  tabListSuccess: false,
  tabListError: {},
};

/* eslint-disable default-case, no-param-reassign */
const homePageReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case GET_CAROUSEL_LIST:
        draft.carouselList = {};
        draft.carouselListLoading = true;
        draft.carouselListSuccess = false;
        draft.carouselListError = '';
        break;
      case GET_CAROUSEL_LIST_SUCCESS:
        draft.carouselList = action.data;
        draft.carouselListLoading = false;
        draft.carouselListSuccess = true;
        draft.carouselListError = '';
        break;
      case GET_CAROUSEL_LIST_ERROR:
        draft.carouselListLoading = false;
        draft.carouselListSuccess = false;
        draft.carouselListError = action.error;
        break;
      case GET_PINNED_CONTENT:
        draft.pinnedContent = [];
        draft.pinnedContentLoading = true;
        draft.pinnedContentSuccess = false;
        draft.pinnedContentError = '';
        break;
      case GET_PINNED_CONTENT_SUCCESS:
        draft.pinnedContent = action.data;
        draft.pinnedContentLoading = false;
        draft.pinnedContentSuccess = true;
        draft.pinnedContentError = '';
        break;
      case GET_PINNED_CONTENT_ERROR:
        draft.pinnedContentLoading = false;
        draft.pinnedContentSuccess = false;
        draft.pinnedContentError = action.error;
        break;
      case GET_WIDGET_LIST:
        draft.widgetList = [];
        draft.widgetListLoading = true;
        draft.widgetListSuccess = false;
        draft.widgetListError = '';
        break;
      case GET_WIDGET_LIST_SUCCESS:
        draft.widgetList = action.data;
        draft.widgetListLoading = false;
        draft.widgetListSuccess = true;
        draft.widgetListError = '';
        break;
      case GET_WIDGET_LIST_ERROR:
        draft.widgetListLoading = false;
        draft.widgetListSuccess = false;
        draft.widgetListError = action.error;
        break;
      case GET_PINNED_COMMUNITY_LIST:
        draft.pinnedCommunityList = [];
        draft.pinnedCommunityListLoading = true;
        draft.pinnedCommunityListSuccess = false;
        draft.pinnedCommunityListError = '';
        break;
      case GET_PINNED_COMMUNITY_LIST_SUCCESS:
        draft.pinnedCommunityList = action.data;
        draft.pinnedCommunityListLoading = false;
        draft.pinnedCommunityListSuccess = true;
        draft.pinnedCommunityListError = '';
        break;
      case GET_PINNED_COMMUNITY_LIST_ERROR:
        draft.pinnedCommunityListLoading = false;
        draft.pinnedCommunityListSuccess = false;
        draft.pinnedCommunityListError = action.error;
        break;
      case GET_CONTENT:
        draft.content = [];
        draft.contentLoading = true;
        draft.contentSuccess = false;
        draft.contentError = '';
        break;
      case GET_CONTENT_SUCCESS:
        draft.content = action.data;
        draft.contentLoading = false;
        draft.contentSuccess = true;
        draft.contentError = '';
        break;
      case GET_CONTENT_ERROR:
        draft.contentLoading = false;
        draft.contentSuccess = false;
        draft.contentError = action.error;
        break;
      case SET_WIDGET_LIST_ORDER:
        draft.widgetList = action.order;
        break;
      case DELETE_FEED_UID:
        draft.pinnedContent = _.filter(
          draft.pinnedContent,
          content => content !== action.options.uid,
        );
        break;
      default:
        return state;
    }
  });

export default homePageReducer;

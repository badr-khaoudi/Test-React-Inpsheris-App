/*
 *
 * GlobalEntities reducer
 *
 */
import produce from 'immer';
import _, { merge } from 'lodash';
import {
  ENTITIES_UPDATE,
  LIKE_FEED_SUCCESS,
  UNLIKE_FEED_SUCCESS,
  DELETE_FEED_SUCCESS,
  LIKE_COMMENT_SUCCESS,
  UNLIKE_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  LIKE_COMMUNITY,
  DELETE_LIKE_COMMUNITY,
  FOLLOW_COMMUNITY,
  UNFOLLOW_COMMUNITY,
  UPDATE_STATUS_SUCCESS,
  ADD_COWORKER,
  ADD_PARTNER,
  DELETE_WIDGET_ENTITY,
  TRANSLATE_FEED,
  TRANSLATE_FEED_SUCCESS,
  TRANSLATE_FEED_ERROR,
  TRANSLATE_FEED_MODAL,
  TRANSLATE_FEED_MODAL_SUCCESS,
  TRANSLATE_FEED_MODAL_ERROR,
  RSS,
  RSS_SUCCESS,
  RSS_ERROR,
  RSS_MORE,
  RSS_MORE_SUCCESS,
  RSS_MORE_ERROR,
  CALENDAR,
  CALENDAR_SUCCESS,
  CALENDAR_ERROR,
  ENTITIES_REPLACE,
  DELETE_COMMUNITY_TAB,
} from './constants';

export const initialState = {
  entities: {
    feed: {},
    comments: {},
    user: {},
    community: {},
    communityTab: {},
    template: {},
    widgets: {},
  },
  translateFeedLoading: false,
  translateFeedSuccess: false,
  translateFeedError: '',
  translateFeedModalLoading: false,
  translateFeedModalSuccess: false,
  translateFeedModalError: '',
};

/* eslint-disable default-case, no-param-reassign */
const globalEntitiesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ENTITIES_UPDATE:
        draft.entities = merge(draft.entities, action.data);
        break;
      case LIKE_FEED_SUCCESS:
        draft.entities.feed[action.options] = {
          ...draft.entities.feed[action.options],
          likeCount: draft.entities.feed[action.options].likeCount + 1,
          userLiked: true,
        };
        break;
      case UNLIKE_FEED_SUCCESS:
        draft.entities.feed[action.options] = {
          ...draft.entities.feed[action.options],
          likeCount: draft.entities.feed[action.options].likeCount - 1,
          userLiked: false,
        };
        break;
      case DELETE_FEED_SUCCESS:
        delete draft.entities.feed[action.options.uid];
        break;
      case LIKE_COMMENT_SUCCESS:
        draft.entities.comments[action.options.commentUid] = {
          ...draft.entities.comments[action.options.commentUid],
          likeCount:
            draft.entities.comments[action.options.commentUid].likeCount + 1,
          userLiked: true,
        };
        break;
      case UNLIKE_COMMENT_SUCCESS:
        draft.entities.comments[action.options.commentUid] = {
          ...draft.entities.comments[action.options.commentUid],
          likeCount:
            draft.entities.comments[action.options.commentUid].likeCount - 1,
          userLiked: false,
        };
        break;
      case DELETE_COMMENT_SUCCESS:
        draft.entities.feed[action.content] = {
          ...draft.entities.feed[action.content],
          comments: _.filter(
            draft.entities.feed[action.content].comments,
            comment => comment !== action.options.uid,
          ),
          commentCount: draft.entities.feed[action.content].commentCount - 1,
        };
        delete draft.entities.comments[action.options.uid];
        break;
      case LIKE_COMMUNITY:
        draft.entities.community[action.options.communityUid] = {
          ...draft.entities.community[action.options.communityUid],
          isLikedCommunity: true,
        };
        break;
      case DELETE_LIKE_COMMUNITY:
        draft.entities.community[action.options.communityUid] = {
          ...draft.entities.community[action.options.communityUid],
          isLikedCommunity: false,
        };
        break;
      case FOLLOW_COMMUNITY:
        draft.entities.community[action.options.communityUid] = {
          ...draft.entities.community[action.options.communityUid],
          statusOfCurrentUser: 'Follower',
          followerCount: draft.community.followerCount + 1,
        };
        break;
      case UNFOLLOW_COMMUNITY:
        draft.entities.community[action.options.communityUid] = {
          ...draft.entities.community[action.options.communityUid],
          statusOfCurrentUser: 'NotFollower',
          followerCount: draft.community.followerCount - 1,
        };
        break;
      case UPDATE_STATUS_SUCCESS:
        draft.entities.feed[action.options.uid].lastAction =
          action.data.lastAction;
        draft.entities.feed[action.options.uid].editionStatus =
          action.data.editionStatus;
        break;
      case ADD_COWORKER:
        draft.entities.user[action.uid].coworkers = _.map(
          action.options,
          option => option.uid,
        );
        break;
      case ADD_PARTNER:
        draft.entities.user[action.uid].userPartners = _.map(
          action.options,
          option => option.uid,
        );
        break;
      case DELETE_WIDGET_ENTITY:
        delete draft.entities.widgets[action.options.uid];
        break;
      case TRANSLATE_FEED:
        draft.translateFeedLoading = true;
        draft.translateFeedSuccess = false;
        draft.translateFeedError = '';
        break;
      case TRANSLATE_FEED_SUCCESS:
        draft.entities.feed[action.options.uid] = action.data;
        draft.translateFeedLoading = false;
        draft.translateFeedSuccess = true;
        draft.translateFeedError = '';
        break;
      case TRANSLATE_FEED_ERROR:
        draft.translateFeedLoading = false;
        draft.translateFeedSuccess = false;
        draft.translateFeedError = action.error;
        break;
      case TRANSLATE_FEED_MODAL:
        draft.translateFeedModalLoading = true;
        draft.translateFeedModalSuccess = false;
        draft.translateFeedModalError = '';
        break;
      case TRANSLATE_FEED_MODAL_SUCCESS:
        draft.entities.feed[action.options.uid] = {
          ...action.data,
          detailBlocks: action.data.blocks,
        };
        draft.translateFeedModalLoading = false;
        draft.translateFeedModalSuccess = true;
        draft.translateFeedModalError = '';
        break;
      case TRANSLATE_FEED_MODAL_ERROR:
        draft.translateFeedModalLoading = false;
        draft.translateFeedModalSuccess = false;
        draft.translateFeedModalError = action.error;
        break;
      case RSS:
        draft.entities.widgets[action.uid].rss = {};
        draft.entities.widgets[action.uid].rssLoading = true;
        draft.entities.widgets[action.uid].rssSuccess = false;
        draft.entities.widgets[action.uid].rssError = '';
        break;
      case RSS_SUCCESS:
        draft.entities.widgets[action.uid].rss = action.data;
        draft.entities.widgets[action.uid].rssLoading = false;
        draft.entities.widgets[action.uid].rssSuccess = true;
        draft.entities.widgets[action.uid].rssError = '';
        break;
      case RSS_ERROR:
        draft.entities.widgets[action.uid].rssLoading = false;
        draft.entities.widgets[action.uid].rssSuccess = false;
        draft.entities.widgets[action.uid].rssError = action.error;
        break;
      case RSS_MORE:
        draft.entities.widgets[action.uid].rssLoading = true;
        draft.entities.widgets[action.uid].rssSuccess = false;
        draft.entities.widgets[action.uid].rssError = '';
        break;
      case RSS_MORE_SUCCESS:
        draft.entities.widgets[action.uid].rss = action.data;
        draft.entities.widgets[action.uid].rssLoading = false;
        draft.entities.widgets[action.uid].rssSuccess = true;
        draft.entities.widgets[action.uid].rssError = '';
        break;
      case RSS_MORE_ERROR:
        draft.entities.widgets[action.uid].rssLoading = false;
        draft.entities.widgets[action.uid].rssSuccess = false;
        draft.entities.widgets[action.uid].rssError = action.error;
        break;
      case CALENDAR:
        draft.entities.widgets[action.uid].calendarLoading = true;
        draft.entities.widgets[action.uid].calendarSuccess = false;
        draft.entities.widgets[action.uid].calendarError = '';
        break;
      case CALENDAR_SUCCESS:
        draft.entities.widgets[action.uid].calendar = action.data;
        draft.entities.widgets[action.uid].calendarLoading = false;
        draft.entities.widgets[action.uid].calendarSuccess = true;
        draft.entities.widgets[action.uid].calendarError = '';
        break;
      case CALENDAR_ERROR:
        draft.entities.widgets[action.uid].calendarLoading = false;
        draft.entities.widgets[action.uid].calendarSuccess = false;
        draft.entities.widgets[action.uid].calendarError = action.error;
        break;
      case ENTITIES_REPLACE:
        draft.entities[action.key][action.uid] = action.entity;
        break;
      case DELETE_COMMUNITY_TAB:
        draft.entities.community[action.communityUid].tabs = _.without(
          draft.entities.community[action.communityUid].tabs,
          action.tabUid,
        );
        delete draft.entities.communityTab[action.tabUid];
        break;
    }
  });

export default globalEntitiesReducer;

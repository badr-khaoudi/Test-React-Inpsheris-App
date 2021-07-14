/*
 *
 * GlobalEntities actions
 *
 */

import {
  ENTITIES_UPDATE,
  LIKE_FEED,
  LIKE_FEED_SUCCESS,
  LIKE_FEED_ERROR,
  UNLIKE_FEED,
  UNLIKE_FEED_SUCCESS,
  UNLIKE_FEED_ERROR,
  DELETE_FEED,
  DELETE_FEED_SUCCESS,
  DELETE_FEED_ERROR,
  DELETE_FEED_UID,
  LIKE_COMMENT,
  LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_ERROR,
  UNLIKE_COMMENT,
  UNLIKE_COMMENT_SUCCESS,
  UNLIKE_COMMENT_ERROR,
  PICK_COMMENT,
  PICK_COMMENT_SUCCESS,
  PICK_COMMENT_ERROR,
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
  LIKE_COMMUNITY,
  DELETE_LIKE_COMMUNITY,
  FOLLOW_COMMUNITY,
  UNFOLLOW_COMMUNITY,
  UPDATE_STATUS,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_ERROR,
  ADD_COWORKER,
  ADD_PARTNER,
  DELETE_WIDGET_ENTITY,
  TRANSLATE_FEED,
  TRANSLATE_FEED_SUCCESS,
  TRANSLATE_FEED_ERROR,
  TRANSLATE_FEED_MODAL,
  TRANSLATE_FEED_MODAL_SUCCESS,
  TRANSLATE_FEED_MODAL_ERROR,
  LIKE_FOLLOWER_QUICKPOST,
  UNLIKE_FOLLOWER_QUICKPOST,
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
  LIKE_MEETING_EVENT,
  UNLIKE_MEETING_EVENT,
  DELETE_COMMUNITY_TAB,
} from './constants';

export function entitiesUpdate(data) {
  return {
    type: ENTITIES_UPDATE,
    data,
  };
}

export function likeFeed(options) {
  return {
    type: LIKE_FEED,
    options,
  };
}

export function likeFeedSuccess(options) {
  return {
    type: LIKE_FEED_SUCCESS,
    options,
  };
}

export function likeFeedError(error) {
  return {
    type: LIKE_FEED_ERROR,
    error,
  };
}

export function unlikeFeed(options) {
  return {
    type: UNLIKE_FEED,
    options,
  };
}

export function unlikeFeedSuccess(options) {
  return {
    type: UNLIKE_FEED_SUCCESS,
    options,
  };
}

export function unlikeFeedError(error) {
  return {
    type: UNLIKE_FEED_ERROR,
    error,
  };
}

export function deleteFeed(options) {
  return {
    type: DELETE_FEED,
    options,
  };
}

export function deleteFeedSuccess(options) {
  return {
    type: DELETE_FEED_SUCCESS,
    options,
  };
}

export function deleteFeedError(error) {
  return {
    type: DELETE_FEED_ERROR,
    error,
  };
}

export function deleteFeedUid(options) {
  return {
    type: DELETE_FEED_UID,
    options,
  };
}

export function likeComment(options) {
  return {
    type: LIKE_COMMENT,
    options,
  };
}

export function likeCommentSuccess(options) {
  return {
    type: LIKE_COMMENT_SUCCESS,
    options,
  };
}

export function likeCommentError(error) {
  return {
    type: LIKE_COMMENT_ERROR,
    error,
  };
}

export function unlikeComment(options) {
  return {
    type: UNLIKE_COMMENT,
    options,
  };
}

export function unlikeCommentSuccess(options) {
  return {
    type: UNLIKE_COMMENT_SUCCESS,
    options,
  };
}

export function unlikeCommentError(error) {
  return {
    type: UNLIKE_COMMENT_ERROR,
    error,
  };
}

export function pickComment(params, options) {
  return {
    type: PICK_COMMENT,
    params,
    options,
  };
}

export function pickCommentSuccess() {
  return {
    type: PICK_COMMENT_SUCCESS,
  };
}

export function pickCommentError(error) {
  return {
    type: PICK_COMMENT_ERROR,
    error,
  };
}

export function deleteComment(options, content) {
  return {
    type: DELETE_COMMENT,
    options,
    content,
  };
}

export function deleteCommentSuccess(options, content) {
  return {
    type: DELETE_COMMENT_SUCCESS,
    options,
    content,
  };
}

export function deleteCommentError(error) {
  return {
    type: DELETE_COMMENT_ERROR,
    error,
  };
}

export function likeCommunity(options) {
  return {
    type: LIKE_COMMUNITY,
    options,
  };
}

export function deleteLikeCommunity(options) {
  return {
    type: DELETE_LIKE_COMMUNITY,
    options,
  };
}

export function followCommunity(options) {
  return {
    type: FOLLOW_COMMUNITY,
    options,
  };
}

export function unfollowCommunity(options) {
  return {
    type: UNFOLLOW_COMMUNITY,
    options,
  };
}

export function updateStatus(options) {
  return {
    type: UPDATE_STATUS,
    options,
  };
}

export function updateStatusSuccess(options, data) {
  return {
    type: UPDATE_STATUS_SUCCESS,
    options,
    data,
  };
}

export function updateStatusError(error) {
  return {
    type: UPDATE_STATUS_ERROR,
    error,
  };
}

export function addCoworkerGlobal(uid, options) {
  return {
    type: ADD_COWORKER,
    uid,
    options,
  };
}

export function addPartnerGlobal(uid, options) {
  return {
    type: ADD_PARTNER,
    uid,
    options,
  };
}

export function deleteWidgetEntity(options) {
  return {
    type: DELETE_WIDGET_ENTITY,
    options,
  };
}

export function translateFeed(options) {
  return {
    type: TRANSLATE_FEED,
    options,
  };
}

export function translateFeedSuccess(options, data) {
  return {
    type: TRANSLATE_FEED_SUCCESS,
    options,
    data,
  };
}

export function translateFeedError(error) {
  return {
    type: TRANSLATE_FEED_ERROR,
    error,
  };
}

export function translateFeedModal(options) {
  return {
    type: TRANSLATE_FEED_MODAL,
    options,
  };
}

export function translateFeedModalSuccess(options, data) {
  return {
    type: TRANSLATE_FEED_MODAL_SUCCESS,
    options,
    data,
  };
}

export function translateFeedModalError(error) {
  return {
    type: TRANSLATE_FEED_MODAL_ERROR,
    error,
  };
}

export function likeFollowerQuickpost(options) {
  return {
    type: LIKE_FOLLOWER_QUICKPOST,
    options,
  };
}

export function unlikeFollowerQuickpost(options) {
  return {
    type: UNLIKE_FOLLOWER_QUICKPOST,
    options,
  };
}

export function rss(uid, options) {
  return {
    type: RSS,
    uid,
    options,
  };
}

export function rssSuccess(uid, data) {
  return {
    type: RSS_SUCCESS,
    uid,
    data,
  };
}

export function rssError(uid, error) {
  return {
    type: RSS_ERROR,
    uid,
    error,
  };
}

export function rssMore(uid, options) {
  return {
    type: RSS_MORE,
    uid,
    options,
  };
}

export function rssMoreSuccess(uid, data) {
  return {
    type: RSS_MORE_SUCCESS,
    uid,
    data,
  };
}

export function rssMoreError(uid, error) {
  return {
    type: RSS_MORE_ERROR,
    uid,
    error,
  };
}

export function calendar(uid, options) {
  return {
    type: CALENDAR,
    uid,
    options,
  };
}

export function calendarSuccess(uid, data) {
  return {
    type: CALENDAR_SUCCESS,
    uid,
    data,
  };
}

export function calendarError(uid, error) {
  return {
    type: CALENDAR_ERROR,
    uid,
    error,
  };
}

export function entitiesReplace(key, uid, entity) {
  return {
    type: ENTITIES_REPLACE,
    key,
    uid,
    entity,
  };
}

export function likeMeetingEvent(options) {
  return {
    type: LIKE_MEETING_EVENT,
    options,
  };
}

export function unlikeMeetingEvent(options) {
  return {
    type: UNLIKE_MEETING_EVENT,
    options,
  };
}

export function deleteCommunityTab(communityUid, tabUid) {
  return {
    type: DELETE_COMMUNITY_TAB,
    communityUid,
    tabUid,
  };
}

/*
 *
 * CommunityHome actions
 *
 */

import {
  COMMUNITY,
  COMMUNITY_SUCCESS,
  COMMUNITY_ERROR,
  LIKE,
  LIKE_SUCCESS,
  LIKE_ERROR,
  DELETE_LIKE,
  DELETE_LIKE_SUCCESS,
  DELETE_LIKE_ERROR,
  FOLLOW,
  FOLLOW_SUCCESS,
  FOLLOW_ERROR,
  UNFOLLOW,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_ERROR,
  GET_AUTHOR_LIST,
  GET_AUTHOR_LIST_SUCCESS,
  GET_AUTHOR_LIST_ERROR,
  CAROUSEL_LIST,
  CAROUSEL_LIST_SUCCESS,
  CAROUSEL_LIST_ERROR,
} from './constants';

export function community(options) {
  return {
    type: COMMUNITY,
    options,
  };
}

export function communitySuccess(data) {
  return {
    type: COMMUNITY_SUCCESS,
    data,
  };
}

export function communityError(error) {
  return {
    type: COMMUNITY_ERROR,
    error,
  };
}

export function like(options) {
  return {
    type: LIKE,
    options,
  };
}

export function likeSuccess() {
  return {
    type: LIKE_SUCCESS,
  };
}

export function likeError(error) {
  return {
    type: LIKE_ERROR,
    error,
  };
}

export function deleteLike(options) {
  return {
    type: DELETE_LIKE,
    options,
  };
}

export function deleteLikeSuccess() {
  return {
    type: DELETE_LIKE_SUCCESS,
  };
}

export function deleteLikeError(error) {
  return {
    type: DELETE_LIKE_ERROR,
    error,
  };
}

export function follow(options) {
  return {
    type: FOLLOW,
    options,
  };
}

export function followSuccess() {
  return {
    type: FOLLOW_SUCCESS,
  };
}

export function followError(error) {
  return {
    type: FOLLOW_ERROR,
    error,
  };
}

export function unfollow(options) {
  return {
    type: UNFOLLOW,
    options,
  };
}

export function unfollowSuccess() {
  return {
    type: UNFOLLOW_SUCCESS,
  };
}

export function unfollowError(error) {
  return {
    type: UNFOLLOW_ERROR,
    error,
  };
}

export function getAuthorList(options) {
  return {
    type: GET_AUTHOR_LIST,
    options,
  };
}

export function getAuthorListSuccess(data) {
  return {
    type: GET_AUTHOR_LIST_SUCCESS,
    data,
  };
}

export function getAuthorListError(error) {
  return {
    type: GET_AUTHOR_LIST_ERROR,
    error,
  };
}

export function carouselList(options) {
  return {
    type: CAROUSEL_LIST,
    options,
  };
}

export function carouselListSuccess(data) {
  return {
    type: CAROUSEL_LIST_SUCCESS,
    data,
  };
}

export function carouselListError(error) {
  return {
    type: CAROUSEL_LIST_ERROR,
    error,
  };
}

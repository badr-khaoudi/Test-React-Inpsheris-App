/*
 *
 * HomePage actions
 *
 */

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

export function getCarouselList() {
  return {
    type: GET_CAROUSEL_LIST,
  };
}

export function getCarouselListSuccess(data) {
  return {
    type: GET_CAROUSEL_LIST_SUCCESS,
    data,
  };
}

export function getCarouselListError(error) {
  return {
    type: GET_CAROUSEL_LIST_ERROR,
    error,
  };
}

export function getPinnedContent(options) {
  return {
    type: GET_PINNED_CONTENT,
    options,
  };
}

export function getPinnedContentSuccess(data) {
  return {
    type: GET_PINNED_CONTENT_SUCCESS,
    data,
  };
}

export function getPinnedContentError(error) {
  return {
    type: GET_PINNED_CONTENT_ERROR,
    error,
  };
}

export function getWidgetList() {
  return {
    type: GET_WIDGET_LIST,
  };
}

export function getWidgetListSuccess(data) {
  return {
    type: GET_WIDGET_LIST_SUCCESS,
    data,
  };
}

export function getWidgetListError(error) {
  return {
    type: GET_WIDGET_LIST_ERROR,
    error,
  };
}

export function getPinnedCommunityList() {
  return {
    type: GET_PINNED_COMMUNITY_LIST,
  };
}

export function getPinnedCommunityListSuccess(data) {
  return {
    type: GET_PINNED_COMMUNITY_LIST_SUCCESS,
    data,
  };
}

export function getPinnedCommunityListError(error) {
  return {
    type: GET_PINNED_COMMUNITY_LIST_ERROR,
    error,
  };
}

export function getContent(options) {
  return {
    type: GET_CONTENT,
    options,
  };
}

export function getContentSuccess(data) {
  return {
    type: GET_CONTENT_SUCCESS,
    data,
  };
}

export function getContentError(error) {
  return {
    type: GET_CONTENT_ERROR,
    error,
  };
}

export function setWidgetListOrder(order) {
  return {
    type: SET_WIDGET_LIST_ORDER,
    order,
  };
}

/*
 *
 * HomeFeed actions
 *
 */

import {
  GET_HOME_FEED,
  GET_HOME_FEED_SUCCESS,
  GET_HOME_FEED_ERROR,
  ADD_FEED,
} from './constants';

export function getHomeFeed(widgets, options, cancelToken) {
  return {
    type: GET_HOME_FEED,
    widgets,
    options,
    cancelToken,
  };
}

export function getHomeFeedSuccess(data) {
  return {
    type: GET_HOME_FEED_SUCCESS,
    data,
  };
}

export function getHomeFeedError(error) {
  return {
    type: GET_HOME_FEED_ERROR,
    error,
  };
}

export function addFeed(result) {
  return {
    type: ADD_FEED,
    result,
  };
}

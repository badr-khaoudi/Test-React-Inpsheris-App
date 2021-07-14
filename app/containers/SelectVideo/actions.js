/*
 *
 * SelectVideo actions
 *
 */

import {
  GET_VIDEO_LISTING,
  GET_VIDEO_LISTING_SUCCESS,
  GET_VIDEO_LISTING_ERROR,
} from './constants';

export function getVideoListing(options) {
  return {
    type: GET_VIDEO_LISTING,
    options,
  };
}

export function getVideoListingSuccess(data) {
  return {
    type: GET_VIDEO_LISTING_SUCCESS,
    data,
  };
}

export function getVideoListingError(error) {
  return {
    type: GET_VIDEO_LISTING_ERROR,
    error,
  };
}

/*
 *
 * Hashtag actions
 *
 */

import {
  GET_HASHTAG_LISTING,
  GET_HASHTAG_LISTING_SUCCESS,
  GET_HASHTAG_LISTING_ERROR,
} from './constants';

export function getHashtagListing(options) {
  return {
    type: GET_HASHTAG_LISTING,
    options,
  };
}

export function getHashtagListingSuccess(data) {
  return {
    type: GET_HASHTAG_LISTING_SUCCESS,
    data,
  };
}

export function getHashtagListingError(error) {
  return {
    type: GET_HASHTAG_LISTING_ERROR,
    error,
  };
}

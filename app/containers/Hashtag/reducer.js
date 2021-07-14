/*
 *
 * Hashtag reducer
 *
 */
import produce from 'immer';
import {
  GET_HASHTAG_LISTING,
  GET_HASHTAG_LISTING_SUCCESS,
  GET_HASHTAG_LISTING_ERROR,
} from './constants';

export const initialState = {
  hashtagListing: [],
  hashtagListingLoading: false,
  hashtagListingSuccess: false,
  hashtagListingError: '',
};

/* eslint-disable default-case, no-param-reassign */
const hashtagReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case GET_HASHTAG_LISTING:
        draft.hashtagListing = [];
        draft.hashtagListingLoading = true;
        draft.hashtagListingSuccess = false;
        draft.hashtagListingError = '';
        break;
      case GET_HASHTAG_LISTING_SUCCESS:
        draft.hashtagListing = action.data;
        draft.hashtagListingLoading = false;
        draft.hashtagListingSuccess = true;
        draft.hashtagListingError = '';
        break;
      case GET_HASHTAG_LISTING_ERROR:
        draft.hashtagListingLoading = false;
        draft.hashtagListingSuccess = false;
        draft.hashtagListingError = action.error;
        break;
      default:
        return state;
    }
  });

export default hashtagReducer;

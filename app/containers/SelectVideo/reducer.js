/*
 *
 * SelectVideo reducer
 *
 */
import produce from 'immer';
import {
  GET_VIDEO_LISTING,
  GET_VIDEO_LISTING_SUCCESS,
  GET_VIDEO_LISTING_ERROR,
} from './constants';

export const initialState = {
  videoListing: [],
  videoListingLoading: false,
  videoListingSuccess: false,
  videoListingError: '',
};

/* eslint-disable default-case, no-param-reassign */
const selectVideoReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case GET_VIDEO_LISTING:
        draft.videoListing = [];
        draft.videoListingLoading = true;
        draft.videoListingSuccess = false;
        draft.videoListingError = '';
        break;
      case GET_VIDEO_LISTING_SUCCESS:
        draft.videoListing = action.data;
        draft.videoListingLoading = false;
        draft.videoListingSuccess = true;
        draft.videoListingError = '';
        break;
      case GET_VIDEO_LISTING_ERROR:
        draft.videoListingLoading = false;
        draft.videoListingSuccess = false;
        draft.videoListingError = action.error;
        break;
      default:
        return state;
    }
  });

export default selectVideoReducer;

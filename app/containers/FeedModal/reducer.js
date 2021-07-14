/*
 *
 * FeedModal reducer
 *
 */
import produce from 'immer';
import {
  GET_CONTENT_DETAILS,
  GET_CONTENT_DETAILS_SUCCESS,
  GET_CONTENT_DETAILS_ERROR,
} from './constants';

export const initialState = {
  contentDetailsLoading: false,
  contentDetailsSuccess: false,
  contentDetailsError: '',
};

/* eslint-disable default-case, no-param-reassign */
const feedModalReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case GET_CONTENT_DETAILS:
        draft.contentDetailsLoading = true;
        draft.contentDetailsSuccess = false;
        draft.contentDetailsError = '';
        break;
      case GET_CONTENT_DETAILS_SUCCESS:
        draft.contentDetailsLoading = false;
        draft.contentDetailsSuccess = true;
        draft.contentDetailsError = '';
        break;
      case GET_CONTENT_DETAILS_ERROR:
        draft.contentDetailsLoading = false;
        draft.contentDetailsSuccess = false;
        draft.contentDetailsError = action.error;
        break;
      default:
        return state;
    }
  });

export default feedModalReducer;

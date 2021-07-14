/*
 *
 * ApplicationLinksPage reducer
 *
 */
import produce from 'immer';

import {
  GET_APPLICATION_LINKS,
  GET_APPLICATION_LINKS_SUCCESS,
  GET_APPLICATION_LINKS_ERROR,
} from './constants';

export const initialState = {
  applicationLinks: [],
  getApplicationLinksLoading: true,
  getApplicationLinksSuccess: false,
  getApplicationLinksError: {},
};

/* eslint-disable default-case, no-param-reassign */
const applicationLinksPageReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case GET_APPLICATION_LINKS:
        draft.getApplicationLinksLoading = true;
        draft.getApplicationLinksSuccess = false;
        draft.getApplicationLinksError = {};
        break;
      case GET_APPLICATION_LINKS_SUCCESS:
        draft.applicationLinks = action.data;
        draft.getApplicationLinksLoading = false;
        draft.getApplicationLinksSuccess = true;
        break;
      case GET_APPLICATION_LINKS_ERROR:
        draft.getApplicationLinksLoading = false;
        draft.getApplicationLinksSuccess = false;
        draft.getApplicationLinksError = action.error;
        break;
      default:
        return state;
    }
  });

export default applicationLinksPageReducer;

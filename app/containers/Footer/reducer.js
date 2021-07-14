/*
 *
 * Footer reducer
 *
 */
import produce from 'immer';
import {
  GET_FOOTER_LINKS,
  GET_FOOTER_LINKS_SUCCESS,
  GET_FOOTER_LINKS_ERROR,
} from './constants';

export const initialState = {
  footerLinks: [],
  getFooterLinksLoading: false,
  getFooterLinksSuccess: true,
};

/* eslint-disable default-case, no-param-reassign */
const footerReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case GET_FOOTER_LINKS:
        draft.getFooterLinksLoading = true;
        draft.getFooterLinksSuccess = false;
        draft.getFooterLinksError = {};
        break;
      case GET_FOOTER_LINKS_SUCCESS:
        draft.footerLinks = action.data;
        draft.getFooterLinksLoading = false;
        draft.getFooterLinksSuccess = true;
        break;
      case GET_FOOTER_LINKS_ERROR:
        draft.getFooterLinksLoading = false;
        draft.getFooterLinksSuccess = false;
        draft.getFooterLinksError = action.error;
        break;
      default:
        return state;
    }
  });

export default footerReducer;

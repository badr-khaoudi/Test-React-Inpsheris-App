/*
 *
 * UsefulLinksPage reducer
 *
 */
import produce from 'immer';
import {
  GET_USEFUL_LINKS,
  GET_USEFUL_LINKS_SUCCESS,
  GET_USEFUL_LINKS_ERROR,
} from './constants';

export const initialState = {
  usefulLinks: [],
  getUsefulLinksLoading: true,
  getUsefulLinksSuccess: false,
  getUsefulLinksError: {},
};

/* eslint-disable default-case, no-param-reassign */
const usefulLinksReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case GET_USEFUL_LINKS:
        draft.getUsefulLinksLoading = true;
        draft.getUsefulLinksSuccess = false;
        draft.getUsefulLinksError = {};
        break;
      case GET_USEFUL_LINKS_SUCCESS:
        draft.usefulLinks = action.data;
        draft.getUsefulLinksLoading = false;
        draft.getUsefulLinksSuccess = true;
        break;
      case GET_USEFUL_LINKS_ERROR:
        draft.getUsefulLinksLoading = false;
        draft.getUsefulLinksSuccess = false;
        draft.getUsefulLinksError = action.error;
        break;
      default:
        return state;
    }
  });

export default usefulLinksReducer;

/*
 *
 * Share reducer
 *
 */
import produce from 'immer';
import { SHARE, SHARE_SUCCESS, SHARE_ERROR, CLEAN_SHARE } from './constants';

export const initialState = {
  share: {},
  shareLoading: false,
  shareSuccess: false,
  shareError: '',
};

/* eslint-disable default-case, no-param-reassign */
const shareReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case CLEAN_SHARE:
      case SHARE:
        draft.share = {};
        draft.shareLoading = true;
        draft.shareSuccess = false;
        draft.shareError = '';
        break;
      case SHARE_SUCCESS:
        draft.share = action.data;
        draft.shareLoading = false;
        draft.shareSuccess = true;
        draft.shareError = '';
        break;
      case SHARE_ERROR:
        draft.shareLoading = false;
        draft.shareSuccess = false;
        draft.shareError = action.error;
        break;
      default:
        return state;
    }
  });

export default shareReducer;

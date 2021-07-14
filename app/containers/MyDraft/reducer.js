/*
 *
 * MyDraft reducer
 *
 */
import produce from 'immer';
import _ from 'lodash';
import { DELETE_FEED_UID } from 'containers/GlobalEntities/constants';
import {
  DRAFTS,
  DRAFTS_SUCCESS,
  DRAFTS_ERROR,
  DRAFTS_MORE,
  DRAFTS_MORE_SUCCESS,
  DRAFTS_MORE_ERROR,
} from './constants';

export const initialState = {
  drafts: {},
  draftsLoading: false,
  draftsSuccess: false,
  draftsError: '',
};

/* eslint-disable default-case, no-param-reassign */
const myDraftReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case DRAFTS:
        draft.drafts = {};
        draft.draftsLoading = true;
        draft.draftsSuccess = false;
        draft.draftsError = '';
        break;
      case DRAFTS_SUCCESS:
        draft.drafts = action.data;
        draft.draftsLoading = false;
        draft.draftsSuccess = true;
        draft.draftsError = '';
        break;
      case DRAFTS_ERROR:
        draft.draftsLoading = false;
        draft.draftsSuccess = false;
        draft.draftsError = action.error;
        break;
      case DRAFTS_MORE:
        draft.draftsLoading = true;
        draft.draftsSuccess = false;
        draft.draftsError = '';
        break;
      case DRAFTS_MORE_SUCCESS:
        draft.drafts.contents = [
          ...draft.drafts.contents,
          ...action.data.contents,
        ];
        draft.draftsLoading = false;
        draft.draftsSuccess = true;
        draft.draftsError = '';
        break;
      case DRAFTS_MORE_ERROR:
        draft.draftsLoading = false;
        draft.draftsSuccess = false;
        draft.draftsError = action.error;
        break;
      case DELETE_FEED_UID:
        draft.drafts.contents = _.filter(
          draft.drafts.contents,
          content => content !== action.options.uid,
        );
        break;
      default:
        return state;
    }
  });

export default myDraftReducer;

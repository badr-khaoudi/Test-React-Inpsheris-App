/* eslint-disable indent */
/*
 *
 * HomeFeed reducer
 *
 */
import produce from 'immer';
import _ from 'lodash';
import { DELETE_FEED_UID } from 'containers/GlobalEntities/constants';
import {
  GET_HOME_FEED,
  GET_HOME_FEED_SUCCESS,
  GET_HOME_FEED_ERROR,
  ADD_FEED,
} from './constants';

export const initialState = {
  homeFeed: { contents: [] },
  homeFeedLoading: false,
  homeFeedSuccess: false,
  homeFeedError: '',
};

/* eslint-disable default-case, no-param-reassign */
const homeFeedReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case GET_HOME_FEED:
        draft.homeFeed.contents = [];
        draft.homeFeedLoading = true;
        draft.homeFeedSuccess = false;
        draft.homeFeedError = '';
        break;
      case GET_HOME_FEED_SUCCESS:
        draft.homeFeed = action.data;
        draft.homeFeedLoading = false;
        draft.homeFeedSuccess = true;
        draft.homeFeedError = '';
        break;
      case GET_HOME_FEED_ERROR:
        draft.homeFeedLoading = false;
        draft.homeFeedSuccess = false;
        draft.homeFeedError = action.error;
        break;
      case DELETE_FEED_UID:
        draft.homeFeed = {
          ...draft.homeFeed,
          contents: _.filter(
            draft.homeFeed.contents,
            content => content !== action.options.uid,
          ),
        };
        break;
      case ADD_FEED:
        draft.homeFeed.contents = [action.result, ...draft.homeFeed.contents];
        break;
      default:
        return state;
    }
  });

export default homeFeedReducer;

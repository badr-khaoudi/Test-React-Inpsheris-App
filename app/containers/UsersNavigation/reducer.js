/*
 *
 * UsersNavigation reducer
 *
 */
import produce from 'immer';
import {
  LIST_CONTENT_VIEWED_BY_SOURCE,
  LIST_CONTENT_VIEWED_BY_SOURCE_SUCCESS,
  LIST_CONTENT_VIEWED_BY_SOURCE_ERROR,
} from './constants';

export const initialState = {
  listContentViewedBySource: {},
  listContentViewedBySourceSuccess: false,
  listContentViewedBySourceLoading: false,
  listContentViewedBySourceError: '',
};

/* eslint-disable default-case, no-param-reassign */
const usersNavigationReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case LIST_CONTENT_VIEWED_BY_SOURCE:
        draft.listContentViewedBySource = {};
        draft.listContentViewedBySourceLoading = true;
        draft.listContentViewedBySourceSuccess = false;
        draft.listContentViewedBySourceError = '';
        break;
      case LIST_CONTENT_VIEWED_BY_SOURCE_SUCCESS:
        draft.listContentViewedBySource = action.data;
        draft.listContentViewedBySourceLoading = false;
        draft.listContentViewedBySourceSuccess = true;
        draft.listContentViewedBySourceError = '';
        break;
      case LIST_CONTENT_VIEWED_BY_SOURCE_ERROR:
        draft.listContentViewedBySourceLoading = false;
        draft.listContentViewedBySourceSuccess = false;
        draft.listContentViewedBySourceError = action.error;
        break;
      default:
        return state;
    }
  });

export default usersNavigationReducer;

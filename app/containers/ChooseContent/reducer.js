/*
 *
 * ChooseContent reducer
 *
 */
import produce from 'immer';
import {
  CONTENT_FILTER,
  CONTENT_FILTER_SUCCESS,
  CONTENT_FILTER_ERROR,
  CONTENT_FILTER_MORE,
  CONTENT_FILTER_MORE_SUCCESS,
  CONTENT_FILTER_MORE_ERROR,
} from './constants';

export const initialState = {
  contentFilter: {},
  contentFilterLoading: false,
  contentFilterSuccess: false,
  contentFilterError: '',
};

/* eslint-disable default-case, no-param-reassign */
const chooseContentReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case CONTENT_FILTER:
        draft.contentFilter = {};
        draft.contentFilterLoading = true;
        draft.contentFilterSuccess = false;
        draft.contentFilterError = '';
        break;
      case CONTENT_FILTER_SUCCESS:
        draft.contentFilter = action.data;
        draft.contentFilterLoading = false;
        draft.contentFilterSuccess = true;
        draft.contentFilterError = '';
        break;
      case CONTENT_FILTER_ERROR:
        draft.contentFilterLoading = false;
        draft.contentFilterSuccess = false;
        draft.contentFilterError = action.error;
        break;
      case CONTENT_FILTER_MORE:
        draft.contentFilterLoading = true;
        draft.contentFilterSuccess = false;
        draft.contentFilterError = '';
        break;
      case CONTENT_FILTER_MORE_SUCCESS:
        draft.contentFilter.contents = [
          ...draft.contentFilter.contents,
          ...action.data.contents,
        ];
        draft.contentFilterLoading = false;
        draft.contentFilterSuccess = true;
        draft.contentFilterError = '';
        break;
      case CONTENT_FILTER_MORE_ERROR:
        draft.contentFilterLoading = false;
        draft.contentFilterSuccess = false;
        draft.contentFilterError = action.error;
        break;
      default:
        return state;
    }
  });

export default chooseContentReducer;

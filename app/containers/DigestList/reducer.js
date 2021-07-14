/*
 *
 * DigestList reducer
 *
 */
import produce from 'immer';
import {
  DIGEST_LIST,
  DIGEST_LIST_SUCCESS,
  DIGEST_LIST_ERROR,
} from './constants';

export const initialState = {
  digestList: [],
  digestListLoading: false,
  digestListSuccess: false,
  digestListError: '',
};

/* eslint-disable default-case, no-param-reassign */
const digestListReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case DIGEST_LIST:
        draft.digestList = [];
        draft.digestListLoading = true;
        draft.digestListSuccess = false;
        draft.digestListError = '';
        break;
      case DIGEST_LIST_SUCCESS:
        draft.digestList = action.data;
        draft.digestListLoading = false;
        draft.digestListSuccess = true;
        draft.digestListError = '';
        break;
      case DIGEST_LIST_ERROR:
        draft.digestListLoading = false;
        draft.digestListSuccess = false;
        draft.digestListError = action.error;
        break;
      default:
        return state;
    }
  });

export default digestListReducer;

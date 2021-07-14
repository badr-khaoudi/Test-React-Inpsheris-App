/*
 *
 * MoveDocument reducer
 *
 */
import produce from 'immer';
import {
  GET_COMMUNITY_TAB,
  DOCUMENT_TREE_LIST,
  DOCUMENT_TREE_LIST_SUCCESS,
  DOCUMENT_TREE_LIST_ERROR,
} from './constants';

export const initialState = {
  documentTreeList: [],
  documentTreeListLoading: false,
  documentTreeListSuccess: false,
  documentTreeListError: '',
};

/* eslint-disable default-case, no-param-reassign */
const moveDocumentReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case GET_COMMUNITY_TAB:
      case DOCUMENT_TREE_LIST:
        draft.documentTreeList = [];
        draft.documentTreeListLoading = true;
        draft.documentTreeListSuccess = false;
        draft.documentTreeListError = '';
        break;
      case DOCUMENT_TREE_LIST_SUCCESS:
        draft.documentTreeList = action.data;
        draft.documentTreeListLoading = false;
        draft.documentTreeListSuccess = true;
        draft.documentTreeListError = '';
        break;
      case DOCUMENT_TREE_LIST_ERROR:
        draft.documentTreeListLoading = false;
        draft.documentTreeListSuccess = false;
        draft.documentTreeListError = action.error;
        break;
      default:
        return state;
    }
  });

export default moveDocumentReducer;

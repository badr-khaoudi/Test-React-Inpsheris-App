/*
 *
 * LinkDocumentLibrary reducer
 *
 */
import produce from 'immer';
import {
  SHARE_POINT_SITES,
  SEARCH_SHARE_POINT_SITES,
  DOCUMENT_LIBRARIES,
  LIST_ITEMS_DRIVE,
  LIST_CHILDREN_DRIVE_ITEM,
  SEARCH_DRIVE_ITEMS,
  SEARCH_CHILDREN_DRIVE_ITEM,
  CONTENTS_SUCCESS,
  CONTENTS_ERROR,
} from './constants';

export const initialState = {
  contents: {},
  contentsLoading: false,
  contentsSuccess: false,
  contentsError: '',
};

/* eslint-disable default-case, no-param-reassign */
const linkDocumentLibraryReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case SHARE_POINT_SITES:
      case SEARCH_SHARE_POINT_SITES:
      case DOCUMENT_LIBRARIES:
      case LIST_ITEMS_DRIVE:
      case LIST_CHILDREN_DRIVE_ITEM:
      case SEARCH_DRIVE_ITEMS:
      case SEARCH_CHILDREN_DRIVE_ITEM:
        draft.contents = {};
        draft.contentsLoading = true;
        draft.contentsSuccess = false;
        draft.contentsError = '';
        break;
      case CONTENTS_SUCCESS:
        draft.contents = action.data;
        draft.contentsLoading = false;
        draft.contentsSuccess = true;
        draft.contentsError = '';
        break;
      case CONTENTS_ERROR:
        draft.contentsLoading = false;
        draft.contentsSuccess = false;
        draft.contentsError = action.error;
        break;
      default:
        return state;
    }
  });

export default linkDocumentLibraryReducer;

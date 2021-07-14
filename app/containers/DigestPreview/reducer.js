/*
 *
 * DigestPreview reducer
 *
 */
import produce from 'immer';
import {
  DIGEST_CONTENT,
  DIGEST_CONTENT_SUCCESS,
  DIGEST_CONTENT_ERROR,
  CLEAN_DIGEST_CONTENT,
} from './constants';

export const initialState = {
  digestContent: '',
  digestContentLoading: false,
  digestContentSuccess: false,
  digestContentError: '',
};

/* eslint-disable default-case, no-param-reassign */
const digestPreviewReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case DIGEST_CONTENT:
        draft.digestContent = '';
        draft.digestContentLoading = true;
        draft.digestContentSuccess = false;
        draft.digestContentError = '';
        break;
      case DIGEST_CONTENT_SUCCESS:
        draft.digestContent = action.data;
        draft.digestContentLoading = false;
        draft.digestContentSuccess = true;
        draft.digestContentError = '';
        break;
      case DIGEST_CONTENT_ERROR:
        draft.digestContentLoading = false;
        draft.digestContentSuccess = false;
        draft.digestContentError = action.error;
        break;
      case CLEAN_DIGEST_CONTENT:
        draft.digestContent = '';
        draft.digestContentLoading = false;
        draft.digestContentSuccess = false;
        draft.digestContentError = '';
        break;
      default:
        return state;
    }
  });

export default digestPreviewReducer;

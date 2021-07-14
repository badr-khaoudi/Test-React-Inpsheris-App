/*
 *
 * CreatePin reducer
 *
 */
import produce from 'immer';
import {
  PINNED_POST_TYPE,
  PINNED_POST_TYPE_SUCCESS,
  PINNED_POST_TYPE_ERROR,
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CREATE_PINNED_POST,
  CREATE_PINNED_POST_SUCCESS,
  CREATE_PINNED_POST_ERROR,
  EDIT_PINNED_POST,
  EDIT_PINNED_POST_SUCCESS,
  EDIT_PINNED_POST_ERROR,
  GET_EMBED_URL,
  GET_EMBED_URL_SUCCESS,
  GET_EMBED_URL_ERROR,
  GET_OEMBED,
  GET_OEMBED_SUCCESS,
  GET_OEMBED_ERROR,
  CLEAN_CREATE_PIN,
} from './constants';

export const initialState = {
  pinnedPostType: [],
  pinnedPostTypeLoading: false,
  pinnedPostTypeSuccess: false,
  pinnedPostTypeError: '',
  uploadFile: [],
  uploadFileLoading: false,
  uploadFileSuccess: false,
  uploadFileError: '',
  createPinnedPost: {},
  createPinnedPostLoading: false,
  createPinnedPostSuccess: false,
  createPinnedPostError: '',
  embedUrl: {},
  embedUrlLoading: false,
  embedUrlSuccess: false,
  embedUrlError: '',
  oEmbed: {},
  oEmbedLoading: false,
  oEmbedSuccess: false,
  oEmbedError: '',
};

/* eslint-disable default-case, no-param-reassign */
const createPinReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case PINNED_POST_TYPE:
        draft.pinnedPostType = [];
        draft.pinnedPostTypeLoading = true;
        draft.pinnedPostTypeSuccess = false;
        draft.pinnedPostTypeError = '';
        break;
      case PINNED_POST_TYPE_SUCCESS:
        draft.pinnedPostType = action.data;
        draft.pinnedPostTypeLoading = false;
        draft.pinnedPostTypeSuccess = true;
        draft.pinnedPostTypeError = '';
        break;
      case PINNED_POST_TYPE_ERROR:
        draft.pinnedPostTypeLoading = false;
        draft.pinnedPostTypeSuccess = false;
        draft.pinnedPostTypeError = action.error;
        break;
      case UPLOAD_FILE:
        draft.uploadFile = [];
        draft.uploadFileLoading = true;
        draft.uploadFileSuccess = false;
        draft.uploadFileError = '';
        break;
      case UPLOAD_FILE_SUCCESS:
        draft.uploadFile = action.data;
        draft.uploadFileLoading = false;
        draft.uploadFileSuccess = true;
        draft.uploadFileError = '';
        break;
      case UPLOAD_FILE_ERROR:
        draft.uploadFileLoading = false;
        draft.uploadFileSuccess = false;
        draft.uploadFileError = action.error;
        break;
      case CREATE_PINNED_POST:
        draft.createPinnedPostLoading = true;
        draft.createPinnedPostSuccess = false;
        draft.createPinnedPostError = '';
        break;
      case CREATE_PINNED_POST_SUCCESS:
        draft.createPinnedPostLoading = false;
        draft.createPinnedPostSuccess = true;
        draft.createPinnedPostError = '';
        break;
      case CREATE_PINNED_POST_ERROR:
        draft.createPinnedPostLoading = false;
        draft.createPinnedPostSuccess = false;
        draft.createPinnedPostError = action.error;
        break;
      case EDIT_PINNED_POST:
        draft.createPinnedPostLoading = true;
        draft.createPinnedPostSuccess = false;
        draft.createPinnedPostError = '';
        break;
      case EDIT_PINNED_POST_SUCCESS:
        draft.createPinnedPostLoading = false;
        draft.createPinnedPostSuccess = true;
        draft.createPinnedPostError = '';
        break;
      case EDIT_PINNED_POST_ERROR:
        draft.createPinnedPostLoading = false;
        draft.createPinnedPostSuccess = false;
        draft.createPinnedPostError = action.error;
        break;
      case GET_EMBED_URL:
        draft.embedUrl = {};
        draft.embedUrlLoading = true;
        draft.embedUrlSuccess = false;
        draft.embedUrlError = '';
        break;
      case GET_EMBED_URL_SUCCESS:
        draft.embedUrl = action.data;
        draft.embedUrlLoading = false;
        draft.embedUrlSuccess = true;
        draft.embedUrlError = '';
        break;
      case GET_EMBED_URL_ERROR:
        draft.embedUrlLoading = false;
        draft.embedUrlSuccess = false;
        draft.embedUrlError = action.error;
        break;
      case GET_OEMBED:
        draft.oEmbed = {};
        draft.oEmbedLoading = true;
        draft.oEmbedSuccess = false;
        draft.oEmbedError = '';
        break;
      case GET_OEMBED_SUCCESS:
        draft.oEmbed = action.data;
        draft.oEmbedLoading = false;
        draft.oEmbedSuccess = true;
        draft.oEmbedError = '';
        break;
      case GET_OEMBED_ERROR:
        draft.oEmbedLoading = false;
        draft.oEmbedSuccess = false;
        draft.oEmbedError = action.error;
        break;
      case CLEAN_CREATE_PIN:
        draft.oEmbed = {};
        draft.oEmbedLoading = false;
        draft.oEmbedSuccess = false;
        draft.oEmbedError = '';
        draft.uploadFile = [];
        draft.uploadFileLoading = false;
        draft.uploadFileSuccess = false;
        draft.uploadFileError = '';
        draft.createPinnedPostLoading = false;
        draft.createPinnedPostSuccess = false;
        draft.createPinnedPostError = '';
        break;
      default:
        return state;
    }
  });

export default createPinReducer;

/*
 *
 * QuickPost reducer
 *
 */
import produce from 'immer';
import {
  CREATE_QUICKPOST,
  CREATE_QUICKPOST_SUCCESS,
  CREATE_QUICKPOST_ERROR,
  GET_CONTENT_DETAILS,
  GET_CONTENT_DETAILS_SUCCESS,
  GET_CONTENT_DETAILS_ERROR,
  ENABLE_PUBLISH,
  DISABLE_PUBLISH,
  RESET_QUICKPOST,
  CREATE_FAQ,
  QUICK_SHARING_OF_THE_LINK,
  GET_EMBED_URL,
  GET_EMBED_URL_SUCCESS,
  GET_EMBED_URL_ERROR,
  GET_OEMBED,
  GET_OEMBED_SUCCESS,
  GET_OEMBED_ERROR,
} from './constants';

export const initialState = {
  videoListing: [],
  videoListingLoading: false,
  videoListingSuccess: false,
  videoListingError: '',
  fileStack: {},
  fileStackLoading: false,
  fileStackSuccess: false,
  fileStackError: '',
  uploadFile: [],
  uploadFileLoading: false,
  uploadFileSuccess: false,
  uploadFileError: '',
  saveVideoFileStack: {},
  saveVideoFileStackLoading: false,
  saveVideoFileStackSuccess: false,
  saveVideoFileStackError: '',
  quickPostLoading: false,
  quickPostSuccess: false,
  quickPostError: '',
  contentDetailsLoading: false,
  contentDetailsSuccess: false,
  contentDetailsError: '',
  canPublish: true,
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
const quickPostReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case CREATE_FAQ:
      case QUICK_SHARING_OF_THE_LINK:
      case CREATE_QUICKPOST:
        draft.quickPostLoading = true;
        draft.quickPostSuccess = false;
        draft.quickPostError = '';
        break;
      case CREATE_QUICKPOST_SUCCESS:
        draft.quickPostLoading = false;
        draft.quickPostSuccess = true;
        draft.quickPostError = '';
        break;
      case CREATE_QUICKPOST_ERROR:
        draft.quickPostLoading = false;
        draft.quickPostSuccess = false;
        draft.quickPostError = action.error;
        break;
      case GET_CONTENT_DETAILS:
        draft.contentDetailsLoading = true;
        draft.contentDetailsSuccess = false;
        draft.contentDetailsError = '';
        break;
      case GET_CONTENT_DETAILS_SUCCESS:
        draft.contentDetailsLoading = false;
        draft.contentDetailsSuccess = true;
        draft.contentDetailsError = '';
        break;
      case GET_CONTENT_DETAILS_ERROR:
        draft.contentDetailsLoading = false;
        draft.contentDetailsSuccess = false;
        draft.contentDetailsError = action.error;
        break;
      case ENABLE_PUBLISH:
        draft.canPublish = true;
        break;
      case DISABLE_PUBLISH:
        draft.canPublish = false;
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
      case RESET_QUICKPOST:
        draft.quickPostLoading = false;
        draft.quickPostSuccess = false;
        draft.quickPostError = '';
        draft.oEmbed = {};
        draft.oEmbedLoading = false;
        draft.oEmbedSuccess = false;
        draft.oEmbedError = '';
        break;
      default:
        return state;
    }
  });

export default quickPostReducer;

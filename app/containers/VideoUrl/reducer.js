/*
 *
 * VideoUrl reducer
 *
 */
import produce from 'immer';
import {
  GET_EMBED_URL,
  GET_EMBED_URL_SUCCESS,
  GET_EMBED_URL_ERROR,
  GET_OEMBED,
  GET_OEMBED_SUCCESS,
  GET_OEMBED_ERROR,
  CLEAN_OEMBED,
} from './constants';

export const initialState = {
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
const videoUrlReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
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
      case CLEAN_OEMBED:
        draft.oEmbed = {};
        break;
      default:
        return state;
    }
  });

export default videoUrlReducer;

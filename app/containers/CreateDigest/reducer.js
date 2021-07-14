/*
 *
 * CreateDigest reducer
 *
 */
import produce from 'immer';
import {
  TEMPLATES,
  TEMPLATES_SUCCESS,
  TEMPLATES_ERROR,
  TYPES,
  TYPES_SUCCESS,
  TYPES_ERROR,
  REPEAT,
  REPEAT_SUCCESS,
  REPEAT_ERROR,
  CONTENT_TYPES,
  CONTENT_TYPES_SUCCESS,
  CONTENT_TYPES_ERROR,
  CREATE_DIGEST,
  CREATE_DIGEST_SUCCESS,
  CREATE_DIGEST_ERROR,
  DIGEST_CONTENT,
  DIGEST_CONTENT_SUCCESS,
  DIGEST_CONTENT_ERROR,
  CLEAN_CREATE_DIGEST,
} from './constants';

export const initialState = {
  templates: [],
  templatesLoading: false,
  templatesSuccess: false,
  templatesError: '',
  types: [],
  typesLoading: false,
  typesSuccess: false,
  typesError: '',
  repeat: [],
  repeatLoading: false,
  repeatSuccess: false,
  repeatError: '',
  contentTypes: [],
  contentTypesLoading: false,
  contentTypesSuccess: false,
  contentTypesError: '',
  createDigestLoading: false,
  createDigestSuccess: false,
  createDigestError: '',
  digestContent: '',
  digestContentLoading: false,
  digestContentSuccess: false,
  digestContentError: '',
};

/* eslint-disable default-case, no-param-reassign */
const createDigestReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case TEMPLATES:
        draft.templates = [];
        draft.templatesLoading = true;
        draft.templatesSuccess = false;
        draft.templatesError = '';
        break;
      case TEMPLATES_SUCCESS:
        draft.templates = action.data;
        draft.templatesLoading = false;
        draft.templatesSuccess = true;
        draft.templatesError = '';
        break;
      case TEMPLATES_ERROR:
        draft.templatesLoading = false;
        draft.templatesSuccess = false;
        draft.templatesError = action.error;
        break;
      case TYPES:
        draft.types = [];
        draft.typesLoading = true;
        draft.typesSuccess = false;
        draft.typesError = '';
        break;
      case TYPES_SUCCESS:
        draft.types = action.data;
        draft.typesLoading = false;
        draft.typesSuccess = true;
        draft.typesError = '';
        break;
      case TYPES_ERROR:
        draft.typesLoading = false;
        draft.typesSuccess = false;
        draft.typesError = action.error;
        break;
      case REPEAT:
        draft.repeat = [];
        draft.repeatLoading = true;
        draft.repeatSuccess = false;
        draft.repeatError = '';
        break;
      case REPEAT_SUCCESS:
        draft.repeat = action.data;
        draft.repeatLoading = false;
        draft.repeatSuccess = true;
        draft.repeatError = '';
        break;
      case REPEAT_ERROR:
        draft.repeatLoading = false;
        draft.repeatSuccess = false;
        draft.repeatError = action.error;
        break;
      case CONTENT_TYPES:
        draft.contentTypes = [];
        draft.contentTypesLoading = true;
        draft.contentTypesSuccess = false;
        draft.contentTypesError = '';
        break;
      case CONTENT_TYPES_SUCCESS:
        draft.contentTypes = action.data;
        draft.contentTypesLoading = false;
        draft.contentTypesSuccess = true;
        draft.contentTypesError = '';
        break;
      case CONTENT_TYPES_ERROR:
        draft.contentTypesLoading = false;
        draft.contentTypesSuccess = false;
        draft.contentTypesError = action.error;
        break;
      case CREATE_DIGEST:
        draft.createDigestLoading = true;
        draft.createDigestSuccess = false;
        draft.createDigestError = '';
        break;
      case CREATE_DIGEST_SUCCESS:
        draft.createDigestLoading = false;
        draft.createDigestSuccess = true;
        draft.createDigestError = '';
        break;
      case CREATE_DIGEST_ERROR:
        draft.createDigestLoading = false;
        draft.createDigestSuccess = false;
        draft.createDigestError = action.error;
        break;
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
      case CLEAN_CREATE_DIGEST:
        draft.createDigestLoading = false;
        draft.createDigestSuccess = false;
        draft.createDigestError = '';
        break;
      default:
        return state;
    }
  });

export default createDigestReducer;

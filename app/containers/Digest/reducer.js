/*
 *
 * Digest reducer
 *
 */
import produce from 'immer';
import _ from 'lodash';
import {
  DIGEST_LIST,
  DIGEST_LIST_SUCCESS,
  DIGEST_LIST_ERROR,
  ADD_DIGEST,
  DIGEST_ENTITIES_UPDATE,
  ACTIVATE_DIGEST,
  ACTIVATE_DIGEST_SUCCESS,
  ACTIVATE_DIGEST_ERROR,
  CAROUSEL_LIST,
  CAROUSEL_LIST_SUCCESS,
  CAROUSEL_LIST_ERROR,
  PINNED_CONTENT,
  PINNED_CONTENT_SUCCESS,
  PINNED_CONTENT_ERROR,
  DELETE_DIGEST,
  DELETE_DIGEST_SUCCESS,
  DELETE_DIGEST_ERROR,
} from './constants';

export const initialState = {
  digest: {},
  digestList: {},
  digestListLoading: false,
  digestListSuccess: false,
  digestListError: '',
  activateDigestLoading: false,
  activateDigestSuccess: false,
  activateDigestError: '',
  carouselList: {},
  carouselListLoading: false,
  carouselListSuccess: false,
  carouselListError: '',
  pinnedContent: [],
  pinnedContentLoading: false,
  pinnedContentSuccess: false,
  pinnedContentError: '',
  deleteDigestLoading: false,
  deleteDigestSuccess: false,
  deleteDigestError: '',
};

/* eslint-disable default-case, no-param-reassign */
const digestReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case DIGEST_LIST:
        draft.digestList = {};
        draft.digestListLoading = true;
        draft.digestListSuccess = false;
        draft.digestListError = '';
        break;
      case DIGEST_LIST_SUCCESS:
        draft.digest = _.merge(draft.digest, action.data);
        draft.digestList = action.response;
        draft.digestListLoading = false;
        draft.digestListSuccess = true;
        draft.digestListError = '';
        break;
      case DIGEST_LIST_ERROR:
        draft.digestListLoading = false;
        draft.digestListSuccess = false;
        draft.digestListError = action.error;
        break;
      case ADD_DIGEST:
        draft.digestList = {
          ...draft.digestList,
          total: draft.digestList.total + 1,
          rows: _.uniq([...draft.digestList.rows, action.data]),
        };
        break;
      case DIGEST_ENTITIES_UPDATE:
        draft.digest = _.merge(draft.digest, action.data);
        break;
      case ACTIVATE_DIGEST:
        draft.activateDigestLoading = true;
        draft.activateDigestSuccess = false;
        draft.activateDigestError = '';
        break;
      case ACTIVATE_DIGEST_SUCCESS:
        draft.digest[action.params.id].active = action.options.active === 'Y';
        draft.activateDigestLoading = false;
        draft.activateDigestSuccess = true;
        draft.activateDigestError = '';
        break;
      case ACTIVATE_DIGEST_ERROR:
        draft.activateDigestLoading = false;
        draft.activateDigestSuccess = false;
        draft.activateDigestError = action.error;
        break;
      case CAROUSEL_LIST:
        draft.carouselList = {};
        draft.carouselListLoading = true;
        draft.carouselListSuccess = false;
        draft.carouselListError = '';
        break;
      case CAROUSEL_LIST_SUCCESS:
        draft.carouselList = action.data;
        draft.carouselListLoading = false;
        draft.carouselListSuccess = true;
        draft.carouselListError = '';
        break;
      case CAROUSEL_LIST_ERROR:
        draft.carouselListLoading = false;
        draft.carouselListSuccess = false;
        draft.carouselListError = action.error;
        break;
      case PINNED_CONTENT:
        draft.pinnedContent = [];
        draft.pinnedContentLoading = true;
        draft.pinnedContentSuccess = false;
        draft.pinnedContentError = '';
        break;
      case PINNED_CONTENT_SUCCESS:
        draft.pinnedContent = action.data;
        draft.pinnedContentLoading = false;
        draft.pinnedContentSuccess = true;
        draft.pinnedContentError = '';
        break;
      case PINNED_CONTENT_ERROR:
        draft.pinnedContentLoading = false;
        draft.pinnedContentSuccess = false;
        draft.pinnedContentError = action.error;
        break;
      case DELETE_DIGEST:
        draft.deleteDigestLoading = true;
        draft.deleteDigestSuccess = false;
        draft.deleteDigestError = '';
        break;
      case DELETE_DIGEST_SUCCESS:
        draft.digestList = {
          ...draft.digestList,
          total: draft.digestList.total - 1,
          rows: _.filter(
            draft.digestList.rows,
            row => row !== action.options.id,
          ),
        };
        delete draft.digest[action.options.id];
        draft.deleteDigestLoading = false;
        draft.deleteDigestSuccess = true;
        draft.deleteDigestError = '';
        break;
      case DELETE_DIGEST_ERROR:
        draft.deleteDigestLoading = false;
        draft.deleteDigestSuccess = false;
        draft.deleteDigestError = action.error;
        break;
      default:
        return state;
    }
  });

export default digestReducer;

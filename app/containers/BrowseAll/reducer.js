/*
 *
 * BrowseAll reducer
 *
 */
import produce from 'immer';
import {
  GET_FILE_TYPE,
  GET_FILE_TYPE_SUCCESS,
  GET_FILE_TYPE_ERROR,
  GET_COMMUNITY_LIST,
  GET_COMMUNITY_LIST_SUCCESS,
  GET_COMMUNITY_LIST_ERROR,
  GET_AUTHOR_LIST,
  GET_AUTHOR_LIST_SUCCESS,
  GET_AUTHOR_LIST_ERROR,
  GET_FILE_LIST,
  GET_FILE_LIST_SUCCESS,
  GET_FILE_LIST_ERROR,
  SEARCH_FILE_LIST,
  DOWNLOAD_ALL,
  DOWNLOAD_ALL_SUCCESS,
  DOWNLOAD_ALL_ERROR,
  GET_FILE_LIST_MORE,
  GET_FILE_LIST_MORE_SUCCESS,
  GET_FILE_LIST_MORE_ERROR,
} from './constants';

export const initialState = {
  fileType: [],
  fileTypeLoading: false,
  fileTypeSuccess: false,
  fileTypeError: '',
  communityList: [],
  communityListLoading: false,
  communityListSuccess: false,
  communityListError: '',
  authorList: [],
  authorListLoading: false,
  authorListSuccess: false,
  authorListError: '',
  fileList: [],
  fileListLoading: false,
  fileListSuccess: false,
  fileListError: '',
  downloadAllLoading: false,
  downloadAllSuccess: false,
  downloadAllError: '',
};

/* eslint-disable default-case, no-param-reassign */
const browseAllReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case GET_FILE_TYPE:
        draft.fileType = [];
        draft.fileTypeLoading = true;
        draft.fileTypeSuccess = false;
        draft.fileTypeError = '';
        break;
      case GET_FILE_TYPE_SUCCESS:
        draft.fileType = action.data;
        draft.fileTypeLoading = false;
        draft.fileTypeSuccess = true;
        draft.fileTypeError = '';
        break;
      case GET_FILE_TYPE_ERROR:
        draft.fileTypeLoading = false;
        draft.fileTypeSuccess = false;
        draft.fileTypeError = action.error;
        break;
      case GET_COMMUNITY_LIST:
        draft.communityList = [];
        draft.communityListLoading = true;
        draft.communityListSuccess = false;
        draft.communityListError = '';
        break;
      case GET_COMMUNITY_LIST_SUCCESS:
        draft.communityList = action.data;
        draft.communityListLoading = false;
        draft.communityListSuccess = true;
        draft.communityListError = '';
        break;
      case GET_COMMUNITY_LIST_ERROR:
        draft.communityListLoading = false;
        draft.communityListSuccess = false;
        draft.communityListError = action.error;
        break;
      case GET_AUTHOR_LIST:
        draft.authorList = [];
        draft.authorListLoading = true;
        draft.authorListSuccess = false;
        draft.authorListError = '';
        break;
      case GET_AUTHOR_LIST_SUCCESS:
        draft.authorList = action.data;
        draft.authorListLoading = false;
        draft.authorListSuccess = true;
        draft.authorListError = '';
        break;
      case GET_AUTHOR_LIST_ERROR:
        draft.authorListLoading = false;
        draft.authorListSuccess = false;
        draft.authorListError = action.error;
        break;
      case SEARCH_FILE_LIST:
      case GET_FILE_LIST:
        draft.fileList = [];
        draft.fileListLoading = true;
        draft.fileListSuccess = false;
        draft.fileListError = '';
        break;
      case GET_FILE_LIST_SUCCESS:
        draft.fileList = action.data;
        draft.fileListLoading = false;
        draft.fileListSuccess = true;
        draft.fileListError = '';
        break;
      case GET_FILE_LIST_ERROR:
        draft.fileListLoading = false;
        draft.fileListSuccess = false;
        draft.fileListError = action.error;
        break;
      case DOWNLOAD_ALL:
        draft.downloadAllLoading = true;
        draft.downloadAllSuccess = false;
        draft.downloadAllError = '';
        break;
      case DOWNLOAD_ALL_SUCCESS:
        draft.downloadAllLoading = false;
        draft.downloadAllSuccess = true;
        draft.downloadAllError = '';
        break;
      case DOWNLOAD_ALL_ERROR:
        draft.downloadAllLoading = false;
        draft.downloadAllSuccess = false;
        draft.downloadAllError = action.error;
        break;
      case GET_FILE_LIST_MORE:
        draft.fileListLoading = true;
        draft.fileListSuccess = false;
        draft.fileListError = '';
        break;
      case GET_FILE_LIST_MORE_SUCCESS:
        draft.fileList = [...draft.fileList, ...action.data];
        draft.fileListLoading = false;
        draft.fileListSuccess = true;
        draft.fileListError = '';
        break;
      case GET_FILE_LIST_MORE_ERROR:
        draft.fileListLoading = false;
        draft.fileListSuccess = false;
        draft.fileListError = action.error;
        break;
      default:
        return state;
    }
  });

export default browseAllReducer;

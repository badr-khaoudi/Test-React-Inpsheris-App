/*
 *
 * MySearch reducer
 *
 */
import produce from 'immer';
import {
  SUGGESTION,
  SUGGESTION_SUCCESS,
  SUGGESTION_ERROR,
  EXTERNAL_SITES,
  EXTERNAL_SITES_SUCCESS,
  EXTERNAL_SITES_ERROR,
  SEARCH,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  SEARCH_MORE,
  SEARCH_MORE_SUCCESS,
  SEARCH_MORE_ERROR,
  GET_FILE_TYPE,
  GET_FILE_TYPE_SUCCESS,
  GET_FILE_TYPE_ERROR,
  GET_COMMUNITY_LIST,
  GET_COMMUNITY_LIST_SUCCESS,
  GET_COMMUNITY_LIST_ERROR,
  GET_AUTHOR_LIST,
  GET_AUTHOR_LIST_SUCCESS,
  GET_AUTHOR_LIST_ERROR,
  COMMUNITY_FILES,
  COMMUNITY_FILES_SUCCESS,
  COMMUNITY_FILES_ERROR,
  COMMUNITY_FILES_MORE,
  COMMUNITY_FILES_MORE_SUCCESS,
  COMMUNITY_FILES_MORE_ERROR,
} from './constants';

export const initialState = {
  suggestion: [],
  suggestionLoading: false,
  suggestionSuccess: false,
  suggestionError: '',
  externalSites: [],
  externalSitesLoading: false,
  externalSitesSuccess: false,
  externalSitesError: '',
  search: {},
  searchLoading: false,
  searchSuccess: false,
  searchError: '',
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
  communityFiles: [],
  communityFilesLoading: false,
  communityFilesSuccess: false,
  communityFilesError: '',
};

/* eslint-disable default-case, no-param-reassign */
const mySearchReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case SUGGESTION:
        draft.suggestion = [];
        draft.suggestionLoading = true;
        draft.suggestionSuccess = false;
        draft.suggestionError = '';
        break;
      case SUGGESTION_SUCCESS:
        draft.suggestion = action.data;
        draft.suggestionLoading = false;
        draft.suggestionSuccess = true;
        draft.suggestionError = '';
        break;
      case SUGGESTION_ERROR:
        draft.suggestionLoading = false;
        draft.suggestionSuccess = false;
        draft.suggestionError = action.error;
        break;
      case EXTERNAL_SITES:
        draft.externalSites = [];
        draft.externalSitesLoading = true;
        draft.externalSitesSuccess = false;
        draft.externalSitesError = '';
        break;
      case EXTERNAL_SITES_SUCCESS:
        draft.externalSites = action.data;
        draft.externalSitesLoading = false;
        draft.externalSitesSuccess = true;
        draft.externalSitesError = '';
        break;
      case EXTERNAL_SITES_ERROR:
        draft.externalSitesLoading = false;
        draft.externalSitesSuccess = false;
        draft.externalSitesError = action.error;
        break;
      case SEARCH:
        draft.search = {};
        draft.searchLoading = true;
        draft.searchSuccess = false;
        draft.searchError = '';
        break;
      case SEARCH_SUCCESS:
        draft.search = action.data;
        draft.searchLoading = false;
        draft.searchSuccess = true;
        draft.searchError = '';
        break;
      case SEARCH_ERROR:
        draft.searchLoading = false;
        draft.searchSuccess = false;
        draft.searchError = action.error;
        break;
      case SEARCH_MORE:
        draft.searchLoading = true;
        draft.searchSuccess = false;
        draft.searchError = '';
        break;
      case SEARCH_MORE_SUCCESS:
        draft.search = {
          ...draft.search,
          communities: [
            ...draft.search.communities,
            ...action.data.communities,
          ],
          communityFiles: [
            ...draft.search.communityFiles,
            ...action.data.communityFiles,
          ],
          contactUsers: [
            ...draft.search.contactUsers,
            ...action.data.contactUsers,
          ],
          contents: [...draft.search.contents, ...action.data.contents],
          digitalWorkplaceApplications: [
            ...draft.search.digitalWorkplaceApplications,
            ...action.data.digitalWorkplaceApplications,
          ],
          events: [...draft.search.events, ...action.data.events],
          gDriveFiles: [
            ...draft.search.gDriveFiles,
            ...action.data.gDriveFiles,
          ],
          members: [...draft.search.members, ...action.data.members],
          quickposts: [...draft.search.quickposts, ...action.data.quickposts],
          usefulLinks: [
            ...draft.search.usefulLinks,
            ...action.data.usefulLinks,
          ],
          widgets: [...draft.search.widgets, ...action.data.widgets],
          yammerLinks: [
            ...draft.search.yammerLinks,
            ...action.data.yammerLinks,
          ],
        };
        draft.searchLoading = false;
        draft.searchSuccess = true;
        draft.searchError = '';
        break;
      case SEARCH_MORE_ERROR:
        draft.searchLoading = false;
        draft.searchSuccess = false;
        draft.searchError = action.error;
        break;
      case COMMUNITY_FILES:
        draft.communityFiles = {};
        draft.communityFilesLoading = true;
        draft.communityFilesSuccess = false;
        draft.communityFilesError = '';
        break;
      case COMMUNITY_FILES_SUCCESS:
        draft.communityFiles = action.data;
        draft.communityFilesLoading = false;
        draft.communityFilesSuccess = true;
        draft.communityFilesError = '';
        break;
      case COMMUNITY_FILES_ERROR:
        draft.communityFilesLoading = false;
        draft.communityFilesSuccess = false;
        draft.communityFilesError = action.error;
        break;
      case COMMUNITY_FILES_MORE:
        draft.communityFilesLoading = true;
        draft.communityFilesSuccess = false;
        draft.communityFilesError = '';
        break;
      case COMMUNITY_FILES_MORE_SUCCESS:
        draft.communityFiles = {
          ...draft.communityFiles,
          rows: [...draft.communityFiles.rows, ...action.data.rows],
        };
        draft.communityFilesLoading = false;
        draft.communityFilesSuccess = true;
        draft.communityFilesError = '';
        break;
      case COMMUNITY_FILES_MORE_ERROR:
        draft.communityFilesLoading = false;
        draft.communityFilesSuccess = false;
        draft.communityFilesError = action.error;
        break;
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
      default:
        return state;
    }
  });

export default mySearchReducer;

/* eslint-disable indent */
/*
 *
 * CommunityTab reducer
 *
 */
import produce from 'immer';
import _ from 'lodash';
import {
  GET_COMMUNITY_TAB,
  GET_COMMUNITY_TAB_SUCCESS,
  GET_COMMUNITY_DOCUMENT_TREE_TAB,
  GET_COMMUNITY_DOCUMENT_TREE_TAB_SUCCESS,
  GET_COMMUNITY_FILES_TAB,
  GET_COMMUNITY_FILES_TAB_SUCCESS,
  GET_COMMUNITY_GRDIVE_TAB,
  GET_COMMUNITY_GRDIVE_TAB_SUCCESS,
  GET_COMMUNITY_TAB_ERROR,
  GET_COMMUNITY_TAB_MORE,
  GET_COMMUNITY_TAB_MORE_SUCCESS,
  GET_COMMUNITY_TAB_MORE_ERROR,
  GET_COMMUNITY_HOME_TAB,
  GET_COMMUNITY_HOME_TAB_MORE,
  PIN_ON_COMMUNITY,
  PIN_ON_COMMUNITY_SUCCESS,
  PIN_ON_COMMUNITY_ERROR,
  GET_FILE_TYPE,
  GET_FILE_TYPE_SUCCESS,
  GET_FILE_TYPE_ERROR,
  COMMUNITY_FILE_SEARCH,
  COMMUNITY_FILE_SEARCH_SUCCESS,
  COMMUNITY_FILE_SEARCH_ERROR,
  COMMUNITY_FILE_SEARCH_MORE,
  COMMUNITY_FILE_SEARCH_MORE_SUCCESS,
  COMMUNITY_FILE_SEARCH_MORE_ERROR,
  DOCUMENT_TREE_LIST,
  DOCUMENT_TREE_LIST_SUCCESS,
  DOCUMENT_TREE_LIST_ERROR,
  CREATE_NEW_FOLDER,
  CREATE_NEW_FOLDER_SUCCESS,
  CREATE_NEW_FOLDER_ERROR,
  RENAME_FOLDER,
  RENAME_FOLDER_SUCCESS,
  RENAME_FOLDER_ERROR,
  DELETE_DOCUMENT,
  DELETE_DOCUMENT_SUCCESS,
  DELETE_DOCUMENT_ERROR,
  ORDER_DOCUMENT,
  ORDER_DOCUMENT_SUCCESS,
  ORDER_DOCUMENT_ERROR,
  CREATE_NEW_DOCUMENT,
  CREATE_NEW_DOCUMENT_SUCCESS,
  CREATE_NEW_DOCUMENT_ERROR,
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CLEAN_UPLOAD_FILE,
  FAQ_SEARCH,
  FAQ_SEARCH_SUCCESS,
  FAQ_SEARCH_ERROR,
  FAQ_SEARCH_MORE,
  FAQ_SEARCH_MORE_SUCCESS,
  FAQ_SEARCH_MORE_ERROR,
  WIDGET_LIST,
  WIDGET_LIST_SUCCESS,
  WIDGET_LIST_ERROR,
  WIDGET_LIST_ORDER,
} from './constants';

export const initialState = {
  communityTab: [],
  documentTree: [],
  files: [],
  gdrive: {},
  communityTabLoading: false,
  communityTabSuccess: false,
  communityTabError: '',
  pinOnCommunity: [],
  pinOnCommunityLoading: false,
  pinOnCommunitySuccess: false,
  pinOnCommunityError: '',
  fileType: [],
  fileTypeLoading: false,
  fileTypeSuccess: false,
  fileTypeError: '',
  newFolder: {},
  newFolderLoading: false,
  newFolderSuccess: false,
  newFolderError: '',
  renameFolderLoading: false,
  renameFolderSuccess: false,
  renameFolderError: '',
  deleteDocumentLoading: false,
  deleteDocumentSuccess: false,
  deleteDocumentError: '',
  orderDocumentLoading: false,
  orderDocumentSuccess: false,
  orderDocumentError: '',
  newDocumentLoading: false,
  newDocumentSuccess: false,
  newDocumentError: '',
  uploadFile: [],
  uploadFileLoading: false,
  uploadFileSuccess: false,
  uploadFileError: '',
  widgetList: [],
  widgetListLoading: false,
  widgetListSuccess: false,
  widgetListError: '',
};

/* eslint-disable default-case, no-param-reassign */
const communityTabReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case GET_COMMUNITY_HOME_TAB:
      case GET_COMMUNITY_TAB:
      case GET_COMMUNITY_DOCUMENT_TREE_TAB:
      case GET_COMMUNITY_FILES_TAB:
      case GET_COMMUNITY_GRDIVE_TAB:
        draft.communityTab = [];
        draft.documentTree = [];
        draft.files = [];
        draft.gdrive = {};
        draft.communityTabLoading = true;
        draft.communityTabSuccess = false;
        draft.communityTabError = '';
        break;
      case GET_COMMUNITY_TAB_SUCCESS:
        draft.communityTab = action.data;
        draft.communityTabLoading = false;
        draft.communityTabSuccess = true;
        draft.communityTabError = '';
        break;
      case GET_COMMUNITY_DOCUMENT_TREE_TAB_SUCCESS:
        draft.documentTree = action.data;
        draft.communityTabLoading = false;
        draft.communityTabSuccess = true;
        draft.communityTabError = '';
        break;
      case GET_COMMUNITY_FILES_TAB_SUCCESS:
        draft.files = action.data;
        draft.communityTabLoading = false;
        draft.communityTabSuccess = true;
        draft.communityTabError = '';
        break;
      case GET_COMMUNITY_GRDIVE_TAB_SUCCESS:
        draft.gdrive = action.data;
        draft.communityTabLoading = false;
        draft.communityTabSuccess = true;
        draft.communityTabError = '';
        break;
      case GET_COMMUNITY_TAB_ERROR:
        draft.communityTabLoading = false;
        draft.communityTabSuccess = false;
        draft.communityTabError = action.error;
        break;
      case GET_COMMUNITY_HOME_TAB_MORE:
      case GET_COMMUNITY_TAB_MORE:
        draft.communityTabLoading = true;
        draft.communityTabSuccess = false;
        draft.communityTabError = '';
        break;
      case GET_COMMUNITY_TAB_MORE_SUCCESS:
        draft.communityTab = [...draft.communityTab, ...action.data];
        draft.communityTabLoading = false;
        draft.communityTabSuccess = true;
        draft.communityTabError = '';
        break;
      case GET_COMMUNITY_TAB_MORE_ERROR:
        draft.communityTabLoading = false;
        draft.communityTabSuccess = false;
        draft.communityTabError = action.error;
        break;
      case PIN_ON_COMMUNITY:
        draft.pinOnCommunity = [];
        draft.pinOnCommunityLoading = true;
        draft.pinOnCommunitySuccess = false;
        draft.pinOnCommunityError = '';
        break;
      case PIN_ON_COMMUNITY_SUCCESS:
        draft.pinOnCommunity = action.data;
        draft.pinOnCommunityLoading = false;
        draft.pinOnCommunitySuccess = true;
        draft.pinOnCommunityError = '';
        break;
      case PIN_ON_COMMUNITY_ERROR:
        draft.pinOnCommunityLoading = false;
        draft.pinOnCommunitySuccess = false;
        draft.pinOnCommunityError = action.error;
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
      case COMMUNITY_FILE_SEARCH:
        draft.files = [];
        draft.communityTabLoading = true;
        draft.communityTabSuccess = false;
        draft.communityTabError = '';
        break;
      case COMMUNITY_FILE_SEARCH_SUCCESS:
        draft.files = action.data;
        draft.communityTabLoading = false;
        draft.communityTabSuccess = true;
        draft.communityTabError = '';
        break;
      case COMMUNITY_FILE_SEARCH_ERROR:
        draft.communityTabLoading = false;
        draft.communityTabSuccess = false;
        draft.communityTabError = action.error;
        break;
      case COMMUNITY_FILE_SEARCH_MORE:
        draft.communityTabLoading = true;
        draft.communityTabSuccess = false;
        draft.communityTabError = '';
        break;
      case COMMUNITY_FILE_SEARCH_MORE_SUCCESS:
        draft.files = [...draft.communityTab, ...action.data];
        draft.communityTabLoading = false;
        draft.communityTabSuccess = true;
        draft.communityTabError = '';
        break;
      case COMMUNITY_FILE_SEARCH_MORE_ERROR:
        draft.communityTabLoading = false;
        draft.communityTabSuccess = false;
        draft.communityTabError = action.error;
        break;
      case DOCUMENT_TREE_LIST:
        draft.documentTree = [];
        draft.communityTabLoading = true;
        draft.communityTabSuccess = false;
        draft.communityTabError = '';
        break;
      case DOCUMENT_TREE_LIST_SUCCESS:
        draft.documentTree = action.data;
        draft.communityTabLoading = false;
        draft.communityTabSuccess = true;
        draft.communityTabError = '';
        break;
      case DOCUMENT_TREE_LIST_ERROR:
        draft.communityTabLoading = false;
        draft.communityTabSuccess = false;
        draft.communityTabError = action.error;
        break;
      case CREATE_NEW_FOLDER:
        draft.newFolder = {};
        draft.newFolderLoading = true;
        draft.newFolderSuccess = false;
        draft.newFolderError = '';
        break;
      case CREATE_NEW_FOLDER_SUCCESS:
        draft.newFolder = action.data;
        draft.newFolderLoading = false;
        draft.newFolderSuccess = true;
        draft.newFolderError = '';
        break;
      case CREATE_NEW_FOLDER_ERROR:
        draft.newFolderLoading = false;
        draft.newFolderSuccess = false;
        draft.newFolderError = action.error;
        break;
      case RENAME_FOLDER:
        draft.renameFolderLoading = true;
        draft.renameFolderSuccess = false;
        draft.renameFolderError = '';
        break;
      case RENAME_FOLDER_SUCCESS:
        draft.documentTree = _.map(draft.documentTree, document =>
          document.id === action.data.id ? action.data : document,
        );
        draft.renameFolderLoading = false;
        draft.renameFolderSuccess = true;
        draft.renameFolderError = '';
        break;
      case RENAME_FOLDER_ERROR:
        draft.renameFolderLoading = false;
        draft.renameFolderSuccess = false;
        draft.renameFolderError = action.error;
        break;
      case DELETE_DOCUMENT:
        draft.deleteDocumentLoading = true;
        draft.deleteDocumentSuccess = false;
        draft.deleteDocumentError = '';
        break;
      case DELETE_DOCUMENT_SUCCESS:
        draft.documentTree = _.filter(
          draft.communityTab,
          document => document.id !== action.data.id,
        );
        draft.deleteDocumentLoading = false;
        draft.deleteDocumentSuccess = true;
        draft.deleteDocumentError = '';
        break;
      case DELETE_DOCUMENT_ERROR:
        draft.deleteDocumentLoading = false;
        draft.deleteDocumentSuccess = false;
        draft.deleteDocumentError = action.error;
        break;
      case ORDER_DOCUMENT:
        draft.orderDocumentLoading = true;
        draft.orderDocumentSuccess = false;
        draft.orderDocumentError = '';
        break;
      case ORDER_DOCUMENT_SUCCESS:
        draft.documentTree = action.data;
        draft.orderDocumentLoading = false;
        draft.orderDocumentSuccess = true;
        draft.orderDocumentError = '';
        break;
      case ORDER_DOCUMENT_ERROR:
        draft.orderDocumentLoading = false;
        draft.orderDocumentSuccess = false;
        draft.orderDocumentError = action.error;
        break;
      case CREATE_NEW_DOCUMENT:
        draft.newDocumentLoading = true;
        draft.newDocumentSuccess = false;
        draft.newDocumentError = '';
        break;
      case CREATE_NEW_DOCUMENT_SUCCESS:
        if (_.head(draft.documentTree).parentId === action.data.parentId) {
          draft.documentTree = [action.data, ...draft.documentTree];
        }
        draft.newDocumentLoading = false;
        draft.newDocumentSuccess = true;
        draft.newDocumentError = '';
        break;
      case CREATE_NEW_DOCUMENT_ERROR:
        draft.newDocumentLoading = false;
        draft.newDocumentSuccess = false;
        draft.newDocumentError = action.error;
        break;
      case UPLOAD_FILE:
        draft.uploadFileLoading = true;
        draft.uploadFileSuccess = false;
        draft.uploadFileError = '';
        break;
      case UPLOAD_FILE_SUCCESS:
        draft.uploadFile = [...draft.uploadFile, action.data];
        draft.uploadFileLoading = false;
        draft.uploadFileSuccess = true;
        draft.uploadFileError = '';
        break;
      case UPLOAD_FILE_ERROR:
        draft.uploadFileLoading = false;
        draft.uploadFileSuccess = false;
        draft.uploadFileError = action.error;
        break;
      case CLEAN_UPLOAD_FILE:
        draft.uploadFile = [];
        break;
      case FAQ_SEARCH:
        draft.communityTabLoading = true;
        draft.communityTabSuccess = false;
        draft.communityTabError = '';
        break;
      case FAQ_SEARCH_SUCCESS:
        draft.communityTab = action.data;
        draft.communityTabLoading = false;
        draft.communityTabSuccess = true;
        draft.communityTabError = '';
        break;
      case FAQ_SEARCH_ERROR:
        draft.communityTabLoading = false;
        draft.communityTabSuccess = false;
        draft.communityTabError = action.error;
        break;
      case FAQ_SEARCH_MORE:
        draft.communityTabLoading = true;
        draft.communityTabSuccess = false;
        draft.communityTabError = '';
        break;
      case FAQ_SEARCH_MORE_SUCCESS:
        draft.communityTab = [...draft.communityTab, ...action.data];
        draft.communityTabLoading = false;
        draft.communityTabSuccess = true;
        draft.communityTabError = '';
        break;
      case FAQ_SEARCH_MORE_ERROR:
        draft.communityTabLoading = false;
        draft.communityTabSuccess = false;
        draft.communityTabError = action.error;
        break;
      case WIDGET_LIST:
        draft.widgetList = [];
        draft.widgetListLoading = true;
        draft.widgetListSuccess = false;
        draft.widgetListError = '';
        break;
      case WIDGET_LIST_SUCCESS:
        draft.widgetList = action.data;
        draft.widgetListLoading = false;
        draft.widgetListSuccess = true;
        draft.widgetListError = '';
        break;
      case WIDGET_LIST_ERROR:
        draft.widgetListLoading = false;
        draft.widgetListSuccess = false;
        draft.widgetListError = action.error;
        break;
      case WIDGET_LIST_ORDER:
        draft.widgetList = action.data;
        break;
      default:
        return state;
    }
  });

export default communityTabReducer;

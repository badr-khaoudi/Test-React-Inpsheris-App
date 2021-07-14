/*
 *
 * CreateCommunity reducer
 *
 */
import produce from 'immer';
import {
  COMMUNITY_GROUP_LIST,
  COMMUNITY_GROUP_LIST_SUCCESS,
  COMMUNITY_GROUP_LIST_ERROR,
  TAB_TYPE_LIST,
  TAB_TYPE_LIST_SUCCESS,
  TAB_TYPE_LIST_ERROR,
  CREATE_COMMUNITY,
  CREATE_COMMUNITY_SUCCESS,
  CREATE_COMMUNITY_ERROR,
  CLEAN_CREATE_COMMUNITY,
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  COMMUNITY,
  COMMUNITY_SUCCESS,
  COMMUNITY_ERROR,
  DELETE_TAB,
  DELETE_TAB_SUCCESS,
  DELETE_TAB_ERROR,
  RESET_COMMUNITY,
  HAS_CONTENT,
  HAS_CONTENT_SUCCESS,
  HAS_CONTENT_ERROR,
  JOINED_TEAMS,
  JOINED_TEAMS_SUCCESS,
  JOINED_TEAMS_ERROR,
  LIST_CHANNELS,
  LIST_CHANNELS_SUCCESS,
  LIST_CHANNELS_ERROR,
  FILES_FOLDER,
  FILES_FOLDER_SUCCESS,
  FILES_FOLDER_ERROR,
} from './constants';

export const initialState = {
  communityGroupList: [],
  communityGroupListLoading: false,
  communityGroupListSuccess: false,
  communityGroupListError: '',
  tabTypeList: [],
  tabTypeListLoading: false,
  tabTypeListSuccess: false,
  tabTypeListError: '',
  createCommunityLoading: false,
  createCommunitySuccess: false,
  createCommunityError: '',
  uploadFile: {},
  uploadFileLoading: false,
  uploadFileSuccess: false,
  uploadFileError: '',
  community: '',
  communityLoading: false,
  communitySuccess: false,
  communityError: '',
  deleteTab: [],
  deleteTabLoading: false,
  deleteTabSuccess: false,
  deleteTabError: '',
  hasContent: {},
  hasContentLoading: false,
  hasContentSuccess: false,
  hasContentError: '',
  joinedTeams: {},
  joinedTeamsLoading: false,
  joinedTeamsSuccess: false,
  joinedTeamsError: '',
  listChannels: {},
  listChannelsLoading: false,
  listChannelsSuccess: false,
  listChannelsError: '',
  filesFolder: {},
  filesFolderLoading: false,
  filesFolderSuccess: false,
  filesFolderError: '',
};

/* eslint-disable default-case, no-param-reassign */
const createCommunityReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case COMMUNITY_GROUP_LIST:
        draft.communityGroupList = [];
        draft.communityGroupListLoading = true;
        draft.communityGroupListSuccess = false;
        draft.communityGroupListError = '';
        break;
      case COMMUNITY_GROUP_LIST_SUCCESS:
        draft.communityGroupList = action.data;
        draft.communityGroupListLoading = false;
        draft.communityGroupListSuccess = true;
        draft.communityGroupListError = '';
        break;
      case COMMUNITY_GROUP_LIST_ERROR:
        draft.communityGroupListLoading = false;
        draft.communityGroupListSuccess = false;
        draft.communityGroupListError = action.error;
        break;
      case TAB_TYPE_LIST:
        draft.tabTypeList = [];
        draft.tabTypeListLoading = true;
        draft.tabTypeListSuccess = false;
        draft.tabTypeListError = '';
        break;
      case TAB_TYPE_LIST_SUCCESS:
        draft.tabTypeList = action.data;
        draft.tabTypeListLoading = false;
        draft.tabTypeListSuccess = true;
        draft.tabTypeListError = '';
        break;
      case TAB_TYPE_LIST_ERROR:
        draft.tabTypeListLoading = false;
        draft.tabTypeListSuccess = false;
        draft.tabTypeListError = action.error;
        break;
      case CREATE_COMMUNITY:
        draft.createCommunityLoading = true;
        draft.createCommunitySuccess = false;
        draft.createCommunityError = '';
        break;
      case CREATE_COMMUNITY_SUCCESS:
        draft.createCommunityLoading = false;
        draft.createCommunitySuccess = true;
        draft.createCommunityError = '';
        break;
      case CREATE_COMMUNITY_ERROR:
        draft.createCommunityLoading = false;
        draft.createCommunitySuccess = false;
        draft.createCommunityError = action.error;
        break;
      case CLEAN_CREATE_COMMUNITY:
        draft.createCommunityLoading = false;
        draft.createCommunitySuccess = false;
        draft.createCommunityError = '';
        break;
      case UPLOAD_FILE:
        draft.uploadFileLoading = true;
        draft.uploadFileSuccess = false;
        draft.uploadFileError = '';
        break;
      case UPLOAD_FILE_SUCCESS:
        draft.uploadFile[action.field] = action.data;
        draft.uploadFileLoading = false;
        draft.uploadFileSuccess = true;
        draft.uploadFileError = '';
        break;
      case UPLOAD_FILE_ERROR:
        draft.uploadFileLoading = false;
        draft.uploadFileSuccess = false;
        draft.uploadFileError = action.error;
        break;
      case COMMUNITY:
        draft.community = '';
        draft.communityLoading = true;
        draft.communitySuccess = false;
        draft.communityError = '';
        break;
      case COMMUNITY_SUCCESS:
        draft.community = action.data;
        draft.communityLoading = false;
        draft.communitySuccess = true;
        draft.communityError = '';
        break;
      case COMMUNITY_ERROR:
        draft.communityLoading = false;
        draft.communitySuccess = false;
        draft.communityError = action.error;
        break;
      case RESET_COMMUNITY:
        draft.community = '';
        draft.communityLoading = false;
        draft.communitySuccess = false;
        draft.communityError = '';
        break;
      case DELETE_TAB:
        draft.deleteTabLoading = true;
        draft.deleteTabSuccess = false;
        draft.deleteTabError = '';
        break;
      case DELETE_TAB_SUCCESS:
        draft.deleteTab = [...draft.deleteTab, action.tabUid];
        draft.deleteTabLoading = false;
        draft.deleteTabSuccess = true;
        draft.deleteTabError = '';
        break;
      case DELETE_TAB_ERROR:
        draft.deleteTabLoading = false;
        draft.deleteTabSuccess = false;
        draft.deleteTabError = action.error;
        break;
      case HAS_CONTENT:
        draft.hasContentLoading = true;
        draft.hasContentSuccess = false;
        draft.hasContentError = '';
        break;
      case HAS_CONTENT_SUCCESS:
        draft.hasContent[action.options.tabUid] = {
          ...action.options,
          hasContent: action.data,
        };
        draft.hasContentLoading = false;
        draft.hasContentSuccess = true;
        draft.hasContentError = '';
        break;
      case HAS_CONTENT_ERROR:
        draft.hasContentLoading = false;
        draft.hasContentSuccess = false;
        draft.hasContentError = action.error;
        break;
      case JOINED_TEAMS:
        draft.joinedTeams = {};
        draft.joinedTeamsLoading = true;
        draft.joinedTeamsSuccess = false;
        draft.joinedTeamsError = '';
        break;
      case JOINED_TEAMS_SUCCESS:
        draft.joinedTeams = action.data;
        draft.joinedTeamsLoading = false;
        draft.joinedTeamsSuccess = true;
        draft.joinedTeamsError = '';
        break;
      case JOINED_TEAMS_ERROR:
        draft.joinedTeamsLoading = false;
        draft.joinedTeamsSuccess = false;
        draft.joinedTeamsError = action.error;
        break;
      case LIST_CHANNELS:
        draft.listChannels = {};
        draft.listChannelsLoading = true;
        draft.listChannelsSuccess = false;
        draft.listChannelsError = '';
        break;
      case LIST_CHANNELS_SUCCESS:
        draft.listChannels = action.data;
        draft.listChannelsLoading = false;
        draft.listChannelsSuccess = true;
        draft.listChannelsError = '';
        break;
      case LIST_CHANNELS_ERROR:
        draft.listChannelsLoading = false;
        draft.listChannelsSuccess = false;
        draft.listChannelsError = action.error;
        break;
      case FILES_FOLDER:
        draft.filesFolder = {};
        draft.filesFolderLoading = true;
        draft.filesFolderSuccess = false;
        draft.filesFolderError = '';
        break;
      case FILES_FOLDER_SUCCESS:
        draft.filesFolder = action.data;
        draft.filesFolderLoading = false;
        draft.filesFolderSuccess = true;
        draft.filesFolderError = '';
        break;
      case FILES_FOLDER_ERROR:
        draft.filesFolderLoading = false;
        draft.filesFolderSuccess = false;
        draft.filesFolderError = action.error;
        break;
      default:
        return state;
    }
  });

export default createCommunityReducer;

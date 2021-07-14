/*
 *
 * DocumentBar reducer
 *
 */
import produce from 'immer';
import {
  LATEST_OPENS,
  LATEST_OPENS_SUCCESS,
  LATEST_OPENS_ERROR,
  LATEST_UPDATES,
  LATEST_UPDATES_SUCCESS,
  LATEST_UPDATES_ERROR,
  COMMUNITY_GROUP_LIST,
  COMMUNITY_GROUP_LIST_SUCCESS,
  COMMUNITY_GROUP_LIST_ERROR,
  COMMUNITY_LIST,
  COMMUNITY_LIST_SUCCESS,
  COMMUNITY_LIST_ERROR,
  COMMUNITY_TAB_LIST,
  COMMUNITY_TAB_LIST_SUCCESS,
  COMMUNITY_TAB_LIST_ERROR,
  COMMUNITY_FILE_LIST,
  COMMUNITY_FILE_LIST_SUCCESS,
  COMMUNITY_FILE_LIST_ERROR,
  SEARCH_COMMUNITY_FILE,
  SEARCH_COMMUNITY_FILE_SUCCESS,
  SEARCH_COMMUNITY_FILE_ERROR,
  SEARCH_COMMUNITY_FILE_MORE,
  SEARCH_COMMUNITY_FILE_MORE_SUCCESS,
  SEARCH_COMMUNITY_FILE_MORE_ERROR,
  COMMUNITY_OPTIONS,
  COMMUNITY_OPTIONS_SUCCESS,
  COMMUNITY_OPTIONS_ERROR,
  FILE_TYPE,
  FILE_TYPE_SUCCESS,
  FILE_TYPE_ERROR,
  AUTHOR_LIST,
  AUTHOR_LIST_SUCCESS,
  AUTHOR_LIST_ERROR,
  CONFIG,
  CONFIG_SUCCESS,
  CONFIG_ERROR,
  EXTERNAL_SOURCE,
  EXTERNAL_SOURCE_SUCCESS,
  EXTERNAL_SOURCE_ERROR,
  DRIVE_RECENT,
  DRIVE_RECENT_SUCCESS,
  DRIVE_RECENT_ERROR,
  LIST_CHILDREN_ROOT,
  LIST_CHILDREN_DRIVE_ITEM,
  LIST_ITEMS_DRIVE,
  SHARE_POINT_SITES,
  DOCUMENT_LIBRARIES,
  CONTENTS_SUCCESS,
  CONTENTS_ERROR,
  SEARCH_ENTITY,
  SEARCH_ENTITY_SUCCESS,
  SEARCH_ENTITY_ERROR,
  SEARCH_ENTITY_MORE,
  SEARCH_ENTITY_MORE_SUCCESS,
  SEARCH_ENTITY_MORE_ERROR,
  SEARCH_COMMUNITY_AND_ENTITY,
  SEARCH_COMMUNITY_AND_ENTITY_SUCCESS,
  SEARCH_COMMUNITY_AND_ENTITY_ERROR,
  SEARCH_COMMUNITY_AND_ENTITY_MORE,
  SEARCH_COMMUNITY_AND_ENTITY_MORE_SUCCESS,
  SEARCH_COMMUNITY_AND_ENTITY_MORE_ERROR,
  BATCH,
  LIVELY_AND_DRIVE_RECENT,
  LIVELY_AND_DRIVE_RECENT_SUCCESS,
  LIVELY_AND_DRIVE_RECENT_ERROR,
} from './constants';

export const initialState = {
  latestOpens: [],
  latestOpensPage: 1,
  latestOpensLoading: false,
  latestOpensSuccess: false,
  latestOpensError: '',
  latestUpdates: [],
  latestUpdatesPage: 1,
  latestUpdatesLoading: false,
  latestUpdatesSuccess: false,
  latestUpdatesError: '',
  communityGroupList: [],
  communityGroupListLoading: false,
  communityGroupListSuccess: false,
  communityGroupListError: '',
  communityList: [],
  communityListLoading: false,
  communityListSuccess: false,
  communityListError: '',
  communityTabList: [],
  communityTabListLoading: false,
  communityTabListSuccess: false,
  communityTabListError: '',
  communityFileList: [],
  communityFileListLoading: false,
  communityFileListSuccess: false,
  communityFileListError: '',
  searchCommunityFile: { rows: [], total: 0 },
  searchCommunityPage: 1,
  searchCommunityFileLoading: false,
  searchCommunityFileSuccess: false,
  searchCommunityFileError: '',
  communityOptions: [],
  communityOptionsLoading: false,
  communityOptionsSuccess: false,
  communityOptionsError: '',
  fileType: [],
  fileTypeLoading: false,
  fileTypeSuccess: false,
  fileTypeError: '',
  authorList: [],
  authorListLoading: false,
  authorListSuccess: false,
  authorListError: '',
  config: {},
  configLoading: false,
  configSuccess: false,
  configError: '',
  externalSource: [],
  externalSourceLoading: false,
  externalSourceSuccess: false,
  externalSourceError: '',
  driveRecent: { value: [] },
  driveRecentItems: 5,
  driveRecentLoading: false,
  driveRecentSuccess: false,
  driveRecentError: '',
  contents: {},
  contentsLoading: false,
  contentsSuccess: false,
  contentsError: '',
  searchEntity: {},
  searchEntityFrom: 0,
  searchEntityLoading: false,
  searchEntitySuccess: false,
  searchEntityError: '',
  searchCommunityAndEntity: { communityData: {}, entityData: {} },
  searchCommunityAndEntityPage: 0,
  searchCommunityAndEntityLoading: false,
  searchCommunityAndEntitySuccess: false,
  searchCommunityAndEntityError: '',
  batch: [],
  livelyAndDriveRecent: { livelyData: {}, driveData: {} },
  livelyAndDriveRecentPage: 0,
  livelyAndDriveRecentLoading: false,
  livelyAndDriveRecentSuccess: false,
  livelyAndDriveRecentError: '',
};

/* eslint-disable default-case, no-param-reassign */
const documentBarReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case LATEST_OPENS:
        draft.latestOpensLoading = true;
        draft.latestOpensSuccess = false;
        draft.latestOpensError = '';
        draft.latestUpdates = [];
        draft.latestUpdatesPage = 1;
        draft.latestUpdatesLoading = false;
        draft.latestUpdatesSuccess = false;
        draft.latestUpdatesError = '';
        break;
      case LATEST_OPENS_SUCCESS:
        draft.latestOpens = [...draft.latestOpens, ...action.data];
        draft.latestOpensPage += 1;
        draft.latestOpensLoading = false;
        draft.latestOpensSuccess = true;
        draft.latestOpensError = '';
        break;
      case LATEST_OPENS_ERROR:
        draft.latestOpensLoading = false;
        draft.latestOpensSuccess = false;
        draft.latestOpensError = action.error;
        break;
      case LATEST_UPDATES:
        draft.latestUpdatesLoading = true;
        draft.latestUpdatesSuccess = false;
        draft.latestUpdatesError = '';
        draft.latestOpens = [];
        draft.latestOpensPage = 1;
        draft.latestOpensLoading = false;
        draft.latestOpensSuccess = false;
        draft.latestOpensError = '';
        break;
      case LATEST_UPDATES_SUCCESS:
        draft.latestUpdates = [...draft.latestUpdates, ...action.data];
        draft.latestUpdatesPage += 1;
        draft.latestUpdatesLoading = false;
        draft.latestUpdatesSuccess = true;
        draft.latestUpdatesError = '';
        break;
      case LATEST_UPDATES_ERROR:
        draft.latestUpdatesLoading = false;
        draft.latestUpdatesSuccess = false;
        draft.latestUpdatesError = action.error;
        break;
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
      case COMMUNITY_LIST:
        draft.communityList = [];
        draft.communityListLoading = true;
        draft.communityListSuccess = false;
        draft.communityListError = '';
        break;
      case COMMUNITY_LIST_SUCCESS:
        draft.communityList = action.data;
        draft.communityListLoading = false;
        draft.communityListSuccess = true;
        draft.communityListError = '';
        break;
      case COMMUNITY_LIST_ERROR:
        draft.communityListLoading = false;
        draft.communityListSuccess = false;
        draft.communityListError = action.error;
        break;
      case COMMUNITY_TAB_LIST:
        draft.communityTabList = [];
        draft.communityTabListLoading = true;
        draft.communityTabListSuccess = false;
        draft.communityTabListError = '';
        break;
      case COMMUNITY_TAB_LIST_SUCCESS:
        draft.communityTabList = action.data;
        draft.communityTabListLoading = false;
        draft.communityTabListSuccess = true;
        draft.communityTabListError = '';
        break;
      case COMMUNITY_TAB_LIST_ERROR:
        draft.communityTabListLoading = false;
        draft.communityTabListSuccess = false;
        draft.communityTabListError = action.error;
        break;
      case COMMUNITY_FILE_LIST:
        draft.communityFileList = [];
        draft.communityFileListLoading = true;
        draft.communityFileListSuccess = false;
        draft.communityFileListError = '';
        break;
      case COMMUNITY_FILE_LIST_SUCCESS:
        draft.communityFileList = action.data;
        draft.communityFileListLoading = false;
        draft.communityFileListSuccess = true;
        draft.communityFileListError = '';
        break;
      case COMMUNITY_FILE_LIST_ERROR:
        draft.communityFileListLoading = false;
        draft.communityFileListSuccess = false;
        draft.communityFileListError = action.error;
        break;
      case SEARCH_COMMUNITY_FILE:
        draft.searchEntity = {};
        draft.searchCommunityAndEntity = { communityData: {}, entityData: {} };
        draft.searchCommunityAndEntityPage += 1;
        draft.searchCommunityFile = { rows: [], total: 0 };
        draft.searchCommunityPage = 1;
        draft.searchCommunityFileLoading = true;
        draft.searchCommunityFileSuccess = false;
        draft.searchCommunityFileError = '';
        break;
      case SEARCH_COMMUNITY_FILE_SUCCESS:
        draft.searchCommunityFile = action.data;
        draft.searchCommunityPage += 1;
        draft.searchCommunityFileLoading = false;
        draft.searchCommunityFileSuccess = true;
        draft.searchCommunityFileError = '';
        break;
      case SEARCH_COMMUNITY_FILE_ERROR:
        draft.searchCommunityFileLoading = false;
        draft.searchCommunityFileSuccess = false;
        draft.searchCommunityFileError = action.error;
        break;
      case SEARCH_COMMUNITY_FILE_MORE:
        draft.searchCommunityFileLoading = true;
        draft.searchCommunityFileSuccess = false;
        draft.searchCommunityFileError = '';
        break;
      case SEARCH_COMMUNITY_FILE_MORE_SUCCESS:
        draft.searchCommunityFile.rows = [
          ...draft.searchCommunityFile.rows,
          ...action.data.rows,
        ];
        draft.searchCommunityFile.total = action.data.total;
        draft.searchCommunityPage += 1;
        draft.searchCommunityFileLoading = false;
        draft.searchCommunityFileSuccess = true;
        draft.searchCommunityFileError = '';
        break;
      case SEARCH_COMMUNITY_FILE_MORE_ERROR:
        draft.searchCommunityFileLoading = false;
        draft.searchCommunityFileSuccess = false;
        draft.searchCommunityFileError = action.error;
        break;
      case COMMUNITY_OPTIONS:
        draft.communityOptions = [];
        draft.communityOptionsLoading = true;
        draft.communityOptionsSuccess = false;
        draft.communityOptionsError = '';
        break;
      case COMMUNITY_OPTIONS_SUCCESS:
        draft.communityOptions = action.data;
        draft.communityOptionsLoading = false;
        draft.communityOptionsSuccess = true;
        draft.communityOptionsError = '';
        break;
      case COMMUNITY_OPTIONS_ERROR:
        draft.communityOptionsLoading = false;
        draft.communityOptionsSuccess = false;
        draft.communityOptionsError = action.error;
        break;
      case FILE_TYPE:
        draft.fileType = [];
        draft.fileTypeLoading = true;
        draft.fileTypeSuccess = false;
        draft.fileTypeError = '';
        break;
      case FILE_TYPE_SUCCESS:
        draft.fileType = action.data;
        draft.fileTypeLoading = false;
        draft.fileTypeSuccess = true;
        draft.fileTypeError = '';
        break;
      case FILE_TYPE_ERROR:
        draft.fileTypeLoading = false;
        draft.fileTypeSuccess = false;
        draft.fileTypeError = action.error;
        break;
      case AUTHOR_LIST:
        draft.authorList = [];
        draft.authorListLoading = true;
        draft.authorListSuccess = false;
        draft.authorListError = '';
        break;
      case AUTHOR_LIST_SUCCESS:
        draft.authorList = action.data;
        draft.authorListLoading = false;
        draft.authorListSuccess = true;
        draft.authorListError = '';
        break;
      case AUTHOR_LIST_ERROR:
        draft.authorListLoading = false;
        draft.authorListSuccess = false;
        draft.authorListError = action.error;
        break;
      case CONFIG:
        draft.config = {};
        draft.configLoading = true;
        draft.configSuccess = false;
        draft.configError = '';
        break;
      case CONFIG_SUCCESS:
        draft.config = action.data;
        draft.configLoading = false;
        draft.configSuccess = true;
        draft.configError = '';
        break;
      case CONFIG_ERROR:
        draft.configLoading = false;
        draft.configSuccess = false;
        draft.configError = action.error;
        break;
      case EXTERNAL_SOURCE:
        draft.externalSource = [];
        draft.externalSourceLoading = true;
        draft.externalSourceSuccess = false;
        draft.externalSourceError = '';
        break;
      case EXTERNAL_SOURCE_SUCCESS:
        draft.externalSource = action.data;
        draft.externalSourceLoading = false;
        draft.externalSourceSuccess = true;
        draft.externalSourceError = '';
        break;
      case EXTERNAL_SOURCE_ERROR:
        draft.externalSourceLoading = false;
        draft.externalSourceSuccess = false;
        draft.externalSourceError = action.error;
        break;
      case DRIVE_RECENT:
        draft.latestOpens = [];
        draft.latestOpensPage = 1;
        draft.latestUpdates = [];
        draft.latestUpdatesPage = 1;
        draft.driveRecent = { value: [] };
        draft.driveRecentLoading = true;
        draft.driveRecentSuccess = false;
        draft.driveRecentError = '';
        break;
      case DRIVE_RECENT_SUCCESS:
        draft.driveRecent = {
          ...action.data,
          value: [...draft.driveRecent.value, ...action.data.value],
        };
        draft.driveRecentLoading = false;
        draft.driveRecentSuccess = true;
        draft.driveRecentError = '';
        break;
      case DRIVE_RECENT_ERROR:
        draft.driveRecentLoading = false;
        draft.driveRecentSuccess = false;
        draft.driveRecentError = action.error;
        break;
      case LIST_CHILDREN_ROOT:
      case LIST_CHILDREN_DRIVE_ITEM:
      case LIST_ITEMS_DRIVE:
      case SHARE_POINT_SITES:
      case DOCUMENT_LIBRARIES:
        draft.contents = {};
        draft.contentsLoading = true;
        draft.contentsSuccess = false;
        draft.contentsError = '';
        break;
      case CONTENTS_SUCCESS:
        draft.contents = action.data;
        draft.contentsLoading = false;
        draft.contentsSuccess = true;
        draft.contentsError = '';
        break;
      case CONTENTS_ERROR:
        draft.contentsLoading = false;
        draft.contentsSuccess = false;
        draft.contentsError = action.error;
        break;
      case SEARCH_ENTITY:
        draft.searchCommunityAndEntity = { communityData: {}, entityData: {} };
        draft.searchCommunityAndEntityPage += 1;
        draft.searchCommunityFile = { rows: [], total: 0 };
        draft.searchEntity = {};
        draft.searchEntityFrom = 0;
        draft.searchEntityLoading = true;
        draft.searchEntitySuccess = false;
        draft.searchEntityError = '';
        break;
      case SEARCH_ENTITY_SUCCESS:
        // eslint-disable-next-line prefer-destructuring
        draft.searchEntity = action.data.value[0].hitsContainers[0];
        draft.searchEntityFrom += 20;
        draft.searchEntityLoading = false;
        draft.searchEntitySuccess = true;
        draft.searchEntityError = '';
        break;
      case SEARCH_ENTITY_ERROR:
        draft.searchEntityLoading = false;
        draft.searchEntitySuccess = false;
        draft.searchEntityError = action.error;
        break;
      case SEARCH_ENTITY_MORE:
        draft.searchEntityLoading = true;
        draft.searchEntitySuccess = false;
        draft.searchEntityError = '';
        break;
      case SEARCH_ENTITY_MORE_SUCCESS:
        draft.searchEntity = {
          ...action.data.value[0].hitsContainers[0],
          hits: [
            ...draft.searchEntity.hits,
            ...action.data.value[0].hitsContainers[0].hits,
          ],
        };
        draft.searchEntityFrom += 20;
        draft.searchEntityLoading = false;
        draft.searchEntitySuccess = true;
        draft.searchEntityError = '';
        break;
      case SEARCH_ENTITY_MORE_ERROR:
        draft.searchEntityLoading = false;
        draft.searchEntitySuccess = false;
        draft.searchEntityError = action.error;
        break;
      case SEARCH_COMMUNITY_AND_ENTITY:
        draft.searchCommunityFile = { rows: [], total: 0 };
        draft.searchEntity = {};
        draft.searchCommunityAndEntity = { communityData: {}, entityData: {} };
        draft.searchCommunityAndEntityPage = 1;
        draft.searchCommunityAndEntityLoading = true;
        draft.searchCommunityAndEntitySuccess = false;
        draft.searchCommunityAndEntityError = '';
        break;
      case SEARCH_COMMUNITY_AND_ENTITY_SUCCESS:
        draft.searchCommunityAndEntity = {
          communityData: action.communityData,
          entityData: action.entityData.value[0].hitsContainers[0],
        };
        draft.searchCommunityAndEntityPage += 1;
        draft.searchCommunityAndEntityLoading = false;
        draft.searchCommunityAndEntitySuccess = true;
        draft.searchCommunityAndEntityError = '';
        break;
      case SEARCH_COMMUNITY_AND_ENTITY_ERROR:
        draft.searchCommunityAndEntityLoading = false;
        draft.searchCommunityAndEntitySuccess = false;
        draft.searchCommunityAndEntityError = action.error;
        break;
      case SEARCH_COMMUNITY_AND_ENTITY_MORE:
        draft.searchCommunityAndEntityLoading = true;
        draft.searchCommunityAndEntitySuccess = false;
        draft.searchCommunityAndEntityError = '';
        break;
      case SEARCH_COMMUNITY_AND_ENTITY_MORE_SUCCESS:
        draft.searchCommunityAndEntity = {
          communityData: action.communityData,
          entityData: action.entityData.value[0].hitsContainers[0],
        };
        draft.searchCommunityAndEntityPage += 1;
        draft.searchCommunityAndEntityLoading = false;
        draft.searchCommunityAndEntitySuccess = true;
        draft.searchCommunityAndEntityError = '';
        break;
      case SEARCH_COMMUNITY_AND_ENTITY_MORE_ERROR:
        draft.searchCommunityAndEntityLoading = false;
        draft.searchCommunityAndEntitySuccess = false;
        draft.searchCommunityAndEntityError = action.error;
        break;
      case BATCH:
        draft.batch = [...draft.batch, ...action.data];
        break;
      case LIVELY_AND_DRIVE_RECENT:
        draft.latestOpens = [];
        draft.latestOpensPage = 1;
        draft.latestUpdates = [];
        draft.latestUpdatesPage = 1;
        draft.driveRecent = { value: [] };
        draft.livelyAndDriveRecent = { livelyData: {}, driveData: {} };
        draft.livelyAndDriveRecentPage = 1;
        draft.livelyAndDriveRecentLoading = true;
        draft.livelyAndDriveRecentSuccess = false;
        draft.livelyAndDriveRecentError = '';
        break;
      case LIVELY_AND_DRIVE_RECENT_SUCCESS:
        draft.livelyAndDriveRecent = {
          livelyData: action.livelyData,
          driveData: action.driveData,
        };
        draft.livelyAndDriveRecentPage += 1;
        draft.livelyAndDriveRecentLoading = false;
        draft.livelyAndDriveRecentSuccess = true;
        draft.livelyAndDriveRecentError = '';
        break;
      case LIVELY_AND_DRIVE_RECENT_ERROR:
        draft.livelyAndDriveRecentLoading = false;
        draft.livelyAndDriveRecentSuccess = false;
        draft.livelyAndDriveRecentError = action.error;
        break;
      default:
        return state;
    }
  });

export default documentBarReducer;

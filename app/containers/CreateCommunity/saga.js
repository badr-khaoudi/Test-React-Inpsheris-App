import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import {
  communityGroupList as communityGroupListApi,
  tabTypeList as tabTypeListApi,
  createCommunity as createCommunityApi,
  community as communityApi,
  deleteTab as deleteTabApi,
  hasContent as hasContentApi,
  joinedTeams as joinedTeamsApi,
  listChannels as listChannelsApi,
  filesFolder as filesFolderApi,
} from 'utils/api/CommunityApi';
import { uploadFile as uploadFileApi } from 'utils/api/AuthApi';
import {
  entitiesUpdate,
  deleteCommunityTab,
} from 'containers/GlobalEntities/actions';
import {
  communityGroupListSuccess,
  communityGroupListError,
  tabTypeListSuccess,
  tabTypeListError,
  createCommunitySuccess,
  createCommunityError,
  uploadFileSuccess,
  uploadFileError,
  communitySuccess,
  communityError,
  deleteTabSuccess,
  deleteTabError,
  hasContentSuccess,
  hasContentError,
  joinedTeamsSuccess,
  joinedTeamsError,
  listChannelsSuccess,
  listChannelsError,
  filesFolderSuccess,
  filesFolderError,
} from './actions';
import {
  COMMUNITY_GROUP_LIST,
  TAB_TYPE_LIST,
  CREATE_COMMUNITY,
  UPLOAD_FILE,
  COMMUNITY,
  DELETE_TAB,
  HAS_CONTENT,
  JOINED_TEAMS,
  LIST_CHANNELS,
  FILES_FOLDER,
} from './constants';

export function* communityGroupList() {
  try {
    const { data } = yield call(communityGroupListApi);
    yield put(communityGroupListSuccess(data));
  } catch (error) {
    yield put(communityGroupListError(error.message));
  }
}

export function* tabTypeList() {
  try {
    const { data } = yield call(tabTypeListApi);
    yield put(tabTypeListSuccess(data));
  } catch (error) {
    yield put(tabTypeListError(error.message));
  }
}

export function* createCommunity({ options }) {
  try {
    yield call(createCommunityApi, options);
    yield put(createCommunitySuccess());
  } catch (error) {
    yield put(createCommunityError(error.message));
  }
}

export function* uploadFile({ field, formData }) {
  try {
    const { data } = yield call(uploadFileApi, formData);
    yield put(uploadFileSuccess(field, data));
  } catch (error) {
    yield put(uploadFileError(error.message));
  }
}

export function* community({ options }) {
  try {
    const { entities, result } = yield call(communityApi, options);
    yield put(entitiesUpdate(entities));
    yield put(communitySuccess(result));
  } catch (error) {
    yield put(communityError(error.message));
  }
}

export function* deleteTab({ communityUid, options }) {
  try {
    yield call(deleteTabApi, options);
    yield put(deleteTabSuccess(options.uid));
    yield put(deleteCommunityTab(communityUid, options.uid));
  } catch (error) {
    yield put(deleteTabError(error.message));
  }
}

export function* hasContent({ options }) {
  try {
    const { data } = yield call(hasContentApi, options);
    yield put(hasContentSuccess(options, data));
  } catch (error) {
    yield put(hasContentError(error.message));
  }
}

export function* joinedTeams() {
  try {
    const { data } = yield call(joinedTeamsApi);
    yield put(joinedTeamsSuccess(data));
  } catch (error) {
    yield put(joinedTeamsError(error.message));
  }
}

export function* listChannels({ teamId }) {
  try {
    const { data } = yield call(listChannelsApi, teamId);
    yield put(listChannelsSuccess(data));
  } catch (error) {
    yield put(listChannelsError(error.message));
  }
}

export function* filesFolder({ tabUid, teamId, channelId }) {
  try {
    const { data } = yield call(filesFolderApi, teamId, channelId);
    yield put(filesFolderSuccess({ tabUid, data }));
  } catch (error) {
    yield put(filesFolderError(error.message));
  }
}

export default function* createCommunitySaga() {
  yield takeLatest(COMMUNITY_GROUP_LIST, communityGroupList);
  yield takeLatest(TAB_TYPE_LIST, tabTypeList);
  yield takeLatest(CREATE_COMMUNITY, createCommunity);
  yield takeEvery(UPLOAD_FILE, uploadFile);
  yield takeLatest(COMMUNITY, community);
  yield takeEvery(DELETE_TAB, deleteTab);
  yield takeEvery(HAS_CONTENT, hasContent);
  yield takeEvery(JOINED_TEAMS, joinedTeams);
  yield takeEvery(LIST_CHANNELS, listChannels);
  yield takeEvery(FILES_FOLDER, filesFolder);
}

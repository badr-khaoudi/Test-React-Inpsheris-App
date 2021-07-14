import { takeLatest, takeEvery, call, put, debounce } from 'redux-saga/effects';
import fileDownload from 'js-file-download';
import _ from 'lodash';
import {
  entitiesUpdate,
  entitiesReplace,
} from 'containers/GlobalEntities/actions';
import {
  languageList,
  configList,
  currentUser,
  customTemplateList as customTemplateListApi,
  digitalWorkplaceList as digitalWorkplaceListApi,
} from 'utils/api/AuthApi';
import { surveySummary as surveySummaryApi } from 'utils/api/WidgetManagerApi';
import { downloadFile } from 'utils/api/StatisticsApi';
import { communityList } from 'utils/api/CommunityApi';
import { contentDetails } from 'utils/api/HomeFeedApi';
import { downloadAllAsZip } from 'utils/api/BrowseAllApi';
import {
  GET_LANGUAGE,
  GET_CONFIG,
  GET_CURRENT_USER,
  CUSTOM_TEMPLATE_LIST,
  GET_COMMUNITY_LIST,
  FILTER_COMMUNITY_LIST,
  SURVEY_SUMMARY,
  DOWNLOAD_DOCUMENTS,
  CONTENT,
  DIGITAL_WORKPLACE_LIST,
} from './constants';
import {
  getLanguageSuccess,
  getLanguageError,
  getConfigSuccess,
  getConfigError,
  getCurrentUserSuccess,
  getCurrentUserError,
  getCommunityListSuccess,
  getCommunityListError,
  customTemplateListSuccess,
  customTemplateListError,
  surveySummarySuccess,
  surveySummaryError,
  downloadDocumentsSuccess,
  downloadDocumentsError,
  contentSuccess,
  contentError,
  digitalWorkplaceListSuccess,
  digitalWorkplaceListError,
} from './actions';

export function* getLanguage() {
  try {
    const { data } = yield call(languageList);
    yield put(getLanguageSuccess(data));
  } catch (error) {
    yield put(getLanguageError(error.message));
  }
}

export function* getConfig() {
  try {
    const { data } = yield call(configList);
    yield put(getConfigSuccess(data));
  } catch (error) {
    yield put(getConfigError(error));
  }
}

export function* getCurrentUser() {
  try {
    const user = yield call(currentUser);
    yield put(getCurrentUserSuccess(user.data));
  } catch (error) {
    yield put(getCurrentUserError(error));
  }
}

export function* customTemplateList() {
  try {
    const user = yield call(customTemplateListApi);
    yield put(customTemplateListSuccess(user.data));
  } catch (error) {
    yield put(customTemplateListError(error.message));
  }
}

export function* getCommunityList({ options }) {
  try {
    const { entities, result } = yield call(communityList, options);
    yield put(entitiesUpdate(entities));
    yield put(getCommunityListSuccess(result));
  } catch (error) {
    yield put(getCommunityListError(error.message));
  }
}

export function* surveySummary({ options }) {
  try {
    const { data } = yield call(surveySummaryApi, options);
    const fileName = _.last(_.split(data, '='));
    const { data: file } = yield call(downloadFile, { file: fileName });
    fileDownload(file, fileName);
    yield put(surveySummarySuccess());
  } catch (error) {
    yield put(surveySummaryError(error.message));
  }
}

export function* downloadDocuments({ options }) {
  try {
    const {
      entities: { feed },
      result,
    } = yield call(contentDetails, options);
    const { data } = yield call(downloadAllAsZip, {
      fileName: `${feed[result].title}.zip`,
      fileUids: _.map(
        _.find(feed[result].blocks, { type: 'documentGallery' }).documents,
        ({ uid }) => uid,
      ),
    });
    const fileName = _.last(_.split(data, '='));
    const { data: file } = yield call(downloadFile, { file: fileName });
    fileDownload(file, fileName);
    yield put(downloadDocumentsSuccess());
  } catch (error) {
    yield put(downloadDocumentsError(error.message));
  }
}

export function* content({ options }) {
  try {
    const {
      entities: { feed, ...rest },
    } = yield call(contentDetails, options);
    yield put(entitiesReplace('feed', options.uid, feed[options.uid]));
    yield put(entitiesUpdate(rest));
    yield put(contentSuccess());
  } catch (error) {
    yield put(contentError(error.message));
  }
}

export function* digitalWorkplaceList() {
  try {
    const { data } = yield call(digitalWorkplaceListApi);
    yield put(digitalWorkplaceListSuccess(data));
  } catch (error) {
    yield put(digitalWorkplaceListError(error.message));
  }
}

export default function* authBaseSaga() {
  yield takeLatest(GET_LANGUAGE, getLanguage);
  yield takeLatest(GET_CONFIG, getConfig);
  yield takeLatest(GET_CURRENT_USER, getCurrentUser);
  yield takeLatest(CUSTOM_TEMPLATE_LIST, customTemplateList);
  yield takeLatest(GET_COMMUNITY_LIST, getCommunityList);
  yield debounce(1000, FILTER_COMMUNITY_LIST, getCommunityList);
  yield takeLatest(SURVEY_SUMMARY, surveySummary);
  yield takeEvery(DOWNLOAD_DOCUMENTS, downloadDocuments);
  yield takeLatest(CONTENT, content);
  yield takeLatest(DIGITAL_WORKPLACE_LIST, digitalWorkplaceList);
}

import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import { uploadFile as uploadFileApi, templateType } from 'utils/api/AuthApi';
import { userCommunity as userCommunityApi } from 'utils/api/CommunityApi';
import {
  event,
  article,
  grandArticle,
  imageGallery,
  document,
} from 'utils/api/ContentCreationApi';
import { contentDetails } from 'utils/api/HomeFeedApi';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import { updateFeed } from 'containers/QuickPost/saga';
import {
  UPLOAD_FILE,
  USER_COMMUNITY,
  TEMPLATE_TYPE,
  CONTENT_CREATION_EVENT,
  CONTENT_CREATION_ARTICLE,
  CONTENT_CREATION_GRAND_ARTICLE,
  CONTENT_CREATION_IMAGE_GALLERY,
  CONTENT_CREATION_DOCUMENT,
  GET_CONTENT_DETAILS,
} from './constants';
import {
  uploadFileSuccess,
  uploadFileError,
  userCommunitySuccess,
  userCommunityError,
  templateTypeSuccess,
  templateTypeError,
  contentCreationSuccess,
  contentCreationError,
  getContentDetailsSuccess,
  getContentDetailsError,
} from './actions';

export function* uploadFile({ field, data: formData }) {
  try {
    const { data } = yield call(uploadFileApi, formData);
    yield put(uploadFileSuccess(field, data));
  } catch (error) {
    yield put(uploadFileError(error.message));
  }
}

export function* userCommunity({ options }) {
  try {
    const { data } = yield call(userCommunityApi, options);
    yield put(userCommunitySuccess(data));
  } catch (error) {
    yield put(userCommunityError(error.message));
  }
}

export function* createEvent({ content }) {
  try {
    const response = yield call(event, content);
    yield call(updateFeed, response, content);
    yield put(contentCreationSuccess());
  } catch (error) {
    yield put(contentCreationError(error.message));
  }
}

export function* createArticle({ content }) {
  try {
    const response = yield call(article, content);
    yield call(updateFeed, response, content);
    yield put(contentCreationSuccess());
  } catch (error) {
    yield put(contentCreationError(error.message));
  }
}

export function* createGrandArticle({ content }) {
  try {
    const response = yield call(grandArticle, content);
    yield call(updateFeed, response, content);
    yield put(contentCreationSuccess());
  } catch (error) {
    yield put(contentCreationError(error.message));
  }
}

export function* createImageGallery({ content }) {
  try {
    const response = yield call(imageGallery, content);
    yield call(updateFeed, response, content);
    yield put(contentCreationSuccess());
  } catch (error) {
    yield put(contentCreationError(error.message));
  }
}

export function* createDocument({ content }) {
  try {
    const response = yield call(document, content);
    yield call(updateFeed, response, content);
    yield put(contentCreationSuccess());
  } catch (error) {
    yield put(contentCreationError(error.message));
  }
}

export function* getTemplateType() {
  try {
    const { data } = yield call(templateType);
    yield put(templateTypeSuccess(data));
  } catch (error) {
    yield put(templateTypeError(error.message));
  }
}

export function* getContentDetails({ options }) {
  try {
    const { entities } = yield call(contentDetails, options);
    yield put(
      entitiesUpdate({
        ...entities,
        feed: {
          [options.uid]: {
            ...entities.feed[options.uid],
            detailBlocks: entities.feed[options.uid].blocks,
          },
        },
      }),
    );
    yield put(getContentDetailsSuccess());
  } catch (error) {
    yield put(getContentDetailsError(error.message));
  }
}

export default function* contentCreationSaga() {
  yield takeEvery(UPLOAD_FILE, uploadFile);
  yield takeLatest(USER_COMMUNITY, userCommunity);
  yield takeLatest(TEMPLATE_TYPE, getTemplateType);
  yield takeLatest(CONTENT_CREATION_EVENT, createEvent);
  yield takeLatest(CONTENT_CREATION_ARTICLE, createArticle);
  yield takeLatest(CONTENT_CREATION_GRAND_ARTICLE, createGrandArticle);
  yield takeLatest(CONTENT_CREATION_IMAGE_GALLERY, createImageGallery);
  yield takeLatest(CONTENT_CREATION_DOCUMENT, createDocument);
  yield takeLatest(GET_CONTENT_DETAILS, getContentDetails);
}

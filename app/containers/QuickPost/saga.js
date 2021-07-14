import { takeLatest, call, put, debounce } from 'redux-saga/effects';
import {
  quickPost,
  faq,
  quickSharingOfTheLink as quickSharingOfTheLinkApi,
  externalSource,
  oEmbed,
} from 'utils/api/AuthApi';
import { contentDetails } from 'utils/api/HomeFeedApi';
import {
  entitiesUpdate,
  entitiesReplace,
} from 'containers/GlobalEntities/actions';
import { addFeed } from 'containers/HomeFeed/actions';
import {
  createQuickPostSuccess,
  createQuickPostError,
  getContentDetailsSuccess,
  getContentDetailsError,
  getEmbedUrlSuccess,
  getEmbedUrlError,
  getOEmbedSuccess,
  getOEmbedError,
} from './actions';
import {
  CREATE_QUICKPOST,
  GET_CONTENT_DETAILS,
  CREATE_FAQ,
  QUICK_SHARING_OF_THE_LINK,
  GET_EMBED_URL,
  GET_OEMBED,
} from './constants';

export function* updateFeed({ entities: { feed, ...rest }, result }, options) {
  if (options.uid) {
    yield put(entitiesReplace('feed', options.uid, feed[options.uid]));
    yield put(entitiesUpdate(rest));
  } else {
    yield put(entitiesUpdate({ feed, ...rest }));
    yield put(addFeed(result));
  }
}

export function* createQuickPost({ options }) {
  try {
    const { entities, result } = yield call(quickPost, options);
    yield call(updateFeed, { entities, result }, options);
    yield put(createQuickPostSuccess());
  } catch (error) {
    yield put(createQuickPostError(error.message));
  }
}

export function* createFAQ({ options }) {
  try {
    const { entities, result } = yield call(faq, options);
    yield call(updateFeed, { entities, result }, options);
    yield put(createQuickPostSuccess());
  } catch (error) {
    yield put(createQuickPostError(error.message));
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

export function* quickSharingOfTheLink({ options }) {
  try {
    const { entities, result } = yield call(quickSharingOfTheLinkApi, options);
    yield call(updateFeed, { entities, result }, options);
    yield put(createQuickPostSuccess());
  } catch (error) {
    yield put(createQuickPostError(error.message));
  }
}

export function* getEmbedUrl({ options }) {
  try {
    const { data } = yield call(externalSource, options);
    yield put(getEmbedUrlSuccess(data));
  } catch (error) {
    yield put(getEmbedUrlError(error.message));
  }
}

export function* getOEmbed({ options }) {
  try {
    const { data } = yield call(oEmbed, options);
    yield put(getOEmbedSuccess(data));
  } catch (error) {
    const {
      response: { data },
    } = error;
    yield put(getOEmbedError(data.error_message));
  }
}

export default function* quickPostSaga() {
  yield takeLatest(CREATE_QUICKPOST, createQuickPost);
  yield takeLatest(GET_CONTENT_DETAILS, getContentDetails);
  yield takeLatest(CREATE_FAQ, createFAQ);
  yield takeLatest(QUICK_SHARING_OF_THE_LINK, quickSharingOfTheLink);
  yield takeLatest(GET_EMBED_URL, getEmbedUrl);
  yield debounce(1000, GET_OEMBED, getOEmbed);
}

import { takeLatest, call, put } from 'redux-saga/effects';
import { contentDetails as contentDetailsApi } from 'utils/api/HomeFeedApi';
import {
  entitiesReplace,
  entitiesUpdate,
} from 'containers/GlobalEntities/actions';
import { GET_CONTENT_DETAILS } from './constants';
import { getContentDetailsSuccess, getContentDetailsError } from './actions';

// const isCustomTab = window.parent !== window.self;

export function* contentDetails({ options }) {
  try {
    const {
      entities: { feed, ...rest },
    } = yield call(contentDetailsApi, options);
    yield put(entitiesUpdate(rest));
    yield put(
      entitiesReplace('feed', options.uid, {
        ...feed[options.uid],
        detailBlocks: feed[options.uid].blocks,
      }),
    );
    yield put(getContentDetailsSuccess());
  } catch (error) {
    yield put(getContentDetailsError(error.message));
  }
}

export default function* feedModalSaga() {
  yield takeLatest(GET_CONTENT_DETAILS, contentDetails);
}

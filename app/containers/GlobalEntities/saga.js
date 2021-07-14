import { takeEvery, call, put } from 'redux-saga/effects';
import _ from 'lodash';
import {
  likeContent,
  unlikeContent,
  deleteContent,
  contentDetails,
  likeFollowerQuickpost as likeFollowerQuickpostApi,
  unlikeFollowerQuickpost as unlikeFollowerQuickpostApi,
  likeMeetingEvent as likeMeetingEventApi,
  unlikeMeetingEvent as unlikeMeetingEventApi,
} from 'utils/api/HomeFeedApi';
import { rss as rssApi, calendar as calendarApi } from 'utils/api/WidgetApi';
import {
  likeComment as likeCommentApi,
  unlikeComment as unlikeCommentApi,
  pickComment as pickCommentApi,
  deleteComment as deleteCommentApi,
} from 'utils/api/CommentApi';
import { updateStatus as updateStatusApi } from 'utils/api/MyProfileApi';
import {
  likeFeedSuccess,
  likeFeedError,
  unlikeFeedSuccess,
  unlikeFeedError,
  deleteFeedSuccess,
  deleteFeedError,
  deleteFeedUid,
  likeCommentSuccess,
  likeCommentError,
  unlikeCommentSuccess,
  unlikeCommentError,
  pickCommentSuccess,
  pickCommentError,
  deleteCommentSuccess,
  deleteCommentError,
  entitiesUpdate,
  updateStatusSuccess,
  updateStatusError,
  translateFeedSuccess,
  translateFeedError,
  translateFeedModalSuccess,
  translateFeedModalError,
  rssSuccess,
  rssError,
  rssMoreSuccess,
  rssMoreError,
  calendarSuccess,
  calendarError,
} from './actions';

import {
  LIKE_FEED,
  UNLIKE_FEED,
  DELETE_FEED,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
  PICK_COMMENT,
  DELETE_COMMENT,
  UPDATE_STATUS,
  TRANSLATE_FEED,
  TRANSLATE_FEED_MODAL,
  LIKE_FOLLOWER_QUICKPOST,
  UNLIKE_FOLLOWER_QUICKPOST,
  RSS,
  RSS_MORE,
  CALENDAR,
  LIKE_MEETING_EVENT,
  UNLIKE_MEETING_EVENT,
} from './constants';

export function* likeFeed({ options }) {
  try {
    yield call(likeContent, options);
    yield put(likeFeedSuccess(options.contentUid));
  } catch (error) {
    yield put(likeFeedError(error.message));
  }
}

export function* unlikeFeed({ options }) {
  try {
    yield call(unlikeContent, options);
    yield put(unlikeFeedSuccess(options.contentUid));
  } catch (error) {
    yield put(unlikeFeedError(error.message));
  }
}

export function* deleteFeed({ options }) {
  try {
    yield call(deleteContent, options);
    yield put(deleteFeedUid(options));
    yield put(deleteFeedSuccess(options));
  } catch (error) {
    yield put(deleteFeedError(error.message));
  }
}

export function* likeComment({ options }) {
  try {
    yield call(likeCommentApi, options);
    yield put(likeCommentSuccess(options));
  } catch (error) {
    yield put(likeCommentError(error.message));
  }
}

export function* unlikeComment({ options }) {
  try {
    yield call(unlikeCommentApi, options);
    yield put(unlikeCommentSuccess(options));
  } catch (error) {
    yield put(unlikeCommentError(error.message));
  }
}

export function* pickComment({ params, options }) {
  try {
    const { entities } = yield call(pickCommentApi, params, options);
    yield put(pickCommentSuccess(entities));
    yield put(entitiesUpdate(entities));
  } catch (error) {
    yield put(pickCommentError(error.message));
  }
}

export function* deleteComment({ options, content }) {
  try {
    yield call(deleteCommentApi, options);
    yield put(deleteCommentSuccess(options, content));
  } catch (error) {
    yield put(deleteCommentError(error.message));
  }
}

export function* updateStatus({ options }) {
  try {
    const { data } = yield call(updateStatusApi, options);
    yield put(updateStatusSuccess(options, data));
  } catch (error) {
    yield put(updateStatusError(error.message));
  }
}

export function* translateFeed({ options }) {
  try {
    const { entities } = yield call(contentDetails, options);
    yield put(
      translateFeedSuccess(
        options,
        entities.feed[_.first(_.keys(entities.feed))],
      ),
    );
  } catch (error) {
    yield put(translateFeedError(error.message));
  }
}

export function* translateFeedModal({ options }) {
  try {
    const { entities } = yield call(contentDetails, options);
    yield put(
      translateFeedModalSuccess(
        options,
        entities.feed[_.first(_.keys(entities.feed))],
      ),
    );
  } catch (error) {
    yield put(translateFeedModalError(error.message));
  }
}

export function* likeFollowerQuickpost({ options }) {
  try {
    yield call(likeFollowerQuickpostApi, options);
    yield put(likeFeedSuccess(options.followerQuickpostUid));
  } catch (error) {
    yield put(likeFeedError(error.message));
  }
}

export function* unlikeFollowerQuickpost({ options }) {
  try {
    yield call(unlikeFollowerQuickpostApi, options);
    yield put(unlikeFeedSuccess(options.followerQuickpostUid));
  } catch (error) {
    yield put(unlikeFeedError(error.message));
  }
}

export function* rss({ uid, options }) {
  try {
    const { data } = yield call(rssApi, options);
    yield put(rssSuccess(uid, data));
  } catch (error) {
    yield put(rssError(uid, error.message));
  }
}

export function* rssMore({ uid, options }) {
  try {
    const { data } = yield call(rssApi, options);
    yield put(rssMoreSuccess(uid, data));
  } catch (error) {
    yield put(rssMoreError(uid, error.message));
  }
}

export function* calendar({ uid, options }) {
  try {
    const { data } = yield call(calendarApi, options);
    yield put(calendarSuccess(uid, data));
  } catch (error) {
    yield put(calendarError(uid, error.message));
  }
}

export function* likeMeetingEvent({ options }) {
  try {
    yield call(likeMeetingEventApi, options);
    yield put(likeFeedSuccess(options.meetingUid));
  } catch (error) {
    yield put(likeFeedError(error.message));
  }
}

export function* unlikeMeetingEvent({ options }) {
  try {
    yield call(unlikeMeetingEventApi, options);
    yield put(unlikeFeedSuccess(options.meetingUid));
  } catch (error) {
    yield put(unlikeFeedError(error.message));
  }
}

export default function* globalEntitiesSaga() {
  yield takeEvery(LIKE_FEED, likeFeed);
  yield takeEvery(UNLIKE_FEED, unlikeFeed);
  yield takeEvery(DELETE_FEED, deleteFeed);
  yield takeEvery(LIKE_COMMENT, likeComment);
  yield takeEvery(UNLIKE_COMMENT, unlikeComment);
  yield takeEvery(PICK_COMMENT, pickComment);
  yield takeEvery(DELETE_COMMENT, deleteComment);
  yield takeEvery(UPDATE_STATUS, updateStatus);
  yield takeEvery(TRANSLATE_FEED, translateFeed);
  yield takeEvery(TRANSLATE_FEED_MODAL, translateFeedModal);
  yield takeEvery(LIKE_FOLLOWER_QUICKPOST, likeFollowerQuickpost);
  yield takeEvery(UNLIKE_FOLLOWER_QUICKPOST, unlikeFollowerQuickpost);
  yield takeEvery(RSS, rss);
  yield takeEvery(RSS_MORE, rssMore);
  yield takeEvery(CALENDAR, calendar);
  yield takeEvery(LIKE_MEETING_EVENT, likeMeetingEvent);
  yield takeEvery(UNLIKE_MEETING_EVENT, unlikeMeetingEvent);
}

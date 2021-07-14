import { takeLatest, call, put } from 'redux-saga/effects';
import fileDownload from 'js-file-download';
import _ from 'lodash';
import { downloadFile } from 'utils/api/StatisticsApi';
import {
  participate as participateApi,
  integrate as integrateApi,
  cancelParticipation as cancelParticipationApi,
  exportParticipants as exportParticipantsApi,
  stopParticipation as stopParticipationApi,
  addParticipation as addParticipationApi,
  participants as participantsApi,
} from 'utils/api/EventApi';
import { contentDetails } from 'containers/FeedModal/saga';
import {
  PARTICIPATE,
  INTEGRATE,
  CANCEL_PARTICIPATION,
  EXPORT_PARTICIPANTS,
  STOP_PARTICIPATION,
  ADD_PARTICIPATION,
  PARTICIPANTS,
} from './constants';
import {
  participateSuccess,
  participateError,
  integrateSuccess,
  integrateError,
  cancelParticipationSuccess,
  cancelParticipationError,
  exportParticipantsSuccess,
  exportParticipantsError,
  stopParticipationSuccess,
  stopParticipationError,
  addParticipationSuccess,
  addParticipationError,
  participantsSuccess,
  participantsError,
} from './actions';

export function* participate({ options, integration, contentUid }) {
  try {
    yield call(participateApi, options);
    if (integration) {
      yield call(integrate, {
        options: {
          calendarTarget: 'Google Calendar',
          eventUid: options.eventUid,
        },
      });
    }
    yield put(participateSuccess());
    yield call(contentDetails, { options: { uid: contentUid } });
  } catch (error) {
    yield put(participateError(error.message));
  }
}

export function* integrate({ options }) {
  try {
    yield call(integrateApi, options);
    yield put(integrateSuccess());
  } catch (error) {
    yield put(integrateError(error.message));
  }
}

export function* cancelParticipation({ options, contentUid }) {
  try {
    yield call(cancelParticipationApi, options);
    yield put(cancelParticipationSuccess());
    yield call(contentDetails, { options: { uid: contentUid } });
  } catch (error) {
    yield put(cancelParticipationError(error.message));
  }
}

export function* exportParticipants({ options }) {
  try {
    const { data } = yield call(exportParticipantsApi, options);
    const fileName = _.last(_.split(data.url, '='));
    const { data: file } = yield call(downloadFile, { file: fileName });
    fileDownload(file, fileName);
    yield put(exportParticipantsSuccess());
  } catch (error) {
    yield put(exportParticipantsError(error.message));
  }
}

export function* stopParticipation({ params, options, contentUid }) {
  try {
    yield call(stopParticipationApi, params, options);
    yield put(stopParticipationSuccess());
    yield call(contentDetails, { options: { uid: contentUid } });
  } catch (error) {
    yield put(stopParticipationError(error.message));
  }
}

export function* addParticipation({ options, contentUid }) {
  try {
    yield call(addParticipationApi, options);
    yield put(addParticipationSuccess());
    yield call(contentDetails, { options: { uid: contentUid } });
  } catch (error) {
    yield put(addParticipationError(error.message));
  }
}

export function* participants({ options }) {
  try {
    const { data } = yield call(participantsApi, options);
    yield put(participantsSuccess(data));
  } catch (error) {
    yield put(participantsError(error.message));
  }
}

export default function* eventSaga() {
  yield takeLatest(PARTICIPATE, participate);
  yield takeLatest(INTEGRATE, integrate);
  yield takeLatest(CANCEL_PARTICIPATION, cancelParticipation);
  yield takeLatest(EXPORT_PARTICIPANTS, exportParticipants);
  yield takeLatest(STOP_PARTICIPATION, stopParticipation);
  yield takeLatest(ADD_PARTICIPATION, addParticipation);
  yield takeLatest(PARTICIPANTS, participants);
}

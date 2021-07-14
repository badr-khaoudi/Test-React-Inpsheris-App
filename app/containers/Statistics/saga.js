import { takeLatest, call, put, delay, take, race } from 'redux-saga/effects';
import _ from 'lodash';
import fileDownload from 'js-file-download';
import {
  lastUpdatedDate as lastUpdatedDateApi,
  exportAll as exportAllApi,
  jobList as jobListApi,
  downloadFile,
  exportTable as exportTableApi,
} from 'utils/api/StatisticsApi';
import {
  LAST_UPDATED_DATE,
  EXPORT_ALL,
  // EXPORT_ALL_SUCCESS,
  CANCEL_JOB_LIST,
  EXPORT_TABLE,
  JOB_LIST,
} from './constants';
import {
  lastUpdatedDateSuccess,
  lastUpdatedDateError,
  exportAllSuccess,
  exportAllError,
  jobListSuccess,
  jobListError,
  cancelJobList,
  exportTableSuccess,
  exportTableError,
  jobList as startJobList,
} from './actions';

export function* lastUpdatedDate() {
  try {
    const { data } = yield call(lastUpdatedDateApi);
    yield put(lastUpdatedDateSuccess(data));
  } catch (error) {
    yield put(lastUpdatedDateError(error.message));
  }
}

export function* exportAll({ options, fileName }) {
  try {
    const { data } = yield call(exportAllApi, options);
    yield put(exportAllSuccess(data));
    yield put(startJobList(fileName));
  } catch (error) {
    yield put(exportAllError(error.message));
  }
}

export function* exportTable({ options, fileName }) {
  try {
    const { data } = yield call(exportTableApi, options);
    yield put(exportTableSuccess(data));
    yield put(startJobList(fileName));
  } catch (error) {
    yield put(exportTableError(error.message));
  }
}

export function* jobList(fileName) {
  while (true) {
    try {
      const { data } = yield call(jobListApi);
      if (
        !_.includes(data, 'Exporting all reports in same excel file') &&
        !_.includes(data, 'Exporting report')
      ) {
        const { data: file } = yield call(downloadFile, { file: fileName });
        fileDownload(file, fileName);
        yield put(jobListSuccess());
        yield put(cancelJobList());
      }
      yield delay(5000);
    } catch (error) {
      yield put(jobListError(error.message));
      yield put(cancelJobList());
    }
  }
}

// Individual exports for testing
export default function* statisticsSaga() {
  yield takeLatest(LAST_UPDATED_DATE, lastUpdatedDate);
  yield takeLatest(EXPORT_ALL, exportAll);
  yield takeLatest(EXPORT_TABLE, exportTable);
  while (true) {
    const { fileName } = yield take(JOB_LIST);
    yield race([call(jobList, fileName), take(CANCEL_JOB_LIST)]);
  }
}

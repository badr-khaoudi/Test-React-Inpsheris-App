import { takeLatest, call, put } from 'redux-saga/effects';

import {
  communityOtherTab,
  documentTreeList as documentTreeListApi,
} from 'utils/api/CommunityApi';
import { GET_COMMUNITY_TAB, DOCUMENT_TREE_LIST } from './constants';
import { documentTreeListSuccess, documentTreeListError } from './actions';

export function* getCommunityTab({ options }) {
  try {
    const { data } = yield call(communityOtherTab, options);
    yield put(documentTreeListSuccess(data));
  } catch (error) {
    yield put(documentTreeListError(error.message));
  }
}

export function* documentTreeList({ options }) {
  try {
    const { data } = yield call(documentTreeListApi, options);
    yield put(documentTreeListSuccess(data));
  } catch (error) {
    yield put(documentTreeListError(error.message));
  }
}

export default function* moveDocumentSaga() {
  yield takeLatest(GET_COMMUNITY_TAB, getCommunityTab);
  yield takeLatest(DOCUMENT_TREE_LIST, documentTreeList);
}

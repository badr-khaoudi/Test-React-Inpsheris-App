import { takeLatest, call, put } from 'redux-saga/effects';
import {
  communityListUser as communityListUserApi,
  widgetList as widgetListApi,
} from 'utils/api/MyProfileApi';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import {
  communityListUserSuccess,
  communityListUserError,
  widgetListSuccess,
  widgetListError,
} from './actions';
import { COMMUNITY_LIST_USER, WIDGET_LIST } from './constants';

export function* communityListUser({ options }) {
  try {
    const { entities, result } = yield call(communityListUserApi, options);
    yield put(entitiesUpdate(entities));
    yield put(communityListUserSuccess(result));
  } catch (error) {
    yield put(communityListUserError(error.message));
  }
}

export function* widgetList({ options }) {
  try {
    const { entities, result } = yield call(widgetListApi, options);
    yield put(entitiesUpdate(entities));
    yield put(widgetListSuccess(result));
  } catch (error) {
    yield put(widgetListError(error));
  }
}

export default function* aboutSaga() {
  yield takeLatest(COMMUNITY_LIST_USER, communityListUser);
  yield takeLatest(WIDGET_LIST, widgetList);
}

import { takeLatest, call, put, debounce } from 'redux-saga/effects';
import {
  displayOptions as displayOptionsApi,
  widgetTypes as widgetTypesApi,
  socialWallTypes as socialWallTypesApi,
  typeformList as typeformListApi,
  widgetItem,
  createWidget as createWidgetApi,
} from 'utils/api/WidgetManagerApi';
import { uploadFile as uploadFileApi } from 'utils/api/AuthApi';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import { addWidget } from 'containers/WidgetManager/actions';
import {
  displayOptionsSuccess,
  displayOptionsError,
  widgetTypesSuccess,
  widgetTypesError,
  socialWallTypesSuccess,
  socialWallTypesError,
  uploadFileSuccess,
  uploadFileError,
  typeformListSuccess,
  typeformListError,
  typeformListMoreSuccess,
  filterTypeformListSuccess,
  widgetSuccess,
  widgetError,
  createWidgetSuccess,
  createWidgetError,
} from './actions';
import {
  DISPLAY_OPTIONS,
  WIDGET_TYPES,
  SOCIAL_WALL_TYPES,
  UPLOAD_FILE,
  TYPEFORM_LIST,
  TYPEFORM_LIST_MORE,
  FILTER_TYPEFORM_LIST,
  WIDGET,
  CREATE_WIDGET,
} from './constants';

export function* displayOptions() {
  try {
    const { data } = yield call(displayOptionsApi);
    yield put(displayOptionsSuccess(data));
  } catch (error) {
    yield put(displayOptionsError(error.message));
  }
}

export function* widgetTypes() {
  try {
    const { data } = yield call(widgetTypesApi);
    yield put(widgetTypesSuccess(data));
  } catch (error) {
    yield put(widgetTypesError(error.message));
  }
}

export function* socialWallTypes() {
  try {
    const { data } = yield call(socialWallTypesApi);
    yield put(socialWallTypesSuccess(data));
  } catch (error) {
    yield put(socialWallTypesError(error.message));
  }
}

export function* uploadFile({ widgetType, formData }) {
  try {
    const { data } = yield call(uploadFileApi, formData);
    yield put(uploadFileSuccess(widgetType, data));
  } catch (error) {
    yield put(uploadFileError(error.message));
  }
}

export function* typeformList({ options }) {
  try {
    const { data } = yield call(typeformListApi, options);
    yield put(typeformListSuccess(data));
  } catch (error) {
    yield put(typeformListError(error.message));
  }
}

export function* typeformListMore({ options }) {
  try {
    const { data } = yield call(typeformListApi, options);
    yield put(typeformListMoreSuccess(data));
  } catch (error) {
    yield put(typeformListError(error.message));
  }
}

export function* filterTypeformList({ options }) {
  try {
    const { data } = yield call(typeformListApi, options);
    yield put(filterTypeformListSuccess(data));
  } catch (error) {
    yield put(typeformListError(error.message));
  }
}

export function* widget({ options }) {
  try {
    const { entities, result } = yield call(widgetItem, options);
    yield put(entitiesUpdate(entities));
    yield put(widgetSuccess(result));
  } catch (error) {
    yield put(widgetError(error.message));
  }
}

export function* createWidget({ options }) {
  try {
    const { entities, result } = yield call(createWidgetApi, options);
    yield put(entitiesUpdate(entities));
    yield put(addWidget(result));
    yield put(createWidgetSuccess());
  } catch (error) {
    yield put(createWidgetError(error.message));
  }
}

export default function* createWidgetSaga() {
  yield takeLatest(DISPLAY_OPTIONS, displayOptions);
  yield takeLatest(WIDGET_TYPES, widgetTypes);
  yield takeLatest(SOCIAL_WALL_TYPES, socialWallTypes);
  yield takeLatest(UPLOAD_FILE, uploadFile);
  yield takeLatest(TYPEFORM_LIST, typeformList);
  yield takeLatest(TYPEFORM_LIST_MORE, typeformListMore);
  yield debounce(1000, FILTER_TYPEFORM_LIST, filterTypeformList);
  yield takeLatest(WIDGET, widget);
  yield takeLatest(CREATE_WIDGET, createWidget);
}

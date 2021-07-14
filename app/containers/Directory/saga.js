import { takeLatest, call, put, debounce } from 'redux-saga/effects';
import axios from 'axios';
import { entitiesUpdate } from 'containers/GlobalEntities/actions';
import {
  searchDirectory as searchDirectoryApi,
  suggestion as suggestionApi,
  filterList,
  hobbyList,
  badgeList,
} from 'utils/api/DirectoryApi';
import {
  searchDirectorySuccess,
  searchDirectoryError,
  searchDirectoryMoreSuccess,
  searchDirectoryMoreError,
  suggestionSuccess,
  suggestionError,
  siteFilterOptionsSuccess,
  siteFilterOptionsError,
  serviceFilterOptionsSuccess,
  serviceFilterOptionsError,
  hobbyFilterOptionsSuccess,
  hobbyFilterOptionsError,
  skillFilterOptionsSuccess,
  skillFilterOptionsError,
  variableFilterOptionsSuccess,
  variableFilterOptionsError,
  badgeFilterOptionsSuccess,
  badgeFilterOptionsError,
} from './actions';
import {
  SEARCH_DIRECTORY,
  SEARCH_DIRECTORY_MORE,
  SUGGESTION,
  SITE_FILTER_OPTIONS,
  SERVICE_FILTER_OPTIONS,
  HOBBY_FILTER_OPTIONS,
  SKILL_FILTER_OPTIONS,
  VARIABLE_FILTER_OPTIONS,
  BADGE_FILTER_OPTIONS,
} from './constants';

export function* searchDirectory({ options }) {
  try {
    const { response, entities, result } = yield call(
      searchDirectoryApi,
      options,
    );
    yield put(entitiesUpdate(entities));
    yield put(searchDirectorySuccess(response, result));
  } catch (error) {
    yield put(searchDirectoryError(error.message));
  }
}

export function* searchDirectoryMore({ options }) {
  try {
    const { response, entities, result } = yield call(
      searchDirectoryApi,
      options,
    );
    yield put(entitiesUpdate(entities));
    yield put(searchDirectoryMoreSuccess(response, result));
  } catch (error) {
    yield put(searchDirectoryMoreError(error.message));
  }
}

export function* suggestion({ options, config }) {
  try {
    const { data } = yield call(suggestionApi, options, config);
    yield put(suggestionSuccess(data));
  } catch (error) {
    if (axios.isCancel(error)) {
      yield put(suggestionSuccess([]));
    } else {
      yield put(suggestionError(error.message));
    }
  }
}

export function* siteFilterOptions({ options }) {
  try {
    const { data } = yield call(filterList, options);
    yield put(siteFilterOptionsSuccess(data));
  } catch (error) {
    yield put(siteFilterOptionsError(error.message));
  }
}

export function* serviceFilterOptions({ options }) {
  try {
    const { data } = yield call(filterList, options);
    yield put(serviceFilterOptionsSuccess(data));
  } catch (error) {
    yield put(serviceFilterOptionsError(error.message));
  }
}

export function* hobbyFilterOptions({ options }) {
  try {
    const { data } = yield call(hobbyList, options);
    yield put(hobbyFilterOptionsSuccess(data));
  } catch (error) {
    yield put(hobbyFilterOptionsError(error.message));
  }
}

export function* skillFilterOptions({ options }) {
  try {
    const { data } = yield call(hobbyList, options);
    yield put(skillFilterOptionsSuccess(data));
  } catch (error) {
    yield put(skillFilterOptionsError(error.message));
  }
}

export function* variableFilterOptions({ options }) {
  try {
    const { data } = yield call(hobbyList, options);
    yield put(variableFilterOptionsSuccess(data));
  } catch (error) {
    yield put(variableFilterOptionsError(error.message));
  }
}

export function* badgeFilterOptions({ options }) {
  try {
    const { data } = yield call(badgeList, options);
    yield put(badgeFilterOptionsSuccess(data));
  } catch (error) {
    yield put(badgeFilterOptionsError(error.message));
  }
}

export default function* directorySaga() {
  yield takeLatest(SEARCH_DIRECTORY, searchDirectory);
  yield takeLatest(SEARCH_DIRECTORY_MORE, searchDirectoryMore);
  yield debounce(1000, SUGGESTION, suggestion);
  yield takeLatest(SITE_FILTER_OPTIONS, siteFilterOptions);
  yield takeLatest(SERVICE_FILTER_OPTIONS, serviceFilterOptions);
  yield takeLatest(HOBBY_FILTER_OPTIONS, hobbyFilterOptions);
  yield takeLatest(SKILL_FILTER_OPTIONS, skillFilterOptions);
  yield takeLatest(VARIABLE_FILTER_OPTIONS, variableFilterOptions);
  yield takeLatest(BADGE_FILTER_OPTIONS, badgeFilterOptions);
}

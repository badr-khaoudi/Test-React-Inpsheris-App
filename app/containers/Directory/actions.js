/*
 *
 * Directory actions
 *
 */

import {
  SEARCH_DIRECTORY,
  SEARCH_DIRECTORY_SUCCESS,
  SEARCH_DIRECTORY_ERROR,
  SEARCH_DIRECTORY_MORE,
  SEARCH_DIRECTORY_MORE_SUCCESS,
  SEARCH_DIRECTORY_MORE_ERROR,
  SUGGESTION,
  SUGGESTION_SUCCESS,
  SUGGESTION_ERROR,
  SITE_FILTER_OPTIONS,
  SITE_FILTER_OPTIONS_SUCCESS,
  SITE_FILTER_OPTIONS_ERROR,
  SERVICE_FILTER_OPTIONS,
  SERVICE_FILTER_OPTIONS_SUCCESS,
  SERVICE_FILTER_OPTIONS_ERROR,
  HOBBY_FILTER_OPTIONS,
  HOBBY_FILTER_OPTIONS_SUCCESS,
  HOBBY_FILTER_OPTIONS_ERROR,
  SKILL_FILTER_OPTIONS,
  SKILL_FILTER_OPTIONS_SUCCESS,
  SKILL_FILTER_OPTIONS_ERROR,
  VARIABLE_FILTER_OPTIONS,
  VARIABLE_FILTER_OPTIONS_SUCCESS,
  VARIABLE_FILTER_OPTIONS_ERROR,
  BADGE_FILTER_OPTIONS,
  BADGE_FILTER_OPTIONS_SUCCESS,
  BADGE_FILTER_OPTIONS_ERROR,
} from './constants';

export function searchDirectory(options) {
  return {
    type: SEARCH_DIRECTORY,
    options,
  };
}

export function searchDirectorySuccess(response, result) {
  return {
    type: SEARCH_DIRECTORY_SUCCESS,
    response,
    result,
  };
}

export function searchDirectoryError(error) {
  return {
    type: SEARCH_DIRECTORY_ERROR,
    error,
  };
}

export function searchDirectoryMore(options) {
  return {
    type: SEARCH_DIRECTORY_MORE,
    options,
  };
}

export function searchDirectoryMoreSuccess(response, result) {
  return {
    type: SEARCH_DIRECTORY_MORE_SUCCESS,
    response,
    result,
  };
}

export function searchDirectoryMoreError(error) {
  return {
    type: SEARCH_DIRECTORY_MORE_ERROR,
    error,
  };
}

export function suggestion(options, config) {
  return {
    type: SUGGESTION,
    options,
    config,
  };
}

export function suggestionSuccess(data) {
  return {
    type: SUGGESTION_SUCCESS,
    data,
  };
}

export function suggestionError(error) {
  return {
    type: SUGGESTION_ERROR,
    error,
  };
}

export function siteFilterOptions(options) {
  return {
    type: SITE_FILTER_OPTIONS,
    options,
  };
}

export function siteFilterOptionsSuccess(data) {
  return {
    type: SITE_FILTER_OPTIONS_SUCCESS,
    data,
  };
}

export function siteFilterOptionsError(data) {
  return {
    type: SITE_FILTER_OPTIONS_ERROR,
    data,
  };
}

export function serviceFilterOptions(options) {
  return {
    type: SERVICE_FILTER_OPTIONS,
    options,
  };
}

export function serviceFilterOptionsSuccess(data) {
  return {
    type: SERVICE_FILTER_OPTIONS_SUCCESS,
    data,
  };
}

export function serviceFilterOptionsError(data) {
  return {
    type: SERVICE_FILTER_OPTIONS_ERROR,
    data,
  };
}

export function hobbyFilterOptions(options) {
  return {
    type: HOBBY_FILTER_OPTIONS,
    options,
  };
}

export function hobbyFilterOptionsSuccess(data) {
  return {
    type: HOBBY_FILTER_OPTIONS_SUCCESS,
    data,
  };
}

export function hobbyFilterOptionsError(data) {
  return {
    type: HOBBY_FILTER_OPTIONS_ERROR,
    data,
  };
}

export function skillFilterOptions(options) {
  return {
    type: SKILL_FILTER_OPTIONS,
    options,
  };
}

export function skillFilterOptionsSuccess(data) {
  return {
    type: SKILL_FILTER_OPTIONS_SUCCESS,
    data,
  };
}

export function skillFilterOptionsError(data) {
  return {
    type: SKILL_FILTER_OPTIONS_ERROR,
    data,
  };
}

export function variableFilterOptions(options) {
  return {
    type: VARIABLE_FILTER_OPTIONS,
    options,
  };
}

export function variableFilterOptionsSuccess(data) {
  return {
    type: VARIABLE_FILTER_OPTIONS_SUCCESS,
    data,
  };
}

export function variableFilterOptionsError(data) {
  return {
    type: VARIABLE_FILTER_OPTIONS_ERROR,
    data,
  };
}

export function badgeFilterOptions(options) {
  return {
    type: BADGE_FILTER_OPTIONS,
    options,
  };
}

export function badgeFilterOptionsSuccess(data) {
  return {
    type: BADGE_FILTER_OPTIONS_SUCCESS,
    data,
  };
}

export function badgeFilterOptionsError(error) {
  return {
    type: BADGE_FILTER_OPTIONS_ERROR,
    error,
  };
}

/*
 *
 * SearchDirectory actions
 *
 */

import {
  SEARCH_DIRECTORY,
  SEARCH_DIRECTORY_SUCCESS,
  SEARCH_DIRECTORY_ERROR,
  SEARCH_DIRECTORY_MORE,
  SEARCH_DIRECTORY_MORE_SUCCESS,
  SEARCH_DIRECTORY_MORE_ERROR,
  SEARCH_DIRECTORY_FILTER,
  ADD_COWORKER,
  ADD_COWORKER_SUCCESS,
  ADD_COWORKER_ERROR,
  ADD_PARTNER,
  ADD_PARTNER_SUCCESS,
  ADD_PARTNER_ERROR,
} from './constants';

export function searchDirectory(options) {
  return {
    type: SEARCH_DIRECTORY,
    options,
  };
}

export function searchDirectorySuccess(totalMembers, result) {
  return {
    type: SEARCH_DIRECTORY_SUCCESS,
    totalMembers,
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

export function searchDirectoryMoreSuccess(result) {
  return {
    type: SEARCH_DIRECTORY_MORE_SUCCESS,
    result,
  };
}

export function searchDirectoryMoreError(error) {
  return {
    type: SEARCH_DIRECTORY_MORE_ERROR,
    error,
  };
}

export function searchDirectoryFilter(options) {
  return {
    type: SEARCH_DIRECTORY_FILTER,
    options,
  };
}

export function addCoworker(options) {
  return {
    type: ADD_COWORKER,
    options,
  };
}

export function addCoworkerSuccess(options) {
  return {
    type: ADD_COWORKER_SUCCESS,
    options,
  };
}

export function addCoworkerError(error) {
  return {
    type: ADD_COWORKER_ERROR,
    error,
  };
}

export function addPartner(options) {
  return {
    type: ADD_PARTNER,
    options,
  };
}

export function addPartnerSuccess(options) {
  return {
    type: ADD_PARTNER_SUCCESS,
    options,
  };
}

export function addPartnerError(error) {
  return {
    type: ADD_PARTNER_ERROR,
    error,
  };
}

/*
 *
 * MyDraft actions
 *
 */

import {
  DRAFTS,
  DRAFTS_SUCCESS,
  DRAFTS_ERROR,
  DRAFTS_MORE,
  DRAFTS_MORE_SUCCESS,
  DRAFTS_MORE_ERROR,
} from './constants';

export function drafts(options) {
  return {
    type: DRAFTS,
    options,
  };
}

export function draftsSuccess(data) {
  return {
    type: DRAFTS_SUCCESS,
    data,
  };
}

export function draftsError(error) {
  return {
    type: DRAFTS_ERROR,
    error,
  };
}

export function draftsMore(options) {
  return {
    type: DRAFTS_MORE,
    options,
  };
}

export function draftsMoreSuccess(data) {
  return {
    type: DRAFTS_MORE_SUCCESS,
    data,
  };
}

export function draftsMoreError(error) {
  return {
    type: DRAFTS_MORE_ERROR,
    error,
  };
}

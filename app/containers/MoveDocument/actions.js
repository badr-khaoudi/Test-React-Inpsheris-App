/*
 *
 * MoveDocument actions
 *
 */

import {
  GET_COMMUNITY_TAB,
  DOCUMENT_TREE_LIST,
  DOCUMENT_TREE_LIST_SUCCESS,
  DOCUMENT_TREE_LIST_ERROR,
} from './constants';

export function getCommunityTab(options) {
  return {
    type: GET_COMMUNITY_TAB,
    options,
  };
}

export function documentTreeList(options) {
  return {
    type: DOCUMENT_TREE_LIST,
    options,
  };
}

export function documentTreeListSuccess(data) {
  return {
    type: DOCUMENT_TREE_LIST_SUCCESS,
    data,
  };
}

export function documentTreeListError(error) {
  return {
    type: DOCUMENT_TREE_LIST_ERROR,
    error,
  };
}

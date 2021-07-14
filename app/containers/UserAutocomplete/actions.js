/*
 *
 * UserAutocomplete actions
 *
 */

import { USER_LIST, USER_LIST_SUCCESS, USER_LIST_ERROR } from './constants';

export function userList(options) {
  return {
    type: USER_LIST,
    options,
  };
}

export function userListSuccess(data) {
  return {
    type: USER_LIST_SUCCESS,
    data,
  };
}

export function userListError(error) {
  return {
    type: USER_LIST_ERROR,
    error,
  };
}

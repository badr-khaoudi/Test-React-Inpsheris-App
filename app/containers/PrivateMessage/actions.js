/*
 *
 * PrivateMessage actions
 *
 */

import {
  PRIVATE_MESSAGE,
  PRIVATE_MESSAGE_SUCCESS,
  PRIVATE_MESSAGE_ERROR,
  CLEAN_PRIVATE_MESSAGE,
} from './constants';

export function privateMessage(options) {
  return {
    type: PRIVATE_MESSAGE,
    options,
  };
}

export function privateMessageSuccess(data) {
  return {
    type: PRIVATE_MESSAGE_SUCCESS,
    data,
  };
}

export function privateMessageError(error) {
  return {
    type: PRIVATE_MESSAGE_ERROR,
    error,
  };
}

export function cleanPrivateMessage() {
  return {
    type: CLEAN_PRIVATE_MESSAGE,
  };
}

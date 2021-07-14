/*
 *
 * MyPublish actions
 *
 */

import {
  PUBLICATIONS,
  PUBLICATIONS_SUCCESS,
  PUBLICATIONS_ERROR,
  PUBLICATIONS_MORE,
  PUBLICATIONS_MORE_SUCCESS,
  PUBLICATIONS_MORE_ERROR,
} from './constants';

export function publications(options) {
  return {
    type: PUBLICATIONS,
    options,
  };
}

export function publicationsSuccess(data) {
  return {
    type: PUBLICATIONS_SUCCESS,
    data,
  };
}

export function publicationsError(error) {
  return {
    type: PUBLICATIONS_ERROR,
    error,
  };
}

export function publicationsMore(options) {
  return {
    type: PUBLICATIONS_MORE,
    options,
  };
}

export function publicationsMoreSuccess(data) {
  return {
    type: PUBLICATIONS_MORE_SUCCESS,
    data,
  };
}

export function publicationsMoreError(error) {
  return {
    type: PUBLICATIONS_MORE_ERROR,
    error,
  };
}

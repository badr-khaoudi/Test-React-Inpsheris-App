/*
 *
 * CarouselManager actions
 *
 */

import {
  CAROUSEL_LIST,
  CAROUSEL_LIST_SUCCESS,
  CAROUSEL_LIST_ERROR,
  CAROUSEL_LIST_MORE,
  CAROUSEL_LIST_MORE_SUCCESS,
  CAROUSEL_LIST_MORE_ERROR,
  CAROUSEL_ENTITIES_UPDATE,
  ADD_CAROUSEL,
  DELETE_CAROUSEL,
} from './constants';

export function carouselList(options) {
  return {
    type: CAROUSEL_LIST,
    options,
  };
}

export function carouselListSuccess(data, result) {
  return {
    type: CAROUSEL_LIST_SUCCESS,
    data,
    result,
  };
}

export function carouselListError(error) {
  return {
    type: CAROUSEL_LIST_ERROR,
    error,
  };
}

export function carouselListMore(options) {
  return {
    type: CAROUSEL_LIST_MORE,
    options,
  };
}

export function carouselListMoreSuccess(data, result) {
  return {
    type: CAROUSEL_LIST_MORE_SUCCESS,
    data,
    result,
  };
}

export function carouselListMoreError(error) {
  return {
    type: CAROUSEL_LIST_MORE_ERROR,
    error,
  };
}

export function carouselEntitiesUpdate(data) {
  return {
    type: CAROUSEL_ENTITIES_UPDATE,
    data,
  };
}

export function addCarousel(data) {
  return {
    type: ADD_CAROUSEL,
    data,
  };
}

export function deleteCarousel(options) {
  return {
    type: DELETE_CAROUSEL,
    options,
  };
}

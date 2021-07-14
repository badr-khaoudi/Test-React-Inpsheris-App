/*
 *
 * CarouselItem actions
 *
 */

import {
  PUBLISH_CAROUSEL,
  PUBLISH_CAROUSEL_SUCCESS,
  PUBLISH_CAROUSEL_ERROR,
  DELETE_CAROUSEL,
  DELETE_CAROUSEL_SUCCESS,
  DELETE_CAROUSEL_ERROR,
} from './constants';

export function publishCarousel(options) {
  return {
    type: PUBLISH_CAROUSEL,
    options,
  };
}

export function publishCarouselSuccess() {
  return {
    type: PUBLISH_CAROUSEL_SUCCESS,
  };
}

export function publishCarouselError(error) {
  return {
    type: PUBLISH_CAROUSEL_ERROR,
    error,
  };
}

export function deleteCarousel(options) {
  return {
    type: DELETE_CAROUSEL,
    options,
  };
}

export function deleteCarouselSuccess() {
  return {
    type: DELETE_CAROUSEL_SUCCESS,
  };
}

export function deleteCarouselError(error) {
  return {
    type: DELETE_CAROUSEL_ERROR,
    error,
  };
}

/*
 *
 * CreateCarousel actions
 *
 */

import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CREATE_CAROUSEL,
  CREATE_CAROUSEL_SUCCESS,
  CREATE_CAROUSEL_ERROR,
  CLEAN_CREATE_CAROUSEL,
  CAROUSEL_CONTENT,
  CAROUSEL_CONTENT_SUCCESS,
  CAROUSEL_CONTENT_ERROR,
} from './constants';

export function uploadFile(field, formData) {
  return {
    type: UPLOAD_FILE,
    field,
    formData,
  };
}

export function uploadFileSuccess(field, data) {
  return {
    type: UPLOAD_FILE_SUCCESS,
    field,
    data,
  };
}

export function uploadFileError(error) {
  return {
    type: UPLOAD_FILE_ERROR,
    error,
  };
}

export function createCarousel(options) {
  return {
    type: CREATE_CAROUSEL,
    options,
  };
}

export function createCarouselSuccess() {
  return {
    type: CREATE_CAROUSEL_SUCCESS,
  };
}

export function createCarouselError(error) {
  return {
    type: CREATE_CAROUSEL_ERROR,
    error,
  };
}

export function cleanCreateCarousel() {
  return {
    type: CLEAN_CREATE_CAROUSEL,
  };
}

export function carouselContent(options) {
  return {
    type: CAROUSEL_CONTENT,
    options,
  };
}

export function carouselContentSuccess(data) {
  return {
    type: CAROUSEL_CONTENT_SUCCESS,
    data,
  };
}

export function carouselContentError(error) {
  return {
    type: CAROUSEL_CONTENT_ERROR,
    error,
  };
}

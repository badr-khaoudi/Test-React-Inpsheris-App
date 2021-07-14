/*
 *
 * ImageCrop actions
 *
 */

import {
  CROP_IMAGE,
  CROP_IMAGE_SUCCESS,
  CROP_IMAGE_ERROR,
  CLEAN_CROP_IMAGE,
} from './constants';

export function cropImage(options) {
  return {
    type: CROP_IMAGE,
    options,
  };
}

export function cropImageSuccess(data) {
  return {
    type: CROP_IMAGE_SUCCESS,
    data,
  };
}

export function cropImageError(error) {
  return {
    type: CROP_IMAGE_ERROR,
    error,
  };
}

export function cleanCropImage() {
  return {
    type: CLEAN_CROP_IMAGE,
  };
}

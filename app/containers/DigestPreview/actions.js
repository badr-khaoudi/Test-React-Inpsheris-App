/*
 *
 * DigestPreview actions
 *
 */

import {
  DIGEST_CONTENT,
  DIGEST_CONTENT_SUCCESS,
  DIGEST_CONTENT_ERROR,
  CLEAN_DIGEST_CONTENT,
} from './constants';

export function digestContent(options) {
  return {
    type: DIGEST_CONTENT,
    options,
  };
}

export function digestContentSuccess(data) {
  return {
    type: DIGEST_CONTENT_SUCCESS,
    data,
  };
}

export function digestContentError(error) {
  return {
    type: DIGEST_CONTENT_ERROR,
    error,
  };
}

export function cleanDigestContent() {
  return {
    type: CLEAN_DIGEST_CONTENT,
  };
}

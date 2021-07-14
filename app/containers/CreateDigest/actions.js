/*
 *
 * CreateDigest actions
 *
 */

import {
  TEMPLATES,
  TEMPLATES_SUCCESS,
  TEMPLATES_ERROR,
  TYPES,
  TYPES_SUCCESS,
  TYPES_ERROR,
  REPEAT,
  REPEAT_SUCCESS,
  REPEAT_ERROR,
  CONTENT_TYPES,
  CONTENT_TYPES_SUCCESS,
  CONTENT_TYPES_ERROR,
  CREATE_DIGEST,
  CREATE_DIGEST_SUCCESS,
  CREATE_DIGEST_ERROR,
  DIGEST_CONTENT,
  DIGEST_CONTENT_SUCCESS,
  DIGEST_CONTENT_ERROR,
  CLEAN_CREATE_DIGEST,
} from './constants';

export function templates() {
  return {
    type: TEMPLATES,
  };
}

export function templatesSuccess(data) {
  return {
    type: TEMPLATES_SUCCESS,
    data,
  };
}

export function templatesError(error) {
  return {
    type: TEMPLATES_ERROR,
    error,
  };
}

export function types() {
  return {
    type: TYPES,
  };
}

export function typesSuccess(data) {
  return {
    type: TYPES_SUCCESS,
    data,
  };
}

export function typesError(error) {
  return {
    type: TYPES_ERROR,
    error,
  };
}

export function repeat() {
  return {
    type: REPEAT,
  };
}

export function repeatSuccess(data) {
  return {
    type: REPEAT_SUCCESS,
    data,
  };
}

export function repeatError(error) {
  return {
    type: REPEAT_ERROR,
    error,
  };
}

export function contentTypes() {
  return {
    type: CONTENT_TYPES,
  };
}

export function contentTypesSuccess(data) {
  return {
    type: CONTENT_TYPES_SUCCESS,
    data,
  };
}

export function contentTypesError(error) {
  return {
    type: CONTENT_TYPES_ERROR,
    error,
  };
}

export function createDigest(options) {
  return {
    type: CREATE_DIGEST,
    options,
  };
}

export function createDigestSuccess() {
  return {
    type: CREATE_DIGEST_SUCCESS,
  };
}

export function createDigestError(error) {
  return {
    type: CREATE_DIGEST_ERROR,
    error,
  };
}

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

export function cleanCreateDigest() {
  return {
    type: CLEAN_CREATE_DIGEST,
  };
}

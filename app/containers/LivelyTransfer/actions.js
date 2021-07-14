/*
 *
 * LivelyTransfer actions
 *
 */

import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  TRANSFER_DOCUMENT,
  TRANSFER_DOCUMENT_SUCCESS,
  TRANSFER_DOCUMENT_ERROR,
  CLEAN_LIVELY_TRANSFER,
} from './constants';

export function uploadFile(file, formData, cancelToken) {
  return {
    type: UPLOAD_FILE,
    file,
    formData,
    cancelToken,
  };
}

export function uploadFileSuccess() {
  return {
    type: UPLOAD_FILE_SUCCESS,
  };
}

export function uploadFileError(error) {
  return {
    type: UPLOAD_FILE_ERROR,
    error,
  };
}

export function transferDocument(options) {
  return {
    type: TRANSFER_DOCUMENT,
    options,
  };
}

export function transferDocumentSuccess() {
  return {
    type: TRANSFER_DOCUMENT_SUCCESS,
  };
}

export function transferDocumentError(error) {
  return {
    type: TRANSFER_DOCUMENT_ERROR,
    error,
  };
}

export function cleanLivelyTransfer() {
  return {
    type: CLEAN_LIVELY_TRANSFER,
  };
}

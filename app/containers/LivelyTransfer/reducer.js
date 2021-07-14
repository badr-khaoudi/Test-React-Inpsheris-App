/*
 *
 * LivelyTransfer reducer
 *
 */
import produce from 'immer';
import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  TRANSFER_DOCUMENT,
  TRANSFER_DOCUMENT_SUCCESS,
  TRANSFER_DOCUMENT_ERROR,
  CLEAN_LIVELY_TRANSFER,
} from './constants';

export const initialState = {
  uploadFileLoading: false,
  uploadFileSuccess: false,
  uploadFileError: '',
  transferDocumentLoading: false,
  transferDocumentSuccess: false,
  transferDocumentError: '',
};

/* eslint-disable default-case, no-param-reassign */
const livelyTransferReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case UPLOAD_FILE:
        draft.uploadFileLoading = true;
        draft.uploadFileSuccess = false;
        draft.uploadFileError = '';
        break;
      case UPLOAD_FILE_SUCCESS:
        draft.uploadFileLoading = false;
        draft.uploadFileSuccess = true;
        draft.uploadFileError = '';
        break;
      case UPLOAD_FILE_ERROR:
        draft.uploadFileLoading = false;
        draft.uploadFileSuccess = false;
        draft.uploadFileError = action.error;
        break;
      case TRANSFER_DOCUMENT:
        draft.transferDocumentLoading = true;
        draft.transferDocumentSuccess = false;
        draft.transferDocumentError = '';
        break;
      case TRANSFER_DOCUMENT_SUCCESS:
        draft.transferDocumentLoading = false;
        draft.transferDocumentSuccess = true;
        draft.transferDocumentError = '';
        break;
      case TRANSFER_DOCUMENT_ERROR:
        draft.transferDocumentLoading = false;
        draft.transferDocumentSuccess = false;
        draft.transferDocumentError = action.error;
        break;
      case CLEAN_LIVELY_TRANSFER:
        draft.transferDocumentLoading = false;
        draft.transferDocumentSuccess = false;
        draft.transferDocumentError = '';
        break;
      default:
        return state;
    }
  });

export default livelyTransferReducer;

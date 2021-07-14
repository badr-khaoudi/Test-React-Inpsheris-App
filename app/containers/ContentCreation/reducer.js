/*
 *
 * ContentCreation reducer
 *
 */
import produce from 'immer';
import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  CLEAN_UPLOAD_FILE,
  USER_COMMUNITY,
  USER_COMMUNITY_SUCCESS,
  USER_COMMUNITY_ERROR,
  TEMPLATE_TYPE,
  TEMPLATE_TYPE_SUCCESS,
  TEMPLATE_TYPE_ERROR,
  CONTENT_CREATION_EVENT,
  CONTENT_CREATION_ARTICLE,
  CONTENT_CREATION_GRAND_ARTICLE,
  CONTENT_CREATION_IMAGE_GALLERY,
  CONTENT_CREATION_DOCUMENT,
  CONTENT_CREATION_SUCCESS,
  CONTENT_CREATION_ERROR,
  CLEAN_CONTENT_CREATION,
  GET_CONTENT_DETAILS,
  GET_CONTENT_DETAILS_SUCCESS,
  GET_CONTENT_DETAILS_ERROR,
  CLEAN_CONTENT_DETAILS,
} from './constants';

export const initialState = {
  uploadFile: {},
  uploadFileLoading: false,
  uploadFileSuccess: false,
  uploadFileError: '',
  userCommunity: [],
  userCommunityLoading: false,
  userCommunitySuccess: false,
  userCommunityError: '',
  templateType: [],
  templateTypeLoading: false,
  templateTypeSuccess: false,
  templateTypeError: '',
  contentLoading: false,
  contentSuccess: false,
  contentError: '',
  contentDetailsLoading: false,
  contentDetailsSuccess: false,
  contentDetailsError: '',
};

/* eslint-disable default-case, no-param-reassign */
const contentCreationReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case CLEAN_UPLOAD_FILE:
        draft.uploadFile = {};
        draft.uploadFileLoading = false;
        draft.uploadFileSuccess = false;
        draft.uploadFileError = '';
        break;
      case UPLOAD_FILE:
        draft.uploadFileLoading = true;
        draft.uploadFileSuccess = false;
        draft.uploadFileError = '';
        break;
      case UPLOAD_FILE_SUCCESS:
        draft.uploadFile = { ...draft.uploadFile, [action.field]: action.data };
        draft.uploadFileLoading = false;
        draft.uploadFileSuccess = true;
        draft.uploadFileError = '';
        break;
      case UPLOAD_FILE_ERROR:
        draft.uploadFileLoading = false;
        draft.uploadFileSuccess = false;
        draft.uploadFileError = action.error;
        break;
      case USER_COMMUNITY:
        draft.userCommunity = [];
        draft.userCommunityLoading = true;
        draft.userCommunitySuccess = false;
        draft.userCommunityError = '';
        break;
      case USER_COMMUNITY_SUCCESS:
        draft.userCommunity = action.data;
        draft.userCommunityLoading = false;
        draft.userCommunitySuccess = true;
        draft.userCommunityError = '';
        break;
      case USER_COMMUNITY_ERROR:
        draft.userCommunityLoading = false;
        draft.userCommunitySuccess = false;
        draft.userCommunityError = action.error;
        break;
      case TEMPLATE_TYPE:
        draft.templateType = [];
        draft.templateTypeLoading = true;
        draft.templateTypeSuccess = false;
        draft.templateTypeError = '';
        break;
      case TEMPLATE_TYPE_SUCCESS:
        draft.templateType = action.data;
        draft.templateTypeLoading = false;
        draft.templateTypeSuccess = true;
        draft.templateTypeError = '';
        break;
      case TEMPLATE_TYPE_ERROR:
        draft.templateTypeLoading = false;
        draft.templateTypeSuccess = false;
        draft.templateTypeError = action.error;
        break;
      case CONTENT_CREATION_EVENT:
      case CONTENT_CREATION_ARTICLE:
      case CONTENT_CREATION_GRAND_ARTICLE:
      case CONTENT_CREATION_IMAGE_GALLERY:
      case CONTENT_CREATION_DOCUMENT:
        draft.contentLoading = true;
        draft.contentSuccess = false;
        draft.contentError = '';
        break;
      case CONTENT_CREATION_SUCCESS:
        draft.content = action.data;
        draft.contentLoading = false;
        draft.contentSuccess = true;
        draft.contentError = '';
        break;
      case CONTENT_CREATION_ERROR:
        draft.contentLoading = false;
        draft.contentSuccess = false;
        draft.contentError = action.error;
        break;
      case GET_CONTENT_DETAILS:
        draft.contentDetailsLoading = true;
        draft.contentDetailsSuccess = false;
        draft.contentDetailsError = '';
        break;
      case GET_CONTENT_DETAILS_SUCCESS:
        draft.contentDetailsLoading = false;
        draft.contentDetailsSuccess = true;
        draft.contentDetailsError = '';
        break;
      case GET_CONTENT_DETAILS_ERROR:
        draft.contentDetailsLoading = false;
        draft.contentDetailsSuccess = false;
        draft.contentDetailsError = action.error;
        break;
      case CLEAN_CONTENT_CREATION:
        draft.contentLoading = false;
        draft.contentSuccess = false;
        draft.contentError = '';
        break;
      case CLEAN_CONTENT_DETAILS:
        draft.contentDetailsLoading = false;
        draft.contentDetailsSuccess = false;
        draft.contentDetailsError = '';
        break;
      default:
        return state;
    }
  });

export default contentCreationReducer;

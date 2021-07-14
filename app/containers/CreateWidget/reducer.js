/*
 *
 * CreateWidget reducer
 *
 */
import produce from 'immer';
import _ from 'lodash';
import {
  DISPLAY_OPTIONS,
  DISPLAY_OPTIONS_SUCCESS,
  DISPLAY_OPTIONS_ERROR,
  WIDGET_TYPES,
  WIDGET_TYPES_SUCCESS,
  WIDGET_TYPES_ERROR,
  SOCIAL_WALL_TYPES,
  SOCIAL_WALL_TYPES_SUCCESS,
  SOCIAL_WALL_TYPES_ERROR,
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_ERROR,
  TYPEFORM_LIST,
  TYPEFORM_LIST_SUCCESS,
  TYPEFORM_LIST_ERROR,
  TYPEFORM_LIST_MORE,
  TYPEFORM_LIST_MORE_SUCCESS,
  FILTER_TYPEFORM_LIST,
  FILTER_TYPEFORM_LIST_SUCCESS,
  WIDGET,
  WIDGET_SUCCESS,
  WIDGET_ERROR,
  CREATE_WIDGET,
  CREATE_WIDGET_SUCCESS,
  CREATE_WIDGET_ERROR,
  CLEAN_CREATE_WIDGET,
} from './constants';

export const initialState = {
  displayOptions: [],
  displayOptionsLoading: false,
  displayOptionsSuccess: false,
  displayOptionsError: '',
  widgetTypes: [],
  widgetTypesLoading: false,
  widgetTypesSuccess: false,
  widgetTypesError: '',
  socialWallTypes: [],
  socialWallTypesLoading: false,
  socialWallTypesSuccess: false,
  socialWallTypesError: '',
  uploadFile: {},
  uploadFileLoading: false,
  uploadFileSuccess: false,
  uploadFileError: '',
  typeformList: {},
  typeformListLoading: false,
  typeformListSuccess: false,
  typeformListError: '',
  widget: '',
  widgetLoading: false,
  widgetSuccess: false,
  widgetError: '',
  createWidgetLoading: false,
  createWidgetSuccess: false,
  createWidgetError: '',
};

/* eslint-disable default-case, no-param-reassign */
const createWidgetReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case DISPLAY_OPTIONS:
        draft.displayOptions = [];
        draft.displayOptionsLoading = true;
        draft.displayOptionsSuccess = false;
        draft.displayOptionsError = '';
        break;
      case DISPLAY_OPTIONS_SUCCESS:
        draft.displayOptions = action.data;
        draft.displayOptionsLoading = false;
        draft.displayOptionsSuccess = true;
        draft.displayOptionsError = '';
        break;
      case DISPLAY_OPTIONS_ERROR:
        draft.displayOptionsLoading = false;
        draft.displayOptionsSuccess = false;
        draft.displayOptionsError = action.error;
        break;
      case WIDGET_TYPES:
        draft.widgetTypes = [];
        draft.widgetTypesLoading = true;
        draft.widgetTypesSuccess = false;
        draft.widgetTypesError = '';
        break;
      case WIDGET_TYPES_SUCCESS:
        draft.widgetTypes = action.data;
        draft.widgetTypesLoading = false;
        draft.widgetTypesSuccess = true;
        draft.widgetTypesError = '';
        break;
      case WIDGET_TYPES_ERROR:
        draft.widgetTypesLoading = false;
        draft.widgetTypesSuccess = false;
        draft.widgetTypesError = action.error;
        break;
      case SOCIAL_WALL_TYPES:
        draft.socialWallTypes = [];
        draft.socialWallTypesLoading = true;
        draft.socialWallTypesSuccess = false;
        draft.socialWallTypesError = '';
        break;
      case SOCIAL_WALL_TYPES_SUCCESS:
        draft.socialWallTypes = action.data;
        draft.socialWallTypesLoading = false;
        draft.socialWallTypesSuccess = true;
        draft.socialWallTypesError = '';
        break;
      case SOCIAL_WALL_TYPES_ERROR:
        draft.socialWallTypesLoading = false;
        draft.socialWallTypesSuccess = false;
        draft.socialWallTypesError = action.error;
        break;
      case UPLOAD_FILE:
        draft.uploadFileLoading = true;
        draft.uploadFileSuccess = false;
        draft.uploadFileError = '';
        break;
      case UPLOAD_FILE_SUCCESS:
        draft.uploadFile = {
          ...draft.uploadFile,
          [action.widgetType]: action.data,
        };
        draft.uploadFileLoading = false;
        draft.uploadFileSuccess = true;
        draft.uploadFileError = '';
        break;
      case UPLOAD_FILE_ERROR:
        draft.uploadFileLoading = false;
        draft.uploadFileSuccess = false;
        draft.uploadFileError = action.error;
        break;
      case TYPEFORM_LIST:
        draft.typeformList = {};
        draft.typeformListLoading = true;
        draft.typeformListSuccess = false;
        draft.typeformListError = '';
        break;
      case TYPEFORM_LIST_SUCCESS:
        draft.typeformList = action.data;
        draft.typeformListLoading = false;
        draft.typeformListSuccess = true;
        draft.typeformListError = '';
        break;
      case TYPEFORM_LIST_ERROR:
        draft.typeformListLoading = false;
        draft.typeformListSuccess = false;
        draft.typeformListError = action.error;
        break;
      case TYPEFORM_LIST_MORE:
        draft.typeformListLoading = true;
        draft.typeformListSuccess = false;
        draft.typeformListError = '';
        break;
      case TYPEFORM_LIST_MORE_SUCCESS:
        draft.typeformList = _.merge(draft.typeformList, action.data);
        draft.typeformListLoading = false;
        draft.typeformListSuccess = true;
        draft.typeformListError = '';
        break;
      case FILTER_TYPEFORM_LIST:
        draft.typeformList = {};
        draft.typeformListLoading = true;
        draft.typeformListSuccess = false;
        draft.typeformListError = '';
        break;
      case FILTER_TYPEFORM_LIST_SUCCESS:
        draft.typeformList = action.data;
        draft.typeformListLoading = false;
        draft.typeformListSuccess = true;
        draft.typeformListError = '';
        break;
      case WIDGET:
        draft.widget = '';
        draft.widgetLoading = true;
        draft.widgetSuccess = false;
        draft.widgetError = '';
        break;
      case WIDGET_SUCCESS:
        draft.widget = action.data;
        draft.widgetLoading = false;
        draft.widgetSuccess = true;
        draft.widgetError = '';
        break;
      case WIDGET_ERROR:
        draft.widgetLoading = false;
        draft.widgetSuccess = false;
        draft.widgetError = action.error;
        break;
      case CREATE_WIDGET:
        draft.createWidgetLoading = true;
        draft.createWidgetSuccess = false;
        draft.createWidgetError = '';
        break;
      case CREATE_WIDGET_SUCCESS:
        draft.createWidgetLoading = false;
        draft.createWidgetSuccess = true;
        draft.createWidgetError = '';
        break;
      case CREATE_WIDGET_ERROR:
        draft.createWidgetLoading = false;
        draft.createWidgetSuccess = false;
        draft.createWidgetError = action.error;
        break;
      case CLEAN_CREATE_WIDGET:
        draft.uploadFile = {};
        draft.widget = '';
        draft.createWidgetLoading = false;
        draft.createWidgetSuccess = false;
        draft.createWidgetError = '';
        break;
      default:
        return state;
    }
  });

export default createWidgetReducer;

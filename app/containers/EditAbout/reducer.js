/*
 *
 * EditAbout reducer
 *
 */
import produce from 'immer';
import {
  CUSTOM_FIELD_LIST,
  CUSTOM_FIELD_LIST_SUCCESS,
  CUSTOM_FIELD_LIST_ERROR,
  SERVICE_FILTER_LIST,
  SERVICE_FILTER_LIST_SUCCESS,
  SERVICE_FILTER_LIST_ERROR,
  HOBBY_LIST,
  HOBBY_LIST_SUCCESS,
  HOBBY_LIST_ERROR,
  EMPLOYEE_LIST,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_LIST_ERROR,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_ERROR,
  RESET_EDIT_ABOUT,
} from './constants';

export const initialState = {
  customFieldList: [],
  customFieldListLoading: false,
  customFieldListSuccess: false,
  customFieldListError: '',
  serviceFilterList: [],
  serviceFilterListLoading: false,
  serviceFilterListSuccess: false,
  serviceFilterListError: '',
  hobbyList: {},
  hobbyListLoading: false,
  hobbyListSuccess: false,
  hobbyListError: '',
  employeeList: [],
  employeeListLoading: false,
  employeeListSuccess: false,
  employeeListError: '',
  editUserLoading: false,
  editUserSuccess: false,
  editUserError: '',
};

/* eslint-disable default-case, no-param-reassign */
const editAboutReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case CUSTOM_FIELD_LIST:
        draft.customFieldList = [];
        draft.customFieldListLoading = true;
        draft.customFieldListSuccess = false;
        draft.customFieldListError = '';
        break;
      case CUSTOM_FIELD_LIST_SUCCESS:
        draft.customFieldList = action.data;
        draft.customFieldListLoading = false;
        draft.customFieldListSuccess = true;
        draft.customFieldListError = '';
        break;
      case CUSTOM_FIELD_LIST_ERROR:
        draft.customFieldListLoading = false;
        draft.customFieldListSuccess = false;
        draft.customFieldListError = action.error;
        break;
      case SERVICE_FILTER_LIST:
        draft.serviceFilterList = [];
        draft.serviceFilterListLoading = true;
        draft.serviceFilterListSuccess = false;
        draft.serviceFilterListError = '';
        break;
      case SERVICE_FILTER_LIST_SUCCESS:
        draft.serviceFilterList = action.data;
        draft.serviceFilterListLoading = false;
        draft.serviceFilterListSuccess = true;
        draft.serviceFilterListError = '';
        break;
      case SERVICE_FILTER_LIST_ERROR:
        draft.serviceFilterListLoading = false;
        draft.serviceFilterListSuccess = false;
        draft.serviceFilterListError = action.error;
        break;
      case HOBBY_LIST:
        draft.hobbyList = {};
        draft.hobbyListLoading = true;
        draft.hobbyListSuccess = false;
        draft.hobbyListError = '';
        break;
      case HOBBY_LIST_SUCCESS:
        draft.hobbyList = action.data;
        draft.hobbyListLoading = false;
        draft.hobbyListSuccess = true;
        draft.hobbyListError = '';
        break;
      case HOBBY_LIST_ERROR:
        draft.hobbyListLoading = false;
        draft.hobbyListSuccess = false;
        draft.hobbyListError = action.error;
        break;
      case EMPLOYEE_LIST:
        draft.employeeList = [];
        draft.employeeListLoading = true;
        draft.employeeListSuccess = false;
        draft.employeeListError = '';
        break;
      case EMPLOYEE_LIST_SUCCESS:
        draft.employeeList = action.data;
        draft.employeeListLoading = false;
        draft.employeeListSuccess = true;
        draft.employeeListError = '';
        break;
      case EMPLOYEE_LIST_ERROR:
        draft.employeeListLoading = false;
        draft.employeeListSuccess = false;
        draft.employeeListError = action.error;
        break;
      case EDIT_USER:
        draft.editUserLoading = true;
        draft.editUserSuccess = false;
        draft.editUserError = '';
        break;
      case EDIT_USER_SUCCESS:
        draft.editUserLoading = false;
        draft.editUserSuccess = true;
        draft.editUserError = '';
        break;
      case EDIT_USER_ERROR:
        draft.editUserLoading = false;
        draft.editUserSuccess = false;
        draft.editUserError = action.error;
        break;
      case RESET_EDIT_ABOUT:
        draft.editUserLoading = false;
        draft.editUserSuccess = false;
        draft.editUserError = '';
        break;
      default:
        return state;
    }
  });

export default editAboutReducer;

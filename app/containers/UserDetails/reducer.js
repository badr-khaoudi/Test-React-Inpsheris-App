/*
 *
 * UserDetails reducer
 *
 */
import produce from 'immer';
import {
  LIST_USER_DETAILS_AND_ACTIONS,
  LIST_USER_DETAILS_AND_ACTIONS_SUCCESS,
  TOTAL_CONNECT_AT_THE_MOMENT,
  TOTAL_CONNECT_AT_THE_MOMENT_SUCCESS,
  VIEW_DETAILS,
  VIEW_DETAILS_SUCCESS,
  VIEW_DETAILS_EXPORT,
  VIEW_DETAILS_EXPORT_SUCCESS,
  VIEW_DETAILS_EXPORT_ERROR,
  LIST_USER_NEVER_CONNECT,
  LIST_USER_NEVER_CONNECT_SUCCESS,
  LIST_USER_CONNECT,
  LIST_USER_CONNECT_SUCCESS,
  LIST_USER_CONNECT_LESS_EQUAL_TEN_TIMES,
  LIST_USER_CONNECT_LESS_EQUAL_TEN_TIMES_SUCCESS,
  LIST_USER_CONNECTION_SUMMARY,
  LIST_USER_CONNECTION_SUMMARY_SUCCESS,
  USER_DETAILS_ERROR,
} from './constants';

export const initialState = {
  listUserDetailsAndActions: {},
  totalConnectAtTheMoment: {},
  totalConnectAtTheMomentLoading: false,
  viewDetails: {},
  viewDetailsLoading: false,
  viewDetailsExport: {},
  viewDetailsExportLoading: false,
  viewDetailsExportSuccess: false,
  viewDetailsExportError: '',
  listUserNeverConnect: {},
  listUserConnect: {},
  listUserConnectLessEqualTenTimes: {},
  listUserConnectionSummary: {},
  userDetailsSuccess: false,
  userDetailsLoading: false,
  userDetailsError: '',
};

/* eslint-disable default-case, no-param-reassign */
const userDetailsReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case LIST_USER_DETAILS_AND_ACTIONS:
        draft.listUserDetailsAndActions = {};
        draft.userDetailsSuccess = false;
        draft.userDetailsLoading = true;
        draft.userDetailsError = '';
        break;
      case LIST_USER_DETAILS_AND_ACTIONS_SUCCESS:
        draft.listUserDetailsAndActions = action.data;
        draft.userDetailsSuccess = true;
        draft.userDetailsLoading = false;
        draft.userDetailsError = '';
        break;
      case TOTAL_CONNECT_AT_THE_MOMENT:
        draft.totalConnectAtTheMoment = {};
        draft.totalConnectAtTheMomentLoading = true;
        draft.userDetailsSuccess = false;
        draft.userDetailsError = '';
        break;
      case TOTAL_CONNECT_AT_THE_MOMENT_SUCCESS:
        draft.totalConnectAtTheMoment = action.data;
        draft.totalConnectAtTheMomentLoading = false;
        draft.userDetailsSuccess = true;
        draft.userDetailsError = '';
        break;
      case VIEW_DETAILS:
        draft.viewDetails = {};
        draft.viewDetailsLoading = true;
        draft.userDetailsSuccess = false;
        draft.userDetailsError = '';
        break;
      case VIEW_DETAILS_SUCCESS:
        draft.viewDetails = action.data;
        draft.viewDetailsLoading = false;
        draft.userDetailsSuccess = true;
        draft.userDetailsError = '';
        break;
      case VIEW_DETAILS_EXPORT:
        draft.viewDetailsExport = {};
        draft.viewDetailsExportLoading = true;
        draft.viewDetailsExportSuccess = false;
        draft.viewDetailsExportError = '';
        break;
      case VIEW_DETAILS_EXPORT_SUCCESS:
        draft.viewDetailsExport = action.data;
        draft.viewDetailsExportLoading = false;
        draft.viewDetailsExportSuccess = true;
        draft.viewDetailsExportError = '';
        break;
      case VIEW_DETAILS_EXPORT_ERROR:
        draft.viewDetailsExportLoading = false;
        draft.viewDetailsExportSuccess = false;
        draft.viewDetailsExportError = action.error;
        break;
      case LIST_USER_NEVER_CONNECT:
        draft.listUserNeverConnect = {};
        draft.userDetailsSuccess = false;
        draft.userDetailsLoading = true;
        draft.userDetailsError = '';
        break;
      case LIST_USER_NEVER_CONNECT_SUCCESS:
        draft.listUserNeverConnect = action.data;
        draft.userDetailsSuccess = true;
        draft.userDetailsLoading = false;
        draft.userDetailsError = '';
        break;
      case LIST_USER_CONNECT:
        draft.listUserConnect = {};
        draft.userDetailsSuccess = false;
        draft.userDetailsLoading = true;
        draft.userDetailsError = '';
        break;
      case LIST_USER_CONNECT_SUCCESS:
        draft.listUserConnect = action.data;
        draft.userDetailsSuccess = true;
        draft.userDetailsLoading = false;
        draft.userDetailsError = '';
        break;
      case LIST_USER_CONNECT_LESS_EQUAL_TEN_TIMES:
        draft.listUserConnectLessEqualTenTimes = {};
        draft.userDetailsSuccess = false;
        draft.userDetailsLoading = true;
        draft.userDetailsError = '';
        break;
      case LIST_USER_CONNECT_LESS_EQUAL_TEN_TIMES_SUCCESS:
        draft.listUserConnectLessEqualTenTimes = action.data;
        draft.userDetailsSuccess = true;
        draft.userDetailsLoading = false;
        draft.userDetailsError = '';
        break;
      case LIST_USER_CONNECTION_SUMMARY:
        draft.listUserConnectionSummary = {};
        draft.userDetailsSuccess = false;
        draft.userDetailsLoading = true;
        draft.userDetailsError = '';
        break;
      case LIST_USER_CONNECTION_SUMMARY_SUCCESS:
        draft.listUserConnectionSummary = action.data;
        draft.userDetailsSuccess = true;
        draft.userDetailsLoading = false;
        draft.userDetailsError = '';
        break;
      case USER_DETAILS_ERROR:
        draft.userDetailsSuccess = false;
        draft.viewDetailsLoading = false;
        draft.userDetailsLoading = false;
        draft.userDetailsError = action.error;
        break;
      default:
        return state;
    }
  });

export default userDetailsReducer;

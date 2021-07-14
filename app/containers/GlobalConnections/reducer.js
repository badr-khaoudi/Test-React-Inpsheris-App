/*
 *
 * GlobalConnections reducer
 *
 */
import produce from 'immer';
import {
  COUNT_TOTAL,
  COUNT_TOTAL_SUCCESS,
  COUNT_TOTAL_TABLE,
  COUNT_TOTAL_TABLE_SUCCESS,
  COUNT_BY_DEPARTMENT,
  COUNT_BY_DEPARTMENT_SUCCESS,
  COUNT_BY_STATUS,
  COUNT_BY_STATUS_SUCCESS,
  COUNT_BY_COMMUNITY_STATUS,
  COUNT_BY_COMMUNITY_STATUS_SUCCESS,
  GLOBAL_CONNECTIONS_ERROR,
} from './constants';

export const initialState = {
  countTotal: {},
  countTotalTable: {},
  countByDepartment: {},
  countByStatus: {},
  countByCommunityStatus: {},
  globalConnectionsSuccess: false,
  globalConnectionsLoading: false,
  globalConnectionsError: '',
};

/* eslint-disable default-case, no-param-reassign */
const globalConnectionsReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case COUNT_TOTAL:
        draft.countTotal = {};
        draft.globalConnectionsSuccess = false;
        draft.globalConnectionsLoading = true;
        draft.globalConnectionsError = '';
        break;
      case COUNT_TOTAL_SUCCESS:
        draft.countTotal = action.data;
        draft.globalConnectionsSuccess = true;
        draft.globalConnectionsLoading = false;
        draft.globalConnectionsError = '';
        break;
      case COUNT_TOTAL_TABLE:
        draft.countTotalTable = {};
        draft.globalConnectionsSuccess = false;
        draft.globalConnectionsLoading = true;
        draft.globalConnectionsError = '';
        break;
      case COUNT_TOTAL_TABLE_SUCCESS:
        draft.countTotalTable = action.data;
        draft.globalConnectionsSuccess = true;
        draft.globalConnectionsLoading = false;
        draft.globalConnectionsError = '';
        break;
      case COUNT_BY_DEPARTMENT:
        draft.countByDepartment = {};
        draft.globalConnectionsSuccess = false;
        draft.globalConnectionsLoading = true;
        draft.globalConnectionsError = '';
        break;
      case COUNT_BY_DEPARTMENT_SUCCESS:
        draft.countByDepartment = action.data;
        draft.globalConnectionsSuccess = true;
        draft.globalConnectionsLoading = false;
        draft.globalConnectionsError = '';
        break;
      case COUNT_BY_STATUS:
        draft.countByStatus = {};
        draft.globalConnectionsSuccess = false;
        draft.globalConnectionsLoading = true;
        draft.globalConnectionsError = '';
        break;
      case COUNT_BY_STATUS_SUCCESS:
        draft.countByStatus = action.data;
        draft.globalConnectionsSuccess = true;
        draft.globalConnectionsLoading = false;
        draft.globalConnectionsError = '';
        break;
      case COUNT_BY_COMMUNITY_STATUS:
        draft.countByCommunityStatus = {};
        draft.globalConnectionsSuccess = false;
        draft.globalConnectionsLoading = true;
        draft.globalConnectionsError = '';
        break;
      case COUNT_BY_COMMUNITY_STATUS_SUCCESS:
        draft.countByCommunityStatus = action.data;
        draft.globalConnectionsSuccess = true;
        draft.globalConnectionsLoading = false;
        draft.globalConnectionsError = '';
        break;
      case GLOBAL_CONNECTIONS_ERROR:
        draft.globalConnectionsSuccess = false;
        draft.globalConnectionsLoading = false;
        draft.globalConnectionsError = action.error;
        break;
      default:
        return state;
    }
  });

export default globalConnectionsReducer;

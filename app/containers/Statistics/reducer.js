/*
 *
 * Statistics reducer
 *
 */
import produce from 'immer';
import {
  LAST_UPDATED_DATE,
  LAST_UPDATED_DATE_SUCCESS,
  LAST_UPDATED_DATE_ERROR,
  EXPORT_ALL,
  EXPORT_ALL_SUCCESS,
  EXPORT_ALL_ERROR,
  EXPORT_TABLE,
  EXPORT_TABLE_SUCCESS,
  EXPORT_TABLE_ERROR,
  JOB_LIST,
  JOB_LIST_SUCCESS,
  JOB_LIST_ERROR,
  CANCEL_JOB_LIST,
} from './constants';

export const initialState = {
  lastUpdatedDate: '',
  lastUpdatedDateLoading: false,
  lastUpdatedDateSuccess: false,
  lastUpdatedDateError: '',
  exportAll: {},
  exportAllLoading: false,
  exportAllSuccess: false,
  exportAllError: '',
  exportTable: {},
  exportTableLoading: false,
  exportTableSuccess: false,
  exportTableError: '',
  jobListLoading: false,
  jobListSuccess: false,
  jobListError: '',
};

/* eslint-disable default-case, no-param-reassign */
const statisticsReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case LAST_UPDATED_DATE:
        draft.lastUpdatedDate = '';
        draft.lastUpdatedDateLoading = true;
        draft.lastUpdatedDateSuccess = false;
        draft.lastUpdatedDateError = '';
        break;
      case LAST_UPDATED_DATE_SUCCESS:
        draft.lastUpdatedDate = action.data;
        draft.lastUpdatedDateLoading = false;
        draft.lastUpdatedDateSuccess = true;
        draft.lastUpdatedDateError = '';
        break;
      case LAST_UPDATED_DATE_ERROR:
        draft.lastUpdatedDateLoading = false;
        draft.lastUpdatedDateSuccess = false;
        draft.lastUpdatedDateError = action.error;
        break;
      case EXPORT_ALL:
        draft.exportAll = {};
        draft.exportAllLoading = true;
        draft.exportAllSuccess = false;
        draft.exportAllError = '';
        break;
      case EXPORT_ALL_SUCCESS:
        draft.exportAll = action.data;
        draft.exportAllLoading = false;
        draft.exportAllSuccess = true;
        draft.exportAllError = '';
        draft.jobListLoading = true;
        break;
      case EXPORT_ALL_ERROR:
        draft.exportAllLoading = false;
        draft.exportAllSuccess = false;
        draft.exportAllError = action.error;
        break;
      case EXPORT_TABLE:
        draft.exportTable = {};
        draft.exportTableLoading = true;
        draft.exportTableSuccess = false;
        draft.exportTableError = '';
        break;
      case EXPORT_TABLE_SUCCESS:
        draft.exportTable = action.data;
        draft.exportTableLoading = false;
        draft.exportTableSuccess = true;
        draft.exportTableError = '';
        draft.jobListLoading = true;
        break;
      case EXPORT_TABLE_ERROR:
        draft.exportTableLoading = false;
        draft.exportTableSuccess = false;
        draft.exportTableError = action.error;
        break;
      case JOB_LIST:
        draft.jobListLoading = true;
        draft.jobListSuccess = false;
        draft.jobListError = '';
        break;
      case JOB_LIST_SUCCESS:
        draft.jobListLoading = false;
        draft.jobListSuccess = true;
        draft.jobListError = '';
        break;
      case JOB_LIST_ERROR:
        draft.jobListLoading = false;
        draft.jobListSuccess = false;
        draft.jobListError = action.error;
        break;
      case CANCEL_JOB_LIST:
        draft.jobListLoading = false;
        draft.jobListSuccess = false;
        draft.jobListError = '';
        break;
      default:
        return state;
    }
  });

export default statisticsReducer;

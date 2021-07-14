/*
 *
 * GlobalContent reducer
 *
 */
import produce from 'immer';
import {
  COUNT_CONTENT_CREATED_BY_DATE,
  COUNT_CONTENT_CREATED_BY_DATE_SUCCESS,
  COUNT_CONTENT_CREATED_BY_DATE_ERROR,
} from './constants';

export const initialState = {
  countContentCreatedByDate: {},
  countContentCreatedByDateSuccess: false,
  countContentCreatedByDateLoading: false,
  countContentCreatedByDateError: '',
};

/* eslint-disable default-case, no-param-reassign */
const globalContentReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case COUNT_CONTENT_CREATED_BY_DATE:
        draft.countContentCreatedByDate = {};
        draft.countContentCreatedByDateLoading = true;
        draft.countContentCreatedByDateSuccess = false;
        draft.countContentCreatedByDateError = '';
        break;
      case COUNT_CONTENT_CREATED_BY_DATE_SUCCESS:
        draft.countContentCreatedByDate = action.data;
        draft.countContentCreatedByDateLoading = false;
        draft.countContentCreatedByDateSuccess = true;
        draft.countContentCreatedByDateError = '';
        break;
      case COUNT_CONTENT_CREATED_BY_DATE_ERROR:
        draft.countContentCreatedByDateLoading = false;
        draft.countContentCreatedByDateSuccess = false;
        draft.countContentCreatedByDateError = action.error;
        break;
      default:
        return state;
    }
  });

export default globalContentReducer;

/*
 *
 * FlexdeskReport reducer
 *
 */
import produce from 'immer';
import { FLEXDESK, FLEXDESK_SUCCESS, FLEXDESK_ERROR } from './constants';

export const initialState = {
  flexdesk: {},
  flexdeskSuccess: false,
  flexdeskLoading: false,
  flexdeskError: '',
};

/* eslint-disable default-case, no-param-reassign */
const flexdeskReportReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case FLEXDESK:
        draft.flexdesk = {};
        draft.flexdeskLoading = true;
        draft.flexdeskSuccess = false;
        draft.flexdeskError = '';
        break;
      case FLEXDESK_SUCCESS:
        draft.flexdesk = action.data;
        draft.flexdeskLoading = false;
        draft.flexdeskSuccess = true;
        draft.flexdeskError = '';
        break;
      case FLEXDESK_ERROR:
        draft.flexdeskLoading = false;
        draft.flexdeskSuccess = false;
        draft.flexdeskError = action.error;
        break;
      default:
        return state;
    }
  });

export default flexdeskReportReducer;

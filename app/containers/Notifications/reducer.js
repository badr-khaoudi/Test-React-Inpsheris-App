/*
 *
 * Notifications reducer
 *
 */
import produce from 'immer';
import {
  NOTIFICATION_LIST,
  NOTIFICATION_LIST_SUCCESS,
  NOTIFICATION_LIST_ERROR,
  NOTIFICATION_LIST_MORE,
  NOTIFICATION_LIST_MORE_SUCCESS,
  NOTIFICATION_LIST_MORE_ERROR,
} from './constants';

export const initialState = {
  notificationList: [],
  notificationListLoading: false,
  notificationListSuccess: false,
  notificationListError: '',
};

/* eslint-disable default-case, no-param-reassign */
const notificationsReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case NOTIFICATION_LIST:
        draft.notificationList = [];
        draft.notificationListLoading = true;
        draft.notificationListSuccess = false;
        draft.notificationListError = '';
        break;
      case NOTIFICATION_LIST_SUCCESS:
        draft.notificationList = action.data;
        draft.notificationListLoading = false;
        draft.notificationListSuccess = true;
        draft.notificationListError = '';
        break;
      case NOTIFICATION_LIST_ERROR:
        draft.notificationListLoading = false;
        draft.notificationListSuccess = false;
        draft.notificationListError = action.error;
        break;
      case NOTIFICATION_LIST_MORE:
        draft.notificationListLoading = true;
        draft.notificationListSuccess = false;
        draft.notificationListError = '';
        break;
      case NOTIFICATION_LIST_MORE_SUCCESS:
        draft.notificationList = [...draft.notificationList, ...action.data];
        draft.notificationListLoading = false;
        draft.notificationListSuccess = true;
        draft.notificationListError = '';
        break;
      case NOTIFICATION_LIST_MORE_ERROR:
        draft.notificationListLoading = false;
        draft.notificationListSuccess = false;
        draft.notificationListError = action.error;
        break;
      default:
        return state;
    }
  });

export default notificationsReducer;

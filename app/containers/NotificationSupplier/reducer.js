/*
 *
 * NotificationSupplier reducer
 *
 */
import produce from 'immer';
import {
  GET_NOTIFICATION_COUNT,
  GET_NOTIFICATION_COUNT_SUCCESS,
  GET_NOTIFICATION_COUNT_ERROR,
  GET_NOTIFICATION_LIST,
  GET_NOTIFICATION_LIST_SUCCESS,
  GET_NOTIFICATION_LIST_ERROR,
  PARTICIPANT,
  PARTICIPANT_SUCCESS,
  PARTICIPANT_ERROR,
} from './constants';

export const initialState = {
  notificationCount: {},
  getNotificationCountLoading: true,
  getNotificationCountSuccess: false,
  getNotificationCountError: {},
  notificationList: [],
  getNotificationListLoading: true,
  getNotificationListSuccess: false,
  getNotificationListError: {},
  participant: [],
  participantLoading: true,
  participantSuccess: false,
  participantError: {},
};

/* eslint-disable default-case, no-param-reassign */
const notificationSupplierReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case GET_NOTIFICATION_COUNT:
        draft.getNotificationCountLoading = true;
        draft.getNotificationCountSuccess = false;
        draft.getNotificationCountError = {};
        break;
      case GET_NOTIFICATION_COUNT_SUCCESS:
        draft.notificationCount = action.data;
        draft.getNotificationCountLoading = false;
        draft.getNotificationCountSuccess = true;
        break;
      case GET_NOTIFICATION_COUNT_ERROR:
        draft.getNotificationCountLoading = false;
        draft.getNotificationCountSuccess = false;
        draft.getNotificationCountError = action.error;
        break;
      case GET_NOTIFICATION_LIST:
        draft.getNotificationListLoading = true;
        draft.getNotificationListSuccess = false;
        draft.getNotificationListError = {};
        break;
      case GET_NOTIFICATION_LIST_SUCCESS:
        draft.notificationList = action.data;
        draft.notificationCount = { count: 0 };
        draft.getNotificationListLoading = false;
        draft.getNotificationListSuccess = true;
        break;
      case GET_NOTIFICATION_LIST_ERROR:
        draft.getNotificationListLoading = false;
        draft.getNotificationListSuccess = false;
        draft.getNotificationListError = action.error;
        break;
      case PARTICIPANT:
        draft.participantLoading = true;
        draft.participantSuccess = false;
        draft.participantError = {};
        break;
      case PARTICIPANT_SUCCESS:
        draft.participant = { ...draft.participant, [action.uid]: action.data };
        draft.participantLoading = false;
        draft.participantSuccess = true;
        break;
      case PARTICIPANT_ERROR:
        draft.participantLoading = false;
        draft.participantSuccess = false;
        draft.participantError = action.error;
        break;
      default:
        return state;
    }
  });

export default notificationSupplierReducer;

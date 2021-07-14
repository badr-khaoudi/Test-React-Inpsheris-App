import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the notificationSupplier state domain
 */

const selectNotificationSupplierDomain = state =>
  state.notificationSupplier || initialState;

/**
 * NotificationCount Selector
 */
const makeSelectNotificationCount = () =>
  createSelector(
    selectNotificationSupplierDomain,
    globalState => globalState.notificationCount,
  );

/**
 * NotificationCount Error Selector
 */
const makeSelectNotificationCountError = () =>
  createSelector(
    selectNotificationSupplierDomain,
    globalState => globalState.getNotificationCountError,
  );

/**
 * NotificationCount Loading Selector
 */
const makeSelectNotificationCountLoading = () =>
  createSelector(
    selectNotificationSupplierDomain,
    globalState => globalState.getNotificationCountLoading,
  );

/**
 * NotificationList Selector
 */
const makeSelectNotificationList = () =>
  createSelector(
    selectNotificationSupplierDomain,
    globalState => globalState.notificationList,
  );

/**
 * NotificationList Error Selector
 */
const makeSelectNotificationListError = () =>
  createSelector(
    selectNotificationSupplierDomain,
    globalState => globalState.getNotificationListError,
  );

/**
 * NotificationList Loading Selector
 */
const makeSelectNotificationListLoading = () =>
  createSelector(
    selectNotificationSupplierDomain,
    globalState => globalState.getNotificationListLoading,
  );

const makeSelectParticipant = uid =>
  createSelector(
    selectNotificationSupplierDomain,
    globalState => globalState.participant[uid],
  );

export {
  selectNotificationSupplierDomain,
  makeSelectNotificationCount,
  makeSelectNotificationCountError,
  makeSelectNotificationCountLoading,
  makeSelectNotificationList,
  makeSelectNotificationListError,
  makeSelectNotificationListLoading,
  makeSelectParticipant,
};

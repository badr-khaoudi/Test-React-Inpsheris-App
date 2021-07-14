import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the notifications state domain
 */

const selectNotificationsDomain = state => state.notifications || initialState;

const makeSelectNotificationList = () =>
  createSelector(
    selectNotificationsDomain,
    globalState => globalState.notificationList,
  );

const makeSelectNotificationListLoading = () =>
  createSelector(
    selectNotificationsDomain,
    globalState => globalState.notificationListLoading,
  );

// const makeSelectNotifications = () =>
//   createSelector(
//     selectNotificationsDomain,
//     substate => substate,
//   );

// export default makeSelectNotifications;
export { makeSelectNotificationList, makeSelectNotificationListLoading };

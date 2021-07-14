import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the directoryPrivateMessage state domain
 */

const selectDirectoryPrivateMessageDomain = state =>
  state.directoryPrivateMessage || initialState;

/**
 * Other specific selectors
 */

const makeSelectPrivateMessageSuccess = () =>
  createSelector(
    selectDirectoryPrivateMessageDomain,
    substate => substate.privateMessageSuccess,
  );

/**
 * Default selector used by DirectoryPrivateMessage
 */

// const makeSelectDirectoryPrivateMessage = () =>
//   createSelector(
//     selectDirectoryPrivateMessageDomain,
//     substate => substate,
//   );

// export default makeSelectDirectoryPrivateMessage;
export { makeSelectPrivateMessageSuccess };

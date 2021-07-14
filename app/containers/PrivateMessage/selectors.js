import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the privateMessage state domain
 */

const selectPrivateMessageDomain = state =>
  state.privateMessage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PrivateMessage
 */

const makeSelectPrivateMessageSuccess = () =>
  createSelector(
    selectPrivateMessageDomain,
    substate => substate.privateMessageSuccess,
  );

// export default makeSelectPrivateMessage;
export { makeSelectPrivateMessageSuccess };

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the share state domain
 */

const selectShareDomain = state => state.share || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Share
 */

const makeSelectShareSuccess = () =>
  createSelector(
    selectShareDomain,
    globalState => globalState.shareSuccess,
  );

// export default makeSelectShare;
export { makeSelectShareSuccess };

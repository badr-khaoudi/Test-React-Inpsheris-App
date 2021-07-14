import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the pinnedPosts state domain
 */

const selectPinnedPostsDomain = state => state.pinnedPosts || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PinnedPosts
 */

const makeSelectPinnedPosts = () =>
  createSelector(
    selectPinnedPostsDomain,
    substate => substate,
  );

export default makeSelectPinnedPosts;
export { selectPinnedPostsDomain };

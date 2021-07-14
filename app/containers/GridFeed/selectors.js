import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the gridFeed state domain
 */

const selectGridFeedDomain = state => state.gridFeed || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GridFeed
 */

const makeSelectGridFeed = () =>
  createSelector(
    selectGridFeedDomain,
    substate => substate,
  );

export default makeSelectGridFeed;
export { selectGridFeedDomain };

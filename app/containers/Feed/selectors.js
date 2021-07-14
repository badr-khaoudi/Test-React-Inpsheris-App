import { createSelector } from 'reselect';
import _ from 'lodash';
import { initialState } from './reducer';

/**
 * Direct selector to the feed state domain
 */

const selectFeedDomain = state => state.feed || initialState;

/**
 * Other specific selectors
 */

const makeSelectContent = uid =>
  createSelector(
    selectFeedDomain,
    globalState => _.find(globalState.contents, { sourceId: uid }),
  );

/**
 * Default selector used by Feed
 */

// const makeSelectFeed = () =>
//   createSelector(
//     selectFeedDomain,
//     substate => substate,
//   );

// export default makeSelectFeed;
export { makeSelectContent };

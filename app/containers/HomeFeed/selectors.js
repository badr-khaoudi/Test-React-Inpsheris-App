import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homeFeed state domain
 */

const selectHomeFeedDomain = state => state.homeFeed || initialState;

/**
 * Other specific selectors
 */

const makeSelectHomeFeed = () =>
  createSelector(
    selectHomeFeedDomain,
    globalState => globalState.homeFeed,
  );
const makeSelectHomeFeedLoading = () =>
  createSelector(
    selectHomeFeedDomain,
    globalState => globalState.homeFeedLoading,
  );
const makeSelectHomeFeedError = () =>
  createSelector(
    selectHomeFeedDomain,
    globalState => globalState.homeFeedError,
  );

export {
  makeSelectHomeFeed,
  makeSelectHomeFeedLoading,
  makeSelectHomeFeedError,
};

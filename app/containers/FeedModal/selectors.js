import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the feedModal state domain
 */

const selectFeedModalDomain = state => state.feedModal || initialState;

/**
 * Other specific selectors
 */

// const makeSelectContentDetails = () =>
//   createSelector(
//     selectFeedModalDomain,
//     globalState => globalState.contentDetails,
//   );

const makeSelectContentDetailsLoading = () =>
  createSelector(
    selectFeedModalDomain,
    globalState => globalState.contentDetailsLoading,
  );

const makeSelectContentDetailsError = () =>
  createSelector(
    selectFeedModalDomain,
    globalState => globalState.contentDetailsError,
  );

/**
 * Default selector used by FeedModal
 */

// const makeSelectFeedModal = () =>
//   createSelector(
//     selectFeedModalDomain,
//     substate => substate,
//   );

// export default makeSelectFeedModal;
export {
  // makeSelectContentDetails,
  makeSelectContentDetailsLoading,
  makeSelectContentDetailsError,
};

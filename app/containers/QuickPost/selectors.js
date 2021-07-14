import { createSelector } from 'reselect';
// import _ from 'lodash';
import { initialState } from './reducer';

/**
 * Direct selector to the quickPost state domain
 */

const selectQuickPostDomain = state => state.quickPost || initialState;

/**
 * Other specific selectors
 */

const makeSelectCanPublish = () =>
  createSelector(
    selectQuickPostDomain,
    globalState => globalState.canPublish,
  );

const makeSelectQuickPostSuccess = () =>
  createSelector(
    selectQuickPostDomain,
    globalState => globalState.quickPostSuccess,
  );

const makeSelectEmbedUrl = () =>
  createSelector(
    selectQuickPostDomain,
    globalState => globalState.embedUrl,
  );

const makeSelectOEmbed = () =>
  createSelector(
    selectQuickPostDomain,
    globalState => globalState.oEmbed,
  );

const makeSelectOEmbedError = () =>
  createSelector(
    selectQuickPostDomain,
    globalState => globalState.oEmbedError,
  );

const makeSelectQuickPostLoading = () =>
  createSelector(
    selectQuickPostDomain,
    globalState => globalState.quickPostLoading,
  );

/**
 * Default selector used by QuickPost
 */

// const makeSelectQuickPost = () =>
//   createSelector(
//     selectQuickPostDomain,
//     substate => substate,
//   );

// export default makeSelectQuickPost;
export {
  makeSelectCanPublish,
  makeSelectQuickPostSuccess,
  makeSelectEmbedUrl,
  makeSelectOEmbed,
  makeSelectOEmbedError,
  makeSelectQuickPostLoading,
};

import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the usefulLinks state domain
 */

const selectUsefulLinksDomain = state => state.usefulLinks || initialState;

/**
 * UsefulLinks Selector
 */
const makeSelectUsefulLinks = () =>
  createSelector(
    selectUsefulLinksDomain,
    globalState => globalState.usefulLinks,
  );

/**
 * UsefulLinks Error Selector
 */
const makeSelectUsefulLinksError = () =>
  createSelector(
    selectUsefulLinksDomain,
    globalState => globalState.getUsefulLinksError,
  );

/**
 * UsefulLinks Loading Selector
 */
const makeSelectUsefulLinksLoading = () =>
  createSelector(
    selectUsefulLinksDomain,
    globalState => globalState.getUsefulLinksLoading,
  );

export {
  selectUsefulLinksDomain,
  makeSelectUsefulLinks,
  makeSelectUsefulLinksError,
  makeSelectUsefulLinksLoading,
};

import { createSelector } from 'reselect';

import { initialState } from './reducer';

/**
 * Direct selector to the applicationLinks state domain
 */

const selectApplicationLinksDomain = state =>
  state.applicationLinks || initialState;

/**
 * ApplicationLinks Selector
 */
const makeSelectApplicationLinks = () =>
  createSelector(
    selectApplicationLinksDomain,
    globalState => globalState.applicationLinks,
  );

/**
 * ApplicationLinks Error Selector
 */
const makeSelectApplicationLinksError = () =>
  createSelector(
    selectApplicationLinksDomain,
    globalState => globalState.getApplicationLinksError,
  );

/**
 * ApplicationLinks Loading Selector
 */
const makeSelectApplicationLinksLoading = () =>
  createSelector(
    selectApplicationLinksDomain,
    globalState => globalState.getApplicationLinksLoading,
  );

export {
  selectApplicationLinksDomain,
  makeSelectApplicationLinks,
  makeSelectApplicationLinksError,
  makeSelectApplicationLinksLoading,
};

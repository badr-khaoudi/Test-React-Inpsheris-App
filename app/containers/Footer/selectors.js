import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the footer state domain
 */

const selectFooterDomain = state => state.footer || initialState;

/**
 * Other specific selectors
 */

/**
 * Footer Links Selector
 */

const makeSelectFooterLinks = () =>
  createSelector(
    selectFooterDomain,
    globalState => globalState.footerLinks,
  );

export { selectFooterDomain, makeSelectFooterLinks };

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the digestPreview state domain
 */

const selectDigestPreviewDomain = state => state.digestPreview || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DigestPreview
 */

const makeSelectDigestPreview = () =>
  createSelector(
    selectDigestPreviewDomain,
    substate => substate,
  );

export default makeSelectDigestPreview;
export { selectDigestPreviewDomain };

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the grandArticle state domain
 */

const selectGrandArticleDomain = state => state.grandArticle || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GrandArticle
 */

const makeSelectContentSuccess = () =>
  createSelector(
    selectGrandArticleDomain,
    substate => substate.contentSuccess,
  );

// const makeSelectGrandArticle = () =>
//   createSelector(
//     selectGrandArticleDomain,
//     substate => substate,
//   );

// export default makeSelectGrandArticle;
export { makeSelectContentSuccess };

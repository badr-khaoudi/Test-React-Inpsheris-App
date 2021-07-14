import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the likedArticles state domain
 */

const selectLikedArticlesDomain = state => state.likedArticles || initialState;

const makeSelectUserLikedList = () =>
  createSelector(
    selectLikedArticlesDomain,
    globalState => globalState.userLikedList,
  );

// const makeSelectLikedArticles = () =>
//   createSelector(
//     selectLikedArticlesDomain,
//     substate => substate,
//   );

// export default makeSelectLikedArticles;
export { makeSelectUserLikedList };

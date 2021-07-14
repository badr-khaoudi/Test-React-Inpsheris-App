import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the commentArea state domain
 */

const selectCommentAreaDomain = state => state.commentArea || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CommentArea
 */

const makeSelectCommentSuccess = () =>
  createSelector(
    selectCommentAreaDomain,
    globalState => globalState.commentSuccess,
  );

// const makeSelectCommentArea = () =>
//   createSelector(
//     selectCommentAreaDomain,
//     substate => substate,
//   );

// export default makeSelectCommentArea;
export { makeSelectCommentSuccess };

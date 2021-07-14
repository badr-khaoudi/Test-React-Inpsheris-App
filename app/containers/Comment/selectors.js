/* eslint-disable no-unused-vars */
import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the comment state domain
 */

const selectCommentDomain = state => state.comment || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Comment
 */

// const makeSelectComment = () =>
//   createSelector(
//     selectCommentDomain,
//     substate => substate,
//   );

// export default makeSelectComment;
export {};

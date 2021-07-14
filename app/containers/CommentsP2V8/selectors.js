import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the commentsP2V8 state domain
 */

const selectCommentsP2V8Domain = state => state.commentsP2V8 || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CommentsP2V8
 */

const makeSelectCommentsPage = uid =>
  createSelector(
    selectCommentsP2V8Domain,
    globalState => globalState.commentsPage[uid],
  );

const makeSelectOpenEditComment = () =>
  createSelector(
    selectCommentsP2V8Domain,
    globalState => globalState.openEditComment,
  );

const makeSelectCommentUid = () =>
  createSelector(
    selectCommentsP2V8Domain,
    globalState => globalState.commentUid,
  );

// const makeSelectCommentsP2V8 = () =>
//   createSelector(
//     selectCommentsP2V8Domain,
//     substate => substate,
//   );

// export default makeSelectCommentsP2V8;
export {
  makeSelectCommentsPage,
  makeSelectOpenEditComment,
  makeSelectCommentUid,
};

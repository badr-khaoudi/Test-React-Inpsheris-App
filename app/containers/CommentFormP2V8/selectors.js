import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the commentFormP2V8 state domain
 */

const selectCommentFormP2V8Domain = state =>
  state.commentFormP2V8 || initialState;

const makeSelectCommentSuccess = () =>
  createSelector(
    selectCommentFormP2V8Domain,
    globalState => globalState.commentSuccess,
  );

// const makeSelectCommentFormP2V8 = () =>
//   createSelector(
//     selectCommentFormP2V8Domain,
//     substate => substate,
//   );

// export default makeSelectCommentFormP2V8;
export { makeSelectCommentSuccess };

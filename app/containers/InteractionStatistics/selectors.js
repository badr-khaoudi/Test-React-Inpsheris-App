import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the interactionStatistics state domain
 */

const selectInteractionStatisticsDomain = state =>
  state.interactionStatistics || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by InteractionStatistics
 */

const makeSelectListCommentLike = () =>
  createSelector(
    selectInteractionStatisticsDomain,
    substate => substate.listCommentLike,
  );

const makeSelectListCommentLikeLoading = () =>
  createSelector(
    selectInteractionStatisticsDomain,
    substate => substate.listCommentLikeLoading,
  );

// const makeSelectInteractionStatistics = () =>
//   createSelector(
//     selectInteractionStatisticsDomain,
//     substate => substate,
//   );

// export default makeSelectInteractionStatistics;
export { makeSelectListCommentLike, makeSelectListCommentLikeLoading };

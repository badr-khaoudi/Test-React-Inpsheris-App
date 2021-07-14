import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the myDraft state domain
 */

const selectMyDraftDomain = state => state.myDraft || initialState;

const makeSelectDrafts = () =>
  createSelector(
    selectMyDraftDomain,
    globalState => globalState.drafts,
  );

const makeSelectDraftsLoading = () =>
  createSelector(
    selectMyDraftDomain,
    globalState => globalState.draftsLoading,
  );

// const makeSelectMyDraft = () =>
//   createSelector(
//     selectMyDraftDomain,
//     substate => substate,
//   );

// export default makeSelectMyDraft;
export { makeSelectDrafts, makeSelectDraftsLoading };

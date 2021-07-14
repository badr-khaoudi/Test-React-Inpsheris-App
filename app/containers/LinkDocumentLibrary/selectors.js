import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the linkDocumentLibrary state domain
 */

const selectLinkDocumentLibraryDomain = state =>
  state.linkDocumentLibrary || initialState;

const makeSelectContents = () =>
  createSelector(
    selectLinkDocumentLibraryDomain,
    substate => substate.contents,
  );

const makeSelectContentsLoading = () =>
  createSelector(
    selectLinkDocumentLibraryDomain,
    substate => substate.contentsLoading,
  );

// const makeSelectLinkDocumentLibrary = () =>
//   createSelector(
//     selectLinkDocumentLibraryDomain,
//     substate => substate,
//   );

// export default makeSelectLinkDocumentLibrary;
export { makeSelectContents, makeSelectContentsLoading };

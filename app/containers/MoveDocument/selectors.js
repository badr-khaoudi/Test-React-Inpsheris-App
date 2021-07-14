import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the moveDocument state domain
 */

const selectMoveDocumentDomain = state => state.moveDocument || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MoveDocument
 */

// const makeSelectMoveDocument = () =>
//   createSelector(
//     selectMoveDocumentDomain,
//     substate => substate,
//   );

const makeSelectDocumentTreeList = () =>
  createSelector(
    selectMoveDocumentDomain,
    globalState => globalState.documentTreeList,
  );

// export default makeSelectMoveDocument;
export { makeSelectDocumentTreeList };

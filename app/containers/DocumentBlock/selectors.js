import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the documentBlock state domain
 */

const selectDocumentBlockDomain = state => state.documentBlock || initialState;

/**
 * Other specific selectors
 */

const makeSelectUploadFile = id =>
  createSelector(
    selectDocumentBlockDomain,
    globalState => globalState.uploadFile[id],
  );

/**
 * Default selector used by DocumentBlock
 */

// const makeSelectDocumentBlock = () =>
//   createSelector(
//     selectDocumentBlockDomain,
//     substate => substate,
//   );

// export default makeSelectDocumentBlock;
export { makeSelectUploadFile };

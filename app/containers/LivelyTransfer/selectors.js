import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the livelyTransfer state domain
 */

const selectLivelyTransferDomain = state =>
  state.livelyTransfer || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by LivelyTransfer
 */

const makeSelectTransferDocumentSuccess = () =>
  createSelector(
    selectLivelyTransferDomain,
    substate => substate.transferDocumentSuccess,
  );

const makeSelectTransferDocumentLoading = () =>
  createSelector(
    selectLivelyTransferDomain,
    substate => substate.transferDocumentLoading,
  );

// const makeSelectLivelyTransfer = () =>
//   createSelector(
//     selectLivelyTransferDomain,
//     substate => substate,
//   );

// export default makeSelectLivelyTransfer;
export { makeSelectTransferDocumentSuccess, makeSelectTransferDocumentLoading };

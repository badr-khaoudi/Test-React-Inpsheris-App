import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the createPinnedCommunity state domain
 */

const selectCreatePinnedCommunityDomain = state =>
  state.createPinnedCommunity || initialState;

/**
 * Other specific selectors
 */

const makeSelectIsPinnedDetailLoading = () =>
  createSelector(
    selectCreatePinnedCommunityDomain,
    substate => substate.isPinnedDetailLoading,
  );

const makeSelectPinnedCommunity = () =>
  createSelector(
    selectCreatePinnedCommunityDomain,
    substate => substate.pinnedCommunity,
  );

const makeSelectIsUpdateInprogress = () =>
  createSelector(
    selectCreatePinnedCommunityDomain,
    substate => substate.updateStatus.inProgress,
  );
const makeSelectIsUpdateSuccess = () =>
  createSelector(
    selectCreatePinnedCommunityDomain,
    substate => substate.updateStatus.isSucess,
  );

const makeSelectIsUpdateError = () =>
  createSelector(
    selectCreatePinnedCommunityDomain,
    substate => substate.updateStatus.error,
  );

export {
  makeSelectIsPinnedDetailLoading,
  makeSelectPinnedCommunity,
  makeSelectIsUpdateInprogress,
  makeSelectIsUpdateSuccess,
  makeSelectIsUpdateError,
};

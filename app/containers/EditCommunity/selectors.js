import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the editCommunity state domain
 */

const selectEditCommunityDomain = state => state.editCommunity || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EditCommunity
 */

const makeSelectUploadFile = field =>
  createSelector(
    selectEditCommunityDomain,
    globalState => globalState.uploadFile[field],
  );

const makeSelectChangeImageLoading = () =>
  createSelector(
    selectEditCommunityDomain,
    globalState => globalState.changeImageLoading,
  );

const makeSelectChangeImageSuccess = () =>
  createSelector(
    selectEditCommunityDomain,
    globalState => globalState.changeImageSuccess,
  );

// const makeSelectEditCommunity = () =>
//   createSelector(
//     selectEditCommunityDomain,
//     substate => substate,
//   );

// export default makeSelectEditCommunity;
export {
  makeSelectUploadFile,
  makeSelectChangeImageLoading,
  makeSelectChangeImageSuccess,
};

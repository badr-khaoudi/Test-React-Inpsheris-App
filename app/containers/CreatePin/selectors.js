import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the createPin state domain
 */

const selectCreatePinDomain = state => state.createPin || initialState;

const makeSelectPinnedPostType = () =>
  createSelector(
    selectCreatePinDomain,
    globalState => globalState.pinnedPostType,
  );

const makeSelectUploadFile = () =>
  createSelector(
    selectCreatePinDomain,
    globalState => globalState.uploadFile,
  );

const makeSelectCreatePinnedPostSuccess = () =>
  createSelector(
    selectCreatePinDomain,
    globalState => globalState.createPinnedPostSuccess,
  );

const makeSelectEmbedUrl = () =>
  createSelector(
    selectCreatePinDomain,
    globalState => globalState.embedUrl,
  );

const makeSelectOEmbed = () =>
  createSelector(
    selectCreatePinDomain,
    globalState => globalState.oEmbed,
  );

const makeSelectOEmbedError = () =>
  createSelector(
    selectCreatePinDomain,
    globalState => globalState.oEmbedError,
  );

// const makeSelectCreatePin = () =>
//   createSelector(
//     selectCreatePinDomain,
//     substate => substate,
//   );

// export default makeSelectCreatePin;
export {
  makeSelectPinnedPostType,
  makeSelectUploadFile,
  makeSelectCreatePinnedPostSuccess,
  makeSelectEmbedUrl,
  makeSelectOEmbed,
  makeSelectOEmbedError,
};

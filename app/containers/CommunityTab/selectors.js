import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the communityTab state domain
 */

const selectCommunityTabDomain = state => state.communityTab || initialState;

const makeSelectCommunityTab = () =>
  createSelector(
    selectCommunityTabDomain,
    globalState => globalState.communityTab,
  );

const makeSelectDocumentTree = () =>
  createSelector(
    selectCommunityTabDomain,
    globalState => globalState.documentTree,
  );

const makeSelectFiles = () =>
  createSelector(
    selectCommunityTabDomain,
    globalState => globalState.files,
  );

const makeSelectGdrive = () =>
  createSelector(
    selectCommunityTabDomain,
    globalState => globalState.gdrive,
  );

const makeSelectPinOnCommunity = () =>
  createSelector(
    selectCommunityTabDomain,
    globalState => globalState.pinOnCommunity,
  );

const makeSelectFileType = () =>
  createSelector(
    selectCommunityTabDomain,
    globalState => globalState.fileType,
  );

const makeSelectNewFolder = () =>
  createSelector(
    selectCommunityTabDomain,
    globalState => globalState.newFolder,
  );

const makeSelectRenameFolderSuccess = () =>
  createSelector(
    selectCommunityTabDomain,
    globalState => globalState.renameFolderSuccess,
  );

const makeSelectRenameFolderError = () =>
  createSelector(
    selectCommunityTabDomain,
    globalState => globalState.renameFolderError,
  );

const makeSelectUploadFile = () =>
  createSelector(
    selectCommunityTabDomain,
    globalState => globalState.uploadFile,
  );

const makeSelectCommunityTabLoading = () =>
  createSelector(
    selectCommunityTabDomain,
    globalState => globalState.communityTabLoading,
  );

const makeSelectWidgetList = () =>
  createSelector(
    selectCommunityTabDomain,
    globalState => globalState.widgetList,
  );

/**
 * Other specific selectors
 */

/**
 * Default selector used by CommunityTab
 */

// const makeSelectCommunityTab = () =>
//   createSelector(
//     selectCommunityTabDomain,
//     substate => substate,
//   );

// export default makeSelectCommunityTab;
export {
  makeSelectCommunityTab,
  makeSelectDocumentTree,
  makeSelectFiles,
  makeSelectGdrive,
  makeSelectPinOnCommunity,
  makeSelectFileType,
  makeSelectNewFolder,
  makeSelectRenameFolderSuccess,
  makeSelectRenameFolderError,
  makeSelectUploadFile,
  makeSelectCommunityTabLoading,
  makeSelectWidgetList,
};

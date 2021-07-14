import { createSelector } from 'reselect';
import _ from 'lodash';
import selectGlobalEntitiesDomain from 'containers/GlobalEntities/selectors';
import { initialState } from './reducer';

/**
 * Direct selector to the documentBar state domain
 */

const selectDocumentBarDomain = state => state.documentBar || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by DocumentBar
 */

const makeSelectLatestOpens = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.latestOpens,
  );

const makeSelectLatestOpensPage = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.latestOpensPage,
  );

const makeSelectLatestOpensLoading = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.latestOpensLoading,
  );

const makeSelectLatestUpdates = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.latestUpdates,
  );

const makeSelectLatestUpdatesPage = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.latestUpdatesPage,
  );

const makeSelectLatestUpdatesLoading = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.latestUpdatesLoading,
  );

const makeSelectCommunityGroupList = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.communityGroupList,
  );

const makeSelectCommunityGroupListLoading = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.communityGroupListLoading,
  );

const makeSelectCommunityList = () =>
  createSelector(
    [selectGlobalEntitiesDomain, selectDocumentBarDomain],
    (globalEntitiesState, documentBarState) =>
      _.map(
        documentBarState.communityList,
        community => globalEntitiesState.entities.community[community],
      ),
  );

const makeSelectCommunityListLoading = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.communityListLoading,
  );

const makeSelectCommunityTabList = () =>
  createSelector(
    [selectGlobalEntitiesDomain, selectDocumentBarDomain],
    (globalEntitiesState, documentBarState) =>
      _.map(
        documentBarState.communityTabList,
        communityTab => globalEntitiesState.entities.communityTab[communityTab],
      ),
  );

const makeSelectCommunityTabListLoading = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.communityTabListLoading,
  );

const makeSelectCommunityFileList = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.communityFileList,
  );

const makeSelectCommunityFileListLoading = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.communityFileListLoading,
  );

const makeSelectSearchCommunityFile = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.searchCommunityFile,
  );

const makeSelectSearchCommunityPage = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.searchCommunityPage,
  );

const makeSelectSearchCommunityFileLoading = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.searchCommunityFileLoading,
  );

const makeSelectCommunityOptions = () =>
  createSelector(
    [selectGlobalEntitiesDomain, selectDocumentBarDomain],
    (globalEntitiesState, documentBarState) =>
      _.map(
        documentBarState.communityOptions,
        community => globalEntitiesState.entities.community[community],
      ),
  );

const makeSelectCommunityOptionsLoading = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.communityOptionsLoading,
  );

const makeSelectFileType = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.fileType,
  );

const makeSelectAuthorList = () =>
  createSelector(
    [selectGlobalEntitiesDomain, selectDocumentBarDomain],
    (globalEntitiesState, documentBarState) =>
      _.map(
        documentBarState.authorList,
        author => globalEntitiesState.entities.user[author],
      ),
  );

const makeSelectAuthorListLoading = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.authorListLoading,
  );

const makeSelectConfig = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.config,
  );

const makeSelectExternalSource = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.externalSource,
  );

const makeSelectListChildrenRoot = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.listChildrenRoot,
  );

const makeSelectListChildrenDriveItem = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.listChildrenDriveItem,
  );

const makeSelectListItemsDrive = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.listItemsDrive,
  );

const makeSelectSharePointSites = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.sharePointSites,
  );

const makeSelectDocumentLibraries = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.documentLibraries,
  );

const makeSelectContents = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.contents,
  );

const makeSelectContentsLoading = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.contentsLoading,
  );

const makeSelectDriveRecent = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.driveRecent,
  );

const makeSelectDriveRecentLoading = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.driveRecentLoading,
  );

const makeSelectSearchEntity = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.searchEntity,
  );

const makeSelectSearchEntityLoading = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.searchEntityLoading,
  );

const makeSelectSearchEntityFrom = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.searchEntityFrom,
  );

const makeSelectSearchCommunityAndEntity = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.searchCommunityAndEntity,
  );

const makeSelectSearchCommunityAndEntityPage = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.searchCommunityAndEntityPage,
  );

const makeSelectSearchCommunityAndEntityLoading = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.searchCommunityAndEntityLoading,
  );

const makeSelectThumbnail = id =>
  createSelector(
    selectDocumentBarDomain,
    substate => _.find(substate.batch, { id }),
  );

const makeSelectLivelyAndDriveRecent = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.livelyAndDriveRecent,
  );

const makeSelectLivelyAndDriveRecentPage = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.livelyAndDriveRecentPage,
  );

const makeSelectLivelyAndDriveRecentLoading = () =>
  createSelector(
    selectDocumentBarDomain,
    substate => substate.livelyAndDriveRecentLoading,
  );

// const makeSelectDocumentBar = () =>
//   createSelector(
//     selectDocumentBarDomain,
//     substate => substate,
//   );

// export default makeSelectDocumentBar;
export {
  makeSelectLatestOpens,
  makeSelectLatestOpensPage,
  makeSelectLatestOpensLoading,
  makeSelectLatestUpdates,
  makeSelectLatestUpdatesPage,
  makeSelectLatestUpdatesLoading,
  makeSelectCommunityGroupList,
  makeSelectCommunityGroupListLoading,
  makeSelectCommunityList,
  makeSelectCommunityListLoading,
  makeSelectCommunityTabList,
  makeSelectCommunityTabListLoading,
  makeSelectCommunityFileList,
  makeSelectCommunityFileListLoading,
  makeSelectSearchCommunityFile,
  makeSelectSearchCommunityPage,
  makeSelectSearchCommunityFileLoading,
  makeSelectCommunityOptions,
  makeSelectCommunityOptionsLoading,
  makeSelectFileType,
  makeSelectAuthorList,
  makeSelectAuthorListLoading,
  makeSelectConfig,
  makeSelectExternalSource,
  makeSelectListChildrenRoot,
  makeSelectListChildrenDriveItem,
  makeSelectListItemsDrive,
  makeSelectSharePointSites,
  makeSelectDocumentLibraries,
  makeSelectContents,
  makeSelectContentsLoading,
  makeSelectDriveRecent,
  makeSelectDriveRecentLoading,
  makeSelectSearchEntity,
  makeSelectSearchEntityLoading,
  makeSelectSearchEntityFrom,
  makeSelectSearchCommunityAndEntity,
  makeSelectSearchCommunityAndEntityPage,
  makeSelectSearchCommunityAndEntityLoading,
  makeSelectThumbnail,
  makeSelectLivelyAndDriveRecent,
  makeSelectLivelyAndDriveRecentPage,
  makeSelectLivelyAndDriveRecentLoading,
};

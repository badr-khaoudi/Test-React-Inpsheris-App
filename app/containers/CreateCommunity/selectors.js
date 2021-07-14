import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { communitySchema } from 'utils/normalizrSchema/feed';
import selectGlobalEntitiesDomain from 'containers/GlobalEntities/selectors';
import { initialState } from './reducer';

/**
 * Direct selector to the createCommunity state domain
 */

const selectCreateCommunityDomain = state =>
  state.createCommunity || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CreateCommunity
 */

const makeSelectCommunityGroupList = () =>
  createSelector(
    selectCreateCommunityDomain,
    globalState => globalState.communityGroupList,
  );

const makeSelectTabTypeList = () =>
  createSelector(
    selectCreateCommunityDomain,
    globalState => globalState.tabTypeList,
  );

const makeSelectCreateCommunityLoading = () =>
  createSelector(
    selectCreateCommunityDomain,
    globalState => globalState.createCommunityLoading,
  );

const makeSelectCreateCommunitySuccess = () =>
  createSelector(
    selectCreateCommunityDomain,
    globalState => globalState.createCommunitySuccess,
  );

const makeSelectUploadFile = field =>
  createSelector(
    selectCreateCommunityDomain,
    globalState => globalState.uploadFile[field],
  );

const makeSelectCommunity = () =>
  createSelector(
    [selectGlobalEntitiesDomain, selectCreateCommunityDomain],
    (globalEntitiesState, createCommunityState) =>
      denormalize(
        { community: createCommunityState.community },
        { community: communitySchema },
        globalEntitiesState.entities,
      ).community || {},
  );

const makeSelectCommunityLoading = () =>
  createSelector(
    selectCreateCommunityDomain,
    globalState => globalState.communityLoading,
  );

const makeSelectHasContent = tabUid =>
  createSelector(
    selectCreateCommunityDomain,
    globalState => globalState.hasContent[tabUid],
  );

const makeSelectJoinedTeams = () =>
  createSelector(
    selectCreateCommunityDomain,
    globalState => globalState.joinedTeams,
  );

const makeSelectJoinedTeamsLoading = () =>
  createSelector(
    selectCreateCommunityDomain,
    globalState => globalState.joinedTeamsLoading,
  );

const makeSelectListChannels = () =>
  createSelector(
    selectCreateCommunityDomain,
    globalState => globalState.listChannels,
  );

const makeSelectListChannelsLoading = () =>
  createSelector(
    selectCreateCommunityDomain,
    globalState => globalState.listChannelsLoading,
  );

const makeSelectFilesFolder = () =>
  createSelector(
    selectCreateCommunityDomain,
    globalState => globalState.filesFolder,
  );

const makeSelectSharePointSites = () =>
  createSelector(
    selectCreateCommunityDomain,
    substate => substate.sharePointSites,
  );

const makeSelectDocumentLibraries = () =>
  createSelector(
    selectCreateCommunityDomain,
    substate => substate.documentLibraries,
  );

const makeSelectListItemsDrive = () =>
  createSelector(
    selectCreateCommunityDomain,
    substate => substate.listItemsDrive,
  );

const makeSelectListChildrenDriveItem = () =>
  createSelector(
    selectCreateCommunityDomain,
    substate => substate.listChildrenDriveItem,
  );

const makeSelectDeleteTab = () =>
  createSelector(
    selectCreateCommunityDomain,
    substate => substate.deleteTab,
  );

// const makeSelectCreateCommunity = () =>
//   createSelector(
//     selectCreateCommunityDomain,
//     substate => substate,
//   );

// export default makeSelectCreateCommunity;
export {
  makeSelectCommunityGroupList,
  makeSelectTabTypeList,
  makeSelectCreateCommunityLoading,
  makeSelectCreateCommunitySuccess,
  makeSelectUploadFile,
  makeSelectCommunity,
  makeSelectCommunityLoading,
  makeSelectHasContent,
  makeSelectJoinedTeams,
  makeSelectJoinedTeamsLoading,
  makeSelectListChannels,
  makeSelectListChannelsLoading,
  makeSelectFilesFolder,
  makeSelectSharePointSites,
  makeSelectDocumentLibraries,
  makeSelectListItemsDrive,
  makeSelectListChildrenDriveItem,
  makeSelectDeleteTab,
};

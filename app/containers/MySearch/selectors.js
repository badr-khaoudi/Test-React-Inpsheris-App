import { createSelector } from 'reselect';
import _ from 'lodash';
import selectGlobalEntitiesDomain from 'containers/GlobalEntities/selectors';
import { initialState } from './reducer';

/**
 * Direct selector to the mySearch state domain
 */

const selectMySearchDomain = state => state.mySearch || initialState;

/**
 * Other specific selectors
 */

const makeSelectSuggestion = () =>
  createSelector(
    selectMySearchDomain,
    globalState => globalState.suggestion,
  );

const makeSelectSuggestionLoading = () =>
  createSelector(
    selectMySearchDomain,
    globalState => globalState.suggestionLoading,
  );

const makeSelectExternalSites = () =>
  createSelector(
    selectMySearchDomain,
    globalState => globalState.externalSites,
  );

const makeSelectSearch = () =>
  createSelector(
    selectMySearchDomain,
    globalState => globalState.search,
  );

const makeSelectFileType = () =>
  createSelector(
    selectMySearchDomain,
    globalState => globalState.fileType,
  );

const makeSelectCommunityList = () =>
  createSelector(
    [selectGlobalEntitiesDomain, selectMySearchDomain],
    (globalEntitiesState, mySearchState) =>
      _.map(
        mySearchState.communityList,
        community => globalEntitiesState.entities.community[community],
      ),
  );

const makeSelectAuthorList = () =>
  createSelector(
    [selectGlobalEntitiesDomain, selectMySearchDomain],
    (globalEntitiesState, mySearchState) =>
      _.map(
        mySearchState.authorList,
        author => globalEntitiesState.entities.user[author],
      ),
  );

const makeSelectCommunityFiles = () =>
  createSelector(
    selectMySearchDomain,
    globalState => globalState.communityFiles,
  );

const makeSelectSearchLoading = () =>
  createSelector(
    selectMySearchDomain,
    globalState => globalState.searchLoading,
  );

const makeSelectCommunityFilesLoading = () =>
  createSelector(
    selectMySearchDomain,
    globalState => globalState.communityFilesLoading,
  );

/**
 * Default selector used by MySearch
 */

// const makeSelectMySearch = () =>
//   createSelector(
//     selectMySearchDomain,
//     substate => substate,
//   );

// export default makeSelectMySearch;
export {
  makeSelectSuggestion,
  makeSelectSuggestionLoading,
  makeSelectExternalSites,
  makeSelectSearch,
  makeSelectFileType,
  makeSelectCommunityList,
  makeSelectAuthorList,
  makeSelectCommunityFiles,
  makeSelectSearchLoading,
  makeSelectCommunityFilesLoading,
};

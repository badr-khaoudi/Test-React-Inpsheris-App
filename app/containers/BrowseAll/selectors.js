import { createSelector } from 'reselect';
import _ from 'lodash';
import selectGlobalEntitiesDomain from 'containers/GlobalEntities/selectors';
import { initialState } from './reducer';

/**
 * Direct selector to the browseAll state domain
 */

const selectBrowseAllDomain = state => state.browseAll || initialState;

/**
 * Other specific selectors
 */

const makeSelectFileType = () =>
  createSelector(
    selectBrowseAllDomain,
    globalState => globalState.fileType,
  );

const makeSelectCommunityList = () =>
  createSelector(
    [selectGlobalEntitiesDomain, selectBrowseAllDomain],
    (globalEntitiesState, browseAllState) =>
      _.map(
        browseAllState.communityList,
        community => globalEntitiesState.entities.community[community],
      ),
  );

const makeSelectAuthorList = () =>
  createSelector(
    [selectGlobalEntitiesDomain, selectBrowseAllDomain],
    (globalEntitiesState, browseAllState) =>
      _.map(
        browseAllState.authorList,
        author => globalEntitiesState.entities.user[author],
      ),
  );

const makeSelectFileList = () =>
  createSelector(
    selectBrowseAllDomain,
    globalState => globalState.fileList,
  );

const makeSelectFileListLoading = () =>
  createSelector(
    selectBrowseAllDomain,
    globalState => globalState.fileListLoading,
  );

/**
 * Default selector used by BrowseAll
 */

// const makeSelectBrowseAll = () =>
//   createSelector(
//     selectBrowseAllDomain,
//     substate => substate,
//   );

// export default makeSelectBrowseAll;
export {
  makeSelectFileType,
  makeSelectCommunityList,
  makeSelectAuthorList,
  makeSelectFileList,
  makeSelectFileListLoading,
};

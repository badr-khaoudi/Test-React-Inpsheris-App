import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the directory state domain
 */

const selectDirectoryDomain = state => state.directory || initialState;

/**
 * Other specific selectors
 */

const makeSelectMembers = () =>
  createSelector(
    selectDirectoryDomain,
    globalState => globalState.members,
  );

const makeSelectDirectory = () =>
  createSelector(
    selectDirectoryDomain,
    globalState => globalState.directory,
  );

const makeSelectDirectoryLoading = () =>
  createSelector(
    selectDirectoryDomain,
    globalState => globalState.directoryLoading,
  );

const makeSelectSuggestion = () =>
  createSelector(
    selectDirectoryDomain,
    globalState => globalState.suggestion,
  );

const makeSelectSiteFilterOptionsLoading = () =>
  createSelector(
    selectDirectoryDomain,
    globalState => globalState.siteFilterOptionsLoading,
  );

const makeSelectServiceFilterOptionsLoading = () =>
  createSelector(
    selectDirectoryDomain,
    globalState => globalState.serviceFilterOptionsLoading,
  );

const makeSelectHobbyFilterOptionsLoading = () =>
  createSelector(
    selectDirectoryDomain,
    globalState => globalState.hobbyFilterOptionsLoading,
  );

const makeSelectSkillFilterOptionsLoading = () =>
  createSelector(
    selectDirectoryDomain,
    globalState => globalState.skillFilterOptionsLoading,
  );

const makeSelectVariableFilterOptionsLoading = () =>
  createSelector(
    selectDirectoryDomain,
    globalState => globalState.variableFilterOptionsLoading,
  );

const makeSelectSiteFilterOptions = () =>
  createSelector(
    selectDirectoryDomain,
    globalState => globalState.siteFilterOptions,
  );

const makeSelectServiceFilterOptions = () =>
  createSelector(
    selectDirectoryDomain,
    globalState => globalState.serviceFilterOptions,
  );

const makeSelectHobbyFilterOptions = () =>
  createSelector(
    selectDirectoryDomain,
    globalState => globalState.hobbyFilterOptions,
  );

const makeSelectSkillFilterOptions = () =>
  createSelector(
    selectDirectoryDomain,
    globalState => globalState.skillFilterOptions,
  );

const makeSelectVariableFilterOptions = () =>
  createSelector(
    selectDirectoryDomain,
    globalState => globalState.variableFilterOptions,
  );

const makeSelectBadgeFilterOptions = () =>
  createSelector(
    selectDirectoryDomain,
    globalState => globalState.badgeFilterOptions,
  );

/**
 * Default selector used by Directory
 */

// const makeSelectDirectory = () =>
//   createSelector(
//     selectDirectoryDomain,
//     substate => substate,
//   );

// export default makeSelectDirectory;
export {
  makeSelectMembers,
  makeSelectDirectory,
  makeSelectDirectoryLoading,
  makeSelectSuggestion,
  makeSelectSiteFilterOptionsLoading,
  makeSelectServiceFilterOptionsLoading,
  makeSelectHobbyFilterOptionsLoading,
  makeSelectSkillFilterOptionsLoading,
  makeSelectVariableFilterOptionsLoading,
  makeSelectSiteFilterOptions,
  makeSelectServiceFilterOptions,
  makeSelectHobbyFilterOptions,
  makeSelectSkillFilterOptions,
  makeSelectVariableFilterOptions,
  makeSelectBadgeFilterOptions,
};

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the tab state domain
 */

const selectTabDomain = state => state.tab || initialState;

/**
 * Other specific selectors
 */

const makeSelectCommunityList = () =>
  createSelector(
    selectTabDomain,
    globalState => globalState.communityList,
  );

const makeSelectCommunityTab = () =>
  createSelector(
    selectTabDomain,
    globalState => globalState.communityTab,
  );

const makeSelectCommunityTabLoading = () =>
  createSelector(
    selectTabDomain,
    globalState => globalState.communityTabLoading,
  );

/**
 * Default selector used by Tab
 */

// const makeSelectTab = () =>
//   createSelector(
//     selectTabDomain,
//     substate => substate,
//   );

// export default makeSelectTab;
export {
  makeSelectCommunityList,
  makeSelectCommunityTab,
  makeSelectCommunityTabLoading,
};

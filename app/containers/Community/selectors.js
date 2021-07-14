import { createSelector } from 'reselect';
import _ from 'lodash';
import selectGlobalEntitiesDomain from 'containers/GlobalEntities/selectors';
import { initialState } from './reducer';

/**
 * Direct selector to the community state domain
 */

const selectCommunityDomain = state => state.community || initialState;

/**
 * Other specific selectors
 */

const makeSelectCommunityList = () =>
  createSelector(
    [selectGlobalEntitiesDomain, selectCommunityDomain],
    (globalEntitiesState, communityState) =>
      _.map(
        communityState.communityList,
        community => globalEntitiesState.entities.community[community],
      ),
  );

const makeSelectCommunityGroupList = () =>
  createSelector(
    selectCommunityDomain,
    globalState => globalState.communityGroupList,
  );

const makeSelectCommunityListLoading = () =>
  createSelector(
    selectCommunityDomain,
    globalState => globalState.communityListLoading,
  );

const makeSelectCommunityGroupListLoading = () =>
  createSelector(
    selectCommunityDomain,
    globalState => globalState.communityGroupListLoading,
  );

const makeSelectCommunityListError = () =>
  createSelector(
    selectCommunityDomain,
    globalState => globalState.communityListError,
  );

const makeSelectCommunityGroupListError = () =>
  createSelector(
    selectCommunityDomain,
    globalState => globalState.communityGroupListError,
  );

const makeSelectRequestedCommunitySuccess = () =>
  createSelector(
    selectCommunityDomain,
    globalState => globalState.requestedCommunitySuccess,
  );

/**
 * Default selector used by Community
 */

// const makeSelectCommunity = () =>
//   createSelector(
//     selectCommunityDomain,
//     substate => substate,
//   );

// export default makeSelectCommunity;
export {
  selectCommunityDomain,
  makeSelectCommunityList,
  makeSelectCommunityGroupList,
  makeSelectCommunityListLoading,
  makeSelectCommunityGroupListLoading,
  makeSelectCommunityListError,
  makeSelectCommunityGroupListError,
  makeSelectRequestedCommunitySuccess,
};

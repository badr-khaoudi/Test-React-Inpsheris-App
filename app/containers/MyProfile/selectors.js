import { createSelector } from 'reselect';
import _ from 'lodash';
import selectGlobalEntitiesDomain from 'containers/GlobalEntities/selectors';
import { initialState } from './reducer';

/**
 * Direct selector to the myProfile state domain
 */

const selectMyProfileDomain = state => state.myProfile || initialState;

const makeSelectUserUid = () =>
  createSelector(
    selectMyProfileDomain,
    globalState => globalState.user,
  );

const makeSelectAuthorList = () =>
  createSelector(
    [selectGlobalEntitiesDomain, selectMyProfileDomain],
    (globalEntitiesState, myProfileState) =>
      _.map(
        _.compact(myProfileState.authorList),
        author => globalEntitiesState.entities.user[author],
      ),
  );

const makeSelectCommunityList = () =>
  createSelector(
    [selectGlobalEntitiesDomain, selectMyProfileDomain],
    (globalEntitiesState, myProfileState) =>
      _.map(
        myProfileState.communityList,
        community => globalEntitiesState.entities.community[community],
      ),
  );

// const makeSelectMyProfile = () =>
//   createSelector(
//     selectMyProfileDomain,
//     substate => substate,
//   );

// export default makeSelectMyProfile;
export { makeSelectUserUid, makeSelectAuthorList, makeSelectCommunityList };

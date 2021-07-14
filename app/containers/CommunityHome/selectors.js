import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import _ from 'lodash';
import { communitySchema } from 'utils/normalizrSchema/feed';
import selectGlobalEntitiesDomain from 'containers/GlobalEntities/selectors';
import { initialState } from './reducer';

/**
 * Direct selector to the communityHome state domain
 */

const selectCommunityHomeDomain = state => state.communityHome || initialState;

const makeSelectCommunity = () =>
  createSelector(
    [selectGlobalEntitiesDomain, selectCommunityHomeDomain],
    (globalEntitiesState, communityHomeState) =>
      denormalize(
        { community: communityHomeState.community },
        { community: communitySchema },
        globalEntitiesState.entities,
      ).community || {},
  );

const makeSelectAuthorList = () =>
  createSelector(
    [selectGlobalEntitiesDomain, selectCommunityHomeDomain],
    (globalEntitiesState, communityHomeState) =>
      _.map(
        communityHomeState.authorList,
        author => globalEntitiesState.entities.user[author],
      ),
  );

const makeSelectCarouselList = level =>
  createSelector(
    selectCommunityHomeDomain,
    globalState => globalState.carouselList[level],
  );

/**
 * Other specific selectors
 */

/**
 * Default selector used by CommunityHome
 */

// const makeSelectCommunityHome = () =>
//   createSelector(
//     selectCommunityHomeDomain,
//     substate => substate,
//   );

// export default makeSelectCommunityHome;
export { makeSelectCommunity, makeSelectAuthorList, makeSelectCarouselList };

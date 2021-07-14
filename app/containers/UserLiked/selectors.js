import { createSelector } from 'reselect';
import _ from 'lodash';
import selectGlobalEntitiesDomain from 'containers/GlobalEntities/selectors';
import { initialState } from './reducer';

/**
 * Direct selector to the userLiked state domain
 */

const selectUserLikedDomain = state => state.userLiked || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UserLiked
 */

const makeSelectUserLiked = () =>
  createSelector(
    [selectGlobalEntitiesDomain, selectUserLikedDomain],
    (globalEntitiesState, userLikedState) =>
      _.map(
        userLikedState.userLiked,
        user => globalEntitiesState.entities.user[user],
      ),
  );

// const makeSelectUserLiked = () =>
//   createSelector(
//     selectUserLikedDomain,
//     substate => substate,
//   );

// export default makeSelectUserLiked;
export { makeSelectUserLiked };

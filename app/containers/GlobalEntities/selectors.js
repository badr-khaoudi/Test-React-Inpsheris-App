import { createSelector } from 'reselect';
import _ from 'lodash';
import { initialState } from './reducer';

/**
 * Direct selector to the globalEntities state domain
 */

const selectGlobalEntitiesDomain = state =>
  state.globalEntities || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GlobalEntities
 */

// const makeSelectGlobalEntities = () =>
//   createSelector(
//     selectGlobalEntitiesDomain,
//     substate => substate,
//   );

const makeSelectWidget = uid =>
  createSelector(
    selectGlobalEntitiesDomain,
    globalState => globalState.entities.widgets[uid],
  );

const makeSelectFeed = uid =>
  createSelector(
    selectGlobalEntitiesDomain,
    globalState => globalState.entities.feed[uid],
  );

const makeSelectUser = uid =>
  createSelector(
    selectGlobalEntitiesDomain,
    globalState => globalState.entities.user[uid] || {},
  );

const makeSelectComments = uid =>
  createSelector(
    selectGlobalEntitiesDomain,
    globalState => globalState.entities.comments[uid],
  );

const makeSelectCommunity = uid =>
  createSelector(
    selectGlobalEntitiesDomain,
    globalState => globalState.entities.community[uid],
  );

const makeSelectCommunities = communities =>
  createSelector(
    selectGlobalEntitiesDomain,
    globalState =>
      _.map(
        communities,
        community => globalState.entities.community[community],
      ),
  );

const makeSelectCommunityTab = uid =>
  createSelector(
    selectGlobalEntitiesDomain,
    globalState => globalState.entities.communityTab[uid],
  );

const makeSelectTemplate = uid =>
  createSelector(
    selectGlobalEntitiesDomain,
    globalState => globalState.entities.template[uid],
  );

export default selectGlobalEntitiesDomain;
export {
  makeSelectWidget,
  makeSelectFeed,
  makeSelectUser,
  makeSelectComments,
  makeSelectCommunity,
  makeSelectCommunityTab,
  makeSelectCommunities,
  makeSelectTemplate,
};

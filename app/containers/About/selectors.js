import { createSelector } from 'reselect';
import _ from 'lodash';
import selectGlobalEntitiesDomain from 'containers/GlobalEntities/selectors';
import { initialState } from './reducer';

/**
 * Direct selector to the about state domain
 */

const selectAboutDomain = state => state.about || initialState;

const makeSelectCommunityListUser = () =>
  createSelector(
    [selectGlobalEntitiesDomain, selectAboutDomain],
    (globalEntitiesState, aboutState) =>
      _.map(
        aboutState.communityListUser,
        community => globalEntitiesState.entities.community[community],
      ),
  );

const makeSelectWidgetList = () =>
  createSelector(
    [selectGlobalEntitiesDomain, selectAboutDomain],
    (globalEntitiesState, aboutState) =>
      _.map(
        aboutState.widgetList,
        widget => globalEntitiesState.entities.widgets[widget],
      ),
  );

// const makeSelectAbout = () =>
//   createSelector(
//     selectAboutDomain,
//     substate => substate,
//   );

// export default makeSelectAbout;
export { makeSelectCommunityListUser, makeSelectWidgetList };

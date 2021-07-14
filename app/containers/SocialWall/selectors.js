import { createSelector } from 'reselect';
import _ from 'lodash';
import selectGlobalEntitiesDomain from 'containers/GlobalEntities/selectors';
import { initialState } from './reducer';

/**
 * Direct selector to the socialWall state domain
 */

const selectSocialWallDomain = state => state.socialWall || initialState;

const makeSelectWidgetList = () =>
  createSelector(
    [selectGlobalEntitiesDomain, selectSocialWallDomain],
    (globalEntitiesState, socialWallState) =>
      _.map(
        socialWallState.widgetList,
        widget => globalEntitiesState.entities.widgets[widget],
      ),
  );

const makeSelectWidgetListLoading = () =>
  createSelector(
    selectSocialWallDomain,
    globalState => globalState.widgetListLoading,
  );

// const makeSelectSocialWall = () =>
//   createSelector(
//     selectSocialWallDomain,
//     substate => substate,
//   );

// export default makeSelectSocialWall;
export { makeSelectWidgetList, makeSelectWidgetListLoading };

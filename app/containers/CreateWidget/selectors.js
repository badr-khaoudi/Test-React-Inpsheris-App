import { createSelector } from 'reselect';
import selectGlobalEntitiesDomain from 'containers/GlobalEntities/selectors';
import { initialState } from './reducer';

/**
 * Direct selector to the createWidget state domain
 */

const selectCreateWidgetDomain = state => state.createWidget || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CreateWidget
 */

const makeSelectDisplayOptions = () =>
  createSelector(
    selectCreateWidgetDomain,
    substate => substate.displayOptions,
  );

const makeSelectWidgetTypes = () =>
  createSelector(
    selectCreateWidgetDomain,
    substate => substate.widgetTypes,
  );

const makeSelectSocialWallTypes = () =>
  createSelector(
    selectCreateWidgetDomain,
    substate => substate.socialWallTypes,
  );

const makeSelectUploadFile = () =>
  createSelector(
    selectCreateWidgetDomain,
    substate => substate.uploadFile,
  );

const makeSelectTypeformList = () =>
  createSelector(
    selectCreateWidgetDomain,
    substate => substate.typeformList,
  );

const makeSelectTypeformListLoading = () =>
  createSelector(
    selectCreateWidgetDomain,
    substate => substate.typeformListLoading,
  );

const makeSelectCreateWidgetSuccess = () =>
  createSelector(
    selectCreateWidgetDomain,
    substate => substate.createWidgetSuccess,
  );

const makeSelectWidget = () =>
  createSelector(
    [selectGlobalEntitiesDomain, selectCreateWidgetDomain],
    (globalEntitiesState, createWidgetState) =>
      globalEntitiesState.entities.widgets[createWidgetState.widget],
  );

// const makeSelectCreateWidget = () =>
//   createSelector(
//     selectCreateWidgetDomain,
//     substate => substate,
//   );

// export default makeSelectCreateWidget;
export {
  makeSelectDisplayOptions,
  makeSelectWidgetTypes,
  makeSelectSocialWallTypes,
  makeSelectUploadFile,
  makeSelectTypeformList,
  makeSelectTypeformListLoading,
  makeSelectCreateWidgetSuccess,
  makeSelectWidget,
};

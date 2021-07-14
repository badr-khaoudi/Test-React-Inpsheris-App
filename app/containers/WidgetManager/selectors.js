import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the widgetManager state domain
 */

const selectWidgetManagerDomain = state => state.widgetManager || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by WidgetManager
 */

const makeSelectWidgets = () =>
  createSelector(
    selectWidgetManagerDomain,
    substate => substate.widget,
  );

const makeSelectWidgetLoading = () =>
  createSelector(
    selectWidgetManagerDomain,
    substate => substate.widgetLoading,
  );

// const makeSelectWidgetManager = () =>
//   createSelector(
//     selectWidgetManagerDomain,
//     substate => substate,
//   );

// export default makeSelectWidgetManager;
export { makeSelectWidgets, makeSelectWidgetLoading };

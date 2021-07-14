import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the widgetVideoViewedByUser state domain
 */

const selectWidgetVideoViewedByUserDomain = state =>
  state.widgetVideoViewedByUser || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by WidgetVideoViewedByUser
 */

const makeSelectViewActivityWidgetVideo = () =>
  createSelector(
    selectWidgetVideoViewedByUserDomain,
    substate => substate.viewActivityWidgetVideo,
  );

const makeSelectViewActivityWidgetVideoLoading = () =>
  createSelector(
    selectWidgetVideoViewedByUserDomain,
    substate => substate.viewActivityWidgetVideoLoading,
  );

// const makeSelectWidgetVideoViewedByUser = () =>
//   createSelector(
//     selectWidgetVideoViewedByUserDomain,
//     substate => substate,
//   );

// export default makeSelectWidgetVideoViewedByUser;
export {
  makeSelectViewActivityWidgetVideo,
  makeSelectViewActivityWidgetVideoLoading,
};

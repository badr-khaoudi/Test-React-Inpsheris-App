import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the flexdeskReport state domain
 */

const selectFlexdeskReportDomain = state =>
  state.flexdeskReport || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FlexdeskReport
 */

const makeSelectFlexdesk = () =>
  createSelector(
    selectFlexdeskReportDomain,
    substate => substate.flexdesk,
  );

const makeSelectFlexdeskLoading = () =>
  createSelector(
    selectFlexdeskReportDomain,
    substate => substate.flexdeskLoading,
  );

// const makeSelectFlexdeskReport = () =>
//   createSelector(
//     selectFlexdeskReportDomain,
//     substate => substate,
//   );

// export default makeSelectFlexdeskReport;
export { makeSelectFlexdesk, makeSelectFlexdeskLoading };

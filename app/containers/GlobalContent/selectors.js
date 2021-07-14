import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the globalContent state domain
 */

const selectGlobalContentDomain = state => state.globalContent || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GlobalContent
 */

const makeSelectCountContentCreatedByDate = () =>
  createSelector(
    selectGlobalContentDomain,
    substate => substate.countContentCreatedByDate,
  );

const makeSelectCountContentCreatedByDateLoading = () =>
  createSelector(
    selectGlobalContentDomain,
    substate => substate.countContentCreatedByDateLoading,
  );

// const makeSelectGlobalContent = () =>
//   createSelector(
//     selectGlobalContentDomain,
//     substate => substate,
//   );

// export default makeSelectGlobalContent;
export {
  makeSelectCountContentCreatedByDate,
  makeSelectCountContentCreatedByDateLoading,
};

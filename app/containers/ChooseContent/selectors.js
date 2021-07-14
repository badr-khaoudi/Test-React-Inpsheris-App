import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the chooseContent state domain
 */

const selectChooseContentDomain = state => state.chooseContent || initialState;

const makeSelectContentFilter = () =>
  createSelector(
    selectChooseContentDomain,
    globalState => globalState.contentFilter,
  );

// const makeSelectChooseContent = () =>
//   createSelector(
//     selectChooseContentDomain,
//     substate => substate,
//   );

// export default makeSelectChooseContent;
export { makeSelectContentFilter };

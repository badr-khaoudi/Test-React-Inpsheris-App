import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the myBoard state domain
 */

const selectMyBoardDomain = state => state.myBoard || initialState;

const makeSelectExperiences = () =>
  createSelector(
    selectMyBoardDomain,
    globalState => globalState.experiences,
  );

const makeSelectProjects = () =>
  createSelector(
    selectMyBoardDomain,
    globalState => globalState.projects,
  );

// const makeSelectMyBoard = () =>
//   createSelector(
//     selectMyBoardDomain,
//     substate => substate,
//   );

// export default makeSelectMyBoard;
export { makeSelectExperiences, makeSelectProjects };

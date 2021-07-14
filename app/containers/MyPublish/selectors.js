import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the myPublish state domain
 */

const selectMyPublishDomain = state => state.myPublish || initialState;

const makeSelectPublications = () =>
  createSelector(
    selectMyPublishDomain,
    globalState => globalState.publications,
  );

const makeSelectPublicationsLoading = () =>
  createSelector(
    selectMyPublishDomain,
    globalState => globalState.publicationsLoading,
  );

// const makeSelectMyPublish = () =>
//   createSelector(
//     selectMyPublishDomain,
//     substate => substate,
//   );

// export default makeSelectMyPublish;
export { makeSelectPublications, makeSelectPublicationsLoading };

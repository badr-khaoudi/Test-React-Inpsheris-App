import { createSelector } from 'reselect';
import _ from 'lodash';
import selectGlobalEntitiesDomain from 'containers/GlobalEntities/selectors';
import { initialState } from './reducer';

/**
 * Direct selector to the searchDirectory state domain
 */

const selectSearchDirectoryDomain = state =>
  state.searchDirectory || initialState;

const makeSelectSearchDirectory = () =>
  createSelector(
    [selectGlobalEntitiesDomain, selectSearchDirectoryDomain],
    (globalEntitiesState, searchDirectoryState) =>
      _.map(
        searchDirectoryState.searchDirectory,
        user => globalEntitiesState.entities.user[user],
      ),
  );

const makeSelectTotalMembers = () =>
  createSelector(
    selectSearchDirectoryDomain,
    globalState => globalState.totalMembers,
  );

// const makeSelectSearchDirectory = () =>
//   createSelector(
//     selectSearchDirectoryDomain,
//     substate => substate,
//   );

// export default makeSelectSearchDirectory;
export { makeSelectSearchDirectory, makeSelectTotalMembers };

import { createSelector } from 'reselect';
import _ from 'lodash';
import selectGlobalEntitiesDomain from 'containers/GlobalEntities/selectors';
import { initialState } from './reducer';

/**
 * Direct selector to the digest state domain
 */

const selectDigestDomain = state => state.digest || initialState;

const makeSelectDigestList = () =>
  createSelector(
    selectDigestDomain,
    globalState => globalState.digestList,
  );

const makeSelectDigestListLoading = () =>
  createSelector(
    selectDigestDomain,
    globalState => globalState.digestListLoading,
  );

const makeSelectDigest = () =>
  createSelector(
    selectDigestDomain,
    globalState =>
      _.map(globalState.digestList.rows, row => globalState.digest[row]),
  );

const makeSelectDigestById = id =>
  createSelector(
    selectDigestDomain,
    globalState => globalState.digest[id],
  );

const makeSelectCarouselList = () =>
  createSelector(
    selectDigestDomain,
    globalState => globalState.carouselList,
  );

const makeSelectPinnedContent = () =>
  createSelector(
    [selectGlobalEntitiesDomain, selectDigestDomain],
    (globalEntitiesState, createDigestState) =>
      _.map(
        createDigestState.pinnedContent,
        feed => globalEntitiesState.entities.feed[feed],
      ),
  );

// const makeSelectDigest = () =>
//   createSelector(
//     selectDigestDomain,
//     substate => substate,
//   );

// export default makeSelectDigest;
export {
  selectDigestDomain,
  makeSelectDigestList,
  makeSelectDigestListLoading,
  makeSelectDigest,
  makeSelectDigestById,
  makeSelectCarouselList,
  makeSelectPinnedContent,
};

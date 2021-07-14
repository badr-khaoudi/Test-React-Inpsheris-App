import { createSelector } from 'reselect';
import _ from 'lodash';
import { selectDigestDomain } from 'containers/Digest/selectors';
import { initialState } from './reducer';

/**
 * Direct selector to the digestList state domain
 */

const selectDigestListDomain = state => state.digestList || initialState;

const makeSelectDigestList = () =>
  createSelector(
    [selectDigestDomain, selectDigestListDomain],
    (digestState, digestListState) =>
      _.map(digestListState.digestList, digest => digestState.digest[digest]),
  );

// const makeSelectDigestList = () =>
//   createSelector(
//     selectDigestListDomain,
//     substate => substate,
//   );

// export default makeSelectDigestList;
export { makeSelectDigestList };

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the createDigest state domain
 */

const selectCreateDigestDomain = state => state.createDigest || initialState;

const makeSelectTemplates = () =>
  createSelector(
    selectCreateDigestDomain,
    globalState => globalState.templates,
  );

const makeSelectTypes = () =>
  createSelector(
    selectCreateDigestDomain,
    globalState => globalState.types,
  );

const makeSelectRepeat = () =>
  createSelector(
    selectCreateDigestDomain,
    globalState => globalState.repeat,
  );

const makeSelectContentTypes = () =>
  createSelector(
    selectCreateDigestDomain,
    globalState => globalState.contentTypes,
  );

const makeSelectCreateDigestSuccess = () =>
  createSelector(
    selectCreateDigestDomain,
    globalState => globalState.createDigestSuccess,
  );

// const makeSelectCreateDigest = () =>
//   createSelector(
//     selectCreateDigestDomain,
//     substate => substate,
//   );

// export default makeSelectCreateDigest;
export {
  makeSelectTemplates,
  makeSelectTypes,
  makeSelectRepeat,
  makeSelectContentTypes,
  makeSelectCreateDigestSuccess,
};

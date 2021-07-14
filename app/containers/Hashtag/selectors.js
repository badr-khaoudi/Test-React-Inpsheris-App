import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the hashtag state domain
 */

const selectHashtagDomain = state => state.hashtag || initialState;

const makeSelectHashtagListing = () =>
  createSelector(
    selectHashtagDomain,
    globalState => globalState.hashtagListing,
  );

const makeSelectHashtagListingLoading = () =>
  createSelector(
    selectHashtagDomain,
    globalState => globalState.hashtagListingLoading,
  );

// const makeSelectHashtag = () =>
//   createSelector(
//     selectHashtagDomain,
//     substate => substate,
//   );

// export default makeSelectHashtag;
export { makeSelectHashtagListing, makeSelectHashtagListingLoading };

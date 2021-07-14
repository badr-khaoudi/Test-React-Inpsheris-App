import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the selectVideo state domain
 */

const selectSelectVideoDomain = state => state.selectVideo || initialState;

/**
 * Other specific selectors
 */

const makeSelectVideoListing = () =>
  createSelector(
    selectSelectVideoDomain,
    globalState => globalState.videoListing,
  );

const makeSelectVideoListingLoading = () =>
  createSelector(
    selectSelectVideoDomain,
    globalState => globalState.videoListingLoading,
  );

/**
 * Default selector used by SelectVideo
 */

// const makeSelectSelectVideo = () =>
//   createSelector(
//     selectSelectVideoDomain,
//     substate => substate,
//   );

// export default makeSelectSelectVideo;
export { makeSelectVideoListing, makeSelectVideoListingLoading };

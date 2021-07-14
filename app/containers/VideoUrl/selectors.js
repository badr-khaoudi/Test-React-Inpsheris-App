import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the videoUrl state domain
 */

const selectVideoUrlDomain = state => state.videoUrl || initialState;

/**
 * Other specific selectors
 */

const makeSelectEmbedUrl = () =>
  createSelector(
    selectVideoUrlDomain,
    globalState => globalState.embedUrl,
  );

const makeSelectOEmbed = () =>
  createSelector(
    selectVideoUrlDomain,
    globalState => globalState.oEmbed,
  );

const makeSelectOEmbedError = () =>
  createSelector(
    selectVideoUrlDomain,
    globalState => globalState.oEmbedError,
  );

/**
 * Default selector used by VideoUrl
 */

// const makeSelectVideoUrl = () =>
//   createSelector(
//     selectVideoUrlDomain,
//     substate => substate,
//   );

// export default makeSelectVideoUrl;
export { makeSelectEmbedUrl, makeSelectOEmbed, makeSelectOEmbedError };

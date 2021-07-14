import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the createCarousel state domain
 */

const selectCreateCarouselDomain = state =>
  state.createCarousel || initialState;

const makeSelectUploadFile = field =>
  createSelector(
    selectCreateCarouselDomain,
    globalState => globalState.uploadFile[field],
  );

const makeSelectCreateCarouselSuccess = () =>
  createSelector(
    selectCreateCarouselDomain,
    globalState => globalState.createCarouselSuccess,
  );

// const makeSelectCreateCarousel = () =>
//   createSelector(
//     selectCreateCarouselDomain,
//     substate => substate,
//   );

// export default makeSelectCreateCarousel;
export { makeSelectUploadFile, makeSelectCreateCarouselSuccess };

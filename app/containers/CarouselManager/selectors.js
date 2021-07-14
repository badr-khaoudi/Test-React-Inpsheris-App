import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the carouselManager state domain
 */

const selectCarouselManagerDomain = state =>
  state.carouselManager || initialState;

const makeSelectCarouselList = () =>
  createSelector(
    selectCarouselManagerDomain,
    globalState => globalState.carouselList,
  );

const makeSelectCarousel = uid =>
  createSelector(
    selectCarouselManagerDomain,
    globalState => globalState.carousel[uid],
  );

const makeSelectCarouselListLoading = () =>
  createSelector(
    selectCarouselManagerDomain,
    globalState => globalState.carouselListLoading,
  );
// const makeSelectCarouselManager = () =>
//   createSelector(
//     selectCarouselManagerDomain,
//     substate => substate,
//   );

// export default makeSelectCarouselManager;
export {
  makeSelectCarouselList,
  makeSelectCarousel,
  makeSelectCarouselListLoading,
};

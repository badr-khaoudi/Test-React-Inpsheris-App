import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the carouselItem state domain
 */

const selectCarouselItemDomain = state => state.carouselItem || initialState;

const makeSelectDeleteCarouselLoading = () =>
  createSelector(
    selectCarouselItemDomain,
    globalState => globalState.deleteCarouselLoading,
  );

const makeSelectPublishCarouselLoading = () =>
  createSelector(
    selectCarouselItemDomain,
    globalState => globalState.publishCarouselLoading,
  );

// const makeSelectCarouselItem = () =>
//   createSelector(
//     selectCarouselItemDomain,
//     substate => substate,
//   );

// export default makeSelectCarouselItem;
export { makeSelectDeleteCarouselLoading, makeSelectPublishCarouselLoading };

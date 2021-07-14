import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the galleryCarouselContainer state domain
 */

const selectGalleryCarouselContainerDomain = state =>
  state.galleryCarouselContainer || initialState;

/**
 * Other specific selectors
 */

const makeSelectMediaManagerList = () =>
  createSelector(
    selectGalleryCarouselContainerDomain,
    globalState => globalState.mediaManagerList,
  );

const makeSelectMediaManagerListLoading = () =>
  createSelector(
    selectGalleryCarouselContainerDomain,
    globalState => globalState.getMediaManagerListLoading,
  );

const makeSelectMediaManagerListError = () =>
  createSelector(
    selectGalleryCarouselContainerDomain,
    globalState => globalState.getMediaManagerListError,
  );

const makeSelectMediaManagerListSuccess = () =>
  createSelector(
    selectGalleryCarouselContainerDomain,
    globalState => globalState.getMediaManagerListSuccess,
  );

const makeSelectAllImagesAsZip = () =>
  createSelector(
    selectGalleryCarouselContainerDomain,
    globalState => globalState.allImagesAsZip,
  );

const makeSelectAllImagesAsZipLoading = () =>
  createSelector(
    selectGalleryCarouselContainerDomain,
    globalState => globalState.getAllImagesAsZipLoading,
  );

const makeSelectAllImagesAsZipError = () =>
  createSelector(
    selectGalleryCarouselContainerDomain,
    globalState => globalState.getAllImagesAsZipError,
  );

export {
  selectGalleryCarouselContainerDomain,
  makeSelectMediaManagerList,
  makeSelectMediaManagerListLoading,
  makeSelectMediaManagerListError,
  makeSelectAllImagesAsZip,
  makeSelectAllImagesAsZipLoading,
  makeSelectAllImagesAsZipError,
  makeSelectMediaManagerListSuccess,
};

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectHomePageDomain = state => state.homePage || initialState;

const makeSelectCarouselList = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.carouselList,
  );

const makeSelectFirstLevelCarouselList = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.carouselList.sliderLevel1,
  );

const makeSelectFirstLevelCarouselListLoading = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.carouselListLoading,
  );

const makeSelectSecondLevelCarouselList = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.carouselList.sliderLevel2,
  );

const makeSelectSecondLevelCarouselListLoading = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.carouselListLoading,
  );

const makeSelectPinnedContent = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.pinnedContent,
  );

const makeSelectPinnedContentLoading = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.pinnedContentLoading,
  );

const makeSelectWidgetList = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.widgetList,
  );

const makeSelectWidgetListLoading = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.widgetListLoading,
  );

const makeSelectPinnedCommunityList = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.pinnedCommunityList,
  );

const makeSelectPinnedCommunityListLoading = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.pinnedCommunityListLoading,
  );

const makeSelectPinnedCommunityListSuccess = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.pinnedCommunityListSuccess,
  );

const makeSelectContent = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.content,
  );

const makeSelectContentLoading = () =>
  createSelector(
    selectHomePageDomain,
    globalState => globalState.contentLoading,
  );

export {
  makeSelectCarouselList,
  selectHomePageDomain,
  makeSelectFirstLevelCarouselList,
  makeSelectFirstLevelCarouselListLoading,
  makeSelectPinnedContent,
  makeSelectPinnedContentLoading,
  makeSelectWidgetList,
  makeSelectWidgetListLoading,
  makeSelectPinnedCommunityList,
  makeSelectPinnedCommunityListLoading,
  makeSelectPinnedCommunityListSuccess,
  makeSelectSecondLevelCarouselList,
  makeSelectSecondLevelCarouselListLoading,
  makeSelectContent,
  makeSelectContentLoading,
};

import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the widgetPage state domain
 */

const selectWidgetPageDomain = state => state.widgetPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by WidgetPage
 */

const makeSelectWidgetLoading = () =>
  createSelector(
    selectWidgetPageDomain,
    globalState => globalState.getWidgetLoading,
  );

export { makeSelectWidgetLoading };

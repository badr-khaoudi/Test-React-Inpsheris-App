import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the widgetContainer state domain
 */

const selectWidgetContainerDomain = state =>
  state.widgetContainer || initialState;

const makeSelectSubmitPollLoading = () =>
  createSelector(
    selectWidgetContainerDomain,
    globalState => globalState.submitPollLoading,
  );

const makeSelectSubmitPollError = () =>
  createSelector(
    selectWidgetContainerDomain,
    globalState => globalState.submitPollError,
  );

const makeSelectSubmitPollSuccess = () =>
  createSelector(
    selectWidgetContainerDomain,
    globalState => globalState.submitPollSuccess,
  );

const makeSelectOpenCreateEvent = () =>
  createSelector(
    selectWidgetContainerDomain,
    globalState => globalState.openCreateEvent,
  );

const makeSelectWidgetUid = () =>
  createSelector(
    selectWidgetContainerDomain,
    globalState => globalState.widgetUid,
  );

const makeSelectEvent = () =>
  createSelector(
    selectWidgetContainerDomain,
    globalState => globalState.event,
  );

const makeSelectCreateEventSuccess = () =>
  createSelector(
    selectWidgetContainerDomain,
    globalState => globalState.createEventSuccess,
  );

const makeSelectCalendarOptions = () =>
  createSelector(
    selectWidgetContainerDomain,
    globalState => globalState.calendarOptions,
  );

export {
  selectWidgetContainerDomain,
  makeSelectSubmitPollLoading,
  makeSelectSubmitPollError,
  makeSelectSubmitPollSuccess,
  makeSelectOpenCreateEvent,
  makeSelectWidgetUid,
  makeSelectEvent,
  makeSelectCreateEventSuccess,
  makeSelectCalendarOptions,
};

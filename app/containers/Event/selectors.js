import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the event state domain
 */

const selectEventDomain = state => state.event || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Event
 */

const makeSelectParticipants = () =>
  createSelector(
    selectEventDomain,
    substate => substate.participants,
  );

const makeSelectParticipantsLoading = () =>
  createSelector(
    selectEventDomain,
    substate => substate.participantsLoading,
  );

// const makeSelectEvent = () =>
//   createSelector(
//     selectEventDomain,
//     substate => substate,
//   );

// export default makeSelectEvent;
export { makeSelectParticipants, makeSelectParticipantsLoading };

/*
 *
 * Event actions
 *
 */

import {
  PARTICIPATE,
  PARTICIPATE_SUCCESS,
  PARTICIPATE_ERROR,
  INTEGRATE,
  INTEGRATE_SUCCESS,
  INTEGRATE_ERROR,
  CANCEL_PARTICIPATION,
  CANCEL_PARTICIPATION_SUCCESS,
  CANCEL_PARTICIPATION_ERROR,
  EXPORT_PARTICIPANTS,
  EXPORT_PARTICIPANTS_SUCCESS,
  EXPORT_PARTICIPANTS_ERROR,
  STOP_PARTICIPATION,
  STOP_PARTICIPATION_SUCCESS,
  STOP_PARTICIPATION_ERROR,
  ADD_PARTICIPATION,
  ADD_PARTICIPATION_SUCCESS,
  ADD_PARTICIPATION_ERROR,
  PARTICIPANTS,
  PARTICIPANTS_SUCCESS,
  PARTICIPANTS_ERROR,
} from './constants';

export function participate(options, integration, contentUid) {
  return {
    type: PARTICIPATE,
    options,
    integration,
    contentUid,
  };
}

export function participateSuccess() {
  return {
    type: PARTICIPATE_SUCCESS,
  };
}

export function participateError(error) {
  return {
    type: PARTICIPATE_ERROR,
    error,
  };
}

export function integrate(options) {
  return {
    type: INTEGRATE,
    options,
  };
}

export function integrateSuccess() {
  return {
    type: INTEGRATE_SUCCESS,
  };
}

export function integrateError(error) {
  return {
    type: INTEGRATE_ERROR,
    error,
  };
}

export function cancelParticipation(options, contentUid) {
  return {
    type: CANCEL_PARTICIPATION,
    options,
    contentUid,
  };
}

export function cancelParticipationSuccess() {
  return {
    type: CANCEL_PARTICIPATION_SUCCESS,
  };
}

export function cancelParticipationError(error) {
  return {
    type: CANCEL_PARTICIPATION_ERROR,
    error,
  };
}

export function exportParticipants(options) {
  return {
    type: EXPORT_PARTICIPANTS,
    options,
  };
}

export function exportParticipantsSuccess() {
  return {
    type: EXPORT_PARTICIPANTS_SUCCESS,
  };
}

export function exportParticipantsError(error) {
  return {
    type: EXPORT_PARTICIPANTS_ERROR,
    error,
  };
}

export function stopParticipation(params, options, contentUid) {
  return {
    type: STOP_PARTICIPATION,
    params,
    options,
    contentUid,
  };
}

export function stopParticipationSuccess() {
  return {
    type: STOP_PARTICIPATION_SUCCESS,
  };
}

export function stopParticipationError(error) {
  return {
    type: STOP_PARTICIPATION_ERROR,
    error,
  };
}

export function addParticipation(options, contentUid) {
  return {
    type: ADD_PARTICIPATION,
    options,
    contentUid,
  };
}

export function addParticipationSuccess() {
  return {
    type: ADD_PARTICIPATION_SUCCESS,
  };
}

export function addParticipationError(error) {
  return {
    type: ADD_PARTICIPATION_ERROR,
    error,
  };
}

export function participants(options) {
  return {
    type: PARTICIPANTS,
    options,
  };
}

export function participantsSuccess(data) {
  return {
    type: PARTICIPANTS_SUCCESS,
    data,
  };
}

export function participantsError(error) {
  return {
    type: PARTICIPANTS_ERROR,
    error,
  };
}

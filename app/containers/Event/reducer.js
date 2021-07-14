/*
 *
 * Event reducer
 *
 */
import produce from 'immer';
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

export const initialState = {
  participateLoading: false,
  participateSuccess: false,
  participateError: '',
  integrateLoading: false,
  integrateSuccess: false,
  integrateError: '',
  cancelParticipationLoading: false,
  cancelParticipationSuccess: false,
  cancelParticipationError: '',
  exportParticipantsLoading: false,
  exportParticipantsSuccess: false,
  exportParticipantsError: '',
  stopParticipationLoading: false,
  stopParticipationSuccess: false,
  stopParticipationError: '',
  addParticipationLoading: false,
  addParticipationSuccess: false,
  addParticipationError: '',
  participants: [],
  participantsLoading: false,
  participantsSuccess: false,
  participantsError: '',
};

/* eslint-disable default-case, no-param-reassign */
const eventReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case PARTICIPATE:
        draft.participateLoading = true;
        draft.participateSuccess = false;
        draft.participateError = '';
        break;
      case PARTICIPATE_SUCCESS:
        draft.participateLoading = false;
        draft.participateSuccess = true;
        draft.participateError = '';
        break;
      case PARTICIPATE_ERROR:
        draft.participateLoading = false;
        draft.participateSuccess = false;
        draft.participateError = action.error;
        break;
      case INTEGRATE:
        draft.integrateLoading = true;
        draft.integrateSuccess = false;
        draft.integrateError = '';
        break;
      case INTEGRATE_SUCCESS:
        draft.integrateLoading = false;
        draft.integrateSuccess = true;
        draft.integrateError = '';
        break;
      case INTEGRATE_ERROR:
        draft.integrateLoading = false;
        draft.integrateSuccess = false;
        draft.integrateError = action.error;
        break;
      case CANCEL_PARTICIPATION:
        draft.cancelParticipationLoading = true;
        draft.cancelParticipationSuccess = false;
        draft.cancelParticipationError = '';
        break;
      case CANCEL_PARTICIPATION_SUCCESS:
        draft.cancelParticipationLoading = false;
        draft.cancelParticipationSuccess = true;
        draft.cancelParticipationError = '';
        break;
      case CANCEL_PARTICIPATION_ERROR:
        draft.cancelParticipationLoading = false;
        draft.cancelParticipationSuccess = false;
        draft.cancelParticipationError = action.error;
        break;
      case EXPORT_PARTICIPANTS:
        draft.exportParticipantsLoading = true;
        draft.exportParticipantsSuccess = false;
        draft.exportParticipantsError = '';
        break;
      case EXPORT_PARTICIPANTS_SUCCESS:
        draft.exportParticipantsLoading = false;
        draft.exportParticipantsSuccess = true;
        draft.exportParticipantsError = '';
        break;
      case EXPORT_PARTICIPANTS_ERROR:
        draft.exportParticipantsLoading = false;
        draft.exportParticipantsSuccess = false;
        draft.exportParticipantsError = action.error;
        break;
      case STOP_PARTICIPATION:
        draft.stopParticipationLoading = true;
        draft.stopParticipationSuccess = false;
        draft.stopParticipationError = '';
        break;
      case STOP_PARTICIPATION_SUCCESS:
        draft.stopParticipationLoading = false;
        draft.stopParticipationSuccess = true;
        draft.stopParticipationError = '';
        break;
      case STOP_PARTICIPATION_ERROR:
        draft.stopParticipationLoading = false;
        draft.stopParticipationSuccess = false;
        draft.stopParticipationError = action.error;
        break;
      case ADD_PARTICIPATION:
        draft.addParticipationLoading = true;
        draft.addParticipationSuccess = false;
        draft.addParticipationError = '';
        break;
      case ADD_PARTICIPATION_SUCCESS:
        draft.addParticipationLoading = false;
        draft.addParticipationSuccess = true;
        draft.addParticipationError = '';
        break;
      case ADD_PARTICIPATION_ERROR:
        draft.addParticipationLoading = false;
        draft.addParticipationSuccess = false;
        draft.addParticipationError = action.error;
        break;
      case PARTICIPANTS:
        draft.participants = [];
        draft.participantsLoading = true;
        draft.participantsSuccess = false;
        draft.participantsError = '';
        break;
      case PARTICIPANTS_SUCCESS:
        draft.participants = action.data;
        draft.participantsLoading = false;
        draft.participantsSuccess = true;
        draft.participantsError = '';
        break;
      case PARTICIPANTS_ERROR:
        draft.participantsLoading = false;
        draft.participantsSuccess = false;
        draft.participantsError = action.error;
        break;
      default:
        return state;
    }
  });

export default eventReducer;

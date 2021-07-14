/*
 *
 * DirectoryPrivateMessage reducer
 *
 */
import produce from 'immer';
import {
  PRIVATE_MESSAGE,
  PRIVATE_MESSAGE_SUCCESS,
  PRIVATE_MESSAGE_ERROR,
  CLEAN_PRIVATE_MESSAGE,
} from './constants';

export const initialState = {
  privateMessage: {},
  privateMessageLoading: false,
  privateMessageSuccess: false,
  privateMessageError: '',
};

/* eslint-disable default-case, no-param-reassign */
const directoryPrivateMessageReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case PRIVATE_MESSAGE:
        draft.privateMessage = {};
        draft.privateMessageLoading = true;
        draft.privateMessageSuccess = false;
        draft.privateMessageError = '';
        break;
      case PRIVATE_MESSAGE_SUCCESS:
        draft.privateMessage = action.data;
        draft.privateMessageLoading = false;
        draft.privateMessageSuccess = true;
        draft.privateMessageError = '';
        break;
      case PRIVATE_MESSAGE_ERROR:
        draft.privateMessageLoading = false;
        draft.privateMessageSuccess = false;
        draft.privateMessageError = action.error;
        break;
      case CLEAN_PRIVATE_MESSAGE:
        draft.privateMessage = {};
        draft.privateMessageLoading = false;
        draft.privateMessageSuccess = false;
        draft.privateMessageError = '';
        break;
      default:
        return state;
    }
  });

export default directoryPrivateMessageReducer;

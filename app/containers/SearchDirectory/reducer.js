/*
 *
 * SearchDirectory reducer
 *
 */
import produce from 'immer';
import {
  SEARCH_DIRECTORY,
  SEARCH_DIRECTORY_SUCCESS,
  SEARCH_DIRECTORY_ERROR,
  SEARCH_DIRECTORY_MORE,
  SEARCH_DIRECTORY_MORE_SUCCESS,
  SEARCH_DIRECTORY_MORE_ERROR,
  ADD_COWORKER,
  ADD_COWORKER_SUCCESS,
  ADD_COWORKER_ERROR,
  ADD_PARTNER,
  ADD_PARTNER_SUCCESS,
  ADD_PARTNER_ERROR,
} from './constants';

export const initialState = {
  totalMembers: 0,
  searchDirectory: [],
  searchDirectoryLoading: false,
  searchDirectorySuccess: false,
  searchDirectoryError: '',
  addCoworkerLoading: false,
  addCoworkerSuccess: false,
  addCoworkerError: '',
  addPartnerLoading: false,
  addPartnerSuccess: false,
  addPartnerError: '',
};

/* eslint-disable default-case, no-param-reassign */
const searchDirectoryReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case SEARCH_DIRECTORY:
        draft.totalMembers = 0;
        draft.searchDirectory = [];
        draft.searchDirectoryLoading = true;
        draft.searchDirectorySuccess = false;
        draft.searchDirectoryError = '';
        break;
      case SEARCH_DIRECTORY_SUCCESS:
        draft.totalMembers = action.totalMembers;
        draft.searchDirectory = action.result;
        draft.searchDirectoryLoading = false;
        draft.searchDirectorySuccess = true;
        draft.searchDirectoryError = '';
        break;
      case SEARCH_DIRECTORY_ERROR:
        draft.searchDirectoryLoading = false;
        draft.searchDirectorySuccess = false;
        draft.searchDirectoryError = action.error;
        break;
      case SEARCH_DIRECTORY_MORE:
        draft.searchDirectoryLoading = true;
        draft.searchDirectorySuccess = false;
        draft.searchDirectoryError = '';
        break;
      case SEARCH_DIRECTORY_MORE_SUCCESS:
        draft.searchDirectory = [...draft.searchDirectory, ...action.result];
        draft.searchDirectoryLoading = false;
        draft.searchDirectorySuccess = true;
        draft.searchDirectoryError = '';
        break;
      case SEARCH_DIRECTORY_MORE_ERROR:
        draft.searchDirectoryLoading = false;
        draft.searchDirectorySuccess = false;
        draft.searchDirectoryError = action.error;
        break;
      case ADD_COWORKER:
        draft.addCoworkerLoading = true;
        draft.addCoworkerSuccess = false;
        draft.addCoworkerError = '';
        break;
      case ADD_COWORKER_SUCCESS:
        draft.addCoworkerLoading = false;
        draft.addCoworkerSuccess = true;
        draft.addCoworkerError = '';
        break;
      case ADD_COWORKER_ERROR:
        draft.addCoworkerLoading = false;
        draft.addCoworkerSuccess = false;
        draft.addCoworkerError = action.error;
        break;
      case ADD_PARTNER:
        draft.addPartnerLoading = true;
        draft.addPartnerSuccess = false;
        draft.addPartnerError = '';
        break;
      case ADD_PARTNER_SUCCESS:
        draft.addPartnerLoading = false;
        draft.addPartnerSuccess = true;
        draft.addPartnerError = '';
        break;
      case ADD_PARTNER_ERROR:
        draft.addPartnerLoading = false;
        draft.addPartnerSuccess = false;
        draft.addPartnerError = action.error;
        break;
      default:
        return state;
    }
  });

export default searchDirectoryReducer;

/*
 *
 * Activities reducer
 *
 */
import produce from 'immer';
import _ from 'lodash';
import { DELETE_FEED_UID } from 'containers/GlobalEntities/constants';
import {
  PROFILE,
  PROFILE_SUCCESS,
  PROFILE_ERROR,
  PROFILE_MORE,
  PROFILE_MORE_SUCCESS,
  PROFILE_MORE_ERROR,
} from './constants';

export const initialState = {
  profile: { myActivities: {}, privateMessage: {} },
  profileLoading: false,
  profileSuccess: false,
  profileError: '',
};

/* eslint-disable default-case, no-param-reassign */
const activitiesReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case PROFILE:
        draft.profile = { myActivities: {}, privateMessage: {} };
        draft.profileLoading = true;
        draft.profileSuccess = false;
        draft.profileError = '';
        break;
      case PROFILE_SUCCESS:
        draft.profile[action.options.activityFilter] = action.data;
        draft.profileLoading = false;
        draft.profileSuccess = true;
        draft.profileError = '';
        break;
      case PROFILE_ERROR:
        draft.profileLoading = false;
        draft.profileSuccess = false;
        draft.profileError = action.error;
        break;
      case PROFILE_MORE:
        draft.profileLoading = true;
        draft.profileSuccess = false;
        draft.profileError = '';
        break;
      case PROFILE_MORE_SUCCESS:
        draft.profile[action.options.activityFilter].contents = [
          ...draft.profile.contents,
          ...action.data.contents,
        ];
        draft.profileLoading = false;
        draft.profileSuccess = true;
        draft.profileError = '';
        break;
      case PROFILE_MORE_ERROR:
        draft.profileLoading = false;
        draft.profileSuccess = false;
        draft.profileError = action.error;
        break;
      case DELETE_FEED_UID:
        draft.profile.contents = _.filter(
          draft.profile.contents,
          content => content !== action.options.uid,
        );
        break;
      default:
        return state;
    }
  });

export default activitiesReducer;

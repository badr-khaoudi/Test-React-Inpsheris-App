/*
 *
 * SocialWall reducer
 *
 */
import produce from 'immer';
import {
  WIDGET_LIST,
  WIDGET_LIST_SUCCESS,
  WIDGET_LIST_ERROR,
} from './constants';

export const initialState = {
  widgetList: [],
  widgetListLoading: false,
  widgetListSuccess: false,
  widgetListError: '',
};

/* eslint-disable default-case, no-param-reassign */
const socialWallReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case WIDGET_LIST:
        draft.widgetList = [];
        draft.widgetListLoading = true;
        draft.widgetListSuccess = false;
        draft.widgetListError = '';
        break;
      case WIDGET_LIST_SUCCESS:
        draft.widgetList = action.data;
        draft.widgetListLoading = false;
        draft.widgetListSuccess = true;
        draft.widgetListError = '';
        break;
      case WIDGET_LIST_ERROR:
        draft.widgetListLoading = false;
        draft.widgetListSuccess = false;
        draft.widgetListError = action.error;
        break;
      default:
        return state;
    }
  });

export default socialWallReducer;

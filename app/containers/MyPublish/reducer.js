/*
 *
 * MyPublish reducer
 *
 */
import produce from 'immer';
import _ from 'lodash';
import { DELETE_FEED_UID } from 'containers/GlobalEntities/constants';
import {
  PUBLICATIONS,
  PUBLICATIONS_SUCCESS,
  PUBLICATIONS_ERROR,
  PUBLICATIONS_MORE,
  PUBLICATIONS_MORE_SUCCESS,
  PUBLICATIONS_MORE_ERROR,
} from './constants';

export const initialState = {
  publications: {},
  publicationsLoading: false,
  publicationsSuccess: false,
  publicationsError: '',
};

/* eslint-disable default-case, no-param-reassign */
const myPublishReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case PUBLICATIONS:
        draft.publications = {};
        draft.publicationsLoading = true;
        draft.publicationsSuccess = false;
        draft.publicationsError = '';
        break;
      case PUBLICATIONS_SUCCESS:
        draft.publications = action.data;
        draft.publicationsLoading = false;
        draft.publicationsSuccess = true;
        draft.publicationsError = '';
        break;
      case PUBLICATIONS_ERROR:
        draft.publicationsLoading = false;
        draft.publicationsSuccess = false;
        draft.publicationsError = action.error;
        break;
      case PUBLICATIONS_MORE:
        draft.publicationsLoading = true;
        draft.publicationsSuccess = false;
        draft.publicationsError = '';
        break;
      case PUBLICATIONS_MORE_SUCCESS:
        draft.publications.contents = [
          ...draft.publications.contents,
          ...action.data.contents,
        ];
        draft.publicationsLoading = false;
        draft.publicationsSuccess = true;
        draft.publicationsError = '';
        break;
      case PUBLICATIONS_MORE_ERROR:
        draft.publicationsLoading = false;
        draft.publicationsSuccess = false;
        draft.publicationsError = action.error;
        break;
      case DELETE_FEED_UID:
        draft.publications.contents = _.filter(
          draft.publications.contents,
          content => content !== action.options.uid,
        );
        break;
      default:
        return state;
    }
  });

export default myPublishReducer;

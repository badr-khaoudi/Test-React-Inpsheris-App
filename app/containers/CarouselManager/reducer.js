/*
 *
 * CarouselManager reducer
 *
 */
import produce from 'immer';
import _ from 'lodash';
import {
  CAROUSEL_LIST,
  CAROUSEL_LIST_SUCCESS,
  CAROUSEL_LIST_ERROR,
  CAROUSEL_LIST_MORE,
  CAROUSEL_LIST_MORE_SUCCESS,
  CAROUSEL_LIST_MORE_ERROR,
  CAROUSEL_ENTITIES_UPDATE,
  ADD_CAROUSEL,
  DELETE_CAROUSEL,
} from './constants';

export const initialState = {
  carousel: {},
  carouselList: [],
  carouselListLoading: false,
  carouselListSuccess: false,
  carouselListError: '',
};

/* eslint-disable default-case, no-param-reassign */
const carouselManagerReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case CAROUSEL_LIST:
        draft.carouselList = [];
        draft.carouselListLoading = true;
        draft.carouselListSuccess = false;
        draft.carouselListError = '';
        break;
      case CAROUSEL_LIST_SUCCESS:
        draft.carousel = _.merge(draft.carousel, action.data);
        draft.carouselList = action.result;
        draft.carouselListLoading = false;
        draft.carouselListSuccess = true;
        draft.carouselListError = '';
        break;
      case CAROUSEL_LIST_ERROR:
        draft.carouselListLoading = false;
        draft.carouselListSuccess = false;
        draft.carouselListError = action.error;
        break;
      case CAROUSEL_LIST_MORE:
        draft.carouselListLoading = true;
        draft.carouselListSuccess = false;
        draft.carouselListError = '';
        break;
      case CAROUSEL_LIST_MORE_SUCCESS:
        draft.carousel = _.merge(draft.carousel, action.data);
        draft.carouselList = [...draft.carouselList, ...action.result];
        draft.carouselListLoading = false;
        draft.carouselListSuccess = true;
        draft.carouselListError = '';
        break;
      case CAROUSEL_LIST_MORE_ERROR:
        draft.carouselListLoading = false;
        draft.carouselListSuccess = false;
        draft.carouselListError = action.error;
        break;
      case CAROUSEL_ENTITIES_UPDATE:
        draft.carousel = _.merge(draft.carousel, action.data);
        break;
      case ADD_CAROUSEL:
        draft.carouselList = _.uniq([...draft.carouselList, action.data]);
        break;
      case DELETE_CAROUSEL:
        draft.carouselList = _.filter(
          draft.carouselList,
          carousel => carousel !== action.options.uid,
        );
        delete draft.carousel[action.options.uid];
        break;
      default:
        return state;
    }
  });

export default carouselManagerReducer;

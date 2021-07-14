/*
 *
 * CarouselItem reducer
 *
 */
import produce from 'immer';
import {
  PUBLISH_CAROUSEL,
  PUBLISH_CAROUSEL_SUCCESS,
  PUBLISH_CAROUSEL_ERROR,
  DELETE_CAROUSEL,
  DELETE_CAROUSEL_SUCCESS,
  DELETE_CAROUSEL_ERROR,
} from './constants';

export const initialState = {
  publishCarouselLoading: false,
  publishCarouselSuccess: false,
  publishCarouselError: '',
  deleteCarouselLoading: false,
  deleteCarouselSuccess: false,
  deleteCarouselError: '',
};

/* eslint-disable default-case, no-param-reassign */
const carouselItemReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case PUBLISH_CAROUSEL:
        draft.publishCarouselLoading = true;
        draft.publishCarouselSuccess = false;
        draft.publishCarouselError = '';
        break;
      case PUBLISH_CAROUSEL_SUCCESS:
        draft.publishCarouselLoading = false;
        draft.publishCarouselSuccess = true;
        draft.publishCarouselError = '';
        break;
      case PUBLISH_CAROUSEL_ERROR:
        draft.publishCarouselLoading = false;
        draft.publishCarouselSuccess = false;
        draft.publishCarouselError = action.error;
        break;
      case DELETE_CAROUSEL:
        draft.deleteCarouselLoading = true;
        draft.deleteCarouselSuccess = false;
        draft.deleteCarouselError = '';
        break;
      case DELETE_CAROUSEL_SUCCESS:
        draft.deleteCarouselLoading = false;
        draft.deleteCarouselSuccess = true;
        draft.deleteCarouselError = '';
        break;
      case DELETE_CAROUSEL_ERROR:
        draft.deleteCarouselLoading = false;
        draft.deleteCarouselSuccess = false;
        draft.deleteCarouselError = action.error;
        break;
      default:
        return state;
    }
  });

export default carouselItemReducer;

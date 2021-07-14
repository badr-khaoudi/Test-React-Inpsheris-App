/*
 *
 * CommunityHome reducer
 *
 */
import produce from 'immer';
import {
  COMMUNITY,
  COMMUNITY_SUCCESS,
  COMMUNITY_ERROR,
  LIKE,
  LIKE_SUCCESS,
  LIKE_ERROR,
  DELETE_LIKE,
  DELETE_LIKE_SUCCESS,
  DELETE_LIKE_ERROR,
  FOLLOW,
  FOLLOW_SUCCESS,
  FOLLOW_ERROR,
  UNFOLLOW,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_ERROR,
  GET_AUTHOR_LIST,
  GET_AUTHOR_LIST_SUCCESS,
  GET_AUTHOR_LIST_ERROR,
  CAROUSEL_LIST,
  CAROUSEL_LIST_SUCCESS,
  CAROUSEL_LIST_ERROR,
} from './constants';

export const initialState = {
  community: '',
  communityLoading: false,
  communitySuccess: false,
  communityError: '',
  likeLoading: false,
  likeSuccess: false,
  likeError: '',
  deleteLikeLoading: false,
  deleteLikeSuccess: false,
  deleteLikeError: '',
  followLoading: false,
  followSuccess: false,
  followError: '',
  unfollowLoading: false,
  unfollowSuccess: false,
  unfollowError: '',
  authorList: [],
  authorListLoading: false,
  authorListSuccess: false,
  authorListError: '',
  carouselList: { sliderLevel1: [], sliderLevel2: [] },
  carouselListLoading: false,
  carouselListSuccess: false,
  carouselListError: '',
};

/* eslint-disable default-case, no-param-reassign */
const communityHomeReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case COMMUNITY:
        draft.community = '';
        draft.communityLoading = true;
        draft.communitySuccess = false;
        draft.communityError = '';
        break;
      case COMMUNITY_SUCCESS:
        draft.community = action.data;
        draft.communityLoading = false;
        draft.communitySuccess = true;
        draft.communityError = '';
        break;
      case COMMUNITY_ERROR:
        draft.communityLoading = false;
        draft.communitySuccess = false;
        draft.communityError = action.error;
        break;
      case LIKE:
        draft.likeLoading = true;
        draft.likeSuccess = false;
        draft.likeError = '';
        break;
      case LIKE_SUCCESS:
        draft.likeLoading = true;
        draft.likeSuccess = false;
        draft.likeError = '';
        break;
      case LIKE_ERROR:
        draft.likeLoading = true;
        draft.likeSuccess = false;
        draft.likeError = action.error;
        break;
      case DELETE_LIKE:
        draft.deleteLikeLoading = true;
        draft.deleteLikeSuccess = false;
        draft.deleteLikeError = '';
        break;
      case DELETE_LIKE_SUCCESS:
        draft.deleteLikeLoading = true;
        draft.deleteLikeSuccess = false;
        draft.deleteLikeError = '';
        break;
      case DELETE_LIKE_ERROR:
        draft.deleteLikeLoading = true;
        draft.deleteLikeSuccess = false;
        draft.deleteLikeError = action.error;
        break;
      case FOLLOW:
        draft.followLoading = true;
        draft.followSuccess = false;
        draft.followError = '';
        break;
      case FOLLOW_SUCCESS:
        draft.followLoading = true;
        draft.followSuccess = false;
        draft.followError = '';
        break;
      case FOLLOW_ERROR:
        draft.followLoading = true;
        draft.followSuccess = false;
        draft.followError = action.error;
        break;
      case UNFOLLOW:
        draft.unfollowLoading = true;
        draft.unfollowSuccess = false;
        draft.unfollowError = '';
        break;
      case UNFOLLOW_SUCCESS:
        draft.unfollowLoading = true;
        draft.unfollowSuccess = false;
        draft.unfollowError = '';
        break;
      case UNFOLLOW_ERROR:
        draft.unfollowLoading = true;
        draft.unfollowSuccess = false;
        draft.unfollowError = action.error;
        break;
      case GET_AUTHOR_LIST:
        draft.authorList = [];
        draft.authorListLoading = true;
        draft.authorListSuccess = false;
        draft.authorListError = '';
        break;
      case GET_AUTHOR_LIST_SUCCESS:
        draft.authorList = action.data;
        draft.authorListLoading = false;
        draft.authorListSuccess = true;
        draft.authorListError = '';
        break;
      case GET_AUTHOR_LIST_ERROR:
        draft.authorListLoading = false;
        draft.authorListSuccess = false;
        draft.authorListError = action.error;
        break;
      case CAROUSEL_LIST:
        draft.carouselList = { sliderLevel1: [], sliderLevel2: [] };
        draft.carouselListLoading = true;
        draft.carouselListSuccess = false;
        draft.carouselListError = '';
        break;
      case CAROUSEL_LIST_SUCCESS:
        draft.carouselList = action.data;
        draft.carouselListLoading = false;
        draft.carouselListSuccess = true;
        draft.carouselListError = '';
        break;
      case CAROUSEL_LIST_ERROR:
        draft.carouselListLoading = false;
        draft.carouselListSuccess = false;
        draft.carouselListError = action.error;
        break;
      default:
        return state;
    }
  });

export default communityHomeReducer;

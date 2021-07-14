/*
 *
 * CommunityStatistics reducer
 *
 */
import produce from 'immer';
import {
  COUNT_CONTENT_CREATED_BY_COMMUNITY,
  COUNT_CONTENT_CREATED_BY_COMMUNITY_SUCCESS,
  COUNT_CONTENT_CREATED_BY_COMMUNITY_TABLE,
  COUNT_CONTENT_CREATED_BY_COMMUNITY_TABLE_SUCCESS,
  ANALYZE_CONTENT_VIEWED_BY_COMMUNITY,
  ANALYZE_CONTENT_VIEWED_BY_COMMUNITY_SUCCESS,
  ANALYZE_CONTENT_VIEWED_BY_COMMUNITY_TABLE,
  ANALYZE_CONTENT_VIEWED_BY_COMMUNITY_TABLE_SUCCESS,
  VIEW_ACTIVITY_COMMUNITY,
  VIEW_ACTIVITY_COMMUNITY_SUCCESS,
  COMMUNITY_STATISTICS_ERROR,
} from './constants';

export const initialState = {
  countContentCreatedByCommunity: {},
  countContentCreatedByCommunityTable: {},
  analyzeContentViewedByCommunity: {},
  analyzeContentViewedByCommunityTable: {},
  viewActivityCommunity: [],
  communityStatisticsSuccess: false,
  communityStatisticsLoading: false,
  communityStatisticsError: '',
};

/* eslint-disable default-case, no-param-reassign */
const communityStatisticsReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case COUNT_CONTENT_CREATED_BY_COMMUNITY:
        draft.countContentCreatedByCommunity = {};
        draft.communityStatisticsSuccess = false;
        draft.communityStatisticsLoading = true;
        draft.communityStatisticsError = '';
        break;
      case COUNT_CONTENT_CREATED_BY_COMMUNITY_SUCCESS:
        draft.countContentCreatedByCommunity = action.data;
        draft.communityStatisticsSuccess = true;
        draft.communityStatisticsLoading = false;
        draft.communityStatisticsError = '';
        break;
      case COUNT_CONTENT_CREATED_BY_COMMUNITY_TABLE:
        draft.countContentCreatedByCommunityTable = {};
        draft.communityStatisticsSuccess = false;
        draft.communityStatisticsLoading = true;
        draft.communityStatisticsError = '';
        break;
      case COUNT_CONTENT_CREATED_BY_COMMUNITY_TABLE_SUCCESS:
        draft.countContentCreatedByCommunityTable = action.data;
        draft.communityStatisticsSuccess = true;
        draft.communityStatisticsLoading = false;
        draft.communityStatisticsError = '';
        break;
      case ANALYZE_CONTENT_VIEWED_BY_COMMUNITY:
        draft.analyzeContentViewedByCommunity = {};
        draft.communityStatisticsSuccess = false;
        draft.communityStatisticsLoading = true;
        draft.communityStatisticsError = '';
        break;
      case ANALYZE_CONTENT_VIEWED_BY_COMMUNITY_SUCCESS:
        draft.analyzeContentViewedByCommunity = action.data;
        draft.communityStatisticsSuccess = true;
        draft.communityStatisticsLoading = false;
        draft.communityStatisticsError = '';
        break;
      case ANALYZE_CONTENT_VIEWED_BY_COMMUNITY_TABLE:
        draft.analyzeContentViewedByCommunityTable = {};
        draft.communityStatisticsSuccess = false;
        draft.communityStatisticsLoading = true;
        draft.communityStatisticsError = '';
        break;
      case ANALYZE_CONTENT_VIEWED_BY_COMMUNITY_TABLE_SUCCESS:
        draft.analyzeContentViewedByCommunityTable = action.data;
        draft.communityStatisticsSuccess = true;
        draft.communityStatisticsLoading = false;
        draft.communityStatisticsError = '';
        break;
      case VIEW_ACTIVITY_COMMUNITY:
        draft.viewActivityCommunity = [];
        draft.communityStatisticsSuccess = false;
        draft.communityStatisticsLoading = true;
        draft.communityStatisticsError = '';
        break;
      case VIEW_ACTIVITY_COMMUNITY_SUCCESS:
        draft.viewActivityCommunity = action.data;
        draft.communityStatisticsSuccess = true;
        draft.communityStatisticsLoading = false;
        draft.communityStatisticsError = '';
        break;
      case COMMUNITY_STATISTICS_ERROR:
        draft.communityStatisticsSuccess = false;
        draft.communityStatisticsLoading = false;
        draft.communityStatisticsError = action.error;
        break;
      default:
        return state;
    }
  });

export default communityStatisticsReducer;

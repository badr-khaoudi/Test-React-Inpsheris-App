/*
 *
 * Directory reducer
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
  SUGGESTION,
  SUGGESTION_SUCCESS,
  SUGGESTION_ERROR,
  SITE_FILTER_OPTIONS,
  SITE_FILTER_OPTIONS_SUCCESS,
  SITE_FILTER_OPTIONS_ERROR,
  SERVICE_FILTER_OPTIONS,
  SERVICE_FILTER_OPTIONS_SUCCESS,
  SERVICE_FILTER_OPTIONS_ERROR,
  HOBBY_FILTER_OPTIONS,
  HOBBY_FILTER_OPTIONS_SUCCESS,
  HOBBY_FILTER_OPTIONS_ERROR,
  SKILL_FILTER_OPTIONS,
  SKILL_FILTER_OPTIONS_SUCCESS,
  SKILL_FILTER_OPTIONS_ERROR,
  VARIABLE_FILTER_OPTIONS,
  VARIABLE_FILTER_OPTIONS_SUCCESS,
  VARIABLE_FILTER_OPTIONS_ERROR,
  BADGE_FILTER_OPTIONS,
  BADGE_FILTER_OPTIONS_SUCCESS,
  BADGE_FILTER_OPTIONS_ERROR,
} from './constants';

export const initialState = {
  directory: {},
  members: [],
  directoryLoading: false,
  directorySuccess: false,
  directoryError: '',
  suggestion: [],
  suggestionLoading: false,
  suggestionSuccess: false,
  suggestionError: '',
  siteFilterOptions: [],
  siteFilterOptionsLoading: false,
  siteFilterOptionsSuccess: false,
  siteFilterOptionsError: '',
  serviceFilterOptions: [],
  serviceFilterOptionsLoading: false,
  serviceFilterOptionsSuccess: false,
  serviceFilterOptionsError: '',
  hobbyFilterOptions: {},
  hobbyFilterOptionsLoading: false,
  hobbyFilterOptionsSuccess: false,
  hobbyFilterOptionsError: '',
  skillFilterOptions: {},
  skillFilterOptionsLoading: false,
  skillFilterOptionsSuccess: false,
  skillFilterOptionsError: '',
  variableFilterOptions: {},
  variableFilterOptionsLoading: false,
  variableFilterOptionsSuccess: false,
  variableFilterOptionsError: '',
  badgeFilterOptions: [],
  badgeFilterOptionsLoading: false,
  badgeFilterOptionsSuccess: false,
  badgeFilterOptionsError: '',
};

/* eslint-disable default-case, no-param-reassign */
const directoryReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case SEARCH_DIRECTORY:
        draft.directory = {};
        draft.members = [];
        draft.directoryLoading = true;
        draft.directorySuccess = false;
        draft.directoryError = '';
        break;
      case SEARCH_DIRECTORY_SUCCESS:
        draft.directory = action.response;
        draft.members = action.result;
        draft.directoryLoading = false;
        draft.directorySuccess = true;
        draft.directoryError = '';
        break;
      case SEARCH_DIRECTORY_ERROR:
        draft.directoryLoading = false;
        draft.directorySuccess = false;
        draft.directoryError = action.error;
        break;
      case SEARCH_DIRECTORY_MORE:
        draft.directoryLoading = true;
        draft.directorySuccess = false;
        draft.directoryError = '';
        break;
      case SEARCH_DIRECTORY_MORE_SUCCESS:
        draft.directory = action.response;
        draft.members = [...draft.members, ...action.result];
        draft.directoryLoading = false;
        draft.directorySuccess = true;
        draft.directoryError = '';
        break;
      case SEARCH_DIRECTORY_MORE_ERROR:
        draft.directoryLoading = false;
        draft.directorySuccess = false;
        draft.directoryError = action.error;
        break;
      case SUGGESTION:
        draft.suggestion = [];
        draft.suggestionLoading = true;
        draft.suggestionSuccess = false;
        draft.suggestionError = '';
        break;
      case SUGGESTION_SUCCESS:
        draft.suggestion = action.data;
        draft.suggestionLoading = false;
        draft.suggestionSuccess = true;
        draft.suggestionError = '';
        break;
      case SUGGESTION_ERROR:
        draft.suggestionLoading = false;
        draft.suggestionSuccess = false;
        draft.suggestionError = action.error;
        break;
      case SITE_FILTER_OPTIONS:
        draft.siteFilterOptions = [];
        draft.siteFilterOptionsLoading = true;
        draft.siteFilterOptionsSuccess = false;
        draft.siteFilterOptionsError = '';
        break;
      case SITE_FILTER_OPTIONS_SUCCESS:
        draft.siteFilterOptions = action.data;
        draft.siteFilterOptionsLoading = false;
        draft.siteFilterOptionsSuccess = true;
        draft.siteFilterOptionsError = '';
        break;
      case SITE_FILTER_OPTIONS_ERROR:
        draft.siteFilterOptionsLoading = false;
        draft.siteFilterOptionsSuccess = false;
        draft.siteFilterOptionsError = action.error;
        break;
      case SERVICE_FILTER_OPTIONS:
        draft.serviceFilterOptions = [];
        draft.serviceFilterOptionsLoading = true;
        draft.serviceFilterOptionsSuccess = false;
        draft.serviceFilterOptionsError = '';
        break;
      case SERVICE_FILTER_OPTIONS_SUCCESS:
        draft.serviceFilterOptions = action.data;
        draft.serviceFilterOptionsLoading = false;
        draft.serviceFilterOptionsSuccess = true;
        draft.serviceFilterOptionsError = '';
        break;
      case SERVICE_FILTER_OPTIONS_ERROR:
        draft.serviceFilterOptionsLoading = false;
        draft.serviceFilterOptionsSuccess = false;
        draft.serviceFilterOptionsError = action.error;
        break;
      case HOBBY_FILTER_OPTIONS:
        draft.hobbyFilterOptions = {};
        draft.hobbyFilterOptionsLoading = true;
        draft.hobbyFilterOptionsSuccess = false;
        draft.hobbyFilterOptionsError = '';
        break;
      case HOBBY_FILTER_OPTIONS_SUCCESS:
        draft.hobbyFilterOptions = action.data;
        draft.hobbyFilterOptionsLoading = false;
        draft.hobbyFilterOptionsSuccess = true;
        draft.hobbyFilterOptionsError = '';
        break;
      case HOBBY_FILTER_OPTIONS_ERROR:
        draft.hobbyFilterOptionsLoading = false;
        draft.hobbyFilterOptionsSuccess = false;
        draft.hobbyFilterOptionsError = action.error;
        break;
      case SKILL_FILTER_OPTIONS:
        draft.skillFilterOptions = {};
        draft.skillFilterOptionsLoading = true;
        draft.skillFilterOptionsSuccess = false;
        draft.skillFilterOptionsError = '';
        break;
      case SKILL_FILTER_OPTIONS_SUCCESS:
        draft.skillFilterOptions = action.data;
        draft.skillFilterOptionsLoading = false;
        draft.skillFilterOptionsSuccess = true;
        draft.skillFilterOptionsError = '';
        break;
      case SKILL_FILTER_OPTIONS_ERROR:
        draft.skillFilterOptionsLoading = false;
        draft.skillFilterOptionsSuccess = false;
        draft.skillFilterOptionsError = action.error;
        break;
      case VARIABLE_FILTER_OPTIONS:
        draft.variableFilterOptions = {};
        draft.variableFilterOptionsLoading = true;
        draft.variableFilterOptionsSuccess = false;
        draft.variableFilterOptionsError = '';
        break;
      case VARIABLE_FILTER_OPTIONS_SUCCESS:
        draft.variableFilterOptions = action.data;
        draft.variableFilterOptionsLoading = false;
        draft.variableFilterOptionsSuccess = true;
        draft.variableFilterOptionsError = '';
        break;
      case VARIABLE_FILTER_OPTIONS_ERROR:
        draft.variableFilterOptionsLoading = false;
        draft.variableFilterOptionsSuccess = false;
        draft.variableFilterOptionsError = action.error;
        break;
      case BADGE_FILTER_OPTIONS:
        draft.badgeFilterOptions = [];
        draft.badgeFilterOptionsLoading = true;
        draft.badgeFilterOptionsSuccess = false;
        draft.badgeFilterOptionsError = '';
        break;
      case BADGE_FILTER_OPTIONS_SUCCESS:
        draft.badgeFilterOptions = action.data;
        draft.badgeFilterOptionsLoading = false;
        draft.badgeFilterOptionsSuccess = true;
        draft.badgeFilterOptionsError = '';
        break;
      case BADGE_FILTER_OPTIONS_ERROR:
        draft.badgeFilterOptionsLoading = false;
        draft.badgeFilterOptionsSuccess = false;
        draft.badgeFilterOptionsError = action.error;
        break;
      default:
        return state;
    }
  });

export default directoryReducer;

/*
 *
 * MyBoard reducer
 *
 */
import produce from 'immer';
import _ from 'lodash';
import {
  PROJECTS,
  PROJECTS_SUCCESS,
  PROJECTS_ERROR,
  PROJECTS_MORE,
  PROJECTS_MORE_SUCCESS,
  PROJECTS_MORE_ERROR,
  DELETE_PROJECT,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR,
  EXPERIENCES,
  EXPERIENCES_SUCCESS,
  EXPERIENCES_ERROR,
  EXPERIENCES_MORE,
  EXPERIENCES_MORE_SUCCESS,
  EXPERIENCES_MORE_ERROR,
  DELETE_EXPERIENCE,
  DELETE_EXPERIENCE_SUCCESS,
  DELETE_EXPERIENCE_ERROR,
  ADD_PROJECT,
  ADD_EXPERIENCE,
  EDIT_PROJECT,
  EDIT_EXPERIENCE,
} from './constants';

export const initialState = {
  projects: {},
  projectsLoading: false,
  projectsSuccess: false,
  projectsError: '',
  projectsMoreLoading: false,
  projectsMoreSuccess: false,
  projectsMoreError: '',
  deleteProjectLoading: false,
  deleteProjectSuccess: false,
  deleteProjectError: '',
  experiences: {},
  experiencesLoading: false,
  experiencesSuccess: false,
  experiencesError: '',
  experiencesMoreLoading: false,
  experiencesMoreSuccess: false,
  experiencesMoreError: '',
  deleteExperienceLoading: false,
  deleteExperienceSuccess: false,
  deleteExperienceError: '',
};

/* eslint-disable default-case, no-param-reassign */
const myBoardReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case PROJECTS:
        draft.projects = {};
        draft.projectsLoading = true;
        draft.projectsSuccess = false;
        draft.projectsError = '';
        break;
      case PROJECTS_SUCCESS:
        draft.projects = action.data;
        draft.projectsLoading = false;
        draft.projectsSuccess = true;
        draft.projectsError = '';
        break;
      case PROJECTS_ERROR:
        draft.projectsLoading = false;
        draft.projectsSuccess = false;
        draft.projectsError = action.error;
        break;
      case PROJECTS_MORE:
        draft.projectsMoreLoading = true;
        draft.projectsMoreSuccess = false;
        draft.projectsMoreError = '';
        break;
      case PROJECTS_MORE_SUCCESS:
        draft.projects.rows = [...draft.projects.rows, ...action.data.rows];
        draft.projectsMoreLoading = false;
        draft.projectsMoreSuccess = true;
        draft.projectsMoreError = '';
        break;
      case PROJECTS_MORE_ERROR:
        draft.projectsMoreLoading = false;
        draft.projectsMoreSuccess = false;
        draft.projectsMoreError = action.error;
        break;
      case DELETE_PROJECT:
        draft.deleteProjectLoading = true;
        draft.deleteProjectSuccess = false;
        draft.deleteProjectError = '';
        break;
      case DELETE_PROJECT_SUCCESS:
        draft.projects = {
          total: draft.projects.total - 1,
          rows: _.filter(
            draft.projects.rows,
            row => row.id !== action.options.id,
          ),
        };
        draft.deleteProjectLoading = false;
        draft.deleteProjectSuccess = true;
        draft.deleteProjectError = '';
        break;
      case DELETE_PROJECT_ERROR:
        draft.deleteProjectLoading = false;
        draft.deleteProjectSuccess = false;
        draft.deleteProjectError = action.error;
        break;
      case EXPERIENCES:
        draft.experiences = {};
        draft.experiencesLoading = true;
        draft.experiencesSuccess = false;
        draft.experiencesError = '';
        break;
      case EXPERIENCES_SUCCESS:
        draft.experiences = action.data;
        draft.experiencesLoading = false;
        draft.experiencesSuccess = true;
        draft.experiencesError = '';
        break;
      case EXPERIENCES_ERROR:
        draft.experiencesLoading = false;
        draft.experiencesSuccess = false;
        draft.experiencesError = action.error;
        break;
      case EXPERIENCES_MORE:
        draft.experiencesMoreLoading = true;
        draft.experiencesMoreSuccess = false;
        draft.experiencesMoreError = '';
        break;
      case EXPERIENCES_MORE_SUCCESS:
        draft.experiences.rows = [
          ...draft.experiences.rows,
          ...action.data.rows,
        ];
        draft.experiencesMoreLoading = false;
        draft.experiencesMoreSuccess = true;
        draft.experiencesMoreError = '';
        break;
      case EXPERIENCES_MORE_ERROR:
        draft.experiencesMoreLoading = false;
        draft.experiencesMoreSuccess = false;
        draft.experiencesMoreError = action.error;
        break;
      case DELETE_EXPERIENCE:
        draft.deleteExperienceLoading = true;
        draft.deleteExperienceSuccess = false;
        draft.deleteExperienceError = '';
        break;
      case DELETE_EXPERIENCE_SUCCESS:
        draft.experiences = {
          total: draft.experiences.total - 1,
          rows: _.filter(
            draft.experiences.rows,
            row => row.id !== action.options.id,
          ),
        };
        draft.deleteExperienceLoading = false;
        draft.deleteExperienceSuccess = true;
        draft.deleteExperienceError = '';
        break;
      case DELETE_EXPERIENCE_ERROR:
        draft.deleteExperienceLoading = false;
        draft.deleteExperienceSuccess = false;
        draft.deleteExperienceError = action.error;
        break;
      case ADD_PROJECT:
        draft.projects = {
          total: draft.projects.total + 1,
          rows: [...draft.projects.rows, action.data],
        };
        break;
      case ADD_EXPERIENCE:
        draft.experiences = {
          total: draft.experiences.total + 1,
          rows: [...draft.experiences.rows, action.data],
        };
        break;
      case EDIT_PROJECT:
        draft.projects.rows = _.map(draft.projects.rows, row =>
          row.id === action.params.id ? action.data : row,
        );
        break;
      case EDIT_EXPERIENCE:
        draft.experiences.rows = _.map(draft.experiences.rows, row =>
          row.id === action.params.id ? action.data : row,
        );
        break;
      default:
        return state;
    }
  });

export default myBoardReducer;

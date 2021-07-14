/*
 *
 * MyBoard actions
 *
 */

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

export function projects(options) {
  return {
    type: PROJECTS,
    options,
  };
}

export function projectsSuccess(data) {
  return {
    type: PROJECTS_SUCCESS,
    data,
  };
}

export function projectsError(error) {
  return {
    type: PROJECTS_ERROR,
    error,
  };
}

export function projectsMore(options) {
  return {
    type: PROJECTS_MORE,
    options,
  };
}

export function projectsMoreSuccess(data) {
  return {
    type: PROJECTS_MORE_SUCCESS,
    data,
  };
}

export function projectsMoreError(error) {
  return {
    type: PROJECTS_MORE_ERROR,
    error,
  };
}

export function deleteProject(options) {
  return {
    type: DELETE_PROJECT,
    options,
  };
}

export function deleteProjectSuccess(options) {
  return {
    type: DELETE_PROJECT_SUCCESS,
    options,
  };
}

export function deleteProjectError(error) {
  return {
    type: DELETE_PROJECT_ERROR,
    error,
  };
}

export function experiences(options) {
  return {
    type: EXPERIENCES,
    options,
  };
}

export function experiencesSuccess(data) {
  return {
    type: EXPERIENCES_SUCCESS,
    data,
  };
}

export function experiencesError(error) {
  return {
    type: EXPERIENCES_ERROR,
    error,
  };
}

export function experiencesMore(options) {
  return {
    type: EXPERIENCES_MORE,
    options,
  };
}

export function experiencesMoreSuccess(data) {
  return {
    type: EXPERIENCES_MORE_SUCCESS,
    data,
  };
}

export function experiencesMoreError(error) {
  return {
    type: EXPERIENCES_MORE_ERROR,
    error,
  };
}

export function deleteExperience(options) {
  return {
    type: DELETE_EXPERIENCE,
    options,
  };
}

export function deleteExperienceSuccess(options) {
  return {
    type: DELETE_EXPERIENCE_SUCCESS,
    options,
  };
}

export function deleteExperienceError(error) {
  return {
    type: DELETE_EXPERIENCE_ERROR,
    error,
  };
}

export function addProject(data) {
  return {
    type: ADD_PROJECT,
    data,
  };
}

export function addExperience(data) {
  return {
    type: ADD_EXPERIENCE,
    data,
  };
}

export function editProject(params, data) {
  return {
    type: EDIT_PROJECT,
    params,
    data,
  };
}

export function editExperience(params, data) {
  return {
    type: EDIT_EXPERIENCE,
    params,
    data,
  };
}

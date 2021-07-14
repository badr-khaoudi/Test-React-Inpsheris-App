import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the contentCreation state domain
 */

const selectContentCreationDomain = state =>
  state.contentCreation || initialState;

const makeSelectUploadFile = () =>
  createSelector(
    selectContentCreationDomain,
    globalState => globalState.uploadFile,
  );

const makeSelectUserCommunity = () =>
  createSelector(
    selectContentCreationDomain,
    globalState => globalState.userCommunity,
  );

const makeSelectTemplateType = () =>
  createSelector(
    selectContentCreationDomain,
    globalState => globalState.templateType,
  );

const makeSelectContentSuccess = () =>
  createSelector(
    selectContentCreationDomain,
    globalState => globalState.contentSuccess,
  );

const makeSelectContentDetails = () =>
  createSelector(
    selectContentCreationDomain,
    globalState => globalState.contentDetails,
  );

const makeSelectContentLoading = () =>
  createSelector(
    selectContentCreationDomain,
    globalState => globalState.contentLoading,
  );

// const makeSelectContentCreation = () =>
//   createSelector(
//     selectContentCreationDomain,
//     substate => substate,
//   );

// export default makeSelectContentCreation;
export {
  makeSelectUploadFile,
  makeSelectUserCommunity,
  makeSelectTemplateType,
  makeSelectContentSuccess,
  makeSelectContentDetails,
  makeSelectContentLoading,
};

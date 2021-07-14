import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the videoBlock state domain
 */

const selectVideoBlockDomain = state => state.videoBlock || initialState;

const makeSelectUploadFile = () =>
  createSelector(
    selectVideoBlockDomain,
    globalState => globalState.uploadFile,
  );

const makeSelectFileStack = () =>
  createSelector(
    selectVideoBlockDomain,
    globalState => globalState.fileStack,
  );

const makeSelectSaveVideoFileStack = () =>
  createSelector(
    selectVideoBlockDomain,
    globalState => globalState.saveVideoFileStack,
  );

// const makeSelectVideoBlock = () =>
//   createSelector(
//     selectVideoBlockDomain,
//     substate => substate,
//   );

// export default makeSelectVideoBlock;
export {
  makeSelectUploadFile,
  makeSelectFileStack,
  makeSelectSaveVideoFileStack,
};

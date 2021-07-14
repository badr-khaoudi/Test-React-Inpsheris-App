/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put } from 'redux-saga/effects';
import {
  GET_LANGUAGE,
  GET_CONFIG,
  GET_CURRENT_USER,
} from 'containers/AuthBase/constants';
import {
  getLanguageSuccess,
  getLanguageError,
  getConfigSuccess,
  getConfigError,
  getCurrentUserSuccess,
  getCurrentUserError,
} from 'containers/AuthBase/actions';

import authBaseSaga, { getLanguage, getConfig, getCurrentUser } from '../saga';

describe('getLanguage Saga', () => {
  let getLanguageGenerator;
  beforeEach(() => {
    getLanguageGenerator = getLanguage();

    const callDescriptor = getLanguageGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the getLanguageSuccess action if it requests the data successfully', () => {
    const languageList = [
      {
        code: 'fr',
        name: 'French',
        active: true,
        translationService: {
          name: 'GOOGLE_TRANSLATE',
        },
        isShowOnHeader: true,
      },
    ];
    const response = {
      data: languageList,
    };
    const putDescriptor = getLanguageGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(getLanguageSuccess(languageList)));
  });

  it('should dispatch getLanguageError action if the response errors', () => {
    const response = new Error('Error');
    const putDescriptor = getLanguageGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(getLanguageError('Error')));
  });
});
describe('getConfig Saga', () => {
  let getConfigGenerator;
  beforeEach(() => {
    getConfigGenerator = getConfig();

    const callDescriptor = getConfigGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the getConfigSuccess action if it requests the data successfully', () => {
    const configList = [
      {
        name: 'ADD_WIDGET_VIDEO_ACTIVITY_REPORT',
        value: true,
        type: 'Boolean',
      },
      {
        name: 'ALERT_MODULE',
        value: false,
        type: 'Boolean',
      },
      {
        name: 'ALLOW_CHANGE_PASSWORD',
        value: true,
        type: 'Boolean',
      },
    ];
    const response = {
      data: configList,
    };
    const putDescriptor = getConfigGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(getConfigSuccess(configList)));
  });

  it('should dispatch getConfigError action if the response errors', () => {
    const response = new Error('Error');
    const putDescriptor = getConfigGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(getConfigError('Error')));
  });
});

/* eslint-disable redux-saga/yield-effects */
describe('authBaseSaga Saga', () => {
  it('should start task to watch for GET_LANGUAGE action', () => {
    const takeLatestDescriptor = authBase.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(GET_LANGUAGE, getLanguage));
  });

  it('should start task to watch for GET_CONFIG action', () => {
    const takeLatestDescriptor = authBase.next().value;
    expect(takeLatestDescriptor).toEqual(takeLatest(GET_CONFIG, getConfig));
  });

  const authBase = authBaseSaga();
  it('should start task to watch for GET_CURRENT_USER action', () => {
    const takeLatestDescriptor = authBase.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(GET_CURRENT_USER, getCurrentUser),
    );
  });

  let getCurrentUserGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getCurrentUserGenerator = getCurrentUser();

    const currentUserSelectDescriptor = getCurrentUserGenerator.next().value;
    expect(currentUserSelectDescriptor).toMatchSnapshot();
  });

  it('should dispatch the getCurrentUserSuccess action if it requests the data successfully', () => {
    const user = [
      {
        uid: '44dbfcc3-e56d-11e3-8753-00ff8d55064b',
        login: 'user2',
        displayName: 'Alexandre Collet',
        firstName: 'Alexandre',
        lastName: 'Collet',
        role: 'GlobalCommunityManager',
        email: 'projects@inspheris.com',
      },
    ];
    const response = {
      data: user,
    };
    const putDescriptor = getCurrentUserGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(getCurrentUserSuccess(user)));
  });

  it('should call the getCurrentUserError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getCurrentUserGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(getCurrentUserError(response)));
  });
});

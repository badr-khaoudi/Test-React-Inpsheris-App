/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { CHECK_SESSION } from 'containers/AuthBase/constants';
import {
  checkSessionSuccess,
  checkSessionError,
} from 'containers/AuthBase/actions';

import privateRouteSaga, { checkSession } from '../saga';

describe('checkSession Saga', () => {
  let checkSessionGenerator;
  beforeEach(() => {
    checkSessionGenerator = checkSession();

    const callDescriptor = checkSessionGenerator.next().value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch checkSessionSuccess action if session status is alive', () => {
    const session = {
      status: 'alive',
      authType: '',
    };
    const response = {
      data: session,
    };
    const putDescriptor = checkSessionGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(checkSessionSuccess(session)));
  });

  it('should dispatch checkSessionError action if session status is alive', () => {
    const session = {
      status: 'notlogin',
      authType: '',
    };
    const response = {
      data: session,
    };
    const putDescriptor = checkSessionGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(checkSessionError('Error')));
    const putPushDescriptor = checkSessionGenerator.next().value;
    expect(putPushDescriptor).toEqual(put(push('/login')));
  });

  it('should dispatch checkSessionError action if the response errors', () => {
    const response = new Error('Error');
    const putDescriptor = checkSessionGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(checkSessionError('Error')));
  });
});

describe('privateRouteSaga Saga', () => {
  const privateRoute = privateRouteSaga();
  it('should start task to watch for CHECK_SESSION action', () => {
    const takeLatestDescriptor = privateRoute.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CHECK_SESSION, checkSession),
    );
  });
});

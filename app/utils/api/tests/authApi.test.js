import axios from 'axios';
import {
  checkSession,
  languageList,
  configList,
  currentUser,
} from '../AuthApi';

jest.mock('axios');

describe('checkSession', () => {
  it('fetches data successfully', async () => {
    const session = { status: 'notlogin', authType: '' };
    const data = {
      data: session,
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(checkSession()).resolves.toEqual(data);
    expect(axios.get).toHaveBeenCalledWith('/api/session/check');
  });

  it('fetches data erroneously', async () => {
    const error = new Error('Network Error');
    axios.get.mockImplementationOnce(() => Promise.reject(error));
    await expect(checkSession()).rejects.toThrow(error);
    expect(axios.get).toHaveBeenCalledWith('/api/session/check');
  });
});

describe('languageList', () => {
  it('fetches data successfully', async () => {
    const list = [
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
    const data = {
      data: list,
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(languageList()).resolves.toEqual(data);
    expect(axios.get).toHaveBeenCalledWith('/api/language/list');
  });

  it('fetches data erroneously', async () => {
    const error = new Error('Network Error');
    axios.get.mockImplementationOnce(() => Promise.reject(error));
    await expect(languageList()).rejects.toThrow(error);
    expect(axios.get).toHaveBeenCalledWith('/api/language/list');
  });
});

describe('configList', () => {
  it('fetches data successfully', async () => {
    const list = [
      {
        name: 'ADD_WIDGET_VIDEO_ACTIVITY_REPORT',
        value: true,
        type: 'Boolean',
      },
    ];
    const data = {
      data: list,
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(configList()).resolves.toEqual(data);
    expect(axios.get).toHaveBeenCalledWith('/api/config/list');
  });

  it('fetches data erroneously', async () => {
    const error = new Error('Network Error');
    axios.get.mockImplementationOnce(() => Promise.reject(error));
    await expect(configList()).rejects.toThrow(error);
    expect(axios.get).toHaveBeenCalledWith('/api/config/list');
  });
});

describe('currentUser', () => {
  it('fetches data successfully', async () => {
    const mock = [
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
    const data = {
      data: mock,
    };
    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(currentUser()).resolves.toEqual(data);
    expect(axios.get).toHaveBeenCalledWith('/api/user/current');
  });

  it('fetches data erroneously', async () => {
    const error = new Error('Network Error');
    axios.get.mockImplementationOnce(() => Promise.reject(error));
    await expect(currentUser()).rejects.toThrow(error);
    expect(axios.get).toHaveBeenCalledWith('/api/user/current');
  });
});

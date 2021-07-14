import {
  checkSession,
  checkSessionSuccess,
  checkSessionError,
  getLanguage,
  getLanguageSuccess,
  getLanguageError,
  getConfig,
  getConfigSuccess,
  getConfigError,
  getCurrentUser,
  getCurrentUserSuccess,
  getCurrentUserError,
} from '../actions';

import {
  CHECK_SESSION,
  CHECK_SESSION_SUCCESS,
  CHECK_SESSION_ERROR,
  GET_LANGUAGE,
  GET_LANGUAGE_SUCCESS,
  GET_LANGUAGE_ERROR,
  GET_CONFIG,
  GET_CONFIG_SUCCESS,
  GET_CONFIG_ERROR,
  GET_CURRENT_USER,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_ERROR,
} from '../constants';

describe('AuthBase actions', () => {
  describe('checkSession', () => {
    it('should return the correct type', () => {
      const expected = {
        type: CHECK_SESSION,
      };
      expect(checkSession()).toEqual(expected);
    });
  });

  describe('checkSessionSuccess', () => {
    it('should return the correct type and the session', () => {
      const fixture = {
        status: 'alive',
        authType: '',
      };
      const expected = {
        type: CHECK_SESSION_SUCCESS,
        data: fixture,
      };
      expect(checkSessionSuccess(fixture)).toEqual(expected);
    });
  });

  describe('checkSessionError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Error',
      };
      const expected = {
        type: CHECK_SESSION_ERROR,
        error: fixture,
      };
      expect(checkSessionError(fixture)).toEqual(expected);
    });
  });

  describe('getLanguage', () => {
    it('should return the correct type', () => {
      const expected = {
        type: GET_LANGUAGE,
      };
      expect(getLanguage()).toEqual(expected);
    });
  });

  describe('getLanguageSuccess', () => {
    it('should return the correct type and the session', () => {
      const fixture = [
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
      const expected = {
        type: GET_LANGUAGE_SUCCESS,
        data: fixture,
      };
      expect(getLanguageSuccess(fixture)).toEqual(expected);
    });
  });

  describe('getLanguageError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Error',
      };
      const expected = {
        type: GET_LANGUAGE_ERROR,
        error: fixture,
      };
      expect(getLanguageError(fixture)).toEqual(expected);
    });
  });

  describe('getConfig', () => {
    it('should return the correct type', () => {
      const expected = {
        type: GET_CONFIG,
      };
      expect(getConfig()).toEqual(expected);
    });
  });

  describe('getConfigSuccess', () => {
    it('should return the correct type and the session', () => {
      const fixture = [
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
      const expected = {
        type: GET_CONFIG_SUCCESS,
        data: fixture,
      };
      expect(getConfigSuccess(fixture)).toEqual(expected);
    });
  });

  describe('getConfigError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Error',
      };
      const expected = {
        type: GET_CONFIG_ERROR,
        error: fixture,
      };
      expect(getConfigError(fixture)).toEqual(expected);
    });
  });
  describe('getCurrentUser', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: GET_CURRENT_USER,
      };

      expect(getCurrentUser()).toEqual(expectedResult);
    });
  });

  describe('getCurrentUserSuccess', () => {
    it('should return the correct type and the passed data', () => {
      const fixture = [
        {
          uid: '44dbfcc3-e56d-11e3-8753-00ff8d55064b',
          login: 'user2',
          displayName: 'Alexandre Collet',
          firstName: 'Alexandre',
          lastName: 'Collet',
          role: 'GlobalCommunityManager',
        },
      ];
      const expectedResult = {
        type: GET_CURRENT_USER_SUCCESS,
        data: fixture,
      };

      expect(getCurrentUserSuccess(fixture)).toEqual(expectedResult);
    });
  });

  describe('getCurrentUserError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: GET_CURRENT_USER_ERROR,
        error: fixture,
      };

      expect(getCurrentUserError(fixture)).toEqual(expectedResult);
    });
  });
});

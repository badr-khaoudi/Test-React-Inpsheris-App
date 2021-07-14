import produce from 'immer';
import authBaseReducer from '../reducer';
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

/* eslint-disable default-case, no-param-reassign */
describe('authBaseReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      session: {},
      checkSessionLoading: false,
      checkSessionSuccess: false,
      checkSessionError: '',
      language: [],
      getLanguageLoading: false,
      getLanguageSuccess: false,
      getLanguageError: '',
      config: [],
      getConfigLoading: true,
      getConfigSuccess: false,
      getConfigError: '',
      currentUser: {},
      getCurrentUserLoading: true,
      getCurrentUserSuccess: false,
      getCurrentUserError: {},
    };
  });

  it('returns the initial state', () => {
    const expectedResult = state;
    expect(authBaseReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the checkSession action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.session = {};
      draft.checkSessionLoading = true;
      draft.checkSessionSuccess = false;
      draft.checkSessionError = '';
    });
    expect(authBaseReducer(state, checkSession())).toEqual(expectedResult);
  });

  it('should handle the checkSessionSuccess action correctly', () => {
    const fixture = {
      status: 'alive',
      authType: '',
    };
    const expectedResult = produce(state, draft => {
      draft.session = fixture;
      draft.checkSessionLoading = false;
      draft.checkSessionSuccess = true;
      draft.checkSessionError = '';
    });

    expect(authBaseReducer(state, checkSessionSuccess(fixture))).toEqual(
      expectedResult,
    );
  });
  it('should handle the getCurrentUser action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.getCurrentUserLoading = true;
      draft.getCurrentUserSuccess = false;
      draft.getCurrentUserError = {};
    });

    expect(authBaseReducer(state, getCurrentUser())).toEqual(expectedResult);
  });

  it('should handle the getCurrentUserSuccess action correctly', () => {
    const fixture = [
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
    const expectedResult = produce(state, draft => {
      draft.currentUser = fixture;
      draft.getCurrentUserLoading = false;
      draft.getCurrentUserSuccess = true;
    });

    expect(authBaseReducer(state, getCurrentUserSuccess(fixture))).toEqual(
      expectedResult,
    );
  });
  it('should handle the checkSessionError action correctly', () => {
    const fixture = {
      msg: 'Error',
    };
    const expectedResult = produce(state, draft => {
      draft.checkSessionLoading = false;
      draft.checkSessionSuccess = false;
      draft.checkSessionError = fixture;
    });

    expect(authBaseReducer(state, checkSessionError(fixture))).toEqual(
      expectedResult,
    );
  });
  it('should handle the getCurrentUserError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    const expectedResult = produce(state, draft => {
      draft.getCurrentUserLoading = false;
      draft.getCurrentUserSuccess = false;
      draft.getCurrentUserError = fixture;
    });

    expect(authBaseReducer(state, getCurrentUserError(fixture))).toEqual(
      expectedResult,
    );
  });
  it('should handle the getLanguage action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.language = [];
      draft.getLanguageLoading = true;
      draft.getLanguageSuccess = false;
      draft.getLanguageError = '';
    });

    expect(authBaseReducer(state, getLanguage())).toEqual(expectedResult);
  });

  it('should handle the getLanguageSuccess action correctly', () => {
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
    const expectedResult = produce(state, draft => {
      draft.language = fixture;
      draft.getLanguageLoading = false;
      draft.getLanguageSuccess = true;
      draft.getLanguageError = '';
    });

    expect(authBaseReducer(state, getLanguageSuccess(fixture))).toEqual(
      expectedResult,
    );
  });
  it('should handle the getLanguageError action correctly', () => {
    const fixture = {
      msg: 'Error',
    };
    const expectedResult = produce(state, draft => {
      draft.getLanguageLoading = false;
      draft.getLanguageSuccess = false;
      draft.getLanguageError = fixture;
    });

    expect(authBaseReducer(state, getLanguageError(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the getConfig action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.config = [];
      draft.getConfigLoading = true;
      draft.getConfigSuccess = false;
      draft.getConfigError = '';
    });

    expect(authBaseReducer(state, getConfig())).toEqual(expectedResult);
  });

  it('should handle the getConfigSuccess action correctly', () => {
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
    const expectedResult = produce(state, draft => {
      draft.config = fixture;
      draft.getConfigLoading = false;
      draft.getConfigSuccess = true;
      draft.getConfigError = '';
    });

    expect(authBaseReducer(state, getConfigSuccess(fixture))).toEqual(
      expectedResult,
    );
  });

  it('should handle the getConfigError action correctly', () => {
    const fixture = {
      msg: 'Error',
    };
    const expectedResult = produce(state, draft => {
      draft.getConfigLoading = false;
      draft.getConfigSuccess = false;
      draft.getConfigError = fixture;
    });

    expect(authBaseReducer(state, getConfigError(fixture))).toEqual(
      expectedResult,
    );
  });
});

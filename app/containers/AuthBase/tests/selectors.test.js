import {
  selectAuthBaseDomain,
  makeSelectSession,
  checkSessionSuccess,
  checkSessionLoading,
  // makeSelectCommunityListPageByGroup,
  makeSelectCommunityListPageDesign,
  // makeSelectCommunityListPageOrderBy,
  makeSelectYammerIntegration,
  makeSelectCurrentUser,
  makeSelectLanguage,
  makeSelectGetCurrentUserError,
  makeSelectGetCurrentUserLoading,
  makeSelectConfigError,
  makeSelectConfigLoading,
  makeSelectMicrosoftIntegration,
  makeSelectDocumentBar,
  makeSelectLanguageTranslationControl,
  makeSelectAllowChangePassword,
  makeSelectQuickSharingOfLinkLikeQuickpost,
  makeSelectAlertModule,
  makeSelectNoteTheService,
} from '../selectors';

describe('selectAuthBaseDomain', () => {
  it('should select the authBase', () => {
    const authBase = {};
    const mockedState = {
      authBase,
    };
    expect(selectAuthBaseDomain(mockedState)).toEqual(authBase);
  });
});

describe('selectCurrentUser', () => {
  it('should select the currentUser', () => {
    const currentUser = {
      uid: '44dbfcc3-e56d-11e3-8753-00ff8d55064b',
      login: 'user2',
      displayName: 'Alexandre Collet',
      firstName: 'Alexandre',
      lastName: 'Collet',
      role: 'GlobalCommunityManager',
      email: 'projects@inspheris.com',
    };

    const mockedState = {
      authBase: { currentUser },
    };
    expect(makeSelectCurrentUser()(mockedState)).toEqual(currentUser);
  });
});

describe('selectGetCurrentUserError', () => {
  it('should select the currentUser', () => {
    const getCurrentUserError = [
      {
        name: 'Error',
      },
    ];

    const mockedState = {
      authBase: { getCurrentUserError },
    };
    expect(makeSelectGetCurrentUserError()(mockedState)).toEqual(
      getCurrentUserError,
    );
  });
});

describe('selectGetCurrentUserLoading', () => {
  it('should select the currentUser', () => {
    const getCurrentUserLoading = true;

    const mockedState = {
      authBase: { getCurrentUserLoading },
    };
    expect(makeSelectGetCurrentUserLoading()(mockedState)).toEqual(
      getCurrentUserLoading,
    );
  });
});

describe('selectGetConfigError', () => {
  it('should select the currentUser', () => {
    const getConfigError = [
      {
        name: 'Error',
      },
    ];

    const mockedState = {
      authBase: { getConfigError },
    };
    expect(makeSelectConfigError()(mockedState)).toEqual(getConfigError);
  });
});

describe('selectGetConfigLoading', () => {
  it('should select the Config', () => {
    const getConfigLoading = true;

    const mockedState = {
      authBase: { getConfigLoading },
    };
    expect(makeSelectConfigLoading()(mockedState)).toEqual(getConfigLoading);
  });
});

describe('makeSelectSession', () => {
  const sessionSelector = makeSelectSession();
  it('should select the session', () => {
    const session = {
      status: 'alive',
      authType: '',
    };
    const mockedState = {
      authBase: { session },
    };
    expect(sessionSelector(mockedState)).toEqual(session);
  });
});
describe('makeSelectLanguage', () => {
  const LanguageSelector = makeSelectLanguage();
  it('should select the Language', () => {
    const language = [
      {
        code: 'fr',
        name: 'French',
        active: true,
        translationService: {
          name: 'GOOGLE_TRANSLATE',
        },
        isShowOnHeader: true,
      },
      {
        code: 'en',
        name: 'English',
        active: true,
        translationService: {
          name: 'GOOGLE_TRANSLATE',
        },
        isShowOnHeader: true,
      },
    ];

    const mockedState = {
      authBase: { language },
    };
    expect(LanguageSelector(mockedState)).toEqual(language);
  });
});

describe('checkSessionSuccess', () => {
  const sessionSuccessSelector = checkSessionSuccess();
  it('should select the checkSessionSuccess', () => {
    const sessionSuccess = true;
    const mockedState = {
      authBase: { checkSessionSuccess: sessionSuccess },
    };
    expect(sessionSuccessSelector(mockedState)).toEqual(sessionSuccess);
  });
});

describe('checkSessionLoading', () => {
  const sessionLoadingSelector = checkSessionLoading();
  it('should select the checkSessionLoading', () => {
    const sessionLoading = true;
    const mockedState = {
      authBase: { checkSessionLoading: sessionLoading },
    };
    expect(sessionLoadingSelector(mockedState)).toEqual(sessionLoading);
  });
});

// describe('makeSelectCommunityListPageByGroup', () => {
//   const communityListPageByGroupSelector = makeSelectCommunityListPageByGroup();
//   it('should select the communityListPageByGroup', () => {
//     const communityListPageByGroup = {
//       name: 'COMMUNITY_LIST_PAGE_BY_GROUP',
//       value: false,
//       type: 'Boolean',
//     };
//     const mockedState = {
//       authBase: { config: [communityListPageByGroup] },
//     };
//     expect(communityListPageByGroupSelector(mockedState)).toEqual(
//       communityListPageByGroup,
//     );
//   });
// });

describe('makeSelectCommunityListPageDesign', () => {
  const communityListPageDesignSelector = makeSelectCommunityListPageDesign();
  it('should select the communityListPageDesign', () => {
    const communityListPageDesign = {
      name: 'COMMUNITY_LIST_PAGE_DESIGN',
      value: 'Favorite',
      type: 'String',
    };
    const mockedState = {
      authBase: { config: [communityListPageDesign] },
    };
    expect(communityListPageDesignSelector(mockedState)).toEqual(
      communityListPageDesign,
    );
  });
});

// describe('makeSelectCommunityListPageOrderBy', () => {
//   const communityListPageOrderBySelector = makeSelectCommunityListPageOrderBy();
//   it('should select the communityListPageOrderBy', () => {
//     const communityListPageOrderBy = {
//       name: 'COMMUNITY_LIST_PAGE_ORDER_BY',
//       value: 'alphabet',
//       type: 'String',
//     };
//     const mockedState = {
//       authBase: { config: [communityListPageOrderBy] },
//     };
//     expect(communityListPageOrderBySelector(mockedState)).toEqual(
//       communityListPageOrderBy,
//     );
//   });
// });

describe('makeSelectYammerIntegration', () => {
  const yammerIntegrationSelector = makeSelectYammerIntegration();
  it('should select the yammerIntegration', () => {
    const yammerIntegration = {
      name: 'YAMMER_INTEGRATION',
      value: true,
      type: 'Boolean',
    };
    const mockedState = {
      authBase: { config: [yammerIntegration] },
    };
    expect(yammerIntegrationSelector(mockedState)).toEqual(yammerIntegration);
  });

  describe('makeSelectMicrosoftIntegration', () => {
    const microsoftIntegrationSelector = makeSelectMicrosoftIntegration();
    it('should select the microsoftIntegration', () => {
      const microsoftIntegration = {
        name: 'MICROSOFT_INTEGRATION',
        value: true,
        type: 'Boolean',
      };
      const mockedState = {
        authBase: { config: [microsoftIntegration] },
      };
      expect(microsoftIntegrationSelector(mockedState)).toEqual(
        microsoftIntegration,
      );
    });
  });

  describe('makeSelectDocumentBar', () => {
    const documentBarSelector = makeSelectDocumentBar();
    it('should select the documentBar', () => {
      const documentBar = {
        name: 'DOCUMENT_BAR',
        value: true,
        type: 'Boolean',
      };
      const mockedState = {
        authBase: { config: [documentBar] },
      };
      expect(documentBarSelector(mockedState)).toEqual(documentBar);
    });
  });

  describe('makeSelectLanguageTranslationControl', () => {
    const languageTranslationSelector = makeSelectLanguageTranslationControl();
    it('should select the languageTranslation', () => {
      const languageTranslation = {
        name: 'LANGUAGE_TRANSLATION_CONTROL',
        value: true,
        type: 'Boolean',
      };
      const mockedState = {
        authBase: { config: [languageTranslation] },
      };
      expect(languageTranslationSelector(mockedState)).toEqual(
        languageTranslation,
      );
    });
  });

  describe('makeSelectAllowChangePassword', () => {
    const allowChangePasswordSelector = makeSelectAllowChangePassword();
    it('should select the allowChangePassword', () => {
      const allowChangePassword = {
        name: 'ALLOW_CHANGE_PASSWORD',
        value: true,
        type: 'Boolean',
      };
      const mockedState = {
        authBase: { config: [allowChangePassword] },
      };
      expect(allowChangePasswordSelector(mockedState)).toEqual(
        allowChangePassword,
      );
    });
  });

  describe('makeSelectQuickSharingOfLinkLikeQuickpost', () => {
    const quickSharingOfLinkLikeQuickpostSelector = makeSelectQuickSharingOfLinkLikeQuickpost();
    it('should select the quickSharingOfLinkLikeQuickpost', () => {
      const quickSharingOfLinkLikeQuickpost = {
        name: 'QUICK_SHARING_OF_LINK_LIKE_QUICKPOST',
        value: true,
        type: 'Boolean',
      };
      const mockedState = {
        authBase: { config: [quickSharingOfLinkLikeQuickpost] },
      };
      expect(quickSharingOfLinkLikeQuickpostSelector(mockedState)).toEqual(
        quickSharingOfLinkLikeQuickpost,
      );
    });
  });
  describe('makeSelectAlertModule', () => {
    const alertModuleQuickpostSelector = makeSelectAlertModule();
    it('should select the alertModuleQuickpost', () => {
      const alertModuleQuickpost = {
        name: 'ALERT_MODULE',
        value: true,
        type: 'Boolean',
      };
      const mockedState = {
        authBase: { config: [alertModuleQuickpost] },
      };
      expect(alertModuleQuickpostSelector(mockedState)).toEqual(
        alertModuleQuickpost,
      );
    });
  });
  describe('makeSelectNoteTheService', () => {
    const noteTheServiceSelector = makeSelectNoteTheService();
    it('should select the noteTheService', () => {
      const noteTheService = {
        name: 'NOTE_THE_SERVICE',
        value: true,
        type: 'Boolean',
      };
      const mockedState = {
        authBase: { config: [noteTheService] },
      };
      expect(noteTheServiceSelector(mockedState)).toEqual(noteTheService);
    });
  });
});

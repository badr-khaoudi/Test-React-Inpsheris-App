import _ from 'lodash';
import { createSelector } from 'reselect';
import { denormalize } from 'normalizr';
import { communitySchema } from 'utils/normalizrSchema/feed';
import selectGlobalEntitiesDomain from 'containers/GlobalEntities/selectors';

import { initialState } from './reducer';

/**
 * Direct selector to the authBase state domain
 */

const selectAuthBaseDomain = state => state.authBase || initialState;

/**
 * Session selector
 */

const makeSelectSession = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.session,
  );

const checkSessionSuccess = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.checkSessionSuccess,
  );

const checkSessionLoading = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.checkSessionLoading,
  );

const makeSelectLanguage = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.language,
  );

const makeSelectCustomTemplateList = name =>
  createSelector(
    selectAuthBaseDomain,
    globalState => _.find(globalState.customTemplateList, { name }),
  );

const makeSelectCommunityListPageDesign = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState =>
      _.find(globalState.config, { name: 'COMMUNITY_LIST_PAGE_DESIGN' }),
  );

const makeSelectYammerIntegration = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => _.find(globalState.config, { name: 'YAMMER_INTEGRATION' }),
  );

const makeSelectFaqTab = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => _.find(globalState.config, { name: 'FAQ_TAB' }),
  );

const makeSelectPinCommunityPost = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => _.find(globalState.config, { name: 'PIN_COMMUNITY_POST' }),
  );

const makeSelectViewNotificationByCommunity = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState =>
      _.find(globalState.config, { name: 'VIEW_NOTIFICATION_BY_COMMUNITY' }),
  );

const makeSelectLastThreeArticles = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState =>
      _.find(globalState.config, {
        name: 'SHOW_LAST_3_ARTICLES_FOR_PIN_COMMUNITY_POST',
      }),
  );

const makeSelectShareContentOnCommunityTab = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState =>
      _.find(globalState.config, {
        name: 'SHARE_CONTENT_ON_COMMUNITY_TAB',
      }),
  );

const makeSelectDigestModule = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState =>
      _.find(globalState.config, {
        name: 'DIGEST_MODULE',
      }),
  );

const makeSelectLivelyCall = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState =>
      _.find(globalState.config, {
        name: 'LIVELY_CALL',
      }),
  );

const makeSelectLivelyTransfer = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState =>
      _.find(globalState.config, {
        name: 'LIVELY_TRANSFER',
      }),
  );

const makeSelectLivelyTransferButtonName = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState =>
      _.find(globalState.config, {
        name: 'LIVELY_TRANSFER_BUTTON_NAME',
      }),
  );

const makeSelectFollowingUser = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState =>
      _.find(globalState.config, {
        name: 'FOLLOWING_USER',
      }),
  );

const makeSelectProfileProject = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState =>
      _.find(globalState.config, {
        name: 'PROFILE_PROJECT',
      }),
  );

const makeSelectProfileExperience = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState =>
      _.find(globalState.config, {
        name: 'PROFILE_EXPERIENCE',
      }),
  );

const makeSelectPinnedPostOfUser = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState =>
      _.find(globalState.config, {
        name: 'PINNED_POST_OF_USER',
      }),
  );

const makeSelectPrivateMessageConfig = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState =>
      _.find(globalState.config, {
        name: 'PRIVATE_MESSAGE',
      }),
  );

const makeSelectModerationWorkflowLevel = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState =>
      _.find(globalState.config, {
        name: 'MODERATION_WORKFLOW_LEVEL',
      }),
  );

const makeSelectProfileTooltip = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState =>
      _.find(globalState.config, {
        name: 'PROFILE_TOOTIP',
      }),
  );

const makeSelectCurrentUser = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.currentUser,
  );

/**
 * Current User Error Selector
 */

const makeSelectGetCurrentUserError = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.getCurrentUserError,
  );

/**
 * Current User Loading Selector
 */

const makeSelectGetCurrentUserLoading = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.getCurrentUserLoading,
  );

/**
 * Navbar configs Selector
 */

const makeSelectMicrosoftIntegration = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState =>
      _.find(globalState.config, { name: 'MICROSOFT_INTEGRATION' }),
  );
const makeSelectDocumentBar = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => _.find(globalState.config, { name: 'DOCUMENT_BAR' }),
  );
const makeSelectLanguageTranslationControl = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState =>
      _.find(globalState.config, { name: 'LANGUAGE_TRANSLATION_CONTROL' }),
  );
const makeSelectAllowChangePassword = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState =>
      _.find(globalState.config, { name: 'ALLOW_CHANGE_PASSWORD' }),
  );
const makeSelectQuickSharingOfLinkLikeQuickpost = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState =>
      _.find(globalState.config, {
        name: 'QUICK_SHARING_OF_LINK_LIKE_QUICKPOST',
      }),
  );
const makeSelectAlertModule = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => _.find(globalState.config, { name: 'ALERT_MODULE' }),
  );
const makeSelectNoteTheService = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => _.find(globalState.config, { name: 'NOTE_THE_SERVICE' }),
  );

/**
 * Config Error Selector
 */
const makeSelectConfigError = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.getConfigError,
  );

/**
 * Config Loading Selector
 */
const makeSelectConfigLoading = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.getConfigLoading,
  );

const makeSelectCreateQuickPost = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.createQuickPost,
  );

const makeSelectContentType = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.contentType,
  );

const makeSelectEditQuickPost = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.editQuickPost,
  );

const makeSelectQuickPostUid = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.quickPostUid,
  );

const makeSelectContentCreation = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.contentCreation,
  );

const makeSelectContentEdit = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.contentEdit,
  );

const makeSelectContentUid = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.contentUid,
  );
const makeSelectOpenGallery = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.openGallery,
  );

const makeSelectGalleryActiveIndex = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.galleryActiveIndex,
  );

const makeSelectGalleryOptions = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.galleryOptions,
  );

const makeSelectGalleryType = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.galleryType,
  );

const makeSelectCommunityList = () =>
  createSelector(
    [selectGlobalEntitiesDomain, selectAuthBaseDomain],
    (globalEntitiesState, authBaseState) =>
      denormalize(
        { community: authBaseState.communityList },
        { community: [communitySchema] },
        globalEntitiesState.entities,
      ).community,
  );

const makeSelectCommunityListLoading = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.communityListLoading,
  );

const makeSelectShare = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.share,
  );

const makeSelectShareAction = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.shareAction,
  );

const makeSelectShareContent = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.shareContent,
  );

const makeSelectPrivateMessage = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.privateMessage,
  );

const makeSelectPrivateMessageContent = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.privateMessageContent,
  );

const makeSelectPrivateMessageUsers = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.privateMessageUsers,
  );

const makeSelectOpenFeedModal = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.openFeedModal,
  );

const makeSelectFeedUid = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.feedUid,
  );
const makeSelectCommunityListError = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.communityListError,
  );

const makeSelectOpenUserLiked = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.openUserLiked,
  );

const makeSelectUserLikedOption = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.userLikedOption,
  );

const makeSelectIsCreatePinnedCommunityOpen = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.isCreatePinnedCommunityOpen,
  );

const makeSelectPinnedCommunityId = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.pinnedCommunityId,
  );

const makeSelectOpenDirectoryPrivateMessage = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.openDirectoryPrivateMessage,
  );

const makeSelectFollowedUser = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.followedUser,
  );

const makeSelectOpenStatistics = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.openStatistics,
  );

const makeSelectOpenDigest = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.openDigest,
  );

const makeSelectCreateDigest = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.createDigest,
  );

const makeSelectEditDigestId = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.editDigestId,
  );

const makeSelectOpenCarouselManager = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.openCarouselManager,
  );

const makeSelectOpenCreateCarousel = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.openCreateCarousel,
  );

const makeSelectCreateCarouselLevel = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.createCarouselLevel,
  );

const makeSelectEditCarouselUid = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.editCarouselUid,
  );

const makeSelectConfig = name =>
  createSelector(
    selectAuthBaseDomain,
    globalState =>
      _.find(globalState.config, {
        name,
      }),
  );

const makeSelectOpenWidgetManager = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.openWidgetManager,
  );

const makeSelectWidgetManagerDisplayOption = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.widgetManagerDisplayOption,
  );

const makeSelectWidgetManagerCommunityUid = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.widgetManagerCommunityUid,
  );

const makeSelectOpenCreateWidget = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.openCreateWidget,
  );

const makeSelectEditWidgetUid = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.editWidgetUid,
  );

const makeSelectOpenDocumentBar = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.openDocumentBar,
  );

const makeSelectCreateWidgetCommunityUid = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.createWidgetCommunityUid,
  );

const makeSelectCarouselManagerCommunityUid = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.carouselManagerCommunityUid,
  );

const makeSelectCreateCarouselCommunityUid = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.createCarouselCommunityUid,
  );

const makeSelectDigitalWorkplaceList = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.digitalWorkplaceList,
  );

const makeSelectOpenSocialWall = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.openSocialWall,
  );

const makeSelectOpenCreateCommunity = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.openCreateCommunity,
  );

const makeSelectEditCommunityUid = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.editCommunityUid,
  );

const makeSelectOpenEditCommunityImage = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.openEditCommunityImage,
  );

const makeSelectEditCommunityImageUid = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.editCommunityImageUid,
  );

const makeSelectOpenLivelyTransfer = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.openLivelyTransfer,
  );

const makeSelectReceivedUserUids = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.receivedUserUids,
  );

const makeSelectDocuments = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.documents,
  );

const makeSelectDocumentBarOptions = () =>
  createSelector(
    selectAuthBaseDomain,
    globalState => globalState.documentBarOptions,
  );

export {
  selectAuthBaseDomain,
  makeSelectSession,
  checkSessionSuccess,
  checkSessionLoading,
  makeSelectLanguage,
  makeSelectCommunityListPageDesign,
  makeSelectYammerIntegration,
  makeSelectPinCommunityPost,
  makeSelectLastThreeArticles,
  makeSelectCurrentUser,
  makeSelectGetCurrentUserLoading,
  makeSelectGetCurrentUserError,
  makeSelectConfigError,
  makeSelectConfigLoading,
  makeSelectMicrosoftIntegration,
  makeSelectDocumentBar,
  makeSelectLanguageTranslationControl,
  makeSelectAllowChangePassword,
  makeSelectQuickSharingOfLinkLikeQuickpost,
  makeSelectAlertModule,
  makeSelectNoteTheService,
  makeSelectCreateQuickPost,
  makeSelectEditQuickPost,
  makeSelectQuickPostUid,
  makeSelectContentCreation,
  makeSelectContentEdit,
  makeSelectContentUid,
  makeSelectCommunityList,
  makeSelectCommunityListLoading,
  makeSelectContentType,
  makeSelectShare,
  makeSelectShareAction,
  makeSelectShareContent,
  makeSelectShareContentOnCommunityTab,
  makeSelectDigestModule,
  makeSelectPrivateMessage,
  makeSelectPrivateMessageContent,
  makeSelectPrivateMessageUsers,
  makeSelectOpenFeedModal,
  makeSelectFeedUid,
  makeSelectCommunityListError,
  makeSelectOpenGallery,
  makeSelectGalleryActiveIndex,
  makeSelectGalleryOptions,
  makeSelectGalleryType,
  makeSelectOpenUserLiked,
  makeSelectUserLikedOption,
  makeSelectIsCreatePinnedCommunityOpen,
  makeSelectPinnedCommunityId,
  makeSelectViewNotificationByCommunity,
  makeSelectFaqTab,
  makeSelectOpenDirectoryPrivateMessage,
  makeSelectFollowedUser,
  makeSelectCustomTemplateList,
  makeSelectLivelyCall,
  makeSelectLivelyTransfer,
  makeSelectLivelyTransferButtonName,
  makeSelectFollowingUser,
  makeSelectProfileProject,
  makeSelectProfileExperience,
  makeSelectPinnedPostOfUser,
  makeSelectPrivateMessageConfig,
  makeSelectModerationWorkflowLevel,
  makeSelectProfileTooltip,
  makeSelectOpenStatistics,
  makeSelectOpenDigest,
  makeSelectCreateDigest,
  makeSelectEditDigestId,
  makeSelectOpenCarouselManager,
  makeSelectOpenCreateCarousel,
  makeSelectCreateCarouselLevel,
  makeSelectEditCarouselUid,
  makeSelectConfig,
  makeSelectOpenWidgetManager,
  makeSelectWidgetManagerDisplayOption,
  makeSelectWidgetManagerCommunityUid,
  makeSelectOpenCreateWidget,
  makeSelectEditWidgetUid,
  makeSelectOpenDocumentBar,
  makeSelectCreateWidgetCommunityUid,
  makeSelectCarouselManagerCommunityUid,
  makeSelectCreateCarouselCommunityUid,
  makeSelectDigitalWorkplaceList,
  makeSelectOpenSocialWall,
  makeSelectOpenCreateCommunity,
  makeSelectEditCommunityUid,
  makeSelectOpenEditCommunityImage,
  makeSelectEditCommunityImageUid,
  makeSelectOpenLivelyTransfer,
  makeSelectReceivedUserUids,
  makeSelectDocuments,
  makeSelectDocumentBarOptions,
};

/*
 *
 * AuthBase reducer
 *
 */
import produce from 'immer';
import _ from 'lodash';
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
  CUSTOM_TEMPLATE_LIST,
  CUSTOM_TEMPLATE_LIST_SUCCESS,
  CUSTOM_TEMPLATE_LIST_ERROR,
  CREATE_QUICK_POST,
  EDIT_QUICK_POST,
  CLOSE_QUICK_POST,
  CONTENT_CREATION,
  CONTENT_EDIT,
  CONTENT_CLOSE,
  GET_COMMUNITY_LIST,
  GET_COMMUNITY_LIST_SUCCESS,
  GET_COMMUNITY_LIST_ERROR,
  FILTER_COMMUNITY_LIST,
  SHARE,
  CLOSE_SHARE,
  PRIVATE_MESSAGE,
  CLOSE_PRIVATE_MESSAGE,
  OPEN_FEED_MODAL,
  CLOSE_FEED_MODAL,
  OPEN_GALLERY,
  CLOSE_GALLERY,
  OPEN_USER_LIKED,
  CLOSE_USER_LIKED,
  OPEN_CREATE_PINNED_COMMUNITY,
  CLOSE_CREATE_PINNED_COMMUNITY,
  OPEN_DIRECTORY_PRIVATE_MESSAGE,
  CLOSE_DIRECTORY_PRIVATE_MESSAGE,
  OPEN_STATISTICS,
  CLOSE_STATISTICS,
  OPEN_DIGEST,
  CLOSE_DIGEST,
  CREATE_DIGEST,
  EDIT_DIGEST,
  CLOSE_CREATE_DIGEST,
  OPEN_CAROUSEL_MANAGER,
  CLOSE_CAROUSEL_MANAGER,
  CREATE_CAROUSEL,
  EDIT_CAROUSEL,
  CLOSE_CREATE_CAROUSEL,
  OPEN_WIDGET_MANAGER,
  CLOSE_WIDGET_MANAGER,
  CREATE_WIDGET,
  EDIT_WIDGET,
  CLOSE_CREATE_WIDGET,
  OPEN_DOCUMENT_BAR,
  CLOSE_DOCUMENT_BAR,
  SURVEY_SUMMARY,
  SURVEY_SUMMARY_SUCCESS,
  SURVEY_SUMMARY_ERROR,
  DOWNLOAD_DOCUMENTS,
  DOWNLOAD_DOCUMENTS_SUCCESS,
  DOWNLOAD_DOCUMENTS_ERROR,
  CONTENT,
  CONTENT_SUCCESS,
  CONTENT_ERROR,
  DIGITAL_WORKPLACE_LIST,
  DIGITAL_WORKPLACE_LIST_SUCCESS,
  DIGITAL_WORKPLACE_LIST_ERROR,
  OPEN_SOCIAL_WALL,
  CLOSE_SOCIAL_WALL,
  CREATE_COMMUNITY,
  EDIT_COMMUNITY,
  CLOSE_CREATE_COMMUNITY,
  EDIT_COMMUNITY_IMAGE,
  CLOSE_EDIT_COMMUNITY_IMAGE,
  OPEN_LIVELY_TRANSFER,
  CLOSE_LIVELY_TRANSFER,
  LIVELY_TRANSFER_DOCUMENTS,
  UPDATE_LIVELY_TRANSFER_DOCUMENTS,
  DELETE_LIVELY_TRANSFER_DOCUMENTS,
} from './constants';

export const initialState = {
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
  customTemplateList: [],
  customTemplateListLoading: true,
  customTemplateListSuccess: false,
  customTemplateListError: '',
  createQuickPost: false,
  editQuickPost: false,
  quickPostUid: undefined,
  contentType: '',
  contentCreation: false,
  contentEdit: false,
  contentUid: undefined,
  communityList: [],
  communityListLoading: false,
  communityListSuccess: false,
  communityListError: '',
  share: false,
  shareAction: '',
  shareContent: {},
  privateMessage: false,
  privateMessageContent: {},
  privateMessageUsers: [],
  openFeedModal: false,
  feedUid: undefined,
  openGallery: false,
  galleryType: '',
  galleryActiveIndex: -1,
  galleryOptions: [],
  openUserLiked: false,
  userLikedOption: {},
  isCreatePinnedCommunityOpen: false,
  pinnedCommunityId: '',
  openDirectoryPrivateMessage: false,
  followedUser: {},
  openStatistics: false,
  openDigest: false,
  createDigest: false,
  editDigestId: undefined,
  openCarouselManager: false,
  carouselManagerCommunityUid: undefined,
  createCarouselLevel: undefined,
  createCarouselCommunityUid: undefined,
  openCreateCarousel: false,
  editCarouselUid: undefined,
  openWidgetManager: false,
  widgetManagerDisplayOption: undefined,
  widgetManagerCommunityUid: undefined,
  openCreateWidget: false,
  editWidgetUid: undefined,
  openDocumentBar: false,
  documentBarOptions: {},
  createWidgetCommunityUid: undefined,
  surveySummaryLoading: false,
  surveySummarySuccess: false,
  surveySummaryError: '',
  downloadDocumentsLoading: false,
  downloadDocumentsSuccess: false,
  downloadDocumentsError: '',
  contentLoading: false,
  contentSuccess: false,
  contentError: '',
  digitalWorkplaceList: [],
  digitalWorkplaceListLoading: false,
  digitalWorkplaceListSuccess: false,
  digitalWorkplaceListError: '',
  openSocialWall: false,
  openCreateCommunity: false,
  editCommunityUid: undefined,
  openEditCommunityImage: false,
  editCommunityImageUid: undefined,
  openLivelyTransfer: false,
  receivedUserUids: [],
  documents: [],
};

/* eslint-disable default-case, no-param-reassign */
const authBaseReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case CHECK_SESSION:
        draft.session = {};
        draft.checkSessionLoading = true;
        draft.checkSessionSuccess = false;
        draft.checkSessionError = '';
        break;
      case CHECK_SESSION_SUCCESS:
        draft.session = action.data;
        draft.checkSessionLoading = false;
        draft.checkSessionSuccess = true;
        draft.checkSessionError = '';
        break;
      case CHECK_SESSION_ERROR:
        draft.checkSessionLoading = false;
        draft.checkSessionSuccess = false;
        draft.checkSessionError = action.error;
        break;
      case GET_LANGUAGE:
        draft.language = [];
        draft.getLanguageLoading = true;
        draft.getLanguageSuccess = false;
        draft.getLanguageError = '';
        break;
      case GET_LANGUAGE_SUCCESS:
        draft.language = action.data;
        draft.getLanguageLoading = false;
        draft.getLanguageSuccess = true;
        draft.getLanguageError = '';
        break;
      case GET_LANGUAGE_ERROR:
        draft.getLanguageLoading = false;
        draft.getLanguageSuccess = false;
        draft.getLanguageError = action.error;
        break;
      case GET_CONFIG:
        draft.config = [];
        draft.getConfigLoading = true;
        draft.getConfigSuccess = false;
        draft.getConfigError = '';
        break;
      case GET_CONFIG_SUCCESS:
        draft.config = action.data;
        draft.getConfigLoading = false;
        draft.getConfigSuccess = true;
        draft.getConfigError = '';
        break;
      case GET_CONFIG_ERROR:
        draft.getConfigLoading = false;
        draft.getConfigSuccess = false;
        draft.getConfigError = action.error;
        break;
      case GET_CURRENT_USER:
        draft.currentUser = {};
        draft.getCurrentUserLoading = true;
        draft.getCurrentUserSuccess = false;
        draft.getCurrentUserError = {};
        break;
      case GET_CURRENT_USER_SUCCESS:
        draft.currentUser = action.data;
        draft.getCurrentUserLoading = false;
        draft.getCurrentUserSuccess = true;
        break;
      case GET_CURRENT_USER_ERROR:
        draft.getCurrentUserLoading = false;
        draft.getCurrentUserSuccess = false;
        draft.getCurrentUserError = action.error;
        break;
      case CUSTOM_TEMPLATE_LIST:
        draft.customTemplateList = [];
        draft.customTemplateListLoading = true;
        draft.customTemplateListSuccess = false;
        draft.customTemplateListError = '';
        break;
      case CUSTOM_TEMPLATE_LIST_SUCCESS:
        draft.customTemplateList = action.data;
        draft.customTemplateListLoading = false;
        draft.customTemplateListSuccess = true;
        draft.customTemplateListError = '';
        break;
      case CUSTOM_TEMPLATE_LIST_ERROR:
        draft.customTemplateListLoading = false;
        draft.customTemplateListSuccess = false;
        draft.customTemplateListError = action.error;
        break;
      case CREATE_QUICK_POST:
        draft.createQuickPost = true;
        draft.contentType = action.contentType;
        break;
      case EDIT_QUICK_POST:
        draft.editQuickPost = true;
        draft.contentType = action.contentType;
        draft.quickPostUid = action.data;
        break;
      case CLOSE_QUICK_POST:
        draft.createQuickPost = false;
        draft.editQuickPost = false;
        draft.quickPostUid = undefined;
        draft.contentType = '';
        break;
      case CONTENT_CREATION:
        draft.contentCreation = true;
        break;
      case CONTENT_EDIT:
        draft.contentEdit = true;
        draft.contentUid = action.data;
        break;
      case CONTENT_CLOSE:
        draft.contentCreation = false;
        draft.contentEdit = false;
        draft.contentUid = undefined;
        break;
      case GET_COMMUNITY_LIST:
      case FILTER_COMMUNITY_LIST:
        // draft.communityList = [];
        draft.communityListLoading = true;
        draft.communityListSuccess = false;
        draft.communityListError = '';
        break;
      case GET_COMMUNITY_LIST_SUCCESS:
        draft.communityList = action.data;
        draft.communityListLoading = false;
        draft.communityListSuccess = true;
        draft.communityListError = '';
        break;
      case GET_COMMUNITY_LIST_ERROR:
        draft.communityListLoading = false;
        draft.communityListSuccess = false;
        draft.communityListError = action.error;
        break;
      case SHARE:
        draft.share = true;
        draft.shareAction = action.action;
        draft.shareContent = action.content;
        break;
      case CLOSE_SHARE:
        draft.share = false;
        draft.shareAction = '';
        draft.shareContent = {};
        break;
      case PRIVATE_MESSAGE:
        draft.privateMessage = true;
        draft.privateMessageContent = action.content;
        draft.privateMessageUsers = action.users;
        break;
      case CLOSE_PRIVATE_MESSAGE:
        draft.privateMessage = false;
        draft.privateMessageContent = {};
        draft.privateMessageUsers = [];
        break;
      case OPEN_FEED_MODAL:
        draft.openFeedModal = true;
        draft.feedUid = action.options;
        break;
      case CLOSE_FEED_MODAL:
        draft.openFeedModal = false;
        draft.feedUid = undefined;
        break;
      case OPEN_GALLERY:
        draft.openGallery = true;
        draft.galleryType = action.galleryType;
        draft.galleryActiveIndex = action.activeIndex;
        draft.galleryOptions = action.options;
        break;
      case CLOSE_GALLERY:
        draft.openGallery = false;
        draft.galleryType = action.galleryType;
        draft.galleryActiveIndex = -1;
        draft.galleryOptions = [];
        break;
      case OPEN_USER_LIKED:
        draft.openUserLiked = true;
        draft.userLikedOption = action.options;
        break;
      case CLOSE_USER_LIKED:
        draft.openUserLiked = false;
        draft.userLikedOption = undefined;
        break;
      case OPEN_CREATE_PINNED_COMMUNITY:
        draft.isCreatePinnedCommunityOpen = true;
        draft.pinnedCommunityId = action.id;
        break;
      case CLOSE_CREATE_PINNED_COMMUNITY:
        draft.isCreatePinnedCommunityOpen = false;
        draft.pinnedCommunityId = '';
        break;
      case OPEN_DIRECTORY_PRIVATE_MESSAGE:
        draft.openDirectoryPrivateMessage = true;
        draft.followedUser = action.options;
        break;
      case CLOSE_DIRECTORY_PRIVATE_MESSAGE:
        draft.openDirectoryPrivateMessage = false;
        draft.followedUser = undefined;
        break;
      case OPEN_STATISTICS:
        draft.openStatistics = true;
        break;
      case CLOSE_STATISTICS:
        draft.openStatistics = false;
        break;
      case OPEN_DIGEST:
        draft.openDigest = true;
        break;
      case CLOSE_DIGEST:
        draft.openDigest = false;
        break;
      case CREATE_DIGEST:
        draft.createDigest = true;
        break;
      case EDIT_DIGEST:
        draft.createDigest = true;
        draft.editDigestId = action.data;
        break;
      case CLOSE_CREATE_DIGEST:
        draft.createDigest = false;
        draft.editDigestId = undefined;
        break;
      case OPEN_CAROUSEL_MANAGER:
        draft.openCarouselManager = true;
        draft.carouselManagerCommunityUid = action.communityUid;
        break;
      case CLOSE_CAROUSEL_MANAGER:
        draft.openCarouselManager = false;
        draft.carouselManagerCommunityUid = undefined;
        break;
      case CREATE_CAROUSEL:
        draft.openCreateCarousel = true;
        draft.createCarouselCommunityUid = action.communityUid;
        draft.createCarouselLevel = action.data;
        break;
      case EDIT_CAROUSEL:
        draft.openCreateCarousel = true;
        draft.createCarouselCommunityUid = action.communityUid;
        draft.editCarouselUid = action.data;
        break;
      case CLOSE_CREATE_CAROUSEL:
        draft.openCreateCarousel = false;
        draft.createCarouselCommunityUid = undefined;
        draft.createCarouselLevel = undefined;
        draft.editCarouselUid = undefined;
        break;
      case OPEN_WIDGET_MANAGER:
        draft.openWidgetManager = true;
        draft.widgetManagerDisplayOption = action.displayOption;
        draft.widgetManagerCommunityUid = action.communityUid;
        break;
      case CLOSE_WIDGET_MANAGER:
        draft.openWidgetManager = false;
        draft.widgetManagerDisplayOption = undefined;
        draft.widgetManagerCommunityUid = undefined;
        break;
      case CREATE_WIDGET:
        draft.openCreateWidget = true;
        draft.createWidgetCommunityUid = action.communityUid;
        break;
      case EDIT_WIDGET:
        draft.openCreateWidget = true;
        draft.createWidgetCommunityUid = action.communityUid;
        draft.editWidgetUid = action.data;
        break;
      case CLOSE_CREATE_WIDGET:
        draft.openCreateWidget = false;
        draft.createWidgetCommunityUid = undefined;
        draft.editWidgetUid = undefined;
        break;
      case OPEN_DOCUMENT_BAR:
        draft.openDocumentBar = true;
        draft.documentBarOptions = action.options;
        break;
      case CLOSE_DOCUMENT_BAR:
        draft.openDocumentBar = false;
        draft.documentBarOptions = {};
        break;
      case SURVEY_SUMMARY:
        draft.surveySummaryLoading = true;
        draft.surveySummarySuccess = false;
        draft.surveySummaryError = '';
        break;
      case SURVEY_SUMMARY_SUCCESS:
        draft.surveySummaryLoading = false;
        draft.surveySummarySuccess = true;
        draft.surveySummaryError = '';
        break;
      case SURVEY_SUMMARY_ERROR:
        draft.surveySummaryLoading = false;
        draft.surveySummarySuccess = false;
        draft.surveySummaryError = action.error;
        break;
      case DOWNLOAD_DOCUMENTS:
        draft.downloadDocumentsLoading = true;
        draft.downloadDocumentsSuccess = false;
        draft.downloadDocumentsError = '';
        break;
      case DOWNLOAD_DOCUMENTS_SUCCESS:
        draft.downloadDocumentsLoading = false;
        draft.downloadDocumentsSuccess = true;
        draft.downloadDocumentsError = '';
        break;
      case DOWNLOAD_DOCUMENTS_ERROR:
        draft.downloadDocumentsLoading = false;
        draft.downloadDocumentsSuccess = false;
        draft.downloadDocumentsError = action.error;
        break;
      case CONTENT:
        draft.contentLoading = true;
        draft.contentSuccess = false;
        draft.contentError = '';
        break;
      case CONTENT_SUCCESS:
        draft.contentLoading = false;
        draft.contentSuccess = true;
        draft.contentError = '';
        break;
      case CONTENT_ERROR:
        draft.contentLoading = false;
        draft.contentSuccess = false;
        draft.contentError = action.error;
        break;
      case DIGITAL_WORKPLACE_LIST:
        draft.digitalWorkplaceList = [];
        draft.digitalWorkplaceListLoading = true;
        draft.digitalWorkplaceListSuccess = false;
        draft.digitalWorkplaceListError = '';
        break;
      case DIGITAL_WORKPLACE_LIST_SUCCESS:
        draft.digitalWorkplaceList = action.data;
        draft.digitalWorkplaceListLoading = false;
        draft.digitalWorkplaceListSuccess = true;
        draft.digitalWorkplaceListError = '';
        break;
      case DIGITAL_WORKPLACE_LIST_ERROR:
        draft.digitalWorkplaceListLoading = false;
        draft.digitalWorkplaceListSuccess = false;
        draft.digitalWorkplaceListError = action.error;
        break;
      case OPEN_SOCIAL_WALL:
        draft.openSocialWall = true;
        break;
      case CLOSE_SOCIAL_WALL:
        draft.openSocialWall = false;
        break;
      case CREATE_COMMUNITY:
        draft.openCreateCommunity = true;
        break;
      case EDIT_COMMUNITY:
        draft.openCreateCommunity = true;
        draft.editCommunityUid = action.communityUid;
        break;
      case CLOSE_CREATE_COMMUNITY:
        draft.openCreateCommunity = false;
        draft.editCommunityUid = undefined;
        break;
      case EDIT_COMMUNITY_IMAGE:
        draft.openEditCommunityImage = true;
        draft.editCommunityImageUid = action.communityUid;
        break;
      case CLOSE_EDIT_COMMUNITY_IMAGE:
        draft.openEditCommunityImage = false;
        draft.editCommunityImageUid = undefined;
        break;
      case OPEN_LIVELY_TRANSFER:
        draft.openLivelyTransfer = true;
        draft.receivedUserUids = action.options.receivedUserUids || [];
        draft.documents = action.options.documents || [];
        break;
      case CLOSE_LIVELY_TRANSFER:
        draft.openLivelyTransfer = false;
        draft.receivedUserUids = [];
        draft.documents = [];
        break;
      case LIVELY_TRANSFER_DOCUMENTS:
        draft.documents = [...draft.documents, ...action.documents];
        break;
      case UPDATE_LIVELY_TRANSFER_DOCUMENTS:
        draft.documents = _.map(draft.documents, document =>
          document.uuid === action.file.uuid
            ? { ...document, ..._.head(action.data) }
            : document,
        );
        break;
      case DELETE_LIVELY_TRANSFER_DOCUMENTS:
        draft.documents = _.filter(
          draft.documents,
          document => !_.isMatch(document, action.file),
        );
        break;
      default:
        return state;
    }
  });

export default authBaseReducer;

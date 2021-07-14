/*
 *
 * AuthBase actions
 *
 */

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

export function checkSession() {
  return {
    type: CHECK_SESSION,
  };
}

export function checkSessionSuccess(data) {
  return {
    type: CHECK_SESSION_SUCCESS,
    data,
  };
}

export function checkSessionError(error) {
  return {
    type: CHECK_SESSION_ERROR,
    error,
  };
}

export function getLanguage() {
  return {
    type: GET_LANGUAGE,
  };
}

export function getLanguageSuccess(data) {
  return {
    type: GET_LANGUAGE_SUCCESS,
    data,
  };
}

export function getLanguageError(error) {
  return {
    type: GET_LANGUAGE_ERROR,
    error,
  };
}

export function getConfig() {
  return {
    type: GET_CONFIG,
  };
}

export function getConfigSuccess(data) {
  return {
    type: GET_CONFIG_SUCCESS,
    data,
  };
}

export function getConfigError(error) {
  return {
    type: GET_CONFIG_ERROR,
    error,
  };
}

export function getCurrentUser() {
  return {
    type: GET_CURRENT_USER,
  };
}

export function getCurrentUserSuccess(data) {
  return {
    type: GET_CURRENT_USER_SUCCESS,
    data,
  };
}

export function getCurrentUserError(error) {
  return {
    type: GET_CURRENT_USER_ERROR,
    error,
  };
}

export function customTemplateList() {
  return {
    type: CUSTOM_TEMPLATE_LIST,
  };
}

export function customTemplateListSuccess(data) {
  return {
    type: CUSTOM_TEMPLATE_LIST_SUCCESS,
    data,
  };
}

export function customTemplateListError(error) {
  return {
    type: CUSTOM_TEMPLATE_LIST_ERROR,
    error,
  };
}

export function createQuickPost(contentType) {
  return {
    type: CREATE_QUICK_POST,
    contentType,
  };
}

export function editQuickPost(contentType, data) {
  return {
    type: EDIT_QUICK_POST,
    contentType,
    data,
  };
}

export function closeQuickPost() {
  return {
    type: CLOSE_QUICK_POST,
  };
}

export function contentCreation() {
  return {
    type: CONTENT_CREATION,
  };
}

export function contentEdit(data) {
  return {
    type: CONTENT_EDIT,
    data,
  };
}

export function contentClose() {
  return {
    type: CONTENT_CLOSE,
  };
}

export function getCommunityList(options) {
  return {
    type: GET_COMMUNITY_LIST,
    options,
  };
}

export function getCommunityListSuccess(data) {
  return {
    type: GET_COMMUNITY_LIST_SUCCESS,
    data,
  };
}

export function getCommunityListError(error) {
  return {
    type: GET_COMMUNITY_LIST_ERROR,
    error,
  };
}

export function filterCommunityList(options) {
  return {
    type: FILTER_COMMUNITY_LIST,
    options,
  };
}

export function share(action, _content) {
  return {
    type: SHARE,
    action,
    content: _content,
  };
}

export function closeShare() {
  return {
    type: CLOSE_SHARE,
  };
}

export function privateMessage(_content, users) {
  return {
    type: PRIVATE_MESSAGE,
    content: _content,
    users,
  };
}

export function closePrivateMessage() {
  return {
    type: CLOSE_PRIVATE_MESSAGE,
  };
}

export function openFeedModal(options) {
  return {
    type: OPEN_FEED_MODAL,
    options,
  };
}

export function closeFeedModal() {
  return {
    type: CLOSE_FEED_MODAL,
  };
}

export function openGallery(galleryType, activeIndex, options) {
  return {
    type: OPEN_GALLERY,
    galleryType,
    activeIndex,
    options,
  };
}

export function closeGallery() {
  return {
    type: CLOSE_GALLERY,
  };
}

export function openUserLiked(options) {
  return {
    type: OPEN_USER_LIKED,
    options,
  };
}

export function closeUserLiked() {
  return {
    type: CLOSE_USER_LIKED,
  };
}

export function openCreatePinnedCommunity(id) {
  return {
    type: OPEN_CREATE_PINNED_COMMUNITY,
    id,
  };
}

export function closeCreatePinnedCommunity() {
  return {
    type: CLOSE_CREATE_PINNED_COMMUNITY,
  };
}

export function openDirectoryPrivateMessage(options) {
  return {
    type: OPEN_DIRECTORY_PRIVATE_MESSAGE,
    options,
  };
}

export function closeDirectoryPrivateMessage() {
  return {
    type: CLOSE_DIRECTORY_PRIVATE_MESSAGE,
  };
}

export function openStatistics() {
  return {
    type: OPEN_STATISTICS,
  };
}

export function closeStatistics() {
  return {
    type: CLOSE_STATISTICS,
  };
}

export function openDigest() {
  return {
    type: OPEN_DIGEST,
  };
}

export function closeDigest() {
  return {
    type: CLOSE_DIGEST,
  };
}

export function createDigest() {
  return {
    type: CREATE_DIGEST,
  };
}

export function editDigest(data) {
  return {
    type: EDIT_DIGEST,
    data,
  };
}

export function closeCreateDigest() {
  return {
    type: CLOSE_CREATE_DIGEST,
  };
}

export function openCarouselManager(communityUid) {
  return {
    type: OPEN_CAROUSEL_MANAGER,
    communityUid,
  };
}

export function closeCarouselManager() {
  return {
    type: CLOSE_CAROUSEL_MANAGER,
  };
}

export function createCarousel(communityUid, data) {
  return {
    type: CREATE_CAROUSEL,
    communityUid,
    data,
  };
}

export function editCarousel(communityUid, data) {
  return {
    type: EDIT_CAROUSEL,
    communityUid,
    data,
  };
}

export function closeCreateCarousel() {
  return {
    type: CLOSE_CREATE_CAROUSEL,
  };
}

export function openWidgetManager(displayOption, communityUid) {
  return {
    type: OPEN_WIDGET_MANAGER,
    displayOption,
    communityUid,
  };
}

export function closeWidgetManager() {
  return {
    type: CLOSE_WIDGET_MANAGER,
  };
}

export function createWidget(communityUid) {
  return {
    type: CREATE_WIDGET,
    communityUid,
  };
}

export function editWidget(communityUid, data) {
  return {
    type: EDIT_WIDGET,
    communityUid,
    data,
  };
}

export function closeCreateWidget() {
  return {
    type: CLOSE_CREATE_WIDGET,
  };
}

export function openDocumentBar(options) {
  return {
    type: OPEN_DOCUMENT_BAR,
    options,
  };
}

export function closeDocumentBar() {
  return {
    type: CLOSE_DOCUMENT_BAR,
  };
}

export function surveySummary(options) {
  return {
    type: SURVEY_SUMMARY,
    options,
  };
}

export function surveySummarySuccess() {
  return {
    type: SURVEY_SUMMARY_SUCCESS,
  };
}

export function surveySummaryError(error) {
  return {
    type: SURVEY_SUMMARY_ERROR,
    error,
  };
}

export function downloadDocuments(options) {
  return {
    type: DOWNLOAD_DOCUMENTS,
    options,
  };
}

export function downloadDocumentsSuccess() {
  return {
    type: DOWNLOAD_DOCUMENTS_SUCCESS,
  };
}

export function downloadDocumentsError(error) {
  return {
    type: DOWNLOAD_DOCUMENTS_ERROR,
    error,
  };
}

export function content(options) {
  return {
    type: CONTENT,
    options,
  };
}

export function contentSuccess() {
  return {
    type: CONTENT_SUCCESS,
  };
}

export function contentError(error) {
  return {
    type: CONTENT_ERROR,
    error,
  };
}

export function digitalWorkplaceList() {
  return {
    type: DIGITAL_WORKPLACE_LIST,
  };
}

export function digitalWorkplaceListSuccess(data) {
  return {
    type: DIGITAL_WORKPLACE_LIST_SUCCESS,
    data,
  };
}

export function digitalWorkplaceListError(error) {
  return {
    type: DIGITAL_WORKPLACE_LIST_ERROR,
    error,
  };
}

export function openSocialWall() {
  return {
    type: OPEN_SOCIAL_WALL,
  };
}

export function closeSocialWall() {
  return {
    type: CLOSE_SOCIAL_WALL,
  };
}

export function createCommunity() {
  return {
    type: CREATE_COMMUNITY,
  };
}

export function editCommunity(communityUid) {
  return {
    type: EDIT_COMMUNITY,
    communityUid,
  };
}

export function closeCreateCommunity() {
  return {
    type: CLOSE_CREATE_COMMUNITY,
  };
}

export function editCommunityImage(communityUid) {
  return {
    type: EDIT_COMMUNITY_IMAGE,
    communityUid,
  };
}

export function closeEditCommunityImage() {
  return {
    type: CLOSE_EDIT_COMMUNITY_IMAGE,
  };
}

export function openLivelyTransfer(options) {
  return {
    type: OPEN_LIVELY_TRANSFER,
    options,
  };
}

export function closeLivelyTransfer() {
  return {
    type: CLOSE_LIVELY_TRANSFER,
  };
}

export function livelyTransferDocuments(documents) {
  return {
    type: LIVELY_TRANSFER_DOCUMENTS,
    documents,
  };
}

export function updateLivelyTransferDocuments(file, data) {
  return {
    type: UPDATE_LIVELY_TRANSFER_DOCUMENTS,
    file,
    data,
  };
}

export function deleteLivelyTransferDocuments(file) {
  return {
    type: DELETE_LIVELY_TRANSFER_DOCUMENTS,
    file,
  };
}

/**
 *
 * Dialogs
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import QuickPost from 'containers/QuickPost/Loadable';
import ContentCreation from 'containers/ContentCreation/Loadable';
import Share from 'containers/Share/Loadable';
import PrivateMessage from 'containers/PrivateMessage/Loadable';
import UserLiked from 'containers/UserLiked/Loadable';
import GalleryCarouselContainer from 'containers/GalleryCarouselContainer/Loadable';
import FeedModal from 'containers/FeedModal/Loadable';
import CreatePinnedCommunityModal from 'containers/CreatePinnedCommunity/Loadable';
import DirectoryPrivateMessage from 'containers/DirectoryPrivateMessage/Loadable';
import Statistics from 'containers/Statistics/Loadable';
import Digest from 'containers/Digest/Loadable';
import CreateDigest from 'containers/CreateDigest/Loadable';
import CarouselManager from 'containers/CarouselManager/Loadable';
import CreateCarousel from 'containers/CreateCarousel/Loadable';
import WidgetManager from 'containers/WidgetManager/Loadable';
import CreateWidget from 'containers/CreateWidget/Loadable';
import CreateCommunity from 'containers/CreateCommunity/Loadable';
import EditCommunity from 'containers/EditCommunity/Loadable';
import DocumentBarDialog from 'components/DocumentBarDialog/Loadable';
import { EditComment } from 'containers/CommentsP2V8/Loadable';
import SocialWall from 'containers/SocialWall/Loadable';
import LivelyTransfer from 'containers/LivelyTransfer/Loadable';
import {
  makeSelectCreateQuickPost,
  makeSelectEditQuickPost,
  makeSelectQuickPostUid,
  makeSelectContentCreation,
  makeSelectContentEdit,
  makeSelectContentUid,
  makeSelectContentType,
  makeSelectShare,
  makeSelectPrivateMessage,
  makeSelectOpenFeedModal,
  makeSelectFeedUid,
  makeSelectOpenGallery,
  makeSelectGalleryActiveIndex,
  makeSelectGalleryOptions,
  makeSelectGalleryType,
  makeSelectOpenUserLiked,
  makeSelectIsCreatePinnedCommunityOpen,
  makeSelectPinnedCommunityId,
  makeSelectOpenDirectoryPrivateMessage,
  makeSelectOpenStatistics,
  makeSelectOpenDigest,
  makeSelectCreateDigest,
  makeSelectEditDigestId,
  makeSelectOpenCarouselManager,
  makeSelectOpenCreateCarousel,
  makeSelectCreateCarouselLevel,
  makeSelectEditCarouselUid,
  makeSelectOpenWidgetManager,
  makeSelectWidgetManagerDisplayOption,
  makeSelectWidgetManagerCommunityUid,
  makeSelectOpenCreateWidget,
  makeSelectEditWidgetUid,
  makeSelectOpenDocumentBar,
  makeSelectCreateWidgetCommunityUid,
  makeSelectCarouselManagerCommunityUid,
  makeSelectCreateCarouselCommunityUid,
  makeSelectOpenSocialWall,
  makeSelectOpenCreateCommunity,
  makeSelectEditCommunityUid,
  makeSelectOpenEditCommunityImage,
  makeSelectEditCommunityImageUid,
  makeSelectOpenLivelyTransfer,
  makeSelectDocumentBarOptions,
} from 'containers/AuthBase/selectors';
import { closeGallery } from 'containers/AuthBase/actions';
import { makeSelectOpenEditComment } from 'containers/CommentsP2V8/selectors';
import { CarouselDialog } from '../../common';

function Dialogs() {
  const communityRouteMatch = useRouteMatch(
    '/community/:label/:uid/:tab/:track/:referer',
  );
  const createQuickPost = useSelector(makeSelectCreateQuickPost());
  const contentType = useSelector(makeSelectContentType());
  const editQuickPost = useSelector(makeSelectEditQuickPost());
  const quickPostUid = useSelector(makeSelectQuickPostUid());
  const contentCreation = useSelector(makeSelectContentCreation());
  const contentEdit = useSelector(makeSelectContentEdit());
  const contentUid = useSelector(makeSelectContentUid());
  const share = useSelector(makeSelectShare());
  const privateMessage = useSelector(makeSelectPrivateMessage());
  const openFeedModal = useSelector(makeSelectOpenFeedModal());
  const feedUid = useSelector(makeSelectFeedUid());
  const openGallery = useSelector(makeSelectOpenGallery());
  const galleryActiveIndex = useSelector(makeSelectGalleryActiveIndex());
  const galleryOptions = useSelector(makeSelectGalleryOptions());
  const galleryType = useSelector(makeSelectGalleryType());
  const openUserLiked = useSelector(makeSelectOpenUserLiked());
  const openStatistics = useSelector(makeSelectOpenStatistics());
  const openDigest = useSelector(makeSelectOpenDigest());
  const createDigest = useSelector(makeSelectCreateDigest());
  const editDigestId = useSelector(makeSelectEditDigestId());
  const openCarouselManager = useSelector(makeSelectOpenCarouselManager());
  const openCreateCarousel = useSelector(makeSelectOpenCreateCarousel());
  const createCarouselLevel = useSelector(makeSelectCreateCarouselLevel());
  const editCarouselUid = useSelector(makeSelectEditCarouselUid());
  const openWidgetManager = useSelector(makeSelectOpenWidgetManager());
  const widgetManagerDisplayOption = useSelector(
    makeSelectWidgetManagerDisplayOption(),
  );
  const widgetManagerCommunityUid = useSelector(
    makeSelectWidgetManagerCommunityUid(),
  );
  const openCreateWidget = useSelector(makeSelectOpenCreateWidget());
  const editWidgetUid = useSelector(makeSelectEditWidgetUid());
  const openDocumentBar = useSelector(makeSelectOpenDocumentBar());
  const createWidgetCommunityUid = useSelector(
    makeSelectCreateWidgetCommunityUid(),
  );
  const carouselManagerCommunityUid = useSelector(
    makeSelectCarouselManagerCommunityUid(),
  );
  const createCarouselCommunityUid = useSelector(
    makeSelectCreateCarouselCommunityUid(),
  );
  const openSocialWall = useSelector(makeSelectOpenSocialWall());

  // create pinned community related data
  const isCreatePinnedCommunityOpen = useSelector(
    makeSelectIsCreatePinnedCommunityOpen(),
  );
  const selectedPinnedCommunity = useSelector(makeSelectPinnedCommunityId());
  const openDirectoryPrivateMessage = useSelector(
    makeSelectOpenDirectoryPrivateMessage(),
  );
  const openEditComment = useSelector(makeSelectOpenEditComment());
  const openCreateCommunity = useSelector(makeSelectOpenCreateCommunity());
  const editCommunityUid = useSelector(makeSelectEditCommunityUid());
  const openEditCommunityImage = useSelector(
    makeSelectOpenEditCommunityImage(),
  );
  const editCommunityImageUid = useSelector(makeSelectEditCommunityImageUid());
  const openLivelyTransfer = useSelector(makeSelectOpenLivelyTransfer());
  const documentBarOptions = useSelector(makeSelectDocumentBarOptions());
  const dispatch = useDispatch();
  return (
    <>
      {createQuickPost && (
        <QuickPost
          open={createQuickPost}
          type={contentType}
          communityUid={
            communityRouteMatch
              ? communityRouteMatch.params.uid
              : communityRouteMatch
          }
          communityTabUid={
            communityRouteMatch
              ? communityRouteMatch.params.tab
              : communityRouteMatch
          }
        />
      )}
      {editQuickPost && (
        <QuickPost open={editQuickPost} type={contentType} uid={quickPostUid} />
      )}
      {contentCreation && (
        <ContentCreation
          open={contentCreation}
          communityUid={
            communityRouteMatch
              ? communityRouteMatch.params.uid
              : communityRouteMatch
          }
          communityTabUid={
            communityRouteMatch
              ? communityRouteMatch.params.tab
              : communityRouteMatch
          }
        />
      )}
      {contentEdit && <ContentCreation open={contentEdit} uid={contentUid} />}
      {share && <Share open={share} />}
      {privateMessage && <PrivateMessage open={privateMessage} />}
      {openFeedModal && <FeedModal uid={feedUid} />}
      {openGallery && (
        <CarouselDialog
          open={openGallery}
          onClose={() => dispatch(closeGallery())}
          fullScreen
        >
          <GalleryCarouselContainer
            type={galleryType}
            activeIndex={galleryActiveIndex}
            handleClose={() => dispatch(closeGallery())}
            options={galleryOptions}
          />
        </CarouselDialog>
      )}
      {openUserLiked && <UserLiked open={openUserLiked} />}
      {isCreatePinnedCommunityOpen && (
        <CreatePinnedCommunityModal
          isOpen={isCreatePinnedCommunityOpen}
          pinnedCommunityId={selectedPinnedCommunity}
        />
      )}
      {openDirectoryPrivateMessage && (
        <DirectoryPrivateMessage open={openDirectoryPrivateMessage} />
      )}
      {openStatistics && <Statistics />}
      {openDigest && <Digest />}
      {createDigest && <CreateDigest editDigestId={editDigestId} />}
      {openCarouselManager && (
        <CarouselManager communityUid={carouselManagerCommunityUid} />
      )}
      {openCreateCarousel && (
        <CreateCarousel
          createCarouselLevel={createCarouselLevel}
          uid={editCarouselUid}
          communityUid={createCarouselCommunityUid}
        />
      )}
      {openWidgetManager && (
        <WidgetManager
          displayOption={widgetManagerDisplayOption}
          communityUid={widgetManagerCommunityUid}
        />
      )}
      {openDocumentBar && <DocumentBarDialog {...documentBarOptions} />}
      {openCreateWidget && (
        <CreateWidget
          uid={editWidgetUid}
          communityUid={createWidgetCommunityUid}
        />
      )}
      {openEditComment && <EditComment />}
      {openSocialWall && <SocialWall />}
      {openCreateCommunity && (
        <CreateCommunity communityUid={editCommunityUid} />
      )}
      {openEditCommunityImage && (
        <EditCommunity communityUid={editCommunityImageUid} />
      )}
      {openLivelyTransfer && <LivelyTransfer />}
    </>
  );
}

Dialogs.propTypes = {};

export default memo(Dialogs);

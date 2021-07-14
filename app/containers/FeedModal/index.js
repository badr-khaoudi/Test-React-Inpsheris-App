/* eslint-disable indent */
/**
 *
 * FeedModal
 *
 */

import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import copy from 'copy-to-clipboard';
import {
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  CircularProgress,
  Typography,
  Breadcrumbs,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import {
  ChatBubbleOutline,
  FavoriteBorder,
  Favorite,
  Share,
  MailOutline,
  Translate,
  DeleteOutline,
  Edit,
  SaveAlt,
  NavigateNext,
  Close,
  Forum,
  AddCircleOutline,
  Link as LinkIcon,
} from '@material-ui/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createMarkup } from 'utils/helpers/createMarkup';
import { ActionButton, SimpleMenu, Comments } from 'containers/Feed/Wrapper';
import CheckType from 'containers/Feed/checkType';
import {
  closeFeedModal,
  editQuickPost,
  contentEdit,
  share,
  privateMessage,
  openUserLiked,
} from 'containers/AuthBase/actions';
import { makeSelectLanguage } from 'containers/AuthBase/selectors';
import Comment from 'containers/Comment/Loadable';
import withConfirmation from 'utils/helpers/withConfirmation';
import {
  makeSelectFeed,
  makeSelectCommunity,
  makeSelectCommunityTab,
} from 'containers/GlobalEntities/selectors';
import {
  likeFeed,
  unlikeFeed,
  deleteFeed,
  translateFeedModal,
} from 'containers/GlobalEntities/actions';
import UserAvatar from 'components/UserAvatar';
import { useCloseEffect } from 'utils/helpers/useCloseEffect';
import {
  makeSelectContentDetailsLoading,
  makeSelectContentDetailsError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getContentDetails } from './actions';
import messages from './messages';
import { HeaderImage } from './Wrapper';

const DeleteIcon = props => (
  <ActionButton {...props}>
    <DeleteOutline fontSize="inherit" />
  </ActionButton>
);

export function FeedModal(props) {
  const {
    uid,
    dispatchContentDetails,
    contentDetailsLoading,
    dispatchLikeContent,
    dispatchUnlikeContent,
    dispatchDeleteContent,
    languages,
    match,
    history,
    dispatchCloseFeedModal,
    dispatchEditQuickPost,
    dispatchContentEdit,
    dispatchShare,
    dispatchPrivateMessage,
    dispatchOpenUserLiked,
    dispatchTranslateFeedModal,
  } = props;
  useInjectReducer({ key: 'feedModal', reducer });
  useInjectSaga({ key: 'feedModal', saga });

  const contentUid = useMemo(
    () => (match.params.content ? match.params.content : uid),
    [match],
  );

  useEffect(() => {
    dispatchContentDetails({
      uid: contentUid,
      referer: match.params.referer,
      track: match.params.track,
    });
  }, []);

  const contentDetails = useSelector(makeSelectFeed(contentUid)) || {};

  const community =
    useSelector(makeSelectCommunity(contentDetails.community)) || {};
  const communityTab =
    useSelector(makeSelectCommunityTab(contentDetails.communityTab)) || {};

  useCloseEffect(() => {
    if (uid !== undefined) {
      dispatchCloseFeedModal();
    }
  });

  const {
    type,
    parseText,
    detailBlocks: blocks,
    lastActivityDate,
    subTitle,
  } = contentDetails;

  const heading = _.find(blocks, { type: 'heading' });
  const userUid = useMemo(
    () => contentDetails.lastActivityUser || contentDetails.author,
    [contentDetails],
  );

  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const handleShare = e => setShareAnchorEl(e.currentTarget);
  const handleShareClose = () => setShareAnchorEl(null);

  const [translateAnchorEl, setTranslateAnchorEl] = useState(null);
  const handleTranslate = e => setTranslateAnchorEl(e.currentTarget);
  const handleTranslateClose = () => setTranslateAnchorEl(null);

  const handleTranslateContent = language => {
    dispatchTranslateFeedModal({
      language,
      uid: contentUid,
    });
    handleTranslateClose();
  };

  // const referrer = useMemo(
  //   () => (match.params.referer ? match.params.referer : ''),
  //   [match],
  // );

  const url =
    community && communityTab
      ? `/#!/community/${encodeURIComponent(community.label)}/${
          community.uid
        }/${communityTab.uid}/${contentUid}/viewdetail`
      : null;

  const copyUrl = () => {
    copy(`${window.location.origin}${url}`);
    handleShareClose();
  };

  const handleClose = () => {
    if (uid === undefined) {
      return history.goBack();
    }
    if (history.action === 'POP') {
      dispatchCloseFeedModal();
      return history.push({ pathname: '/' });
    }
    return dispatchCloseFeedModal();
  };

  const handleDeleteContent = () => {
    dispatchDeleteContent({
      uid: contentUid,
    });
    handleClose();
  };

  const Delete = withConfirmation(
    DeleteIcon,
    handleDeleteContent,
    null,
    'Are you sure you want to delete this content ? This content will be definitely deleted, from both the homepage and the community.',
  );

  const handleShareContent = action => {
    handleShareClose();
    dispatchShare(action, contentDetails);
  };

  return (
    <>
      <Helmet>
        <title>{heading && heading.title}</title>
      </Helmet>
      <Dialog
        open={uid !== undefined || match.params !== undefined}
        onClose={handleClose}
        scroll="body"
        fullWidth
        maxWidth="md"
        disableEnforceFocus
      >
        <DialogContent>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: 'absolute', top: 5, right: 5 }}
          >
            <Close />
          </IconButton>
          {contentDetailsLoading && (
            <Grid container spacing={1} data-testid="loading">
              <Grid item>
                <CircularProgress aria-busy="true" />
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  <FormattedMessage {...messages.loading} />
                </Typography>
              </Grid>
            </Grid>
          )}
          {!contentDetailsLoading && !_.isEmpty(contentDetails.detailBlocks) && (
            <>
              {community && communityTab && (
                <Breadcrumbs
                  separator={<NavigateNext fontSize="small" />}
                  style={{ marginBottom: 60 }}
                >
                  <Link to="/">Home</Link>
                  <Link to="/communities">Communities</Link>
                  <Link
                    to={`/community/${encodeURIComponent(community.label)}/${
                      community.uid
                    }`}
                  >
                    {community.label}
                  </Link>
                  <Typography>{communityTab.tabName}</Typography>
                </Breadcrumbs>
              )}
              <Grid container justify="flex-end" wrap="nowrap">
                <Grid item xs={10} zeroMinWidth>
                  {community && communityTab && parseText && (
                    <Link
                      to={`/community/${encodeURIComponent(community.label)}/${
                        community.uid
                      }/${communityTab.uid}/${
                        contentDetails.uid
                      }/viewdetail/HP`}
                    >
                      <Typography
                        variant="h6"
                        gutterBottom
                        dangerouslySetInnerHTML={createMarkup(parseText)}
                      />
                    </Link>
                  )}
                  {!(community && communityTab) && parseText && (
                    <Typography
                      variant="h6"
                      gutterBottom
                      dangerouslySetInnerHTML={createMarkup(parseText)}
                    />
                  )}
                  {heading && heading.subTitle && (
                    <Typography variant="body1" gutterBottom>
                      {heading.subTitle}
                    </Typography>
                  )}
                  <Grid container spacing={2} alignItems="center">
                    {type !== 'jobOffer' && (
                      <>
                        <Grid item>
                          <UserAvatar
                            userUid={userUid}
                            variant="Avatar"
                            size="sm"
                          />
                        </Grid>
                        <Grid item>
                          <UserAvatar userUid={userUid} variant="DisplayName" />
                        </Grid>
                      </>
                    )}
                    <Grid item>
                      {moment(lastActivityDate).format('DD MMM YYYY, HH[h]mm')}
                    </Grid>
                  </Grid>
                  {community && (
                    <Link
                      to={`/community/${encodeURIComponent(community.label)}/${
                        community.uid
                      }`}
                    >
                      <Typography variant="h6">{community.label}</Typography>
                    </Link>
                  )}
                </Grid>
              </Grid>
              {type === 'article' && heading && heading.imageHeader && (
                <HeaderImage heading={heading}>
                  <img src={heading.imageHeader} alt={contentDetails.title} />
                </HeaderImage>
              )}
              <Divider style={{ margin: '20px 0' }} />
              <Grid container wrap="nowrap">
                <Grid item xs={2}>
                  <Grid container direction="column" alignItems="center">
                    {contentDetails.allowComment && (
                      <Grid item>
                        <ActionButton>
                          <ChatBubbleOutline fontSize="inherit" />
                          {contentDetails.commentCount > 0 && (
                            <Typography
                              variant="body1"
                              style={{ marginLeft: 5 }}
                            >
                              {`(${contentDetails.commentCount})`}
                            </Typography>
                          )}
                        </ActionButton>
                      </Grid>
                    )}

                    {contentDetails.authorizeLike && (
                      <Grid item>
                        <ActionButton
                          onClick={() =>
                            contentDetails.userLiked
                              ? dispatchUnlikeContent({
                                  contentUid,
                                })
                              : dispatchLikeContent({
                                  contentUid,
                                })
                          }
                        >
                          {contentDetails.userLiked ? (
                            <Favorite fontSize="inherit" />
                          ) : (
                            <FavoriteBorder fontSize="inherit" />
                          )}
                          {contentDetails.likeCount > 0 && (
                            <Typography
                              variant="body1"
                              onClick={e => {
                                e.stopPropagation();
                                dispatchOpenUserLiked({
                                  content: contentUid,
                                });
                              }}
                              style={{ marginLeft: 5 }}
                            >
                              {`(${contentDetails.likeCount})`}
                            </Typography>
                          )}
                        </ActionButton>
                      </Grid>
                    )}
                    {contentDetails.authorizeShare && (
                      <Grid item>
                        <ActionButton onClick={handleShare}>
                          <Share fontSize="inherit" />
                        </ActionButton>
                      </Grid>
                    )}
                    {contentDetails.type === 'document' && (
                      <Grid item>
                        <ActionButton>
                          <SaveAlt fontSize="inherit" />
                        </ActionButton>
                      </Grid>
                    )}
                    {contentDetails.translationStatus && (
                      <Grid item>
                        <ActionButton onClick={handleTranslate}>
                          <Translate fontSize="inherit" />
                        </ActionButton>
                      </Grid>
                    )}
                    {contentDetails.canEdit && contentDetails.type !== 'share' && (
                      <Grid item>
                        <ActionButton
                          onClick={() => {
                            if (contentDetails.type === 'quickpost') {
                              return dispatchEditQuickPost(
                                'quickpost',
                                contentUid,
                              );
                            }
                            if (contentDetails.type === 'FAQquestion') {
                              return dispatchEditQuickPost('faq', contentUid);
                            }
                            if (
                              contentDetails.type === 'quickSharingOfTheLink'
                            ) {
                              return dispatchEditQuickPost(
                                'quickSharingOfTheLink',
                                uid,
                              );
                            }
                            return dispatchContentEdit(contentUid);
                          }}
                        >
                          <Edit fontSize="inherit" />
                        </ActionButton>
                      </Grid>
                    )}
                    {contentDetails.canEdit && (
                      <Grid item>
                        <Delete />
                      </Grid>
                    )}
                  </Grid>
                </Grid>
                <Grid item xs={10} zeroMinWidth>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {CheckType(
                        type,
                        blocks,
                        parseText,
                        subTitle || null,
                        true,
                        contentUid,
                      )}
                    </Grid>
                    <Grid item xs>
                      <Comments square elevation={0}>
                        <Comment
                          comments={contentDetails.comments}
                          type={contentDetails.type}
                          content={contentUid}
                          community={community.uid}
                        />
                      </Comments>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
          <SimpleMenu
            elevation={0}
            anchorEl={shareAnchorEl}
            open={Boolean(shareAnchorEl)}
            onClose={handleShareClose}
          >
            {contentDetails.authorizeShare && (
              <MenuItem dense onClick={() => handleShareContent('share')}>
                <ListItemIcon>
                  <Forum fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Share to community" />
              </MenuItem>
            )}
            {contentDetails.authorizeShare && (
              <MenuItem
                dense
                onClick={() => {
                  handleShareClose();
                  dispatchPrivateMessage(contentDetails);
                }}
              >
                <ListItemIcon>
                  <MailOutline fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Private Message" />
              </MenuItem>
            )}
            <MenuItem dense onClick={() => handleShareContent('copy')}>
              <ListItemIcon>
                <AddCircleOutline fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Share as new content" />
            </MenuItem>
            <MenuItem dense onClick={copyUrl}>
              <ListItemIcon>
                <LinkIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Copy the url" />
            </MenuItem>
          </SimpleMenu>
          <SimpleMenu
            elevation={0}
            anchorEl={translateAnchorEl}
            open={Boolean(translateAnchorEl)}
            onClose={handleTranslateClose}
          >
            {_.map(
              languages,
              language =>
                language.active && (
                  <MenuItem
                    key={language.code}
                    onClick={() => handleTranslateContent(language.code)}
                    selected={language.code === contentDetails.language}
                  >
                    {language.name}
                  </MenuItem>
                ),
            )}
          </SimpleMenu>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

FeedModal.propTypes = {
  dispatchContentDetails: PropTypes.func,
  dispatchLikeContent: PropTypes.func,
  dispatchUnlikeContent: PropTypes.func,
  dispatchDeleteContent: PropTypes.func,
  uid: PropTypes.string,
  contentDetails: PropTypes.object,
  contentDetailsLoading: PropTypes.bool,
  languages: PropTypes.array,
  match: PropTypes.object,
  history: PropTypes.object,
  dispatchCloseFeedModal: PropTypes.func,
  dispatchEditQuickPost: PropTypes.func,
  dispatchContentEdit: PropTypes.func,
  dispatchShare: PropTypes.func,
  dispatchPrivateMessage: PropTypes.func,
  dispatchOpenUserLiked: PropTypes.func,
  dispatchTranslateFeedModal: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  contentDetailsLoading: makeSelectContentDetailsLoading(),
  contentDetailsError: makeSelectContentDetailsError(),
  languages: makeSelectLanguage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchContentDetails: options => dispatch(getContentDetails(options)),
    dispatchLikeContent: options => dispatch(likeFeed(options)),
    dispatchUnlikeContent: options => dispatch(unlikeFeed(options)),
    dispatchDeleteContent: options => dispatch(deleteFeed(options)),
    dispatchCloseFeedModal: () => dispatch(closeFeedModal()),
    dispatchEditQuickPost: (contentType, options) =>
      dispatch(editQuickPost(contentType, options)),
    dispatchContentEdit: options => dispatch(contentEdit(options)),
    dispatchShare: (action, content) => dispatch(share(action, content)),
    dispatchPrivateMessage: content => dispatch(privateMessage(content)),
    dispatchOpenUserLiked: options => dispatch(openUserLiked(options)),
    dispatchTranslateFeedModal: options =>
      dispatch(translateFeedModal(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withRouter(FeedModal));

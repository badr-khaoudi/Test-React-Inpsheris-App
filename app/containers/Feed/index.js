/* eslint-disable indent */
/**
 *
 * Feed
 *
 */

import React, { memo, useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
// import { FormattedMessage, injectIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import copy from 'copy-to-clipboard';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { initials } from 'utils/helpers/avatarInitials';
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import {
  MoreVert,
  ChatBubbleOutline,
  FavoriteBorder,
  Favorite,
  Share,
  MailOutline,
  Translate,
  DeleteOutline,
  Edit,
  SaveAlt,
  Forum,
  AddCircleOutline,
  Link as LinkIcon,
  Close,
} from '@material-ui/icons';
import { makeSelectLanguage } from 'containers/AuthBase/selectors';
import {
  editQuickPost,
  contentEdit,
  share,
  privateMessage,
  openFeedModal,
  openUserLiked,
} from 'containers/AuthBase/actions';
import ActionSentence from 'components/ActionSentence';
import Comment from 'containers/Comment/Loadable';
import withConfirmation from 'utils/helpers/withConfirmation';
import CheckType from './checkType';
import { makeSelectContent } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import {
  likeContent,
  unlikeContent,
  translateContent,
  deleteContent,
  commentList,
} from './actions';
import {
  OuterIcon,
  CommunityLogo,
  CommunityAvatar,
  ActivityDate,
  ActionButton,
  SimpleMenu,
  Comments,
} from './Wrapper';

const DeleteIcon = props => (
  <MenuItem dense {...props}>
    <ListItemIcon>
      <DeleteOutline fontSize="small" />
    </ListItemIcon>
    <ListItemText primary="Delete" />
  </MenuItem>
);

export function Feed(props) {
  useInjectReducer({ key: 'feed', reducer });
  useInjectSaga({ key: 'feed', saga });

  const {
    content: feedContent,
    dispatchLikeContent,
    dispatchUnlikeContent,
    dispatchTranslateContent,
    translatedContent,
    dispatchDeleteContent,
    languages,
    dispatchEditQuickPost,
    dispatchContentEdit,
    dispatchShare,
    dispatchPrivateMessage,
    location,
    dispatchOpenFeedModal,
    referrer,
    history,
    dispatchCommentList,
    dispatchOpenUserLiked,
  } = props;

  const content = useMemo(() => translatedContent || feedContent, [
    translatedContent,
    feedContent,
  ]);

  const uid = useMemo(() => content.sourceId || content.uid, [content]);

  const [actionAnchorEl, setActionAnchorEl] = useState(null);
  const handleMore = e => setActionAnchorEl(e.currentTarget);
  const handleActionClose = () => setActionAnchorEl(null);

  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const handleShare = e => setShareAnchorEl(e.currentTarget);
  const handleShareClose = () => setShareAnchorEl(null);

  const [translateAnchorEl, setTranslateAnchorEl] = useState(null);
  const handleTranslate = e => setTranslateAnchorEl(e.currentTarget);
  const handleTranslateClose = () => setTranslateAnchorEl(null);

  const [commentExpanded, setCommentExpanded] = useState(false);

  useEffect(() => {
    if (!_.isEmpty(content.comments)) {
      setCommentExpanded(content.isAnswered);
    }
  }, [content]);

  const handleTranslateContent = language => {
    dispatchTranslateContent({
      language,
      responseType: 'feed',
      uid,
    });
    handleTranslateClose();
  };

  const handleDeleteContent = () => {
    dispatchDeleteContent(referrer, {
      uid,
    });
    handleActionClose();
  };

  const Delete = withConfirmation(
    DeleteIcon,
    handleDeleteContent,
    handleActionClose,
    'Are you sure you want to delete this content ? This content will be definitely deleted, from both the homepage and the community.',
  );

  const userDetail = useMemo(() => content.lastActivityUser || content.author, [
    content,
  ]);

  const copyUrl = () => {
    if (content.type !== 'meetingEvent') {
      copy(
        `${window.location.origin}/#!/community/${encodeURIComponent(
          content.community.label,
        )}/${content.community.uid}/${
          content.communityTab.uid
        }/${uid}/viewdetail`,
      );
    }
    handleShareClose();
  };

  const handleShareContent = action => {
    handleShareClose();
    dispatchShare(action, feedContent);
  };

  return (
    <>
      <Grid container wrap="nowrap">
        <Grid item>
          <OuterIcon>
            {content.community ? (
              <Link
                to={`/${encodeURIComponent(content.community.label)}/${
                  content.community.uid
                }`}
              >
                {content.community.headerLogoUrl ? (
                  <CommunityLogo src={content.community.headerLogoUrl} />
                ) : (
                  <CommunityAvatar>
                    {initials(content.community.label)}
                  </CommunityAvatar>
                )}
              </Link>
            ) : (
              <Link to={`/myprofile/${userDetail.uid}/About`}>
                <CommunityAvatar>
                  {initials([userDetail.firstName, userDetail.lastName])}
                </CommunityAvatar>
              </Link>
            )}
            <ActivityDate variant="body2" display="block">
              {moment(content.publicationStartDate).format(
                'DD MMM YYYY, HH:mm',
              )}
            </ActivityDate>
          </OuterIcon>
        </Grid>
        <Grid item xs zeroMinWidth>
          <Card
            elevation={0}
            style={{
              boxShadow:
                '2px 3px 5px rgba(191, 227, 253, 0.25), 0px -2px 13px 1px rgba(191, 227, 253, 0.25)',
              marginBottom: 30,
            }}
          >
            <CardHeader
              action={
                (content.type === 'document' ||
                  (content.canEdit && content.type !== 'share') ||
                  content.canEdit) && (
                  <IconButton aria-label="more" onClick={handleMore}>
                    <MoreVert fontSize="small" />
                  </IconButton>
                )
              }
              title={
                content.type !== 'jobOffer' && (
                  <Link to={`/myprofile/${userDetail.uid}/About`}>
                    {`${userDetail.firstName} ${userDetail.lastName}`}
                  </Link>
                )
              }
              subheader={
                <Typography variant="subtitle1">
                  <ActionSentence content={content} />
                </Typography>
              }
            />
            <Divider variant="middle" />
            {content.type !== 'meetingEvent' ? (
              <CardContent
                style={{ cursor: 'pointer' }}
                onClick={e => {
                  e.preventDefault();
                  history.push({
                    pathname: `/community/${encodeURIComponent(
                      content.community.label,
                    )}/${content.community.uid}/${
                      content.communityTab.uid
                    }/${uid}/viewdetail/${referrer}`,
                    state: { background: location },
                  });
                }}
              >
                {CheckType(
                  content.type,
                  content.blocks,
                  content.parseText,
                  content.subTitle || null,
                )}
              </CardContent>
            ) : (
              <CardContent
                onClick={e => {
                  e.preventDefault();
                  dispatchOpenFeedModal(
                    content.type === 'share'
                      ? _.find(content.blocks, { type: 'reference' }).refUid
                      : uid,
                  );
                }}
                style={{ cursor: 'pointer' }}
              >
                {CheckType(
                  content.type,
                  content.blocks,
                  content.parseText,
                  content.subTitle || null,
                )}
              </CardContent>
            )}
            <CardActions style={{ paddingLeft: 16 }}>
              <Grid container>
                <Grid item xs>
                  {!_.isEmpty(content.hashtags) &&
                    _.map(content.hashtags, (hashtag, index) => (
                      <Link
                        to={`/search/general/all/global/${encodeURIComponent(
                          hashtag,
                        )}/true///0`}
                        key={`${hashtag}${index}`}
                      >
                        {hashtag}
                      </Link>
                    ))}
                </Grid>
                <Grid item>
                  {content.type === 'jobOffer' && (
                    <a
                      href={content.blocks[0].path}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                    >
                      Apply for this job
                    </a>
                  )}
                  {content.type === 'share' &&
                    _.find(content.blocks, { type: 'reference' }).refType ===
                      'jobOffer' && (
                      <a
                        href={_.find(content.blocks, { type: 'jobOffer' }).path}
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                      >
                        Apply for this job
                      </a>
                    )}
                  {content.allowComment && (
                    <ActionButton
                      onClick={() => {
                        dispatchCommentList({
                          content: uid,
                          lastTwoComments: true,
                        });
                        setCommentExpanded(!commentExpanded);
                      }}
                    >
                      <ChatBubbleOutline fontSize="inherit" />
                      {content.commentCount > 0 && (
                        <Typography variant="body1" style={{ marginLeft: 5 }}>
                          {`(${content.commentCount})`}
                        </Typography>
                      )}
                    </ActionButton>
                  )}
                  {feedContent.authorizeLike && (
                    <ActionButton
                      onClick={() =>
                        feedContent.userLiked
                          ? dispatchUnlikeContent(referrer, { contentUid: uid })
                          : dispatchLikeContent(referrer, { contentUid: uid })
                      }
                    >
                      {feedContent.userLiked ? (
                        <Favorite fontSize="inherit" />
                      ) : (
                        <FavoriteBorder fontSize="inherit" />
                      )}
                      {feedContent.likeCount > 0 && (
                        <Typography
                          variant="body1"
                          onClick={e => {
                            e.stopPropagation();
                            dispatchOpenUserLiked({ content: uid });
                          }}
                          style={{ marginLeft: 5 }}
                        >
                          {`(${feedContent.likeCount})`}
                        </Typography>
                      )}
                    </ActionButton>
                  )}
                  {content.authorizeShare && (
                    <ActionButton onClick={handleShare}>
                      <Share fontSize="inherit" />
                    </ActionButton>
                  )}
                  {content.translationStatus && (
                    <ActionButton onClick={handleTranslate}>
                      <Translate fontSize="inherit" />
                    </ActionButton>
                  )}
                </Grid>
              </Grid>
            </CardActions>
            <Collapse in={commentExpanded} timeout="auto" unmountOnExit>
              <Comments square elevation={0}>
                <Grid container justify="space-between" spacing={2}>
                  <Grid item>
                    <Button size="small">View all comments</Button>
                  </Grid>
                  <Grid item>
                    <Button
                      size="small"
                      startIcon={<Close />}
                      onClick={() => setCommentExpanded(false)}
                    >
                      Close
                    </Button>
                  </Grid>
                </Grid>
                <Comment
                  comments={feedContent.comments}
                  type={content.type}
                  content={uid}
                  community={content.community && content.community.uid}
                  author={
                    content.type === 'FAQquestion'
                      ? content.author && content.author.uid
                      : ''
                  }
                />
              </Comments>
            </Collapse>
          </Card>
          <SimpleMenu
            elevation={0}
            anchorEl={actionAnchorEl}
            open={Boolean(actionAnchorEl)}
            onClose={handleActionClose}
          >
            {content.type === 'document' && (
              <MenuItem dense>
                <ListItemIcon>
                  <SaveAlt fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Download" />
              </MenuItem>
            )}
            {content.canEdit && content.type !== 'share' && (
              <MenuItem
                dense
                onClick={() => {
                  handleActionClose();
                  if (content.type === 'quickpost') {
                    return dispatchEditQuickPost('quickpost', uid);
                  }
                  if (content.type === 'FAQquestion') {
                    return dispatchEditQuickPost('faq', uid);
                  }
                  return dispatchContentEdit(uid);
                }}
              >
                <ListItemIcon>
                  <Edit fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Edit" />
              </MenuItem>
            )}
            {content.canEdit && <Delete />}
          </SimpleMenu>
          <SimpleMenu
            elevation={0}
            anchorEl={shareAnchorEl}
            open={Boolean(shareAnchorEl)}
            onClose={handleShareClose}
          >
            {content.authorizeShare && (
              <MenuItem dense onClick={() => handleShareContent('share')}>
                <ListItemIcon>
                  <Forum fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Share to community" />
              </MenuItem>
            )}
            {content.authorizeShare && (
              <MenuItem
                dense
                onClick={() => {
                  handleShareClose();
                  dispatchPrivateMessage(feedContent);
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
                    dense
                    onClick={() => handleTranslateContent(language.code)}
                    selected={language.code === content.language}
                  >
                    {language.name}
                  </MenuItem>
                ),
            )}
          </SimpleMenu>
        </Grid>
      </Grid>
    </>
  );
}

Feed.propTypes = {
  dispatchLikeContent: PropTypes.func,
  dispatchUnlikeContent: PropTypes.func,
  dispatchTranslateContent: PropTypes.func,
  dispatchDeleteContent: PropTypes.func,
  translatedContent: PropTypes.object,
  content: PropTypes.object,
  languages: PropTypes.array,
  dispatchEditQuickPost: PropTypes.func,
  dispatchContentEdit: PropTypes.func,
  dispatchShare: PropTypes.func,
  dispatchPrivateMessage: PropTypes.func,
  location: PropTypes.object,
  dispatchOpenFeedModal: PropTypes.func,
  referrer: PropTypes.string,
  history: PropTypes.object,
  dispatchCommentList: PropTypes.func,
  dispatchOpenUserLiked: PropTypes.func,
};

const mapStateToProps = (state, ownProps) =>
  createStructuredSelector({
    translatedContent: makeSelectContent(ownProps.content.uid),
    languages: makeSelectLanguage(),
  });

function mapDispatchToProps(dispatch) {
  return {
    dispatchLikeContent: (referrer, options) =>
      dispatch(likeContent(referrer, options)),
    dispatchUnlikeContent: (referrer, options) =>
      dispatch(unlikeContent(referrer, options)),
    dispatchTranslateContent: options => dispatch(translateContent(options)),
    dispatchDeleteContent: (referrer, options) =>
      dispatch(deleteContent(referrer, options)),
    dispatchEditQuickPost: (contentType, options) =>
      dispatch(editQuickPost(contentType, options)),
    dispatchContentEdit: options => dispatch(contentEdit(options)),
    dispatchShare: (action, content) => dispatch(share(action, content)),
    dispatchPrivateMessage: content => dispatch(privateMessage(content)),
    dispatchOpenFeedModal: options => dispatch(openFeedModal(options)),
    dispatchCommentList: options => dispatch(commentList(options)),
    dispatchOpenUserLiked: options => dispatch(openUserLiked(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(withRouter(Feed));

/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/**
 *
 * Feed
 *
 */

import React, { memo, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
// import { FormattedMessage, injectIntl } from 'react-intl';
import LazyLoad from 'react-lazyload';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import copy from 'copy-to-clipboard';
import LinesEllipsis from 'react-lines-ellipsis';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { createMarkup } from 'utils/helpers/createMarkup';
import {
  Grid,
  ListItemIcon,
  ListItemText,
  Typography,
  Collapse,
  TextField,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
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
// import CheckType from './checkType';
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
import useFeedModalPath from 'utils/helpers/useFeedModalPath';
import useStyles from 'components/FeedTypesV8/useStyles';
import FeedSkeleton from 'components/FeedTypesV8/FeedSkeleton';
import { makeSelectFeed } from 'containers/GlobalEntities/selectors';
import CommunityAvatar from 'components/CommunityAvatar';
import UserAvatar from 'components/UserAvatar';
import { makeSelectContent } from 'containers/Feed/selectors';
import reducer from 'containers/Feed/reducer';
import saga from 'containers/Feed/saga';
// import messages from './messages';
import { commentList } from 'containers/Feed/actions';
import {
  likeFeed,
  unlikeFeed,
  deleteFeed,
  updateStatus,
  translateFeed,
} from 'containers/GlobalEntities/actions';
import { OuterIcon, ActionButton, SimpleMenu, Comments } from './Wrapper';
import CheckFeedBlock from './CheckFeedBlock';

const DeleteIcon = props => (
  <MenuItem dense {...props}>
    <ListItemIcon>
      <DeleteOutline fontSize="small" />
    </ListItemIcon>
    <ListItemText primary="Delete" />
  </MenuItem>
);

const FeedHasBlock = content => {
  if (
    content.type === 'imageGallery' ||
    content.type === 'document' ||
    content.type === 'videoGallery' ||
    content.type === 'event' ||
    content.type === 'meetingEvent' ||
    content.type === 'quickSharingOfTheLink'
  ) {
    return true;
  }
  if (
    (content.type === 'follower quickpost sharing' ||
      content.type === 'follower quickpost') &&
    _.size(
      _.filter(
        content.blocks,
        block =>
          block.type !== 'text' &&
          block.type !== 'heading' &&
          block.type !== 'reference',
      ),
    ) > 0
  ) {
    return true;
  }
  if (
    (content.type === 'quickpost' || content.type === 'FAQquestion') &&
    _.size(_.filter(content.blocks, block => block.type !== 'text')) > 0
  ) {
    return true;
  }
  if (
    (content.type === 'article' || content.type === 'grandArticle') &&
    _.find(content.blocks, { type: 'heading' }) &&
    _.find(content.blocks, { type: 'heading' }).imageHeader
  ) {
    return true;
  }
  if (content.type === 'share') {
    const { refType } = _.find(content.blocks, { type: 'reference' });
    if (
      refType === 'imageGallery' ||
      refType === 'document' ||
      refType === 'videoGallery' ||
      refType === 'event' ||
      refType === 'meetingEvent' ||
      refType === 'quickSharingOfTheLink'
    ) {
      return true;
    }
    if (
      (refType === 'quickpost' || refType === 'FAQquestion') &&
      _.size(
        _.filter(
          content.blocks,
          block => block.type !== 'reference' && block.type !== 'heading',
        ),
      ) > 0
    ) {
      return true;
    }
    if (
      (refType === 'article' || refType === 'grandArticle') &&
      _.find(content.blocks, { type: 'heading' }) &&
      _.find(content.blocks, { type: 'heading' }).imageHeader
    ) {
      return true;
    }
  }
  return false;
};

export function Feed(props) {
  useInjectReducer({ key: 'feed', reducer });
  useInjectSaga({ key: 'feed', saga });

  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();

  const {
    feedContent,
    dispatchLikeContent,
    dispatchUnlikeContent,
    dispatchTranslateContent,
    translatedContent,
    dispatchDeleteContent,
    languages,
    referrer,
    dispatchEditQuickPost,
    dispatchContentEdit,
    dispatchShare,
    dispatchPrivateMessage,
    dispatchOpenFeedModal,
    dispatchCommentList,
    dispatchOpenUserLiked,
    overflow,
    dispatchUpdateStatus,
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
    if (!commentExpanded && !_.isEmpty(content.comments)) {
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
    dispatchDeleteContent({
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

  const userUid = useMemo(() => content.lastActivityUser || content.author, [
    content,
  ]);

  const hasBlock = useMemo(() => FeedHasBlock(content), [content]);

  const handleShareContent = action => {
    handleShareClose();
    dispatchShare(action, feedContent);
  };

  const feedModalPath = useFeedModalPath(
    content.community || content.sharedCommunity,
    content.communityTab || content.sharedCommunityTab,
    content.referenceUid || uid,
    'viewdetail',
    referrer,
  );

  const copyUrl = () => {
    copy(`${window.location.origin}/#!${feedModalPath}`);
    handleShareClose();
  };

  const heading = _.find(content.blocks, { type: 'heading' });
  const text = _.find(content.blocks, { type: 'text' });
  const reference = _.find(content.blocks, { type: 'reference' });

  return (
    <LazyLoad
      offset={700}
      overflow={overflow}
      placeholder={<FeedSkeleton />}
      debounce
      once
    >
      <div
        style={
          hasBlock
            ? { marginBottom: referrer === 'PrivateMessages' ? -40 : 10 }
            : { marginBottom: referrer === 'PrivateMessages' ? 10 : 50 }
        }
      >
        {CheckFeedBlock(content)}
        <Paper
          className={classes.root}
          style={
            hasBlock ? { position: 'relative', bottom: 40, zIndex: 2 } : null
          }
        >
          <Grid container wrap="nowrap" style={{ marginBottom: 20 }}>
            <Grid item>
              <OuterIcon>
                {content.community ? (
                  <CommunityAvatar communityUid={content.community} />
                ) : (
                  <UserAvatar userUid={userUid} variant="Avatar" />
                )}
              </OuterIcon>
            </Grid>
            <Grid item xs>
              {content.type !== 'jobOffer' && (
                <UserAvatar userUid={userUid} variant="DisplayName" />
              )}
              <Typography variant="subtitle1" style={{ color: '#231F20' }}>
                <ActionSentence
                  type={
                    content.type === 'follower quickpost sharing' ||
                    content.type === 'follower quickpost'
                      ? reference.refType
                      : content.type
                  }
                  previousAction={content.previousAction}
                  lastAction={content.lastAction}
                  authorUid={
                    referrer === 'PrivateMessages'
                      ? content.sharedContentAuthor
                      : content.author
                  }
                  editionStatus={content.editionStatus}
                  blocks={content.blocks}
                  communityUid={
                    referrer === 'PrivateMessages'
                      ? content.sharedCommunity
                      : content.community
                  }
                />
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="subtitle2"
                style={{ padding: 12, color: '#7C7C7C', fontWeight: 400 }}
              >
                {moment(content.publicationStartDate).format(
                  'DD MMM YYYY [|] HH:mm',
                )}
              </Typography>
            </Grid>
            {referrer !== 'PrivateMessages' && referrer !== 'ChooseContent' && (
              <Grid item>
                {(content.type === 'document' ||
                  (content.canEdit && content.type !== 'share') ||
                  content.canEdit) && (
                  <IconButton aria-label="more" onClick={handleMore}>
                    <MoreVert fontSize="small" />
                  </IconButton>
                )}
              </Grid>
            )}
          </Grid>
          <Grid
            container
            wrap="nowrap"
            onClick={e => {
              e.preventDefault();
              if (content.type !== 'meetingEvent') {
                return history.push({
                  pathname: feedModalPath,
                  state: { background: location },
                });
              }
              return dispatchOpenFeedModal(
                content.type === 'share' ? reference.refUid : uid,
              );
            }}
            style={{ cursor: 'pointer' }}
          >
            <Grid item xs zeroMinWidth>
              <Typography
                variant="h6"
                style={{ color: '#231F20' }}
                dangerouslySetInnerHTML={createMarkup(
                  referrer === 'PrivateMessages'
                    ? heading
                      ? heading.title
                      : text
                      ? text.title
                      : null
                    : content.parseText,
                )}
                gutterBottom
              />
              {heading && heading.subTitle && (
                <Typography variant="body1" gutterBottom>
                  {heading.subTitle}
                </Typography>
              )}
              {content.type === 'jobOffer' && (
                <LinesEllipsis
                  text={_.find(content.blocks, { type: 'jobOffer' }).content}
                  maxLine={3}
                  className="MuiTypography-root MuiTypography-body1"
                />
              )}
              {(content.type === 'article' ||
                content.type === 'grandArticle' ||
                (content.type === 'share' &&
                  (reference.refType === 'article' ||
                    reference.refType === 'grandArticle'))) &&
                _.find(content.blocks, { type: 'richText' }) && (
                  <LinesEllipsis
                    text={_.find(content.blocks, { type: 'richText' }).content}
                    maxLine={3}
                    className="MuiTypography-root MuiTypography-body1"
                    style={{ wordBreak: 'break-all' }}
                  />
                )}
            </Grid>
          </Grid>
          <Grid container alignItems="center">
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
            {referrer === 'MyProfile' && (
              <Grid item>
                <TextField
                  select
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={content.editionStatus}
                  onChange={e =>
                    dispatchUpdateStatus({ editionStatus: e.target.value, uid })
                  }
                >
                  {content.editionStatus === 'Pending For Validation' && (
                    <MenuItem value="Pending For Validation" disabled>
                      Pending For Validation
                    </MenuItem>
                  )}
                  <MenuItem value="Draft">Draft</MenuItem>
                  <MenuItem value="Archived">Archived</MenuItem>
                  <MenuItem value="publish">OnAir: Published</MenuItem>
                </TextField>
              </Grid>
            )}
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
              {content.type === 'share' && reference.refType === 'jobOffer' && (
                <a
                  href={_.find(content.blocks, { type: 'jobOffer' }).path}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  Apply for this job
                </a>
              )}
              {referrer !== 'PrivateMessages' && referrer !== 'ChooseContent' && (
                <>
                  {content.allowComment && (
                    <ActionButton
                      onClick={() => {
                        if (!commentExpanded) {
                          dispatchCommentList({
                            content: uid,
                            lastTwoComments: true,
                          });
                        }
                        setCommentExpanded(!commentExpanded);
                      }}
                    >
                      <ChatBubbleOutline fontSize="inherit" />
                      {content.commentCount > 0 && (
                        <Typography variant="body1">
                          {`(${content.commentCount})`}
                        </Typography>
                      )}
                    </ActionButton>
                  )}
                  {feedContent.authorizeLike && (
                    <ActionButton
                      onClick={() =>
                        feedContent.userLiked
                          ? dispatchUnlikeContent({ contentUid: uid })
                          : dispatchLikeContent({ contentUid: uid })
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
                </>
              )}
            </Grid>
          </Grid>
          <Collapse in={commentExpanded} timeout="auto" unmountOnExit>
            <Comments square elevation={0}>
              <Grid container justify="flex-end" spacing={2}>
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
                community={content.community}
                author={
                  content.type === 'FAQquestion'
                    ? content.author && content.author.uid
                    : ''
                }
              />
            </Comments>
          </Collapse>
        </Paper>
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
                if (content.type === 'quickSharingOfTheLink') {
                  return dispatchEditQuickPost('quickSharingOfTheLink', uid);
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
                  onClick={() => handleTranslateContent(language.code)}
                  selected={language.code === content.language}
                >
                  {language.name}
                </MenuItem>
              ),
          )}
        </SimpleMenu>
      </div>
    </LazyLoad>
  );
}

Feed.propTypes = {
  feedContent: PropTypes.object,
  dispatchLikeContent: PropTypes.func,
  dispatchUnlikeContent: PropTypes.func,
  dispatchTranslateContent: PropTypes.func,
  dispatchDeleteContent: PropTypes.func,
  translatedContent: PropTypes.object,
  languages: PropTypes.array,
  referrer: PropTypes.string,
  dispatchEditQuickPost: PropTypes.func,
  dispatchContentEdit: PropTypes.func,
  dispatchShare: PropTypes.func,
  dispatchPrivateMessage: PropTypes.func,
  dispatchOpenFeedModal: PropTypes.func,
  dispatchCommentList: PropTypes.func,
  dispatchOpenUserLiked: PropTypes.func,
  overflow: PropTypes.bool,
  dispatchUpdateStatus: PropTypes.func,
};

const mapStateToProps = (state, ownProps) =>
  createStructuredSelector({
    translatedContent: makeSelectContent(ownProps.contentUid),
    feedContent: makeSelectFeed(ownProps.contentUid),
    languages: makeSelectLanguage(),
  });

function mapDispatchToProps(dispatch) {
  return {
    dispatchLikeContent: options => dispatch(likeFeed(options)),
    dispatchUnlikeContent: options => dispatch(unlikeFeed(options)),
    dispatchTranslateContent: options => dispatch(translateFeed(options)),
    dispatchDeleteContent: options => dispatch(deleteFeed(options)),
    dispatchEditQuickPost: (contentType, options) =>
      dispatch(editQuickPost(contentType, options)),
    dispatchContentEdit: options => dispatch(contentEdit(options)),
    dispatchShare: (action, content) => dispatch(share(action, content)),
    dispatchPrivateMessage: content => dispatch(privateMessage(content)),
    dispatchOpenFeedModal: options => dispatch(openFeedModal(options)),
    dispatchCommentList: options => dispatch(commentList(options)),
    dispatchOpenUserLiked: options => dispatch(openUserLiked(options)),
    dispatchUpdateStatus: options => dispatch(updateStatus(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Feed);

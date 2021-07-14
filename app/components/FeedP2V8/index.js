/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/**
 *
 * FeedP2V8
 *
 */

import React, { memo, useState, useMemo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { useHistory, useLocation } from 'react-router-dom';
import _ from 'lodash';
import copy from 'copy-to-clipboard';
import LazyLoad from 'react-lazyload';
import {
  Grid,
  Typography,
  Divider,
  TextField,
  Collapse,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  MoreVert,
  FavoriteBorder,
  Favorite,
  ChatBubbleOutline,
  Share,
  ArrowRight,
  Close,
} from '@material-ui/icons';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import { useConfirm } from 'material-ui-confirm';
import {
  makeSelectLanguage,
  makeSelectConfig,
} from 'containers/AuthBase/selectors';
import {
  makeSelectFeed,
  makeSelectTemplate,
} from 'containers/GlobalEntities/selectors';
import {
  editQuickPost,
  contentEdit,
  share,
  privateMessage,
  openUserLiked,
  downloadDocuments,
  openLivelyTransfer,
} from 'containers/AuthBase/actions';
import {
  likeFeed,
  unlikeFeed,
  deleteFeed,
  updateStatus,
  translateFeed,
  likeMeetingEvent,
  unlikeMeetingEvent,
} from 'containers/GlobalEntities/actions';
import CommunityAvatar from 'components/CommunityAvatar';
import UserAvatar from 'components/UserAvatar';
import ActionSentence from 'components/ActionSentence';
import { createMarkup } from 'utils/helpers/createMarkup';
import useFeedModalPath from 'utils/helpers/useFeedModalPath';
import RoundButton from 'utils/helpers/roundButton';
import DateTime from 'utils/helpers/dateTime';
import TypographyPrimary from 'utils/helpers/textPrimary';
import { Yammer } from 'components/Icons';
import FeedBlocksP2V8 from 'components/FeedBlocksP2V8';
import CommentsP2V8 from 'containers/CommentsP2V8/Loadable';
// import messages from './messages';
import { FeedCard, HashtagLink, ActionButton } from './Wrapper';
import FeedSkeleton from './FeedSkeleton';

const ResponsiveLinesEllipsis = responsiveHOC()(LinesEllipsis);

const FeedBlock = feed => {
  if (_.isEmpty(feed.blocks)) {
    return null;
  }
  const reference = _.find(feed.blocks, { type: 'reference' });
  if (
    feed.type === 'article' ||
    feed.type === 'grandArticle' ||
    (feed.type === 'share' &&
      (reference.refType === 'article' || reference.refType === 'grandArticle'))
  ) {
    const heading = _.find(feed.blocks, { type: 'heading' });
    if (heading && heading.imageHeader) {
      return heading;
    }
    return null;
  }
  return _.head(
    _.filter(
      feed.blocks,
      block =>
        block.type !== 'text' &&
        block.type !== 'heading' &&
        block.type !== 'richText' &&
        block.type !== 'reference' &&
        block.type !== 'jobOffer',
    ),
  );
};

const Documents = (livelyTransfer, block) => {
  if (!livelyTransfer || _.isEmpty(block)) {
    return null;
  }
  if (block.type === 'documentGallery') {
    return block.documents;
  }
  if (block.type === 'ImageGallery') {
    return block.images;
  }
  return null;
};

function FeedP2V8(props) {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const confirm = useConfirm();

  const { contentUid, referrer, overflow } = props;
  const feed = useSelector(makeSelectFeed(contentUid));
  const template = useSelector(makeSelectTemplate(feed.template));
  const languages = useSelector(makeSelectLanguage());
  const livelyTransfer = useSelector(makeSelectConfig('LIVELY_TRANSFER'));
  const livelyTransferButtonName = useSelector(
    makeSelectConfig('LIVELY_TRANSFER_BUTTON_NAME'),
  );

  const userUid = useMemo(() => feed.lastActivityUser || feed.author, [
    feed.lastActivityUser,
    feed.author,
  ]);
  const date = useMemo(
    () => feed.lastActivityDate || feed.publicationStartDate,
    [feed.lastActivityDate, feed.publicationStartDate],
  );
  const heading = useMemo(() => _.find(feed.blocks, { type: 'heading' }), [
    feed.blocks,
  ]);
  const text = useMemo(() => _.find(feed.blocks, { type: 'text' }), [
    feed.blocks,
  ]);
  const richText = useMemo(() => _.find(feed.blocks, { type: 'richText' }), [
    feed.blocks,
  ]);
  const reference = useMemo(() => _.find(feed.blocks, { type: 'reference' }), [
    feed.blocks,
  ]);
  const jobOffer = useMemo(() => _.find(feed.blocks, { type: 'jobOffer' }), [
    feed.blocks,
  ]);
  const feedBlock = useMemo(() => FeedBlock(feed), [feed.blocks]);

  const documents = useMemo(() => Documents(livelyTransfer.value, feedBlock), [
    feedBlock,
  ]);

  const feedModalPath = useFeedModalPath(
    feed.community || feed.sharedCommunity,
    feed.communityTab || feed.sharedCommunityTab,
    feed.referenceUid || contentUid,
    'viewdetail',
    referrer,
  );

  const handleLike = useCallback(() => {
    if (feed.type === 'meetingEvent') {
      if (feed.userLiked) {
        dispatch(unlikeMeetingEvent({ meetingUid: contentUid }));
      } else {
        dispatch(likeMeetingEvent({ meetingUid: contentUid }));
      }
    } else if (feed.type !== 'meetingEvent') {
      if (feed.userLiked) {
        dispatch(unlikeFeed({ contentUid }));
      } else {
        dispatch(likeFeed({ contentUid }));
      }
    }
  }, [contentUid, feed.userLiked, feed.type]);

  const [actionAnchorEl, setActionAnchorEl] = useState(null);
  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const [translateAnchorEl, setTranslateAnchorEl] = useState(null);
  const [commentsExpanded, setCommentsExpanded] = useState(false);

  useEffect(() => {
    if (!commentsExpanded && !_.isEmpty(feed.comments)) {
      setCommentsExpanded(feed.isAnswered);
    }
  }, [feed.comments, feed.isAnswered]);

  const handleLinkClick = e => {
    if (feed.type === 'grandArticle') {
      e.preventDefault();
      return history.push(`${feedModalPath}/${_.last(template.name)}`);
    }
    if (feed.type !== 'yammer' && feed.type !== 'meetingEvent') {
      e.preventDefault();
      return history.push({
        pathname: feedModalPath,
        state: { background: location },
      });
    }
    return false;
  };

  const handleDelete = async () => {
    setActionAnchorEl(null);
    try {
      await confirm({
        description:
          'Are you sure you want to delete this content ? This content will be definitely deleted, from both the homepage and the community.',
      });
      dispatch(
        deleteFeed({
          uid: contentUid,
        }),
      );
    } catch {
      return false;
    }
    return false;
  };

  return (
    <LazyLoad
      offset={700}
      overflow={overflow}
      placeholder={<FeedSkeleton />}
      debounce
      once
      style={{
        marginBottom: _.isEmpty(feedBlock) ? 24 : 10,
      }}
    >
      {!_.isEmpty(feedBlock) && (
        <FeedBlocksP2V8 block={feedBlock} contentUid={contentUid} />
      )}
      <FeedCard $hasBlock={!_.isEmpty(feedBlock)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="flex-start">
              <Grid item xs zeroMinWidth>
                <a
                  href={
                    feed.type === 'yammer'
                      ? feed.yammerContentWebUrl
                      : feed.type === 'grandArticle'
                      ? `/#!${feedModalPath}/${_.last(template.name)}`
                      : `/#!${feedModalPath}`
                  }
                  onClick={handleLinkClick}
                  target="_blank"
                >
                  <TypographyPrimary
                    variant="h6"
                    dangerouslySetInnerHTML={createMarkup(
                      referrer === 'PrivateMessages'
                        ? heading
                          ? heading.title
                          : text
                          ? text.title
                          : null
                        : feed.parseText,
                    )}
                    gutterBottom={!_.isEmpty(richText) || !_.isEmpty(jobOffer)}
                    style={{ wordBreak: 'break-word' }}
                  />
                  {!_.isEmpty(richText) && (
                    <ResponsiveLinesEllipsis
                      text={richText.content}
                      maxLine={3}
                      basedOn="letters"
                      component={TypographyPrimary}
                    />
                  )}
                  {(feed.type === 'jobOffer' ||
                    (feed.type === 'share' &&
                      reference.refType === 'jobOffer')) &&
                    !_.isEmpty(jobOffer) && (
                      <ResponsiveLinesEllipsis
                        text={jobOffer.content}
                        maxLine={4}
                        basedOn="letters"
                        component={TypographyPrimary}
                      />
                    )}
                </a>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <DateTime date={date} />
                  </Grid>
                  {feed.type !== 'yammer' &&
                    referrer !== 'PrivateMessages' &&
                    referrer !== 'ChooseContent' &&
                    (feed.type === 'document' ||
                      (feed.type === 'share' &&
                        reference.refType === 'document') ||
                      feed.canEdit) && (
                      <Grid item>
                        <IconButton
                          style={{ padding: 6, marginRight: -6 }}
                          aria-label="more"
                          onClick={e => setActionAnchorEl(e.currentTarget)}
                        >
                          <MoreVert fontSize="small" />
                        </IconButton>
                      </Grid>
                    )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {(!_.isEmpty(feed.hashtags) ||
            (feed.type === 'jobOffer' ||
              (feed.type === 'share' && reference.refType === 'jobOffer'))) && (
            <Grid item xs={12}>
              <Grid container justify="flex-end">
                {!_.isEmpty(feed.hashtags) &&
                  _.map(feed.hashtags, hashtag => (
                    <HashtagLink
                      key={hashtag}
                      to={`/search/general/all/global/${encodeURIComponent(
                        hashtag,
                      )}/true/false/`}
                      label={hashtag}
                    />
                  ))}
                {!_.isEmpty(jobOffer) && (
                  <RoundButton
                    variant="outlined"
                    target="_blank"
                    href={jobOffer.path}
                  >
                    Apply for this job
                  </RoundButton>
                )}
              </Grid>
            </Grid>
          )}
          <Grid item xs={12}>
            <Divider style={{ marginBottom: 16 }} />
            <Grid
              container
              spacing={2}
              alignItems={feed.type !== 'jobOffer' ? 'flex-start' : 'center'}
            >
              <Grid item>
                {referrer === 'HP' && feed.community ? (
                  <CommunityAvatar communityUid={feed.community} />
                ) : (
                  <UserAvatar userUid={userUid} variant="Avatar" />
                )}
              </Grid>
              <Grid item xs>
                {feed.type !== 'jobOffer' && (
                  <UserAvatar
                    size="sm"
                    userUid={userUid}
                    variant="DisplayName"
                  />
                )}
                <ActionSentence
                  type={
                    feed.type === 'follower quickpost sharing' ||
                    feed.type === 'follower quickpost'
                      ? reference.refType
                      : feed.type
                  }
                  previousAction={feed.previousAction}
                  lastAction={feed.lastAction}
                  authorUid={
                    referrer === 'PrivateMessages'
                      ? feed.sharedfeedAuthor
                      : feed.author
                  }
                  editionStatus={feed.editionStatus}
                  blocks={feed.blocks}
                  communityUid={
                    referrer === 'PrivateMessages'
                      ? feed.sharedCommunity
                      : feed.community
                  }
                />
              </Grid>
              {referrer === 'MyProfile' && (
                <Grid item style={{ alignSelf: 'center' }}>
                  <TextField
                    select
                    variant="outlined"
                    size="small"
                    value={feed.editionStatus}
                    onChange={e =>
                      dispatch(
                        updateStatus({
                          editionStatus: e.target.value,
                          uid: contentUid,
                        }),
                      )
                    }
                  >
                    {feed.editionStatus === 'Pending For Validation' && (
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
              {feed.type !== 'yammer' &&
                referrer !== 'PrivateMessages' &&
                referrer !== 'ChooseContent' && (
                  <Grid item style={{ alignSelf: 'center' }}>
                    {feed.authorizeLike && (
                      <ActionButton onClick={handleLike}>
                        {feed.userLiked ? (
                          <Favorite color="primary" fontSize="small" />
                        ) : (
                          <FavoriteBorder fontSize="small" />
                        )}
                        {feed.likeCount ? (
                          <Typography
                            style={{ marginLeft: 3 }}
                            onClick={e => {
                              e.stopPropagation();
                              dispatch(openUserLiked({ content: contentUid }));
                            }}
                          >
                            {feed.likeCount}
                          </Typography>
                        ) : null}
                      </ActionButton>
                    )}
                    {feed.allowComment && (
                      <ActionButton onClick={() => setCommentsExpanded(true)}>
                        <ChatBubbleOutline fontSize="small" />
                        {feed.commentCount ? (
                          <Typography style={{ marginLeft: 3 }}>
                            {feed.commentCount}
                          </Typography>
                        ) : null}
                      </ActionButton>
                    )}
                    <ActionButton
                      onClick={e => setShareAnchorEl(e.currentTarget)}
                    >
                      <Share fontSize="small" />
                    </ActionButton>
                  </Grid>
                )}
              {feed.type === 'yammer' && (
                <Grid item style={{ alignSelf: 'center' }}>
                  <Yammer fontSize="large" />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            style={
              commentsExpanded
                ? { transition: 'margin-bottom 300ms' }
                : { marginBottom: -12, transition: 'margin-bottom 300ms' }
            }
          >
            <Collapse in={commentsExpanded} timeout="auto" unmountOnExit>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Grid container justify="flex-end">
                    <Button
                      variant="contained"
                      disableElevation
                      size="small"
                      endIcon={<Close />}
                      onClick={() => setCommentsExpanded(false)}
                    >
                      Close
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <CommentsP2V8 contentUid={contentUid} />
                </Grid>
              </Grid>
            </Collapse>
          </Grid>
        </Grid>
      </FeedCard>
      <Menu
        anchorEl={shareAnchorEl}
        open={Boolean(shareAnchorEl)}
        onClose={() => setShareAnchorEl(null)}
        PaperProps={{ variant: 'outlined' }}
      >
        {!_.isEmpty(documents) && (
          <MenuItem
            dense
            onClick={() => {
              dispatch(openLivelyTransfer({ documents }));
              setShareAnchorEl(null);
            }}
          >
            {livelyTransferButtonName.value}
          </MenuItem>
        )}
        {feed.authorizeShare && feed.type !== 'meetingEvent'
          ? [
              <MenuItem
                key="share"
                dense
                onClick={() => {
                  dispatch(share('share', feed));
                  setShareAnchorEl(null);
                }}
              >
                Share to community
              </MenuItem>,
              <MenuItem
                key="privateMessage"
                dense
                onClick={() => {
                  dispatch(privateMessage(feed));
                  setShareAnchorEl(null);
                }}
              >
                Private Message
              </MenuItem>,
            ]
          : null}
        {feed.type !== 'meetingEvent' && (
          <MenuItem
            dense
            onClick={() => {
              dispatch(share('copy', feed));
              setShareAnchorEl(null);
            }}
          >
            Share as new content
          </MenuItem>
        )}
        <MenuItem
          dense
          onClick={() => {
            copy(`${window.location.origin}/#!${feedModalPath}`);
            setShareAnchorEl(null);
          }}
        >
          Copy the url
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={actionAnchorEl}
        open={Boolean(actionAnchorEl)}
        onClose={() => setActionAnchorEl(null)}
        PaperProps={{ variant: 'outlined' }}
      >
        {feed.translationStatus &&
          !_.isEmpty(_.filter(languages, language => language.active)) && (
            <MenuItem
              dense
              onClick={e => {
                setTranslateAnchorEl(e.currentTarget);
              }}
            >
              Translate
              <ArrowRight fontSize="small" />
            </MenuItem>
          )}
        {(feed.type === 'document' ||
          (feed.type === 'share' && reference.refType === 'document')) && (
          <MenuItem
            dense
            onClick={() => {
              setActionAnchorEl(null);
              dispatch(
                downloadDocuments({ track: 'download', uid: contentUid }),
              );
            }}
          >
            Download
          </MenuItem>
        )}
        {feed.canEdit && feed.type !== 'share' && feed.type !== 'meetingEvent' && (
          <MenuItem
            dense
            onClick={() => {
              setActionAnchorEl(null);
              if (feed.type === 'quickpost') {
                dispatch(editQuickPost('quickpost', contentUid));
              } else if (feed.type === 'FAQquestion') {
                dispatch(editQuickPost('faq', contentUid));
              } else if (feed.type === 'quickSharingOfTheLink') {
                dispatch(editQuickPost('quickSharingOfTheLink', contentUid));
              } else {
                dispatch(contentEdit(contentUid));
              }
            }}
          >
            Edit
          </MenuItem>
        )}
        {feed.canEdit && (
          <MenuItem dense onClick={handleDelete}>
            Delete
          </MenuItem>
        )}
      </Menu>
      {feed.translationStatus &&
        !_.isEmpty(_.filter(languages, language => language.active)) && (
          <Menu
            anchorEl={translateAnchorEl}
            open={Boolean(translateAnchorEl)}
            onClose={() => {
              setTranslateAnchorEl(null);
              setActionAnchorEl(null);
            }}
            PaperProps={{ variant: 'outlined' }}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'center',
              horizontal: 'left',
            }}
          >
            {_.map(
              _.filter(languages, language => language.active),
              language => (
                <MenuItem
                  dense
                  key={language.code}
                  onClick={() => {
                    dispatch(
                      translateFeed({
                        language: language.code,
                        responseType: 'feed',
                        uid: contentUid,
                      }),
                    );
                    setTranslateAnchorEl(null);
                    setActionAnchorEl(null);
                  }}
                  selected={language.code === feed.language}
                >
                  {language.name}
                </MenuItem>
              ),
            )}
          </Menu>
        )}
    </LazyLoad>
  );
}

FeedP2V8.propTypes = {
  contentUid: PropTypes.string,
  referrer: PropTypes.string,
  overflow: PropTypes.bool,
};

export default memo(FeedP2V8);

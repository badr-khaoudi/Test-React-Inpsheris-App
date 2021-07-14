/**
 *
 * PinnedContent
 *
 */

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import copy from 'copy-to-clipboard';
import {
  CardContent,
  CardActions,
  Grid,
  Typography,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
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
} from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import { useConfirm } from 'material-ui-confirm';
import { makeSelectFeed } from 'containers/GlobalEntities/selectors';
import { makeSelectLanguage } from 'containers/AuthBase/selectors';
import { ActionButton, SimpleMenu } from 'containers/Feed/Wrapper';
import UserAvatar from 'components/UserAvatar';
import useFeedModalPath from 'utils/helpers/useFeedModalPath';
import { createShortText } from 'utils/helpers/createMarkup';
import {
  editQuickPost,
  contentEdit,
  share,
  privateMessage,
  openUserLiked,
} from 'containers/AuthBase/actions';
import {
  likeFeed,
  unlikeFeed,
  deleteFeed,
  translateFeed,
} from 'containers/GlobalEntities/actions';
import { CustomBoxShadowCard } from '../../common';
import {
  PinnedContentImageHeader,
  AvatarGrid,
  BodyTypography,
} from './wrapper';

function PinnedContent({ loading, data, history, location }) {
  const content = useSelector(makeSelectFeed(_.head(data)) || {});
  const languages = useSelector(makeSelectLanguage());
  const uid = useMemo(() => content.sourceId || content.uid, [content]);
  const feedModalPath = useFeedModalPath(
    content.community,
    content.communityTab,
    uid,
    'viewdetail',
    'HP',
  );
  const dispatch = useDispatch();
  const confirm = useConfirm();

  const [actionAnchorEl, setActionAnchorEl] = useState(null);
  const handleMore = e => setActionAnchorEl(e.currentTarget);
  const handleActionClose = () => setActionAnchorEl(null);

  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const handleShare = e => setShareAnchorEl(e.currentTarget);
  const handleShareClose = () => setShareAnchorEl(null);

  const [translateAnchorEl, setTranslateAnchorEl] = useState(null);
  const handleTranslate = e => setTranslateAnchorEl(e.currentTarget);
  const handleTranslateClose = () => setTranslateAnchorEl(null);

  const handleTranslateContent = language => {
    dispatch(
      translateFeed({
        language,
        responseType: 'feed',
        uid,
      }),
    );
    handleTranslateClose();
  };

  const copyUrl = () => {
    copy(`${window.location.origin}/#!${feedModalPath}`);
    handleShareClose();
  };

  const heading = _.find(content.blocks, { type: 'heading' });
  const handleShareContent = action => {
    handleShareClose();
    dispatch(share(action, content));
  };

  const handleDelete = async () => {
    handleActionClose();
    try {
      await confirm({
        description:
          'Are you sure you want to delete this content ? This content will be definitely deleted, from both the homepage and the community.',
      });
      dispatch(
        deleteFeed({
          uid,
        }),
      );
    } catch {
      return false;
    }
    return false;
  };

  return (
    <>
      <CustomBoxShadowCard>
        {loading && (
          <Skeleton>
            <PinnedContentImageHeader />
          </Skeleton>
        )}
        {heading.imageHeader && (
          <PinnedContentImageHeader>
            <img src={heading.imageHeader} alt={content.parseText} />
          </PinnedContentImageHeader>
        )}
        <CardContent
          style={{ padding: 20, cursor: 'pointer' }}
          onClick={() =>
            history.push({
              pathname: feedModalPath,
              state: { background: location },
            })
          }
        >
          <Typography gutterBottom variant="h6">
            {loading ? (
              <>
                <Skeleton width="70%" />
                <Skeleton width="80%" />
              </>
            ) : (
              content.parseText
            )}
          </Typography>
          <AvatarGrid container alignItems="center" spacing={2}>
            <Grid item xs={2}>
              {loading ? (
                <Skeleton variant="circle" width={30} height={30} />
              ) : (
                <UserAvatar
                  userUid={content.author}
                  variant="Avatar"
                  size="sm"
                />
              )}
            </Grid>
            <Grid item xs={5}>
              <Typography variant="caption">
                {loading ? (
                  <Skeleton width="80%" />
                ) : (
                  <UserAvatar
                    userUid={content.author}
                    variant="DisplayName"
                    size="sm"
                  />
                )}
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="caption" color="textSecondary">
                {loading ? (
                  <Skeleton />
                ) : (
                  moment(content.author.lastUpdateDate).format(
                    'DD MMM YYYY, HH:mm',
                  )
                )}
              </Typography>
            </Grid>
          </AvatarGrid>

          <BodyTypography variant="body2" color="textPrimary">
            {loading ? (
              <>
                <Skeleton width="40%" />
                <Skeleton width="80%" />
                <Skeleton width="80%" />
              </>
            ) : (
              <span
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: createShortText(content.richText, 115),
                }}
              />
            )}
          </BodyTypography>
          <Typography variant="body2" color="textPrimary">
            {loading ? <Skeleton width="20%" /> : 'Lire Plus'}
          </Typography>
        </CardContent>
        <CardActions disableSpacing style={{ justifyContent: 'flex-end' }}>
          {content.allowComment && (
            <ActionButton
              onClick={() =>
                history.push({
                  pathname: feedModalPath,
                  state: { background: location },
                })
              }
            >
              <ChatBubbleOutline fontSize="inherit" />
              {content.commentCount > 0 && (
                <Typography variant="body1">
                  {`(${content.commentCount})`}
                </Typography>
              )}
            </ActionButton>
          )}
          {content.authorizeLike && (
            <ActionButton
              onClick={() =>
                content.userLiked
                  ? dispatch(unlikeFeed({ contentUid: uid }))
                  : dispatch(likeFeed({ contentUid: uid }))
              }
            >
              {content.userLiked ? (
                <Favorite fontSize="inherit" />
              ) : (
                <FavoriteBorder fontSize="inherit" />
              )}
              {content.likeCount > 0 && (
                <Typography
                  variant="body1"
                  onClick={e => {
                    e.stopPropagation();
                    dispatch(openUserLiked({ content: uid }));
                  }}
                  style={{ marginLeft: 5 }}
                >
                  {`(${content.likeCount})`}
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
          {(content.type === 'document' ||
            (content.canEdit && content.type !== 'share') ||
            content.canEdit) && (
            <ActionButton aria-label="more" onClick={handleMore}>
              <MoreVert fontSize="small" />
            </ActionButton>
          )}
        </CardActions>
      </CustomBoxShadowCard>
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
                return dispatch(editQuickPost('quickpost', uid));
              }
              if (content.type === 'FAQquestion') {
                return dispatch(editQuickPost('faq', uid));
              }
              return dispatch(contentEdit(uid));
            }}
          >
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </MenuItem>
        )}
        {content.canEdit && (
          <MenuItem onClick={handleDelete}>
            <ListItemIcon>
              <DeleteOutline fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </MenuItem>
        )}
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
              dispatch(privateMessage(content));
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
    </>
  );
}

PinnedContent.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.array,
  history: PropTypes.object,
  location: PropTypes.object,
};

export default withRouter(PinnedContent);

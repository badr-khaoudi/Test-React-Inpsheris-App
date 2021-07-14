/* eslint-disable indent */
/**
 *
 * PrivateMessageWrapper
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Typography, Collapse } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {
  ChatBubbleOutline,
  Close,
  Favorite,
  FavoriteBorder,
  DeleteOutline,
} from '@material-ui/icons';
import { useConfirm } from 'material-ui-confirm';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from 'components/FeedTypesV8/useStyles';
import { makeSelectFeed } from 'containers/GlobalEntities/selectors';
import { OuterIcon, ActionButton, Comments } from 'containers/FeedV8/Wrapper';
import UserAvatar from 'components/UserAvatar';
import Feed from 'containers/FeedV8';
import Comment from 'containers/Comment/Loadable';
import { commentList } from 'containers/Feed/actions';
import { createMarkup } from 'utils/helpers/createMarkup';
// import styled from 'styled-components';
import CheckType from 'components/FeedTypes/checkType';
import { FormattedMessage } from 'react-intl';
import {
  likeFollowerQuickpost,
  unlikeFollowerQuickpost,
  deleteFeed,
} from 'containers/GlobalEntities/actions';
import { openUserLiked } from 'containers/AuthBase/actions';
import messages from './messages';

function PrivateMessageWrapper(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const confirm = useConfirm();
  const { contentUid } = props;
  const content = useSelector(makeSelectFeed(contentUid));
  const contentBlock = _.head(
    _.filter(content.blocks, block => block.type !== 'text'),
  );
  const [commentExpanded, setCommentExpanded] = useState(false);

  const handleDelete = async () => {
    try {
      await confirm({
        description: 'Are you sure you want to delete this content ?',
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
    <Paper className={classes.root} style={{ marginBottom: 50 }}>
      <Grid container wrap="nowrap" style={{ marginBottom: 20 }}>
        <Grid item>
          <OuterIcon>
            <UserAvatar userUid={content.author} variant="Avatar" />
          </OuterIcon>
        </Grid>
        <Grid item xs>
          <UserAvatar userUid={content.author} variant="DisplayName" />
          <Typography variant="subtitle1" style={{ color: '#231F20' }}>
            {content.type === 'follower quickpost sharing' && (
              <FormattedMessage {...messages.followerQuickpostSharing} />
            )}
            {content.type === 'follower quickpost' && (
              <FormattedMessage {...messages.followerQuickpost} />
            )}
          </Typography>
        </Grid>
      </Grid>
      <Typography
        variant="h6"
        style={{ color: '#231F20' }}
        dangerouslySetInnerHTML={createMarkup(content.parseText)}
        gutterBottom
      />
      {_.find(content.blocks, { type: 'reference' }) ? (
        <div
          style={{
            flex: 1,
            borderRadius: 10,
            padding: 20,
            backgroundColor: '#f7f7f7',
          }}
        >
          <Feed
            contentUid={contentUid}
            key={content}
            referrer="PrivateMessages"
          />
        </div>
      ) : (
        <>{contentBlock && CheckType(contentBlock)}</>
      )}
      <Grid container alignItems="center" justify="flex-end">
        {content.allowComment && (
          <ActionButton
            onClick={() => {
              if (!commentExpanded) {
                dispatch(
                  commentList({
                    followerQuickpostUid: contentUid,
                    lastTwoComments: true,
                  }),
                );
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
        {content.authorizeLike && (
          <ActionButton
            onClick={() =>
              content.userLiked
                ? dispatch(
                    unlikeFollowerQuickpost({
                      followerQuickpostUid: contentUid,
                    }),
                  )
                : dispatch(
                    likeFollowerQuickpost({ followerQuickpostUid: contentUid }),
                  )
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
                  dispatch(openUserLiked({ followerQuickpostUid: contentUid }));
                }}
                style={{ marginLeft: 5 }}
              >
                {`(${content.likeCount})`}
              </Typography>
            )}
          </ActionButton>
        )}
        {content.canEdit && (
          <ActionButton onClick={handleDelete}>
            <DeleteOutline fontSize="small" />
          </ActionButton>
        )}
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
            comments={content.comments}
            type={content.type}
            followerQuickpostUid={contentUid}
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
  );
}

PrivateMessageWrapper.propTypes = { contentUid: PropTypes.string };

export default memo(PrivateMessageWrapper);

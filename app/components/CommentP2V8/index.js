/**
 *
 * CommentP2V8
 *
 */

import React, { memo, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Grid, Typography, Collapse } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import {
  FavoriteBorder,
  Favorite,
  Translate,
  Edit,
  Delete,
  Image,
  Folder,
  Videocam,
  InsertLink,
} from '@material-ui/icons';
import { useConfirm } from 'material-ui-confirm';
import { createMarkup } from 'utils/helpers/createMarkup';
import { makeSelectComments } from 'containers/GlobalEntities/selectors';
import { makeSelectCurrentUser } from 'containers/AuthBase/selectors';
import {
  likeComment,
  unlikeComment,
  pickComment,
  deleteComment,
} from 'containers/GlobalEntities/actions';
import { openUserLiked } from 'containers/AuthBase/actions';
import UserAvatar from 'components/UserAvatar';
import ImageGallery from 'components/FeedBlocksP2V8/ImageGallery';
import DocumentGallery from 'components/FeedBlocksP2V8/DocumentGallery';
import VideoGallery from 'components/FeedBlocksP2V8/VideoGallery';
import LinkGallery from 'components/FeedBlocksP2V8/LinkGallery';
import { ActionButton } from 'components/FeedP2V8/Wrapper';
import { openEditComment } from 'containers/CommentsP2V8/actions';
import DateTime from 'utils/helpers/dateTime';
// import messages from './messages';
import { RoundButton, CommentBox, CheckCircle } from './Wrapper';

function CommentP2V8({
  commentUid,
  isFAQquestion,
  canModify,
  author,
  content,
}) {
  const comment = useSelector(makeSelectComments(commentUid));
  const currentUser = useSelector(makeSelectCurrentUser());
  const dispatch = useDispatch();
  const confirm = useConfirm();

  const [showImageGallery, setShowImageGallery] = useState(false);
  const [showDocumentGallery, setShowDocumentGallery] = useState(false);
  const [showVideoGallery, setShowVideoGallery] = useState(false);
  const [showLinkGallery, setShowLinkGallery] = useState(false);

  const hasBlocks = useMemo(
    () =>
      comment.images || comment.documents || comment.videos || comment.links,
    [comment.images, comment.documents, comment.videos, comment.links],
  );

  const handleDelete = async () => {
    try {
      await confirm({
        description: 'Are you sure, you want to delete this comment?',
      });
      dispatch(deleteComment({ uid: commentUid }, content));
    } catch {
      return false;
    }
    return false;
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <UserAvatar userUid={comment.author} variant="Avatar" />
      </Grid>
      <Grid item xs zeroMinWidth>
        <CommentBox>
          <Grid container>
            <Grid item xs={12}>
              <Grid container justify="space-between">
                <Grid item>
                  <UserAvatar
                    userUid={comment.author}
                    size="sm"
                    variant="DisplayName"
                  />
                  <Typography
                    dangerouslySetInnerHTML={createMarkup(comment.parseText)}
                    gutterBottom
                  />
                </Grid>
                <Grid item>
                  <DateTime date={comment.creationDate} />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={12}
              style={
                hasBlocks &&
                (showImageGallery ||
                  showDocumentGallery ||
                  showVideoGallery ||
                  showLinkGallery)
                  ? { marginBottom: 12, transition: 'margin-bottom 300ms' }
                  : { transition: 'margin-bottom 300ms' }
              }
            >
              <Grid container justify="space-between">
                <Grid item>
                  <ActionButton
                    onClick={() =>
                      comment.userLiked
                        ? dispatch(unlikeComment({ commentUid }))
                        : dispatch(likeComment({ commentUid }))
                    }
                    style={{ marginLeft: -6 }}
                  >
                    {comment.userLiked ? (
                      <Favorite color="primary" fontSize="small" />
                    ) : (
                      <FavoriteBorder fontSize="small" />
                    )}
                    {comment.likeCount ? (
                      <Typography
                        style={{ marginLeft: 3 }}
                        onClick={e => {
                          e.stopPropagation();
                          dispatch(openUserLiked({ comment: commentUid }));
                        }}
                      >
                        {comment.likeCount}
                      </Typography>
                    ) : null}
                  </ActionButton>
                  <ActionButton>
                    <Translate fontSize="small" />
                  </ActionButton>
                  {isFAQquestion && (
                    <ActionButton
                      disabled={
                        canModify ? !canModify : currentUser.uid !== author
                      }
                      onClick={() =>
                        dispatch(
                          pickComment(
                            { uid: commentUid },
                            {
                              status: comment.isSatisfiedComment
                                ? 'unsatisfied'
                                : 'satisfied',
                            },
                          ),
                        )
                      }
                    >
                      <CheckCircle
                        fontSize="small"
                        $isSatisfiedComment={comment.isSatisfiedComment}
                      />
                    </ActionButton>
                  )}
                  {comment.images && (
                    <Badge
                      color={showImageGallery ? 'secondary' : 'primary'}
                      overlap="circle"
                      max={9}
                      style={{ marginRight: 8 }}
                      badgeContent={_.size(comment.images)}
                    >
                      <RoundButton
                        size="small"
                        onClick={() => setShowImageGallery(!showImageGallery)}
                      >
                        <Image fontSize="small" />
                      </RoundButton>
                    </Badge>
                  )}
                  {comment.documents && (
                    <Badge
                      color={showDocumentGallery ? 'secondary' : 'primary'}
                      overlap="circle"
                      max={9}
                      style={{ marginRight: 8 }}
                      badgeContent={_.size(comment.documents)}
                    >
                      <RoundButton
                        size="small"
                        onClick={() =>
                          setShowDocumentGallery(!showDocumentGallery)
                        }
                      >
                        <Folder fontSize="small" />
                      </RoundButton>
                    </Badge>
                  )}
                  {comment.videos && (
                    <Badge
                      color={showVideoGallery ? 'secondary' : 'primary'}
                      overlap="circle"
                      max={9}
                      style={{ marginRight: 8 }}
                      badgeContent={_.size(comment.videos)}
                    >
                      <RoundButton
                        size="small"
                        onClick={() => setShowVideoGallery(!showVideoGallery)}
                      >
                        <Videocam fontSize="small" />
                      </RoundButton>
                    </Badge>
                  )}
                  {comment.links && (
                    <Badge
                      color={showLinkGallery ? 'secondary' : 'primary'}
                      overlap="circle"
                      max={9}
                      badgeContent={_.size(comment.links)}
                    >
                      <RoundButton
                        size="small"
                        onClick={() => setShowLinkGallery(!showLinkGallery)}
                      >
                        <InsertLink fontSize="small" />
                      </RoundButton>
                    </Badge>
                  )}
                </Grid>
                {(canModify || currentUser.uid === comment.author) && (
                  <Grid item>
                    <ActionButton
                      onClick={() => dispatch(openEditComment(commentUid))}
                    >
                      <Edit fontSize="small" />
                    </ActionButton>
                    <ActionButton onClick={handleDelete}>
                      <Delete fontSize="small" />
                    </ActionButton>
                  </Grid>
                )}
              </Grid>
            </Grid>
            {hasBlocks && (
              <Grid item xs={12}>
                <Grid container>
                  {comment.images && (
                    <Grid
                      item
                      xs={12}
                      style={showImageGallery ? { marginBottom: 12 } : {}}
                    >
                      <Collapse in={showImageGallery} timeout="auto">
                        <ImageGallery images={comment.images} />
                      </Collapse>
                    </Grid>
                  )}
                  {comment.documents && (
                    <Grid
                      item
                      xs={12}
                      style={showDocumentGallery ? { marginBottom: 12 } : {}}
                    >
                      <Collapse in={showDocumentGallery} timeout="auto">
                        <DocumentGallery documents={comment.documents} />
                      </Collapse>
                    </Grid>
                  )}
                  {comment.videos && (
                    <Grid
                      item
                      xs={12}
                      style={showVideoGallery ? { marginBottom: 12 } : {}}
                    >
                      <Collapse in={showVideoGallery} timeout="auto">
                        <VideoGallery videos={comment.videos} />
                      </Collapse>
                    </Grid>
                  )}
                  {comment.links && (
                    <Grid
                      item
                      xs={12}
                      style={showLinkGallery ? { marginBottom: 12 } : {}}
                    >
                      <Collapse in={showLinkGallery} timeout="auto">
                        <LinkGallery links={comment.links} />
                      </Collapse>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        </CommentBox>
      </Grid>
    </Grid>
  );
}

CommentP2V8.propTypes = {
  commentUid: PropTypes.string,
  isFAQquestion: PropTypes.bool,
  canModify: PropTypes.bool,
  author: PropTypes.string,
  content: PropTypes.string,
};

export default memo(CommentP2V8);

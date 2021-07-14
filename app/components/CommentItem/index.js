/* eslint-disable indent */
/**
 *
 * CommentItem
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { Grid, Typography, Divider } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import {
  FavoriteBorder,
  Favorite,
  Translate,
  Edit,
  Delete,
  CheckCircleOutline,
} from '@material-ui/icons';
import { createMarkup } from 'utils/helpers/createMarkup';
import { ActionButton } from 'containers/Feed/Wrapper';
import DeleteDialog from 'components/DeleteDialog';
import UserAvatar from 'components/UserAvatar';
import {
  ImageGallery,
  DocumentGallery,
  VideoGallery,
  LinkEmbed,
} from 'components/FeedTypes';
import { makeSelectComments } from 'containers/GlobalEntities/selectors';
import { makeSelectCurrentUser } from 'containers/AuthBase/selectors';
import {
  likeComment,
  unlikeComment,
  pickComment,
  deleteComment,
} from 'containers/GlobalEntities/actions';
import { openUserLiked } from 'containers/AuthBase/actions';

function CommentItem({
  commentUid,
  type,
  author,
  canModify,
  setEditComment,
  content,
}) {
  const comment = useSelector(makeSelectComments(commentUid)) || {};
  const currentUser = useSelector(makeSelectCurrentUser());
  const dispatch = useDispatch();

  return (
    <>
      <Grid container spacing={2} wrap="nowrap">
        <Grid item>
          <UserAvatar userUid={comment.author} variant="Avatar" size="sm" />
        </Grid>
        <Grid item xs zeroMinWidth>
          <Grid container alignContent="center">
            <Grid item xs>
              <UserAvatar userUid={comment.author} variant="DisplayName" />
              <Typography display="inline" style={{ marginLeft: 5 }}>
                {moment().diff(moment(comment.creationDate), 'days') > 1
                  ? moment(comment.creationDate).format('DD MMM, HH:mm')
                  : moment(comment.creationDate).fromNow()}
              </Typography>
            </Grid>
            {type === 'FAQquestion' && (
              <IconButton
                size="small"
                disabled={canModify ? !canModify : currentUser.uid !== author}
                onClick={() =>
                  dispatch(
                    pickComment(
                      { uid: comment.uid },
                      {
                        status: comment.isSatisfiedComment
                          ? 'unsatisfied'
                          : 'satisfied',
                      },
                    ),
                  )
                }
              >
                <CheckCircleOutline
                  fontSize="small"
                  color={comment.isSatisfiedComment ? 'primary' : 'inherit'}
                />
              </IconButton>
            )}
          </Grid>
          <Typography
            variant="body1"
            gutterBottom
            dangerouslySetInnerHTML={createMarkup(comment.parseText)}
          />
          {comment.images && <ImageGallery images={comment.images} />}
          {comment.documents && (
            <DocumentGallery documents={comment.documents} />
          )}
          {comment.videos && <VideoGallery videos={comment.videos} />}
          {comment.links && <LinkEmbed links={comment.links} />}
          <Grid container>
            <Grid item xs>
              <Grid container alignItems="center">
                <ActionButton
                  onClick={() =>
                    comment.userLiked
                      ? dispatch(
                          unlikeComment({
                            commentUid: comment.uid,
                          }),
                        )
                      : dispatch(
                          likeComment({
                            commentUid: comment.uid,
                          }),
                        )
                  }
                >
                  {comment.userLiked ? (
                    <Favorite fontSize="small" />
                  ) : (
                    <FavoriteBorder fontSize="small" />
                  )}
                  {comment.likeCount > 0 && (
                    <Typography
                      variant="body1"
                      onClick={e => {
                        e.stopPropagation();
                        dispatch(openUserLiked({ comment: comment.uid }));
                      }}
                      style={{ marginLeft: 5 }}
                    >
                      {`(${comment.likeCount})`}
                    </Typography>
                  )}
                </ActionButton>

                <ActionButton>
                  <Translate fontSize="small" />
                </ActionButton>
              </Grid>
            </Grid>
            {(currentUser.uid === comment.author.uid || canModify) && (
              <>
                <ActionButton onClick={() => setEditComment(comment)}>
                  <Edit fontSize="small" />
                </ActionButton>
                <DeleteDialog
                  onClick={() =>
                    dispatch(deleteComment({ uid: comment.uid }, content))
                  }
                  message="Are you sure, you want to delete this comment?"
                >
                  <ActionButton>
                    <Delete fontSize="small" />
                  </ActionButton>
                </DeleteDialog>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Divider light />
    </>
  );
}

CommentItem.propTypes = {
  commentUid: PropTypes.string,
  type: PropTypes.string,
  author: PropTypes.string,
  canModify: PropTypes.bool,
  setEditComment: PropTypes.func,
  content: PropTypes.string,
};

export default memo(CommentItem);

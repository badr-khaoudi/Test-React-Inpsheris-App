/* eslint-disable indent */
/**
 *
 * Comment
 *
 */

import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Grid,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Close } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectCurrentUser } from 'containers/AuthBase/selectors';
import CommentArea from 'containers/CommentArea/Loadable';
import CommentItem from 'components/CommentItem';
import UserAvatar from 'components/UserAvatar';
import reducer from './reducer';
import saga from './saga';
import { viewMore } from './actions';
// import messages from './messages';

export function Comment(props) {
  useInjectReducer({ key: 'comment', reducer });
  useInjectSaga({ key: 'comment', saga });

  const {
    currentUser,
    comments,
    type,
    content,
    community,
    author,
    dispatchViewMore,
    followerQuickpostUid,
  } = props;

  const [editComment, setEditComment] = useState(undefined);

  const handleClose = useCallback(() => {
    setEditComment(undefined);
  }, []);

  const [canModify, setCanModify] = useState(false);

  useEffect(() => {
    if (currentUser.role === 'GlobalCommunityManager') {
      setCanModify(true);
    } else if (currentUser.communityRoles) {
      if (
        !_.isEmpty(
          _.find(currentUser.communityRoles, { communityUid: community }),
        )
      ) {
        setCanModify(true);
      }
    }
  }, [currentUser]);

  const [page, setPage] = useState(0);

  useEffect(() => {
    if (page > 0) {
      dispatchViewMore({
        content,
        followerQuickpostUid,
        itemsPerPage: 50,
        page,
      });
    }
  }, [page]);

  return (
    <>
      <Grid container spacing={2}>
        {!_.isEmpty(comments) &&
          _.map(comments, comment => (
            <Grid item xs={12} key={comment}>
              <CommentItem
                commentUid={comment}
                type={type}
                author={author}
                canModify={canModify}
                setEditComment={setEditComment}
                content={content || followerQuickpostUid}
              />
            </Grid>
          ))}
        {((page === 0 && _.size(comments) > 0) ||
          (page > 0 && page * 50 === _.size(comments))) && (
          <Grid item xs={12}>
            <Button size="small" onClick={() => setPage(page + 1)}>
              View More
            </Button>
          </Grid>
        )}
        <Grid item xs={12}>
          <CommentArea
            content={content}
            followerQuickpostUid={followerQuickpostUid}
          />
        </Grid>
      </Grid>
      {editComment !== undefined && (
        <Dialog
          open
          onClose={handleClose}
          scroll="paper"
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>
            Edit Comment
            <IconButton
              aria-label="close"
              onClick={handleClose}
              style={{ position: 'absolute', top: 5, right: 5 }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            {canModify && currentUser.uid !== editComment.author && (
              <Box marginBottom={2}>
                <Alert severity="info">
                  {`You are editing `}
                  <UserAvatar
                    userUid={editComment.author}
                    variant="DisplayName"
                    size="sm"
                  />
                  {`'s comment`}
                </Alert>
              </Box>
            )}
            <CommentArea comment={editComment} handleClose={handleClose} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

Comment.propTypes = {
  currentUser: PropTypes.object,
  comments: PropTypes.array,
  type: PropTypes.string,
  content: PropTypes.string,
  community: PropTypes.string,
  author: PropTypes.string,
  dispatchViewMore: PropTypes.func,
  followerQuickpostUid: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchViewMore: options => dispatch(viewMore(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Comment);

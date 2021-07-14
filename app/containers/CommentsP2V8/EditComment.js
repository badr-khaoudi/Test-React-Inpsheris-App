/**
 *
 * EditComment
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, DialogContent, DialogTitle } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import { makeSelectComments } from 'containers/GlobalEntities/selectors';
import { makeSelectCurrentUser } from 'containers/AuthBase/selectors';
import CommentFormP2V8 from 'containers/CommentFormP2V8/Loadable';
import UserAvatar from 'components/UserAvatar';
import { makeSelectCommentUid } from './selectors';
import { closeEditComment } from './actions';

function EditComment() {
  const commentUid = useSelector(makeSelectCommentUid());
  const comment = useSelector(makeSelectComments(commentUid));
  const currentUser = useSelector(makeSelectCurrentUser());
  const dispatch = useDispatch();

  const handleClose = () => dispatch(closeEditComment());
  return (
    <Dialog
      open
      onClose={handleClose}
      scroll="paper"
      fullWidth
      maxWidth="sm"
      disableEnforceFocus
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
        <Grid container spacing={2}>
          {currentUser.uid !== comment.author && (
            <Grid item xs={12}>
              <Alert severity="info">
                {`You are editing `}
                <UserAvatar
                  userUid={comment.author}
                  variant="DisplayName"
                  size="sm"
                />
                {`'s comment`}
              </Alert>
            </Grid>
          )}
          <Grid item xs={12}>
            <CommentFormP2V8 comment={comment} handleClose={handleClose} />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

EditComment.propTypes = {};

export default memo(EditComment);

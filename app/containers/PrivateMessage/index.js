/**
 *
 * PrivateMessage
 *
 */

import React, { useMemo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import { useSnackbar } from 'notistack';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
  Typography,
  Card,
  CardContent,
  Avatar,
  TextField,
  Divider,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { initials } from 'utils/helpers/avatarInitials';
import { useCloseEffect } from 'utils/helpers/useCloseEffect';
import UserAvatar from 'components/UserAvatar';
import UserAutocomplete from 'containers/UserAutocomplete';
import { closePrivateMessage } from 'containers/AuthBase/actions';
import {
  makeSelectPrivateMessageContent,
  makeSelectPrivateMessageUsers,
  makeSelectCurrentUser,
} from 'containers/AuthBase/selectors';
import CheckType from 'containers/Feed/checkType';
import ActionSentence from 'components/ActionSentence';
import { makeSelectPrivateMessageSuccess } from './selectors';
import { privateMessage, cleanPrivateMessage } from './actions';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { PrivateMessageSchema } from './Schema';

export function PrivateMessage(props) {
  useInjectReducer({ key: 'privateMessage', reducer });
  useInjectSaga({ key: 'privateMessage', saga });

  const { enqueueSnackbar } = useSnackbar();

  const {
    open,
    privateMessageContent,
    privateMessageUsers,
    dispatchClosePrivateMessage,
    dispatchCleanPrivateMessage,
    privateMessageSuccess,
    dispatchPrivateMessage,
    currentUser,
  } = props;

  const userDetail = useMemo(
    () =>
      privateMessageContent.lastActivityUser || privateMessageContent.author,
    [privateMessageContent],
  );

  const contentUid = useMemo(
    () => privateMessageContent.sourceId || privateMessageContent.uid,
    [privateMessageContent],
  );

  const [title, setTitle] = useState('');
  const [userUids, setUserUids] = useState([]);

  useEffect(() => {
    if (privateMessageSuccess) {
      enqueueSnackbar('Success', { variant: 'success' });
      dispatchCleanPrivateMessage();
      dispatchClosePrivateMessage();
    }
  }, [privateMessageSuccess]);

  const reference = _.find(privateMessageContent.blocks, { type: 'reference' });

  useCloseEffect(dispatchClosePrivateMessage);

  useEffect(() => {
    if (!_.isEmpty(privateMessageUsers)) {
      setUserUids(
        _.map(privateMessageUsers, privateMessageUser => ({
          ...privateMessageUser,
          displayName: `${privateMessageUser.firstName} ${
            privateMessageUser.lastName
          }`,
        })),
      );
    }
  }, [privateMessageUsers]);

  const handlePrivateMessage = () => {
    const payload = {
      contentSourceType: 'Content',
      title,
      contentUid,
      userUids: _.map(userUids, ({ uid }) => uid),
    };
    const result = PrivateMessageSchema.validate(payload);
    if (result.error) {
      enqueueSnackbar(`${result.error}`, {
        variant: 'error',
      });
    }
    if (!result.error) {
      dispatchPrivateMessage(payload);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={dispatchClosePrivateMessage}
      scroll="paper"
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        Private Message
        <IconButton
          aria-label="close"
          onClick={dispatchClosePrivateMessage}
          style={{ position: 'absolute', top: 5, right: 5 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2} wrap="nowrap">
              <Grid item>
                <Avatar src={currentUser.headerLogoUrl}>
                  {initials(currentUser.displayName)}
                </Avatar>
              </Grid>
              <Grid item xs>
                <TextField
                  placeholder="Ecrivez un message privé à propos de ce contenu"
                  fullWidth
                  multiline
                  rows={2}
                  variant="outlined"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">À qui?</Typography>
          </Grid>
          <Grid item xs={12}>
            <UserAutocomplete userUids={userUids} setUserUids={setUserUids} />
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Contenu</Typography>
          </Grid>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardContent>
                {privateMessageContent.type !== 'jobOffer' && (
                  <UserAvatar userUid={userDetail} variant="DisplayName" />
                )}
                <Typography variant="subtitle1" gutterBottom>
                  <ActionSentence
                    type={
                      privateMessageContent.type ===
                        'follower quickpost sharing' ||
                      privateMessageContent.type === 'follower quickpost'
                        ? reference.refType
                        : privateMessageContent.type
                    }
                    previousAction={privateMessageContent.previousAction}
                    lastAction={privateMessageContent.lastAction}
                    authorUid={privateMessageContent.author}
                    editionStatus={privateMessageContent.editionStatus}
                    blocks={privateMessageContent.blocks}
                    communityUid={privateMessageContent.community}
                  />
                </Typography>
                {CheckType(
                  privateMessageContent.type,
                  privateMessageContent.blocks,
                  privateMessageContent.parseText,
                  privateMessageContent.subTitle || null,
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handlePrivateMessage}
          variant="outlined"
          color="primary"
        >
          Send
        </Button>
      </DialogActions>
    </Dialog>
  );
}

PrivateMessage.propTypes = {
  open: PropTypes.bool,
  privateMessageContent: PropTypes.object,
  privateMessageUsers: PropTypes.array,
  privateMessageSuccess: PropTypes.bool,
  dispatchPrivateMessage: PropTypes.func,
  dispatchClosePrivateMessage: PropTypes.func,
  dispatchCleanPrivateMessage: PropTypes.func,
  currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  privateMessageContent: makeSelectPrivateMessageContent(),
  privateMessageUsers: makeSelectPrivateMessageUsers(),
  privateMessageSuccess: makeSelectPrivateMessageSuccess(),
  currentUser: makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchPrivateMessage: options => dispatch(privateMessage(options)),
    dispatchClosePrivateMessage: () => dispatch(closePrivateMessage()),
    dispatchCleanPrivateMessage: () => dispatch(cleanPrivateMessage()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PrivateMessage);

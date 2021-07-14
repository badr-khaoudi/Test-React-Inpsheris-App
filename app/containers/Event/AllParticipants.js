/* eslint-disable indent */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';
import { participants as participantsAction } from './actions';
import {
  makeSelectParticipants,
  makeSelectParticipantsLoading,
} from './selectors';
import SubscribedParticipant from './SubscribedParticipant';
import WaitingParticipant from './WaitingParticipant';

const AllParticipants = ({ status, event, contentUid, handleClose }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(participantsAction({ eventUid: event.uid, status }));
  }, []);
  const participants = useSelector(makeSelectParticipants());
  const participantsLoading = useSelector(makeSelectParticipantsLoading());

  return (
    <Dialog open onClose={handleClose} scroll="paper" fullWidth maxWidth="sm">
      <DialogTitle>
        {status}
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
          {participantsLoading &&
            _.map(_.range(4), index => (
              <Grid item xs={3} key={index}>
                <Grid container justify="center">
                  <Grid item>
                    <Skeleton variant="circle" width={56} height={56} />
                  </Grid>
                  <Grid item xs={12}>
                    <Skeleton variant="text" />
                  </Grid>
                </Grid>
              </Grid>
            ))}
          {status === 'subscribed' &&
            _.map(participants, participant => (
              <Grid item xs={3} key={participant.uid}>
                <SubscribedParticipant
                  participant={participant}
                  event={event}
                  contentUid={contentUid}
                />
              </Grid>
            ))}
          {status === 'waiting' &&
            _.map(participants, participant => (
              <Grid item xs={3} key={participant.uid}>
                <WaitingParticipant
                  participant={participant}
                  event={event}
                  contentUid={contentUid}
                />
              </Grid>
            ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

AllParticipants.propTypes = {
  status: PropTypes.string,
  event: PropTypes.object,
  contentUid: PropTypes.string,
  handleClose: PropTypes.func,
};

export default memo(AllParticipants);

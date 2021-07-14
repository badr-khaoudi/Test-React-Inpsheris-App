/* eslint-disable indent */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeSelectCurrentUser } from 'containers/AuthBase/selectors';
import Participant from './Participant';
import { addParticipation, cancelParticipation } from './actions';

const WaitingParticipant = ({ participant, event, contentUid }) => {
  const currentUser = useSelector(makeSelectCurrentUser());
  const dispatch = useDispatch();
  return (
    <Grid container spacing={1}>
      <Grid item xs>
        <Participant participant={participant} />
      </Grid>
      {currentUser.role === 'GlobalCommunityManager' &&
        !event.isStopParticipation &&
        !event.isDoNotParticipateEvent && (
          <Grid item xs>
            <Button
              variant="contained"
              size="small"
              color="primary"
              disableElevation
              fullWidth
              onClick={() =>
                dispatch(
                  addParticipation(
                    {
                      eventUid: event.uid,
                      userUid: participant.uid,
                    },
                    contentUid,
                  ),
                )
              }
            >
              Subscribe
            </Button>
          </Grid>
        )}
      {(currentUser.uid === participant.uid ||
        (currentUser.role === 'GlobalCommunityManager' &&
          !event.isStopParticipation &&
          !event.isDoNotParticipateEvent)) && (
        <Grid item xs>
          <Button
            variant="contained"
            size="small"
            color="primary"
            disableElevation
            fullWidth
            onClick={() =>
              dispatch(
                cancelParticipation(
                  {
                    eventUid: event.uid,
                    userUid: participant.uid,
                  },
                  contentUid,
                ),
              )
            }
          >
            Unsubscribe
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

WaitingParticipant.propTypes = {
  participant: PropTypes.object,
  event: PropTypes.object,
  contentUid: PropTypes.string,
};

export default memo(WaitingParticipant);

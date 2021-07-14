/* eslint-disable indent */
/**
 *
 * Event
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import {
  Grid,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { EventAvailable, AccessTime, Close } from '@material-ui/icons';
import { content } from 'containers/AuthBase/actions';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/Event/reducer';
import saga from 'containers/Event/saga';
import { participate } from 'containers/Event/actions';
import { initials } from 'utils/helpers/avatarInitials';
import RoundButton from 'utils/helpers/roundButton';
import { EventBox, TimeChip, Map } from './Wrapper';

function Event({ event, contentUid }) {
  useInjectReducer({ key: 'event', reducer });
  useInjectSaga({ key: 'event', saga });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!event.meetingEventType) {
      dispatch(content({ uid: contentUid }));
    }
  }, []);

  const [integrateOpen, setIntegrateOpen] = useState(false);

  const handleParticipate = integration => {
    dispatch(
      participate(
        {
          action: 'participate',
          eventUid: event.uid,
        },
        integration,
        contentUid,
      ),
    );
    setIntegrateOpen(false);
  };

  const handleClose = () => {
    handleParticipate(false);
  };

  return (
    <>
      <EventBox>
        <Grid container spacing={2} wrap="nowrap">
          <Grid item xs={event.meetingEventType ? 12 : 6}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Grid container spacing={1} wrap="nowrap">
                  <Grid item>
                    <EventAvailable color="secondary" fontSize="large" />
                  </Grid>
                  <Grid item xs zeroMinWidth>
                    <Typography variant="h6" noWrap>
                      {event.title}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TimeChip
                  color="primary"
                  icon={<AccessTime />}
                  label={moment(event.dateFrom).format('LT')}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  color="textSecondary"
                  display="inline"
                  style={{ paddingRight: 10 }}
                >
                  {event.meetingEventType ? 'Date:' : 'Date de fin:'}
                </Typography>
                <Typography display="inline">
                  {moment(
                    event.meetingEventType ? event.dateFrom : event.dateTo,
                  ).format('L')}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {!event.meetingEventType && (
                  <Grid container spacing={2} alignItems="center">
                    {!_.isEmpty(event.participants) && (
                      <Grid item>
                        <AvatarGroup max={3}>
                          {_.map(event.participants, participant => (
                            <Avatar
                              key={participant}
                              src={participant.headerLogoUrl}
                            >
                              {initials([
                                participant.firstName,
                                participant.lastName,
                              ])}
                            </Avatar>
                          ))}
                        </AvatarGroup>
                      </Grid>
                    )}
                    <Grid item>
                      {event.isParticipatedEvent &&
                        !event.isStopParticipation &&
                        !event.isDoNotParticipateEvent &&
                        event.participantStatus !== 'Waiting' && (
                          <RoundButton
                            variant="outlined"
                            color="primary"
                            disabled={
                              moment().diff(event.dateTo, 'minutes') > 0
                            }
                            onClick={() =>
                              dispatch(
                                participate(
                                  {
                                    action: 'cancel',
                                    eventUid: event.uid,
                                    isRemoveParticipation: false,
                                  },
                                  null,
                                  contentUid,
                                ),
                              )
                            }
                          >
                            Cancel Participation
                          </RoundButton>
                        )}
                      {!event.isParticipatedEvent &&
                        !event.isStopParticipation &&
                        !event.isDoNotParticipateEvent && (
                          <RoundButton
                            variant="outlined"
                            color="primary"
                            disabled={
                              moment().diff(event.dateTo, 'minutes') > 0
                            }
                            onClick={() => setIntegrateOpen(true)}
                          >
                            Participate
                          </RoundButton>
                        )}
                    </Grid>
                  </Grid>
                )}
                {event.meetingEventType && event.path && (
                  <RoundButton
                    variant="outlined"
                    href={event.path}
                    target="_blank"
                    disabled={moment().diff(event.dateFrom, 'minutes') > 0}
                  >
                    Accès à la réunion
                  </RoundButton>
                )}
              </Grid>
            </Grid>
          </Grid>
          {!event.meetingEventType && (
            <Grid item xs={6} zeroMinWidth>
              <Map />
              <Typography noWrap>{event.location}</Typography>
            </Grid>
          )}
        </Grid>
      </EventBox>
      <Dialog
        open={integrateOpen}
        onClose={handleClose}
        scroll="paper"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          Integrate to Calendrier Google
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: 'absolute', top: 5, right: 5 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography>
            Do you also want to add this event in your Calendrier Google?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleParticipate(true)}
            variant="outlined"
            color="primary"
          >
            Yes
          </Button>
          <Button onClick={handleClose} variant="outlined" color="primary">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

Event.propTypes = {
  event: PropTypes.object,
  contentUid: PropTypes.string,
};

export default memo(Event);

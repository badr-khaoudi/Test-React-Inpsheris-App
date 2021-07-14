/* eslint-disable indent */
/**
 *
 * Event
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Close, MailOutline } from '@material-ui/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectCurrentUser } from 'containers/AuthBase/selectors';
import { privateMessage } from 'containers/AuthBase/actions';
import { Calender } from 'components/FeedTypes/Wrapper';
import { makeSelectFeed } from 'containers/GlobalEntities/selectors';
import {
  makeSelectParticipants,
  makeSelectParticipantsLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import {
  participate,
  exportParticipants,
  stopParticipation,
  participants as participantsAction,
} from './actions';
import SubscribedParticipant from './SubscribedParticipant';
import WaitingParticipant from './WaitingParticipant';
import AllParticipants from './AllParticipants';

export function Event(props) {
  useInjectReducer({ key: 'event', reducer });
  useInjectSaga({ key: 'event', saga });

  const {
    event,
    currentUser,
    contentUid,
    dispatchParticipate,
    dispatchExportParticipants,
    dispatchStopParticipation,
    dispatchParticipants,
    participants,
    participantsLoading,
    dispatchPrivateMessage,
    content,
  } = props;

  const [integrateOpen, setIntegrateOpen] = useState(false);

  const handleParticipate = integration => {
    dispatchParticipate(
      {
        action: 'participate',
        eventUid: event.uid,
      },
      integration,
      contentUid,
    );
    setIntegrateOpen(false);
  };

  const handleClose = () => {
    handleParticipate(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = e => {
    dispatchParticipants({ eventUid: event.uid, status: 'subscribed' });
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const [allParticipantsStatus, setAllParticipantsStatus] = useState('');
  const [allParticipantsOpen, setAllParticipantsOpen] = useState(false);

  const handleOpenAllParticipants = status => {
    setAllParticipantsStatus(status);
    setAllParticipantsOpen(true);
  };

  const handlePrivateMessage = () => {
    handleMenuClose();
    dispatchPrivateMessage(content, participants);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            {event.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {event.location}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} wrap="nowrap">
            <Grid item>
              <Calender>
                <span className="day">
                  {moment(event.dateFrom).format('DD')}
                </span>
                <span className="month">
                  {moment(event.dateFrom).format('MMM')}
                </span>
                <span className="time">
                  {moment(event.dateFrom).format('HH[h]mm')}
                </span>
              </Calender>
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography variant="body2" gutterBottom>
                {`Start Date: ${moment(event.dateFrom).format('MMM DD, YYYY')}`}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {`Start Time: ${moment(event.dateFrom).format('HH[h]mm')}`}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {`End Date: ${moment(event.dateTo).format('MMM DD, YYYY')}`}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {`End Time: ${moment(event.dateTo).format('HH[h]mm')}`}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {event.location}
              </Typography>
              {event.isAssociateConferenceCall &&
                event.isParticipatedEvent &&
                event.participantStatus === 'Participate' &&
                event.conferenceCallUri && (
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    disableElevation
                    href={event.conferenceCallUri}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                  >
                    Join the conference call
                  </Button>
                )}
            </Grid>
          </Grid>
        </Grid>
        {event.participateEventExtension && (
          <>
            {!_.isEmpty(event.participants) && (
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6">Participants</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2} wrap="nowrap">
                      {_.map(_.take(event.participants, 8), participant => (
                        <Grid item xs={2} key={participant.uid}>
                          <SubscribedParticipant
                            participant={participant}
                            event={event}
                            contentUid={contentUid}
                          />
                        </Grid>
                      ))}
                      {(currentUser.uid === event.eventAuthor.uid ||
                        _.size(event.participants) > 8) && (
                        <Grid item style={{ alignSelf: 'flex-end' }}>
                          <Grid container spacing={2}>
                            {currentUser.uid === event.eventAuthor.uid && (
                              <Grid item xs={12}>
                                <IconButton onClick={handleMenuOpen}>
                                  <MailOutline />
                                </IconButton>
                              </Grid>
                            )}
                            {_.size(event.participants) > 8 && (
                              <Grid item xs={12}>
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  onClick={() =>
                                    handleOpenAllParticipants('subscribed')
                                  }
                                >
                                  View More
                                </Button>
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
            {!_.isEmpty(event.waitingList) && (
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6">Waiting List</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2} wrap="nowrap">
                      {_.map(
                        _.take(event.waitingList, 8),
                        waitingParticipant => (
                          <Grid item xs={2} key={waitingParticipant.uid}>
                            <WaitingParticipant
                              participant={waitingParticipant}
                              event={event}
                              contentUid={contentUid}
                            />
                          </Grid>
                        ),
                      )}
                      {_.size(event.waitingList) > 8 && (
                        <Grid item style={{ alignSelf: 'flex-end' }}>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleOpenAllParticipants('waiting')}
                          >
                            View More
                          </Button>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {event.isParticipatedEvent &&
                  !event.isStopParticipation &&
                  !event.isDoNotParticipateEvent &&
                  event.participantStatus !== 'Waiting' && (
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        disabled={moment().diff(event.dateTo, 'minutes') > 0}
                        onClick={() =>
                          dispatchParticipate(
                            {
                              action: 'cancel',
                              eventUid: event.uid,
                              isRemoveParticipation: false,
                            },
                            null,
                            contentUid,
                          )
                        }
                      >
                        Cancel Participation
                      </Button>
                    </Grid>
                  )}
                {!event.isParticipatedEvent &&
                  !event.isStopParticipation &&
                  !event.isDoNotParticipateEvent && (
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        disabled={moment().diff(event.dateTo, 'minutes') > 0}
                        onClick={() => setIntegrateOpen(true)}
                      >
                        Participate
                      </Button>
                    </Grid>
                  )}
                {currentUser.role === 'GlobalCommunityManager' && (
                  <>
                    <Grid item>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                          dispatchExportParticipants({
                            eventUid: event.uid,
                            isExportAll: true,
                          })
                        }
                      >
                        Export list
                      </Button>
                    </Grid>
                    <Grid item>
                      {event.isStopParticipation ? (
                        <Button
                          variant="outlined"
                          color="primary"
                          disabled={moment().diff(event.dateTo, 'minutes') > 0}
                          onClick={() =>
                            dispatchStopParticipation(
                              {
                                eventUid: event.uid,
                              },
                              {
                                isStopParticipation: false,
                              },
                              contentUid,
                            )
                          }
                        >
                          Allow participation
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          color="primary"
                          disabled={moment().diff(event.dateTo, 'minutes') > 0}
                          onClick={() =>
                            dispatchStopParticipation(
                              {
                                eventUid: event.uid,
                              },
                              {
                                isStopParticipation: true,
                              },
                              contentUid,
                            )
                          }
                        >
                          Stop participation
                        </Button>
                      )}
                    </Grid>
                    {event.isActivateDoNotParticipate &&
                      !event.isParticipatedEvent &&
                      !event.participantStatus &&
                      !event.isStopParticipation && (
                        <Grid item>
                          <Button
                            variant="outlined"
                            color="primary"
                            disabled={
                              moment().diff(event.dateTo, 'minutes') > 0
                            }
                            onClick={() =>
                              dispatchParticipate(
                                {
                                  action: 'do not participate',
                                  eventUid: event.uid,
                                },
                                null,
                                contentUid,
                              )
                            }
                          >
                            Do not participate
                          </Button>
                        </Grid>
                      )}
                  </>
                )}
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem disabled={participantsLoading} onClick={handlePrivateMessage}>
          Par message privé
        </MenuItem>
        <MenuItem disabled={participantsLoading} onClick={handleMenuClose}>
          <a
            href={`mailto:${_.join(
              _.map(participants, ({ email }) => email),
              ',',
            )}?subject=${event.title}`}
            style={{ color: 'inherit' }}
          >
            Par email
          </a>
        </MenuItem>
      </Menu>
      {allParticipantsOpen && (
        <AllParticipants
          status={allParticipantsStatus}
          event={event}
          contentUid={contentUid}
          handleClose={() => {
            setAllParticipantsStatus('');
            setAllParticipantsOpen(false);
          }}
        />
      )}
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
  currentUser: PropTypes.object,
  contentUid: PropTypes.string,
  dispatchParticipate: PropTypes.func,
  dispatchExportParticipants: PropTypes.func,
  dispatchStopParticipation: PropTypes.func,
  dispatchParticipants: PropTypes.func,
  participants: PropTypes.array,
  participantsLoading: PropTypes.bool,
  dispatchPrivateMessage: PropTypes.func,
  content: PropTypes.object,
};

const mapStateToProps = (state, props) =>
  createStructuredSelector({
    currentUser: makeSelectCurrentUser(),
    participants: makeSelectParticipants(),
    participantsLoading: makeSelectParticipantsLoading(),
    content: makeSelectFeed(props.contentUid),
  });

function mapDispatchToProps(dispatch) {
  return {
    dispatchParticipate: (options, integrate, contentUid) =>
      dispatch(participate(options, integrate, contentUid)),
    dispatchExportParticipants: options =>
      dispatch(exportParticipants(options)),
    dispatchStopParticipation: (params, options, contentUid) =>
      dispatch(stopParticipation(params, options, contentUid)),
    dispatchParticipants: options => dispatch(participantsAction(options)),
    dispatchPrivateMessage: (content, users) =>
      dispatch(privateMessage(content, users)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Event);

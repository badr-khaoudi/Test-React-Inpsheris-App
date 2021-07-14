/**
 *
 * EventBlock
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Grid,
  TextField,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import { Close } from '@material-ui/icons';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function EventBlock(props) {
  const { event, setEvent, handleClose } = props;
  return (
    <Grid container wrap="nowrap" spacing={1}>
      <Grid item>*</Grid>
      <Grid item xs zeroMinWidth>
        <Paper
          elevation={0}
          style={{
            backgroundColor: '#eceeef',
            padding: 10,
            paddingRight: 44,
            position: 'relative',
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: 'absolute', top: 0, right: 0 }}
          >
            <Close fontSize="small" />
          </IconButton>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                size="small"
                name="title"
                value={event.title}
                onChange={e => setEvent(e.target.name, e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Location"
                variant="outlined"
                fullWidth
                size="small"
                name="location"
                value={event.location}
                onChange={e => setEvent(e.target.name, e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    inputVariant="outlined"
                    format="MMM dd, yyyy"
                    value={event.dateFrom}
                    onChange={date => setEvent('dateFrom', date)}
                    emptyLabel="Start Date"
                    autoOk
                    disablePast
                    maxDate={event.dateTo}
                  />
                </Grid>
                <Grid item xs={4}>
                  <KeyboardTimePicker
                    disableToolbar
                    variant="inline"
                    inputVariant="outlined"
                    value={event.dateFrom}
                    onChange={date => setEvent('dateFrom', date)}
                    emptyLabel="Start Time"
                    autoOk
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    inputVariant="outlined"
                    format="MMM dd, yyyy"
                    value={event.dateTo}
                    onChange={date => setEvent('dateTo', date)}
                    emptyLabel="End Date"
                    autoOk
                    disablePast
                    minDate={event.dateFrom}
                  />
                </Grid>
                <Grid item xs={4}>
                  <KeyboardTimePicker
                    disableToolbar
                    variant="inline"
                    inputVariant="outlined"
                    value={event.dateTo}
                    onChange={date => setEvent('dateTo', date)}
                    emptyLabel="End Time"
                    autoOk
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container direction="column">
                <FormControlLabel
                  control={
                    <Checkbox
                      name="participateEventExtension"
                      checked={event.participateEventExtension}
                      onChange={e => setEvent(e.target.name, e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Active the possibility participate for event"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="limitSeatOfEvent"
                      checked={event.limitSeatOfEvent}
                      onChange={e => setEvent(e.target.name, e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Nombre maximum de sièges"
                />
                {event.limitSeatOfEvent && (
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={5}>
                      <TextField
                        label="Nombre total de sièges"
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="totalNumberOfSeat"
                        value={event.totalNumberOfSeat}
                        onChange={e => setEvent(e.target.name, e.target.value)}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">/</Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        label="Liste d’attente"
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="totalNumberOfWaitingSeat"
                        value={event.totalNumberOfWaitingSeat}
                        onChange={e => setEvent(e.target.name, e.target.value)}
                      />
                    </Grid>
                  </Grid>
                )}
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isSendGoogleCalendarInvitation"
                      checked={event.isSendGoogleCalendarInvitation}
                      onChange={e => setEvent(e.target.name, e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Send Google Calendar Invitation"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isActivateDoNotParticipate"
                      checked={event.isActivateDoNotParticipate}
                      onChange={e => setEvent(e.target.name, e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Activer “Ne participe pas”"
                />
                {event.isSendGoogleCalendarInvitation && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="isAssociateConferenceCall"
                        checked={event.isAssociateConferenceCall}
                        onChange={e =>
                          setEvent(e.target.name, e.target.checked)
                        }
                        color="primary"
                      />
                    }
                    label="Associate Conference Call"
                  />
                )}
                <TextField
                  label="Conference Solution Type"
                  variant="outlined"
                  fullWidth
                  select
                  size="small"
                  name="conferenceSolutionType"
                  value={event.conferenceSolutionType}
                  onChange={e => {
                    setEvent(e.target.name, e.target.value);
                  }}
                >
                  <MenuItem value="HangoutsMeet">Hangouts Meet</MenuItem>
                  <MenuItem value="GoogleMeet">Google Meet</MenuItem>
                </TextField>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="isSendGoogleCalendarPersonalInvitation"
                      checked={event.isSendGoogleCalendarPersonalInvitation}
                      onChange={e => setEvent(e.target.name, e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Send personal invitations by manually"
                />
                {event.isSendGoogleCalendarPersonalInvitation && (
                  <TextField
                    label="Personal Invitation Emails"
                    variant="outlined"
                    fullWidth
                    size="small"
                    name="googleCalendarPersonalInvitationEmails"
                    value={event.googleCalendarPersonalInvitationEmails}
                    onChange={e => setEvent(e.target.name, e.target.value)}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

EventBlock.propTypes = {
  event: PropTypes.object,
  setEvent: PropTypes.func,
  handleClose: PropTypes.func,
};

export default memo(EventBlock);

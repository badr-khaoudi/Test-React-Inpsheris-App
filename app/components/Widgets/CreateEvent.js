/**
 *
 * CreateEvent
 *
 */

import React, { memo, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
  TextField,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import { useSnackbar } from 'notistack';
import {
  makeSelectEvent,
  makeSelectCreateEventSuccess,
} from 'containers/WidgetContainer/selectors';
import {
  closeCreateEvent,
  createEvent,
  cleanCreateEvent,
} from 'containers/WidgetContainer/actions';
import { EventSchema } from './EventSchema';

function CreateEvent() {
  const [eventName, setEventName] = useState('');
  const [eventLink, setEventLink] = useState('');
  const [location, setLocation] = useState('');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const event = useSelector(makeSelectEvent());
  const createEventSuccess = useSelector(makeSelectCreateEventSuccess());

  useEffect(() => {
    if (!_.isEmpty(event)) {
      setEventName(event.title);
      setEventLink(event.url);
      setLocation(event.location);
      setFromDate(event.start);
      setToDate(event.end);
    }
  }, []);

  const handleCreate = () => {
    const payload = {
      uid: event ? event.uid : event,
      eventName,
      eventLink,
      location,
      fromDate: parseFloat(moment(fromDate).format('x')),
      toDate: parseFloat(moment(toDate).format('x')),
    };
    const result = EventSchema.validate(payload);
    if (result.error) {
      enqueueSnackbar(`${result.error}`, {
        variant: 'error',
      });
    }
    if (!result.error) {
      dispatch(createEvent(payload));
    }
  };

  useEffect(() => {
    if (createEventSuccess) {
      enqueueSnackbar('Success', { variant: 'success' });
      dispatch(closeCreateEvent());
      dispatch(cleanCreateEvent());
    }
  }, [createEventSuccess]);

  return (
    <Dialog
      open
      onClose={() => dispatch(closeCreateEvent())}
      scroll="paper"
      fullWidth
      maxWidth="md"
      disableEnforceFocus
    >
      <DialogTitle>
        Create Event
        <IconButton
          aria-label="close"
          onClick={() => dispatch(closeCreateEvent())}
          style={{ position: 'absolute', top: 5, right: 5 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              size="small"
              value={eventName}
              onChange={e => setEventName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Link"
              variant="outlined"
              fullWidth
              size="small"
              value={eventLink}
              onChange={e => setEventLink(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Location"
              variant="outlined"
              fullWidth
              size="small"
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  format="MMM dd, yyyy"
                  value={fromDate}
                  onChange={date => setFromDate(date)}
                  autoOk
                  disablePast
                  fullWidth
                  maxDate={toDate}
                  TextFieldComponent={textFieldProps => (
                    <TextField
                      {...textFieldProps}
                      size="small"
                      variant="outlined"
                      InputProps={{
                        ...textFieldProps.InputProps,
                        style: { paddingRight: 0 },
                      }}
                      placeholder="Start Date"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <KeyboardTimePicker
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  value={fromDate}
                  onChange={date => setFromDate(date)}
                  autoOk
                  fullWidth
                  TextFieldComponent={textFieldProps => (
                    <TextField
                      {...textFieldProps}
                      size="small"
                      variant="outlined"
                      InputProps={{
                        ...textFieldProps.InputProps,
                        style: { paddingRight: 0 },
                      }}
                      placeholder="Start Time"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  format="MMM dd, yyyy"
                  value={toDate}
                  onChange={date => setToDate(date)}
                  autoOk
                  disablePast
                  fullWidth
                  minDate={fromDate}
                  TextFieldComponent={textFieldProps => (
                    <TextField
                      {...textFieldProps}
                      size="small"
                      variant="outlined"
                      InputProps={{
                        ...textFieldProps.InputProps,
                        style: { paddingRight: 0 },
                      }}
                      placeholder="End Date"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <KeyboardTimePicker
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  value={toDate}
                  onChange={date => setToDate(date)}
                  autoOk
                  fullWidth
                  TextFieldComponent={textFieldProps => (
                    <TextField
                      {...textFieldProps}
                      size="small"
                      variant="outlined"
                      InputProps={{
                        ...textFieldProps.InputProps,
                        style: { paddingRight: 0 },
                      }}
                      placeholder="End Time"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="primary" onClick={handleCreate}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// CreateEvent.propTypes = {};

export default memo(CreateEvent);

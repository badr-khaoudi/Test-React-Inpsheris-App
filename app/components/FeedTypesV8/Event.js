/**
 *
 * Event
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Grid, Typography, Divider, Tooltip } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { WatchLater, LocationOn } from '@material-ui/icons';
import { EventTime } from './Wrapper';
import useStyles from './useStyles';

const Event = ({ event }) => {
  const classes = useStyles();
  return (
    <Grid container justify="center">
      <Grid item xs={6}>
        <Paper
          className={classes.root}
          style={{ borderRadius: 5, paddingBottom: 60 }}
        >
          <Grid container spacing={3}>
            <Grid item>
              <Typography variant="h6" style={{ color: '#2D2D2D' }}>
                {moment(event.dateFrom).format('dddd')}
              </Typography>
              <Typography
                variant="h6"
                style={{ color: '#2D2D2D', fontSize: 60, lineHeight: 1 }}
              >
                {moment(event.dateFrom).format('DD')}
              </Typography>
              <Typography variant="h6" style={{ color: '#2D2D2D' }}>
                {moment(event.dateFrom).format('MMM')}
              </Typography>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs>
              <EventTime
                icon={<WatchLater />}
                label={moment(event.dateFrom).format('h:mm A')}
              />
              <Typography variant="h6" style={{ color: '#2D2D2D' }}>
                {event.title}
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title={event.location || ''}>
                <LocationOn />
              </Tooltip>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

Event.propTypes = { event: PropTypes.object };

export default memo(Event);

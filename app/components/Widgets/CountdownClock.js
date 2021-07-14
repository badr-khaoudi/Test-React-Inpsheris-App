/**
 *
 * CountdownClock
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Typography, Link, Grid } from '@material-ui/core';
import Countdown from 'react-countdown';
import { Ellipse, Separator } from './Wrapper';

const renderCountdown = (days, hours, minutes, seconds) => (
  <div style={{ padding: 4 }}>
    <Grid container justify="center" spacing={1}>
      <Grid item>
        <Ellipse>
          <Typography variant="h5" align="center" color="inherit">
            {days}
          </Typography>
        </Ellipse>
        <Typography variant="body1" align="center">
          Days
        </Typography>
      </Grid>
      <Grid item>
        <Separator>
          <Typography variant="h5">:</Typography>
        </Separator>
      </Grid>
      <Grid item>
        <Ellipse>
          <Typography variant="h5" align="center" color="inherit">
            {hours}
          </Typography>
        </Ellipse>
        <Typography variant="body1" align="center">
          Hours
        </Typography>
      </Grid>
      <Grid item>
        <Separator>
          <Typography variant="h5">:</Typography>
        </Separator>
      </Grid>
      <Grid item>
        <Ellipse>
          <Typography variant="h5" align="center" color="inherit">
            {minutes}
          </Typography>
        </Ellipse>
        <Typography variant="body1" align="center">
          Minutes
        </Typography>
      </Grid>
      <Grid item>
        <Separator>
          <Typography variant="h5">:</Typography>
        </Separator>
      </Grid>
      <Grid item>
        <Ellipse>
          <Typography variant="h5" align="center" color="inherit">
            {seconds}
          </Typography>
        </Ellipse>
        <Typography variant="body1" align="center">
          Seconds
        </Typography>
      </Grid>
    </Grid>
  </div>
);

function CountdownClock({ countdownClockData }) {
  const [finished, setFinished] = useState(
    moment().diff(moment(countdownClockData.endDate), 'seconds') > 1,
  );
  return (
    <>
      {finished ? (
        <>
          <Typography variant="h6" gutterBottom align="center">
            {countdownClockData.endMessage}
          </Typography>
          <Typography align="center">
            <Link
              href={countdownClockData.url}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              {countdownClockData.url}
            </Link>
          </Typography>
        </>
      ) : (
        <>
          <Typography variant="h6" gutterBottom align="center">
            {countdownClockData.startMessage}
          </Typography>
          <Typography align="center" gutterBottom>
            <Link
              href={countdownClockData.url}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              {countdownClockData.url}
            </Link>
          </Typography>
          <Countdown
            date={countdownClockData.endDate}
            renderer={({ days, hours, minutes, seconds }) =>
              renderCountdown(days, hours, minutes, seconds)
            }
            onComplete={() => setFinished(true)}
          />
        </>
      )}
    </>
  );
}

CountdownClock.propTypes = {
  countdownClockData: PropTypes.object,
};

export default memo(CountdownClock);

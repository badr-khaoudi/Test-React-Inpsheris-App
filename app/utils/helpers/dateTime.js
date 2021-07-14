import React, { memo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Grid, Typography } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import { AccessTime } from '@material-ui/icons';

const DateTime = ({ date }) => (
  <Tooltip
    title={moment(date).format('LLLL')}
    arrow
    placement="top"
    interactive
  >
    <Grid container alignItems="center">
      <AccessTime
        fontSize="small"
        color="secondary"
        style={{ marginRight: 4 }}
      />
      <Typography>
        {moment().diff(date, 'days') > 1
          ? moment(date).format('L [|] LT')
          : moment(date).fromNow()}
      </Typography>
    </Grid>
  </Tooltip>
);

DateTime.propTypes = {
  date: PropTypes.string,
};

export default memo(DateTime);

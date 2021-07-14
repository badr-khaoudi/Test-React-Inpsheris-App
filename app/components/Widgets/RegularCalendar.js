/**
 *
 * RegularCalendar
 *
 */

import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import Event from './Event';

const transformEvents = events =>
  _.map(events, event => ({
    uid: event.uid,
    title: event.eventName,
    url: event.eventLink,
    start: event.fromDate,
    end: event.toDate,
  }));

function RegularCalendar({ widget }) {
  const events = useMemo(() => transformEvents(widget.events), [widget]);
  return (
    <Grid container spacing={2}>
      {_.map(events, event => (
        <Grid item xs={12} key={event.uid}>
          <Event event={event} widgetUid={widget.uid} type="agenda" />
        </Grid>
      ))}
    </Grid>
  );
}

RegularCalendar.propTypes = {
  widget: PropTypes.object,
};

export default memo(RegularCalendar);

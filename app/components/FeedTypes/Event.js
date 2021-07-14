/**
 *
 * Event
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { Grid, Typography } from '@material-ui/core';
import { createMarkup } from 'utils/helpers/createMarkup';
import EventContainer from 'containers/Event/Loadable';
import { Calender } from './Wrapper';

function Event({ blocks, parseText, isFeedModal, contentUid }) {
  if (isFeedModal) {
    return _.map(_.filter(blocks, { type: 'event' }), event => (
      <EventContainer contentUid={contentUid} key={event.uid} event={event} />
    ));
  }
  if (!isFeedModal) {
    const event = _.head(blocks);
    return (
      <Grid container spacing={2} wrap="nowrap">
        <Grid item>
          <Calender>
            <span className="day">{moment(event.dateFrom).format('DD')}</span>
            <span className="month">
              {moment(event.dateFrom).format('MMM')}
            </span>
          </Calender>
        </Grid>
        <Grid item xs zeroMinWidth>
          {parseText && (
            <Typography
              variant="body1"
              gutterBottom
              dangerouslySetInnerHTML={createMarkup(parseText)}
            />
          )}
          {event.path && (
            <a
              href={event.path}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              Access to the meeting
            </a>
          )}
        </Grid>
      </Grid>
    );
  }
}

Event.propTypes = {
  blocks: PropTypes.array,
  parseText: PropTypes.string,
  isFeedModal: PropTypes.bool,
};

export default memo(Event);

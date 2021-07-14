/**
 *
 * Event
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { Grid, Typography, Divider, Tooltip } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { WatchLater, LocationOn, Settings } from '@material-ui/icons';
import { EventTime } from 'components/FeedTypesV8/Wrapper';
import { SimpleMenu } from 'containers/FeedV8/Wrapper';
import { contentEdit } from 'containers/AuthBase/actions';
// import { deleteFeed } from 'containers/GlobalEntities/actions';
import {
  editCreateEvent,
  deleteEvent,
  deleteAgenda,
} from 'containers/WidgetContainer/actions';
import { EventCard } from './Wrapper';

function Event({ event, color, widgetUid, type }) {
  const dispatch = useDispatch();
  const [addAnchorEl, setAddAnchorEl] = useState(null);
  return (
    <>
      <EventCard elevation={0} color={color}>
        <Grid container spacing={2} wrap="nowrap">
          <Grid item>
            {moment(event.end).diff(moment(event.start), 'days') >= 1 ? (
              <Typography variant="h5">
                {`${moment(event.start).format('DD')}-
              ${moment(event.end).format('DD')}`}
              </Typography>
            ) : (
              <Typography variant="h4">
                {moment(event.start).format('DD')}
              </Typography>
            )}
            <Typography variant="h6">
              {moment(event.start).format('MMM')}
            </Typography>
          </Grid>
          <Divider orientation="vertical" flexItem />
          <Grid item xs>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <EventTime
                  size="small"
                  icon={<WatchLater />}
                  label={moment(event.start).format('h:mm A')}
                />
              </Grid>
              <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                {event.location && (
                  <Tooltip placement="top" title={event.location}>
                    <LocationOn
                      fontSize="small"
                      style={{ color: 'rgba(0, 0, 0, 0.54)' }}
                    />
                  </Tooltip>
                )}
                <IconButton
                  size="small"
                  edge="end"
                  onClick={e => setAddAnchorEl(e.currentTarget)}
                >
                  <Settings fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
            <Typography variant="h6" gutterBottom>
              {event.title}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              href={event.url}
              target="_blank"
            >
              Join
            </Button>
          </Grid>
        </Grid>
      </EventCard>
      <SimpleMenu
        elevation={0}
        anchorEl={addAnchorEl}
        open={Boolean(addAnchorEl)}
        onClose={() => setAddAnchorEl(null)}
      >
        {type === 'default' && (
          <MenuItem
            dense
            onClick={() => {
              setAddAnchorEl(null);
              if (event.type === 'automatic') {
                dispatch(contentEdit(event.contentUid));
              } else {
                dispatch(editCreateEvent(widgetUid, event));
              }
            }}
          >
            Edit
          </MenuItem>
        )}
        {event.type === 'regular' && (
          <MenuItem
            dense
            onClick={() => {
              setAddAnchorEl(null);
              dispatch(deleteEvent(widgetUid, { uid: event.uid }));
            }}
          >
            Delete
          </MenuItem>
        )}
        {type === 'agenda' && (
          <MenuItem
            dense
            onClick={() => {
              setAddAnchorEl(null);
              dispatch(deleteAgenda(widgetUid, { uid: event.uid }));
            }}
          >
            Delete
          </MenuItem>
        )}
      </SimpleMenu>
    </>
  );
}

Event.propTypes = {
  event: PropTypes.object,
  color: PropTypes.string,
  widgetUid: PropTypes.string,
  type: PropTypes.string,
};

export default memo(Event);

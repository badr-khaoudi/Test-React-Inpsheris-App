/**
 *
 * Meeting
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Typography, Avatar } from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Chip from '@material-ui/core/Chip';
import { Call, Person } from '@material-ui/icons';
import Link from 'utils/helpers/Link';
import { initials } from 'utils/helpers/avatarInitials';
import meetings from 'images/meetings.png';
import {
  WidgetCard,
  WidgetContainer,
  WidgetContent,
  WidgetAvatar,
} from './Wrapper';

function Meeting() {
  return (
    <WidgetCard>
      <WidgetContainer>
        <WidgetContent>
          <Grid
            container
            spacing={2}
            justify="space-between"
            alignItems="center"
            wrap="nowrap"
          >
            <Grid item>
              <WidgetAvatar $spacing={9}>
                <Call fontSize="large" />
              </WidgetAvatar>
            </Grid>
            <Grid item xs>
              <Grid container alignItems="center">
                <Typography variant="h6" style={{ marginRight: 8 }}>
                  New Zoom Meeting
                </Typography>
                <Chip
                  size="small"
                  icon={<Person />}
                  label="Public"
                  variant="outlined"
                  style={{
                    borderRadius: 5,
                    background: '#ffffff',
                    marginRight: 8,
                  }}
                />
                <img src={meetings} width={24} height={24} alt="meetings" />
              </Grid>
              <Typography gutterBottom>
                The meeting to start,{' '}
                <Link color="secondary" to="/">
                  click here
                </Link>{' '}
                to Join
              </Typography>
              <AvatarGroup max={3}>
                {_.map(_.range(5), participant => (
                  <Avatar key={participant} src={participant.headerLogoUrl}>
                    {initials([participant.firstName, participant.lastName])}
                  </Avatar>
                ))}
              </AvatarGroup>
            </Grid>
            <Grid item>
              <Link color="textSecondary" underline="always" to="/">
                View upcoming meetings
              </Link>
            </Grid>
          </Grid>
        </WidgetContent>
      </WidgetContainer>
    </WidgetCard>
  );
}

Meeting.propTypes = {};

export default memo(Meeting);

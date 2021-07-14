import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Typography, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { initials } from 'utils/helpers/avatarInitials';

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const Participant = ({ participant }) => {
  const classes = useStyles();
  return (
    <Link to={`/myprofile/${participant.uid}/About`}>
      <Grid container direction="column" alignItems="center">
        <Avatar src={participant.headerLogoUrl} className={classes.large}>
          {initials([participant.firstName, participant.lastName])}
        </Avatar>
        <Typography align="center">{`${participant.firstName} ${
          participant.lastName
        }`}</Typography>
      </Grid>
    </Link>
  );
};

Participant.propTypes = {
  participant: PropTypes.object,
};

export default memo(Participant);

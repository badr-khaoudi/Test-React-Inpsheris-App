/**
 *
 * Member
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
// import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Typography, Avatar } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { SwapHoriz, Message, Call } from '@material-ui/icons';
import { Thumbnail } from 'components/FeedTypes/Wrapper';
import { makeSelectUser } from 'containers/GlobalEntities/selectors';
import useStyles from 'components/FeedTypesV8/useStyles';
import { openDirectoryPrivateMessage } from 'containers/AuthBase/actions';
import { initials } from 'utils/helpers/avatarInitials';
// import messages from './messages';

function Member({ uid }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const member = useSelector(makeSelectUser(uid));
  return (
    <Link to={`/myprofile/${member.uid}/About`}>
      <Paper
        className={classes.root}
        style={{ borderRadius: 5, padding: 20, height: '100%' }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Thumbnail style={{ padding: '15px 30px' }}>
              <Avatar
                src={member.headerLogoUrl}
                style={{
                  position: 'absolute',
                  top: '15px',
                  width: 'calc(100% - 60px)',
                  height: 'calc(100% - 30px)',
                }}
              >
                {initials(member.displayName)}
              </Avatar>
            </Thumbnail>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" align="center" gutterBottom>
              {member.displayName}
            </Typography>
            {_.map(member.positions, position => (
              <Typography
                variant="body1"
                align="center"
                gutterBottom
                key={position.uid}
                style={{ color: '#A1A1A1' }}
              >
                {position.name}
              </Typography>
            ))}
            <Grid container spacing={1} alignContent="center" justify="center">
              <Grid item>
                <IconButton>
                  <SwapHoriz fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton>
                  <Call fontSize="small" />
                </IconButton>
              </Grid>
              <Grid item>
                <IconButton
                  onClick={e => {
                    e.preventDefault();
                    dispatch(openDirectoryPrivateMessage(member));
                  }}
                >
                  <Message fontSize="small" />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Link>
  );
}

Member.propTypes = {
  uid: PropTypes.string,
};

export default memo(Member);

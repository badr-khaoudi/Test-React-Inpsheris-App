/**
 *
 * Newcomer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { List, Avatar, ListItemAvatar, ListItemText } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import { initials } from 'utils/helpers/avatarInitials';
import MiniProfile from 'containers/MiniProfile';

function Newcomer({ newcomerData }) {
  return (
    <List>
      {_.map(newcomerData.users, user => (
        <ListItem
          key={user.uid}
          button
          component={Link}
          to={`/myprofile/${user.uid}/About`}
        >
          <ListItemAvatar>
            <Avatar>{initials([user.firstName, user.lastName])}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              <MiniProfile user={user.uid}>
                <span>{`${user.firstName} ${user.lastName}`}</span>
              </MiniProfile>
            }
            secondary={
              !_.isEmpty(user.positions) ? _.head(user.positions).name : null
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

Newcomer.propTypes = {
  newcomerData: PropTypes.object,
};

export default memo(Newcomer);

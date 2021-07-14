import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar, ListItemAvatar, ListItemText } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import { initials } from 'utils/helpers/avatarInitials';
import { makeSelectUser } from 'containers/GlobalEntities/selectors';
import MiniProfile from 'containers/MiniProfile';

const UserItem = ({ user }) => {
  const userDetail = useSelector(makeSelectUser(user));
  return (
    <ListItem
      key={userDetail.uid}
      button
      component={Link}
      to={`/myprofile/${userDetail.uid}/About`}
    >
      <ListItemAvatar>
        <Avatar src={userDetail.headerLogoUrl}>
          {initials(userDetail.displayName)}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <MiniProfile user={user}>
            <span>{userDetail.displayName}</span>
          </MiniProfile>
        }
      />
    </ListItem>
  );
};

UserItem.propTypes = {
  user: PropTypes.string,
};

export default memo(UserItem);

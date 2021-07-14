import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import {
  CardHeader,
  CardContent,
  Avatar,
  Typography,
  List,
  Chip,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { Group } from '@material-ui/icons';
import { makeSelectUserUid } from 'containers/MyProfile/selectors';
import { makeSelectUser } from 'containers/GlobalEntities/selectors';
import UserItem from './UserItem';

const Following = () => {
  const user = useSelector(makeSelectUser(useSelector(makeSelectUserUid())));
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar>
            <Group />
          </Avatar>
        }
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h5"
              display="inline"
              style={{ marginRight: 10 }}
            >
              Following
            </Typography>
            <Chip
              color="primary"
              size="small"
              label={_.padStart(user.followingCount, 2, 0)}
            />
          </div>
        }
      />
      <CardContent style={{ padding: 0 }}>
        <List>
          {_.map(user.followings, followings => (
            <UserItem key={followings} user={followings} />
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default memo(Following);

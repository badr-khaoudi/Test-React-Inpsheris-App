import React, { memo } from 'react';
import PropTypes from 'prop-types';
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
import IconButton from '@material-ui/core/IconButton';
import { Edit, Group } from '@material-ui/icons';
import { makeSelectUserUid } from 'containers/MyProfile/selectors';
import { makeSelectUser } from 'containers/GlobalEntities/selectors';
import { makeSelectCurrentUser } from 'containers/AuthBase/selectors';
import UserItem from './UserItem';

const MyPartners = ({ edit }) => {
  const userUid = useSelector(makeSelectUserUid());
  const user = useSelector(makeSelectUser(userUid));
  const currentUser = useSelector(makeSelectCurrentUser());
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
              My Partners
            </Typography>
            <Chip
              color="primary"
              size="small"
              label={_.padStart(_.size(user.userPartners), 2, 0)}
            />
          </div>
        }
        action={
          (currentUser.uid === userUid ||
            currentUser.role === 'GlobalCommunityManager') && (
            <IconButton onClick={edit}>
              <Edit fontSize="small" />
            </IconButton>
          )
        }
      />
      <CardContent style={{ padding: 0 }}>
        <List>
          {_.map(user.userPartners, userPartner => (
            <UserItem key={userPartner} user={userPartner} />
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

MyPartners.propTypes = {
  edit: PropTypes.func,
};

export default memo(MyPartners);

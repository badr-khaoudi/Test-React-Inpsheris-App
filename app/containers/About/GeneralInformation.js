/* eslint-disable no-nested-ternary */
import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import {
  CardHeader,
  CardContent,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import { Edit } from '@material-ui/icons';
import { makeSelectUserUid } from 'containers/MyProfile/selectors';
import { makeSelectUser } from 'containers/GlobalEntities/selectors';
import { makeSelectCurrentUser } from 'containers/AuthBase/selectors';
import EditAbout from 'containers/EditAbout/Loadable';

const GeneralInformation = () => {
  const userUid = useSelector(makeSelectUserUid());
  const user = useSelector(makeSelectUser(userUid));
  const currentUser = useSelector(makeSelectCurrentUser());

  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <Card variant="outlined">
        <CardHeader
          title="General Information"
          action={
            (currentUser.uid === userUid ||
              currentUser.role === 'GlobalCommunityManager') && (
              <IconButton onClick={() => setEditOpen(true)}>
                <Edit fontSize="small" />
              </IconButton>
            )
          }
        />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ color: '#143C7D' }}
              >
                First Name
              </Typography>
              <Typography variant="h6" gutterBottom>
                {user.firstName}
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ color: '#143C7D' }}
              >
                Last Name
              </Typography>
              <Typography variant="h6" gutterBottom>
                {user.lastName}
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ color: '#143C7D' }}
              >
                Email
              </Typography>
              <Typography variant="h6" gutterBottom>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ color: '#143C7D' }}
              >
                Telephone
              </Typography>
              <Typography variant="h6" gutterBottom>
                {user.telephone}
              </Typography>
              <Divider />
            </Grid>
            {user.town && (
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ color: '#143C7D' }}
                >
                  Town
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {user.town}
                </Typography>
                <Divider />
              </Grid>
            )}
            <Grid item xs={6}>
              <Typography
                variant="h6"
                gutterBottom
                style={{ color: '#143C7D' }}
              >
                Date of Birth
              </Typography>
              <Typography variant="h6" gutterBottom>
                {moment(user.dateOfBirth).format('DD MMM')}
              </Typography>
              <Divider />
            </Grid>
            {user.division && (
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ color: '#143C7D' }}
                >
                  Division
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {user.division}
                </Typography>
                <Divider />
              </Grid>
            )}
            {user.service && (
              <Grid item xs={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  style={{ color: '#143C7D' }}
                >
                  Service
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {user.service}
                </Typography>
                <Divider />
              </Grid>
            )}
            {_.map(
              _.filter(
                user.customFields,
                customField =>
                  customField.name !== 'Manager UID' &&
                  customField.name !== 'Google Logo Name' &&
                  customField.name !== 'Skill',
              ),
              customField =>
                customField.displayOnProfile &&
                customField.value && (
                  <Grid item xs={6} key={customField.fieldId}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      style={{ color: '#143C7D' }}
                    >
                      {customField.name}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                      {customField.type === 'Date' ? (
                        moment(customField.value).format('DD MMM YYYY')
                      ) : customField.type === 'Link' ? (
                        <a
                          href={customField.value}
                          target="_blank"
                          rel="nofollow noopener noreferrer"
                        >
                          {customField.value}
                        </a>
                      ) : (
                        customField.value
                      )}
                    </Typography>
                    <Divider />
                  </Grid>
                ),
            )}
          </Grid>
        </CardContent>
      </Card>
      {editOpen && (
        <EditAbout
          userUid={userUid}
          open={editOpen}
          handleClose={() => setEditOpen(false)}
        />
      )}
    </>
  );
};

export default memo(GeneralInformation);

import React from 'react';
import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { NotificationAvatar } from './Wrapper';

const NotificationItemSkeleton = () => (
  <div style={{ padding: 12 }}>
    <Grid container spacing={3}>
      <Grid item>
        <Skeleton variant="circle">
          <NotificationAvatar />
        </Skeleton>
      </Grid>
      <Grid item xs>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </Grid>
    </Grid>
  </div>
);

export default NotificationItemSkeleton;

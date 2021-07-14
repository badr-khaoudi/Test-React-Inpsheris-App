import React from 'react';
import { Grid } from '@material-ui/core';

import { Skeleton } from '@material-ui/lab';

const FeedSkeleton = () => (
  <Grid container>
    <Grid item style={{ marginRight: 30 }}>
      <Skeleton variant="circle" height={60} width={60} />
      <Skeleton variant="text" height={30} />
    </Grid>
    <Grid item xs style={{ marginBottom: 30 }}>
      <Skeleton variant="rect" height={200} />
    </Grid>
  </Grid>
);

export default FeedSkeleton;

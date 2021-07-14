import React from 'react';
import { Grid } from '@material-ui/core';

import { Skeleton } from '@material-ui/lab';

const FeedSkeleton = () => (
  <Grid container>
    <Grid item xs style={{ marginBottom: 30 }}>
      <Skeleton
        variant="rect"
        height={300}
        style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
      />
    </Grid>
  </Grid>
);

export default FeedSkeleton;

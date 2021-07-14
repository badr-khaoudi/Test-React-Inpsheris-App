import React from 'react';
import { Skeleton } from '@material-ui/lab';

const FeedSkeleton = () => (
  <Skeleton
    variant="rect"
    height={300}
    style={{ borderRadius: 10, marginBottom: 24 }}
  />
);

export default FeedSkeleton;

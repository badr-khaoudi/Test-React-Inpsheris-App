import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import { Grid, CardHeader, CardContent } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CommunityItem from 'components/CommunityItem';
import { makeSelectCommunityListUser } from './selectors';

const MyCommunities = () => {
  const communityListUser = useSelector(makeSelectCommunityListUser());
  return (
    <Card variant="outlined">
      <CardHeader title="My Communities" />
      <CardContent>
        <Grid container spacing={2}>
          {_.map(communityListUser, community => (
            <CommunityItem key={community.uid} community={community} />
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default memo(MyCommunities);

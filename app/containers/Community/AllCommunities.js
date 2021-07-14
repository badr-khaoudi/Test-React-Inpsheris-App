/**
 *
 * AllCommunities
 *
 */

import React from 'react';
import _ from 'lodash';
import { Grid, Typography } from '@material-ui/core';

import CommunityItems from './CommunityItems';

const AllCommunities = (communityGroup, list) =>
  !_.isEmpty(list) && (
    <React.Fragment key={communityGroup.uid}>
      <Grid container spacing={3}>
        <Grid item>
          <Typography variant="h5">{communityGroup.groupName}</Typography>
        </Grid>
      </Grid>
      {CommunityItems(list)}
    </React.Fragment>
  );

export default AllCommunities;

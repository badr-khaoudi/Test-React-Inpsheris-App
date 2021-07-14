/**
 *
 * Communities
 *
 */

import React from 'react';
import _ from 'lodash';
import { Grid, Typography } from '@material-ui/core';

import CommunityItems from './CommunityItems';

const Communities = (communityGroup, list) => (
  <React.Fragment key={communityGroup.uid}>
    <Grid container spacing={3}>
      <Grid item>
        <Typography variant="h5">{communityGroup.groupName}</Typography>
      </Grid>
    </Grid>
    {!_.isEmpty(list) ? (
      CommunityItems(list)
    ) : (
      <Grid container spacing={3}>
        <Grid item>
          <Typography variant="h5" color="error">
            Empty
          </Typography>
        </Grid>
      </Grid>
    )}
  </React.Fragment>
);

export default Communities;

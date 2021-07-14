/**
 *
 * AllCommunitiesModal
 *
 */

import React from 'react';
import _ from 'lodash';
import { Grid, Typography } from '@material-ui/core';
import CommunityModalItems from './CommunityModalItems';

const AllCommunitiesModal = (communityGroup, list, activeAnchor) =>
  !_.isEmpty(list) && (
    <React.Fragment key={communityGroup.uid}>
      <Grid container spacing={3}>
        <Grid item>
          <Typography variant="h5" color="inherit">
            {communityGroup.groupName}
          </Typography>
        </Grid>
      </Grid>
      {CommunityModalItems(list, activeAnchor)}
    </React.Fragment>
  );

export default AllCommunitiesModal;

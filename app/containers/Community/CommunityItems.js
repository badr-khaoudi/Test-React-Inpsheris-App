/**
 *
 * CommunityItems
 *
 */

import React from 'react';
import _ from 'lodash';
import { Grid } from '@material-ui/core';

import CommunityItem from '../../components/CommunityItem';

const CommunityItems = list => (
  <Grid container spacing={5} style={{ marginBottom: 10 }}>
    {_.map(list, item => (
      <CommunityItem key={item.uid} community={item} />
    ))}
  </Grid>
);

export default CommunityItems;

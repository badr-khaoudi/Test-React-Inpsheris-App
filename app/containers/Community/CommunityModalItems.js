/**
 *
 * CommunityModalItems
 *
 */

import React from 'react';
import _ from 'lodash';
import { Grid } from '@material-ui/core';

import CommunityModalItem from '../../components/CommunityItem/modalItem';

const CommunityModalItems = (list, activeAnchor) => (
  <Grid container spacing={5} style={{ marginBottom: 10 }}>
    {_.map(list, item => (
      <CommunityModalItem
        key={item.uid}
        community={item}
        activeAnchor={activeAnchor}
      />
    ))}
  </Grid>
);

export default CommunityModalItems;

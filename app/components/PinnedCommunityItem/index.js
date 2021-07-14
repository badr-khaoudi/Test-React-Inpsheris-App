/**
 *
 * PinnedCommunityItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';

import { PinnedCommunityItemContainer, ImageGrid } from './wrapper';
import CustomListItem from './customListItem';

function PinnedCommunityItem({ data }) {
  return (
    <PinnedCommunityItemContainer>
      <Grid container spacing={6} alignItems="center">
        <Grid item sm={12} md={4} lg={4}>
          <ImageGrid>
            <img
              className="swiper-lazy"
              alt={data.title}
              data-src={data.community.headerLogoUrl}
            />

            <div className="swiper-lazy-preloader swiper-lazy-preloader-white">
              <CircularProgress />
            </div>
          </ImageGrid>
        </Grid>
        <Grid item sm={12} md={8} lg={8}>
          <List component="nav" aria-label="main mailbox folders">
            {data.contents &&
              data.contents.map(item => (
                <CustomListItem key={item.uid} item={item} title={data.title} />
              ))}
          </List>
        </Grid>
      </Grid>
    </PinnedCommunityItemContainer>
  );
}

PinnedCommunityItem.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PinnedCommunityItem;

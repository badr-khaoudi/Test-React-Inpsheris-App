/**
 *
 * LinkGallery
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import SwiperCore, { Navigation, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import LinkBlock from './LinkBlock';

SwiperCore.use([Navigation, Virtual]);

function LinkGallery({ links }) {
  if (_.size(links) > 2) {
    return (
      <Swiper
        spaceBetween={30}
        slidesPerView={2}
        navigation
        virtual
        watchSlidesVisibility
        style={{ padding: '0 15px' }}
      >
        {_.map(links, (link, index) => (
          <SwiperSlide virtualIndex={index} key={index}>
            {({ isVisible }) => <LinkBlock link={link} isVisible={isVisible} />}
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
  return (
    <Grid
      container
      justify="center"
      style={{ width: 'calc(100% + 30px)', margin: -15, padding: '0 15px' }}
    >
      {_.map(links, (link, index) => (
        <Grid item xs={6} key={index} style={{ padding: 15 }}>
          <LinkBlock link={link} isVisible />
        </Grid>
      ))}
    </Grid>
  );
}

LinkGallery.propTypes = {
  links: PropTypes.array,
};

export default memo(LinkGallery);

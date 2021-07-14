/**
 *
 * LinkGallery
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import LinesEllipsis from 'react-lines-ellipsis';
import { Grid, Typography } from '@material-ui/core';
import SwiperCore, { Navigation, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { LinkImage } from './Wrapper';

SwiperCore.use([Navigation, Virtual]);

const LinkItem = ({ link }) => (
  <a href={link.path} target="_blank" rel="nofollow noopener noreferrer">
    <Grid container spacing={2} style={{ paddingBottom: 60 }}>
      <Grid item xs={4}>
        <LinkImage
          thumbnail_url={link.thumbnail_url}
          style={{ borderRadius: 3 }}
        />
      </Grid>
      <Grid item xs={8}>
        <LinesEllipsis
          text={link.description}
          maxLine={3}
          style={{ color: '#2D2D2D', wordBreak: 'break-all' }}
          className="MuiTypography-root MuiTypography-h6 MuiTypography-gutterBottom"
        />
        <Grid container alignItems="center" wrap="nowrap">
          {link.favicon && (
            <img
              src={link.favicon}
              alt={link.title}
              height={20}
              width={20}
              style={{ marginRight: 5 }}
            />
          )}
          <Typography varient="body1" style={{ color: '#BCBCBC' }} noWrap>
            {link.path}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  </a>
);

LinkItem.propTypes = { link: PropTypes.object };

const LinkGallery = ({ links }) => {
  if (_.size(links) > 2) {
    return (
      <Swiper
        spaceBetween={30}
        slidesPerView={2}
        navigation
        virtual
        style={{ padding: '0 25px' }}
      >
        {_.map(links, (link, index) => (
          <SwiperSlide virtualIndex={index} key={index}>
            <LinkItem link={link} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
  return (
    <Grid
      container
      justify="center"
      style={{ width: 'calc(100% + 30px)', margin: -15, padding: '0 25px' }}
    >
      {_.map(links, (link, index) => (
        <Grid item xs={6} key={index} style={{ padding: 15 }}>
          <LinkItem link={link} />
        </Grid>
      ))}
    </Grid>
  );
};

LinkGallery.propTypes = { links: PropTypes.array };

export default memo(LinkGallery);

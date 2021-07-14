/**
 *
 * ImageGallery
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import SwiperCore, { Navigation, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch } from 'react-redux';
import { openGallery } from 'containers/AuthBase/actions';
import { Thumbnail } from './Wrapper';

SwiperCore.use([Navigation, Virtual]);

const ImageGallery = ({ images }) => {
  const dispatch = useDispatch();
  if (_.size(images) > 3) {
    return (
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        navigation
        virtual
        style={{ padding: '0 25px' }}
      >
        {_.map(images, (image, index) => (
          <SwiperSlide virtualIndex={index} key={index}>
            <Thumbnail
              thumbnail_url={image.thumbUrl || image.thumbGalleryUrl}
              style={{ borderRadius: 15, cursor: 'pointer' }}
              onClick={e => {
                e.stopPropagation();
                dispatch(openGallery('image', index, images));
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
  if (_.size(images) === 1) {
    const image = _.head(images);
    return (
      <Thumbnail
        thumbnail_url={image.thumbUrl || image.thumbGalleryUrl || image}
        count={1}
        style={{
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          cursor: 'pointer',
        }}
        onClick={e => {
          e.stopPropagation();
          dispatch(openGallery('image', 0, images));
        }}
      />
    );
  }
  return (
    <Grid
      container
      justify="center"
      style={{ width: 'calc(100% + 30px)', margin: -15, padding: '0 25px' }}
    >
      {_.map(images, (image, index) => (
        <Grid item xs={4} key={index} style={{ padding: 15 }}>
          <Thumbnail
            thumbnail_url={
              image.path || image.thumbUrl || image.thumbGalleryUrl
            }
            style={{ borderRadius: 15, cursor: 'pointer' }}
            onClick={e => {
              e.stopPropagation();
              dispatch(openGallery('image', index, images));
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

ImageGallery.propTypes = { images: PropTypes.array };

export default memo(ImageGallery);

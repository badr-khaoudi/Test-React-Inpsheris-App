/**
 *
 * VideoGallery
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
import { Thumbnail, PlayCircle } from './Wrapper';

SwiperCore.use([Navigation, Virtual]);

function VideoGallery({ videos }) {
  const dispatch = useDispatch();
  if (_.size(videos) > 3) {
    return (
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        navigation
        virtual
        style={{ padding: '0 15px' }}
      >
        {_.map(videos, (video, index) => (
          <SwiperSlide virtualIndex={index} key={index}>
            <Thumbnail
              $background_image={video.thumbUrl || video.thumbGalleryUrl}
              onClick={e => {
                e.stopPropagation();
                dispatch(openGallery('video', index, videos));
              }}
            >
              <PlayCircle />
            </Thumbnail>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
  if (_.size(videos) === 1) {
    const video = _.head(videos);
    return (
      <Thumbnail
        $background_image={video.thumbUrl || video.thumbGalleryUrl}
        $count={1}
        onClick={e => {
          e.stopPropagation();
          dispatch(openGallery('video', 0, videos));
        }}
      >
        <PlayCircle />
      </Thumbnail>
    );
  }
  return (
    <Grid
      container
      justify="center"
      style={{ width: 'calc(100% + 30px)', margin: -15, padding: '0 15px' }}
    >
      {_.map(videos, (video, index) => (
        <Grid item xs={4} key={index} style={{ padding: 15 }}>
          <Thumbnail
            $background_image={video.thumbUrl || video.thumbGalleryUrl}
            onClick={e => {
              e.stopPropagation();
              dispatch(openGallery('video', index, videos));
            }}
          >
            <PlayCircle />
          </Thumbnail>
        </Grid>
      ))}
    </Grid>
  );
}

VideoGallery.propTypes = {
  videos: PropTypes.array,
};

export default memo(VideoGallery);

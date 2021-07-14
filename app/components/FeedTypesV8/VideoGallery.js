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
import { Thumbnail, Play } from './Wrapper';

SwiperCore.use([Navigation, Virtual]);

const Video = ({ video, onClick, ...props }) => (
  <Thumbnail
    thumbnail_url={video.thumbUrl || video.thumbGalleryUrl}
    onClick={onClick}
    {...props}
  >
    <Play color="inherit" fontSize="large" />
  </Thumbnail>
);

Video.propTypes = { video: PropTypes.object, onClick: PropTypes.func };

const VideoGallery = ({ videos }) => {
  const dispatch = useDispatch();
  if (_.size(videos) > 3) {
    return (
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        navigation
        virtual
        style={{ padding: '0 25px' }}
      >
        {_.map(videos, (video, index) => (
          <SwiperSlide virtualIndex={index} key={index}>
            <Video
              video={video}
              style={{ borderRadius: 15, cursor: 'pointer' }}
              onClick={e => {
                e.stopPropagation();
                dispatch(openGallery('video', index, videos));
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    );
  }
  if (_.size(videos) === 1) {
    const video = _.head(videos);
    return (
      <Video
        video={video}
        count={1}
        style={{
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          cursor: 'pointer',
        }}
        onClick={e => {
          e.stopPropagation();
          dispatch(openGallery('video', 0, videos));
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
      {_.map(videos, (video, index) => (
        <Grid item xs={4} key={index} style={{ padding: 15 }}>
          <Video
            video={video}
            style={{ borderRadius: 15, cursor: 'pointer' }}
            onClick={e => {
              e.stopPropagation();
              dispatch(openGallery('video', index, videos));
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

VideoGallery.propTypes = { videos: PropTypes.array };

export default memo(VideoGallery);

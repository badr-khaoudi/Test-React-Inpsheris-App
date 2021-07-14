/**
 *
 * VideoGallery
 *
 */

import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Typography } from '@material-ui/core';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import SwiperCore, { Navigation, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch } from 'react-redux';
import { openGallery } from 'containers/AuthBase/actions';
import { Thumbnail, PlayCircle } from 'components/FeedBlocksP2V8/Wrapper';
import { OutlinedIconButton } from 'utils/helpers/iconButton';
import { WidgetCard, WidgetContainer, WidgetContent } from './Wrapper';

SwiperCore.use([Navigation, Virtual]);

function VideoGallery({ title, videoGallery }) {
  const dispatch = useDispatch();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <WidgetCard>
      <WidgetContainer>
        <WidgetContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h6">{title}</Typography>
                </Grid>
                <Grid item style={{ flexShrink: 0 }}>
                  <OutlinedIconButton
                    size="small"
                    style={{ marginRight: 8 }}
                    ref={prevRef}
                  >
                    <ArrowLeft />
                  </OutlinedIconButton>
                  <OutlinedIconButton size="small" ref={nextRef}>
                    <ArrowRight />
                  </OutlinedIconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Swiper
                spaceBetween={30}
                slidesPerView={3}
                navigation={{
                  nextEl: nextRef.current,
                  prevEl: prevRef.current,
                  disabledClass: 'Mui-disabled',
                }}
                onBeforeInit={swiper => {
                  // eslint-disable-next-line no-param-reassign
                  swiper.params.navigation.nextEl = nextRef.current;
                  // eslint-disable-next-line no-param-reassign
                  swiper.params.navigation.prevEl = prevRef.current;
                }}
                virtual
              >
                {_.map(videoGallery, (video, index) => (
                  <SwiperSlide virtualIndex={index} key={index}>
                    <Thumbnail
                      $background_image={
                        video.thumbUrl || video.thumbGalleryUrl
                      }
                      onClick={e => {
                        e.stopPropagation();
                        dispatch(openGallery('video', index, videoGallery));
                      }}
                    >
                      <PlayCircle />
                    </Thumbnail>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
          </Grid>
        </WidgetContent>
      </WidgetContainer>
    </WidgetCard>
  );
}

VideoGallery.propTypes = {
  title: PropTypes.string,
  videoGallery: PropTypes.array,
};

export default memo(VideoGallery);

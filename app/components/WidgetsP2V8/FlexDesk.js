/**
 *
 * FlexDesk
 *
 */

import React, { memo, useRef } from 'react';
// import PropTypes from 'prop-types';
import _ from 'lodash';
import { Grid, Typography } from '@material-ui/core';
import { ArrowLeft, ArrowRight } from '@material-ui/icons';
import SwiperCore, { Navigation, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { RoundedBox } from 'components/FeedBlocksP2V8/Wrapper';
import Link from 'utils/helpers/Link';
import DateTime from 'utils/helpers/dateTime';
import { OutlinedIconButton } from 'utils/helpers/iconButton';
import FlexDeskIcon from 'components/Icons/FlexDesk';
import {
  WidgetCard,
  WidgetContainer,
  WidgetContent,
  WidgetAvatar,
} from './Wrapper';

SwiperCore.use([Navigation, Virtual]);

function FlexDesk() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <WidgetCard>
      <WidgetContainer>
        <WidgetContent>
          <Grid container spacing={2} justify="flex-end">
            <Grid item xs={12}>
              <Grid
                container
                justify="space-between"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <WidgetAvatar $spacing={6}>
                    <FlexDeskIcon />
                  </WidgetAvatar>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6">Lively FlexDesk</Typography>
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
                slidesPerView={1}
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
                {_.map(_.range(4), (video, index) => (
                  <SwiperSlide virtualIndex={index} key={index}>
                    <Grid container spacing={2} wrap="nowrap">
                      <Grid item xs={6}>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <Typography variant="h6">
                              Bureau 6, Espace coworking, Etage 4
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography component="span">
                              <Typography variant="h5" display="inline">
                                24
                              </Typography>{' '}
                              Septembre
                            </Typography>
                          </Grid>
                          <Grid item>
                            <DateTime />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography color="textSecondary">
                              J&apos;ai réservé 2 bureaux Bureaux disponibles: 6
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={6}>
                        <RoundedBox style={{ width: '100%', height: '100%' }} />
                      </Grid>
                    </Grid>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
            <Grid item>
              <Link color="textSecondary" underline="always" to="/">
                View Other Bookings
              </Link>
            </Grid>
          </Grid>
        </WidgetContent>
      </WidgetContainer>
    </WidgetCard>
  );
}

FlexDesk.propTypes = {};

export default memo(FlexDesk);

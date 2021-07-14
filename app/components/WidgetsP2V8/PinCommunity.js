/**
 *
 * PinCommunity
 *
 */

import React, { memo, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import LazyLoad from 'react-lazyload';
import { Grid, Typography } from '@material-ui/core';
import LinesEllipsis from 'react-lines-ellipsis';
import responsiveHOC from 'react-lines-ellipsis/lib/responsiveHOC';
import IconButton from '@material-ui/core/IconButton';
import { Settings, ArrowLeft, ArrowRight } from '@material-ui/icons';
import SwiperCore, { Navigation, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbnail } from 'components/FeedBlocksP2V8/Wrapper';
import { makeSelectPinnedCommunityList } from 'containers/HomePage/selectors';
import FeedSkeleton from 'components/FeedP2V8/FeedSkeleton';
import { OutlinedIconButton } from 'utils/helpers/iconButton';
import TypographyPrimary from 'utils/helpers/textPrimary';
import {
  WidgetCard,
  WidgetContainer,
  WidgetTitle,
  WidgetContent,
} from './Wrapper';

SwiperCore.use([Navigation, Virtual]);

const ResponsiveLinesEllipsis = responsiveHOC()(LinesEllipsis);

const FeedItem = ({ content, isVisible }) => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!isVisible || visible) {
      return;
    }
    setVisible(isVisible);
  }, [isVisible]);
  return (
    <Link
      to={{
        pathname: `/community/${encodeURIComponent(content.community.label)}/${
          content.community.uid
        }/${content.communityTab.uid}/${content.uid}/viewdetail/HP`,
        state: { background: location },
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <Thumbnail $background_image={undefined} />
        </Grid>
        <Grid item xs={8}>
          {visible && (
            <ResponsiveLinesEllipsis
              text={content.title}
              maxLine={4}
              basedOn="letters"
              component={TypographyPrimary}
            />
          )}
        </Grid>
      </Grid>
    </Link>
  );
};

FeedItem.propTypes = {
  content: PropTypes.object,
  isVisible: PropTypes.bool,
};

function PinCommunity() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const pinnedCommunityList = useSelector(makeSelectPinnedCommunityList());

  return (
    <LazyLoad
      offset={700}
      placeholder={<FeedSkeleton />}
      debounce
      once
      style={{
        marginBottom: 24,
      }}
    >
      <WidgetCard>
        <WidgetContainer>
          <WidgetTitle>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h6">Communautés épinglées</Typography>
              </Grid>
              <Grid item style={{ flexShrink: 0 }}>
                <IconButton size="small" style={{ marginRight: 8 }}>
                  <Settings />
                </IconButton>
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
          </WidgetTitle>
          <WidgetContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Swiper
                  spaceBetween={30}
                  slidesPerView={2}
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
                  watchSlidesVisibility
                >
                  {_.map(pinnedCommunityList, (pinCommunity, index) => (
                    <SwiperSlide virtualIndex={index} key={index}>
                      {({ isVisible }) => (
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography
                              component={Link}
                              to={`/community/${encodeURIComponent(
                                pinCommunity.community.label,
                              )}/${pinCommunity.community.uid}`}
                              variant="h6"
                              color="textPrimary"
                            >
                              {pinCommunity.title}
                            </Typography>
                          </Grid>
                          {_.map(pinCommunity.contents, content => (
                            <Grid item xs={12} key={content.uid}>
                              <FeedItem
                                content={content}
                                isVisible={isVisible}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Grid>
            </Grid>
          </WidgetContent>
        </WidgetContainer>
      </WidgetCard>
    </LazyLoad>
  );
}

PinCommunity.propTypes = {};

export default memo(PinCommunity);

/**
 *
 * SocialWall
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import SwiperCore, { Navigation, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import {
  DialogContent,
  AppBar,
  Toolbar,
  Grid,
  Typography,
  Link,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import { Close, ArrowLeft, ArrowRight } from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { closeSocialWall } from 'containers/AuthBase/actions';
import { ChipButton } from 'containers/HomeFeed/Wrapper';
import { OutlinedIconButton } from 'utils/helpers/iconButton';
import { WidgetIcons } from 'components/Icons';
import { makeSelectWidgetList, makeSelectWidgetListLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { widgetList as widgetListAction } from './actions';
import './swiper.scss';
import Twitter from './Twitter';
import LinkedIn from './LinkedIn';
import Dailymotion from './Dailymotion';
import Youtube from './Youtube';
import Instagram from './Instagram';

SwiperCore.use([Navigation, Mousewheel]);

export function SocialWall(props) {
  useInjectReducer({ key: 'socialWall', reducer });
  useInjectSaga({ key: 'socialWall', saga });

  const {
    dispatchWidgetList,
    widgetList,
    widgetListLoading,
    dispatchCloseSocialWall,
  } = props;

  useEffect(() => {
    dispatchWidgetList({ displayOption: 'SocialWall' });
  }, []);

  const [swiper, setSwiper] = useState(null);
  const [widgetItem, setWidgetItem] = useState({});

  useEffect(() => {
    if (!_.isEmpty(widgetList)) {
      setWidgetItem(_.head(widgetList));
    }
  }, [widgetList]);

  const handleSwiperSlideClick = (index, widget) => {
    swiper.slideTo(index);
    setWidgetItem(widget);
  };

  return (
    <Dialog
      open
      onClose={dispatchCloseSocialWall}
      keepMounted={false}
      fullWidth
      maxWidth="md"
      disableEnforceFocus
    >
      <AppBar position="static" color="secondary" elevation={0}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Social Wall
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            onClick={dispatchCloseSocialWall}
          >
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className="widget-swiper-container">
        {widgetListLoading && (
          <div style={{ padding: '12px 8px' }} className="skeleton-container">
            <Grid container spacing={2}>
              {_.map(_.range(4), index => (
                <Grid item xs={3} key={index}>
                  <Skeleton
                    variant="rect"
                    width="100%"
                    height={36}
                    style={{ borderRadius: 25 }}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        )}
        {!_.isEmpty(widgetList) && (
          <>
            <OutlinedIconButton size="small" className="social-wall-prev">
              <ArrowLeft />
            </OutlinedIconButton>
            <OutlinedIconButton size="small" className="social-wall-next">
              <ArrowRight />
            </OutlinedIconButton>
            <Swiper
              spaceBetween={16}
              slidesPerView="auto"
              freeMode
              mousewheel
              watchOverflow
              simulateTouch={false}
              navigation={{
                nextEl: '.social-wall-next',
                prevEl: '.social-wall-prev',
                disabledClass: 'Mui-disabled',
              }}
              onSwiper={setSwiper}
              // slideToClickedSlide
            >
              {_.map(widgetList, (widget, index) => (
                <SwiperSlide virtualIndex={index} key={index}>
                  <ChipButton
                    variant="outlined"
                    startIcon={<WidgetIcons type={widget.type} />}
                    color={
                      widget.uid === widgetItem.uid ? 'secondary' : 'default'
                    }
                    onClick={() => handleSwiperSlideClick(index, widget)}
                  >
                    {widget.title}
                  </ChipButton>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
      <DialogContent>
        {widgetItem.type === 'Twitter' && (
          <Grid container spacing={2} justify="flex-end">
            {_.map(widgetItem.twitterData.tweets, tweet => (
              <Grid item xs={12} key={tweet.id}>
                <Twitter tweet={tweet} />
              </Grid>
            ))}
            <Grid item>
              <Link
                href={`https://twitter.com/${
                  widgetItem.twitterData.screenName
                }`}
                target="_blank"
                underline="always"
                color="secondary"
              >
                Voir sur Twitter
              </Link>
            </Grid>
          </Grid>
        )}
        {widgetItem.type === 'LinkedIn' && (
          <Grid container spacing={2} justify="flex-end">
            {_.map(widgetItem.linkedInData.feeds, feed => (
              <Grid item xs={12} key={feed.id}>
                <LinkedIn feed={feed} />
              </Grid>
            ))}
            <Grid item>
              <Link
                href={widgetItem.linkedInData.companyUrl}
                target="_blank"
                underline="always"
                color="secondary"
              >
                Voir sur LinkedIn
              </Link>
            </Grid>
          </Grid>
        )}
        {widgetItem.type === 'Dailymotion' && (
          <Grid container spacing={2} justify="flex-end">
            {_.map(widgetItem.dailymotionData.videos, video => (
              <Grid item xs={12} key={video.id}>
                <Dailymotion video={video} />
              </Grid>
            ))}
            <Grid item>
              <Link
                href={widgetItem.dailymotionData.url}
                target="_blank"
                underline="always"
                color="secondary"
              >
                Voir sur Dailymotion
              </Link>
            </Grid>
          </Grid>
        )}
        {widgetItem.type === 'Youtube' && (
          <Grid container spacing={2} justify="flex-end">
            {_.map(widgetItem.youtubeData.videos, video => (
              <Grid item xs={12} key={video.id.videoId}>
                <Youtube video={video} />
              </Grid>
            ))}
            <Grid item>
              <Link
                href={`https://www.youtube.com/channel/${
                  widgetItem.youtubeData.channelId
                }`}
                target="_blank"
                underline="always"
                color="secondary"
              >
                Voir sur Youtube
              </Link>
            </Grid>
          </Grid>
        )}
        {widgetItem.type === 'Instagram' && (
          <Grid container spacing={2}>
            {_.map(widgetItem.instagramData.posts, post => (
              <Grid item xs={4} key={post.id}>
                <Instagram post={post} />
              </Grid>
            ))}
            <Grid item xs={12} style={{ textAlign: 'right' }}>
              <Link
                href={widgetItem.instagramData.url}
                target="_blank"
                underline="always"
                color="secondary"
              >
                Voir sur Instagram
              </Link>
            </Grid>
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
}

SocialWall.propTypes = {
  dispatchWidgetList: PropTypes.func,
  widgetList: PropTypes.array,
  widgetListLoading: PropTypes.bool,
  dispatchCloseSocialWall: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  widgetList: makeSelectWidgetList(),
  widgetListLoading: makeSelectWidgetListLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchWidgetList: options => dispatch(widgetListAction(options)),
    dispatchCloseSocialWall: () => dispatch(closeSocialWall()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SocialWall);

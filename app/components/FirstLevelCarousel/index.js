/**
 *
 * FirstLevelCarousel
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Tooltip } from '@material-ui/core';

import SwiperCore, { Pagination, Autoplay, Lazy } from 'swiper';
import { SwiperSlide } from 'swiper/react';

import CircularProgress from '@material-ui/core/CircularProgress';

import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/lazy/lazy.scss';

import {
  CustomSwiperContainer,
  CustomSwiper,
  CarouselItem,
  CarouselLegend,
  CarouselTitle,
  CarouselSubTitle,
  // CarouselVideoThumbnail,
  CarouselImage,
  CarouselVideo,
  CarouselCaptionContainer,
} from './wrapper'; // requires a loader

SwiperCore.use([Pagination, Autoplay, Lazy]);

function FirstLevelCarousel({ list }) {
  const [titleTooltipOpen, setTitleTooltipOpen] = useState(false);
  const [subTitleTooltipOpen, setSubTitleTooltipOpen] = useState(false);

  const maxTitleLength = 25;
  const maxSubTitleLength = 70;

  const handleTitleTooltipOpen = () => {
    setTitleTooltipOpen(true);
  };

  const handleTitleTooltipClose = () => {
    setTitleTooltipOpen(false);
  };

  const handleSubTitleTooltipOpen = () => {
    setSubTitleTooltipOpen(true);
  };

  const handleSubTitleTooltipClose = () => {
    setSubTitleTooltipOpen(false);
  };

  const handleClick = (url, openSameTab) => {
    if (url) {
      if (openSameTab) {
        window.location.replace(url);
      } else {
        window.open(url);
      }
    }
  };

  const hasShortText = (text, len) => text.length > len;

  const shortText = (text, len) =>
    hasShortText(text, len) ? `${text.substr(0, len)}...` : text;

  return (
    <CustomSwiperContainer>
      <CustomSwiper
        pagination={{ clickable: true }}
        loop
        preloadImages={false}
        autoplay={{ delay: 5000 }}
        lazy
      >
        {list.map(item => {
          switch (item.type) {
            case 'image':
              return (
                <SwiperSlide key={item.uid}>
                  <CarouselItem>
                    <CarouselImage
                      onClick={() => handleClick(item.url, item.openSameTab)}
                      className="swiper-lazy"
                      data-src={
                        item.imageLevel1
                          ? item.imageLevel1.sliderUrl
                          : item.imageLevel2
                      }
                      alt={item.title}
                    />
                    <div className="swiper-lazy-preloader swiper-lazy-preloader-white">
                      <CircularProgress />
                    </div>
                    {item.displayTitle && (
                      <CarouselCaptionContainer maxWidth="lg">
                        <CarouselLegend
                          maxWidth="lg"
                          backgroundColor={
                            item.displayBackgroundColor && item.backgroundColor
                          }
                          titleColor={item.titleColor}
                        >
                          {item.title && (
                            <Tooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              onClose={handleTitleTooltipClose}
                              open={titleTooltipOpen}
                              disableFocusListener
                              disableHoverListener
                              disableTouchListener
                              arrow
                              title={item.title}
                              aria-label={item.title}
                            >
                              <CarouselTitle
                                variant="h4"
                                onClick={
                                  titleTooltipOpen
                                    ? handleTitleTooltipClose
                                    : handleTitleTooltipOpen
                                }
                              >
                                {shortText(item.title, maxTitleLength)}
                              </CarouselTitle>
                            </Tooltip>
                          )}
                          {item.subTitle && (
                            <Tooltip
                              PopperProps={{
                                disablePortal: true,
                              }}
                              onClose={handleSubTitleTooltipClose}
                              arrow
                              title={item.subTitle}
                              aria-label={item.subTitle}
                              open={subTitleTooltipOpen}
                              disableFocusListener
                              disableHoverListener
                              disableTouchListener
                            >
                              <CarouselSubTitle
                                onClick={
                                  subTitleTooltipOpen
                                    ? handleSubTitleTooltipClose
                                    : handleSubTitleTooltipOpen
                                }
                              >
                                {item.subTitle &&
                                  shortText(item.subTitle, maxSubTitleLength)}
                              </CarouselSubTitle>
                            </Tooltip>
                          )}
                        </CarouselLegend>
                      </CarouselCaptionContainer>
                    )}
                  </CarouselItem>
                </SwiperSlide>
              );
            case 'video':
              return (
                <SwiperSlide
                  key={item.uid}
                  onClick={() => handleClick(item.url, item.openSameTab)}
                >
                  <CarouselItem>
                    <CarouselVideo
                      dangerouslySetInnerHTML={{
                        __html: item.embedVideo,
                      }}
                    />
                    {item.displayTitle && (
                      <CarouselTitle
                        backgroundColor={item.backgroundColor}
                        titleColor={item.titleColor}
                      >
                        {item.title}
                      </CarouselTitle>
                    )}
                  </CarouselItem>
                </SwiperSlide>
              );
            default:
              return null;
          }
        })}
      </CustomSwiper>
    </CustomSwiperContainer>
  );
}

FirstLevelCarousel.propTypes = {
  list: PropTypes.array.isRequired,
};

export default FirstLevelCarousel;

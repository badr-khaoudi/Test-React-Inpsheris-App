/**
 *
 * SecondLevelCarousel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
// Import Swiper React components
import SwiperCore, { Navigation, Pagination, Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import CircularProgress from '@material-ui/core/CircularProgress';

import documentBar from '../../images/document-bar.png';
import livelyCall from '../../images/lively-call.png';
import 'swiper/components/lazy/lazy.scss';

import { ReactComponent as AngleLeftIcon } from '../../images/svg/angle-left.svg';
import { ReactComponent as AngleRightIcon } from '../../images/svg/angle-right.svg';

import {
  SecondLevelCarouselContainer,
  CarouselItem,
  CarouselImage,
  CarouselCaptionContainer,
} from './wrapper';

SwiperCore.use([Navigation, Pagination, Lazy]);

function SecondLevelCarousel({ list }) {
  const handleClick = (url, openSameTab) => {
    if (url) {
      if (openSameTab) {
        window.location.replace(url);
      } else {
        window.open(url);
      }
    }
  };

  return (
    <SecondLevelCarouselContainer>
      <div className="second-level-carousel-prev second-level-carousel-swiper-action-buttons">
        <AngleLeftIcon />
      </div>
      <div className="second-level-carousel-next second-level-carousel-swiper-action-buttons">
        <AngleRightIcon />
      </div>
      <Swiper
        lazy={{
          loadOnTransitionStart: true,
        }}
        navigation={{
          nextEl: '.second-level-carousel-next',
          prevEl: '.second-level-carousel-prev',
        }}
        slidesPerView="auto"
        breakpoints={{
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        preloadImages={false}
      >
        {list.map(item => {
          switch (item.type) {
            case 'image':
              return (
                <SwiperSlide
                  key={item.uid}
                  onClick={() => handleClick(item.url, item.openSameTab)}
                >
                  <CarouselItem>
                    <CarouselImage
                      data-src={item.imageLevel2.sliderUrl}
                      className="swiper-lazy"
                      alt={item.title}
                    />
                    <div className="swiper-lazy-preloader swiper-lazy-preloader-white">
                      <CircularProgress
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                    {item.displayTitle && (
                      <CarouselCaptionContainer>
                        <Typography>{item.title}</Typography>
                      </CarouselCaptionContainer>
                    )}
                  </CarouselItem>
                </SwiperSlide>
              );
            case 'document-bar':
              return (
                <SwiperSlide
                  key={item.uid}
                  onClick={() => handleClick(item.url, item.openSameTab)}
                >
                  <CarouselItem>
                    <CarouselImage
                      data-src={documentBar}
                      className="swiper-lazy"
                      alt="document bar"
                    />
                    <div className="swiper-lazy-preloader swiper-lazy-preloader-white">
                      <CircularProgress
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                  </CarouselItem>
                </SwiperSlide>
              );
            case 'lively-call':
              return (
                <SwiperSlide
                  key={item.uid}
                  onClick={() => handleClick(item.url, item.openSameTab)}
                >
                  <CarouselItem>
                    <CarouselImage
                      data-src={livelyCall}
                      className="swiper-lazy"
                      alt="lively call"
                    />
                    <div className="swiper-lazy-preloader swiper-lazy-preloader-white">
                      <CircularProgress
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
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
                    <CarouselImage
                      data-src={item.thumbUrl}
                      className="swiper-lazy"
                      alt={item.title}
                    />
                    <div className="swiper-lazy-preloader swiper-lazy-preloader-white">
                      <CircularProgress
                        style={{ width: '100%', height: '100%' }}
                      />
                    </div>
                  </CarouselItem>
                </SwiperSlide>
              );
            default:
              return null;
          }
        })}
      </Swiper>
    </SecondLevelCarouselContainer>
  );
}

SecondLevelCarousel.propTypes = {
  list: PropTypes.array.isRequired,
};

export default SecondLevelCarousel;

import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ReactComponent as MaximizeIcon } from '../../images/svg/maximize.svg';

import { CarouselImage, IconContainer } from './wrapper';

export default function ImageCarouselItem({ media }) {
  const goFullScreen = e => {
    document
      .querySelectorAll(e.currentTarget.dataset.imageSelector)[0]
      .requestFullscreen();
  };

  return (
    <CarouselImage>
      <div className="swiper-lazy-preloader swiper-lazy-preloader-white">
        <CircularProgress style={{ width: '100%', height: '100%' }} />
      </div>
      <img
        className="swiper-lazy"
        id={`image-${media.uid}`}
        data-src={media.url}
        alt={media.title}
      />
      <IconContainer
        onClick={goFullScreen}
        data-image-selector={`#image-${media.uid}`}
      >
        <MaximizeIcon />
      </IconContainer>
    </CarouselImage>
  );
}

ImageCarouselItem.propTypes = {
  media: PropTypes.object.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { CarouselThumbImage } from './wrapper';

export const CarouselThumb = ({ imgSrc, title }) => (
  <CarouselThumbImage>
    <img src={imgSrc} alt={title} />
    <Typography variant="caption" className="image-title">
      {title}
    </Typography>
  </CarouselThumbImage>
);

CarouselThumb.propTypes = {
  title: PropTypes.string,
  imgSrc: PropTypes.string.isRequired,
};

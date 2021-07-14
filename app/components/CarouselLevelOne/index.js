/**
 *
 * CarouselLevelOne
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
// import styled from 'styled-components';
import { Carousel, ColorPaper } from 'containers/CreateCarousel/Wrapper';

const carouselStyles = { position: 'absolute', top: 0, left: 0 };
const carouselVideoStyles = {
  ...carouselStyles,
  backgroundColor: '#000',
  backgroundSize: 'contain',
};

function CarouselLevelOne(props) {
  const { carouselContent } = props;

  return (
    <Carousel
      style={
        carouselContent.type === 'video' ? carouselVideoStyles : carouselStyles
      }
      url={
        carouselContent.type === 'video'
          ? carouselContent.thumbUrl
          : carouselContent.imageLevel1.sliderUrl
      }
    >
      {carouselContent.displayTitle && (
        <ColorPaper
          elevation={1}
          background={
            carouselContent.displayBackgroundColor
              ? carouselContent.backgroundColor
              : '#fff'
          }
          title={
            carouselContent.displayBackgroundColor
              ? carouselContent.titleColor
              : 'unset'
          }
          style={{
            width: '90%',
            padding: 20,
            position: 'absolute',
            left: '50%',
            bottom: 0,
            transform: 'translate(-50%, 50%)',
          }}
        >
          <Typography variant="h5" align="left" noWrap gutterBottom>
            {carouselContent.title}
          </Typography>
          <Typography variant="body1" align="left" noWrap>
            {carouselContent.subTitle}
          </Typography>
        </ColorPaper>
      )}
    </Carousel>
  );
}

CarouselLevelOne.propTypes = {
  carouselContent: PropTypes.object,
};

export default memo(CarouselLevelOne);

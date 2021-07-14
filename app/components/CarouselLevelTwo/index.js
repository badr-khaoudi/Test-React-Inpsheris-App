/**
 *
 * CarouselLevelTwo
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { Thumbnail } from 'components/FeedTypes/Wrapper';

function CarouselLevelTwo(props) {
  const { carouselContent } = props;
  return (
    <Thumbnail
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: 10,
        overflow: 'hidden',
      }}
      thumbnail_url={
        carouselContent.type === 'video'
          ? carouselContent.thumbUrl
          : carouselContent.imageLevel2.sliderUrl
      }
    >
      {carouselContent.displayTitle && (
        <div
          style={{
            width: '100%',
            minHeight: '60%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: 15,
            position: 'absolute',
            left: 0,
            bottom: 0,
            background: `linear-gradient(180deg, rgba(255,0,0,0), ${
              carouselContent.displayBackgroundColor
                ? carouselContent.backgroundColor
                : 'rgba(0, 0, 0, 0.55)'
            })`,
            color: carouselContent.displayBackgroundColor
              ? carouselContent.titleColor
              : '#fff',
          }}
        >
          <Typography variant="h6" align="center" noWrap gutterBottom>
            {carouselContent.title}
          </Typography>
          <Typography variant="body1" align="center" noWrap>
            {carouselContent.subTitle}
          </Typography>
        </div>
      )}
    </Thumbnail>
  );
}

CarouselLevelTwo.propTypes = {
  carouselContent: PropTypes.object,
};

export default memo(CarouselLevelTwo);

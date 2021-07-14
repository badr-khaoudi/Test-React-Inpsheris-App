/* eslint-disable indent */
import { Typography, Container } from '@material-ui/core';
import styled from 'styled-components';
import { Swiper } from 'swiper/react';

export const CustomSwiperContainer = styled.div`
  position: relative;
`;

export const CustomSwiper = styled(Swiper)`
  &.swiper-container-horizontal.swiper-container {
    position: unset;
    overflow: unset;
  }
  &.swiper-container-horizontal > .swiper-pagination-bullets {
    ${'' /* bottom: -70px; */}
    span.swiper-pagination-bullet {
      background: transparent;
      border: 1px solid gray;
      height: 15px;
      width: 15px;
      &.swiper-pagination-bullet-active {
        background: gray;
      }
    }
  }
`;

export const CarouselItem = styled.div`
  ${({ theme }) => `
    height: calc(${theme.uiConfig.carousel.homepage.levelOne.height}px + 100px);
    max-width: ${theme.uiConfig.carousel.homepage.levelOne.width}px;
  `}
  position: relative;
  margin: 0 auto;
`;

export const CarouselLegend = styled.div`
  // transform: translateY(-65px);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 22px 68px 28px 68px;
  background-color: ${props => props.backgroundColor || 'rgb(255, 255, 255)'};
  & > * {
    color: ${props =>
      props.backgroundColor ? props.titleColor : 'rgb(0, 0, 0)'};
  }
  box-shadow: 0px 3px 12px rgba(191, 227, 253, 0.25);
`;

export const CarouselTitle = styled(Typography)`
  text-transform: uppercase;
  margin-bottom: 5px;
  cursor: pointer;
`;

export const CarouselSubTitle = styled(Typography)`
  cursor: pointer;
`;

export const CarouselVideo = styled.div`
  & > iframe {
    ${({ theme }) => `
      height: ${theme.uiConfig.carousel.homepage.levelOne.height}px;
      width: ${theme.uiConfig.carousel.homepage.levelOne.height}px !important;
    `}
  }
  background: rgb(0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CarouselImage = styled.img`
  ${({ theme }) => `
    height: ${theme.uiConfig.carousel.homepage.levelOne.height}px;
    width: ${theme.uiConfig.carousel.homepage.levelOne.width}px;
    object-fit: cover;
  `}
  cursor: pointer;
`;

export const CarouselDots = styled.ul`
  position: absolute;
  top: 5px;
  right: 0;
  margin: 10px 0;
  padding: 0;
  text-align: center;
  width: 25%;
`;

export const CarouselCaptionContainer = styled(Container)`
  position: absolute;
  bottom: 65px;
  left: 50%;
  transform: translateX(-50%);
`;

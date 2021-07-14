import styled from 'styled-components';

export const SecondLevelCarouselContainer = styled.div`
  position: relative;
  padding: 33px 57px;
  div.second-level-carousel-swiper-action-buttons {
    height: 20px;
    width: 20px;
    position: absolute;
    cursor: pointer;
    padding: 5px;
    &:hover {
      opacity: 0.8;
    }
    &.swiper-button-disabled {
      opacity: 0.35;
    }
  }
  div.second-level-carousel-prev {
    left: 15px;
    top: calc(50% - 10px);
  }
  div.second-level-carousel-next {
    right: 15px;
    top: calc(50% - 10px);
  }
`;

export const CarouselItem = styled.div`
  cursor: pointer;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  height: 0;
  padding-top: ${props =>
    `${(props.theme.uiConfig.carousel.homepage.levelTwo.height /
      props.theme.uiConfig.carousel.homepage.levelTwo.height) *
      100}%`};
`;

export const CarouselCaptionContainer = styled.div`
  position: absolute;
  height: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  background: #000000ae;
  color: white;
  padding: 5px;
  & > p {
    font-size: 14px;
  }
`;

export const CarouselImage = styled.img`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
`;

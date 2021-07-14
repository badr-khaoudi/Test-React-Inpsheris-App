import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';

export const FirstLevelCarouselSkeletonContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;
  ${({ theme }) => `
    height: calc(${theme.uiConfig.carousel.homepage.levelOne.height}px + 100px);
    max-width: ${theme.uiConfig.carousel.homepage.levelOne.width}px;
  `}
  .dots-skeleton {
    position: absolute;
    bottom: 15px;
  }
`;

export const LivelyHomeLayoutGrid = styled(Grid)`
  padding: 10px 0;
`;

export const PinnedCommunityTitle = styled(Typography)`
  margin-top: 20px;
  margin-bottom: 5px;
  text-transform: capitalize;
  display: flex;
  padding-left: 5px;
  svg {
    height: 32px;
    width: 32px;
    color: gray;
    margin-right: 5px;
  }
  span {
    text-transform: uppercase;
    font-weight: 600;
    margin-left: 5px;
    color: #143c7d;
  }
`;

export const CogIconContainer = styled.div`
  cursor: pointer;
  margin-right: 5px;
  & > svg {
    color: gray;
    opacity: 1;
    width: 20px;
    height: 20px;
  }
  &:hover {
    & > svg {
      opacity: 0.8;
    }
  }
`;

export const PinnedCommunityActionGrid = styled(Grid)`
  display: flex;
  .pinned-community-swiper-action-buttons {
    width: 15px;
    height: 15px;
    margin-left: 5px;
    color: gray;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    &.swiper-button-disabled {
      opacity: 0.35;
    }
  }
`;

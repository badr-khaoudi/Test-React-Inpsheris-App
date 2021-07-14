import styled from 'styled-components';

import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import Container from '@material-ui/core/Container';

export const LivelyMenuContentContainer = styled(Container)`
  &.maxHeight {
    ${({ theme }) => `
      max-height: calc(100vh - ${theme.uiConfig.header.height});
    `}
    min-height: 260px;
  }
  min-height: 100px;
  display: flex;
  justify-content: ${({ loading }) =>
    loading === 1 ? 'center' : 'space-between'};
  max-width: 90vw;
  width: 90vw;
  overflow-y: auto;
  flex-wrap: wrap;
`;

export const LivelyAlert = styled(Alert)`
  height: 100px;
  align-self: center;
`;

export const CustomBoxShadowCard = styled(Card)`
  box-shadow: 2px 3px 5px rgba(191, 227, 253, 0.25),
    0px -2px 13px 1px rgba(191, 227, 253, 0.25);
  margin-bottom: 20px;
  .MuiCardContent-root {
    padding: 0;
  }
`;

export const CarouselDialog = styled(Dialog)`
  .MuiPaper-root.MuiDialog-paper {
    background: rgba(51, 51, 51, 0.95);
  }
  .MuiAppBar-root {
    background: white;
  }
  .swiper-container {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    flex-grow: 1;
  }

  .swiper-container-thumbs {
    height: 150px;
    flex-grow: 0;
    flex-shrink: 0;
  }

  .swiper-slide {
    background-size: cover;
    background-position: center;
  }

  .gallery-top.swiper-container {
    height: 100vh;
    width: 100%;
  }

  .gallery-thumbs {
    background-color: #333;
    box-sizing: border-box;
    padding: 10px;
  }
  .swiper-slide:not(.swiper-slide-active) {
    overflow: hidden;
  }

  .gallery-thumbs .swiper-slide {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    display: flex;
    justify-content: center;
    width: 150px;
    padding: 10px;
    border: 2px solid #333;
    background-color: #444;
    border-radius: 6px;
    color: #fff;
    box-sizing: border-box;
    &.swiper-slide-thumb-active {
      ${({ theme }) => `
      border: 2px solid ${theme.palette.primary.light};
    `}
    }
    &:hover {
      background-color: #555;
    }
  }
`;

export const CustomContainer = styled(Container)`
  ${({ theme }) => `
  
  ${theme.breakpoints.up('lg')} {
    max-width: 1000px;
  }
  ${theme.breakpoints.up('xl')} {
    max-width: 1280px;
  }
`}
`;

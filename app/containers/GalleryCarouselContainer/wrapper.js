import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';

export const CarouselThumbImage = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  .image-title {
    color: #fff;
  }
  img {
    width: auto;
    max-height: calc(100% - 30px);
  }
  @media (max-width: 420px) {
    .image-title {
      display: none;
    }
  }
`;

export const CarouselImage = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  img {
    width: auto;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }
`;

export const CarouselVideo = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  justify-content: center;
  img {
    width: auto;
    height: 100%;
  }
  .embedly-embed {
    height: 100%;
  }
`;

export const IconContainer = styled.div`
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 500;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px;
  &:active {
    transform: scale(1.2);
  }
  svg {
    width: 20px;
    height: 20px;
    color: white;
  }
`;

export const DownloadButton = styled(IconButton)`
  svg {
    width: 20px;
    height: 20px;
  }
  margin: 0 10px;
`;

export const CustomListItemIcon = styled(ListItemIcon)`
  svg {
    width: 25px;
    height: 25px;
  }
`;

export const SwiperFractionedPagination = styled.div`
  &.swiper-pagination-fraction {
    width: 100px;
  }
  text-align: center;
  padding: 20px 0;
  color: rgba(0, 0, 0, 0.87);
`;

export const CustomToolbar = styled(Toolbar)`
  flex-wrap: wrap;
  .MuiTypography-h6 {
    flex: 1;
  }
  @media (max-width: 768px) {
    align-items: center;
    justify-content: center;
    .MuiTypography-h6 {
      flex: auto;
    }
  }
`;

export const IframePreview = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
  .backdrop-iframe {
    z-index: 1;
    color: white;
    svg {
      height: 50px;
      width: 50px;
    }
  }
`;

export const DocumentContainer = styled.div`
  position: relative;
  height: 100%;
  .lively-document {
    height: 100%;
    .react-pdf__message {
      height: 100%;
      color: #fff;
    }
  }
  .lively-document-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90%;
    overflow-y: scroll;
  }
  .react-pdf__Page__canvas {
    position: absolute;
    top: 0;
  }
`;

export const ControllerGrid = styled(Grid)`
  position: fixed;
  bottom: 0;
  height: 10%;
  .grid-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const PageNumberInput = styled.input`
  -webkit-appearance: none;
  margin: 0 10px;
  -moz-appearance: textfield;
  width: 25px;
  border: 2px solid black;
`;

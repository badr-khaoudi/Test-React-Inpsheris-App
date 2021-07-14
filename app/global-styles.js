import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    overflow-x: hidden;
  }

  #app {
    background: #F8F9FB;
    min-height: 100%;
    min-width: 100%;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  .emoji-mart-category .emoji-mart-emoji:hover:before {
    content: none !important;
  }

  .swiper-lazy-loading {
    display: none !important;
  }
  .swiper-lazy-preloader {
    border-color: transparent !important;
  }
  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
  .sortableHelper {
    z-index: 1301;
 }

  .picker-dialog-bg {
    z-index: 1301 !important;
  }

  .picker-dialog {
    z-index: 1302 !important;
  }
`;

export default GlobalStyle;

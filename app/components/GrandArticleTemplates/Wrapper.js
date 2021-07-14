import styled from 'styled-components';
import { Link } from 'react-scroll';

const Parallax = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  background: rgba(0, 0, 0, 0.1);
  background-image: ${props =>
    props.$background_image ? `url(${props.$background_image})` : 'none'};
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  &.boxShadow {
    &:before {
      content: '';
      position: absolute;
      top: -10px;
      left: 0;
      display: block;
      height: 10px;
      width: 100%;
      box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.4);
      z-index: 1;
    }
  }
`;

const Heading = styled.div`
  background: rgba(51, 51, 63, 0.65);
  color: #ffffff;
  width: 100%;
  padding: 24px;
`;

const Menu = styled.div`
  width: 100%;
  background: #000000;
  color: #ffffff;
`;

const MenuHeading = styled.div`
  padding: 12px;
  border-bottom: 1px solid #ffffff;
  overflow-wrap: break-word;
`;

const MenuList = styled.nav`
  padding: 0 12px;
  max-height: calc(100vh - 400px);
  overflow: hidden;
`;

const MenuItem = styled(Link)`
  display: block;
  padding: 6px 0;
  &:hover,
  &.active {
    color: rgba(255, 255, 255, 0.8);
  }
  &.active {
    &:before {
      content: '\\25B6';
      display: inline;
      margin-right: 6px;
    }
  }
  &:not(:last-of-type) {
    border-bottom: 1px solid #ffffff;
  }
`;

const FullPageHeading = styled.div`
  height: calc(100vh - 70px);
  width: 100%;
  position: relative;
  overflow: hidden;
`;

const PageTitle = styled.div`
  color: #000000;
  background: rgba(255, 255, 255, 0.8);
  padding: 12px 24px;
  padding-left: 224px;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 30vw;
`;

const PageSubTitle = styled.div`
  color: rgba(255, 255, 255, 0.8);
  background: rgba(0, 0, 0, 0.9);
  padding: 12px 24px;
  position: absolute;
  top: 80px;
  left: 200px;
  min-width: 40vw;
`;

const FullMenu = styled.div`
  width: 200px;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0)
  );
  color: #ffffff;
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 24px;
  padding-bottom: 30%;
  ${MenuList} {
    background: #000000;
    padding: 0;
  }
  ${MenuItem} {
    padding: 6px 12px;
  }
`;

const DarkMenu = styled.div`
  height: calc(100vh - 75px);
  width: 100%;
  background: #000000;
  ${MenuHeading} {
    color: #ffffff;
    border: none;
  }
`;

const DarkMenuItem = styled(Link)`
  display: block;
  position: relative;
  padding: 6px 12px;
  color: rgba(255, 255, 255, 0.4);
  &:hover,
  &.active {
    color: rgba(255, 255, 255, 0.9);
  }
  &.active {
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 0px;
      height: 0px;
      top: 0px;
      left: 200px;
      width: 0px;
      height: 0px;
      border-top: 22px solid transparent;
      border-bottom: 22px solid transparent;
      border-left: 22px solid #000000;
    }
  }
`;

export {
  Parallax,
  Heading,
  Menu,
  MenuHeading,
  MenuList,
  MenuItem,
  FullPageHeading,
  PageTitle,
  PageSubTitle,
  FullMenu,
  DarkMenu,
  DarkMenuItem,
};

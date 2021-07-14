import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import ButtonBase from '@material-ui/core/ButtonBase';
import ListItemIcon from '@material-ui/core/ListItemIcon';

export const LivelyRightMenuItem = styled(ButtonBase)`
  ${({ theme }) => `
    color: black;
    max-width: 30px;
    position: relative;
    min-width: 30px;
    height: ${theme.uiConfig.header.height}px;
    cursor: pointer;
    &:hover {
      color: ${theme.palette.primary.main};
    }
    &.variant-small svg {
      height: 15px;
    }
    &:focus {
      border: 3px solid ${theme.palette.grey[200]};
      border-top-width: 5px;
    }
  `}
`;

export const LivelyNavLink = styled(NavLink)`
  ${({ theme }) => `
    padding: 23px 20px 23px 20px;
    color: black;
    display: flex;
    align-items: center;
    border-bottom: 5px solid transparent;
    &.active {
      border-bottom-color: ${theme.palette.primary.main};
      color: ${theme.palette.primary.main};
      fill: ${theme.palette.primary.main};
    }
    &:hover {
      fill: ${theme.palette.primary.main};
      color: ${theme.palette.primary.main};
    }
    > svg {
      height: 17px;
      width: 17px;
      margin-right: 5px;
      margin-top: -5px;
    }
    &.variant-small {
      padding-top: 27px;
      padding-bottom: 27px;
      font-size: 0.7rem;
      border-bottom-width: 3px;
    }
    &.variant-small svg {
      height: 15px;
    }
  `}
`;

export const LivelyDropLink = styled(NavLink)`
  ${({ theme }) => `
  color: ${theme.palette.text.primary}
`}
`;

export const LivelyAppBar = styled(AppBar)`
  background: white;
`;

export const LivelyHeaderLogo = styled.img`
  max-width: 92px;
`;

export const LivelyHamburgerIconContainer = styled(LivelyRightMenuItem)`
  max-width: 25px;
  min-width: 25px;
  &:focus {
    border: none;
  }
`;

export const LivelyListItemIcon = styled(ListItemIcon)`
  justify-content: 'center';
`;

// The MobileNavLink styled component
export const LivelyMobileNavLink = styled(NavLink)`
  ${({ theme }) => `
    color: ${theme.uiConfig.typography.color};
    padding: 5px;
    min-width: 200px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    svg {
      height: 17px;
      color: ${theme.uiConfig.typography.color};
    }
    &.active {
      background: ${theme.palette.primary.main};
    }
    &.active,
    &.active svg{
      color: ${theme.palette.primary.contrastText};
      fill: ${theme.palette.primary.contrastText};
    }
    &:not(.active):hover,
    &:not(.active):hover svg{
      color: ${theme.palette.primary.main};
      fill: ${theme.palette.primary.main};
    }
  `}
`;

// Custom box

export const LivelyBox = styled(Box)`
  display: flex;
  align-items: center;
`;

// The drawer's top header bar styled component
export const LivelyDrawerTopHeaderBar = styled(Box)`
  cursor: pointer;
  &:hover {
    background: #00000011;
  }
`;

export const LivelyAvatarContainer = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;

  & .arrow {
    ${({ theme }) => `
      border-top: solid 5px ${theme.palette.primary.main};
      border-left: solid 5px transparent;
      border-right: solid 5px transparent;
    `}
    display: inline-block;
    width: 5px;
    height: 5px;
    margin-left: 10px;
    opacity: 0;
  }
  &:hover,
  &:active,
  & > button:focus {
    & .arrow {
      opacity: 1;
    }
  }
`;

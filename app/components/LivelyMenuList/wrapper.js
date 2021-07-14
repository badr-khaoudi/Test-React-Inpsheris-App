import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';

export const LivelyMenuLinkHeader = styled(Typography)`
  font-size: 16px;
  line-height: 24px;
  ${({ theme }) => `
    color: ${theme.palette.primary.main};
  `}
  margin-bottom: 10px;
`;

export const LivelyMenuItem = styled.div`
  margin: 10px 20px;
  min-width: 20%;
`;

export const LivelyMenuLinkItem = styled(ListItem)`
  &:before {
    content: '';
    border-color: transparent #111;
    border-style: solid;
    border-width: 0.35em 0 0.35em 0.45em;
    display: block;
    height: 0;
    width: 0;
    left: -1em;
    top: 0;
    position: relative;
  }
  font-size: 12px;

  & > a {
    color: black;
    &:hover {
      ${({ theme }) => `
      color: ${theme.palette.primary.main};
    `}
      text-decoration: none;
    }
  }
`;

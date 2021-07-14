import styled from 'styled-components';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

export const LivelyFooterLink = styled(Link)`
  ${({ theme }) => `
    color: ${theme.palette.text.secondary};
    font-size: 12px;
    &:hover {
      color: ${theme.palette.primary.main};
    }

    > svg {
      height: 15px;
      width: 15px;
      margin-right: 10px;
    }
  `}
`;

export const LivelySocialIcon = styled(LivelyFooterLink)`
  ${({ theme }) => `
    margin: 5px;
    color: ${theme.palette.text.primary};
    &:hover {
      color: ${theme.palette.primary.main};
    }
    > svg {
      height: 25px;
      width: 25px;
    }
  `}
`;

export const LivelyFooterContainer = styled.footer`
  ${({ theme }) => `
    background: ${theme.palette.background.paper};
    width: 100%;
  `}
`;

export const LivelyUppercaseTypography = styled(Typography)`
  margin: 15px 0;
  text-transform: uppercase;
  ${({ theme }) => `
    color: ${theme.palette.text.primary};
  `}
`;

export const LivelyGrid = styled(Grid)`
  padding: 15px;
`;

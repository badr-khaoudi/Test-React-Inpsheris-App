import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import { darken } from '@material-ui/core/styles';

const ContainedIconButton = styled(IconButton)`
  ${({ theme, ...props }) => `
  background-color: ${theme.palette[props.$color].main};
  color: ${theme.palette[props.$color].contrastText};
  &:hover {
    background-color: ${darken(theme.palette[props.$color].main, 0.2)};
  }
  `}
`;

const OutlinedIconButton = styled(IconButton)`
  background-color: #ffffff;
  border: 1px solid #dadada;
  &:hover {
    background-color: ${darken('#ffffff', 0.05)};
  }
`;

export { ContainedIconButton, OutlinedIconButton };

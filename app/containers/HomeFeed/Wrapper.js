/* eslint-disable indent */
import styled from 'styled-components';
import { lighten } from '@material-ui/core/styles';
import RoundButton from 'utils/helpers/roundButton';

const ChipButton = styled(RoundButton)`
  ${({ theme, color }) => `
  background-color: ${
    color === 'default'
      ? 'transparent'
      : lighten(theme.palette[color].main, 0.9)
  };
    &:not(:last-of-type) {
      margin-right: 12px;
    }
  `}
`;

ChipButton.defaultProps = { color: 'default' };

export { ChipButton };

/* eslint-disable indent */
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { darken } from '@material-ui/core/styles';

const QuickLinksWrapper = styled.div`
  left: 0;
  right: auto;
  z-index: 1200;
  position: absolute;
  transform: translate(0px, 420px);
`;

const QuickLinksCard = styled(Paper)`
  box-shadow: 0px 1px 5px rgba(190, 190, 190, 0.25);
  border-radius: 0 20px 20px 0;
  max-height: 352px;
  overflow-x: hidden;
  overflow-y: auto;
  ::-webkit-scrollbar {
    height: 8px;
    width: 8px;
    background: #dddddd;
  }
  ::-webkit-scrollbar-thumb {
    background: #c2c2c2;
  }
  direction: rtl;
  > * {
    direction: ltr;
  }
`;

const QuickLinksContainer = styled.div`
  width: ${props => (props.$collapsed ? '73px' : '280px')};
  transition: width 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms;
  flex-shrink: 0;
  white-space: nowrap;
  flex-direction: column;
  flex: 1 0 auto;
  display: flex;
  outline: 0;
`;

const CollapseFab = styled(IconButton)`
  ${({ $collapsed, theme }) => `
  background-color: ${theme.palette.secondary.main};
  &:hover {
    background-color: ${darken(theme.palette.secondary.main, 0.2)};
  }
  color: #ffffff;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(13px, -50%);
  .MuiSvgIcon-root {
    font-size: 1.25rem;
    transform: ${$collapsed ? 'rotate(0deg)' : 'rotate(180deg)'};
    transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  }
`}
`;

export { QuickLinksWrapper, QuickLinksCard, QuickLinksContainer, CollapseFab };

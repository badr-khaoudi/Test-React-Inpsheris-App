import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import { lighten } from '@material-ui/core/styles';

const WidgetCard = styled(Paper)`
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: none;
`;

const WidgetContainer = styled.div`
  ${({ theme }) => `
  background-color: ${lighten(theme.palette.warning.main, 0.8)};
  margin-left: 10px;
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 100%;
    background-color: ${lighten(theme.palette.warning.main, 0.15)};
  }
  .MuiTypography-h6 {
    font-weight: 700;
  }
  `}
`;

const WidgetTitle = styled.div`
  padding: 16px;
  border-bottom: 1px solid rgba(173, 173, 173, 0.19);
`;

const WidgetContent = styled.div`
  padding: 16px;
`;

const WidgetAvatar = styled(Avatar)`
  ${({ theme, $spacing }) => `
  width: ${theme.spacing($spacing)}px;
  height: ${theme.spacing($spacing)}px;
  color: ${theme.palette.text.secondary};
  background-color: #ffffff;
  `}
`;

const PollCheckbox = styled(Checkbox)`
  ${({ theme }) => `
  &.Mui-checked {
    color: ${theme.palette.success.main}
  }
  `}
`;

export {
  WidgetCard,
  WidgetContainer,
  WidgetTitle,
  WidgetContent,
  WidgetAvatar,
  PollCheckbox,
};

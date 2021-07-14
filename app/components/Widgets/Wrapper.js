/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import { darken } from '@material-ui/core/styles';

const WidgetCard = styled(Card)`
  box-shadow: 0px 3px 5px rgba(157, 157, 157, 0.25);
  border-radius: 10px;
  height: auto;
  min-height: 200px;
  max-height: 450px;
`;

const WidgetContent = styled.div`
  max-height: calc(450px - 72px - 40px);
  overflow-y: auto;
  ::-webkit-scrollbar {
    height: 8px;
    width: 8px;
    background: #f4f4f4;
    border-radius: 36px;
  }
  ::-webkit-scrollbar-thumb {
    background: #cdcdcd;
    border-radius: 36px;
  }
`;

const EditButton = styled(IconButton)`
  display: none;
  ${WidgetCard}:hover & {
    display: inline-flex;
  }
`;

const Ellipse = styled.div`
  height: 60px;
  width: 60px;
  border: 1px solid #143c7d;
  border-radius: 50%;
  color: #143c7d;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Separator = styled.div`
  height: 60px;
  display: flex;
  align-items: center;
`;

const AnswerBar = styled(LinearProgress)`
  height: 20px;
  border-radius: 5px;
  &:after {
    content: '${props => `${props.value}%`}';
    color: #ffffff;
    position: absolute;
    left: 50%;
    bottom: 50%;
    transform: translate(-50%, 50%);
  }
`;

const BorderAvatar = styled(Avatar)`
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: inset 0 0 0 5px rgba(0, 0, 0, 0.05);
  }
`;

const EventCard = styled(Paper)`
  padding: 16px;
  background: #fafafa;
  position: relative;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 5px;
    background: ${props => props.color};
  }
`;

const DayCell = styled(IconButton)`
  ${({ $isMultiple, $isToday, theme }) => `
  padding: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${$isMultiple || $isToday ? '#ffffff' : 'rgba(0, 0, 0, 0.87)'};
  background-color: ${
    $isMultiple
      ? theme.palette.primary.main
      : $isToday
      ? theme.palette.secondary.main
      : 'transparent'
  };
  &:hover {
    background-color: ${
      $isMultiple
        ? darken(theme.palette.primary.main, 0.1)
        : $isToday
        ? darken(theme.palette.secondary.main, 0.1)
        : 'rgba(0, 0, 0, 0.04)'
    };
  }
  .MuiIconButton-label{
    height: 1em;
    width: 1em;
    font-size: 0.875rem
  }
  `}
`;

export {
  EditButton,
  WidgetCard,
  WidgetContent,
  Ellipse,
  Separator,
  AnswerBar,
  BorderAvatar,
  EventCard,
  DayCell,
};

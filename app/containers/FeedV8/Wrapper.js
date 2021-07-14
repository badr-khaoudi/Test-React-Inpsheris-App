import styled from 'styled-components';
import { Avatar, Typography } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';

const OuterIcon = styled.div`
  width: 60px;
  margin-right: 30px;
`;

const CommunityLogo = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const FeedAvatar = styled(Avatar)`
  &.MuiAvatar-root {
    height: ${props => (props.size === 'sm' ? '40px' : '60px')};
    width: ${props => (props.size === 'sm' ? '40px' : '60px')};
  }
`;

const ActivityDate = styled(Typography)`
  &.MuiTypography-body2 {
    font-size: 10px;
  }
`;

const ActionButton = styled(ButtonBase)`
  &.MuiButtonBase-root {
    padding: 6px 8px;
    font-size: 1.2rem;
    border-radius: 4px;
  }
`;

const SimpleMenu = styled(Menu)`
  .MuiPaper-root {
    border: 1px solid #d3d4d5;
  }
  .MuiListItemIcon-root {
    min-width: 35px;
  }
`;

const Comments = styled(Paper)`
  background-color: #f5f6f6;
  padding: 16px;
  position: relative;
  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 0px;
    height: 0px;
    top: -10px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid #f5f6f6;
  }
`;

export {
  OuterIcon,
  ActivityDate,
  CommunityLogo,
  FeedAvatar,
  ActionButton,
  SimpleMenu,
  Comments,
};

import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

const NotificationAction = styled.div`
  z-index: 1;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  position: absolute;
  right: 12px;
  bottom: -5px;
  background-color: #ffffff;
`;

const NotificationAvatar = styled(Avatar)`
  width: 50px;
  height: 50px;
`;

export { NotificationAction, NotificationAvatar };

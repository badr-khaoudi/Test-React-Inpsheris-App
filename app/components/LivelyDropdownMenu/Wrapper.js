import styled from 'styled-components';
import Popover from '@material-ui/core/Popover';

const NotificationPopover = styled(Popover)`
  .MuiPopover-paper {
    box-shadow: 2px 3px 5px rgba(191, 227, 253, 0.25),
      0px -2px 13px 1px rgba(191, 227, 253, 0.25);
  }
`;

export { NotificationPopover };

/**
 *
 * Notification
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { NotificationPopover } from './Wrapper';

const Notification = ({ anchorRef, handleClose, children }) => {
  const open = Boolean(anchorRef);

  return (
    <NotificationPopover
      open={open}
      anchorEl={anchorRef}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      elevation={0}
    >
      {children}
    </NotificationPopover>
  );
};

Notification.propTypes = {
  anchorRef: PropTypes.any,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Notification.defaultProps = {
  anchorRef: null,
};

export default React.memo(Notification);

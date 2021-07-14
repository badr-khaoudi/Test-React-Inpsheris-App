/**
 *
 * LivelyDropdownMenu
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import Popover from '@material-ui/core/Popover';

const LivelyDropdownMenu = ({ anchorRef, handleClose, children }) => {
  const open = Boolean(anchorRef);

  return (
    <Popover
      open={open}
      anchorEl={anchorRef}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      {children}
    </Popover>
  );
};

LivelyDropdownMenu.propTypes = {
  anchorRef: PropTypes.any,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

LivelyDropdownMenu.defaultProps = {
  anchorRef: null,
};

export default React.memo(LivelyDropdownMenu);

/**
 *
 * ColorPicker
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { SketchPicker } from 'react-color';
import Popover from '@material-ui/core/Popover';

function ColorPicker(props) {
  const { anchorEl, handleClose, color, setColor } = props;
  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      elevation={1}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <SketchPicker color={color} onChange={({ hex }) => setColor(hex)} />
    </Popover>
  );
}

ColorPicker.propTypes = {
  anchorEl: PropTypes.any,
  handleClose: PropTypes.func,
  color: PropTypes.string,
  setColor: PropTypes.func,
};

export default memo(ColorPicker);

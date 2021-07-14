/**
 *
 * MessageDialog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function MessageDialog(props) {
  const { handleClose, fileName } = props;
  return (
    <Dialog open onClose={handleClose} scroll="paper" fullWidth maxWidth="md">
      <DialogTitle>
        Message
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{ position: 'absolute', top: 5, right: 5 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Typography>
          A file with the same name already exists, your file will be imported
          under the reference {`${fileName}`}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

MessageDialog.propTypes = {
  handleClose: PropTypes.func,
  fileName: PropTypes.string,
};

export default MessageDialog;

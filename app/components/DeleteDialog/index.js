/**
 *
 * DeleteDialog
 *
 */

import React, { useState, cloneElement } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

function DeleteDialog(props) {
  const { children, onClick, handleClose, message } = props;
  const [open, setOpen] = useState(false);
  const renderChildren = cloneElement(children, {
    onClick: () => setOpen(true),
  });
  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
          if (handleClose) {
            handleClose();
          }
        }}
        keepMounted={false}
        fullWidth
        maxWidth="sm"
        disableEnforceFocus
      >
        <DialogTitle>Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              onClick();
            }}
            variant="outlined"
            color="primary"
          >
            Delete
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              if (handleClose) {
                handleClose();
              }
            }}
            variant="outlined"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      {renderChildren}
    </>
  );
}

DeleteDialog.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  handleClose: PropTypes.func,
  message: PropTypes.string,
};

export default DeleteDialog;

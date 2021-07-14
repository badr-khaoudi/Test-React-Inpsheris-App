import React from 'react';
import DeleteDialog from 'components/DeleteDialog';

const withConfirmation = (
  Component,
  onClick,
  handleClose,
  message,
) => props => (
  <DeleteDialog onClick={onClick} handleClose={handleClose} message={message}>
    <Component {...props} />
  </DeleteDialog>
);

export default withConfirmation;

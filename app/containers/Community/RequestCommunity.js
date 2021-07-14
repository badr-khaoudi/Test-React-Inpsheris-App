/**
 *
 * RequestCommunity
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@material-ui/icons';
import { RequestCommunitySchema } from './Schema';
import { requestedCommunity, cleanRequestedCommunity } from './actions';
import { makeSelectRequestedCommunitySuccess } from './selectors';

function RequestCommunity(props) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { handleClose } = props;
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [reason, setReason] = useState('');
  const requestedCommunitySuccess = useSelector(
    makeSelectRequestedCommunitySuccess(),
  );

  useEffect(() => () => dispatch(cleanRequestedCommunity()), []);

  useEffect(() => {
    if (requestedCommunitySuccess) {
      handleClose();
    }
  }, [requestedCommunitySuccess]);

  const handleSubmit = () => {
    const payload = { label, description, reason };
    const result = RequestCommunitySchema.validate(payload);
    if (result.error) {
      enqueueSnackbar(`${result.error}`, {
        variant: 'error',
      });
    }
    if (!result.error) {
      dispatch(requestedCommunity(payload));
    }
  };

  return (
    <Dialog open onClose={handleClose} scroll="paper" fullWidth maxWidth="sm">
      <DialogTitle>
        Request a Community
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{ position: 'absolute', top: 5, right: 5 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              size="small"
              value={label}
              onChange={e => setLabel(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              size="small"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Request Reason"
              variant="outlined"
              fullWidth
              size="small"
              multiline
              rows={3}
              value={reason}
              onChange={e => setReason(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="outlined" color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

RequestCommunity.propTypes = {
  handleClose: PropTypes.func,
};

export default memo(RequestCommunity);

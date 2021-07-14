/**
 *
 * DocumentBarDialog
 *
 */

import React, { memo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import _ from 'lodash';
import {
  Dialog,
  DialogActions,
  DialogContent,
  AppBar,
  Toolbar,
  Grid,
  Typography,
  TextField,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Close, Search, FilterList } from '@material-ui/icons';
import DocumentBar from 'containers/DocumentBar';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import {
  closeDocumentBar,
  livelyTransferDocuments,
} from 'containers/AuthBase/actions';

const transformDocuments = document => ({
  uid: document.fileUid,
  isInternal: !document.isExternalFile,
  fileName: document.fileName,
  fileType: document.fileExtension,
  createdDate: document.fileUploadedDate,
  path: document.url,
  externalSource: document.externalSource,
});

function DocumentBarDialog(props) {
  const dispatch = useDispatch();
  const [q, setQ] = useState('');
  const qRef = useRef('');
  const inputRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const { allowSelect } = props;
  const [documents, setDocuments] = useState([]);
  const handleDone = () => {
    dispatch(livelyTransferDocuments(_.map(documents, transformDocuments)));
    dispatch(closeDocumentBar());
  };
  return (
    <Dialog
      open
      keepMounted={false}
      fullWidth
      maxWidth="lg"
      disableEnforceFocus
    >
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography variant="h6">My Documents</Typography>
            </Grid>
            <Grid item xs={3} style={{ marginRight: 16 }}>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                placeholder="Search"
                onChange={e => {
                  qRef.current = e.target.value;
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    setQ(e.target.value);
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setQ(qRef.current)}
                        onMouseDown={() => setQ(qRef.current)}
                      >
                        <Search fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                  inputProps: { ref: inputRef },
                }}
              />
            </Grid>
            <Grid item>
              <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
                <FilterList />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                edge="end"
                onClick={() => dispatch(closeDocumentBar())}
              >
                <Close />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <DialogContent dividers id="dialogContent">
        <DocumentBar
          q={q}
          setQ={setQ}
          inputRef={inputRef}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          scrollableTarget="dialogContent"
          documents={documents}
          setDocuments={setDocuments}
          {...props}
        />
      </DialogContent>
      {allowSelect && (
        <DialogActions>
          <Button onClick={handleDone} variant="outlined" color="primary">
            Done
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
}

DocumentBarDialog.propTypes = { allowSelect: PropTypes.bool };

export default memo(DocumentBarDialog);

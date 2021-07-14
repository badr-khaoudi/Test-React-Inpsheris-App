/**
 *
 * DocumentBarPage
 *
 */

import React, { memo, useState, useRef } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Container, Grid, Paper, TextField } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Search, FilterList } from '@material-ui/icons';
// import { FormattedMessage } from 'react-intl';
import DocumentBar from 'containers/DocumentBar';
// import messages from './messages';

function DocumentBarPage() {
  const [q, setQ] = useState('');
  const qRef = useRef('');
  const inputRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <>
      <Paper square>
        <Container fixed style={{ paddingTop: 20, paddingBottom: 20 }}>
          <Grid container alignItems="center" justify="flex-end">
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
          </Grid>
        </Container>
      </Paper>
      <Container fixed style={{ paddingTop: 20, paddingBottom: 20 }}>
        <DocumentBar
          q={q}
          setQ={setQ}
          inputRef={inputRef}
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
        />
      </Container>
    </>
  );
}

DocumentBarPage.propTypes = {};

export default memo(DocumentBarPage);

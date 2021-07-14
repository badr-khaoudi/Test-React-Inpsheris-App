/**
 *
 * AllUsersConnected
 *
 */

import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
// import { FormattedMessage } from 'react-intl';
import { Grid, TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { GetApp, Search } from '@material-ui/icons';
import { listUserConnect as listUserConnectAction } from 'containers/UserDetails/actions';
import {
  makeSelectListUserConnect,
  makeSelectUserDetailsLoading,
} from 'containers/UserDetails/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { exportTable } from 'containers/Statistics/actions';
import DataTable from 'components/DataTable/Loadable';
// import messages from './messages';

const columns = [
  {
    field: 'firstName',
    label: 'First name',
    sort: true,
    width: 200,
  },
  {
    field: 'lastName',
    label: 'Last name',
    sort: true,
    width: 200,
  },
  {
    field: 'login',
    label: 'Login',
    sort: true,
    width: 200,
  },
  {
    field: 'email',
    label: 'Email',
    sort: true,
    width: 200,
  },
  {
    field: 'active',
    label: 'Active',
    sort: true,
    width: 100,
  },
  {
    field: 'connectionCount',
    label: 'Total connection',
    sort: true,
    width: 150,
  },
  {
    field: 'lastLoginedDate',
    label: 'Last connected date',
    sort: true,
    width: 150,
  },
];

function AllUsersConnected() {
  const dispatch = useDispatch();
  const language = useSelector(makeSelectLocale());
  const cancelToken = useRef();
  const [q, setQ] = useState('');
  const qRef = useRef('');

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    dispatch(
      listUserConnectAction(
        { page: 1, itemsPerPage: 20, q, viewingFrom: 'home' },
        cancelToken.current.token,
      ),
    );
    return () => cancelToken.current.cancel();
  }, [q]);

  const handleTableChange = useCallback(
    ({ page, itemsPerPage, sortField, sortKey, token }) => {
      dispatch(
        listUserConnectAction(
          {
            page,
            itemsPerPage,
            q,
            sortField,
            sortKey,
            viewingFrom: 'home',
          },
          token,
        ),
      );
    },
    [q],
  );

  const listUserConnect = useSelector(makeSelectListUserConnect());
  const userDetailsLoading = useSelector(makeSelectUserDetailsLoading());

  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (listUserConnect.total && listUserConnect.total !== total) {
      setTotal(listUserConnect.total);
    }
  }, [listUserConnect]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              fullWidth
              size="small"
              label="Search"
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
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button
              startIcon={<GetApp />}
              onClick={() =>
                dispatch(
                  exportTable(
                    {
                      language,
                      reportType: 'allusersconnected',
                    },
                    'export_all_users_connected_report.xlsx',
                  ),
                )
              }
              variant="outlined"
              color="primary"
            >
              Export
            </Button>
          </Grid>
          <Grid item xs={12}>
            <DataTable
              containerStyles={{ height: '50vh' }}
              loading={userDetailsLoading}
              loadingRowsCount={3}
              columns={columns}
              rows={listUserConnect.rows}
              handleTableChange={handleTableChange}
              pagination
              total={total}
              defaultItemsPerPage={20}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          (*)This report be used to show the list of users which were connected
          on the intranet since the opening.
        </Typography>
      </Grid>
    </Grid>
  );
}

AllUsersConnected.propTypes = {};

export default memo(AllUsersConnected);

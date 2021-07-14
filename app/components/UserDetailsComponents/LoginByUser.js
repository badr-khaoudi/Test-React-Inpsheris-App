/**
 *
 * LoginByUser
 *
 */

import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import { Grid, TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import { GetApp, Search } from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { listUserConnectionSummary as listUserConnectionSummaryAction } from 'containers/UserDetails/actions';
import {
  makeSelectListUserConnectionSummary,
  makeSelectUserDetailsLoading,
} from 'containers/UserDetails/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { exportTable } from 'containers/Statistics/actions';
import DataTable from 'components/DataTable/Loadable';
import { periodOptions } from 'utils/constants/periodOptions';
// import messages from './messages';

const columns = [
  {
    field: 'contentAuthor',
    label: 'User name',
    sort: true,
    width: 200,
  },
  {
    field: 'active',
    label: 'Last name',
    sort: true,
    width: 100,
  },
  {
    field: 'connectionCount',
    label: 'Last total connection',
    sort: true,
    width: 200,
  },
  {
    field: 'lastLoginedDate',
    label: 'Last connected date',
    sort: true,
    width: 200,
  },
];

function LoginByUser() {
  const dispatch = useDispatch();
  const language = useSelector(makeSelectLocale());
  const cancelToken = useRef();
  const [period, setPeriod] = useState('thisweek');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [q, setQ] = useState('');
  const qRef = useRef('');

  useEffect(() => {
    if (
      (period === 'choosedate' && startDate && endDate) ||
      period !== 'choosedate'
    ) {
      cancelToken.current = axios.CancelToken.source();
      dispatch(
        listUserConnectionSummaryAction(
          {
            page: 1,
            itemsPerPage: 20,
            period,
            q,
            startDate:
              period === 'choosedate'
                ? moment(startDate).format('DD/MM/YYYY')
                : undefined,
            endDate:
              period === 'choosedate'
                ? moment(endDate).format('DD/MM/YYYY')
                : undefined,
            viewingFrom: 'home',
          },
          cancelToken.current.token,
        ),
      );
    }
    return () => cancelToken.current.cancel();
  }, [period, startDate, endDate, q]);

  const handleTableChange = useCallback(
    ({ page, itemsPerPage, sortField, sortKey, token }) => {
      dispatch(
        listUserConnectionSummaryAction(
          {
            page,
            itemsPerPage,
            sortField,
            sortKey,
            q,
            period,
            startDate:
              period === 'choosedate'
                ? moment(startDate).format('DD/MM/YYYY')
                : undefined,
            endDate:
              period === 'choosedate'
                ? moment(endDate).format('DD/MM/YYYY')
                : undefined,
            viewingFrom: 'home',
          },
          token,
        ),
      );
    },
    [period, startDate, endDate, q],
  );

  const listUserConnectionSummary = useSelector(
    makeSelectListUserConnectionSummary(),
  );
  const userDetailsLoading = useSelector(makeSelectUserDetailsLoading());

  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (
      listUserConnectionSummary.total &&
      listUserConnectionSummary.total !== total
    ) {
      setTotal(listUserConnectionSummary.total);
    }
  }, [listUserConnectionSummary]);

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
          <Grid item xs={4}>
            <TextField
              variant="outlined"
              fullWidth
              select
              size="small"
              label="Content Period"
              value={period}
              onChange={e => {
                setPeriod(e.target.value);
              }}
            >
              {_.map(periodOptions, periodOption => (
                <MenuItem key={periodOption} value={periodOption}>
                  {periodOption}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          {period === 'choosedate' && (
            <>
              <Grid item xs={4}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  format="MMM dd, yyyy"
                  value={startDate}
                  onChange={setStartDate}
                  autoOk
                  fullWidth
                  maxDate={endDate}
                  TextFieldComponent={textFieldProps => (
                    <TextField
                      {...textFieldProps}
                      size="small"
                      variant="outlined"
                      InputProps={{
                        ...textFieldProps.InputProps,
                        style: { paddingRight: 0 },
                      }}
                      label="Start Date"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  format="MMM dd, yyyy"
                  value={endDate}
                  onChange={setEndDate}
                  autoOk
                  fullWidth
                  minDate={startDate}
                  TextFieldComponent={textFieldProps => (
                    <TextField
                      {...textFieldProps}
                      size="small"
                      variant="outlined"
                      InputProps={{
                        ...textFieldProps.InputProps,
                        style: { paddingRight: 0 },
                      }}
                      label="End Date"
                    />
                  )}
                />
              </Grid>
            </>
          )}
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
                      reportType: 'connectUserSummary',
                    },
                    'export_user_connection_summary_report.xlsx',
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
              rows={listUserConnectionSummary.rows}
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
          (*)This report be used to to collect user connection summary who
          logged in system.
        </Typography>
      </Grid>
    </Grid>
  );
}

LoginByUser.propTypes = {};

export default memo(LoginByUser);

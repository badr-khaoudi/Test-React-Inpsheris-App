/**
 *
 * User
 *
 */

import React, {
  memo,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import moment from 'moment';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
// import { FormattedMessage } from 'react-intl';
import { Grid, TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { GetApp, Search } from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import {
  listUserDetailsAndActions as listUserDetailsAndActionsAction,
  totalConnectAtTheMoment as totalConnectAtTheMomentAction,
} from 'containers/UserDetails/actions';
import {
  makeSelectListUserDetailsAndActions,
  makeSelectUserDetailsLoading,
  makeSelectTotalConnectAtTheMoment,
} from 'containers/UserDetails/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { exportTable } from 'containers/Statistics/actions';
import DataTable from 'components/DataTable/Loadable';
import { periodOptions } from 'utils/constants/periodOptions';
import ViewDetails from './ViewDetails';
// import messages from './messages';

function User() {
  const dispatch = useDispatch();
  const language = useSelector(makeSelectLocale());
  const cancelToken = useRef();
  const cancelToken2 = useRef();
  const [period, setPeriod] = useState('thisweek');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [q, setQ] = useState('');
  const qRef = useRef('');
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [action, setAction] = useState('');
  const [userUid, setUserUid] = useState('');

  const handleViewMore = useCallback((viewAction, viewUserUid) => {
    setViewDetailsOpen(true);
    setAction(viewAction);
    setUserUid(viewUserUid);
  }, []);

  const renderFunction = useCallback(
    viewAction =>
      _.spread((number, uid) =>
        number > 0 ? (
          <>
            {`${number} `}
            <Button
              onClick={() => handleViewMore(viewAction, uid)}
              variant="outlined"
              size="small"
              color="primary"
            >
              View Details
            </Button>
          </>
        ) : (
          number
        ),
      ),
    [],
  );

  const columns = useMemo(
    () => [
      {
        field: 'contentAuthor',
        label: 'User name',
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
        field: 'userCompany',
        label: 'Company',
        sort: true,
        width: 150,
      },
      {
        field: 'userService',
        label: 'Service',
        sort: true,
        width: 150,
      },
      {
        field: 'userTown',
        label: 'Town',
        sort: true,
        width: 150,
      },
      {
        field: 'userCommunityStatus',
        label: 'Status',
        sort: true,
        width: 150,
      },
      {
        field: 'connectionCount',
        label: 'Number of connections',
        sort: true,
        width: 150,
      },
      {
        field: 'publicationCount',
        label: 'Number of publications',
        sort: true,
        width: 200,
        renderKeys: ['publicationCount', 'userUid'],
        render: renderFunction('publish'),
      },
      {
        field: 'viewCount',
        label: 'Number of views',
        sort: true,
        width: 200,
        renderKeys: ['viewCount', 'userUid'],
        render: renderFunction('view'),
      },
      {
        field: 'likeCount',
        label: 'Number of likes',
        sort: true,
        width: 200,
        renderKeys: ['likeCount', 'userUid'],
        render: renderFunction('like'),
      },
      {
        field: 'commentCount',
        label: 'Number of comments',
        sort: true,
        width: 200,
        renderKeys: ['commentCount', 'userUid'],
        render: renderFunction('comment'),
      },
      {
        field: 'sharedContentCount',
        label: 'Number of shares',
        sort: true,
        width: 200,
        renderKeys: ['sharedContentCount', 'userUid'],
        render: renderFunction('share'),
      },
      {
        field: 'downloadCount',
        label: 'Number of downloads',
        sort: true,
        width: 200,
        renderKeys: ['downloadCount', 'userUid'],
        render: renderFunction('download'),
      },
      {
        field: 'lastLoginedDate',
        label: 'Last connected date',
        width: 150,
      },
    ],
    [],
  );

  useEffect(() => {
    if (
      (period === 'choosedate' && startDate && endDate) ||
      period !== 'choosedate'
    ) {
      cancelToken.current = axios.CancelToken.source();
      dispatch(
        listUserDetailsAndActionsAction(
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

  useEffect(() => {
    if (
      (period === 'choosedate' && startDate && endDate) ||
      period !== 'choosedate'
    ) {
      cancelToken2.current = axios.CancelToken.source();
      dispatch(
        totalConnectAtTheMomentAction({ period }, cancelToken2.current.token),
      );
    }
    return () => cancelToken2.current.cancel();
  }, [period]);

  const handleTableChange = useCallback(
    ({ page, itemsPerPage, sortField, sortKey, token }) => {
      dispatch(
        listUserDetailsAndActionsAction(
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

  const listUserDetailsAndActions = useSelector(
    makeSelectListUserDetailsAndActions(),
  );
  const userDetailsLoading = useSelector(makeSelectUserDetailsLoading());
  const totalConnectAtTheMoment = useSelector(
    makeSelectTotalConnectAtTheMoment(),
  );

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (
      listUserDetailsAndActions.total &&
      listUserDetailsAndActions.total !== total
    ) {
      setTotal(listUserDetailsAndActions.total);
    }
  }, [listUserDetailsAndActions]);

  return (
    <>
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
                        endDate,
                        language,
                        period,
                        reportType: 'userDetailsAndActions',
                        startDate,
                      },
                      'export_user_details_and_actions_report.xlsx',
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
                rows={listUserDetailsAndActions.rows}
                handleTableChange={handleTableChange}
                pagination
                total={total}
                defaultItemsPerPage={20}
              />
            </Grid>
            {!_.isEmpty(totalConnectAtTheMoment) && (
              <Grid item xs={12}>
                <Typography variant="body1">
                  {`Total connections: ${
                    totalConnectAtTheMoment.totalConnections
                  } / Unique users:
                  ${totalConnectAtTheMoment.totalUniqueUsers}`}
                </Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography>
                (*)Ce rapport montre la liste des utilisateurs et leurs actions
                en ligne.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {viewDetailsOpen && (
        <ViewDetails
          action={action}
          userUid={userUid}
          period={period}
          startDate={startDate}
          endDate={endDate}
          handleClose={() => setViewDetailsOpen(false)}
        />
      )}
    </>
  );
}

User.propTypes = {};

export default memo(User);

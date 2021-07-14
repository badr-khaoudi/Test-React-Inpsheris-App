/**
 *
 * TotalConnections
 *
 */

import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import moment from 'moment';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// import { FormattedMessage } from 'react-intl';
import { Grid, TextField, Typography } from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { GetApp } from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import {
  countTotal as countTotalAction,
  countTotalTable as countTotalTableAction,
} from 'containers/GlobalConnections/actions';
import { timeSeriesZoomableOptions } from 'containers/Statistics/options';
import { LoadingIndicator } from 'containers/Statistics/LoadingIndicator';
import DataTable from 'components/DataTable/Loadable';
import {
  makeSelectCountTotal,
  makeSelectCountTotalTable,
  makeSelectGlobalConnectionsLoading,
} from 'containers/GlobalConnections/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { exportTable } from 'containers/Statistics/actions';
import { periodOptions } from 'utils/constants/periodOptions';
// import messages from './messages';

const columns = [
  {
    field: 'connectionDate',
    label: 'Date',
    sort: true,
  },
  {
    field: 'connectionCount',
    label: 'Total connections',
    sort: true,
  },
  {
    field: 'totalUniqueCount',
    label: 'Unique users',
    sort: true,
  },
];

function TotalConnections() {
  const dispatch = useDispatch();
  const language = useSelector(makeSelectLocale());
  const cancelToken = useRef();
  const [type, setType] = useState('chart');
  const [period, setPeriod] = useState('thisweek');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    if (type === 'chart') {
      dispatch(
        countTotalAction({ viewingFrom: 'home' }, cancelToken.current.token),
      );
    }
    if (type === 'table') {
      if (
        (period === 'choosedate' && startDate && endDate) ||
        period !== 'choosedate'
      ) {
        dispatch(
          countTotalTableAction(
            {
              page: 1,
              itemsPerPage: 20,
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
            cancelToken.current.token,
          ),
        );
      }
    }
    return () => cancelToken.current.cancel();
  }, [type, period, startDate, endDate]);

  const handleTableChange = useCallback(
    ({ page, itemsPerPage, sortField, sortKey, token }) => {
      dispatch(
        countTotalTableAction(
          {
            page,
            itemsPerPage,
            sortField,
            sortKey,
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
    [period, startDate, endDate],
  );

  const countTotal = useSelector(makeSelectCountTotal());
  const countTotalTable = useSelector(makeSelectCountTotalTable());
  const globalConnectionsLoading = useSelector(
    makeSelectGlobalConnectionsLoading(),
  );

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (countTotalTable.total && countTotalTable.total !== total) {
      setTotal(countTotalTable.total);
    }
  }, [countTotalTable]);

  const options = {
    ...timeSeriesZoomableOptions,
    title: {
      text: `${moment(countTotal.startDate).format('DD MMM YYYY')} - ${moment(
        countTotal.endDate,
      ).format('DD MMM YYYY')} <br/> Total connections`,
    },
    series: [
      {
        name: 'Total connections',
        data: countTotal.totalConnectionSeries,
        pointStart: parseFloat(moment(countTotal.startDate).format('x')),
        pointInterval: 24 * 3600 * 1000,
      },
      {
        name: 'Unique users',
        data: countTotal.uniqueConnectionSeries,
        pointStart: parseFloat(moment(countTotal.startDate).format('x')),
        pointInterval: 24 * 3600 * 1000,
      },
    ],
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonGroup disableElevation color="primary">
              <Button
                onClick={() => setType('chart')}
                variant={type === 'chart' ? 'contained' : 'outlined'}
              >
                Chart
              </Button>
              <Button
                onClick={() => setType('table')}
                variant={type === 'table' ? 'contained' : 'outlined'}
              >
                Table
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
      {type === 'table' && (
        <Grid item xs={12}>
          <Grid container spacing={2}>
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
      )}
      <Grid item xs={12}>
        {type === 'chart' && (
          <>
            {globalConnectionsLoading && <LoadingIndicator />}
            {!_.isEmpty(countTotal) && (
              <HighchartsReact highcharts={Highcharts} options={options} />
            )}
          </>
        )}
        {type === 'table' && (
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
                        reportType: 'connecttotaltable',
                        startDate,
                      },
                      'export_total_global_connections_table_by_date_counting_report.xlsx',
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
                loading={globalConnectionsLoading}
                loadingRowsCount={3}
                columns={columns}
                rows={countTotalTable.rows}
                handleTableChange={handleTableChange}
                pagination
                total={total}
                defaultItemsPerPage={20}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography>
          (*)Number of logged in users : number of creating sessions.
        </Typography>
      </Grid>
    </Grid>
  );
}

TotalConnections.propTypes = {};

export default memo(TotalConnections);

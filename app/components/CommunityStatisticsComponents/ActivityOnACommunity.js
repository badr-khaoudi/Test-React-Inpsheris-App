/**
 *
 * ActivityOnACommunity
 *
 */

import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
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
import { GetApp } from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { viewActivityCommunity as viewActivityCommunityAction } from 'containers/CommunityStatistics/actions';
import {
  makeSelectViewActivityCommunity,
  makeSelectCountCommunityStatisticsLoading,
} from 'containers/CommunityStatistics/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { exportTable } from 'containers/Statistics/actions';
import DataTable from 'components/DataTable/Loadable';
import { periodOptions } from 'utils/constants/periodOptions';
// import messages from './messages';

const columns = [
  {
    field: 'communityName',
    label: 'Community name',
    sort: true,
  },
  {
    field: 'communityTabName',
    label: 'Tab name',
  },
  {
    field: 'viewingTabCount',
    label: 'Number of tab views',
  },
];

function ActivityOnACommunity() {
  const dispatch = useDispatch();
  const language = useSelector(makeSelectLocale());
  const cancelToken = useRef();
  const [period, setPeriod] = useState('thisweek');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (
      (period === 'choosedate' && startDate && endDate) ||
      period !== 'choosedate'
    ) {
      cancelToken.current = axios.CancelToken.source();
      dispatch(
        viewActivityCommunityAction(
          {
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
    return () => cancelToken.current.cancel();
  }, [period, startDate, endDate]);

  const handleTableChange = useCallback(
    ({ sortField, sortKey, token }) => {
      dispatch(
        viewActivityCommunityAction(
          {
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

  const viewActivityCommunity = useSelector(makeSelectViewActivityCommunity());
  const communityStatisticsLoading = useSelector(
    makeSelectCountCommunityStatisticsLoading(),
  );

  return (
    <Grid container spacing={2}>
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
                      reportType: 'activity',
                      startDate,
                    },
                    'export_activity_report.xlsx',
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
              loading={communityStatisticsLoading}
              loadingRowsCount={3}
              columns={columns}
              rows={viewActivityCommunity}
              handleTableChange={handleTableChange}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography>(*)Number of views by tabs by community</Typography>
      </Grid>
    </Grid>
  );
}

ActivityOnACommunity.propTypes = {};

export default memo(ActivityOnACommunity);

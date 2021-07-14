/**
 *
 * FlexdeskReport
 *
 */

import React, { memo, useEffect, useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import _ from 'lodash';
import axios from 'axios';
import { Grid, TextField, Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { Search } from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import DataTable from 'components/DataTable/Loadable';
import { periodOptions } from 'utils/constants/periodOptions';
import { makeSelectFlexdesk, makeSelectFlexdeskLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { flexdesk as flexdeskAction } from './actions';

const columns = [
  {
    field: 'spaceName',
    label: 'Space name',
    sort: true,
    width: 150,
  },
  {
    field: 'reservationDate',
    label: 'Reservation date',
    sort: true,
    width: 150,
  },
  {
    field: 'startTime',
    label: 'Start time',
    width: 150,
  },
  {
    field: 'endTime',
    label: 'End time',
    width: 150,
  },
  {
    field: 'totalDesks',
    label: 'Total desks',
    sort: true,
    width: 150,
  },
  {
    field: 'reservedDesks',
    label: 'Reserved desks',
    sort: true,
    width: 150,
  },
];

export function FlexdeskReport(props) {
  useInjectReducer({ key: 'flexdeskReport', reducer });
  useInjectSaga({ key: 'flexdeskReport', saga });

  const cancelToken = useRef();
  const [period, setPeriod] = useState('thisweek');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [q, setQ] = useState('');
  const qRef = useRef('');

  const { dispatchFlexdesk, flexdesk, flexdeskLoading } = props;

  useEffect(() => {
    if (
      (period === 'choosedate' && startDate && endDate) ||
      period !== 'choosedate'
    ) {
      cancelToken.current = axios.CancelToken.source();
      dispatchFlexdesk(
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
      );
    }
    return () => cancelToken.current.cancel();
  }, [period, startDate, endDate, q]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (flexdesk.total && flexdesk.total !== total) {
      setTotal(flexdesk.total);
    }
  }, [flexdesk]);

  const handleTableChange = useCallback(
    ({ page, itemsPerPage, sortField, sortKey, token }) => {
      dispatchFlexdesk(
        {
          page,
          itemsPerPage,
          sortField,
          sortKey,
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
        token,
      );
    },
    [period, startDate, endDate, q],
  );

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
        <DataTable
          containerStyles={{ height: '50vh' }}
          loading={flexdeskLoading}
          loadingRowsCount={3}
          columns={columns}
          rows={flexdesk.rows}
          handleTableChange={handleTableChange}
          pagination
          total={total}
          defaultItemsPerPage={20}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography>
          (*)Ce rapport montre le détail des réservations pour chaque place dans
          le flexdesk.
        </Typography>
      </Grid>
    </Grid>
  );
}

FlexdeskReport.propTypes = {
  dispatchFlexdesk: PropTypes.func,
  flexdesk: PropTypes.object,
  flexdeskLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  flexdesk: makeSelectFlexdesk(),
  flexdeskLoading: makeSelectFlexdeskLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchFlexdesk: (options, cancelToken) =>
      dispatch(flexdeskAction(options, cancelToken)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(FlexdeskReport);

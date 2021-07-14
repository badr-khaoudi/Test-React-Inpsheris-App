/**
 *
 * UsersNavigation
 *
 */

import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import _ from 'lodash';
import axios from 'axios';
import { Grid, TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { GetApp } from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { exportTable } from 'containers/Statistics/actions';
import DataTable from 'components/DataTable/Loadable';
import { periodOptions } from 'utils/constants/periodOptions';
import {
  makeSelectListContentViewedBySource,
  makeSelectListContentViewedBySourceLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { listContentViewedBySource as listContentViewedBySourceAction } from './actions';

const columns = [
  {
    field: 'contentTitle',
    label: 'Content name',
    sort: true,
    width: 300,
  },
  {
    field: 'contentType',
    label: 'Content type',
    sort: true,
  },
  {
    field: 'contentViewedByHomeCount',
    label: 'Home NF',
    sort: true,
  },
  {
    field: 'contentViewedByCommunityCount',
    label: 'Community NF',
    sort: true,
  },
  {
    field: 'contentViewedByTabCount',
    label: 'Tab NF',
    sort: true,
  },
  {
    field: 'totalUniqueCount',
    label: 'Total',
    sort: true,
  },
];

export function UsersNavigation(props) {
  useInjectReducer({ key: 'usersNavigation', reducer });
  useInjectSaga({ key: 'usersNavigation', saga });

  const cancelToken = useRef();
  const [period, setPeriod] = useState('thisweek');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const {
    dispatchListContentViewedBySource,
    listContentViewedBySource,
    listContentViewedBySourceLoading,
    dispatchExportTable,
    language,
  } = props;

  useEffect(() => {
    if (
      (period === 'choosedate' && startDate && endDate) ||
      period !== 'choosedate'
    ) {
      cancelToken.current = axios.CancelToken.source();
      dispatchListContentViewedBySource(
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
      );
    }
    return () => cancelToken.current.cancel();
  }, [period, startDate, endDate]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (
      listContentViewedBySource.total &&
      listContentViewedBySource.total !== total
    ) {
      setTotal(listContentViewedBySource.total);
    }
  }, [listContentViewedBySource]);

  const handleTableChange = useCallback(
    ({ page, itemsPerPage, sortField, sortKey, token }) => {
      dispatchListContentViewedBySource(
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
      );
    },
    [period, startDate, endDate],
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
                dispatchExportTable(
                  {
                    endDate,
                    language,
                    period,
                    reportType: 'contentviewdbysource',
                    startDate,
                  },
                  'export_content_viewed_by_source_report.xlsx',
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
              loading={listContentViewedBySourceLoading}
              loadingRowsCount={3}
              columns={columns}
              rows={listContentViewedBySource.rows}
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
          (*)List of content with the page where the user come from.
        </Typography>
      </Grid>
    </Grid>
  );
}

UsersNavigation.propTypes = {
  dispatchListContentViewedBySource: PropTypes.func,
  listContentViewedBySource: PropTypes.object,
  listContentViewedBySourceLoading: PropTypes.bool,
  dispatchExportTable: PropTypes.func,
  language: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  listContentViewedBySource: makeSelectListContentViewedBySource(),
  listContentViewedBySourceLoading: makeSelectListContentViewedBySourceLoading(),
  language: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchListContentViewedBySource: (options, cancelToken) =>
      dispatch(listContentViewedBySourceAction(options, cancelToken)),
    dispatchExportTable: options => dispatch(exportTable(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UsersNavigation);

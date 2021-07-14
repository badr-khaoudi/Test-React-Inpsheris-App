/**
 *
 * WidgetVideoViewedByUser
 *
 */

import React, { memo, useEffect, useRef, useState } from 'react';
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
  makeSelectViewActivityWidgetVideo,
  makeSelectViewActivityWidgetVideoLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { viewActivityWidgetVideo as viewActivityWidgetVideoAction } from './actions';
// import messages from './messages';

const columns = [
  {
    field: 'widgetName',
    label: 'Widget name',
    width: 150,
  },
  {
    field: 'videoName',
    label: 'Video name',
    width: 150,
  },
  {
    field: 'videoSource',
    label: 'Video source',
    width: 150,
  },
  {
    field: 'communityName',
    label: 'Community name',
    width: 150,
  },
  {
    field: 'totalUniqueCount',
    label: 'Total users viewed',
    width: 150,
  },
  {
    field: 'total',
    label: 'Total viewed',
    width: 150,
  },
];

export function WidgetVideoViewedByUser(props) {
  useInjectReducer({ key: 'widgetVideoViewedByUser', reducer });
  useInjectSaga({ key: 'widgetVideoViewedByUser', saga });

  const cancelToken = useRef();
  const [period, setPeriod] = useState('thisweek');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const {
    dispatchViewActivityWidgetVideo,
    viewActivityWidgetVideo,
    viewActivityWidgetVideoLoading,
    dispatchExportTable,
    language,
  } = props;

  useEffect(() => {
    if (
      (period === 'choosedate' && startDate && endDate) ||
      period !== 'choosedate'
    ) {
      cancelToken.current = axios.CancelToken.source();
      dispatchViewActivityWidgetVideo(
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
      );
    }
    return () => cancelToken.current.cancel();
  }, [period, startDate, endDate]);

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
                    reportType: 'widgetvideo',
                    startDate,
                  },
                  'export_widget_video_activity_report.xlsx',
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
              loading={viewActivityWidgetVideoLoading}
              loadingRowsCount={3}
              columns={columns}
              rows={viewActivityWidgetVideo}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>
              {`(*)This report be used to collect number of times that users
              viewed widget's video.`}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

WidgetVideoViewedByUser.propTypes = {
  dispatchViewActivityWidgetVideo: PropTypes.func,
  viewActivityWidgetVideo: PropTypes.object,
  viewActivityWidgetVideoLoading: PropTypes.bool,
  dispatchExportTable: PropTypes.func,
  language: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  viewActivityWidgetVideo: makeSelectViewActivityWidgetVideo(),
  viewActivityWidgetVideoLoading: makeSelectViewActivityWidgetVideoLoading(),
  language: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchViewActivityWidgetVideo: (options, cancelToken) =>
      dispatch(viewActivityWidgetVideoAction(options, cancelToken)),
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
)(WidgetVideoViewedByUser);

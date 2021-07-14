/**
 *
 * SessionsByOrigin
 *
 */

import React, { memo, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid, TextField, Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { KeyboardDatePicker } from '@material-ui/pickers';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { periodOptions } from 'utils/constants/periodOptions';
import { baseOptions } from 'containers/Statistics/options';
import { LoadingIndicator } from 'containers/Statistics/LoadingIndicator';
import {
  makeSelectCountCommunityMemberConnection,
  makeSelectCountCommunityMemberConnectionLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { countCommunityMemberConnection as countCommunityMemberConnectionAction } from './actions';

export function SessionsByOrigin(props) {
  useInjectReducer({ key: 'sessionsByOrigin', reducer });
  useInjectSaga({ key: 'sessionsByOrigin', saga });

  const {
    dispatchCountCommunityMemberConnection,
    countCommunityMemberConnection,
    countCommunityMemberConnectionLoading,
  } = props;

  const [period, setPeriod] = useState('thisweek');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const cancelToken = useRef();

  useEffect(() => {
    if (period !== 'choosedate') {
      cancelToken.current = axios.CancelToken.source();
      dispatchCountCommunityMemberConnection(
        { period, viewingFrom: 'home' },
        cancelToken.current.token,
      );
    }
    return () => cancelToken.current.cancel();
  }, [period]);

  useEffect(() => {
    if (startDate && endDate) {
      cancelToken.current = axios.CancelToken.source();
      dispatchCountCommunityMemberConnection(
        {
          period,
          viewingFrom: 'home',
          startDate: moment(startDate).format('DD/MM/YYYY'),
          endDate: moment(endDate).format('DD/MM/YYYY'),
        },
        cancelToken.current.token,
      );
    }
    return () => cancelToken.current.cancel();
  }, [startDate, endDate]);

  const options = {
    ...baseOptions,
    chart: {
      type: 'bar',
      height:
        _.size(countCommunityMemberConnection.communityNames) < 2
          ? 400
          : _.size(countCommunityMemberConnection.communityNames) * 100,
    },
    legend: {
      align: 'center',
      verticalAlign: 'top',
    },
    title: {
      text: 'Community listing to which users belongs to',
    },
    xAxis: {
      categories: countCommunityMemberConnection.communityNames,
      title: {
        text: null,
      },
    },
    yAxis: {
      title: {
        text: null,
      },
      labels: {
        step: 2,
      },
    },
    series: [
      {
        name: 'Contributors',
        data: countCommunityMemberConnection.contributorSeries,
      },
      {
        name: 'Followers',
        data: countCommunityMemberConnection.followerSeries,
      },
      {
        name: 'Total',
        data: countCommunityMemberConnection.totalSeries,
      },
    ],
  };

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
        {countCommunityMemberConnectionLoading && <LoadingIndicator />}
        {!_.isEmpty(countCommunityMemberConnection) && (
          <HighchartsReact highcharts={Highcharts} options={options} />
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography>
          (*)Number of users sessions sorted by communities they belong to.
        </Typography>
      </Grid>
    </Grid>
  );
}

SessionsByOrigin.propTypes = {
  dispatchCountCommunityMemberConnection: PropTypes.func,
  countCommunityMemberConnection: PropTypes.func,
  countCommunityMemberConnectionLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  countCommunityMemberConnection: makeSelectCountCommunityMemberConnection(),
  countCommunityMemberConnectionLoading: makeSelectCountCommunityMemberConnectionLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCountCommunityMemberConnection: (options, cancelToken) =>
      dispatch(countCommunityMemberConnectionAction(options, cancelToken)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SessionsByOrigin);

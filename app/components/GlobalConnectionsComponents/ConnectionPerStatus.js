/**
 *
 * ConnectionPerStatus
 *
 */

import React, { memo, useEffect, useRef } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import moment from 'moment';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// import { FormattedMessage } from 'react-intl';
import { LoadingIndicator } from 'containers/Statistics/LoadingIndicator';
import { countByStatus as countByStatusAction } from 'containers/GlobalConnections/actions';
import {
  makeSelectCountByStatus,
  makeSelectGlobalConnectionsLoading,
} from 'containers/GlobalConnections/selectors';
import { timeSeriesZoomableOptions } from 'containers/Statistics/options';
// import messages from './messages';

function ConnectionPerStatus() {
  const dispatch = useDispatch();
  const cancelToken = useRef();
  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    dispatch(
      countByStatusAction({ viewingFrom: 'home' }, cancelToken.current.token),
    );
    return () => cancelToken.current.cancel();
  }, []);
  const countByStatus = useSelector(makeSelectCountByStatus());
  const globalConnectionsLoading = useSelector(
    makeSelectGlobalConnectionsLoading(),
  );
  const options = {
    ...timeSeriesZoomableOptions,
    title: {
      text: `${moment(countByStatus.startDate).format(
        'DD MMM YYYY',
      )} - ${moment(countByStatus.endDate).format(
        'DD MMM YYYY',
      )} <br/> Connection per status`,
    },
    series: _.map(countByStatus.connectionSeries, series => ({
      name: series.name,
      data: series.connectionCount,
      pointStart: parseFloat(moment(countByStatus.startDate).format('x')),
      pointInterval: 24 * 3600 * 1000,
    })),
  };

  return (
    <>
      {globalConnectionsLoading && <LoadingIndicator />}
      {!_.isEmpty(countByStatus) && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </>
  );
}

ConnectionPerStatus.propTypes = {};

export default memo(ConnectionPerStatus);

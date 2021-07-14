/**
 *
 * ConnectionsPerDepartment
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
import { countByDepartment as countByDepartmentAction } from 'containers/GlobalConnections/actions';
import { LoadingIndicator } from 'containers/Statistics/LoadingIndicator';
import {
  makeSelectCountByDepartment,
  makeSelectGlobalConnectionsLoading,
} from 'containers/GlobalConnections/selectors';
import { timeSeriesZoomableOptions } from 'containers/Statistics/options';
// import messages from './messages';

function ConnectionsPerDepartment() {
  const dispatch = useDispatch();
  const cancelToken = useRef();
  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    dispatch(
      countByDepartmentAction(
        { viewingFrom: 'home' },
        cancelToken.current.token,
      ),
    );
    return () => cancelToken.current.cancel();
  }, []);
  const countByDepartment = useSelector(makeSelectCountByDepartment());
  const globalConnectionsLoading = useSelector(
    makeSelectGlobalConnectionsLoading(),
  );
  const options = {
    ...timeSeriesZoomableOptions,
    title: {
      text: `${moment(countByDepartment.startDate).format(
        'DD MMM YYYY',
      )} - ${moment(countByDepartment.endDate).format(
        'DD MMM YYYY',
      )} <br/> Connections per department`,
    },
    series: _.map(countByDepartment.connectionSeries, series => ({
      name: series.name,
      data: series.connectionCount,
      pointStart: parseFloat(moment(countByDepartment.startDate).format('x')),
      pointInterval: 24 * 3600 * 1000,
    })),
  };

  return (
    <>
      {globalConnectionsLoading && <LoadingIndicator />}
      {!_.isEmpty(countByDepartment) && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </>
  );
}

ConnectionsPerDepartment.propTypes = {};

export default memo(ConnectionsPerDepartment);

/**
 *
 * SessionsByStatus
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
import { countByCommunityStatus as countByCommunityStatusAction } from 'containers/GlobalConnections/actions';
import {
  makeSelectCountByCommunityStatus,
  makeSelectGlobalConnectionsLoading,
} from 'containers/GlobalConnections/selectors';
import { timeSeriesZoomableOptions } from 'containers/Statistics/options';
// import messages from './messages';

function SessionsByStatus() {
  const dispatch = useDispatch();
  const cancelToken = useRef();
  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    dispatch(
      countByCommunityStatusAction(
        { viewingFrom: 'home' },
        cancelToken.current.token,
      ),
    );
    return () => cancelToken.current.cancel();
  }, []);
  const countByCommunityStatus = useSelector(
    makeSelectCountByCommunityStatus(),
  );
  const globalConnectionsLoading = useSelector(
    makeSelectGlobalConnectionsLoading(),
  );
  const options = {
    ...timeSeriesZoomableOptions,
    title: {
      text: `${moment(countByCommunityStatus.startDate).format(
        'DD MMM YYYY',
      )} - ${moment(countByCommunityStatus.endDate).format(
        'DD MMM YYYY',
      )} <br/> Sessions by status`,
    },
    series: _.map(countByCommunityStatus.connectionSeries, series => ({
      name: series.name,
      data: series.connectionCount,
      pointStart: parseFloat(
        moment(countByCommunityStatus.startDate).format('x'),
      ),
      pointInterval: 24 * 3600 * 1000,
    })),
  };

  return (
    <>
      {globalConnectionsLoading && <LoadingIndicator />}
      {!_.isEmpty(countByCommunityStatus) && (
        <HighchartsReact highcharts={Highcharts} options={options} />
      )}
    </>
  );
}

SessionsByStatus.propTypes = {};

export default memo(SessionsByStatus);

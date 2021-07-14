/**
 *
 * GlobalContent
 *
 */

import React, { memo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Grid, Typography } from '@material-ui/core';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { timeSeriesZoomableOptions } from 'containers/Statistics/options';
import { LoadingIndicator } from 'containers/Statistics/LoadingIndicator';
import {
  makeSelectCountContentCreatedByDate,
  makeSelectCountContentCreatedByDateLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { countContentCreatedByDate as countContentCreatedByDateAction } from './actions';

export function GlobalContent(props) {
  useInjectReducer({ key: 'globalContent', reducer });
  useInjectSaga({ key: 'globalContent', saga });

  const {
    dispatchCountContentCreatedByDate,
    countContentCreatedByDate,
    countContentCreatedByDateLoading,
  } = props;

  const cancelToken = useRef();

  useEffect(() => {
    cancelToken.current = axios.CancelToken.source();
    dispatchCountContentCreatedByDate(
      { viewingFrom: 'home' },
      cancelToken.current.token,
    );
    return () => cancelToken.current.cancel();
  }, []);

  const options = {
    ...timeSeriesZoomableOptions,
    title: {
      text: `${moment(countContentCreatedByDate.startDate).format(
        'DD MMM YYYY',
      )} - ${moment(countContentCreatedByDate.endDate).format(
        'DD MMM YYYY',
      )} <br/> Global content creation`,
    },
    series: [
      {
        name: 'Articles',
        data: countContentCreatedByDate.articleSeries,
        pointStart: parseFloat(
          moment(countContentCreatedByDate.startDate).format('x'),
        ),
        pointInterval: 24 * 3600 * 1000,
      },
      {
        name: 'Comments',
        data: countContentCreatedByDate.commentSeries,
        pointStart: parseFloat(
          moment(countContentCreatedByDate.startDate).format('x'),
        ),
        pointInterval: 24 * 3600 * 1000,
      },
      {
        name: 'Documents',
        data: countContentCreatedByDate.documentSeries,
        pointStart: parseFloat(
          moment(countContentCreatedByDate.startDate).format('x'),
        ),
        pointInterval: 24 * 3600 * 1000,
      },
      {
        name: 'Events',
        data: countContentCreatedByDate.eventSeries,
        pointStart: parseFloat(
          moment(countContentCreatedByDate.startDate).format('x'),
        ),
        pointInterval: 24 * 3600 * 1000,
      },
      {
        name: 'Image gallery',
        data: countContentCreatedByDate.imageGallerySeries,
        pointStart: parseFloat(
          moment(countContentCreatedByDate.startDate).format('x'),
        ),
        pointInterval: 24 * 3600 * 1000,
      },
      {
        name: 'Quick posts',
        data: countContentCreatedByDate.quickpostSeries,
        pointStart: parseFloat(
          moment(countContentCreatedByDate.startDate).format('x'),
        ),
        pointInterval: 24 * 3600 * 1000,
      },
      {
        name: 'Shares',
        data: countContentCreatedByDate.sharedContentSeries,
        pointStart: parseFloat(
          moment(countContentCreatedByDate.startDate).format('x'),
        ),
        pointInterval: 24 * 3600 * 1000,
      },
    ],
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {countContentCreatedByDateLoading && <LoadingIndicator />}
        {!_.isEmpty(countContentCreatedByDate) && (
          <HighchartsReact highcharts={Highcharts} options={options} />
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography>
          (*)Evolution of the number of created and published contents.
        </Typography>
      </Grid>
    </Grid>
  );
}

GlobalContent.propTypes = {
  dispatchCountContentCreatedByDate: PropTypes.func,
  countContentCreatedByDate: PropTypes.object,
  countContentCreatedByDateLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  countContentCreatedByDate: makeSelectCountContentCreatedByDate(),
  countContentCreatedByDateLoading: makeSelectCountContentCreatedByDateLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCountContentCreatedByDate: (options, cancelToken) =>
      dispatch(countContentCreatedByDateAction(options, cancelToken)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(GlobalContent);

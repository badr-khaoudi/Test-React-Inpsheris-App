/**
 *
 * ContentPerCommunities
 *
 */

import React, { memo, useEffect, useRef, useState } from 'react';
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
  countContentCreatedByCommunity as countContentCreatedByCommunityAction,
  countContentCreatedByCommunityTable as countContentCreatedByCommunityTableAction,
} from 'containers/CommunityStatistics/actions';
import { LoadingIndicator } from 'containers/Statistics/LoadingIndicator';
import { baseOptions } from 'containers/Statistics/options';
import {
  makeSelectCountContentCreatedByCommunity,
  makeSelectCountContentCreatedByCommunityTable,
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
    width: 200,
    label: 'Community name',
  },
  {
    field: 'total',
    width: 100,
    label: 'Total',
  },
  {
    field: 'articleCount',
    width: 100,
    label: 'Articles',
  },
  {
    field: 'commentCount',
    width: 100,
    label: 'Comments',
  },
  {
    field: 'documentCount',
    width: 100,
    label: 'Documents',
  },
  {
    field: 'eventCount',
    width: 100,
    label: 'Events',
  },
  {
    field: 'imageGalleryCount',
    width: 100,
    label: 'Image gallery',
  },
  {
    field: 'likeCount',
    width: 100,
    label: 'Likes',
  },
  {
    field: 'quickpostCount',
    width: 100,
    label: 'Quick posts',
  },
  {
    field: 'sharedContentCount',
    width: 100,
    label: 'Shared contents',
  },
  {
    field: 'uniqueViewsOfAllTabsCount',
    width: 100,
    label: 'Unique views of all tabs',
  },
];

function ContentPerCommunities() {
  const dispatch = useDispatch();
  const language = useSelector(makeSelectLocale());
  const cancelToken = useRef();
  const [type, setType] = useState('chart');
  const [period, setPeriod] = useState('thisweek');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    if (
      (period === 'choosedate' && startDate && endDate) ||
      period !== 'choosedate'
    ) {
      cancelToken.current = axios.CancelToken.source();
      if (type === 'chart') {
        dispatch(
          countContentCreatedByCommunityAction(
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
      if (type === 'table') {
        dispatch(
          countContentCreatedByCommunityTableAction(
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
    }
    return () => cancelToken.current.cancel();
  }, [type, period, startDate, endDate]);

  const countContentCreatedByCommunity = useSelector(
    makeSelectCountContentCreatedByCommunity(),
  );
  const countContentCreatedByCommunityTable = useSelector(
    makeSelectCountContentCreatedByCommunityTable(),
  );
  const communityStatisticsLoading = useSelector(
    makeSelectCountCommunityStatisticsLoading(),
  );

  const options = {
    ...baseOptions,
    chart: {
      type: 'bar',
      height:
        _.size(countContentCreatedByCommunity.communityNames) < 2
          ? 400
          : _.size(countContentCreatedByCommunity.communityNames) * 150,
    },
    legend: {
      align: 'center',
      verticalAlign: 'top',
    },
    title: {
      text: 'Content creation per community',
    },
    xAxis: {
      categories: countContentCreatedByCommunity.communityNames,
      title: {
        text: null,
      },
    },
    yAxis: {
      title: {
        text: null,
      },
    },
    series: [
      {
        name: 'Articles',
        data: countContentCreatedByCommunity.articleSeries,
      },
      {
        name: 'Comments',
        data: countContentCreatedByCommunity.commentSeries,
      },
      {
        name: 'Documents',
        data: countContentCreatedByCommunity.documentSeries,
      },
      {
        name: 'Events',
        data: countContentCreatedByCommunity.eventSeries,
      },
      {
        name: 'Image gallery',
        data: countContentCreatedByCommunity.imageGallerySeries,
      },
      {
        name: 'Likes',
        data: countContentCreatedByCommunity.likeSeries,
      },
      {
        name: 'Quick posts',
        data: countContentCreatedByCommunity.quickpostSeries,
      },
      {
        name: 'Shared contents',
        data: countContentCreatedByCommunity.sharedContentSeries,
      },
      {
        name: 'Unique views of all tabs',
        data: countContentCreatedByCommunity.uniqueViewsOfAllTabsSeries,
      },
      {
        name: 'Total',
        data: countContentCreatedByCommunity.totalSeries,
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
        {type === 'chart' && (
          <>
            {communityStatisticsLoading && <LoadingIndicator />}
            {!_.isEmpty(countContentCreatedByCommunity) && (
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
                        reportType: 'contentpercommunity',
                        startDate,
                      },
                      'export_content_created_and_published_on_community_counting_report.xlsx',
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
                rows={countContentCreatedByCommunityTable.rows}
              />
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography>
          (*)Evolution of the number of created and published contents by
          communities.
        </Typography>
      </Grid>
    </Grid>
  );
}

ContentPerCommunities.propTypes = {};

export default memo(ContentPerCommunities);

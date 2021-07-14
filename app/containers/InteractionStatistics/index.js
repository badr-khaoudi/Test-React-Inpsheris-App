/**
 *
 * InteractionStatistics
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
  makeSelectListCommentLike,
  makeSelectListCommentLikeLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { listCommentLike as listCommentLikeAction } from './actions';

const columns = [
  {
    field: 'contentTitle',
    label: 'Content name',
    sort: true,
    width: 200,
  },
  {
    field: 'communityName',
    label: 'Content community',
    sort: true,
    width: 200,
  },
  {
    field: 'communityTabName',
    label: 'Tab name',
    sort: true,
    width: 100,
  },
  {
    field: 'contentType',
    label: 'Content type',
    sort: true,
    width: 150,
  },
  {
    field: 'commentCount',
    label: 'Number of comments',
    sort: true,
    width: 100,
  },
  {
    field: 'likeCount',
    label: 'Number of likes',
    sort: true,
    width: 100,
  },
  {
    field: 'sharedContentCount',
    label: 'Number of shares',
    sort: true,
    width: 100,
  },
  {
    field: 'downloadCount',
    label: 'Number of downloads',
    sort: true,
    width: 100,
  },
  {
    field: 'totalUniqueCount',
    label: 'Total unique visit',
    sort: true,
    width: 100,
  },
  {
    field: 'contentAuthor',
    label: 'Author',
    sort: true,
    width: 150,
  },
  {
    field: 'userCompany',
    label: `Author's company`,
    sort: true,
    width: 100,
  },
  {
    field: 'userService',
    label: `Author's service`,
    sort: true,
    width: 100,
  },
  {
    field: 'contentDateOfModification',
    label: 'Date of publication',
    sort: true,
    width: 150,
    render: date => moment(date).format('DD MMM YYYY, HH:mm'),
  },
  {
    field: 'contentDateOfPublication',
    label: 'Date of last modification',
    sort: true,
    width: 150,
    render: date => moment(date).format('DD MMM YYYY, HH:mm'),
  },
];

export function InteractionStatistics(props) {
  useInjectReducer({ key: 'interactionStatistics', reducer });
  useInjectSaga({ key: 'interactionStatistics', saga });

  const cancelToken = useRef();
  const [period, setPeriod] = useState('thisweek');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const {
    dispatchListCommentLike,
    listCommentLike,
    listCommentLikeLoading,
    dispatchExportTable,
    language,
  } = props;

  useEffect(() => {
    if (
      (period === 'choosedate' && startDate && endDate) ||
      period !== 'choosedate'
    ) {
      cancelToken.current = axios.CancelToken.source();
      dispatchListCommentLike(
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
    if (listCommentLike.total && listCommentLike.total !== total) {
      setTotal(listCommentLike.total);
    }
  }, [listCommentLike]);

  const handleTableChange = useCallback(
    ({ page, itemsPerPage, sortField, sortKey, token }) => {
      dispatchListCommentLike(
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
                    reportType: 'commentlike',
                    startDate,
                  },
                  'export_comment_like_report.xlsx',
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
              loading={listCommentLikeLoading}
              loadingRowsCount={3}
              columns={columns}
              rows={listCommentLike.rows}
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
          (*)Number of comments and number of likes of content.
        </Typography>
      </Grid>
    </Grid>
  );
}

InteractionStatistics.propTypes = {
  dispatchListCommentLike: PropTypes.func,
  listCommentLike: PropTypes.object,
  listCommentLikeLoading: PropTypes.bool,
  dispatchExportTable: PropTypes.func,
  language: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  listCommentLike: makeSelectListCommentLike(),
  listCommentLikeLoading: makeSelectListCommentLikeLoading(),
  language: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchListCommentLike: (options, cancelToken) =>
      dispatch(listCommentLikeAction(options, cancelToken)),
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
)(InteractionStatistics);

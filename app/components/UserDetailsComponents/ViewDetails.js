/**
 *
 * ViewDetails
 *
 */

import React, {
  memo,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import moment from 'moment';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
// import { FormattedMessage } from 'react-intl';
import { Dialog, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { GetApp, Close } from '@material-ui/icons';
import { viewDetails as viewDetailsAction } from 'containers/UserDetails/actions';
import {
  makeSelectViewDetails,
  makeSelectViewDetailsLoading,
} from 'containers/UserDetails/selectors';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { exportTable } from 'containers/Statistics/actions';
import DataTable from 'components/DataTable/Loadable';
// import messages from './messages';

const publishColumns = [
  {
    field: 'type',
    label: 'Type',
  },
  {
    field: 'count',
    label: 'Number of publications',
  },
];

// const viewColumns = [
//   {
//     field: 'contentTitle',
//     label: 'Content name',
//     sort: true,
//     width: 300,
//   },
//   {
//     field: 'communityName',
//     label: 'Content community',
//     sort: true,
//   },
//   {
//     field: 'contentType',
//     label: 'Content type',
//     sort: true,
//   },
//   {
//     field: 'contentViewedByHomeCount',
//     label: 'Home NF',
//     sort: true,
//   },
//   {
//     field: 'contentViewedByCommunityCount',
//     label: 'Community NF',
//     sort: true,
//   },
//   {
//     field: 'contentViewedByTabCount',
//     label: 'Tab NF',
//     sort: true,
//   },
//   {
//     field: 'totalUniqueCount',
//     label: 'Total',
//     sort: true,
//   },
// ];

// const likeColumns = [
//   {
//     field: 'contentTitle',
//     label: 'Content name',
//     sort: true,
//   },
//   {
//     field: 'communityName',
//     label: 'Content community',
//     sort: true,
//   },
//   {
//     field: 'communityName',
//     label: 'Content community',
//     sort: true,
//   },
//   {
//     field: 'contentType',
//     label: 'Content type',
//     sort: true,
//   },
// ];

// const commentColumns = [
//   {
//     field: 'contentTitle',
//     label: 'Content name',
//     sort: true,
//   },
//   {
//     field: 'communityName',
//     label: 'Content community',
//     sort: true,
//   },
//   {
//     field: 'contentType',
//     label: 'Content type',
//     sort: true,
//   },
//   {
//     field: 'commentCount',
//     label: 'Number of comments',
//     sort: true,
//   },
// ];

const shareColumns = [
  {
    field: 'contentTitle',
    label: 'Content name',
    sort: true,
  },
  {
    field: 'communityName',
    label: 'Content community',
    sort: true,
  },
  {
    field: 'contentType',
    label: 'Content type',
    sort: true,
  },
  {
    field: 'sharedContentCount',
    label: 'Number of shares',
    sort: true,
  },
];

// const downloadColumns = [
//   {
//     field: 'contentTitle',
//     label: 'Content name',
//     sort: true,
//   },
//   {
//     field: 'communityName',
//     label: 'Content community',
//     sort: true,
//   },
//   {
//     field: 'contentType',
//     label: 'Content type',
//     sort: true,
//   },
//   {
//     field: 'downloadCount',
//     label: 'Number of downloads',
//     sort: true,
//   },
// ];

function ViewDetails(props) {
  const { action, userUid, period, startDate, endDate, handleClose } = props;
  const dispatch = useDispatch();
  const language = useSelector(makeSelectLocale());
  const cancelToken = useRef();

  useEffect(() => {
    if (
      (period === 'choosedate' && startDate && endDate) ||
      period !== 'choosedate'
    ) {
      cancelToken.current = axios.CancelToken.source();
      dispatch(
        viewDetailsAction(
          {
            userUid,
            action,
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
        ),
      );
    }
    return () => cancelToken.current.cancel();
  }, []);

  const handleTableChange = useCallback(
    ({ page, itemsPerPage, sortField, sortKey, token }) => {
      dispatch(
        viewDetailsAction(
          {
            userUid,
            action,
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
        ),
      );
    },
    [],
  );

  const viewDetails = useSelector(makeSelectViewDetails());
  const viewDetailsLoading = useSelector(makeSelectViewDetailsLoading());

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (viewDetails.total && viewDetails.total !== total) {
      setTotal(viewDetails.total);
    }
  }, [viewDetails]);

  const dataTableProps = useMemo(
    () => ({
      containerStyles: { height: '50vh' },
      loading: viewDetailsLoading,
      loadingRowsCount: 3,
      handleTableChange,
      pagination: true,
      total,
      defaultItemsPerPage: 20,
    }),
    [viewDetailsLoading, total],
  );

  return (
    <Dialog open onClose={handleClose} scroll="paper" fullWidth maxWidth="md">
      <DialogTitle>
        {action}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{ position: 'absolute', top: 5, right: 5 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  startIcon={<GetApp />}
                  onClick={() =>
                    dispatch(
                      exportTable(
                        {
                          action,
                          userUid,
                          endDate,
                          language,
                          period,
                          startDate,
                        },
                        'export_user_details_by_action_report.xlsx',
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
                {action === 'publish' && (
                  <DataTable
                    columns={publishColumns}
                    rows={
                      viewDetails.rows
                        ? _.first(viewDetails.rows).typesOfContentCount
                        : []
                    }
                    {...dataTableProps}
                  />
                )}
                {action === 'share' && (
                  <DataTable
                    columns={shareColumns}
                    rows={viewDetails.rows}
                    {...dataTableProps}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

ViewDetails.propTypes = {
  action: PropTypes.string,
  userUid: PropTypes.string,
  period: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  handleClose: PropTypes.func,
};

export default memo(ViewDetails);

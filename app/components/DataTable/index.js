/* eslint-disable indent */
/**
 *
 * DataTable
 *
 */

import React, { memo, useMemo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import _ from 'lodash';
import axios from 'axios';
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import TablePaginationActions from 'components/TablePaginationActions/Loadable';
import { useEffectAfterMount } from 'utils/helpers/useEffectAfterMount';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

const useStyles = makeStyles(() => ({
  root: {
    overflowWrap: 'break-word',
  },
}));

function DataTable(props) {
  const {
    containerStyles,
    total,
    loading,
    loadingRowsCount,
    columns,
    rows,
    pagination,
    handleTableChange,
    defaultItemsPerPage,
  } = props;

  const classes = useStyles();

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage || 20);
  const [sortField, setSortField] = useState(undefined);
  const [sortKey, setSortKey] = useState(undefined);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = event => {
    setItemsPerPage(event.target.value);
    setPage(1);
  };

  const handleSort = field => {
    const isAsc = sortField === field && sortKey === 'asc';
    setSortField(field);
    setSortKey(isAsc ? 'desc' : 'asc');
  };

  const cancelToken = useRef();

  useEffectAfterMount(() => {
    if (handleTableChange !== undefined) {
      cancelToken.current = axios.CancelToken.source();
      handleTableChange({
        page,
        itemsPerPage,
        sortField,
        sortKey,
        token: cancelToken.current.token,
      });
    }
    return () => cancelToken.current.cancel();
  }, [page, itemsPerPage, sortField, sortKey]);

  const calcHeight = useMemo(
    () => (pagination ? 'calc(100% - 52px)' : '100%'),
    [],
  );

  return (
    <TableContainer component={Paper} style={containerStyles || null}>
      <div style={{ height: calcHeight, width: '100%', overflow: 'auto' }}>
        <Table style={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              {_.map(columns, column =>
                column.sort ? (
                  <TableCell
                    key={column.field}
                    sortDirection={sortField === column.field ? sortKey : false}
                    style={column.width ? { width: column.width } : null}
                  >
                    <TableSortLabel
                      active={sortField === column.field}
                      direction={sortField === column.field ? sortKey : 'asc'}
                      onClick={() => handleSort(column.field)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ) : (
                  <TableCell
                    key={column.field}
                    style={column.width ? { width: column.width } : null}
                  >
                    {column.label}
                  </TableCell>
                ),
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading &&
              _.map(_.range(loadingRowsCount), i => (
                <TableRow key={i}>
                  {_.map(_.range(_.size(columns)), j => (
                    <TableCell key={j}>
                      <Skeleton variant="text" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            {rows &&
              !_.isEmpty(rows) &&
              _.map(rows, (row, index) => (
                <TableRow hover key={index}>
                  {_.map(columns, column => (
                    <TableCell
                      className={classes.root}
                      key={`${index}${column.field}`}
                    >
                      {column.render
                        ? column.render(
                            column.renderKeys
                              ? _.map(column.renderKeys, key => row[key])
                              : row[column.field],
                          )
                        : row[column.field]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      {pagination && total > 0 && (
        <TablePagination
          component="div"
          rowsPerPageOptions={[20, 30, 50, 70, 100]}
          page={page - 1}
          count={total}
          rowsPerPage={itemsPerPage}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActions}
        />
      )}
    </TableContainer>
  );
}

DataTable.propTypes = {
  containerStyles: PropTypes.object,
  total: PropTypes.number,
  loading: PropTypes.bool,
  loadingRowsCount: PropTypes.number,
  columns: PropTypes.array,
  rows: PropTypes.array,
  pagination: PropTypes.bool,
  handleTableChange: PropTypes.func,
  defaultItemsPerPage: PropTypes.number,
};

export default memo(DataTable);

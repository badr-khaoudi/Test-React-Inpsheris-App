/**
 *
 * Digest
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import Switch from '@material-ui/core/Switch';
import { Close, Edit, Delete } from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';
import { useConfirm } from 'material-ui-confirm';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useCloseEffect } from 'utils/helpers/useCloseEffect';
import CommunityAvatar from 'components/CommunityAvatar';
import {
  closeDigest,
  createDigest,
  editDigest,
} from 'containers/AuthBase/actions';
import TablePaginationActions from 'components/TablePaginationActions/Loadable';
import {
  makeSelectDigestList,
  makeSelectDigest,
  makeSelectDigestListLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  digestList as digestListAction,
  activateDigest,
  deleteDigest,
} from './actions';
// import messages from './messages';

export function Digest(props) {
  useInjectReducer({ key: 'digest', reducer });
  useInjectSaga({ key: 'digest', saga });

  const confirm = useConfirm();

  const {
    dispatchDigestList,
    digestList,
    digest,
    dispatchActivateDigest,
    dispatchCloseDigest,
    dispatchCreateDigest,
    dispatchEditDigest,
    dispatchDeleteDigest,
    digestListLoading,
  } = props;

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(20);
  const [sortField, setSortField] = useState(undefined);
  const [sortKey, setSortKey] = useState(undefined);

  useEffect(() => {
    dispatchDigestList({
      format: 'list',
      page,
      size,
      sortField,
      sortKey,
    });
  }, [page, size, sortField, sortKey]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (digestList.total && digestList.total !== total) {
      setTotal(digestList.total);
    }
  }, [digestList]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = event => {
    setSize(event.target.value);
    setPage(1);
  };

  const handleSort = field => {
    const isAsc = sortField === field && sortKey === 'asc';
    setSortField(field);
    setSortKey(isAsc ? 'desc' : 'asc');
  };

  useCloseEffect(dispatchCloseDigest);

  const handleDelete = async id => {
    try {
      await confirm({
        description: 'Are you sure, you want to delete this digest?',
      });
      dispatchDeleteDigest({ id });
    } catch {
      return false;
    }
    return false;
  };

  return (
    <>
      <Helmet>
        <title>Digest</title>
        <meta name="description" content="Description of Digest" />
      </Helmet>
      <Dialog
        open
        onClose={dispatchCloseDigest}
        scroll="paper"
        fullWidth
        maxWidth="xl"
        disableEnforceFocus
      >
        <DialogTitle>
          Digest
          <IconButton
            aria-label="close"
            onClick={dispatchCloseDigest}
            style={{ position: 'absolute', top: 5, right: 5 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                onClick={dispatchCreateDigest}
              >
                Create Digest
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Table style={{ tableLayout: 'fixed' }}>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ width: 50 }}>#</TableCell>
                    <TableCell
                      sortDirection={sortField === 'title' ? sortKey : false}
                      style={{ width: 200 }}
                    >
                      <TableSortLabel
                        active={sortField === 'title'}
                        direction={sortField === 'title' ? sortKey : 'asc'}
                        onClick={() => handleSort('title')}
                      >
                        Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell style={{ width: 200 }}>Communities</TableCell>
                    <TableCell
                      sortDirection={sortField === 'status' ? sortKey : false}
                      style={{ width: 100 }}
                    >
                      <TableSortLabel
                        active={sortField === 'status'}
                        direction={sortField === 'status' ? sortKey : 'asc'}
                        onClick={() => handleSort('status')}
                      >
                        Status
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sortDirection={
                        sortField === 'publishedDate' ? sortKey : false
                      }
                      style={{ width: 180 }}
                    >
                      <TableSortLabel
                        active={sortField === 'publishedDate'}
                        direction={
                          sortField === 'publishedDate' ? sortKey : 'asc'
                        }
                        onClick={() => handleSort('publishedDate')}
                      >
                        Published Date
                      </TableSortLabel>
                    </TableCell>
                    <TableCell
                      sortDirection={
                        sortField === 'digestType' ? sortKey : false
                      }
                      style={{ width: 100 }}
                    >
                      <TableSortLabel
                        active={sortField === 'digestType'}
                        direction={sortField === 'digestType' ? sortKey : 'asc'}
                        onClick={() => handleSort('digestType')}
                      >
                        Type
                      </TableSortLabel>
                    </TableCell>
                    <TableCell style={{ width: 100 }}>Repeat</TableCell>
                    <TableCell style={{ width: 100 }}>Jour</TableCell>
                    <TableCell style={{ width: 150 }}>Content Type</TableCell>
                    <TableCell style={{ width: 120 }}>Start Date</TableCell>
                    <TableCell style={{ width: 120 }}>End Date</TableCell>
                    <TableCell
                      sortDirection={sortField === 'active' ? sortKey : false}
                      style={{ width: 160 }}
                    >
                      <TableSortLabel
                        active={sortField === 'active'}
                        direction={sortField === 'active' ? sortKey : 'asc'}
                        onClick={() => handleSort('active')}
                      >
                        Active/ Inactive
                      </TableSortLabel>
                    </TableCell>
                    <TableCell style={{ width: 110 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {digestListLoading &&
                    _.map(_.range(10), i => (
                      <TableRow key={i}>
                        {_.map(_.range(13), j => (
                          <TableCell key={j}>
                            <Skeleton variant="text" />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  {_.map(digest, (row, index) => (
                    <TableRow hover key={row.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        {row.status !== 'Publish' ? (
                          <span
                            onClick={() => dispatchEditDigest(row.id)}
                            onKeyPress={() => dispatchEditDigest(row.id)}
                            role="button"
                            tabIndex="0"
                            style={{ cursor: 'pointer' }}
                          >
                            {row.title}
                          </span>
                        ) : (
                          row.title
                        )}
                      </TableCell>
                      <TableCell>
                        {_.map(row.communities, (community, i) => (
                          <React.Fragment key={community}>
                            <CommunityAvatar
                              variant="Label"
                              communityUid={community}
                            />
                            {i > 0 && i !== _.size(row.communities) - 1 && ', '}
                          </React.Fragment>
                        ))}
                      </TableCell>
                      <TableCell>
                        <Link
                          onClick={dispatchCloseDigest}
                          to={`/digest/${row.id}`}
                        >
                          {row.status}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {moment(row.publishedDate).format('DD MMM YYYY, HH:mm')}
                      </TableCell>
                      <TableCell>{row.digestType}</TableCell>
                      <TableCell>
                        {row.details && row.details.repeatDigest}
                      </TableCell>
                      <TableCell>
                        {row.details &&
                          row.details.days &&
                          row.details.days.join(', ')}
                      </TableCell>
                      <TableCell>
                        {row.details && row.details.digestContentType}
                      </TableCell>
                      <TableCell>
                        {row.details &&
                          moment(row.details.startDate).format('DD MMM YYYY')}
                      </TableCell>
                      <TableCell>
                        {row.details &&
                          moment(row.details.endDate).format('DD MMM YYYY')}
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={row.active}
                          onChange={() =>
                            dispatchActivateDigest(
                              { id: row.id },
                              { active: row.active ? 'N' : 'Y' },
                            )
                          }
                          color="primary"
                        />
                      </TableCell>
                      <TableCell>
                        {row.status !== 'Publish' && (
                          <IconButton
                            edge="start"
                            onClick={() => dispatchEditDigest(row.id)}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                        )}
                        <IconButton onClick={() => handleDelete(row.id)}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {total && (
            <TablePagination
              component="div"
              rowsPerPageOptions={[20, 30, 50, 70, 100]}
              page={page - 1}
              count={total}
              rowsPerPage={size}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

Digest.propTypes = {
  dispatchDigestList: PropTypes.func,
  digestList: PropTypes.object,
  digest: PropTypes.array,
  dispatchActivateDigest: PropTypes.func,
  dispatchCloseDigest: PropTypes.func,
  dispatchCreateDigest: PropTypes.func,
  dispatchEditDigest: PropTypes.func,
  dispatchDeleteDigest: PropTypes.func,
  digestListLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  digestList: makeSelectDigestList(),
  digest: makeSelectDigest(),
  digestListLoading: makeSelectDigestListLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchDigestList: options => dispatch(digestListAction(options)),
    dispatchActivateDigest: (params, options) =>
      dispatch(activateDigest(params, options)),
    dispatchCloseDigest: () => dispatch(closeDigest()),
    dispatchCreateDigest: () => dispatch(createDigest()),
    dispatchEditDigest: options => dispatch(editDigest(options)),
    dispatchDeleteDigest: options => dispatch(deleteDigest(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Digest);

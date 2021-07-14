/* eslint-disable indent */
/**
 *
 * BrowseAll
 *
 */

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  InputAdornment,
  ListItemText,
  Avatar,
  Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { Close, Search, Add, Remove, Info, GetApp } from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TreeView from '@material-ui/lab/TreeView';
import Skeleton from '@material-ui/lab/Skeleton';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { initials } from 'utils/helpers/avatarInitials';
import FileTreeItem from 'components/FileTreeItem';
import {
  getFileType,
  getCommunityList,
  getAuthorList,
  getFileList,
  searchFileList,
  downloadAll,
  getFileListMore,
} from './actions';
import {
  makeSelectFileType,
  makeSelectCommunityList,
  makeSelectAuthorList,
  makeSelectFileList,
  makeSelectFileListLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

export function BrowseAll(props) {
  useInjectReducer({ key: 'browseAll', reducer });
  useInjectSaga({ key: 'browseAll', saga });

  const {
    type: blockType,
    open,
    onClose,
    onOk,
    dispatchGetFileType,
    dispatchGetCommunityList,
    dispatchGetAuthorList,
    dispatchGetFileList,
    dispatchSearchFileList,
    dispatchDownloadAll,
    dispatchGetFileListMore,
    fileType,
    communityList,
    authorList,
    fileList,
    fileListLoading,
  } = props;

  useEffect(() => {
    dispatchGetFileType();
    dispatchGetCommunityList({
      filter: 'lively',
      format: 'list',
      gplusCommunity: 'ALL',
    });
    dispatchGetAuthorList({ isAll: true });
    dispatchGetFileList({
      type: blockType === 'Documents' ? 'document' : 'image',
      page: 1,
      itemsPerPage: 10,
      sortKey: 'asc',
      sortField: 'fileName',
    });
  }, []);

  const [fileSearch, setFileSearch] = useState(undefined);
  const [communityFilter, setCommunityFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const [authorFilter, setAuthorFilter] = useState([]);
  const [dateFrom, setDateFrom] = useState(undefined);
  const [dateTo, setDateTo] = useState(undefined);
  const [isSearch, setIsSearch] = useState(undefined);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const hasFilters = Boolean(
      fileSearch ||
        communityFilter.length ||
        typeFilter.length ||
        authorFilter.length ||
        dateFrom ||
        dateTo,
    );
    setIsSearch(hasFilters);
    if (hasFilters) {
      dispatchSearchFileList({
        isSearch: hasFilters,
        type: blockType === 'Documents' ? 'document' : 'image',
        page: 1,
        itemsPerPage: 10,
        sortKey: 'asc',
        sortField: 'fileName',
        q: fileSearch,
        communityFilter,
        typeFilter,
        authorFilter,
        dateFrom,
        dateTo,
      });
    } else if (isSearch !== undefined) {
      dispatchGetFileList({
        type: blockType === 'Documents' ? 'document' : 'image',
        page: 1,
        itemsPerPage: 10,
        sortKey: 'asc',
        sortField: 'fileName',
      });
    }
  }, [fileSearch, communityFilter, typeFilter, authorFilter, dateFrom, dateTo]);

  useEffect(() => {
    if (page > 1) {
      dispatchGetFileListMore({
        isSearch,
        type: blockType === 'Documents' ? 'document' : 'image',
        page,
        itemsPerPage: 10,
        sortKey: 'asc',
        sortField: 'fileName',
        q: fileSearch,
        communityFilter,
        typeFilter,
        authorFilter,
        dateFrom,
        dateTo,
      });
    }
  }, [page]);

  const [checkedUid, setCheckedUid] = useState([]);
  const [lastChecked, setLastChecked] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    setSelectedFiles(
      _.filter(allFiles, file => _.includes(checkedUid, file.fileUid)),
    );
  }, [checkedUid]);

  const handleChange = useCallback(
    (checked, type, uid) => {
      if (checked) {
        if (type === 'folder') {
          const folder = _.find(folders, { fileUid: uid });
          setLastChecked(folder);
          return setCheckedUid([
            ...checkedUid,
            ..._.map(
              _.find(fileList, { fileUid: uid }).files,
              file => file.fileUid,
            ),
            uid,
          ]);
        }
        setLastChecked(_.find(allFiles, { fileUid: uid }));
        return setCheckedUid([...checkedUid, uid]);
      }
      setLastChecked({});
      if (type === 'folder') {
        return setCheckedUid(
          _.without(
            checkedUid,
            ..._.map(
              _.find(fileList, { fileUid: uid }).files,
              file => file.fileUid,
            ),
            uid,
          ),
        );
      }
      return setCheckedUid(_.without(checkedUid, uid));
    },
    [folders, checkedUid, fileList, allFiles],
  );

  const folderChecked = useCallback(
    files =>
      _.every(_.map(files, file => file.fileUid), uid =>
        _.includes(checkedUid, uid),
      ),
    [checkedUid],
  );

  const fileChecked = useCallback(fileUid => _.includes(checkedUid, fileUid), [
    checkedUid,
  ]);

  const renderTree = nodes =>
    _.map(nodes, node => (
      <FileTreeItem
        key={node.fileUid}
        nodeId={node.fileUid}
        fileUid={node.fileUid}
        author={node.author}
        fileModifiedDate={node.fileModifiedDate}
        fileName={node.fileName}
        fileType={node.fileType}
        isExternalFile={node.isExternalFile}
        isGdrive={node.isGdrive}
        handleChange={handleChange}
        checked={
          node.fileType === 'folder'
            ? folderChecked(node.files)
            : fileChecked(node.fileUid)
        }
      >
        {node.fileType === 'folder' && Array.isArray(node.files)
          ? renderTree(node.files, node.fileUid)
          : null}
      </FileTreeItem>
    ));

  const files = list =>
    _.flatten(
      _.map(list, file =>
        file.fileType === 'folder' && Array.isArray(file.files)
          ? files(file.files)
          : file,
      ),
    );

  useEffect(() => {
    setAllFiles(_.uniqBy(files(fileList), 'fileUid'));
    setFolders(
      _.map(fileList, list => ({
        fileUid: list.fileUid,
        fileName: list.fileName,
        fileType: list.fileType,
        fileUids: _.map(list.files, file => file.fileUid),
      })),
    );
  }, [fileList]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll="body"
      fullWidth
      maxWidth="lg"
      disableEnforceFocus
    >
      <DialogTitle>
        {blockType}
        <IconButton
          aria-label="close"
          onClick={onClose}
          style={{ position: 'absolute', top: 5, right: 5 }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={1}>
          <Grid item xs zeroMinWidth>
            File Search
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Search File"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              value={fileSearch}
              onChange={e => setFileSearch(e.target.value)}
            />
          </Grid>
          <Grid item xs>
            Community
            <Autocomplete
              disableCloseOnSelect
              multiple
              onChange={(event, newValue) =>
                setCommunityFilter(_.map(newValue, ({ uid }) => uid))
              }
              options={communityList}
              getOptionLabel={option => option.label}
              renderOption={(option, { selected }) => (
                <>
                  <Checkbox checked={selected} />
                  {option.label}
                </>
              )}
              // renderTags={value =>
              //   _.map(value, ({ label }) => label).join(', ')
              // }
              renderTags={() => null}
              renderInput={params => (
                <TextField
                  placeholder="Select Community"
                  variant="outlined"
                  {...params}
                />
              )}
            />
          </Grid>
          {blockType === 'Documents' && (
            <Grid item xs>
              File Type
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Select Type"
                select
                SelectProps={{
                  multiple: true,
                  renderValue: selected => selected.join(', '),
                  value: typeFilter,
                  onChange: e => setTypeFilter(e.target.value),
                }}
              >
                {_.map(fileType, type => (
                  <MenuItem key={type} value={type} dense>
                    <Checkbox
                      checked={_.indexOf(typeFilter, type) > -1}
                      color="primary"
                    />
                    <ListItemText primary={type} />
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}
          <Grid item xs>
            Uploaded By
            <Autocomplete
              disableCloseOnSelect
              multiple
              onChange={(event, newValue) =>
                setAuthorFilter(_.map(newValue, ({ uid }) => uid))
              }
              options={authorList}
              getOptionLabel={option =>
                `${option.firstName} ${option.lastName}`
              }
              renderOption={(option, { selected }) => (
                <>
                  <Checkbox checked={selected} />
                  <Avatar
                    src={option.headerLogoUrl}
                    style={{ marginRight: 10 }}
                  >
                    {initials([option.firstName, option.lastName])}
                  </Avatar>
                  {`${option.firstName} ${option.lastName}`}
                </>
              )}
              renderTags={() => null}
              renderInput={params => (
                <TextField
                  placeholder="Select Author"
                  variant="outlined"
                  {...params}
                />
              )}
            />
          </Grid>
          <Grid item xs>
            Date
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  format="MMM dd, yyyy"
                  value={dateFrom || null}
                  onChange={date => setDateFrom(date)}
                  autoOk
                  disableFuture
                />
              </Grid>
              <Grid item xs={6}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  format="MMM dd, yyyy"
                  value={dateTo || null}
                  onChange={date => setDateTo(date)}
                  autoOk
                  disableFuture
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Typography variant="h4" gutterBottom>
          All Files
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs>
            <div
              style={{
                display: 'flex',
                padding: 10,
                borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                alignItems: 'center',
              }}
            >
              <div style={{ flex: 1, paddingRight: 10 }}>
                <Typography variant="h6" style={{ fontSize: '1rem' }}>
                  Name
                </Typography>
              </div>
              <div style={{ width: '20%', paddingLeft: 10, paddingRight: 10 }}>
                <Typography variant="h6" style={{ fontSize: '1rem' }}>
                  Uploaded by
                </Typography>
              </div>
              <div style={{ width: '10%', paddingRight: 10 }}>
                <Typography variant="h6" style={{ fontSize: '1rem' }}>
                  Source
                </Typography>
              </div>
              <div style={{ width: '150px' }}>
                <Typography variant="h6" style={{ fontSize: '1rem' }}>
                  Date
                </Typography>
              </div>
            </div>
            {fileList && (
              <TreeView
                defaultCollapseIcon={<Remove />}
                defaultExpandIcon={<Add />}
              >
                {renderTree(fileList)}
              </TreeView>
            )}
            {fileListLoading &&
              _.map(_.range(4), index => (
                <Skeleton
                  key={index}
                  variant="rect"
                  height={45}
                  style={{ marginTop: 5, marginBottom: 5 }}
                />
              ))}
            {isSearch && page * 10 === _.size(fileList) && (
              <Button
                onClick={() => setPage(page + 1)}
                variant="outlined"
                color="primary"
              >
                View More
              </Button>
            )}
          </Grid>
          <Grid item style={{ width: '20%' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '2px dashed rgba(0, 0, 0, 0.12)',
                borderRadius: 5,
                padding: 10,
                backgroundColor: '#EAEEEF',
              }}
            >
              {lastChecked.fileUid ? (
                <>
                  {lastChecked.fileType === 'folder' ? (
                    <>
                      <Button
                        variant="outlined"
                        startIcon={<GetApp />}
                        fullWidth
                        onClick={() =>
                          dispatchDownloadAll({
                            fileName: `${lastChecked.fileName}.zip`,
                            fileUids: lastChecked.fileUids,
                          })
                        }
                      >
                        Download Files
                      </Button>
                      <table style={{ width: '100%' }}>
                        <tbody>
                          <tr>
                            <td>
                              <b>Folder Name:</b>
                            </td>
                            <td>{lastChecked.fileName}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>No of files:</b>
                            </td>
                            <td>{_.size(lastChecked.fileUids)}</td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outlined"
                        startIcon={<GetApp />}
                        fullWidth
                        href={lastChecked.url}
                        download
                      >
                        Download File
                      </Button>
                      <table style={{ width: '100%' }}>
                        <tbody>
                          <tr>
                            <td>
                              <b>File Name:</b>
                            </td>
                            <td style={{ wordBreak: 'break-all' }}>
                              {lastChecked.fileName}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <b>Type:</b>
                            </td>
                            <td>{lastChecked.fileType}</td>
                          </tr>
                          <tr>
                            <td>
                              <b>By:</b>
                            </td>
                            <td>
                              {lastChecked.author &&
                                `${lastChecked.author.firstName} ${
                                  lastChecked.author.lastName
                                }`}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <b>Created:</b>
                            </td>
                            <td>
                              {moment(lastChecked.fileUploadedDate).format(
                                'DD MMM YYYY',
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <b>Last Updated:</b>
                            </td>
                            <td>
                              {moment(lastChecked.fileModifiedDate).format(
                                'DD MMM YYYY',
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <b>Source:</b>
                            </td>
                            <td>
                              {lastChecked.isExternalFile &&
                              lastChecked.isGdrive
                                ? 'GDrive'
                                : 'Local'}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Info fontSize="large" />
                  <Typography>Select a file to view info</Typography>
                </>
              )}
            </div>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onOk(selectedFiles)}
          variant="outlined"
          color="primary"
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

BrowseAll.propTypes = {
  type: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onOk: PropTypes.func,
  dispatchGetFileType: PropTypes.func,
  dispatchGetCommunityList: PropTypes.func,
  dispatchGetAuthorList: PropTypes.func,
  dispatchGetFileList: PropTypes.func,
  dispatchSearchFileList: PropTypes.func,
  dispatchDownloadAll: PropTypes.func,
  dispatchGetFileListMore: PropTypes.func,
  fileType: PropTypes.array,
  communityList: PropTypes.array,
  authorList: PropTypes.array,
  fileList: PropTypes.array,
  downloadLink: PropTypes.string,
  fileListLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  fileType: makeSelectFileType(),
  communityList: makeSelectCommunityList(),
  authorList: makeSelectAuthorList(),
  fileList: makeSelectFileList(),
  fileListLoading: makeSelectFileListLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetFileType: () => dispatch(getFileType()),
    dispatchGetCommunityList: options => dispatch(getCommunityList(options)),
    dispatchGetAuthorList: options => dispatch(getAuthorList(options)),
    dispatchGetFileList: options => dispatch(getFileList(options)),
    dispatchSearchFileList: options => dispatch(searchFileList(options)),
    dispatchDownloadAll: options => dispatch(downloadAll(options)),
    dispatchGetFileListMore: options => dispatch(getFileListMore(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(BrowseAll);

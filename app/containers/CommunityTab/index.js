/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * CommunityTab
 *
 */

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { initials } from 'utils/helpers/avatarInitials';
import FeedP2V8 from 'components/FeedP2V8';
import FileTreeItem from 'components/FileTreeItem';
import {
  Grid,
  TextField,
  InputAdornment,
  ListItemText,
  Avatar,
  Typography,
  AppBar,
  Toolbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Breadcrumbs,
  Link,
  ListItemIcon,
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import {
  Search,
  Add,
  Remove,
  ArrowBack,
  Sort,
  ArrowUpward,
  ArrowDownward,
  Refresh,
} from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TreeView from '@material-ui/lab/TreeView';
import Skeleton from '@material-ui/lab/Skeleton';
import Alert from '@material-ui/lab/Alert';
import { makeSelectAuthorList } from 'containers/CommunityHome/selectors';
import { SimpleMenu } from 'containers/FeedV8/Wrapper';
import BrowseAll from 'containers/BrowseAll/Loadable';
import MoveDocument from 'containers/MoveDocument/Loadable';
import DocumentTree from 'components/DocumentTree/Loadable';
import DriveTree from 'components/DriveTree/Loadable';
import FeedSkeleton from 'components/FeedP2V8/FeedSkeleton';
import WidgetContainer from 'containers/WidgetContainer';
import {
  makeSelectCommunityTab,
  makeSelectPinOnCommunity,
  makeSelectFileType,
  makeSelectNewFolder,
  makeSelectRenameFolderSuccess,
  makeSelectRenameFolderError,
  makeSelectUploadFile,
  makeSelectCommunityTabLoading,
  makeSelectDocumentTree,
  makeSelectFiles,
  makeSelectGdrive,
  makeSelectWidgetList,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import {
  getCommunityTab,
  getCommunityTabMore,
  communityHomeTab,
  communityHomeTabMore,
  getPinOnCommunity,
  getFileType,
  communityFileSearch,
  communityFileSearchMore,
  documentTreeList,
  createNewFolder,
  renameFolder,
  deleteDocument,
  orderDocument,
  createNewDocument,
  uploadFile as uploadFileAction,
  cleanUploadFile,
  faqSearch,
  faqSearchMore,
  communityDocumentTreeTab,
  communityFilesTab,
  communityGdriveTab,
  widgetList as widgetListAction,
} from './actions';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'containers/HomeFeed/navigation.scss';

const sortArray = [
  { key: 'sequenceNumber', value: 'Order' },
  { key: 'title', value: 'Name' },
  { key: 'documentType', value: 'Type' },
  { key: 'created', value: 'Created Date' },
];

export function CommunityTab(props) {
  useInjectReducer({ key: 'communityTab', reducer });
  useInjectSaga({ key: 'communityTab', saga });

  const {
    match: { params },
    dispatchCommunityTab,
    dispatchCommunityTabMore,
    dispatchCommunityHomeTab,
    dispatchCommunityHomeTabMore,
    communityTab,
    dispatchPinOnCommunity,
    pinOnCommunity,
    dispatchGetFileType,
    fileType,
    authorList,
    dispatchCommunityFileSearch,
    dispatchCommunityFileSearchMore,
    authorFilters,
    dateFromFilter,
    dateToFilter,
    dispatchDocumentTreeList,
    dispatchCreateNewFolder,
    newFolder,
    dispatchRenameFolder,
    renameFolderSuccess,
    renameFolderError,
    dispatchDeleteDocument,
    dispatchOrderDocument,
    dispatchCreateNewDocument,
    dispatchUploadFile,
    dispatchCleanUploadFile,
    uploadFile,
    searchQuestion,
    isAnswered,
    dispatchFaqSearch,
    dispatchFaqSearchMore,
    setActiveTab,
    communityTabLoading,
    documentTree,
    files: filesTab,
    gdrive,
    dispatchCommunityDocumentTreeTab,
    dispatchCommunityFilesTab,
    dispatchCommunityGdriveTab,
    dispatchWidgetList,
    widgetList,
  } = props;

  const [page, setPage] = useState(1);

  const [fileSearch, setFileSearch] = useState(undefined);
  const [typeFilter, setTypeFilter] = useState([]);
  const [authorFilter, setAuthorFilter] = useState([]);
  const [dateFrom, setDateFrom] = useState(undefined);
  const [dateTo, setDateTo] = useState(undefined);
  const [isSearch, setIsSearch] = useState(undefined);
  const [hasFilters, setHasFilters] = useState(undefined);
  const [documentId, setDocumentId] = useState(undefined);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [addAnchorEl, setAddAnchorEl] = useState(null);
  const [backId, setBackId] = useState([]);
  const [currentId, setCurrentId] = useState(undefined);
  const [newFolderOpen, setNewFolderOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderError, setNewFolderError] = useState(undefined);
  const [renameFolderOpen, setRenameFolderOpen] = useState(false);
  const [renameFolderName, setRenameFolderName] = useState('');
  const [moveDocumentOpen, setMoveDocumentOpen] = useState(false);
  const [browseAllOpen, setBrowseAllOpen] = useState(false);

  const handleBrowseAllOk = useCallback(
    files => {
      setBrowseAllOpen(false);
      if (_.size(files) > 0) {
        if (documentId !== undefined) {
          getDocumentTreeList(documentId.id);
          setBackId([...backId, documentId]);
          setCurrentId(documentId);
        }
        _.map(files, file => {
          dispatchCreateNewDocument({
            communityTabUid: params.tab,
            documentType: 'File',
            fileBlock: {
              createdDate: file.fileUploadedDate,
              fileName: file.fileName,
              isInternal: !file.isExternalFile,
              mimeType: file.fileType,
              thumbGalleryUrl: file.thumbGalleryUrl,
              uid: file.fileUid,
              webViewLink: file.url,
            },
            isRoot:
              (documentId === undefined && currentId === undefined) || false,
            parentId:
              (documentId && documentId.id) ||
              (currentId && currentId.id ? currentId.id : currentId),
            title: file.fileTitle,
          });
        });
      }
      if (documentId) {
        setDocumentId(undefined);
      }
    },
    [documentId, backId, params, currentId],
  );

  const inputRef = useRef(null);

  const [fileUploadCount, setFileUploadCount] = useState(0);

  const handleUpload = useCallback(() => {
    inputRef.current.click();
  }, []);

  const handleFileUpload = e => {
    setFileUploadCount(fileUploadCount + _.size(e.target.files));
    _.map(e.target.files, file => {
      const formData = new FormData();
      formData.append('fileName', file.name);
      formData.append('file', file);
      dispatchUploadFile(formData);
    });
  };

  useEffect(() => {
    if (fileUploadCount > 0 && _.size(uploadFile) === fileUploadCount) {
      if (documentId !== undefined) {
        getDocumentTreeList(documentId.id);
        setBackId([...backId, documentId]);
        setCurrentId(documentId);
      }
      _.map(uploadFile, file => {
        dispatchCreateNewDocument({
          communityTabUid: params.tab,
          documentType: 'File',
          fileBlock: {
            createdDate: file[0].uploadedDate,
            fileName: file[0].fileName,
            isInternal: true,
            mimeType: file[0].fileType,
            thumbGalleryUrl: file[0].thumbGalleryUrl,
            uid: file[0].uid,
            webViewLink: file[0].url,
          },
          isRoot:
            (documentId === undefined && currentId === undefined) || false,
          parentId:
            (documentId && documentId.id) ||
            (currentId && currentId.id ? currentId.id : currentId),
          title: file[0].title,
        });
      });
      if (documentId) {
        setDocumentId(undefined);
      }
      setFileUploadCount(0);
      dispatchCleanUploadFile();
    }
  }, [uploadFile]);

  const handleCreateNewFolder = () => {
    dispatchCreateNewFolder({
      communityTabUid: params.tab,
      documentType: 'Folder',
      isRoot: (documentId === undefined && currentId === undefined) || false,
      parentId:
        (documentId && documentId.id) ||
        (currentId && currentId.id ? currentId.id : currentId),
      title: newFolderName,
    });
  };

  useEffect(() => {
    if (!_.isEmpty(newFolder)) {
      if (newFolder.code === 303) {
        setNewFolderError(newFolder.message);
      } else {
        getDocumentTreeList(newFolder.parentId);
        if (documentId) {
          setCurrentId(documentId);
          if (!newFolder.isRoot) {
            setBackId([...backId, documentId]);
          }
        }
        setNewFolderOpen(false);
        setNewFolderName('');
        setNewFolderError(undefined);
        setDocumentId(undefined);
      }
    }
  }, [newFolder]);

  const handleRenameFolder = () => {
    dispatchRenameFolder(
      { id: documentId.id },
      {
        title: renameFolderName,
      },
    );
  };

  useEffect(() => {
    if (renameFolderSuccess) {
      setRenameFolderOpen(false);
      setRenameFolderName('');
      setDocumentId(undefined);
    }
  }, [renameFolderSuccess]);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    getDocumentTreeList(id);
    setCurrentId(id);
    if (id === undefined) {
      setBackId([]);
    } else {
      setBackId(_.slice(backId, 0, _.findIndex(backId, { id }) + 1));
    }
  };

  const [sortField, setSortField] = useState('sequenceNumber');
  const [sortKey, setSortKey] = useState('asc');

  const getDocumentTreeList = parentId => {
    if (parentId) {
      dispatchDocumentTreeList({
        communityUid: params.uid,
        parentId,
        sortField,
        sortKey,
        tabUid: params.tab,
      });
    } else {
      dispatchCommunityDocumentTreeTab({
        communityUid: params.uid,
        sortField,
        sortKey,
        tabType: params.referer,
        tabUid: params.tab,
        track: params.track,
      });
    }
  };

  const sortRef = useRef(false);

  const handleSort = field => {
    if (!sortRef.current) {
      sortRef.current = true;
    }
    setSortAnchorEl(null);
    if (sortField === field) {
      setSortKey(sortKey === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortKey('asc');
    }
  };

  useEffect(() => {
    if (sortRef.current) {
      getDocumentTreeList(currentId ? currentId.id : currentId);
    }
  }, [sortField, sortKey]);

  const getDriveList = folderId => {
    dispatchCommunityGdriveTab({
      community: params.uid,
      communityUid: params.uid,
      folderId,
      tabType: params.referer,
      tabUid: params.tab,
      track: params.track,
    });
  };

  const [currentDriveFolder, setCurrentDriveFolder] = useState(undefined);
  const [driveMap, setDriveMap] = useState([]);

  const handleDriveFolderClick = useCallback(
    document => {
      getDriveList(document.uid);
      setDriveMap([...driveMap, document]);
      setCurrentDriveFolder(document);
    },
    [driveMap],
  );

  const handleDriveLinkClick = (e, document) => {
    e.preventDefault();
    getDriveList(document ? document.uid : document);
    setCurrentDriveFolder(document);
    if (document === undefined) {
      setDriveMap([]);
    } else {
      setDriveMap(
        _.slice(driveMap, 0, _.findIndex(driveMap, { uid: document.uid }) + 1),
      );
    }
  };

  const handleFolderClick = useCallback(
    document => {
      setBackId([...backId, document]);
      setCurrentId(document);
      getDocumentTreeList(document.id);
    },
    [backId],
  );

  const handleDocumentDelete = useCallback(() => {
    dispatchDeleteDocument({ id: documentId.id });
    setDocumentId(undefined);
  }, [documentId]);

  const handleFolderRename = useCallback(() => {
    setRenameFolderName(documentId.title);
    setRenameFolderOpen(true);
  }, [documentId]);

  const handleMoveClose = () => {
    setDocumentId(undefined);
    setMoveDocumentOpen(false);
  };

  const handleDocumentMove = (back, current, documents) => {
    setBackId([...back]);
    setCurrentId(current);
    setDocumentId(undefined);
    setMoveDocumentOpen(false);
    dispatchOrderDocument({
      communityTabUid: params.tab,
      documents,
      parentId: current ? current.id : current,
      isRoot: typeof current !== 'object',
    });
  };

  useEffect(() => {
    setPage(1);
    setBackId([]);
    setHasFilters(undefined);
    setCurrentId(undefined);
    const requestParams = {
      communityUid: params.uid,
      language: 'French',
      tabType: params.referer,
      tabUid: params.tab,
      track: params.track,
    };
    if (params.referer === 'home') {
      dispatchCommunityHomeTab({
        community: params.uid,
        communityTab: params.tab,
        isCtyHomeTab: true,
        itemsPerPage: 10,
        language: 'French',
        page: 1,
      });
      dispatchWidgetList({
        communityUid: params.uid,
        displayOption: 'Community',
      });
    } else if (params.referer === 'documenttree') {
      dispatchCommunityDocumentTreeTab(requestParams);
    } else if (params.referer === 'files') {
      dispatchCommunityFilesTab(requestParams);
    } else if (params.referer === 'gdrive') {
      dispatchCommunityGdriveTab(requestParams);
    } else {
      dispatchCommunityTab({
        ...requestParams,
        itemsPerPage: 10,
        page: 1,
        sortField: params.referer === 'event' ? 'creationDate' : undefined,
        sortKey: params.referer === 'event' ? 'desc' : undefined,
      });
    }
    setActiveTab(params.tab);
  }, [params.tab]);

  useEffect(() => {
    const filters = Boolean(
      authorFilters.length || dateFromFilter || dateToFilter,
    );
    if (filters || hasFilters !== undefined) {
      setHasFilters(filters);
      setPage(1);
      if (params.referer === 'home') {
        dispatchCommunityHomeTab({
          community: params.uid,
          communityTab: params.tab,
          isCtyHomeTab: true,
          itemsPerPage: 10,
          language: 'French',
          page: 1,
          authorFilters,
          dateFromFilter,
          dateToFilter,
        });
      } else {
        dispatchCommunityTab({
          communityUid: params.uid,
          itemsPerPage:
            params.referer !== 'documenttree' || params.referer !== 'files'
              ? 10
              : undefined,
          language: 'French',
          page:
            params.referer !== 'documenttree' || params.referer !== 'files'
              ? 1
              : undefined,
          tabType: params.referer,
          tabUid: params.tab,
          track: params.track,
          sortField: params.referer === 'event' ? 'creationDate' : undefined,
          sortKey: params.referer === 'event' ? 'desc' : undefined,
          authorFilters,
          dateFromFilter,
          dateToFilter,
        });
      }
    }
  }, [authorFilters, dateFromFilter, dateToFilter]);

  useEffect(() => {
    if (params.referer === 'home') {
      dispatchPinOnCommunity({ communityUid: params.uid });
    }
    if (params.referer === 'files') {
      dispatchGetFileType();
    }
  }, [params.tab]);

  useEffect(() => {
    if (!_.isEmpty(filesTab) && params.referer === 'files') {
      const hasFileFilters = Boolean(
        fileSearch ||
          typeFilter.length ||
          authorFilter.length ||
          dateFrom ||
          dateTo,
      );
      setIsSearch(hasFileFilters);
      if (hasFileFilters) {
        dispatchCommunityFileSearch({
          authorFilter,
          communityUid: params.uid,
          dateFrom,
          dateTo,
          itemsPerPage: 10,
          page: 1,
          q: fileSearch,
          typeFilter,
        });
      } else if (isSearch !== undefined) {
        dispatchCommunityFilesTab({
          communityUid: params.uid,
          tabType: params.referer,
          tabUid: params.tab,
        });
      }
    }
  }, [fileSearch, typeFilter, authorFilter, dateFrom, dateTo]);

  const searchFaqRef = useRef(false);

  useEffect(() => {
    if (params.referer === 'faq') {
      if (!searchFaqRef.current) {
        searchFaqRef.current = true;
      }
      if (searchFaqRef.current) {
        if (searchQuestion !== '' || isAnswered !== undefined) {
          dispatchFaqSearch({
            communityUid: params.uid,
            isAnswered,
            itemsPerPage: 10,
            page: 1,
            q: searchQuestion,
            tabUid: params.tab,
          });
        } else {
          dispatchCommunityTab({
            communityUid: params.uid,
            tabType: params.referer,
            tabUid: params.tab,
          });
        }
      }
    }
  }, [searchQuestion, isAnswered]);

  useEffect(() => {
    if (page > 1) {
      if (params.referer === 'home') {
        dispatchCommunityHomeTabMore({
          community: params.uid,
          communityTab: params.tab,
          isCtyHomeTab: true,
          itemsPerPage: 10,
          language: 'French',
          page,
          authorFilters,
          dateFromFilter,
          dateToFilter,
        });
      } else if (params.referer === 'files') {
        dispatchCommunityFileSearchMore({
          authorFilter,
          communityUid: params.uid,
          dateFrom,
          dateTo,
          itemsPerPage: 10,
          page,
          q: fileSearch,
          typeFilter,
        });
      } else if (
        params.referer === 'faq' &&
        (searchQuestion !== '' || isAnswered !== undefined)
      ) {
        dispatchFaqSearchMore({
          communityUid: params.uid,
          isAnswered,
          itemsPerPage: 10,
          page,
          q: searchQuestion,
          tabUid: params.tab,
        });
      } else {
        dispatchCommunityTabMore({
          communityUid: params.uid,
          itemsPerPage: 10,
          language: 'French',
          page,
          tabType: params.referer,
          tabUid: params.tab,
          track: params.track,
          sortField: params.referer === 'event' ? 'creationDate' : undefined,
          sortKey: params.referer === 'event' ? 'desc' : undefined,
          authorFilters,
          dateFromFilter,
          dateToFilter,
        });
      }
    }
  }, [page]);

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
      >
        {node.fileType === 'folder' && Array.isArray(node.files)
          ? renderTree(node.files, node.fileUid)
          : null}
      </FileTreeItem>
    ));

  return (
    <>
      <Helmet>
        <title>{decodeURIComponent(params.label)}</title>
        <meta name="description" content="Description of CommunityTab" />
      </Helmet>
      {params.referer === 'home' &&
        !_.isEmpty(pinOnCommunity) &&
        _.map(pinOnCommunity, content => (
          <FeedP2V8 contentUid={content} key={content} referrer="CHP" />
        ))}
      {(params.referer === 'home' ||
        params.referer === 'collection' ||
        params.referer === 'quickpost' ||
        params.referer === 'article' ||
        params.referer === 'search' ||
        params.referer === 'document' ||
        params.referer === 'imagegallery' ||
        params.referer === 'media' ||
        params.referer === 'faq' ||
        params.referer === 'joboffer' ||
        params.referer === 'event') && (
        <Grid container spacing={3}>
          <Grid item xs={params.referer === 'home' ? 8 : 12}>
            {_.map(
              communityTab,
              content =>
                typeof content === 'string' && (
                  <FeedP2V8
                    contentUid={content}
                    key={content}
                    referrer={params.referer === 'home' ? 'CHP' : 'TABList'}
                  />
                ),
            )}
            {communityTabLoading &&
              _.map(_.range(4), index => <FeedSkeleton key={index} />)}
            {page * 10 === _.size(communityTab) && (
              <Button
                onClick={() => setPage(page + 1)}
                variant="outlined"
                color="primary"
              >
                View More
              </Button>
            )}
          </Grid>
          {params.referer === 'home' && (
            <Grid item xs={4}>
              <WidgetContainer
                widgetList={widgetList}
                displayOption="Community"
                comunityId={params.uid}
              />
            </Grid>
          )}
        </Grid>
      )}
      {params.referer === 'files' && (
        <>
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
                    {option.headerLogoUrl ? (
                      <Avatar
                        src={option.headerLogoUrl}
                        style={{ marginRight: 10 }}
                      />
                    ) : (
                      <Avatar style={{ marginRight: 10 }}>
                        {initials([option.firstName, option.lastName])}
                      </Avatar>
                    )}
                    {`${option.firstName} ${option.lastName}`}
                  </>
                )}
                renderTags={() => null}
                renderInput={imputProps => (
                  <TextField
                    placeholder="Select Author"
                    variant="outlined"
                    {...imputProps}
                  />
                )}
              />
            </Grid>
            <Grid item xs>
              Date
              <Grid container>
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
          <TreeView
            defaultCollapseIcon={<Remove />}
            defaultExpandIcon={<Add />}
          >
            {renderTree(filesTab)}
          </TreeView>
          {communityTabLoading &&
            _.map(_.range(4), index => (
              <Skeleton
                key={index}
                variant="rect"
                height={45}
                style={{ marginTop: 5, marginBottom: 5 }}
              />
            ))}
          {isSearch && page * 10 === _.size(communityTab) && (
            <Button
              onClick={() => setPage(page + 1)}
              variant="outlined"
              color="primary"
            >
              View More
            </Button>
          )}
        </>
      )}
      {params.referer === 'documenttree' && (
        <>
          <Paper elevation={0}>
            <AppBar position="static" elevation={0}>
              <Toolbar variant="dense">
                <div style={{ flexGrow: 1 }}>
                  <IconButton
                    edge="start"
                    color="inherit"
                    disabled={_.size(backId) === 0}
                    onClick={() => {
                      const { parentId } = backId.pop();
                      getDocumentTreeList(parentId);
                      setCurrentId(parentId);
                    }}
                  >
                    <ArrowBack />
                  </IconButton>
                </div>
                <IconButton
                  color="inherit"
                  onClick={e => {
                    setDocumentId(undefined);
                    setAddAnchorEl(e.currentTarget);
                  }}
                >
                  <Add />
                </IconButton>
                <IconButton
                  color="inherit"
                  edge="end"
                  onClick={e => {
                    setSortAnchorEl(e.currentTarget);
                  }}
                >
                  <Sort />
                </IconButton>
              </Toolbar>
            </AppBar>
            <Paper square elevation={1} style={{ padding: 16 }}>
              <Breadcrumbs>
                <Link
                  color={backId.length === 0 ? 'textPrimary' : 'inherit'}
                  href="#"
                  onClick={e => handleLinkClick(e)}
                >
                  Home
                </Link>
                {_.map(backId, (doc, i) => (
                  <Link
                    key={doc.id}
                    color={i === backId.length - 1 ? 'textPrimary' : 'inherit'}
                    href="#"
                    onClick={e => handleLinkClick(e, doc.id)}
                  >
                    {doc.title}
                  </Link>
                ))}
              </Breadcrumbs>
            </Paper>
            {communityTabLoading &&
              _.map(_.range(4), index => (
                <Skeleton
                  key={index}
                  variant="rect"
                  height={45}
                  style={{ marginTop: 5, marginBottom: 5 }}
                />
              ))}
            <DocumentTree
              documents={documentTree}
              setDocumentId={setDocumentId}
              hasActions
              handleFolderClick={handleFolderClick}
              handleDocumentDelete={handleDocumentDelete}
              handleFolderRename={handleFolderRename}
              setNewFolderOpen={setNewFolderOpen}
              setMoveDocumentOpen={setMoveDocumentOpen}
              setBrowseAllOpen={setBrowseAllOpen}
              handleUpload={handleUpload}
            />
            <SimpleMenu
              elevation={0}
              anchorEl={addAnchorEl}
              open={Boolean(addAnchorEl)}
              onClose={() => setAddAnchorEl(null)}
            >
              <MenuItem
                dense
                onClick={() => {
                  setAddAnchorEl(null);
                  setNewFolderOpen(true);
                }}
              >
                Add a folder
              </MenuItem>
              <MenuItem
                dense
                onClick={() => {
                  setAddAnchorEl(null);
                  setBrowseAllOpen(true);
                }}
              >
                Browse the platform
              </MenuItem>
              <MenuItem
                dense
                onClick={() => {
                  setAddAnchorEl(null);
                  handleUpload();
                }}
              >
                Upload from my computer
              </MenuItem>
            </SimpleMenu>
            <SimpleMenu
              elevation={0}
              anchorEl={sortAnchorEl}
              open={Boolean(sortAnchorEl)}
              onClose={() => setSortAnchorEl(null)}
            >
              {_.map(sortArray, item => (
                <MenuItem
                  dense
                  key={item.key}
                  selected={sortField === item.key}
                  onClick={() => handleSort(item.key)}
                >
                  <ListItemText primary={item.value} />
                  {sortField === item.key && (
                    <ListItemIcon>
                      {sortKey === 'asc' ? (
                        <ArrowUpward fontSize="small" />
                      ) : (
                        <ArrowDownward fontSize="small" />
                      )}
                    </ListItemIcon>
                  )}
                </MenuItem>
              ))}
            </SimpleMenu>
            {!communityTabLoading && _.isEmpty(documentTree) && (
              <div style={{ padding: 8 }}>
                <Alert severity="info">No file in this folder</Alert>
              </div>
            )}
          </Paper>
          <Dialog open={newFolderOpen} onClose={() => setNewFolderOpen(false)}>
            <DialogTitle>New Folder</DialogTitle>
            <DialogContent>
              <TextField
                label="Folder Name"
                fullWidth
                value={newFolderName}
                onChange={e => setNewFolderName(e.target.value)}
                error={Boolean(newFolderError)}
                helperText={newFolderError}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCreateNewFolder} color="primary">
                Create
              </Button>
              <Button onClick={() => setNewFolderOpen(false)} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={renameFolderOpen}
            onClose={() => setRenameFolderOpen(false)}
          >
            <DialogTitle>Rename Folder</DialogTitle>
            <DialogContent>
              <TextField
                label="New Folder Name"
                fullWidth
                value={renameFolderName}
                onChange={e => setRenameFolderName(e.target.value)}
                error={Boolean(renameFolderError)}
                helperText={renameFolderError}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleRenameFolder} color="primary">
                Rename
              </Button>
              <Button
                onClick={() => setRenameFolderOpen(false)}
                color="primary"
              >
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          {moveDocumentOpen && (
            <MoveDocument
              open={moveDocumentOpen}
              handleMoveClose={handleMoveClose}
              handleDocumentMove={handleDocumentMove}
              backId={backId}
              communityUid={params.uid}
              tabType={params.referer}
              tabUid={params.tab}
              track={params.track}
              documentId={documentId}
            />
          )}
          {browseAllOpen && (
            <BrowseAll
              open={browseAllOpen}
              onClose={() => setBrowseAllOpen(false)}
              onOk={handleBrowseAllOk}
              type="Documents"
            />
          )}
          <input
            type="file"
            multiple
            style={{ display: 'none' }}
            ref={inputRef}
            onChange={e => handleFileUpload(e)}
          />
        </>
      )}
      {params.referer === 'gdrive' && (
        <>
          <Paper square elevation={1}>
            <Toolbar>
              <div style={{ flexGrow: 1 }}>
                <Breadcrumbs>
                  <Link
                    color={driveMap.length === 0 ? 'textPrimary' : 'inherit'}
                    href="#"
                    onClick={e => handleDriveLinkClick(e)}
                  >
                    Home
                  </Link>
                  {_.map(driveMap, (doc, i) => (
                    <Link
                      key={doc.uid}
                      color={
                        i === driveMap.length - 1 ? 'textPrimary' : 'inherit'
                      }
                      href="#"
                      onClick={e => handleDriveLinkClick(e, doc)}
                    >
                      {doc.name}
                    </Link>
                  ))}
                </Breadcrumbs>
              </div>
              <IconButton
                color="inherit"
                edge="end"
                onClick={() => {
                  getDriveList(
                    currentDriveFolder
                      ? currentDriveFolder.uid
                      : currentDriveFolder,
                  );
                }}
              >
                <Refresh />
              </IconButton>
            </Toolbar>
          </Paper>
          {communityTabLoading &&
            _.map(_.range(4), index => (
              <Skeleton
                key={index}
                variant="rect"
                height={45}
                style={{ marginTop: 5, marginBottom: 5 }}
              />
            ))}
          <DriveTree
            documents={gdrive.rows}
            handleFolderClick={handleDriveFolderClick}
          />
        </>
      )}
    </>
  );
}

CommunityTab.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  dispatchCommunityTab: PropTypes.func,
  dispatchCommunityTabMore: PropTypes.func,
  dispatchCommunityOtherTab: PropTypes.func,
  dispatchCommunityHomeTab: PropTypes.func,
  dispatchCommunityHomeTabMore: PropTypes.func,
  communityTab: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  dispatchPinOnCommunity: PropTypes.func,
  pinOnCommunity: PropTypes.array,
  dispatchGetFileType: PropTypes.func,
  fileType: PropTypes.array,
  authorList: PropTypes.array,
  dispatchCommunityFileSearch: PropTypes.func,
  dispatchCommunityFileSearchMore: PropTypes.func,
  authorFilters: PropTypes.array,
  dateFromFilter: PropTypes.string,
  dateToFilter: PropTypes.string,
  dispatchDocumentTreeList: PropTypes.func,
  dispatchCreateNewFolder: PropTypes.func,
  newFolder: PropTypes.object,
  dispatchRenameFolder: PropTypes.func,
  renameFolderSuccess: PropTypes.bool,
  renameFolderError: PropTypes.string,
  dispatchDeleteDocument: PropTypes.func,
  dispatchOrderDocument: PropTypes.func,
  dispatchCreateNewDocument: PropTypes.func,
  dispatchUploadFile: PropTypes.func,
  dispatchCleanUploadFile: PropTypes.func,
  uploadFile: PropTypes.array,
  searchQuestion: PropTypes.string,
  isAnswered: PropTypes.bool,
  dispatchFaqSearch: PropTypes.func,
  dispatchFaqSearchMore: PropTypes.func,
  setActiveTab: PropTypes.func,
  history: PropTypes.object,
  communityTabLoading: PropTypes.bool,
  documentTree: PropTypes.array,
  files: PropTypes.array,
  gdrive: PropTypes.object,
  dispatchCommunityDocumentTreeTab: PropTypes.func,
  dispatchCommunityFilesTab: PropTypes.func,
  dispatchCommunityGdriveTab: PropTypes.func,
  dispatchWidgetList: PropTypes.func,
  widgetList: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  communityTab: makeSelectCommunityTab(),
  pinOnCommunity: makeSelectPinOnCommunity(),
  fileType: makeSelectFileType(),
  authorList: makeSelectAuthorList(),
  newFolder: makeSelectNewFolder(),
  renameFolderSuccess: makeSelectRenameFolderSuccess(),
  renameFolderError: makeSelectRenameFolderError(),
  uploadFile: makeSelectUploadFile(),
  communityTabLoading: makeSelectCommunityTabLoading(),
  documentTree: makeSelectDocumentTree(),
  files: makeSelectFiles(),
  gdrive: makeSelectGdrive(),
  widgetList: makeSelectWidgetList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCommunityTab: options => dispatch(getCommunityTab(options)),
    dispatchCommunityTabMore: options => dispatch(getCommunityTabMore(options)),
    dispatchCommunityHomeTab: options => dispatch(communityHomeTab(options)),
    dispatchCommunityHomeTabMore: options =>
      dispatch(communityHomeTabMore(options)),
    dispatchPinOnCommunity: options => dispatch(getPinOnCommunity(options)),
    dispatchGetFileType: () => dispatch(getFileType()),
    dispatchCommunityFileSearch: options =>
      dispatch(communityFileSearch(options)),
    dispatchCommunityFileSearchMore: options =>
      dispatch(communityFileSearchMore(options)),
    dispatchDocumentTreeList: options => dispatch(documentTreeList(options)),
    dispatchCreateNewFolder: options => dispatch(createNewFolder(options)),
    dispatchRenameFolder: (params, options) =>
      dispatch(renameFolder(params, options)),
    dispatchDeleteDocument: options => dispatch(deleteDocument(options)),
    dispatchOrderDocument: options => dispatch(orderDocument(options)),
    dispatchCreateNewDocument: options => dispatch(createNewDocument(options)),
    dispatchUploadFile: options => dispatch(uploadFileAction(options)),
    dispatchCleanUploadFile: options => dispatch(cleanUploadFile(options)),
    dispatchFaqSearch: options => dispatch(faqSearch(options)),
    dispatchFaqSearchMore: options => dispatch(faqSearchMore(options)),
    dispatchCommunityDocumentTreeTab: options =>
      dispatch(communityDocumentTreeTab(options)),
    dispatchCommunityFilesTab: options => dispatch(communityFilesTab(options)),
    dispatchCommunityGdriveTab: options =>
      dispatch(communityGdriveTab(options)),
    dispatchWidgetList: options => dispatch(widgetListAction(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CommunityTab);

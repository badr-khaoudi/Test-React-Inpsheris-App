/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable indent */
/**
 *
 * DocumentBar
 *
 */

import React, {
  memo,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import {
  Grid,
  Typography,
  TextField,
  Link,
  ListItemText,
  List,
  ListItemIcon,
  Divider,
  Avatar,
} from '@material-ui/core';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import Popover from '@material-ui/core/Popover';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import { Check } from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { KeyboardDatePicker } from '@material-ui/pickers';
import InfiniteScroll from 'react-infinite-scroll-component';
import SwiperCore, { Navigation, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useEffectAfterMount } from 'utils/helpers/useEffectAfterMount';
import { initials } from 'utils/helpers/avatarInitials';
import { openGallery } from 'containers/AuthBase/actions';
import { makeSelectConfig } from 'containers/AuthBase/selectors';
import { DocumentIcons, Folder } from 'components/Icons';
import {
  makeSelectLatestOpens,
  makeSelectLatestOpensLoading,
  makeSelectLatestUpdates,
  makeSelectLatestUpdatesLoading,
  makeSelectCommunityGroupList,
  makeSelectCommunityGroupListLoading,
  makeSelectCommunityList,
  makeSelectCommunityListLoading,
  makeSelectCommunityTabList,
  makeSelectCommunityTabListLoading,
  makeSelectCommunityFileList,
  makeSelectCommunityFileListLoading,
  makeSelectSearchCommunityFile,
  makeSelectSearchCommunityPage,
  makeSelectSearchCommunityFileLoading,
  makeSelectCommunityOptions,
  makeSelectCommunityOptionsLoading,
  makeSelectFileType,
  makeSelectAuthorList,
  makeSelectAuthorListLoading,
  // makeSelectConfig,
  // makeSelectExternalSource,
  makeSelectContents,
  makeSelectContentsLoading,
  makeSelectDriveRecent,
  makeSelectDriveRecentLoading,
  makeSelectSearchEntity,
  makeSelectSearchEntityLoading,
  makeSelectSearchEntityFrom,
  makeSelectSearchCommunityAndEntity,
  makeSelectSearchCommunityAndEntityPage,
  makeSelectSearchCommunityAndEntityLoading,
  makeSelectLivelyAndDriveRecent,
  makeSelectLivelyAndDriveRecentLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  latestOpens as latestOpensAction,
  latestUpdates as latestUpdatesAction,
  communityGroupList as communityGroupListAction,
  communityList as communityListAction,
  communityTabList as communityTabListAction,
  communityFileList as communityFileListAction,
  searchCommunityFile as searchCommunityFileAction,
  searchCommunityFileMore,
  communityOptions as communityOptionsAction,
  fileType as fileTypeAction,
  authorList as authorListAction,
  config as configAction,
  externalSource as externalSourceAction,
  driveRecent as driveRecentAction,
  driveRecentMore,
  listChildrenRoot as listChildrenRootAction,
  listChildrenDriveItem as listChildrenDriveItemAction,
  listItemsDrive as listItemsDriveAction,
  sharePointSites as sharePointSitesAction,
  documentLibraries as documentLibrariesAction,
  searchEntity as searchEntityAction,
  searchEntityMore,
  searchCommunityAndEntity as searchCommunityAndEntityAction,
  searchCommunityAndEntityMore,
  livelyAndDriveRecent as livelyAndDriveRecentAction,
  livelyAndDriveRecentMore,
} from './actions';
import Document from './Document';
// import messages from './messages';

SwiperCore.use([Navigation, Virtual]);

const Header = () => (
  <div
    style={{
      display: 'flex',
      padding: 16,
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      alignItems: 'center',
    }}
  >
    <div style={{ flex: 1, paddingRight: 16 }}>
      <Typography variant="h6" style={{ fontSize: '1rem' }}>
        Name
      </Typography>
    </div>
    <div style={{ width: 250, paddingLeft: 16, paddingRight: 16 }}>
      <Typography variant="h6" style={{ fontSize: '1rem' }}>
        Author
      </Typography>
    </div>
    <div style={{ width: 150 }}>
      <Typography variant="h6" style={{ fontSize: '1rem' }}>
        Uploaded on
      </Typography>
    </div>
  </div>
);

const LoadingSkeleton = () =>
  _.map(_.range(4), index => (
    <Skeleton
      key={index}
      variant="rect"
      height={45}
      style={{ marginBottom: 5 }}
    />
  ));

const FolderItem = ({ text, onClick }) => (
  <ListItem
    button
    style={{
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    }}
    onClick={onClick}
  >
    <ListItemIcon>
      <Folder />
    </ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
);

FolderItem.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

const Item = ({
  link,
  type,
  name,
  user,
  date,
  onClick,
  allowSelect,
  checked,
  onChange,
}) => (
  <ListItem
    button
    style={{
      borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    }}
    component="a"
    href={link}
    target="_blank"
    onClick={onClick}
  >
    {allowSelect && (
      <Checkbox
        edge="start"
        tabIndex={-1}
        disableRipple
        checked={checked}
        onClick={e => e.stopPropagation()}
        onChange={onChange({
          fileName: name,
          fileExtension: type,
          fileUploadedDate: date,
        })}
      />
    )}
    <ListItemIcon>
      <DocumentIcons type={type} />
    </ListItemIcon>
    <ListItemText
      primary={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div style={{ flex: 1, paddingRight: 16 }}>
            <Typography
              variant="h6"
              style={{
                fontSize: '1rem',
                wordBreak: 'break-word',
              }}
            >
              {name}
            </Typography>
          </div>
          <div
            style={{
              width: 250,
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <Typography variant="h6" style={{ fontSize: '1rem' }}>
              {user}
            </Typography>
          </div>
          <div style={{ width: '150px' }}>
            <Typography variant="h6" style={{ fontSize: '1rem' }}>
              {moment(date).format('LL')}
            </Typography>
          </div>
        </div>
      }
    />
  </ListItem>
);

Item.propTypes = {
  link: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  user: PropTypes.string,
  date: PropTypes.string,
  onClick: PropTypes.func,
  allowSelect: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

// const typeMap = [
//   'CurrentUserDrive',
//   'DriveItem',
//   'SharePointSite',
//   'SharePointDrive',
//   'SharePointDriveItem',
// ];

const fileFormat = {
  Word: ['docx', 'doc'],
  Excel: ['xlsx', 'xls', 'csv'],
  PDF: ['pdf'],
  Powerpoint: ['pptx', 'ppt'],
  Image: ['gif', 'jpg', 'jpeg', 'bmp', 'png', 'tif', 'tiff'],
  Other: ['txt', 'xml', 'htm', 'html'],
  Video: [
    'm4v',
    'mp4',
    'mov',
    'asf',
    'avi',
    'wmv',
    'm2ts',
    '3g2',
    '3gp2',
    '3gpp',
  ],
};

const transformCommunityData = communityData =>
  _.map(communityData, data => ({
    id: data.fileUid,
    type: data.fileType || data.fileExtension,
    name: data.fileName,
    headerLogoUrl: data.author ? data.author.headerLogoUrl : '',
    user: data.author ? `${data.author.firstName} ${data.author.lastName}` : '',
    date: data.fileUploadedDate,
    thumbGalleryUrl: data.thumbGalleryUrl,
    objectFileType: data.objectFileType,
    isInternal: !(data.isExternalFile || data.isGdrive),
  }));

const transformEntityData = entityData =>
  _.map(entityData, data => ({
    id: data.resource.id,
    link: data.resource.webUrl,
    type: _.last(_.split(data.resource.name, '.')),
    name: data.resource.name,
    user: data.resource.createdBy.user.displayName,
    date: data.resource.createdDateTime,
    externalSource: 'OneDrive',
  }));

const transformRecentEntityData = entityData =>
  _.map(entityData, data => ({
    id: data.remoteItem ? data.remoteItem.id : data.id,
    link: data.webUrl,
    type: data.file.mimeType,
    name: data.name,
    user: data.createdBy.user.displayName,
    date: data.createdDateTime,
    externalSource: 'OneDrive',
  }));

_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

export function DocumentBar(props) {
  useInjectReducer({ key: 'documentBar', reducer });
  useInjectSaga({ key: 'documentBar', saga });

  const {
    dispatchLatestOpen,
    dispatchLatestUpdates,
    latestOpens,
    latestOpensLoading,
    latestUpdates,
    latestUpdatesLoading,
    dispatchCommunityGroupList,
    communityGroupList,
    communityGroupListLoading,
    dispatchCommunityList,
    communityList,
    communityListLoading,
    dispatchCommunityTabList,
    communityTabList,
    communityTabListLoading,
    dispatchCommunityFileList,
    communityFileList,
    communityFileListLoading,
    dispatchSearchCommunityFile,
    searchCommunityFile,
    searchCommunityPage,
    searchCommunityFileLoading,
    dispatchSearchCommunityFileMore,
    dispatchCommunityOptions,
    communityOptions,
    communityOptionsLoading,
    dispatchFileType,
    fileType,
    dispatchAuthorList,
    authorList,
    authorListLoading,
    // dispatchConfig,
    // config,
    // dispatchExternalSource,
    // externalSource,
    dispatchDriveRecent,
    dispatchDriveRecentMore,
    dispatchListChildrenRoot,
    dispatchListChildrenDriveItem,
    dispatchListItemsDrive,
    dispatchSharePointSites,
    dispatchDocumentLibraries,
    contents,
    contentsLoading,
    driveRecent,
    driveRecentLoading,
    dispatchSearchEntity,
    searchEntity,
    searchEntityLoading,
    searchEntityFrom,
    dispatchSearchEntityMore,
    dispatchSearchCommunityAndEntity,
    dispatchSearchCommunityAndEntityMore,
    searchCommunityAndEntity,
    searchCommunityAndEntityPage,
    searchCommunityAndEntityLoading,
    dispatchOpenGallery,
    dispatchLivelyAndDriveRecent,
    livelyAndDriveRecent,
    livelyAndDriveRecentLoading,
    dispatchLivelyAndDriveRecentMore,
    q,
    setQ,
    inputRef,
    anchorEl,
    setAnchorEl,
    scrollableTarget,
    microsoftIntegration,
    allowSelect,
    documents,
    setDocuments,
  } = props;

  const searchCancelToken = useRef();
  const [communityFilter, setCommunityFilter] = useState([]);
  const [typeFilter, setTypeFilter] = useState([]);
  const [authorFilter, setAuthorFilter] = useState([]);
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    if (anchorEl) {
      if (_.isEmpty(communityOptions)) {
        dispatchCommunityOptions({
          filter: 'lively',
          format: 'list',
          gplusCommunity: 'ALL',
        });
      }
      if (_.isEmpty(fileType)) {
        dispatchFileType();
      }
      if (_.isEmpty(authorList)) {
        dispatchAuthorList({ isAll: true });
      }
    }
  }, [anchorEl]);

  const Created = useMemo(() => {
    let created;
    if (dateFrom && !dateTo) {
      created = `Created > ${moment(dateFrom).format('YYYY-MM-DD')}`;
    } else if (dateTo && !dateFrom) {
      created = `Created < ${moment(dateTo).format('YYYY-MM-DD')}`;
    } else if (dateFrom && dateTo) {
      created = `Created > ${moment(dateFrom).format(
        'YYYY-MM-DD',
      )} AND Created < ${moment(dateTo).format('YYYY-MM-DD')}`;
    }
    return created;
  }, [dateFrom, dateTo]);

  const Author = useMemo(
    () =>
      _.join(
        _.map(
          authorFilter,
          author => `Author:${author.firstName} ${author.lastName}`,
        ),
        ' OR ',
      ),
    [authorFilter],
  );
  const filetype = useMemo(
    () =>
      _.join(
        _.map(
          _.flatten(_.map(typeFilter, type => fileFormat[type])),
          type => `filetype:${type}`,
        ),
        ' OR ',
      ),
    [typeFilter],
  );
  const queryString = _.template('{{q}}{{Created}}{{filetype}}{{Author}}');
  const handleSearch = () => {
    setFilter(true);
    setBufferResults([]);
    setSearchResults([]);
    setHasMore();
    setMoreResultsAvailable();
    communityDataCount.current = 0;
    setCommunityDataTotal(0);
    setEntityDataTotal(0);
    if (searchCancelToken.current) {
      searchCancelToken.current.cancel();
    }
    searchCancelToken.current = axios.CancelToken.source();
    const communityFileOptions = {
      q,
      communityFilter,
      typeFilter,
      authorFilter: _.map(authorFilter, ({ uid }) => uid),
      dateFrom: dateFrom ? moment(dateFrom).format('MM/DD/YYYY') : undefined,
      dateTo: dateTo ? moment(dateTo).format('MM/DD/YYYY') : undefined,
      page: 1,
      type: 'document',
      searchType: 'lively',
      sortField: 'fileName',
      sortKey: 'asc',
      itemsPerPage: 20,
    };
    const entityOptions = {
      requests: [
        {
          entityTypes: ['driveItem'],
          query: {
            queryString: queryString({
              q,
              Created: Created ? ` (${Created})` : Created,
              filetype: filetype ? ` (${filetype})` : filetype,
              Author: Author ? ` (${Author})` : Author,
            }),
          },
          from: 0,
          size: 20,
          sortProperties: [
            {
              name: 'name',
              isDescending: false,
            },
          ],
        },
      ],
    };
    if (!oneDrive && lively) {
      dispatchSearchCommunityFile(
        communityFileOptions,
        searchCancelToken.current.token,
      );
    } else if (oneDrive && !lively) {
      dispatchSearchEntity(entityOptions, searchCancelToken.current.token);
    } else if (oneDrive && lively) {
      dispatchSearchCommunityAndEntity(
        communityFileOptions,
        entityOptions,
        searchCancelToken.current.token,
      );
    }
  };

  const [bufferResults, setBufferResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [moreResultsAvailable, setMoreResultsAvailable] = useState(false);
  const communityDataCount = useRef(0);
  const [communityDataTotal, setCommunityDataTotal] = useState(0);
  const [entityDataTotal, setEntityDataTotal] = useState(0);

  useEffect(() => {
    if (oneDrive && lively && filter) {
      if (
        !_.isEmpty(searchCommunityAndEntity.communityData.rows) ||
        !_.isEmpty(searchCommunityAndEntity.entityData.hits) ||
        !_.isEmpty(searchCommunityFile.rows) ||
        !_.isEmpty(searchEntity.hits)
      ) {
        let results = [...bufferResults];
        let communityDataSize = communityDataCount.current;
        let communityHasMore;
        let entityHasMore;
        if (
          !_.isEmpty(searchCommunityAndEntity.communityData.rows) ||
          !_.isEmpty(searchCommunityAndEntity.entityData.hits)
        ) {
          if (!_.isEmpty(searchCommunityAndEntity.communityData.rows)) {
            results = [
              ...results,
              ...transformCommunityData(
                searchCommunityAndEntity.communityData.rows,
              ),
            ];
            communityDataSize += _.size(
              searchCommunityAndEntity.communityData.rows,
            );
            communityDataCount.current = communityDataSize;
            if (
              communityDataTotal !==
              searchCommunityAndEntity.communityData.total
            ) {
              setCommunityDataTotal(
                searchCommunityAndEntity.communityData.total,
              );
            }
            communityHasMore =
              communityDataSize < searchCommunityAndEntity.communityData.total;
            setHasMore(communityHasMore);
          }
          if (!_.isEmpty(searchCommunityAndEntity.entityData.hits)) {
            results = [
              ...results,
              ...transformEntityData(searchCommunityAndEntity.entityData.hits),
            ];
            if (entityDataTotal !== searchCommunityAndEntity.entityData.total) {
              setEntityDataTotal(searchCommunityAndEntity.entityData.total);
            }
            entityHasMore =
              searchCommunityAndEntity.entityData.moreResultsAvailable;
            setMoreResultsAvailable(entityHasMore);
          }
        } else if (!_.isEmpty(searchCommunityFile.rows)) {
          results = [
            ...results,
            ...transformCommunityData(searchCommunityFile.rows),
          ];
          communityDataSize += _.size(searchCommunityFile.rows);
          communityDataCount.current = communityDataSize;
          communityHasMore = communityDataSize < searchCommunityFile.total;
          setHasMore(communityHasMore);
        } else if (!_.isEmpty(searchEntity.hits)) {
          results = [...results, ...transformEntityData(searchEntity.hits)];
          entityHasMore = searchEntity.moreResultsAvailable;
          setMoreResultsAvailable(entityHasMore);
        }
        const sorted = _.sortBy(results, 'name');
        if (communityHasMore || entityHasMore || _.size(sorted) > 20) {
          setSearchResults([...searchResults, ..._.slice(sorted, 0, 20)]);
          setBufferResults(_.slice(sorted, 20));
        } else {
          setSearchResults([...searchResults, ...sorted]);
          setBufferResults([]);
        }
      }
    }
  }, [searchCommunityAndEntity, searchCommunityFile, searchEntity]);

  useEffectAfterMount(() => {
    if (q !== '') {
      handleSearch();
    }
  }, [q]);
  const handleSearchMore = () => {
    searchCancelToken.current = axios.CancelToken.source();
    dispatchSearchCommunityFileMore(
      {
        q,
        communityFilter,
        typeFilter,
        authorFilter: _.map(authorFilter, ({ uid }) => uid),
        dateFrom: dateFrom ? moment(dateFrom).format('MM/DD/YYYY') : undefined,
        dateTo: dateTo ? moment(dateTo).format('MM/DD/YYYY') : undefined,
        type: 'document',
        searchType: 'lively',
        sortField: 'fileName',
        sortKey: 'asc',
        itemsPerPage: 20,
      },
      searchCancelToken.current.token,
    );
  };
  const handleSearchEntityMore = () => {
    searchCancelToken.current = axios.CancelToken.source();
    dispatchSearchEntityMore(
      {
        requests: [
          {
            entityTypes: ['driveItem'],
            query: {
              queryString: queryString({
                q,
                Created: Created ? ` (${Created})` : Created,
                filetype: filetype ? ` (${filetype})` : filetype,
                Author: Author ? ` (${Author})` : Author,
              }),
            },
            from: searchEntityFrom,
            size: 10,
            sortProperties: [
              {
                name: 'name',
                isDescending: false,
              },
            ],
          },
        ],
      },
      searchCancelToken.current.token,
    );
  };
  const handlesearchCommunityAndEntityMore = () => {
    searchCancelToken.current = axios.CancelToken.source();
    const communityFileOptions = {
      q,
      communityFilter,
      typeFilter,
      authorFilter: _.map(authorFilter, ({ uid }) => uid),
      dateFrom: dateFrom ? moment(dateFrom).format('MM/DD/YYYY') : undefined,
      dateTo: dateTo ? moment(dateTo).format('MM/DD/YYYY') : undefined,
      page: searchCommunityAndEntityPage,
      type: 'document',
      searchType: 'lively',
      sortField: 'fileName',
      sortKey: 'asc',
      itemsPerPage: 20,
    };
    const entityOptions = {
      requests: [
        {
          entityTypes: ['driveItem'],
          query: {
            queryString: queryString({
              q,
              Created: Created ? ` (${Created})` : Created,
              filetype: filetype ? ` (${filetype})` : filetype,
              Author: Author ? ` (${Author})` : Author,
            }),
          },
          from: (searchCommunityAndEntityPage - 1) * 20,
          size: 20,
          sortProperties: [
            {
              name: 'name',
              isDescending: false,
            },
          ],
        },
      ],
    };
    if (hasMore && !moreResultsAvailable) {
      dispatchSearchCommunityFile(
        communityFileOptions,
        searchCancelToken.current.token,
      );
    } else if (!hasMore && moreResultsAvailable) {
      dispatchSearchEntity(entityOptions, searchCancelToken.current.token);
    } else if (hasMore && moreResultsAvailable) {
      dispatchSearchCommunityAndEntityMore(
        communityFileOptions,
        entityOptions,
        searchCancelToken.current.token,
      );
    } else if (!hasMore && !moreResultsAvailable && !_.isEmpty(bufferResults)) {
      setSearchResults([...searchResults, ..._.slice(bufferResults, 0, 20)]);
      setBufferResults(_.slice(bufferResults, 20));
    }
  };
  const handleSearchCancel = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setFilter(false);
    setQ('');
    setCommunityFilter([]);
    setTypeFilter([]);
    setAuthorFilter([]);
    setDateFrom(null);
    setDateTo(null);
    setBufferResults([]);
    setSearchResults([]);
    setHasMore();
    setMoreResultsAvailable();
    communityDataCount.current = 0;
    setCommunityDataTotal(0);
    setEntityDataTotal(0);
  };
  const [latestActionType, setLatestActionType] = useState('latestOpens');
  const [step, setStep] = useState('myDocuments');
  const [selectedCommunityGroup, setSelectedCommunityGroup] = useState({});
  const [selectedCommunity, setSelectedCommunity] = useState({});
  const [selectedCommunityTab, setSelectedCommunityTab] = useState({});
  const [lively, setLively] = useState(true);
  const [oneDrive, setOneDrive] = useState(false);
  const [oneDriveStep, setOneDriveStep] = useState('OneDrive');
  const [oneDriveBreadcrumbs, setOneDriveBreadcrumbs] = useState([]);

  const handleSearchRef = useRef(false);

  useEffect(() => {
    if (filter) {
      if (!handleSearchRef.current) {
        handleSearchRef.current = true;
        return;
      }
      handleSearch();
    }
  }, [filter, oneDrive, lively]);

  const contentCancelToken = useRef();

  const handlePersonalOneDrive = () => {
    if (contentCancelToken.current) {
      contentCancelToken.current.cancel();
    }
    contentCancelToken.current = axios.CancelToken.source();
    setOneDriveStep('PersonalOneDrive');
    dispatchListChildrenRoot(undefined, contentCancelToken.current.token);
    setOneDriveBreadcrumbs([]);
  };

  const handleSharePointSites = () => {
    if (contentCancelToken.current) {
      contentCancelToken.current.cancel();
    }
    contentCancelToken.current = axios.CancelToken.source();
    setOneDriveStep('SharePointSites');
    dispatchSharePointSites({ search: '' }, contentCancelToken.current.token);
    setOneDriveBreadcrumbs([]);
  };

  const handleContentClick = useCallback((e, content, caller) => {
    if (!_.isEmpty(content.file)) {
      return;
    }
    e.preventDefault();
    if (stepCancelToken.current) {
      stepCancelToken.current.cancel();
    }
    if (contentCancelToken.current) {
      contentCancelToken.current.cancel();
    }
    contentCancelToken.current = axios.CancelToken.source();
    if (caller === 'Item') {
      setOneDriveBreadcrumbs(oldBreadcrumbs => [...oldBreadcrumbs, content]);
    } else if (caller === 'Breadcrumbs') {
      setOneDriveBreadcrumbs(oldBreadcrumbs =>
        _.slice(oldBreadcrumbs, 0, _.indexOf(oldBreadcrumbs, content) + 1),
      );
    }
    if (!_.isEmpty(content.folder) && !_.isEmpty(content.parentReference)) {
      dispatchListChildrenDriveItem(
        content.parentReference.driveId,
        content.id,
        undefined,
        contentCancelToken.current.token,
      );
    } else if (!_.isEmpty(content.siteCollection)) {
      dispatchDocumentLibraries(
        content.id,
        undefined,
        contentCancelToken.current.token,
      );
    } else if (content.driveType && !_.isEmpty(content.quota)) {
      dispatchListItemsDrive(
        content.id,
        undefined,
        contentCancelToken.current.token,
      );
    }
  }, []);

  // const handleOneDrive = () => {
  //   if (oneDrive) {
  //     setOneDrive(!lively || (lively && !oneDrive));
  //   } else {
  //     if (_.isEmpty(config)) {
  //       dispatchConfig({ name: 'OFFICE_365', format: 'full' });
  //     }
  //     if (_.isEmpty(externalSource)) {
  //       dispatchExternalSource({ type: 'Office365' });
  //     }
  //   }
  // };
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const handleOneDrive = async () => {
    if (!isAuthenticated) {
      const response = await instance.loginPopup({
        scopes: ['User.Read', 'Files.Read.All', 'Sites.Read.All'],
        prompt: 'select_account',
      });
      if (response) {
        setOneDrive(true);
      }
    } else if (isAuthenticated) {
      if (lively && oneDrive) {
        setStep('myDocuments');
      }
      setOneDrive(!lively || (lively && !oneDrive));
    }
  };

  const latestActionCancelToken = useRef();

  const handlelatestActionType = () => {
    latestActionCancelToken.current = axios.CancelToken.source();
    if (lively && !oneDrive) {
      if (latestActionType === 'latestOpens') {
        dispatchLatestOpen(
          { itemsPerPage: 5 },
          latestActionCancelToken.current.token,
        );
      } else if (latestActionType === 'latestUpdates') {
        dispatchLatestUpdates(
          { itemsPerPage: 5 },
          latestActionCancelToken.current.token,
        );
      }
    } else if (!lively && oneDrive) {
      dispatchDriveRecentMore(
        {
          $top: 5,
        },
        latestActionCancelToken.current.token,
      );
    } else if (lively && oneDrive) {
      dispatchLivelyAndDriveRecentMore(
        { itemsPerPage: 5 },
        { $top: 5 },
        latestActionCancelToken.current.token,
      );
    }
  };

  const [recentFiles, setRecentFiles] = useState([]);

  useEffect(() => {
    if (latestActionCancelToken.current) {
      latestActionCancelToken.current.cancel();
    }
    latestActionCancelToken.current = axios.CancelToken.source();
    setRecentFiles([]);
    if (lively && !oneDrive) {
      handlelatestActionType();
    } else if (!lively && oneDrive) {
      dispatchDriveRecent({ $top: 5 }, latestActionCancelToken.current.token);
    } else if (lively && oneDrive) {
      dispatchLivelyAndDriveRecent(
        { itemsPerPage: 5, page: 1 },
        { $top: 5 },
        latestActionCancelToken.current.token,
      );
    }
  }, [lively, oneDrive, latestActionType]);

  useEffect(() => {
    if (lively && oneDrive) {
      let recent = [];
      if (!_.isEmpty(livelyAndDriveRecent.livelyData)) {
        recent = transformCommunityData(livelyAndDriveRecent.livelyData);
      }
      if (
        livelyAndDriveRecent.driveData &&
        !_.isEmpty(livelyAndDriveRecent.driveData.value)
      ) {
        recent = [
          ...recent,
          ...transformRecentEntityData(livelyAndDriveRecent.driveData.value),
        ];
      }
      setRecentFiles([...recentFiles, ..._.sortBy(recent, 'date')]);
    }
  }, [livelyAndDriveRecent]);

  const stepCancelToken = useRef();

  useEffect(() => {
    if (contentCancelToken.current) {
      contentCancelToken.current.cancel();
    }
    if (stepCancelToken.current) {
      stepCancelToken.current.cancel();
    }
    stepCancelToken.current = axios.CancelToken.source();
    if (step === 'myDocuments' || step === 'communityGroupList') {
      setSelectedCommunityGroup({});
      setSelectedCommunity({});
      setSelectedCommunityTab({});
      setOneDriveBreadcrumbs([]);
      setOneDriveStep('OneDrive');
    }
    if (step === 'communityGroupList') {
      dispatchCommunityGroupList(
        { order: true },
        stepCancelToken.current.token,
      );
    } else if (step === 'communityList') {
      dispatchCommunityList(
        {
          group: selectedCommunityGroup.uid,
          filter: 'lively',
          gplusCommunity: 'ALL',
          orderBy: 'sequenceNumber',
        },
        stepCancelToken.current.token,
      );
      setSelectedCommunity({});
      setSelectedCommunityTab({});
    } else if (step === 'communityTabList') {
      dispatchCommunityTabList(
        {
          communityUid: selectedCommunity.uid,
        },
        stepCancelToken.current.token,
      );
      setSelectedCommunityTab({});
    } else if (step === 'communityFileList') {
      dispatchCommunityFileList(
        {
          communityUid: selectedCommunity.uid,
          tabUid: selectedCommunityTab.uid,
        },
        stepCancelToken.current.token,
      );
    }
  }, [step]);

  const handleCommunityGroupClick = communityGroup => {
    setSelectedCommunityGroup(communityGroup);
    setStep('communityList');
  };

  const handleCommunityClick = community => {
    setSelectedCommunity(community);
    setStep('communityTabList');
  };

  const handleCommunityTabClick = communityTab => {
    setSelectedCommunityTab(communityTab);
    setStep('communityFileList');
  };

  const handleCheckbox = useCallback(
    file => document => e => {
      if (e.target.checked) {
        setDocuments(_documents => [..._documents, { ...file, ...document }]);
      } else {
        setDocuments(_documents =>
          _.filter(_documents, _document => !_.isMatch(_document, document)),
        );
      }
    },
    [],
  );

  return (
    <>
      <Helmet>
        <title>DocumentBar</title>
        <meta name="description" content="Description of DocumentBar" />
      </Helmet>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            {!filter && (
              <>
                <Grid item>
                  <Chip
                    icon={latestActionType === 'latestOpens' ? <Check /> : null}
                    color={
                      latestActionType === 'latestOpens' ? 'primary' : 'default'
                    }
                    label="Recently Viewed"
                    onClick={() => setLatestActionType('latestOpens')}
                    variant="outlined"
                    disabled={oneDrive}
                  />
                </Grid>
                <Grid item>
                  <Chip
                    icon={
                      latestActionType === 'latestUpdates' ? <Check /> : null
                    }
                    color={
                      latestActionType === 'latestUpdates'
                        ? 'primary'
                        : 'default'
                    }
                    label="Recently Updated"
                    onClick={() => setLatestActionType('latestUpdates')}
                    variant="outlined"
                    disabled={oneDrive}
                  />
                </Grid>
              </>
            )}
            {filter &&
              (!(
                searchCommunityFileLoading ||
                searchEntityLoading ||
                searchCommunityAndEntityLoading
              ) ||
                (communityDataTotal !== 0 || entityDataTotal !== 0)) && (
                <Grid item>
                  <Chip
                    label={`${
                      !oneDrive && lively
                        ? searchCommunityFile.total
                        : oneDrive && !lively
                        ? searchEntity.total
                        : oneDrive && lively
                        ? communityDataTotal + entityDataTotal
                        : ''
                    } Results`}
                    onDelete={handleSearchCancel}
                  />
                </Grid>
              )}
            <Divider orientation="vertical" flexItem variant="middle" />
            <Grid item>
              <Chip
                icon={lively ? <Check /> : null}
                color={lively ? 'primary' : 'default'}
                label="Lively"
                onClick={() => {
                  if (lively && oneDrive) {
                    setStep('myDocuments');
                  }
                  setLively(!oneDrive || (oneDrive && !lively));
                }}
                variant="outlined"
              />
            </Grid>
            {microsoftIntegration.value && (
              <Grid item>
                <Chip
                  icon={oneDrive ? <Check /> : null}
                  color={oneDrive ? 'primary' : 'default'}
                  label="OneDrive"
                  onClick={handleOneDrive}
                  variant="outlined"
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {filter && (
            <>
              {lively && !oneDrive && (
                <InfiniteScroll
                  dataLength={_.size(searchCommunityFile.rows)}
                  next={handleSearchMore}
                  hasMore={
                    (searchCommunityPage - 1) * 20 < searchCommunityFile.total
                  }
                  scrollableTarget={scrollableTarget}
                >
                  <Header />
                  <List>
                    {_.map(searchCommunityFile.rows, file => (
                      <Item
                        key={file.fileUid}
                        type={file.fileType}
                        name={file.fileName}
                        user={
                          file.author
                            ? `${file.author.firstName} ${file.author.lastName}`
                            : ''
                        }
                        date={file.fileUploadedDate}
                        onClick={() => {
                          dispatchOpenGallery(file.objectFileType, 0, [
                            {
                              ...file,
                              uid: file.fileUid,
                              isInternal: !(
                                file.isExternalFile || file.isGdrive
                              ),
                            },
                          ]);
                        }}
                        allowSelect={allowSelect}
                        onChange={handleCheckbox({
                          fileUid: file.fileUid,
                          isExternalFile: file.isExternalFile || file.isGdrive,
                          url: file.url,
                          externalSource: file.externalSource,
                        })}
                        checked={_.some(documents, {
                          fileUid: file.fileUid,
                        })}
                      />
                    ))}
                  </List>
                </InfiniteScroll>
              )}
              {!lively && oneDrive && !_.isEmpty(searchEntity) && (
                <InfiniteScroll
                  dataLength={_.size(searchEntity.hits)}
                  next={handleSearchEntityMore}
                  hasMore={searchEntity.moreResultsAvailable}
                  scrollableTarget={scrollableTarget}
                >
                  <Header />
                  <List>
                    {_.map(searchEntity.hits, hit => (
                      <Item
                        key={hit.resource.id}
                        link={hit.resource.webUrl}
                        type={_.last(_.split(hit.resource.name, '.'))}
                        name={hit.resource.name}
                        user={
                          hit.resource.createdBy
                            ? hit.resource.createdBy.user.displayName
                            : hit.resource.lastModifiedBy
                            ? hit.resource.lastModifiedBy.user.displayName
                            : ''
                        }
                        date={hit.resource.createdDateTime}
                        allowSelect={allowSelect}
                        onChange={handleCheckbox({
                          fileUid: hit.resource.id,
                          isExternalFile: true,
                          url: hit.resource.webUrl,
                          externalSource: 'OneDrive',
                        })}
                        checked={_.some(documents, {
                          fileUid: hit.resource.id,
                        })}
                      />
                    ))}
                  </List>
                </InfiniteScroll>
              )}
              {lively && oneDrive && !_.isEmpty(searchResults) && (
                <InfiniteScroll
                  dataLength={_.size(searchResults)}
                  next={handlesearchCommunityAndEntityMore}
                  hasMore={
                    hasMore || moreResultsAvailable || !_.isEmpty(bufferResults)
                  }
                  scrollableTarget={scrollableTarget}
                >
                  <Header />
                  <List>
                    {_.map(searchResults, result => (
                      <Item
                        key={result.id}
                        link={result.link}
                        type={result.type}
                        name={result.name}
                        user={result.user}
                        date={result.date}
                        onClick={() => {
                          if (result.objectFileType) {
                            dispatchOpenGallery(result.objectFileType, 0, [
                              {
                                ...result,
                                uid: result.id,
                                isInternal: result.isInternal,
                              },
                            ]);
                          }
                        }}
                        allowSelect={allowSelect}
                        onChange={handleCheckbox({
                          fileUid: result.id,
                          isExternalFile: !result.isInternal,
                          url: result.link,
                          externalSource: result.externalSource,
                        })}
                        checked={_.some(documents, {
                          fileUid: result.id,
                        })}
                      />
                    ))}
                  </List>
                </InfiniteScroll>
              )}
              {(searchCommunityFileLoading ||
                searchEntityLoading ||
                searchCommunityAndEntityLoading) && <LoadingSkeleton />}
            </>
          )}
          {!filter && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {((lively &&
                  !oneDrive &&
                  ((_.isEmpty(latestOpens) && latestOpensLoading) ||
                    (_.isEmpty(latestUpdates) && latestUpdatesLoading))) ||
                  (!lively &&
                    oneDrive &&
                    _.isEmpty(driveRecent) &&
                    driveRecentLoading) ||
                  (lively &&
                    oneDrive &&
                    _.isEmpty(recentFiles) &&
                    livelyAndDriveRecentLoading)) && (
                  <Grid container spacing={2}>
                    {_.map(_.range(4), index => (
                      <Grid item xs={3} key={index}>
                        <Skeleton variant="rect" height={365} width="100%" />
                      </Grid>
                    ))}
                  </Grid>
                )}
                {!oneDrive && lively && (
                  <>
                    {latestActionType === 'latestOpens' &&
                      !_.isEmpty(latestOpens) && (
                        <Swiper
                          spaceBetween={30}
                          slidesPerView={4}
                          navigation
                          virtual
                          onReachEnd={handlelatestActionType}
                          style={{ padding: '5px 15px' }}
                        >
                          {_.map(latestOpens, (file, index) => (
                            <SwiperSlide
                              virtualIndex={index}
                              key={file.fileUid}
                            >
                              <Document
                                id={file.fileUid}
                                name={file.fileName}
                                date={file.fileUploadedDate}
                                thumbGalleryUrl={file.thumbGalleryUrl}
                                headerLogoUrl={
                                  file.author ? file.author.headerLogoUrl : ''
                                }
                                user={
                                  file.author
                                    ? `${file.author.firstName} ${
                                        file.author.lastName
                                      }`
                                    : ''
                                }
                                onClick={() => {
                                  dispatchOpenGallery(file.objectFileType, 0, [
                                    {
                                      ...file,
                                      uid: file.fileUid,
                                      isInternal: !(
                                        file.isExternalFile || file.isGdrive
                                      ),
                                    },
                                  ]);
                                }}
                                allowSelect={allowSelect}
                                onChange={handleCheckbox({
                                  fileUid: file.fileUid,
                                  fileExtension: file.fileType,
                                  isExternalFile:
                                    file.isExternalFile || file.isGdrive,
                                  url: file.url,
                                  externalSource: file.externalSource,
                                })}
                                checked={_.some(documents, {
                                  fileUid: file.fileUid,
                                })}
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      )}
                    {latestActionType === 'latestUpdates' &&
                      !_.isEmpty(latestUpdates) && (
                        <Swiper
                          spaceBetween={30}
                          slidesPerView={4}
                          navigation
                          virtual
                          onReachEnd={handlelatestActionType}
                          style={{ padding: '5px 15px' }}
                        >
                          {_.map(latestUpdates, (file, index) => (
                            <SwiperSlide
                              virtualIndex={index}
                              key={file.fileUid}
                            >
                              <Document
                                id={file.fileUid}
                                name={file.fileName}
                                date={file.fileUploadedDate}
                                thumbGalleryUrl={file.thumbGalleryUrl}
                                headerLogoUrl={
                                  file.author ? file.author.headerLogoUrl : ''
                                }
                                user={
                                  file.author
                                    ? `${file.author.firstName} ${
                                        file.author.lastName
                                      }`
                                    : ''
                                }
                                onClick={() => {
                                  dispatchOpenGallery(file.objectFileType, 0, [
                                    {
                                      ...file,
                                      uid: file.fileUid,
                                      isInternal: !(
                                        file.isExternalFile || file.isGdrive
                                      ),
                                    },
                                  ]);
                                }}
                                allowSelect={allowSelect}
                                onChange={handleCheckbox({
                                  fileUid: file.fileUid,
                                  fileExtension: file.fileType,
                                  isExternalFile:
                                    file.isExternalFile || file.isGdrive,
                                  url: file.url,
                                  externalSource: file.externalSource,
                                })}
                                checked={_.some(documents, {
                                  fileUid: file.fileUid,
                                })}
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      )}
                  </>
                )}
                {!lively && oneDrive && !_.isEmpty(driveRecent.value) && (
                  <Swiper
                    spaceBetween={30}
                    slidesPerView={4}
                    navigation
                    virtual
                    onReachEnd={handlelatestActionType}
                    style={{ padding: '5px 15px' }}
                  >
                    {_.map(driveRecent.value, (file, index) => (
                      <SwiperSlide virtualIndex={index} key={file.id}>
                        <Document
                          id={file.remoteItem ? file.remoteItem.id : file.id}
                          link={file.webUrl}
                          name={file.name}
                          user={file.createdBy.user.displayName}
                          date={file.createdDateTime}
                          allowSelect={allowSelect}
                          onChange={handleCheckbox({
                            fileUid: file.id,
                            fileExtension: file.mimeType,
                            isExternalFile: true,
                            url: file.webUrl,
                            externalSource: 'OneDrive',
                          })}
                          checked={_.some(documents, {
                            fileUid: file.id,
                          })}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
                {lively && oneDrive && !_.isEmpty(recentFiles) && (
                  <Swiper
                    spaceBetween={30}
                    slidesPerView={4}
                    navigation
                    virtual
                    onReachEnd={handlelatestActionType}
                    style={{ padding: '5px 15px' }}
                  >
                    {_.map(recentFiles, (file, index) => (
                      <SwiperSlide virtualIndex={index} key={file.id}>
                        <Document
                          id={file.id}
                          link={file.link}
                          thumbGalleryUrl={file.thumbGalleryUrl}
                          headerLogoUrl={file.headerLogoUrl}
                          name={file.name}
                          user={file.user}
                          date={file.date}
                          onClick={() => {
                            if (file.objectFileType) {
                              dispatchOpenGallery(file.objectFileType, 0, [
                                {
                                  ...file,
                                  uid: file.id,
                                  isInternal: file.isInternal,
                                },
                              ]);
                            }
                          }}
                          allowSelect={allowSelect}
                          onChange={handleCheckbox({
                            fileUid: file.id,
                            fileExtension: file.type,
                            isExternalFile: !file.isInternal,
                            url: file.link,
                            externalSource: file.externalSource,
                          })}
                          checked={_.some(documents, {
                            fileUid: file.id,
                          })}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}
              </Grid>
              <Grid item xs={12}>
                <Paper variant="outlined" square style={{ padding: 16 }}>
                  {(step !== 'OneDrive' || !oneDrive) && lively && (
                    <Breadcrumbs>
                      <Link
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          setStep('myDocuments');
                        }}
                      >
                        My Documents
                      </Link>
                      {step !== 'myDocuments' && step !== 'OneDrive' && (
                        <Link
                          href="#"
                          onClick={e => {
                            e.preventDefault();
                            setStep('communityGroupList');
                          }}
                        >
                          Lively Documents
                        </Link>
                      )}
                      {!_.isEmpty(selectedCommunityGroup) && (
                        <Link
                          href="#"
                          onClick={e => {
                            e.preventDefault();
                            setStep('communityList');
                          }}
                        >
                          {selectedCommunityGroup.groupName}
                        </Link>
                      )}
                      {!_.isEmpty(selectedCommunity) && (
                        <Link
                          href="#"
                          onClick={e => {
                            e.preventDefault();
                            setStep('communityTabList');
                          }}
                        >
                          {selectedCommunity.label}
                        </Link>
                      )}
                      {!_.isEmpty(selectedCommunityTab) && (
                        <Link
                          href="#"
                          onClick={e => {
                            e.preventDefault();
                            setStep('communityFileList');
                          }}
                        >
                          {selectedCommunityTab.tabName}
                        </Link>
                      )}
                    </Breadcrumbs>
                  )}
                  {(step === 'OneDrive' || !lively) && oneDrive && (
                    <Breadcrumbs
                      maxItems={5}
                      itemsBeforeCollapse={3}
                      itemsAfterCollapse={2}
                    >
                      <Link
                        href="#"
                        onClick={e => {
                          e.preventDefault();
                          setStep('myDocuments');
                        }}
                      >
                        My Documents
                      </Link>
                      {step === 'OneDrive' && (
                        <Link
                          href="#"
                          onClick={e => {
                            e.preventDefault();
                            setOneDriveStep('OneDrive');
                            setOneDriveBreadcrumbs([]);
                          }}
                        >
                          OneDrive
                        </Link>
                      )}
                      {oneDriveStep === 'PersonalOneDrive' && (
                        <Link
                          href="#"
                          onClick={e => {
                            e.preventDefault();
                            handlePersonalOneDrive();
                          }}
                        >
                          Personal OneDrive
                        </Link>
                      )}
                      {oneDriveStep === 'SharePointSites' && (
                        <Link
                          href="#"
                          onClick={e => {
                            e.preventDefault();
                            handleSharePointSites();
                          }}
                        >
                          SharePoint
                        </Link>
                      )}
                      {_.map(oneDriveBreadcrumbs, oneDriveBreadcrumb => (
                        <Link
                          href="#"
                          onClick={e =>
                            handleContentClick(
                              e,
                              oneDriveBreadcrumb,
                              'Breadcrumbs',
                            )
                          }
                          key={oneDriveBreadcrumb.id}
                        >
                          {oneDriveBreadcrumb.displayName ||
                            oneDriveBreadcrumb.name}
                        </Link>
                      ))}
                    </Breadcrumbs>
                  )}
                </Paper>
                <Header />
                <List>
                  {step === 'myDocuments' && (
                    <>
                      {lively && (
                        <FolderItem
                          onClick={() => setStep('communityGroupList')}
                          text="Documents de la plateforme"
                        />
                      )}
                      {oneDrive && (
                        <FolderItem
                          onClick={() => setStep('OneDrive')}
                          text="OneDrive"
                        />
                      )}
                    </>
                  )}
                  {step !== 'OneDrive' && lively && (
                    <>
                      {step === 'communityGroupList' && (
                        <>
                          {communityGroupListLoading && <LoadingSkeleton />}
                          {_.map(communityGroupList, communityGroup => (
                            <FolderItem
                              key={communityGroup.uid}
                              onClick={() =>
                                handleCommunityGroupClick(communityGroup)
                              }
                              text={communityGroup.groupName}
                            />
                          ))}
                        </>
                      )}
                      {step === 'communityList' && (
                        <>
                          {communityListLoading && <LoadingSkeleton />}
                          {_.map(communityList, community => (
                            <FolderItem
                              key={community.uid}
                              onClick={() => handleCommunityClick(community)}
                              text={community.label}
                            />
                          ))}
                        </>
                      )}
                      {step === 'communityTabList' && (
                        <>
                          {communityTabListLoading && <LoadingSkeleton />}
                          {_.map(communityTabList, communityTab => (
                            <FolderItem
                              key={communityTab.uid}
                              onClick={() =>
                                handleCommunityTabClick(communityTab)
                              }
                              text={communityTab.tabName}
                            />
                          ))}
                        </>
                      )}
                      {step === 'communityFileList' && (
                        <>
                          {communityFileListLoading && <LoadingSkeleton />}
                          {_.map(communityFileList, file => (
                            <Item
                              key={file.fileUid}
                              type={file.fileType}
                              name={file.fileName}
                              user={
                                file.author
                                  ? `${file.author.firstName} ${
                                      file.author.lastName
                                    }`
                                  : ''
                              }
                              date={file.fileUploadedDate}
                              onClick={e => e.preventDefault()}
                              allowSelect={allowSelect}
                              onChange={handleCheckbox({
                                fileUid: file.fileUid,
                                isExternalFile:
                                  file.isExternalFile || file.isGdrive,
                                url: file.url,
                                externalSource: file.externalSource,
                              })}
                              checked={_.some(documents, {
                                fileUid: file.fileUid,
                              })}
                            />
                          ))}
                        </>
                      )}
                    </>
                  )}
                  {step === 'OneDrive' && oneDrive && (
                    <>
                      {oneDriveStep === 'OneDrive' && (
                        <>
                          <FolderItem
                            onClick={handlePersonalOneDrive}
                            text="Personal OneDrive"
                          />
                          <FolderItem
                            onClick={handleSharePointSites}
                            text="SharePoint"
                          />
                        </>
                      )}
                      {(oneDriveStep === 'PersonalOneDrive' ||
                        oneDriveStep === 'SharePointSites') &&
                        _.map(contents.value, content => (
                          <Item
                            key={content.id}
                            link={content.webUrl}
                            type={
                              content.file ? content.file.mimeType : 'Folder'
                            }
                            name={content.displayName || content.name}
                            user={
                              content.createdBy
                                ? content.createdBy.user.displayName
                                : content.lastModifiedBy
                                ? content.lastModifiedBy.user.displayName
                                : ''
                            }
                            date={content.createdDateTime}
                            onClick={e =>
                              handleContentClick(e, content, 'Item')
                            }
                            allowSelect={
                              allowSelect && !_.isEmpty(content.file)
                            }
                            onChange={handleCheckbox({
                              fileUid: content.id,
                              isExternalFile: true,
                              url: content.webUrl,
                              externalSource: 'OneDrive',
                            })}
                            checked={_.some(documents, {
                              fileUid: content.id,
                            })}
                          />
                        ))}
                      {contentsLoading && <LoadingSkeleton />}
                    </>
                  )}
                </List>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        elevation={1}
        disableEnforceFocus
      >
        <div style={{ width: '80vw', padding: 16 }}>
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={4}>
              <Typography gutterBottom>Community</Typography>
              <Autocomplete
                disableCloseOnSelect
                multiple
                onChange={(event, newValue) =>
                  setCommunityFilter(_.map(newValue, ({ uid }) => uid))
                }
                size="small"
                options={communityOptions}
                loading={communityOptionsLoading}
                getOptionLabel={option => option.label}
                renderOption={(option, { selected }) => (
                  <>
                    <Checkbox checked={selected} />
                    {option.label}
                  </>
                )}
                renderTags={value => (
                  <Chip
                    label={`${_.size(value)} selected`}
                    variant="outlined"
                    size="small"
                  />
                )}
                renderInput={params => (
                  <TextField
                    placeholder="Select Community"
                    variant="outlined"
                    {...params}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography gutterBottom>File Type</Typography>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Select Type"
                size="small"
                select
                SelectProps={{
                  multiple: true,
                  renderValue: selected => selected.join(', '),
                  value: typeFilter,
                  onChange: e => setTypeFilter(e.target.value),
                }}
              >
                {_.map(_.filter(fileType, type => type !== 'Image'), type => (
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
            <Grid item xs={4}>
              <Typography gutterBottom>Uploaded By</Typography>
              <Autocomplete
                disableCloseOnSelect
                multiple
                value={authorFilter}
                onChange={(event, newValue) => setAuthorFilter(newValue)}
                size="small"
                options={authorList}
                loading={authorListLoading}
                getOptionLabel={option =>
                  `${option.firstName} ${option.lastName}`
                }
                renderOption={option => (
                  <>
                    <Checkbox checked={_.includes(authorFilter, option)} />
                    <Avatar
                      src={option.headerLogoUrl}
                      style={{ marginRight: 10 }}
                    >
                      {initials([option.firstName, option.lastName])}
                    </Avatar>
                    {`${option.firstName} ${option.lastName}`}
                  </>
                )}
                renderTags={value => (
                  <Chip
                    label={`${_.size(value)} selected`}
                    variant="outlined"
                    size="small"
                  />
                )}
                renderInput={params => (
                  <TextField
                    placeholder="Select Author"
                    variant="outlined"
                    {...params}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography gutterBottom>Date from</Typography>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                format="MMM dd, yyyy"
                value={dateFrom}
                onChange={date => setDateFrom(date)}
                autoOk
                disableFuture
                fullWidth
                TextFieldComponent={textFieldProps => (
                  <TextField
                    {...textFieldProps}
                    size="small"
                    variant="outlined"
                    InputProps={{
                      ...textFieldProps.InputProps,
                      style: { paddingRight: 0 },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Typography gutterBottom>Date to</Typography>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                inputVariant="outlined"
                format="MMM dd, yyyy"
                value={dateTo}
                onChange={date => setDateTo(date)}
                autoOk
                disableFuture
                fullWidth
                TextFieldComponent={textFieldProps => (
                  <TextField
                    {...textFieldProps}
                    size="small"
                    variant="outlined"
                    InputProps={{
                      ...textFieldProps.InputProps,
                      style: { paddingRight: 0 },
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={4}>
              <Grid container spacing={2} justify="flex-end">
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setAnchorEl(null);
                      handleSearchCancel();
                    }}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setAnchorEl(null);
                      handleSearch();
                    }}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Popover>
    </>
  );
}

DocumentBar.propTypes = {
  dispatchLatestOpen: PropTypes.func,
  dispatchLatestUpdates: PropTypes.func,
  latestOpens: PropTypes.array,
  latestOpensLoading: PropTypes.bool,
  latestUpdates: PropTypes.array,
  latestUpdatesLoading: PropTypes.bool,
  dispatchCommunityGroupList: PropTypes.func,
  communityGroupList: PropTypes.array,
  communityGroupListLoading: PropTypes.bool,
  dispatchCommunityList: PropTypes.func,
  communityList: PropTypes.array,
  communityListLoading: PropTypes.bool,
  dispatchCommunityTabList: PropTypes.func,
  communityTabList: PropTypes.array,
  communityTabListLoading: PropTypes.bool,
  dispatchCommunityFileList: PropTypes.func,
  communityFileList: PropTypes.array,
  communityFileListLoading: PropTypes.bool,
  dispatchSearchCommunityFile: PropTypes.func,
  searchCommunityFile: PropTypes.object,
  searchCommunityPage: PropTypes.number,
  searchCommunityFileLoading: PropTypes.bool,
  dispatchSearchCommunityFileMore: PropTypes.func,
  dispatchCommunityOptions: PropTypes.func,
  communityOptions: PropTypes.array,
  communityOptionsLoading: PropTypes.bool,
  dispatchFileType: PropTypes.func,
  fileType: PropTypes.array,
  dispatchAuthorList: PropTypes.func,
  authorList: PropTypes.array,
  authorListLoading: PropTypes.bool,
  dispatchConfig: PropTypes.func,
  config: PropTypes.object,
  dispatchExternalSource: PropTypes.func,
  externalSource: PropTypes.array,
  dispatchDriveRecent: PropTypes.func,
  dispatchDriveRecentMore: PropTypes.func,
  dispatchListChildrenRoot: PropTypes.func,
  dispatchListChildrenDriveItem: PropTypes.func,
  dispatchListItemsDrive: PropTypes.func,
  dispatchSharePointSites: PropTypes.func,
  dispatchDocumentLibraries: PropTypes.func,
  contents: PropTypes.object,
  contentsLoading: PropTypes.bool,
  driveRecent: PropTypes.object,
  driveRecentLoading: PropTypes.bool,
  dispatchSearchEntity: PropTypes.func,
  searchEntity: PropTypes.object,
  searchEntityLoading: PropTypes.bool,
  searchEntityFrom: PropTypes.number,
  dispatchSearchEntityMore: PropTypes.func,
  dispatchSearchCommunityAndEntity: PropTypes.func,
  dispatchSearchCommunityAndEntityMore: PropTypes.func,
  searchCommunityAndEntity: PropTypes.object,
  searchCommunityAndEntityPage: PropTypes.number,
  searchCommunityAndEntityLoading: PropTypes.bool,
  dispatchOpenGallery: PropTypes.func,
  dispatchLivelyAndDriveRecent: PropTypes.func,
  livelyAndDriveRecent: PropTypes.object,
  livelyAndDriveRecentLoading: PropTypes.bool,
  dispatchLivelyAndDriveRecentMore: PropTypes.func,
  q: PropTypes.string,
  setQ: PropTypes.func,
  inputRef: PropTypes.object,
  anchorEl: PropTypes.object,
  setAnchorEl: PropTypes.func,
  scrollableTarget: PropTypes.string,
  microsoftIntegration: PropTypes.object,
  allowSelect: PropTypes.bool,
  documents: PropTypes.array,
  setDocuments: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  latestOpens: makeSelectLatestOpens(),
  latestOpensLoading: makeSelectLatestOpensLoading(),
  latestUpdates: makeSelectLatestUpdates(),
  latestUpdatesLoading: makeSelectLatestUpdatesLoading(),
  communityGroupList: makeSelectCommunityGroupList(),
  communityGroupListLoading: makeSelectCommunityGroupListLoading(),
  communityList: makeSelectCommunityList(),
  communityListLoading: makeSelectCommunityListLoading(),
  communityTabList: makeSelectCommunityTabList(),
  communityTabListLoading: makeSelectCommunityTabListLoading(),
  communityFileList: makeSelectCommunityFileList(),
  communityFileListLoading: makeSelectCommunityFileListLoading(),
  searchCommunityFile: makeSelectSearchCommunityFile(),
  searchCommunityPage: makeSelectSearchCommunityPage(),
  searchCommunityFileLoading: makeSelectSearchCommunityFileLoading(),
  communityOptions: makeSelectCommunityOptions(),
  communityOptionsLoading: makeSelectCommunityOptionsLoading(),
  fileType: makeSelectFileType(),
  authorList: makeSelectAuthorList(),
  authorListLoading: makeSelectAuthorListLoading(),
  // config: makeSelectConfig(),
  // externalSource: makeSelectExternalSource(),
  contents: makeSelectContents(),
  contentsLoading: makeSelectContentsLoading(),
  driveRecent: makeSelectDriveRecent(),
  driveRecentLoading: makeSelectDriveRecentLoading(),
  searchEntity: makeSelectSearchEntity(),
  searchEntityLoading: makeSelectSearchEntityLoading(),
  searchEntityFrom: makeSelectSearchEntityFrom(),
  searchCommunityAndEntity: makeSelectSearchCommunityAndEntity(),
  searchCommunityAndEntityPage: makeSelectSearchCommunityAndEntityPage(),
  searchCommunityAndEntityLoading: makeSelectSearchCommunityAndEntityLoading(),
  livelyAndDriveRecent: makeSelectLivelyAndDriveRecent(),
  livelyAndDriveRecentLoading: makeSelectLivelyAndDriveRecentLoading(),
  microsoftIntegration: makeSelectConfig('MICROSOFT_INTEGRATION'),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchLatestOpen: (options, cancelToken) =>
      dispatch(latestOpensAction(options, cancelToken)),
    dispatchLatestUpdates: (options, cancelToken) =>
      dispatch(latestUpdatesAction(options, cancelToken)),
    dispatchCommunityGroupList: (options, cancelToken) =>
      dispatch(communityGroupListAction(options, cancelToken)),
    dispatchCommunityList: (options, cancelToken) =>
      dispatch(communityListAction(options, cancelToken)),
    dispatchCommunityTabList: (options, cancelToken) =>
      dispatch(communityTabListAction(options, cancelToken)),
    dispatchCommunityFileList: (options, cancelToken) =>
      dispatch(communityFileListAction(options, cancelToken)),
    dispatchSearchCommunityFile: (options, cancelToken) =>
      dispatch(searchCommunityFileAction(options, cancelToken)),
    dispatchSearchCommunityFileMore: (options, cancelToken) =>
      dispatch(searchCommunityFileMore(options, cancelToken)),
    dispatchCommunityOptions: options =>
      dispatch(communityOptionsAction(options)),
    dispatchFileType: () => dispatch(fileTypeAction()),
    dispatchAuthorList: options => dispatch(authorListAction(options)),
    dispatchConfig: options => dispatch(configAction(options)),
    dispatchExternalSource: options => dispatch(externalSourceAction(options)),
    dispatchDriveRecent: (options, cancelToken) =>
      dispatch(driveRecentAction(options, cancelToken)),
    dispatchDriveRecentMore: (options, cancelToken) =>
      dispatch(driveRecentMore(options, cancelToken)),
    dispatchListChildrenRoot: (options, cancelToken) =>
      dispatch(listChildrenRootAction(options, cancelToken)),
    dispatchListChildrenDriveItem: (driveId, itemId, options, cancelToken) =>
      dispatch(
        listChildrenDriveItemAction(driveId, itemId, options, cancelToken),
      ),
    dispatchListItemsDrive: (driveId, options, cancelToken) =>
      dispatch(listItemsDriveAction(driveId, options, cancelToken)),
    dispatchSharePointSites: (options, cancelToken) =>
      dispatch(sharePointSitesAction(options, cancelToken)),
    dispatchDocumentLibraries: (siteId, options, cancelToken) =>
      dispatch(documentLibrariesAction(siteId, options, cancelToken)),
    dispatchSearchEntity: (options, cancelToken) =>
      dispatch(searchEntityAction(options, cancelToken)),
    dispatchSearchEntityMore: (options, cancelToken) =>
      dispatch(searchEntityMore(options, cancelToken)),
    dispatchSearchCommunityAndEntity: (
      communityFileOptions,
      entityOptions,
      cancelToken,
    ) =>
      dispatch(
        searchCommunityAndEntityAction(
          communityFileOptions,
          entityOptions,
          cancelToken,
        ),
      ),
    dispatchSearchCommunityAndEntityMore: (
      communityFileOptions,
      entityOptions,
      cancelToken,
    ) =>
      dispatch(
        searchCommunityAndEntityMore(
          communityFileOptions,
          entityOptions,
          cancelToken,
        ),
      ),
    dispatchOpenGallery: (galleryType, activeIndex, options) =>
      dispatch(openGallery(galleryType, activeIndex, options)),
    dispatchLivelyAndDriveRecent: (livelyOptions, driveOptions, cancelToken) =>
      dispatch(
        livelyAndDriveRecentAction(livelyOptions, driveOptions, cancelToken),
      ),
    dispatchLivelyAndDriveRecentMore: (
      livelyOptions,
      driveOptions,
      cancelToken,
    ) =>
      dispatch(
        livelyAndDriveRecentMore(livelyOptions, driveOptions, cancelToken),
      ),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(DocumentBar);

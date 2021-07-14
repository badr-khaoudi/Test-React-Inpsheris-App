/* eslint-disable indent */
/**
 *
 * CreateCommunity
 *
 */

import React, {
  memo,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import Dropzone from 'react-dropzone';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { useMsal, useIsAuthenticated } from '@azure/msal-react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  List,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import ListItem from '@material-ui/core/ListItem';
import Radio from '@material-ui/core/Radio';
import { Close, Image } from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { closeCreateCommunity } from 'containers/AuthBase/actions';
import { Thumbnail } from 'components/FeedTypes/Wrapper';
import { BlockButton } from 'containers/ContentCreation/Wrapper';
import ImageCrop from 'containers/ImageCrop/Loadable';
import LinkDocumentLibrary from 'containers/LinkDocumentLibrary/Loadable';
import { Header } from 'containers/CommunityHome/Wrapper';
import {
  transformLink,
  transformDocument,
  transformImage,
  transformVideo,
} from 'utils/helpers/transformBlock';
import { makeSelectConfig } from 'containers/AuthBase/selectors';
import {
  makeSelectCommunityGroupList,
  makeSelectTabTypeList,
  makeSelectCreateCommunityLoading,
  makeSelectCreateCommunitySuccess,
  makeSelectUploadFile,
  makeSelectCommunity,
  makeSelectCommunityLoading,
  makeSelectJoinedTeams,
  makeSelectJoinedTeamsLoading,
  makeSelectListChannels,
  makeSelectListChannelsLoading,
  makeSelectFilesFolder,
  makeSelectDeleteTab,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import {
  communityGroupList as communityGroupListAction,
  tabTypeList as tabTypeListAction,
  createCommunity,
  cleanCreateCommunity,
  uploadFile,
  community as communityAction,
  deleteTab as deleteTabAction,
  resetCommunity,
  joinedTeams as joinedTeamsAction,
  listChannels as listChannelsAction,
  filesFolder as filesFolderAction,
} from './actions';
import Tab from './Tab';
import AddDescription from './AddDescription';
import { CreateCommunitySchema } from './Schema';

const emptyTab = {
  tabSelected: true,
  privated: false,
  tabSize: '6',
  defaultSelected: false,
  authorizeComment: true,
  authorizeLike: true,
  descriptionBlocks: [],
  displayMode: 'list',
  isMicrosoftChannel: false,
  microsoftChannelId: '',
  microsoftChannelSharedDocument: '',
  documentOnNfs: false,
  nfsRoot: '',
  folderGDrive: '',
  keyFile: '',
  translations: [],
  searchKeys: [],
  folderSharepoint: '',
};

const defaultTabs = [
  'Home',
  'Article',
  'Document',
  'Quickpost',
  'Event',
  'ImageGallery',
  'DocumentTree',
];

const SortableListItem = SortableElement(
  ({
    tab,
    handleTab,
    handleDeleteTab,
    authorizeShare,
    addDescription,
    isLinkMicrosoftTeam,
    linkMicrosoftChannel,
    linkDocumentLibrary,
  }) => (
    <Grid item xs={12}>
      <Tab
        tab={tab}
        handleTab={handleTab}
        handleDeleteTab={handleDeleteTab}
        authorizeShare={authorizeShare}
        addDescription={addDescription}
        isLinkMicrosoftTeam={isLinkMicrosoftTeam}
        linkMicrosoftChannel={linkMicrosoftChannel}
        linkDocumentLibrary={linkDocumentLibrary}
      />
    </Grid>
  ),
);

const SortableList = SortableContainer(
  ({
    tabs,
    handleTab,
    handleDeleteTab,
    authorizeShare,
    addDescription,
    isLinkMicrosoftTeam,
    linkMicrosoftChannel,
    linkDocumentLibrary,
  }) => (
    <Grid container spacing={2}>
      {_.map(tabs, (tab, index) => (
        <SortableListItem
          key={tab.uid}
          index={index}
          tab={tab}
          handleTab={handleTab(tab.uid)}
          handleDeleteTab={() => handleDeleteTab(tab.uid)}
          authorizeShare={authorizeShare}
          addDescription={() => addDescription(tab.uid)}
          isLinkMicrosoftTeam={isLinkMicrosoftTeam}
          linkMicrosoftChannel={() => linkMicrosoftChannel(tab.uid)}
          linkDocumentLibrary={() => linkDocumentLibrary(tab.uid)}
        />
      ))}
    </Grid>
  ),
);

const transformBlocks = blocks =>
  _.map(blocks, block => {
    if (block.type === 'documentGallery') {
      return {
        ...block,
        documents: _.map(block.documents, document =>
          transformDocument(document),
        ),
      };
    }
    if (block.type === 'linkEmbed') {
      return {
        ...block,
        links: _.map(block.links, link => transformLink(link)),
      };
    }
    if (block.type === 'videoGallery') {
      return {
        ...block,
        videos: _.map(block.videos, video => transformVideo(video)),
      };
    }
    if (block.type === 'ImageGallery') {
      return {
        ...block,
        images: _.map(block.images, image => transformImage(image)),
      };
    }
    return block;
  });

export function CreateCommunity(props) {
  useInjectReducer({ key: 'createCommunity', reducer });
  useInjectSaga({ key: 'createCommunity', saga });
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const {
    dispatchCloseCreateCommunity,
    communityUid,
    dispatchCommunityGroupList,
    communityGroupList,
    dispatchTabTypeList,
    tabTypeList,
    dispatchCreateCommunity,
    createCommunityLoading,
    createCommunitySuccess,
    dispatchCleanCreateCommunity,
    dispatchUploadFile,
    logoImage,
    bannerImage,
    dispatchCommunity,
    community,
    dispatchDeleteTab,
    communityLoading,
    dispatchResetCommunity,
    microsoftIntegration,
    dispatchJoinedTeams,
    joinedTeams,
    joinedTeamsLoading,
    dispatchListChannels,
    listChannels,
    listChannelsLoading,
    dispatchFilesFolder,
    filesFolder,
    deleteTab,
  } = props;

  useEffect(() => {
    if (communityUid) {
      dispatchCommunity({ status: 'all', uid: communityUid });
      dispatchTabTypeList();
    }
    if (_.isEmpty(communityGroupList)) {
      dispatchCommunityGroupList();
    }
  }, [communityUid]);

  const [communityType, setCommunityType] = useState(undefined);
  const [label, setLabel] = useState('');
  const [description, setDescription] = useState('');
  const [groupUid, setGroupUid] = useState('');
  const [authorizeShare, setAuthorizeShare] = useState('on');
  const [authorizeComment, setAuthorizeComment] = useState(true);
  const [authorizeLike, setAuthorizeLike] = useState(true);
  const [isGplusCommunity, setIsGplusCommunity] = useState(false);
  const [gplusCommunityLink, setGplusCommunityLink] = useState('');
  const [isLinkMicrosoftTeam, setIsLinkMicrosoftTeam] = useState(false);
  const [microsoftTeamId, setMicrosoftTeamId] = useState('');
  const [isAddAutoExternalCalendar, setIsAddAutoExternalCalendar] = useState(
    true,
  );
  const [externalCalendarId, setExternalCalendarId] = useState('');
  const [privated, setPrivated] = useState(false);
  // const [isPrivateShareable, setIsPrivateShareable] = useState(false);
  const [tabs, setTabs] = useState([]);
  const [logo, setLogo] = useState({});
  const [banner, setBanner] = useState({});
  const [logoCropOpen, setLogoCropOpen] = useState(false);
  const [bannerCropOpen, setBannerCropOpen] = useState(false);
  const [tabTypeOpen, setTabTypeOpen] = useState(false);
  const [tabUid, setTabUid] = useState(undefined);
  const communityRef = useRef(false);
  const [addDescriptionOpen, setAddDescriptionOpen] = useState(false);
  const [microsoftTeamsOpen, setMicrosoftTeamsOpen] = useState(false);
  const [microsoftChannelOpen, setMicrosoftChannelOpen] = useState(false);
  const [linkDocumentLibraryOpen, setLinkDocumentLibraryOpen] = useState(false);

  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const loginPopup = async () => {
    const response = await instance.loginPopup({
      scopes: ['User.Read', 'Team.ReadBasic.All'],
      prompt: 'select_account',
    });
    return response;
  };

  useEffect(() => {
    if (isLinkMicrosoftTeam) {
      if (!isAuthenticated) {
        loginPopup();
      }
    }
  }, [isLinkMicrosoftTeam]);

  const [tempChannelId, setTempChannelId] = useState('');

  const linkMicrosoftChannel = useCallback(
    async uid => {
      if (!isAuthenticated) {
        await loginPopup();
      }
      setTempChannelId(_.find(tabs, { uid }).microsoftChannelId || '');
      dispatchListChannels(microsoftTeamId);
      setTabUid(uid);
      setMicrosoftChannelOpen(true);
    },
    [microsoftTeamId, isAuthenticated, tabs],
  );

  const selectedChannelIds = useMemo(
    () => _.compact(_.map(tabs, tab => tab.microsoftChannelId)),
    [tabs],
  );

  const handleMicrosoftTeams = async () => {
    if (!isAuthenticated) {
      await loginPopup();
    }
    dispatchJoinedTeams();
    setMicrosoftTeamsOpen(true);
  };

  const handleMicrosoftChannel = () => {
    setMicrosoftChannelOpen(false);
    if (tempChannelId) {
      handleTab(tabUid)('microsoftChannelId', tempChannelId);
      dispatchFilesFolder(tabUid, microsoftTeamId, tempChannelId);
      setTempChannelId('');
      setTabUid(undefined);
    }
  };

  const linkDocumentLibrary = useCallback(async uid => {
    if (!isAuthenticated) {
      await loginPopup();
    }
    setTabUid(uid);
    setLinkDocumentLibraryOpen(true);
  }, []);

  const handleLinkDocumentLibrary = folderSharepoint => {
    setLinkDocumentLibraryOpen(false);
    handleTab(tabUid)('folderSharepoint', folderSharepoint);
    setTabUid(undefined);
  };

  useEffect(() => {
    if (!_.isEmpty(filesFolder)) {
      handleTab(filesFolder.tabUid)(
        'microsoftChannelSharedDocument',
        `${filesFolder.data.parentReference.driveId}/${filesFolder.data.id}`,
      );
    }
  }, [filesFolder]);

  useEffect(() => {
    if (communityUid && !_.isEmpty(community) && !_.isEmpty(tabTypeList)) {
      if (!communityRef.current) {
        communityRef.current = true;
        dispatchResetCommunity();
        setCommunityType(community.communityType);
        setLabel(community.label);
        setDescription(community.description);
        setGroupUid(community.group.uid);
        setAuthorizeShare(community.authorizeShare);
        setAuthorizeComment(community.authorizeComment === 'on');
        setAuthorizeLike(community.authorizeLiket === 'on');
        setIsGplusCommunity(community.isGplusCommunity);
        setGplusCommunityLink(community.gplusCommunityLink);
        setIsLinkMicrosoftTeam(community.isLinkMicrosoftTeam);
        setMicrosoftTeamId(community.microsoftTeamId);
        setIsAddAutoExternalCalendar(community.isAddAutoExternalCalendar);
        setExternalCalendarId(community.externalCalendarId);
        setPrivated(Boolean(community.privated));
        setTabs(community.tabs);
        setLogo({
          logoUid: community.logoUid,
          logoUrl: community.logoUrl,
          headerLogoUrl: community.headerLogoUrl,
        });
        setBanner({
          bannerUid: community.bannerUid,
          bannerUrl: community.bannerUrl,
          headerBannerUrl: community.headerBannerUrl,
        });
      }
    }
  }, [communityUid, community, tabTypeList]);

  useEffect(() => {
    if (privated) {
      setAuthorizeShare('off');
    }
  }, [privated]);

  const handleOnDrop = useCallback((field, files) => {
    const file = _.head(files);
    const formData = new FormData();
    formData.append('fileName', file.name);
    formData.append('file', file);
    dispatchUploadFile(field, formData);
  }, []);

  useEffect(() => {
    if (!_.isEmpty(logoImage)) {
      setLogoCropOpen(true);
    }
  }, [logoImage]);

  useEffect(() => {
    if (!_.isEmpty(bannerImage)) {
      setBannerCropOpen(true);
    }
  }, [bannerImage]);

  const handleLogoCrop = cropImage => {
    setLogo({
      ...cropImage,
      logoUid: cropImage.uid,
      logoUrl: cropImage.urls[0],
      headerLogoUrl: `${cropImage.urls[1]}/?t=${moment().format('x')}`,
    });
  };

  const handleBannerCrop = cropImage => {
    setBanner({
      ...cropImage,
      bannerUid: cropImage.uid,
      bannerUrl: cropImage.urls[0],
      headerBannerUrl: `${cropImage.urls[1]}/?t=${moment().format('x')}`,
    });
  };

  useEffect(() => {
    if (
      !communityUid &&
      communityType === 'Regular' &&
      _.isEmpty(tabTypeList)
    ) {
      dispatchTabTypeList();
    }
  }, [communityType]);

  const newTab = useCallback(
    tabType => ({
      uid: _.uniqueId('TAB-'),
      tabName: tabType,
      tabType,
      authorizeShare: authorizeShare === 'on',
      ...emptyTab,
    }),
    [authorizeShare],
  );

  useEffect(() => {
    if (
      !communityUid &&
      communityType === 'Regular' &&
      !_.isEmpty(tabTypeList)
    ) {
      setTabs(
        _.map(_.intersection(tabTypeList, defaultTabs), tabType =>
          newTab(_.toLower(tabType)),
        ),
      );
    }
  }, [communityType, tabTypeList]);

  const handleAddTab = tabType => {
    setTabs([...tabs, newTab(tabType)]);
    setTabTypeOpen(false);
  };

  const handleTab = useCallback(
    uid => (name, value) =>
      setTabs(_tabs =>
        _.map(_tabs, tab =>
          tab.uid === uid ? { ...tab, [name]: value } : tab,
        ),
      ),
    [],
  );

  const handleDeleteTab = useCallback(uid => {
    if (!_.startsWith(uid, 'TAB-')) {
      dispatchDeleteTab(communityUid, { uid });
    } else {
      setTabs(_tabs => _.filter(_tabs, tab => tab.uid !== uid));
    }
  }, []);

  useEffect(() => {
    if (!_.isEmpty(deleteTab)) {
      setTabs(_tabs => _.filter(_tabs, tab => !_.includes(deleteTab, tab.uid)));
    }
  }, [deleteTab]);

  const addDescription = useCallback(uid => {
    setTabUid(uid);
    setAddDescriptionOpen(true);
  }, []);

  const handleDescriptionBlocks = useCallback(
    value => {
      handleTab(tabUid)('descriptionBlocks', value);
    },
    [tabUid],
  );

  useEffect(() => {
    if (_.isEmpty(tabs) || authorizeShare === 'custom') {
      return;
    }
    setTabs(
      _.map(tabs, tab => ({ ...tab, authorizeShare: authorizeShare === 'on' })),
    );
  }, [authorizeShare]);

  const handlePublish = () => {
    const payload = {
      communityUid,
      label,
      groupUid,
      communityType,
      description,
      privated,
      isPrivateShareable: false,
      logo: !_.isEmpty(logo) ? logo.logoUid : undefined,
      banner: !_.isEmpty(banner) ? banner.bannerUid : undefined,
      isLinkMicrosoftTeam,
      microsoftTeamId: isLinkMicrosoftTeam ? microsoftTeamId : undefined,
      isGplusCommunity,
      gplusCommunityLink: isGplusCommunity ? gplusCommunityLink : undefined,
      isAddAutoExternalCalendar: true,
      externalCalendarId: !isAddAutoExternalCalendar
        ? externalCalendarId
        : undefined,
      authorizeShare,
      authorizeComment: authorizeComment ? 'on' : 'off',
      authorizeLike: authorizeLike ? 'on' : 'off',
      tabs: _.map(
        tabs,
        (
          {
            uid,
            descriptionBlocks,
            isMicrosoftChannel,
            microsoftChannelId,
            microsoftChannelSharedDocument,
            tabType,
            documentOnNfs,
            nfsRoot,
            folderGDrive,
            keyFile,
            searchKeys,
            folderSharepoint,
            ...rest
          },
          index,
        ) => ({
          ...rest,
          tabOrder: index,
          uid: _.startsWith(uid, 'TAB-') ? undefined : uid,
          descriptionCreationBlocks: transformBlocks(descriptionBlocks),
          isMicrosoftChannel:
            isLinkMicrosoftTeam && microsoftTeamId && isMicrosoftChannel,
          microsoftChannelId:
            isLinkMicrosoftTeam && microsoftTeamId && isMicrosoftChannel
              ? microsoftChannelId
              : undefined,
          microsoftChannelSharedDocument:
            isLinkMicrosoftTeam && microsoftTeamId && isMicrosoftChannel
              ? microsoftChannelSharedDocument
              : undefined,
          tabType,
          documentOnNfs:
            tabType === 'collection' || tabType === 'document'
              ? documentOnNfs
              : undefined,
          nfsRoot:
            tabType === 'collection' || tabType === 'document'
              ? nfsRoot
              : undefined,
          folderGDrive: tabType === 'gdrive' ? folderGDrive : undefined,
          keyFile:
            tabType === 'gdrive' || tabType === 'joboffer'
              ? keyFile
              : undefined,
          searchKeys: tabType === 'search' ? searchKeys : undefined,
          folderSharepoint:
            tabType === 'sharepoint' ? folderSharepoint : undefined,
        }),
      ),
    };
    const result = CreateCommunitySchema.validate(payload);
    if (result.error) {
      enqueueSnackbar(`${result.error}`, {
        variant: 'error',
      });
    }
    if (!result.error) {
      dispatchCreateCommunity(payload);
    }
  };

  useEffect(() => {
    if (createCommunitySuccess) {
      dispatchCloseCreateCommunity();
    }
  }, [createCommunitySuccess]);

  useEffect(() => dispatchCleanCreateCommunity, []);

  return (
    <>
      <Helmet>
        <title>CreateCommunity</title>
        <meta name="description" content="Description of CreateCommunity" />
      </Helmet>
      <Dialog open scroll="paper" fullWidth maxWidth="lg" disableEnforceFocus>
        <DialogTitle>
          Create Community
          <IconButton
            aria-label="close"
            onClick={dispatchCloseCreateCommunity}
            style={{ position: 'absolute', top: 5, right: 5 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {communityLoading && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Skeleton variant="rect" height={40} />
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant="rect" height={80} />
              </Grid>
              <Grid item xs={12}>
                <Skeleton variant="rect" height={40} />
              </Grid>
            </Grid>
          )}
          {!communityUid && !communityType && (
            <Grid container spacing={2} justify="center">
              <Grid item xs={12}>
                <Typography variant="h6" align="center">
                  Choisissez le type de communauté
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button
                  onClick={() => setCommunityType('Regular')}
                  variant="outlined"
                  color="primary"
                  size="large"
                  fullWidth
                >
                  Communauté Standard
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  onClick={() => setCommunityType('MSTeam')}
                  variant="outlined"
                  color="primary"
                  size="large"
                  fullWidth
                  disabled
                >
                  Communauté Microsoft
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  onClick={() => setCommunityType('GSuite')}
                  variant="outlined"
                  color="primary"
                  size="large"
                  fullWidth
                  disabled
                >
                  Communauté Google
                </Button>
              </Grid>
            </Grid>
          )}
          {communityType && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={label}
                  onChange={e => setLabel(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  size="small"
                  multiline
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Choisir un pôle"
                  variant="outlined"
                  fullWidth
                  size="small"
                  select
                  value={groupUid}
                  onChange={e => setGroupUid(e.target.value)}
                >
                  {_.map(communityGroupList, communityGroup => (
                    <MenuItem
                      key={communityGroup.uid}
                      value={communityGroup.uid}
                    >
                      {communityGroup.groupName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Autoriser le partage"
                  variant="outlined"
                  fullWidth
                  size="small"
                  select
                  value={authorizeShare}
                  onChange={e => setAuthorizeShare(e.target.value)}
                  disabled={privated}
                >
                  <MenuItem value="on">On</MenuItem>
                  <MenuItem value="off">Off</MenuItem>
                  <MenuItem value="custom">Personnalisé</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={authorizeComment}
                      onChange={e => setAuthorizeComment(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Autoriser le commentaire"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={authorizeLike}
                      onChange={e => setAuthorizeLike(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Autoriser le like"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isGplusCommunity}
                      onChange={e => setIsGplusCommunity(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Est-ce une communauté Google Plus?"
                />
              </Grid>
              {microsoftIntegration.value && (
                <Grid item xs={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isLinkMicrosoftTeam}
                        onChange={e => setIsLinkMicrosoftTeam(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Is Microsoft Team?"
                  />
                </Grid>
              )}
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={privated}
                      onChange={e => setPrivated(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Privé"
                />
              </Grid>
              {isGplusCommunity && (
                <Grid item xs={12}>
                  <TextField
                    label="Insérer le lien de la communauté G+"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={gplusCommunityLink}
                    onChange={e => setGplusCommunityLink(e.target.value)}
                  />
                </Grid>
              )}
              {isLinkMicrosoftTeam && (
                <Grid item xs={12}>
                  <Button
                    onClick={handleMicrosoftTeams}
                    variant="outlined"
                    color="primary"
                  >
                    {microsoftTeamId ? 'Changer MS team' : 'Lien MS team'}
                  </Button>
                </Grid>
              )}
              <Grid item xs={12}>
                <SortableList
                  tabs={tabs}
                  axis="xy"
                  onSortEnd={({ oldIndex, newIndex }) =>
                    setTabs(arrayMove(tabs, oldIndex, newIndex))
                  }
                  lockToContainerEdges
                  useDragHandle
                  helperClass="sortableHelper"
                  handleTab={handleTab}
                  handleDeleteTab={handleDeleteTab}
                  authorizeShare={authorizeShare}
                  addDescription={addDescription}
                  isLinkMicrosoftTeam={isLinkMicrosoftTeam && microsoftTeamId}
                  linkMicrosoftChannel={linkMicrosoftChannel}
                  linkDocumentLibrary={linkDocumentLibrary}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={() => setTabTypeOpen(true)}
                  variant="outlined"
                  color="primary"
                >
                  Ajouter un onglet
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2} justify="center">
                  <Grid item xs={3}>
                    <Thumbnail style={{ color: 'inherit' }}>
                      <Dropzone
                        accept="image/png, image/jpg, image/gif, image/jpeg"
                        maxFiles={1}
                        onDrop={acceptedFiles =>
                          handleOnDrop('logoImage', acceptedFiles)
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <BlockButton
                            style={
                              !logo.headerLogoUrl
                                ? {
                                    backgroundColor: '#eceeef',
                                    border: '1px solid rgba(0, 0, 0, 0.12)',
                                  }
                                : {}
                            }
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            {!logo.headerLogoUrl ? (
                              <>
                                <Image fontSize="large" />
                                <Typography>Upload Logo Image</Typography>
                              </>
                            ) : (
                              <img
                                src={logo.headerLogoUrl}
                                alt="Logo"
                                width="100%"
                              />
                            )}
                          </BlockButton>
                        )}
                      </Dropzone>
                    </Thumbnail>
                  </Grid>
                  {logo.headerLogoUrl && (
                    <Grid item xs={12}>
                      <Grid container spacing={2} justify="center">
                        <Grid item xs={3}>
                          <Button
                            variant="outlined"
                            fullWidth
                            color="primary"
                            onClick={() => setLogoCropOpen(true)}
                          >
                            Recrop Image
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2} justify="center">
                  <Grid item xs={12}>
                    <Header>
                      <Dropzone
                        accept="image/png, image/jpg, image/gif, image/jpeg"
                        maxFiles={1}
                        onDrop={acceptedFiles =>
                          handleOnDrop('bannerImage', acceptedFiles)
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <BlockButton
                            style={
                              !banner.headerBannerUrl
                                ? {
                                    backgroundColor: '#eceeef',
                                    border: '1px solid rgba(0, 0, 0, 0.12)',
                                  }
                                : {}
                            }
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            {!banner.headerBannerUrl ? (
                              <>
                                <Image fontSize="large" />
                                <Typography>Upload Banner Image</Typography>
                              </>
                            ) : (
                              <img
                                src={banner.headerBannerUrl}
                                alt="Banner"
                                width="100%"
                              />
                            )}
                          </BlockButton>
                        )}
                      </Dropzone>
                    </Header>
                  </Grid>
                  {banner.headerBannerUrl && (
                    <Grid item xs={3}>
                      <Button
                        variant="outlined"
                        fullWidth
                        color="primary"
                        onClick={() => setBannerCropOpen(true)}
                      >
                        Recrop Image
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handlePublish}
            variant="outlined"
            color="primary"
            disabled={!communityType || createCommunityLoading}
          >
            Publish
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="xs"
        onClose={() => setTabTypeOpen(false)}
        open={tabTypeOpen}
      >
        <DialogTitle>Sélectionner un onglet</DialogTitle>
        <DialogContent dividers style={{ maxHeight: 400 }}>
          <List>
            {_.map(_.without(tabTypeList, 'Chat', 'Applinks'), tabType => (
              <ListItem
                key={tabType}
                button
                onClick={() => handleAddTab(_.toLower(tabType))}
              >
                <ListItemText primary={tabType} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={microsoftTeamsOpen}
        onClose={() => setMicrosoftTeamsOpen(false)}
      >
        <DialogTitle>Microsoft Teams</DialogTitle>
        <DialogContent dividers style={{ maxHeight: 400 }}>
          {joinedTeamsLoading ? (
            _.map(_.range(4), index => (
              <Skeleton
                key={index}
                variant="rect"
                height={50}
                style={{ marginBottom: 5 }}
              />
            ))
          ) : (
            <List>
              {_.map(joinedTeams.value, joinedTeam => (
                <ListItem
                  key={joinedTeam.id}
                  button
                  onClick={() => setMicrosoftTeamId(joinedTeam.id)}
                >
                  <ListItemIcon>
                    <Radio
                      edge="start"
                      disableRipple
                      checked={microsoftTeamId === joinedTeam.id}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={joinedTeam.displayName}
                    secondary={joinedTeam.description}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setMicrosoftTeamsOpen(false)}
            variant="outlined"
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={microsoftChannelOpen}
        onClose={() => {
          setMicrosoftChannelOpen(false);
          setTempChannelId('');
        }}
      >
        <DialogTitle>Microsoft Channel</DialogTitle>
        <DialogContent dividers style={{ maxHeight: 400 }}>
          {listChannelsLoading ? (
            _.map(_.range(4), index => (
              <Skeleton
                key={index}
                variant="rect"
                height={50}
                style={{ marginBottom: 5 }}
              />
            ))
          ) : (
            <List>
              {_.map(listChannels.value, listChannel => (
                <ListItem
                  key={listChannel.id}
                  button
                  onClick={() => setTempChannelId(listChannel.id)}
                  disabled={_.includes(selectedChannelIds, listChannel.id)}
                >
                  <ListItemIcon>
                    <Radio
                      edge="start"
                      disableRipple
                      checked={tempChannelId === listChannel.id}
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={listChannel.displayName}
                    secondary={listChannel.description}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleMicrosoftChannel}
            variant="outlined"
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
      {logoCropOpen && (
        <ImageCrop
          image={
            !_.isEmpty(logoImage)
              ? _.head(logoImage)
              : { url: logo.logoUrl, uid: logo.logoUid }
          }
          handleClose={() => setLogoCropOpen(false)}
          handleImageCrop={handleLogoCrop}
          imageMap={theme.imageMap.logoDimensions}
        />
      )}
      {bannerCropOpen && (
        <ImageCrop
          image={
            !_.isEmpty(bannerImage)
              ? _.head(bannerImage)
              : {
                  url: banner.bannerUrl,
                  uid: banner.bannerUid,
                }
          }
          handleClose={() => setBannerCropOpen(false)}
          handleImageCrop={handleBannerCrop}
          imageMap={theme.imageMap.communityBanner}
        />
      )}
      {tabUid && addDescriptionOpen && (
        <AddDescription
          descriptionBlocks={_.find(tabs, { uid: tabUid }).descriptionBlocks}
          handleDescriptionBlocks={handleDescriptionBlocks}
          handleClose={() => {
            setTabUid(undefined);
            setAddDescriptionOpen(false);
          }}
        />
      )}
      {linkDocumentLibraryOpen && (
        <LinkDocumentLibrary
          handleClose={() => {
            setTabUid(undefined);
            setLinkDocumentLibraryOpen(false);
          }}
          handleOk={handleLinkDocumentLibrary}
        />
      )}
    </>
  );
}

CreateCommunity.propTypes = {
  dispatchCloseCreateCommunity: PropTypes.func,
  communityUid: PropTypes.string,
  dispatchCommunityGroupList: PropTypes.func,
  communityGroupList: PropTypes.array,
  dispatchTabTypeList: PropTypes.func,
  tabTypeList: PropTypes.array,
  dispatchCreateCommunity: PropTypes.func,
  createCommunityLoading: PropTypes.bool,
  createCommunitySuccess: PropTypes.bool,
  dispatchCleanCreateCommunity: PropTypes.func,
  dispatchUploadFile: PropTypes.func,
  logoImage: PropTypes.array,
  bannerImage: PropTypes.array,
  dispatchCommunity: PropTypes.func,
  community: PropTypes.object,
  dispatchDeleteTab: PropTypes.func,
  communityLoading: PropTypes.bool,
  dispatchResetCommunity: PropTypes.func,
  microsoftIntegration: PropTypes.object,
  dispatchJoinedTeams: PropTypes.func,
  joinedTeams: PropTypes.object,
  joinedTeamsLoading: PropTypes.bool,
  dispatchListChannels: PropTypes.func,
  listChannels: PropTypes.object,
  listChannelsLoading: PropTypes.bool,
  dispatchFilesFolder: PropTypes.func,
  filesFolder: PropTypes.object,
  deleteTab: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  communityGroupList: makeSelectCommunityGroupList(),
  tabTypeList: makeSelectTabTypeList(),
  createCommunityLoading: makeSelectCreateCommunityLoading(),
  createCommunitySuccess: makeSelectCreateCommunitySuccess(),
  logoImage: makeSelectUploadFile('logoImage'),
  bannerImage: makeSelectUploadFile('bannerImage'),
  community: makeSelectCommunity(),
  communityLoading: makeSelectCommunityLoading(),
  microsoftIntegration: makeSelectConfig('MICROSOFT_INTEGRATION'),
  joinedTeams: makeSelectJoinedTeams(),
  joinedTeamsLoading: makeSelectJoinedTeamsLoading(),
  listChannels: makeSelectListChannels(),
  listChannelsLoading: makeSelectListChannelsLoading(),
  filesFolder: makeSelectFilesFolder(),
  deleteTab: makeSelectDeleteTab(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCloseCreateCommunity: () => dispatch(closeCreateCommunity()),
    dispatchCommunityGroupList: () => dispatch(communityGroupListAction()),
    dispatchTabTypeList: () => dispatch(tabTypeListAction()),
    dispatchCreateCommunity: options => dispatch(createCommunity(options)),
    dispatchCleanCreateCommunity: () => dispatch(cleanCreateCommunity()),
    dispatchUploadFile: (field, options) =>
      dispatch(uploadFile(field, options)),
    dispatchCommunity: options => dispatch(communityAction(options)),
    dispatchDeleteTab: (communityUid, options) =>
      dispatch(deleteTabAction(communityUid, options)),
    dispatchResetCommunity: () => dispatch(resetCommunity()),
    dispatchJoinedTeams: () => dispatch(joinedTeamsAction()),
    dispatchListChannels: teamId => dispatch(listChannelsAction(teamId)),
    dispatchFilesFolder: (tabUid, teamId, channelId) =>
      dispatch(filesFolderAction(tabUid, teamId, channelId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CreateCommunity);

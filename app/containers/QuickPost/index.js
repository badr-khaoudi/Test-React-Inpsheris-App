/* eslint-disable indent */
/**
 *
 * QuickPost
 *
 */

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { FormattedMessage, useIntl } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  ListItemText,
  ListSubheader,
  Avatar,
  FormHelperText,
  Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import {
  Close,
  Videocam,
  Folder,
  Image,
  InsertLink,
  ArrowBack,
} from '@material-ui/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { initials } from 'utils/helpers/avatarInitials';
import { communityTabSelection } from 'utils/helpers/communityTabSelection';
import {
  transformLink,
  transformDocument,
  transformImage,
  transformVideo,
} from 'utils/helpers/transformBlock';
import { checkFavicon } from 'utils/helpers/checkFavicon';
import { useCloseEffect } from 'utils/helpers/useCloseEffect';
import SelectCommunity from 'components/SelectCommunity/Loadable';
import VideoBlock from 'containers/VideoBlock/Loadable';
import DocumentBlock from 'containers/DocumentBlock/Loadable';
import LinkBlock from 'components/LinkBlock/Loadable';
import Hashtag from 'containers/Hashtag/Loadable';
import TextareaAutocomplete from 'components/TextareaAutocomplete/Loadable';
import {
  getCommunityList,
  filterCommunityList,
  contentCreation,
  closeQuickPost,
} from 'containers/AuthBase/actions';
import {
  makeSelectCurrentUser,
  makeSelectPinCommunityPost,
  makeSelectLastThreeArticles,
  makeSelectCommunityList,
  makeSelectCommunityListLoading,
} from 'containers/AuthBase/selectors';
import { makeSelectFeed } from 'containers/GlobalEntities/selectors';
import { LinkEmbed } from 'components/FeedTypes';
import { useEffectAfterMount } from 'utils/helpers/useEffectAfterMount';
import {
  makeSelectCanPublish,
  makeSelectQuickPostSuccess,
  makeSelectEmbedUrl,
  makeSelectOEmbed,
  makeSelectOEmbedError,
  makeSelectQuickPostLoading,
} from './selectors';
import {
  createQuickPost,
  getContentDetails,
  resetQuickPost,
  createFAQ,
  quickSharingOfTheLink,
  getEmbedUrl,
  getOEmbed,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import { CommunitySelect } from './Wrapper';
import messages from './messages';
import { QuickPostSchema } from './Schema';

const id = uuidv4();

const transformQuickLink = async link => {
  let { favicon } = link;
  if (favicon === undefined) {
    const result = await checkFavicon(`${link.provider_url}/favicon.ico`);
    if (result.status === 'Ok') {
      favicon = result.path;
    }
  }
  return {
    description: link.description,
    favicon,
    location: link.url,
    path: link.url,
    subTitle: link.provider_name,
    thumbnail_height: link.thumbnail_height,
    thumbnail_url: link.thumbnail_url,
    thumbnail_width: link.thumbnail_width,
    title: link.title,
    type: link.type,
    version: link.version,
  };
};

export function QuickPost(props) {
  useInjectReducer({ key: 'quickPost', reducer });
  useInjectSaga({ key: 'quickPost', saga });

  const { enqueueSnackbar } = useSnackbar();

  const {
    currentUser,
    pinCommunityPost,
    lastThreeArticles,
    dispatchCommunityList,
    dispatchFilterCommunityList,
    dispatchCreateQuickPost,
    dispatchContentDetails,
    communityList: allCommunities,
    communityListLoading,
    contentDetails,
    open,
    dispatchCloseQuickPost,
    uid: quickPostUid,
    canPublish,
    dispatchResetQuickPost,
    quickPostSuccess,
    type,
    dispatchContentCreation,
    dispatchCreateFAQ,
    dispatchQuickSharingOfTheLink,
    dispatchGetEmbedUrl,
    dispatchGetOEmbed,
    embedUrl,
    oEmbed,
    oEmbedError,
    communityUid,
    communityTabUid,
    quickPostLoading,
  } = props;

  const intl = useIntl();

  useCloseEffect(dispatchCloseQuickPost);

  const [isPinnedTabAllowed, setIsPinnedTabAllowed] = useState(false);
  const [communityList, setCommunityList] = useState([]);

  useEffect(() => {
    if (pinCommunityPost && lastThreeArticles) {
      setIsPinnedTabAllowed(pinCommunityPost.value && !lastThreeArticles.value);
    }
  }, [pinCommunityPost, lastThreeArticles]);

  useEffect(() => {
    if (currentUser && currentUser.role === 'GlobalCommunityManager') {
      setCommunityList(
        communityTabSelection(allCommunities, type, isPinnedTabAllowed),
      );
    } else {
      const allowedCommunities = _.map(
        currentUser.communityRoles,
        communityRole => communityRole.communityUid,
      );
      setCommunityList(
        _.filter(allCommunities, community =>
          _.includes(allowedCommunities, community.uid),
        ),
      );
    }
  }, [currentUser, allCommunities, type]);

  const communityTabs = useMemo(
    () =>
      _.flatten(
        _.map(communityList, community =>
          _.map(community.tabs, ({ uid, tabName }) => ({
            uid,
            tabName,
          })),
        ),
      ),
    [communityList],
  );

  useEffect(() => {
    if (quickPostUid !== undefined) {
      dispatchContentDetails({ uid: quickPostUid });
    }
    if ((communityUid && communityTabUid) || quickPostUid !== undefined) {
      dispatchCommunityList({ filter: 'lively', gplusCommunity: 'ALL' });
    }
  }, []);

  useEffect(() => () => dispatchResetQuickPost(), []);

  useEffect(() => {
    if (quickPostSuccess) {
      enqueueSnackbar('Success', { variant: 'success' });
      dispatchCloseQuickPost();
    }
  }, [quickPostSuccess]);

  // useEffect(() => {
  //   if (
  //     !_.isEmpty(allCommunities) &&
  //     quickPostUid !== undefined &&
  //     contentDetails.detailBlocks === undefined
  //   ) {
  //     dispatchContentDetails({ uid: quickPostUid });
  //   }
  //   setSelectedCommunities(
  //     _.filter(selectedCommunities, community =>
  //       _.find(allCommunities, { uid: community }),
  //     ),
  //   );
  // }, [allCommunities]);

  const [textDetail, setTextDetail] = useState([]);
  const [hashtag, setHashtag] = useState([]);
  const [communitySelectOpen, setCommunitySelectOpen] = useState(false);
  const [selectedCommunities, setSelectedCommunities] = useState([]);
  const [selectedTabs, setSelectedTabs] = useState([]);
  const [parseText, setParseText] = useState('');
  const [url, setUrl] = useState('');
  const [block, setBlock] = useState(undefined);
  const [blockItems, setBlockItems] = useState([]);

  useEffect(() => {
    if (!_.isEmpty(communityTabs) && communityUid && communityTabUid) {
      setSelectedCommunities([communityUid]);
      if (_.find(communityTabs, communityTabUid)) {
        setSelectedTabs([communityTabUid]);
      }
    }
  }, [communityTabs]);

  const blockRef = useRef(false);

  useEffectAfterMount(() => {
    if (quickPostUid && !blockRef.current) {
      blockRef.current = true;
      return;
    }
    if (
      (quickPostUid && blockRef.current) ||
      (!quickPostUid && !blockRef.current)
    ) {
      setBlockItems([]);
    }
  }, [block]);

  useEffect(() => {
    if (type === 'quickSharingOfTheLink') {
      dispatchGetEmbedUrl({ name: 'EMBED_URL' });
    }
  }, []);

  const urlRef = useRef(false);

  useEffect(() => {
    if (url) {
      if (quickPostUid && !urlRef.current) {
        urlRef.current = true;
        return;
      }
      dispatchGetOEmbed({ url, key: embedUrl.key });
    }
  }, [url]);

  useEffect(() => {
    if (oEmbedError)
      enqueueSnackbar(oEmbedError, {
        variant: 'error',
      });
  }, [oEmbedError]);

  const [oEmbedData, setOEmbedData] = useState({});

  useEffect(() => {
    setOEmbedData({ url: oEmbed.url ? oEmbed.url : url, ...oEmbed });
  }, [oEmbed]);

  useEffect(() => {
    if (
      quickPostUid &&
      quickPostUid === contentDetails.uid &&
      contentDetails.detailBlocks &&
      !_.isEmpty(allCommunities)
    ) {
      setSelectedCommunities([contentDetails.community]);
      setSelectedTabs([contentDetails.communityTab]);
      setParseText(_.find(contentDetails.detailBlocks, { type: 'text' }).title);
      setTextDetail(contentDetails.textDetail || []);
      setHashtag(contentDetails.hashtags || []);
      const contentBlock = _.head(
        _.filter(
          contentDetails.detailBlocks,
          detailBlock => detailBlock.type !== 'text',
        ),
      );
      if (_.isEmpty(contentBlock)) {
        setBlock(undefined);
      } else if (!_.isEmpty(contentBlock)) {
        if (contentBlock.type === 'ImageGallery') {
          setBlock('image');
          setBlockItems(contentBlock.images);
        } else if (contentBlock.type === 'videoGallery') {
          setBlock('video');
          setBlockItems(contentBlock.videos);
        } else if (contentBlock.type === 'documentGallery') {
          setBlock('document');
          setBlockItems(contentBlock.documents);
        } else if (
          contentBlock.type === 'linkEmbed' &&
          type !== 'quickSharingOfTheLink'
        ) {
          setBlock('link');
          setBlockItems(
            _.map(contentBlock.links, link => ({ id: uuidv4(), ...link })),
          );
        } else if (type === 'quickSharingOfTheLink') {
          setOEmbedData(_.head(contentBlock.links));
          setUrl(_.head(contentBlock.links).location);
        }
      }
    }
  }, [contentDetails, allCommunities]);

  const handleCommunitySelectOpen = useCallback(() => {
    if (_.isEmpty(communityList)) {
      dispatchCommunityList({ filter: 'lively', gplusCommunity: 'ALL' });
    }
    setCommunitySelectOpen(true);
  }, []);

  const handleCommunitySelectClose = useCallback(() => {
    setCommunitySelectOpen(false);
  }, []);

  const handleFilterCommunities = useCallback(searchText => {
    dispatchFilterCommunityList({
      filter: 'lively',
      gplusCommunity: 'ALL',
      searchText,
    });
  }, []);

  const renderValue = selected =>
    _.map(selected, value =>
      _.find(communityTabs, { uid: value })
        ? _.find(communityTabs, { uid: value }).tabName
        : undefined,
    ).join(', ');

  const handleTabSelect = e => {
    setSelectedTabs(e.target.value);
  };

  const handleSelectCommunityChange = useCallback(() => {
    setSelectedTabs(
      _.compact(
        _.flatten(
          _.map(
            _.filter(
              communityList,
              community => _.indexOf(selectedCommunities, community.uid) > -1,
            ),
            community => {
              if (_.size(community.tabs) === 1) {
                return _.head(community.tabs).uid;
              }
              return _.map(community.tabs, tab =>
                tab.defaultSelected ? tab.uid : null,
              );
            },
          ),
        ),
      ),
    );
    handleCommunitySelectClose();
  }, [communityList]);

  const handleSelectedCommunities = useCallback(
    e => {
      if (_.indexOf(selectedCommunities, e.target.value) > -1) {
        setSelectedCommunities(_.without(selectedCommunities, e.target.value));
      } else {
        setSelectedCommunities([...selectedCommunities, e.target.value]);
      }
    },
    [selectedCommunities],
  );

  const handlePublish = async () => {
    let payload = {
      uid: quickPostUid,
      status: 'publish',
      communityTabUids: selectedTabs,
      quickpostDescription:
        type !== 'quickSharingOfTheLink' ? parseText : undefined,
      type: type === 'quickSharingOfTheLink' ? 'quickSharingOfTheLink' : block,
      language: 'fr',
      hashtag: _.size(hashtag) > 0 ? hashtag.join(',') : undefined,
      textDetail:
        type !== 'quickSharingOfTheLink'
          ? JSON.stringify(
              _.filter(textDetail, text => _.includes(parseText, text.v)),
            )
              .replace('[', '')
              .replace(']', '')
              .replace(/{/g, '@[')
              .replace(/}/g, ']')
              .replace(/"/g, '')
              .replace(/:/g, '=')
          : undefined,
      publicationStartDate: undefined,
      publicationEndDate: undefined,
    };
    if (type === 'quickSharingOfTheLink') {
      const link = await transformQuickLink(oEmbedData);
      payload = {
        ...payload,
        title: link.title,
        links: [link],
      };
    }
    if (block === 'link') {
      payload = {
        ...payload,
        links: _.map(blockItems, item => transformLink(item)),
      };
    }
    if (block === 'document') {
      payload = {
        ...payload,
        documents: _.map(blockItems, item => transformDocument(item)),
      };
    }
    if (block === 'image') {
      payload = {
        ...payload,
        images: _.map(blockItems, item => transformImage(item)),
      };
    }
    if (block === 'video') {
      payload = {
        ...payload,
        videos: _.map(blockItems, item => transformVideo(item)),
      };
    }
    const result = QuickPostSchema.validate({
      ...payload,
      type: payload.type || 'any',
    });
    if (result.error) {
      _.map(result.error.details, error =>
        enqueueSnackbar(error.message, {
          variant: 'error',
        }),
      );
    }
    if (!result.error) {
      if (type === 'quickpost') {
        dispatchCreateQuickPost(payload);
      } else if (type === 'faq') {
        dispatchCreateFAQ(payload);
      } else if (type === 'quickSharingOfTheLink') {
        dispatchQuickSharingOfTheLink(payload);
      }
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={dispatchCloseQuickPost}
        scroll="body"
        fullWidth
        maxWidth="md"
        disableEnforceFocus
      >
        <DialogTitle>
          <FormattedMessage {...messages.createQuickPost} />
          <IconButton
            aria-label="close"
            onClick={dispatchCloseQuickPost}
            style={{ position: 'absolute', top: 5, right: 5 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {!quickPostUid && type === 'faq' && (
                  <Grid item xs={12}>
                    <Button
                      onClick={() => {
                        dispatchCloseQuickPost();
                        dispatchContentCreation();
                      }}
                      startIcon={<ArrowBack />}
                      size="small"
                    >
                      Go Back
                    </Button>
                  </Grid>
                )}
                <Grid item xs={6} onClick={handleCommunitySelectOpen}>
                  <CommunitySelect>
                    <Typography noWrap>
                      {_.size(selectedCommunities) === 0
                        ? intl.formatMessage(messages.communityName)
                        : _.map(
                            _.filter(communityList, community =>
                              _.includes(selectedCommunities, community.uid),
                            ),
                            community => community.label,
                          ).join(', ')}
                    </Typography>
                  </CommunitySelect>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label={intl.formatMessage(messages.selectCommunityTab)}
                    variant="outlined"
                    fullWidth
                    size="small"
                    select
                    disabled={_.isEmpty(selectedCommunities)}
                    SelectProps={{
                      multiple: true,
                      value: selectedTabs,
                      renderValue: selected => renderValue(selected),
                      onChange: handleTabSelect,
                    }}
                  >
                    {_.map(
                      _.filter(
                        communityList,
                        community =>
                          _.indexOf(selectedCommunities, community.uid) > -1,
                      ),
                      community => [
                        <ListSubheader>{community.label}</ListSubheader>,
                        _.map(community.tabs, tab => (
                          <MenuItem key={tab.uid} value={tab.uid} dense>
                            <Checkbox
                              checked={_.indexOf(selectedTabs, tab.uid) > -1}
                              color="primary"
                            />
                            <ListItemText primary={tab.tabName} />
                          </MenuItem>
                        )),
                      ],
                    )}
                  </TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2} wrap="nowrap">
                <Grid item>
                  <Avatar src={currentUser.headerLogoUrl}>
                    {initials(currentUser.displayName)}
                  </Avatar>
                </Grid>
                <Grid item xs zeroMinWidth>
                  {type !== 'quickSharingOfTheLink' ? (
                    <>
                      <TextareaAutocomplete
                        parseText={parseText}
                        setParseText={setParseText}
                        textDetail={textDetail}
                        setTextDetail={setTextDetail}
                        placeholder="What's new?"
                        disabled={_.isEmpty(selectedCommunities)}
                        rows={5}
                      />
                      <FormHelperText>
                        {500 - parseText.length} characters left
                      </FormHelperText>
                    </>
                  ) : (
                    <TextField
                      label="URL"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={url}
                      onChange={e => setUrl(e.target.value)}
                      disabled={_.isEmpty(selectedCommunities)}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
            {type === 'quickSharingOfTheLink' && oEmbedData.type && (
              <Grid item xs={12}>
                <LinkEmbed
                  links={[
                    {
                      path: oEmbedData.url || oEmbedData.path,
                      thumbnail_url: oEmbedData.thumbnail_url,
                      title: oEmbedData.title,
                      description: oEmbedData.description,
                      favicon: oEmbedData.favicon,
                    },
                  ]}
                />
              </Grid>
            )}
            {!_.isEmpty(selectedCommunities) && (
              <>
                {type !== 'quickSharingOfTheLink' && (
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item>
                        <IconButton
                          onClick={() => {
                            setBlock('video');
                          }}
                        >
                          <Videocam fontSize="small" />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton
                          onClick={() => {
                            setBlock('document');
                          }}
                        >
                          <Folder fontSize="small" />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton
                          onClick={() => {
                            setBlock('image');
                          }}
                        >
                          <Image fontSize="small" />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton
                          onClick={() => {
                            setBlock('link');
                          }}
                        >
                          <InsertLink fontSize="small" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Hashtag hashtag={hashtag} setHashtag={setHashtag} />
                </Grid>
                {block === 'video' && (
                  <Grid item xs={12}>
                    <Typography variant="h6">Add videos</Typography>
                    <VideoBlock
                      videos={blockItems}
                      setVideos={setBlockItems}
                      handleClose={() => setBlock(undefined)}
                    />
                  </Grid>
                )}
                {block === 'document' && (
                  <Grid item xs={12}>
                    <Typography variant="h6">Add Documents</Typography>
                    <DocumentBlock
                      type="Documents"
                      id={id}
                      items={blockItems}
                      setItems={setBlockItems}
                      handleClose={() => setBlock(undefined)}
                    />
                  </Grid>
                )}
                {block === 'image' && (
                  <Grid item xs={12}>
                    <Typography variant="h6">Add Images</Typography>
                    <DocumentBlock
                      type="Images"
                      id={id}
                      items={blockItems}
                      setItems={setBlockItems}
                      handleClose={() => setBlock(undefined)}
                    />
                  </Grid>
                )}
                {block === 'link' && (
                  <Grid item xs={12}>
                    <Typography variant="h6">Add embedded links</Typography>
                    <LinkBlock
                      links={blockItems}
                      setLinks={setBlockItems}
                      handleClose={() => setBlock(undefined)}
                    />
                  </Grid>
                )}
              </>
            )}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handlePublish}
            variant="outlined"
            color="primary"
            disabled={
              _.isEmpty(selectedTabs) || !canPublish || quickPostLoading
            }
          >
            {intl.formatMessage(messages.publish)}
          </Button>
        </DialogActions>
      </Dialog>
      {communitySelectOpen && (
        <SelectCommunity
          communitySelectOpen={communitySelectOpen}
          handleClose={handleCommunitySelectClose}
          communityListLoading={communityListLoading}
          communityList={communityList}
          selectedCommunities={selectedCommunities}
          handleSelectedCommunities={handleSelectedCommunities}
          handleFilterCommunities={handleFilterCommunities}
          handleSelectCommunityChange={handleSelectCommunityChange}
        />
      )}
    </>
  );
}

QuickPost.propTypes = {
  currentUser: PropTypes.object,
  pinCommunityPost: PropTypes.object,
  lastThreeArticles: PropTypes.object,
  handleClose: PropTypes.func,
  dispatchCommunityList: PropTypes.func,
  dispatchFilterCommunityList: PropTypes.func,
  dispatchCreateQuickPost: PropTypes.func,
  dispatchContentDetails: PropTypes.func,
  communityList: PropTypes.array,
  communityListLoading: PropTypes.bool,
  intl: PropTypes.object,
  contentDetails: PropTypes.object,
  open: PropTypes.bool,
  dispatchCloseQuickPost: PropTypes.func,
  uid: PropTypes.string,
  canPublish: PropTypes.bool,
  dispatchResetQuickPost: PropTypes.func,
  quickPostSuccess: PropTypes.bool,
  type: PropTypes.string,
  dispatchContentCreation: PropTypes.func,
  dispatchCreateFAQ: PropTypes.func,
  dispatchQuickSharingOfTheLink: PropTypes.func,
  dispatchGetEmbedUrl: PropTypes.func,
  dispatchGetOEmbed: PropTypes.func,
  embedUrl: PropTypes.object,
  oEmbed: PropTypes.object,
  oEmbedError: PropTypes.string,
  communityUid: PropTypes.string,
  communityTabUid: PropTypes.string,
  quickPostLoading: PropTypes.bool,
};

const mapStateToProps = (state, props) =>
  createStructuredSelector({
    currentUser: makeSelectCurrentUser(),
    pinCommunityPost: makeSelectPinCommunityPost(),
    lastThreeArticles: makeSelectLastThreeArticles(),
    communityList: makeSelectCommunityList(),
    communityListLoading: makeSelectCommunityListLoading(),
    contentDetails: makeSelectFeed(props.uid),
    canPublish: makeSelectCanPublish(),
    quickPostSuccess: makeSelectQuickPostSuccess(),
    embedUrl: makeSelectEmbedUrl(),
    oEmbed: makeSelectOEmbed(),
    oEmbedError: makeSelectOEmbedError(),
    quickPostLoading: makeSelectQuickPostLoading(),
  });

function mapDispatchToProps(dispatch) {
  return {
    dispatchCommunityList: options => dispatch(getCommunityList(options)),
    dispatchFilterCommunityList: options =>
      dispatch(filterCommunityList(options)),
    dispatchCreateQuickPost: options => dispatch(createQuickPost(options)),
    dispatchContentDetails: options => dispatch(getContentDetails(options)),
    dispatchResetQuickPost: () => dispatch(resetQuickPost()),
    dispatchContentCreation: () => dispatch(contentCreation()),
    dispatchCreateFAQ: options => dispatch(createFAQ(options)),
    dispatchCloseQuickPost: () => dispatch(closeQuickPost()),
    dispatchQuickSharingOfTheLink: options =>
      dispatch(quickSharingOfTheLink(options)),
    dispatchGetEmbedUrl: options => dispatch(getEmbedUrl(options)),
    dispatchGetOEmbed: options => dispatch(getOEmbed(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withRouter(QuickPost));

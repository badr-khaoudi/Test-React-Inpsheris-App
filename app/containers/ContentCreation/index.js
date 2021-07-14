/* eslint-disable indent */
/**
 *
 * ContentCreation
 *
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Dropzone from 'react-dropzone';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
  Divider,
  Collapse,
  FormGroup,
  FormControlLabel,
  TextField,
  ListSubheader,
  ListItemText,
  FormHelperText,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import {
  Close,
  Description,
  Image,
  Videocam,
  Folder,
  Event,
  MoreHoriz,
  ExpandLess,
  ExpandMore,
  Edit,
  Delete,
} from '@material-ui/icons';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import arrayMove from 'array-move';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  transformLink,
  transformDocument,
  transformImage,
  transformVideo,
} from 'utils/helpers/transformBlock';
import { communityTabSelection } from 'utils/helpers/communityTabSelection';
import { CommunitySelect } from 'containers/QuickPost/Wrapper';
import SelectCommunity from 'components/SelectCommunity/Loadable';
import SortableBlockList from 'components/SortableBlockList/Loadable';
import Hashtag from 'containers/Hashtag/Loadable';
import ImageCrop from 'containers/ImageCrop/Loadable';
import Paragraph from 'containers/Paragraph/Loadable';
import { SimpleMenu } from 'containers/Feed/Wrapper';
import {
  getCommunityList,
  filterCommunityList,
  createQuickPost,
  contentClose,
} from 'containers/AuthBase/actions';
import {
  makeSelectCurrentUser,
  makeSelectPinCommunityPost,
  makeSelectLastThreeArticles,
  makeSelectCommunityList,
  makeSelectCommunityListLoading,
  makeSelectLanguage,
} from 'containers/AuthBase/selectors';
import { makeSelectFeed } from 'containers/GlobalEntities/selectors';
import { useCloseEffect } from 'utils/helpers/useCloseEffect';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import {
  BlockTypes,
  BlockItem,
  BlockButton,
  ItemImage,
  ZenImage,
} from './Wrapper';
import {
  uploadFile,
  cleanUploadFile,
  userCommunity as getUserCommunity,
  templateType as getTemplateType,
  createEvent,
  createArticle,
  createGrandArticle,
  createImageGallery,
  createDocument,
  cleanContentCreation,
  getContentDetails,
  cleanContentDetails,
} from './actions';
import {
  makeSelectUploadFile,
  makeSelectUserCommunity,
  makeSelectTemplateType,
  makeSelectContentSuccess,
  makeSelectContentLoading,
} from './selectors';
import { imageDimensions } from './imageDimensions';
import { ContentSchema } from './Schema';

const SortableListItem = SortableElement(
  ({ page, handlePageEdit, handlePageRemove }) => (
    <Grid item xs={12}>
      <Grid container alignItems="center">
        <Grid item xs>
          {page.title}
        </Grid>
        <Grid item>
          <IconButton onClick={() => handlePageEdit(page.id)}>
            <Edit fontSize="small" />
          </IconButton>
          <IconButton onClick={() => handlePageRemove(page.id)}>
            <Delete fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
      <Divider />
    </Grid>
  ),
);

const SortableList = SortableContainer(
  ({ pages, handlePageEdit, handlePageRemove }) => (
    <Grid container spacing={2}>
      {_.map(pages, (page, index) => (
        <SortableListItem
          key={page.id}
          index={index}
          page={page}
          handlePageEdit={handlePageEdit}
          handlePageRemove={handlePageRemove}
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
    if (block.type === 'event') {
      const {
        eventSourceType,
        eventAuthor,
        isEventFullSeats,
        isParticipatedEvent,
        isStopParticipation,
        ...rest
      } = block;
      return {
        ...rest,
        dateFrom: parseFloat(moment(block.dateFrom).format('x')),
        dateTo: parseFloat(moment(block.dateTo).format('x')),
        googleCalendarPersonalInvitationEmails: _.compact(
          _.split(block.googleCalendarPersonalInvitationEmails, ','),
        ),
      };
    }
    return block;
  });

export function ContentCreation(props) {
  useInjectReducer({ key: 'contentCreation', reducer });
  useInjectSaga({ key: 'contentCreation', saga });

  const { enqueueSnackbar } = useSnackbar();

  const {
    open,
    dispatchContentClose,
    currentUser,
    pinCommunityPost,
    lastThreeArticles,
    dispatchCommunityList,
    dispatchFilterCommunityList,
    communityList: allCommunities,
    communityListLoading,
    dispatchUploadFile,
    dispatchCleanUploadFile,
    uploadFile: uploadedFiles,
    languages,
    dispatchUserCommunity,
    userCommunity,
    dispatchGetTemplateType,
    templateType,
    dispatchCreateEvent,
    dispatchCreateArticle,
    dispatchCreateGrandArticle,
    dispatchCreateImageGallery,
    dispatchCreateDocument,
    contentSuccess,
    dispatchCleanContentCreation,
    uid: contentUid,
    dispatchContentDetails,
    contentDetails,
    dispatchCleanContentDetails,
    dispatchCreateQuickPost,
    communityUid,
    communityTabUid,
    contentLoading,
  } = props;

  useCloseEffect(dispatchContentClose);

  const [headingBlock, setHeadingBlock] = useState({
    modifiedBlock: true,
    subTitle: '',
    title: '',
    type: 'heading',
  });

  const [topImage, setTopImage] = useState({
    uid: '',
    type: 'topImage',
  });

  const [bottomImage, setBottomImage] = useState({
    uid: '',
    type: 'bottomImage',
  });

  const handleHeadingChange = e => {
    setHeadingBlock({ ...headingBlock, [e.target.name]: e.target.value });
  };

  const [isPinnedTabAllowed, setIsPinnedTabAllowed] = useState(false);
  const [communityList, setCommunityList] = useState([]);

  useEffect(() => {
    if (pinCommunityPost && lastThreeArticles) {
      setIsPinnedTabAllowed(pinCommunityPost.value && !lastThreeArticles.value);
    }
  }, [pinCommunityPost, lastThreeArticles]);

  const [type, setType] = useState(undefined);

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

  const [communitySelectOpen, setCommunitySelectOpen] = useState(false);
  const [selectedCommunities, setSelectedCommunities] = useState([]);
  const [selectedTabs, setSelectedTabs] = useState([]);

  useEffect(() => {
    if ((communityUid && communityTabUid) || contentUid !== undefined) {
      dispatchCommunityList({ filter: 'lively', gplusCommunity: 'ALL' });
    }
    if (contentUid !== undefined) {
      dispatchContentDetails({ uid: contentUid });
    }
  }, []);

  useEffect(() => {
    if (!_.isEmpty(communityTabs) && communityUid && communityTabUid) {
      setSelectedCommunities([communityUid]);
      if (_.find(communityTabs, { uid: communityTabUid })) {
        setSelectedTabs([communityTabUid]);
      }
    }
  }, [communityTabs]);

  // useEffect(() => {
  //   setSelectedCommunities(
  //     _.filter(selectedCommunities, community =>
  //       _.find(allCommunities, { uid: community }),
  //     ),
  //   );
  // }, [allCommunities]);

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
  }, [communityList, selectedCommunities]);

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

  const [feedingExpanded, setFeedingExpanded] = useState(true);

  const [feedingState, setFeedingState] = useState({
    allowComment: true,
    newsFeed: true,
    displayEventOnCommunity: true,
    displayEventOnHomePage: true,
    authorizeShare: true,
    authorizeLike: true,
    isPin: false,
    isPinOnCommunity: false,
  });

  const handleFeedingChange = e => {
    setFeedingState({ ...feedingState, [e.target.name]: e.target.checked });
  };

  const [hashtag, setHashtag] = useState([]);

  const handleOnDrop = useCallback((field, files) => {
    const file = _.head(files);
    const formData = new FormData();
    formData.append('fileName', file.name);
    formData.append('file', file);
    dispatchUploadFile(field, formData);
    if (field === 'headerImage') {
      setImageCropOpen(true);
    }
  }, []);

  useEffect(
    () => () => {
      dispatchCleanUploadFile();
      dispatchCleanContentDetails();
    },
    [],
  );

  const [itemImage, setItemImage] = useState({});

  const handleImageCrop = useCallback(
    cropImage => {
      setItemImage({
        ...cropImage,
        url: cropImage.urls[0],
        imageHeader: `${cropImage.urls[1]}/?t=${moment().format('x')}`,
      });
      setHeadingBlock({
        ...headingBlock,
        headerImageColor: 'rgba(0, 0, 0, 0)',
        imageGridviewSmallThumb: cropImage.urls[1],
        imageGridviewSmallThumbAngle: 0,
        imageGridviewSmallThumbBackgroundColor: 'transparent',
        imageGridviewSmallThumbPosX: 0,
        imageGridviewSmallThumbPosY: 0,
        imageGridviewThumb: cropImage.urls[2],
        imageGridviewThumbAngle: 0,
        imageGridviewThumbBackgroundColor: 'transparent',
        imageGridviewThumbPosX: 0,
        imageGridviewThumbPosY: 0,
        imageHeader: cropImage.urls[1],
        imageHeaderAngle: 0,
        imageHeaderBackgroundColor: 'transparent',
        imageHeaderPosX: 0,
        imageHeaderPosY: 0,
        smallImage: false,
      });
    },
    [headingBlock],
  );

  const [imageCropOpen, setImageCropOpen] = useState(false);

  const [language, setLanguage] = useState('French');
  const [translatedLanguages, setTranslatedLanguages] = useState([]);
  const [isOwner, setIsOwner] = useState('true');
  const [writeForUserUid, setWriteForUserUid] = useState(undefined);

  const [authorExpanded, setAuthorExpanded] = useState(true);

  useEffect(() => {
    if (!JSON.parse(isOwner)) {
      dispatchUserCommunity({ uid: selectedCommunities });
    }
  }, [isOwner]);

  const [publishingExpanded, setPublishingExpanded] = useState(false);
  const [publicationStartDate, setPublicationStartDate] = useState(undefined);
  const [publicationEndDate, setPublicationEndDate] = useState(undefined);

  const [mode, setMode] = useState('Standard');
  const [zenModeExpanded, setZenModeExpanded] = useState(true);

  useEffect(() => {
    if (uploadedFiles.topImage) {
      const { uid, largeUrl } = _.head(uploadedFiles.topImage);
      setTopImage({
        ...topImage,
        uid,
        path: largeUrl,
      });
    }
    if (uploadedFiles.bottomImage) {
      const { uid, largeUrl } = _.head(uploadedFiles.bottomImage);
      setBottomImage({
        ...bottomImage,
        uid,
        path: largeUrl,
      });
    }
  }, [uploadedFiles]);

  const [blocks, setBlocks] = useState([]);

  const addArticleBlock = () => {
    setBlocks([...blocks, { uid: uuidv4(), content: '', type: 'richText' }]);
  };

  const addVideoBlock = () => {
    setBlocks([...blocks, { uid: uuidv4(), videos: [], type: 'videoGallery' }]);
  };

  const addImageBlock = () => {
    setBlocks([...blocks, { uid: uuidv4(), images: [], type: 'ImageGallery' }]);
  };

  const addDocumentBlock = () => {
    setBlocks([
      ...blocks,
      { uid: uuidv4(), documents: [], type: 'documentGallery' },
    ]);
  };

  const addLinkBlock = () => {
    setBlocks([...blocks, { uid: uuidv4(), links: [], type: 'linkEmbed' }]);
  };

  const addGrandArticleBlock = () => {
    setBlocks([...blocks, { uid: uuidv4(), content: '', type: 'richText' }]);
  };

  const [grandArticlePages, setGrandArticlePages] = useState([]);
  const [templateUid, setTemplateUid] = useState('');
  const [addParagraphOpen, setAddParagraphOpen] = useState(false);

  const handlePageAdd = page => {
    setGrandArticlePages([...grandArticlePages, page]);
  };

  const handlePageEdit = useCallback(id => {
    setPageId(id);
  }, []);

  const handlePageChange = useCallback(
    page => {
      setGrandArticlePages(
        _.map(grandArticlePages, grandArticlePage =>
          grandArticlePage.id === page.id ? page : grandArticlePage,
        ),
      );
    },
    [grandArticlePages],
  );

  const handlePageRemove = useCallback(
    id => {
      setGrandArticlePages(_.filter(grandArticlePages, page => page.id !== id));
    },
    [grandArticlePages],
  );

  const [pageId, setPageId] = useState(null);

  const addEventBlock = () => {
    setBlocks([
      ...blocks,
      {
        uid: uuidv4(),
        conferenceSolutionType: 'HangoutsMeet',
        dateFrom: null,
        dateTo: null,
        description: '',
        googleCalendarPersonalInvitationEmails: '',
        invitedPeopleUids: [],
        isActivateDoNotParticipate: false,
        isAssociateConferenceCall: false,
        isSendGoogleCalendarInvitation: false,
        isSendGoogleCalendarPersonalInvitation: false,
        limitSeatOfEvent: false,
        location: '',
        modifiedBlock: false,
        participateEventExtension: true,
        title: '',
        totalNumberOfSeat: 1,
        totalNumberOfWaitingSeat: 0,
        type: 'event',
      },
    ]);
  };

  const handleRemove = useCallback(
    uid => {
      setBlocks(_.filter(blocks, block => block.uid !== uid));
    },
    [blocks],
  );

  const onChangeCKEditor = useCallback(
    (uid, data) => {
      setBlocks(
        _.map(blocks, block =>
          block.uid === uid
            ? { ...block, content: data, modifiedBlock: true }
            : block,
        ),
      );
    },
    [blocks],
  );

  const handleBlockChange = useCallback(
    (uid, blockType, items) => {
      setBlocks(
        _.map(blocks, block =>
          block.uid === uid ? { ...block, [blockType]: items } : block,
        ),
      );
    },
    [blocks],
  );

  const handleSort = useCallback(
    (oldIndex, newIndex) => {
      setBlocks(arrayMove(blocks, oldIndex, newIndex));
    },
    [blocks],
  );

  const handlePageSort = useCallback(
    (oldIndex, newIndex) => {
      setGrandArticlePages(arrayMove(grandArticlePages, oldIndex, newIndex));
    },
    [grandArticlePages],
  );

  useEffect(() => {
    if (!contentUid && _.size(blocks) === 0) {
      setType(undefined);
    }
  }, [blocks]);

  useEffect(() => {
    if (type === 'grandArticle') {
      dispatchGetTemplateType();
    }
  }, [type]);

  useEffect(() => {
    if (!contentUid && type === 'grandArticle' && !_.isEmpty(templateType)) {
      setTemplateUid(
        _.head(_.filter(templateType, { type: 'GrandArticle' })).uid,
      );
    }
    if (
      contentUid &&
      contentDetails &&
      contentDetails.template &&
      type === 'grandArticle' &&
      !_.isEmpty(templateType)
    ) {
      setTemplateUid(contentDetails.template.uid || contentDetails.template);
    }
  }, [templateType, contentDetails]);

  const [moreAnchorEl, setMoreAnchorEl] = useState(null);

  const handlePublish = status => {
    let payload = {
      allowComment: feedingState.allowComment,
      newsFeed: feedingState.newsFeed,
      authorizeShare: feedingState.authorizeShare,
      authorizeLike: feedingState.authorizeLike,
      ctyTabUids: selectedTabs,
      blocks: [
        headingBlock,
        ..._.map(blocks, ({ uid, ...rest }) => ({ ...rest })),
      ],
      isOwner: JSON.parse(isOwner),
      writeForUserUid: JSON.parse(isOwner) ? undefined : writeForUserUid,
      hashtag: hashtag.join(', '),
      publicationStartDate: publicationStartDate
        ? moment(publicationStartDate).format('x')
        : publicationStartDate,
      publicationEndDate: publicationEndDate
        ? moment(publicationEndDate).format('x')
        : publicationEndDate,
      language,
      status,
      uid: contentUid,
    };
    if (type === 'article') {
      const articleBlocks = transformBlocks(payload.blocks);
      payload = {
        ...payload,
        isPin: feedingState.isPin,
        isPinOnCommunity: feedingState.isPinOnCommunity,
        blocks:
          mode === 'Standard'
            ? articleBlocks
            : [
                ...articleBlocks,
                { topImage: topImage.uid, type: topImage.type },
                {
                  bottomImage: bottomImage.uid,
                  type: bottomImage.type,
                },
              ],
        translatedLanguages,
        type,
        mode,
      };
    }
    if (type === 'grandArticle') {
      payload = {
        ...payload,
        isPin: feedingState.isPin,
        templateUid,
        grandArticlePages: _.map(
          grandArticlePages,
          ({ id, subTitle, sequenceNumber, imageHeader, ...rest }) => ({
            id: uuidValidate(id) ? undefined : id,
            subTitle: uuidValidate(id) ? subTitle : undefined,
            ...rest,
            blocks: transformBlocks(rest.blocks),
          }),
        ),
        translatedLanguages,
        type,
      };
    }
    if (type === 'event') {
      payload = {
        ...payload,
        blocks: _.map(blocks, ({ uid, ...rest }) => ({
          ...rest,
          dateFrom: parseFloat(moment(rest.dateFrom).format('x')),
          dateTo: parseFloat(moment(rest.dateTo).format('x')),
          googleCalendarPersonalInvitationEmails: _.compact(
            _.split(rest.googleCalendarPersonalInvitationEmails, ','),
          ),
        })),
        displayInCommunityCalendar: true,
        displayEventOnCommunity: feedingState.displayEventOnCommunity,
        displayEventOnHomePage: feedingState.displayEventOnHomePage,
        title: _.head(blocks).title,
        type,
      };
    }
    const result = ContentSchema.validate(payload);
    if (result.error) {
      // console.log(result);
      const { path } = _.head(result.error.details);
      if (_.size(path) === 1) {
        if (path[0] === 'ctyTabUids') {
          return enqueueSnackbar('Please select community tab', {
            variant: 'error',
          });
        }
        return enqueueSnackbar(path, {
          variant: 'error',
        });
      }
      if (_.size(path) === 3) {
        return enqueueSnackbar(_.get(payload, _.dropRight(path)).type, {
          variant: 'error',
        });
      }
      enqueueSnackbar(_.get(payload, path).type, {
        variant: 'error',
      });
    }
    if (!result.error) {
      if (type === 'article') {
        const { mode: articleMode, ...rest } = payload;
        return dispatchCreateArticle(rest);
      }
      if (type === 'grandArticle') {
        return dispatchCreateGrandArticle(payload);
      }
      if (type === 'event') {
        const { ctyTabUids, type: blockType, ...rest } = payload;
        return dispatchCreateEvent({
          ...rest,
          communityTabUids: ctyTabUids,
        });
      }
      if (type === 'ImageGallery') {
        const { ctyTabUids, ...rest } = payload;
        return dispatchCreateImageGallery({
          ...rest,
          blocks: _.map(rest.blocks, block =>
            block.type === 'ImageGallery'
              ? {
                  ...block,
                  images: _.map(block.images, image => transformImage(image)),
                }
              : block,
          ),
          communityTabUids: ctyTabUids,
        });
      }
      if (type === 'documentGallery') {
        const { ctyTabUids, ...rest } = payload;
        return dispatchCreateDocument({
          ...rest,
          blocks: _.map(rest.blocks, block =>
            block.type === 'documentGallery'
              ? {
                  ...block,
                  documents: _.map(block.documents, document =>
                    transformDocument(document),
                  ),
                }
              : block,
          ),
          communityTabUids: ctyTabUids,
        });
      }
    }
    return null;
  };

  useEffect(() => {
    if (contentSuccess) {
      dispatchCleanContentCreation();
      enqueueSnackbar('Success', { variant: 'success' });
      dispatchContentClose();
    }
  }, [contentSuccess]);

  const resetHeadingBlock = () => {
    setItemImage({});
    setHeadingBlock({
      modifiedBlock: true,
      subTitle: headingBlock.subTitle,
      title: headingBlock.title,
      type: 'heading',
    });
  };

  useEffect(() => {
    dispatchCleanUploadFile();
    if (!contentUid) {
      resetHeadingBlock();
      setMode('Standard');
      setTopImage({
        uid: '',
        type: 'topImage',
      });
      setBottomImage({
        uid: '',
        type: 'bottomImage',
      });
      setGrandArticlePages([]);
    }
  }, [type]);

  useEffect(() => {
    if (
      !_.isEmpty(allCommunities) &&
      contentUid &&
      contentDetails &&
      contentUid === contentDetails.uid &&
      contentDetails.detailBlocks
    ) {
      setSelectedCommunities([contentDetails.community]);
      setSelectedTabs([contentDetails.communityTab]);
      setType(contentDetails.type);
      setLanguage(contentDetails.language);
      setIsOwner(contentDetails.isOwner);
      setHashtag(contentDetails.hashtags || []);
      setFeedingState({
        ...feedingState,
        allowComment: contentDetails.allowComment,
        newsFeed: contentDetails.newsFeed,
        displayEventOnCommunity: contentDetails.displayEventOnCommunity,
        displayEventOnHomePage: contentDetails.displayEventOnHomePage,
        authorizeShare: contentDetails.authorizeShare,
        authorizeLike: contentDetails.authorizeLike,
        isPin: contentDetails.isPin,
        isPinOnCommunity: contentDetails.isPinOnCommunity,
      });
      setPublicationStartDate(contentDetails.setPublicationStartDate);
      setPublicationEndDate(contentDetails.setPublicationEndDate);
      if (contentDetails.type !== 'event') {
        const {
          imageGridviewLargeThumb,
          imageGridviewMediumThumb,
          path,
          ...rest
        } = _.find(contentDetails.detailBlocks, {
          type: 'heading',
        });
        setHeadingBlock(rest);
        setItemImage({
          url: path,
          imageHeader: rest.imageHeader,
          uid: rest.uid,
        });
      }
      if (contentDetails.type === 'article') {
        const zenModeTopImage = _.find(contentDetails.detailBlocks, {
          type: 'topImage',
        });
        const zenModeBottomImage = _.find(contentDetails.detailBlocks, {
          type: 'bottomImage',
        });
        if (zenModeTopImage && zenModeBottomImage) {
          setMode('Zen Mode');
          setTopImage(zenModeTopImage);
          setBottomImage(zenModeBottomImage);
        }
      }
      if (contentDetails.type === 'grandArticle') {
        setGrandArticlePages(
          _.map(contentDetails.grandArticlePages, page => {
            const pageHeading = _.find(page.blocks, {
              type: 'heading',
            });
            const {
              imageGridviewLargeThumb,
              imageGridviewMediumThumb,
              ...rest
            } = pageHeading;
            return {
              ...page,
              blocks: [
                ..._.map(_.without(page.blocks, pageHeading), block =>
                  block.type === 'linkEmbed'
                    ? {
                        uid: uuidv4(),
                        ...block,
                        links: _.map(block.links, link => ({
                          uid: uuidv4(),
                          ...link,
                        })),
                      }
                    : { uid: uuidv4(), ...block },
                ),
                rest,
              ],
            };
          }),
        );
      }
      setBlocks(
        _.map(
          _.filter(
            contentDetails.blocks,
            block =>
              block.type !== 'heading' &&
              block.type !== 'topImage' &&
              block.type !== 'bottomImage',
          ),
          block =>
            block.type === 'linkEmbed'
              ? {
                  uid: uuidv4(),
                  ...block,
                  links: _.map(block.links, link => ({
                    uid: uuidv4(),
                    ...link,
                  })),
                }
              : { uid: uuidv4(), ...block },
        ),
      );
    }
  }, [contentDetails, allCommunities]);

  return (
    <>
      <Dialog
        open={open}
        onClose={dispatchContentClose}
        scroll="body"
        fullWidth
        maxWidth="md"
        disableEnforceFocus
      >
        <DialogTitle>
          Content Creation
          <IconButton
            aria-label="close"
            onClick={dispatchContentClose}
            style={{ position: 'absolute', top: 5, right: 5 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Grid container spacing={2}>
                {type === 'grandArticle' && (
                  <Grid item xs={12}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={6}>
                        {templateType && (
                          <TextField
                            label="Template"
                            variant="outlined"
                            fullWidth
                            select
                            size="small"
                            name="templateUid"
                            value={templateUid}
                            onChange={e => {
                              setTemplateUid(e.target.value);
                            }}
                          >
                            {_.map(
                              _.filter(templateType, { type: 'GrandArticle' }),
                              listType => (
                                <MenuItem
                                  key={listType.uid}
                                  value={listType.uid}
                                >
                                  {listType.name}
                                </MenuItem>
                              ),
                            )}
                          </TextField>
                        )}
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          variant="outlined"
                          color="primary"
                          href={`#!/${templateUid}`}
                          target="_blank"
                        >
                          Preview
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
                {type !== 'event' && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="title"
                        value={headingBlock.title}
                        onChange={handleHeadingChange}
                        inputProps={{ maxLength: 110 }}
                      />
                      <Grid container justify="flex-end">
                        <FormHelperText>
                          {110 - headingBlock.title.length} characters left
                        </FormHelperText>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Subtitle"
                        variant="outlined"
                        fullWidth
                        size="small"
                        name="subTitle"
                        value={headingBlock.subTitle}
                        onChange={handleHeadingChange}
                      />
                    </Grid>
                  </>
                )}
                <Grid item xs={12} onClick={handleCommunitySelectOpen}>
                  <CommunitySelect>
                    <Typography noWrap>
                      {_.size(selectedCommunities) === 0
                        ? 'Community name/Category name'
                        : _.map(
                            _.filter(communityList, community =>
                              _.includes(selectedCommunities, community.uid),
                            ),
                            community => community.label,
                          ).join(', ')}
                    </Typography>
                  </CommunitySelect>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Select community tab"
                    variant="outlined"
                    fullWidth
                    size="small"
                    select
                    disabled={_.isEmpty(selectedCommunities)}
                    SelectProps={{
                      multiple: true,
                      value: selectedTabs,
                      renderValue: selected =>
                        _.map(selected, value =>
                          _.find(communityTabs, { uid: value })
                            ? _.find(communityTabs, { uid: value }).tabName
                            : undefined,
                        ).join(', '),
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
                <Grid item xs={12} style={{ zIndex: 1301 }}>
                  <SortableBlockList
                    items={blocks}
                    axis="xy"
                    onSortEnd={({ oldIndex, newIndex }) =>
                      handleSort(oldIndex, newIndex)
                    }
                    lockToContainerEdges
                    helperClass="sortableHelper"
                    pressDelay={200}
                    shouldCancelStart={e =>
                      _.includes(e.srcElement.classList, 'MuiSelect-root') ||
                      _.includes(e.srcElement.classList, 'MuiSvgIcon-root') ||
                      _.includes(
                        e.srcElement.classList,
                        'MuiButtonBase-root',
                      ) ||
                      _.includes(e.srcElement.classList, 'cke_resizer')
                    }
                    onChangeCKEditor={onChangeCKEditor}
                    handleBlockChange={handleBlockChange}
                    handleRemove={handleRemove}
                  />
                </Grid>
                {type === 'grandArticle' && (
                  <Grid item xs={12}>
                    <Paper
                      elevation={0}
                      style={{
                        backgroundColor: '#eceeef',
                        padding: 10,
                        position: 'relative',
                      }}
                    >
                      <Typography gutterBottom>Paragraphs:</Typography>
                      {!_.isEmpty(grandArticlePages) && (
                        <SortableList
                          pages={grandArticlePages}
                          axis="xy"
                          onSortEnd={({ oldIndex, newIndex }) =>
                            handlePageSort(oldIndex, newIndex)
                          }
                          lockToContainerEdges
                          helperClass="sortableHelper"
                          pressDelay={200}
                          shouldCancelStart={e =>
                            _.includes(
                              e.srcElement.classList,
                              'MuiSvgIcon-root',
                            ) ||
                            _.includes(
                              e.srcElement.classList,
                              'MuiButtonBase-root',
                            )
                          }
                          handlePageEdit={handlePageEdit}
                          handlePageRemove={handlePageRemove}
                        />
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setAddParagraphOpen(true)}
                        disableElevation
                      >
                        Ajouter
                      </Button>
                    </Paper>
                  </Grid>
                )}
                {type !== 'grandArticle' && (
                  <Grid item xs={12}>
                    <BlockTypes elevation={0}>
                      <Grid container>
                        <Grid item xs>
                          <BlockItem>
                            <BlockButton
                              onClick={() => {
                                if (!type) {
                                  setType('article');
                                }
                                addArticleBlock();
                              }}
                              disabled={
                                type !== undefined && type !== 'article'
                              }
                            >
                              <Description />
                              Article
                            </BlockButton>
                          </BlockItem>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs>
                          <BlockItem>
                            <BlockButton
                              onClick={() => {
                                if (!type) {
                                  setType('ImageGallery');
                                }
                                addImageBlock();
                              }}
                              disabled={
                                type &&
                                (type !== 'ImageGallery'
                                  ? type !== 'article'
                                  : type !== 'ImageGallery')
                              }
                            >
                              <Image />
                              Images
                            </BlockButton>
                          </BlockItem>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        {type && (
                          <>
                            <Grid item xs>
                              <BlockItem>
                                <BlockButton
                                  onClick={() => {
                                    if (!type) {
                                      setType('videoGallery');
                                    }
                                    addVideoBlock();
                                  }}
                                  disabled={
                                    type &&
                                    (type !== 'videoGallery'
                                      ? type !== 'article'
                                      : type !== 'videoGallery')
                                  }
                                >
                                  <Videocam />
                                  Videos
                                </BlockButton>
                              </BlockItem>
                            </Grid>
                            <Divider orientation="vertical" flexItem />
                          </>
                        )}
                        <Grid item xs>
                          <BlockItem>
                            <BlockButton
                              onClick={() => {
                                if (!type) {
                                  setType('documentGallery');
                                }
                                addDocumentBlock();
                              }}
                              disabled={
                                type &&
                                (type !== 'documentGallery'
                                  ? type !== 'article'
                                  : type !== 'documentGallery')
                              }
                            >
                              <Folder />
                              Documents
                            </BlockButton>
                          </BlockItem>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs>
                          <BlockItem>
                            <BlockButton
                              onClick={() => {
                                if (!type) {
                                  setType('event');
                                }
                                addEventBlock();
                              }}
                              disabled={
                                type &&
                                (type !== 'event'
                                  ? type !== 'article'
                                  : type !== 'event')
                              }
                            >
                              <Event />
                              Event
                            </BlockButton>
                          </BlockItem>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        {!type && (
                          <>
                            <Grid item xs>
                              <BlockItem>
                                <BlockButton
                                  onClick={() => {
                                    if (!type) {
                                      setType('grandArticle');
                                    }
                                    addGrandArticleBlock();
                                  }}
                                >
                                  <Description />
                                  Article grand format
                                </BlockButton>
                              </BlockItem>
                            </Grid>
                            <Divider orientation="vertical" flexItem />
                          </>
                        )}
                        {!type && (
                          <Grid item xs>
                            <BlockItem>
                              <BlockButton
                                onClick={() => {
                                  dispatchContentClose();
                                  dispatchCreateQuickPost();
                                }}
                              >
                                <Description />
                                FAQ
                              </BlockButton>
                            </BlockItem>
                          </Grid>
                        )}
                        {type && (
                          <>
                            <Grid item xs>
                              <BlockItem>
                                <BlockButton
                                  onClick={e =>
                                    setMoreAnchorEl(e.currentTarget)
                                  }
                                >
                                  <MoreHoriz />
                                  More
                                </BlockButton>
                              </BlockItem>
                            </Grid>
                            <SimpleMenu
                              elevation={0}
                              anchorEl={moreAnchorEl}
                              open={Boolean(moreAnchorEl)}
                              onClose={() => setMoreAnchorEl(null)}
                            >
                              <MenuItem
                                dense
                                onClick={() => {
                                  setMoreAnchorEl(null);
                                  addLinkBlock();
                                }}
                                disabled={type && type !== 'article'}
                              >
                                URL
                              </MenuItem>
                              <MenuItem dense onClick={() => {}}>
                                Yammer
                              </MenuItem>
                              <MenuItem dense onClick={() => {}}>
                                Form
                              </MenuItem>
                            </SimpleMenu>
                          </>
                        )}
                      </Grid>
                    </BlockTypes>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Hashtag hashtag={hashtag} setHashtag={setHashtag} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Grid container spacing={2}>
                {(type === 'article' || type === 'grandArticle') && (
                  <Grid item xs={12}>
                    <Typography>
                      Upload an image from your computer (minimum size 900X562.5
                      px)
                    </Typography>
                    <ItemImage>
                      <Dropzone
                        accept="image/png, image/jpg, image/gif, image/jpeg"
                        maxFiles={1}
                        onDrop={acceptedFiles =>
                          handleOnDrop('headerImage', acceptedFiles)
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <BlockButton
                            style={
                              !headingBlock.imageHeader
                                ? {
                                    backgroundColor: '#eceeef',
                                    border: '1px solid rgba(0, 0, 0, 0.12)',
                                  }
                                : {}
                            }
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            {!headingBlock.imageHeader && (
                              <>
                                <Image fontSize="large" />
                                <Typography>Item Image</Typography>
                              </>
                            )}
                            {headingBlock.imageHeader && (
                              <img
                                src={itemImage.imageHeader}
                                alt={headingBlock.title}
                                width="100%"
                              />
                            )}
                          </BlockButton>
                        )}
                      </Dropzone>
                    </ItemImage>
                    {headingBlock.imageHeader && (
                      <Grid
                        container
                        spacing={1}
                        direction="column"
                        alignContent="center"
                      >
                        <Grid item xs={10}>
                          <Button
                            variant="outlined"
                            fullWidth
                            color="primary"
                            onClick={resetHeadingBlock}
                          >
                            Delete
                          </Button>
                        </Grid>
                        <Grid item xs={10}>
                          <Button
                            variant="outlined"
                            fullWidth
                            color="primary"
                            onClick={() => {
                              setImageCropOpen(true);
                            }}
                          >
                            Recrop Header Image
                          </Button>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                )}
                {type === 'article' && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        fullWidth
                        select
                        size="small"
                        value={mode}
                        onChange={e => {
                          setMode(e.target.value);
                        }}
                      >
                        <MenuItem value="Standard">Standard</MenuItem>
                        <MenuItem value="Zen Mode">Zen Mode</MenuItem>
                      </TextField>
                    </Grid>
                    {mode === 'Zen Mode' && (
                      <Grid item xs={12}>
                        <Paper
                          elevation={0}
                          style={{ border: '1px solid rgba(0, 0, 0, 0.12)' }}
                        >
                          <Grid container alignItems="center">
                            <Grid item xs style={{ paddingLeft: 12 }}>
                              <Typography>Zen Mode</Typography>
                            </Grid>
                            <Grid item>
                              <IconButton
                                onClick={() =>
                                  setZenModeExpanded(!zenModeExpanded)
                                }
                              >
                                {zenModeExpanded ? (
                                  <ExpandLess fontSize="small" />
                                ) : (
                                  <ExpandMore fontSize="small" />
                                )}
                              </IconButton>
                            </Grid>
                          </Grid>
                          <Collapse
                            in={zenModeExpanded}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Divider />
                            <FormGroup style={{ padding: 12 }}>
                              <Grid container spacing={1}>
                                <Grid item xs={12}>
                                  <Typography>
                                    (Image size cant be less than 1600x600
                                    pixels)
                                  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                  <ZenImage>
                                    <Dropzone
                                      accept="image/png, image/jpg, image/gif, image/jpeg"
                                      maxFiles={1}
                                      onDrop={acceptedFiles =>
                                        handleOnDrop('topImage', acceptedFiles)
                                      }
                                    >
                                      {({ getRootProps, getInputProps }) => (
                                        <BlockButton
                                          style={
                                            !topImage.uid
                                              ? {
                                                  backgroundColor: '#eceeef',
                                                  border:
                                                    '1px solid rgba(0, 0, 0, 0.12)',
                                                }
                                              : {}
                                          }
                                          {...getRootProps()}
                                        >
                                          <input {...getInputProps()} />
                                          {!topImage.uid && (
                                            <>
                                              <Image fontSize="large" />
                                              <Typography>Top Image</Typography>
                                            </>
                                          )}
                                          {topImage.uid && (
                                            <img
                                              src={topImage.path}
                                              alt="Top"
                                              width="100%"
                                              height="100%"
                                            />
                                          )}
                                        </BlockButton>
                                      )}
                                    </Dropzone>
                                  </ZenImage>
                                </Grid>
                                <Grid item xs={12}>
                                  <Typography>
                                    (Image size cant be less than 1600x600
                                    pixels)
                                  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                  <ZenImage>
                                    <Dropzone
                                      accept="image/png, image/jpg, image/gif, image/jpeg"
                                      maxFiles={1}
                                      onDrop={acceptedFiles =>
                                        handleOnDrop(
                                          'bottomImage',
                                          acceptedFiles,
                                        )
                                      }
                                    >
                                      {({ getRootProps, getInputProps }) => (
                                        <BlockButton
                                          style={
                                            !bottomImage.uid
                                              ? {
                                                  backgroundColor: '#eceeef',
                                                  border:
                                                    '1px solid rgba(0, 0, 0, 0.12)',
                                                }
                                              : {}
                                          }
                                          {...getRootProps()}
                                        >
                                          <input {...getInputProps()} />
                                          {!bottomImage.uid && (
                                            <>
                                              <Image fontSize="large" />
                                              <Typography>
                                                Bottom Image
                                              </Typography>
                                            </>
                                          )}
                                          {bottomImage.uid && (
                                            <img
                                              src={bottomImage.path}
                                              alt="Top"
                                              width="100%"
                                              height="100%"
                                            />
                                          )}
                                        </BlockButton>
                                      )}
                                    </Dropzone>
                                  </ZenImage>
                                </Grid>
                              </Grid>
                            </FormGroup>
                          </Collapse>
                        </Paper>
                      </Grid>
                    )}
                  </>
                )}
                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    style={{ border: '1px solid rgba(0, 0, 0, 0.12)' }}
                  >
                    <Grid container alignItems="center">
                      <Grid item xs style={{ paddingLeft: 12 }}>
                        <Typography>Manage feeding and comments</Typography>
                      </Grid>
                      <Grid item>
                        <IconButton
                          onClick={() => setFeedingExpanded(!feedingExpanded)}
                        >
                          {feedingExpanded ? (
                            <ExpandLess fontSize="small" />
                          ) : (
                            <ExpandMore fontSize="small" />
                          )}
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Collapse in={feedingExpanded} timeout="auto" unmountOnExit>
                      <Divider />
                      <FormGroup style={{ padding: '0 12px' }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="allowComment"
                              checked={feedingState.allowComment}
                              onChange={handleFeedingChange}
                              color="primary"
                            />
                          }
                          label="Do Allow Comments"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="newsFeed"
                              checked={feedingState.newsFeed}
                              onChange={handleFeedingChange}
                              color="primary"
                            />
                          }
                          label="Newsfeed It"
                        />
                        {type === 'event' && (
                          <>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="displayEventOnCommunity"
                                  checked={feedingState.displayEventOnCommunity}
                                  onChange={handleFeedingChange}
                                  color="primary"
                                />
                              }
                              label="Publish event in this community calendar"
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  name="displayEventOnHomePage"
                                  checked={feedingState.displayEventOnHomePage}
                                  onChange={handleFeedingChange}
                                  color="primary"
                                />
                              }
                              label="Publish event in the home page calendar"
                            />
                          </>
                        )}
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="authorizeShare"
                              checked={feedingState.authorizeShare}
                              onChange={handleFeedingChange}
                              color="primary"
                            />
                          }
                          label="Authorized Share"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              name="authorizeLike"
                              checked={feedingState.authorizeLike}
                              onChange={handleFeedingChange}
                              color="primary"
                            />
                          }
                          label="Authorized Like"
                        />
                        {(type === 'article' || type === 'grandArticle') && (
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="isPin"
                                checked={feedingState.isPin}
                                onChange={handleFeedingChange}
                                color="primary"
                              />
                            }
                            label="Pin this article on page"
                          />
                        )}
                        {type === 'article' && (
                          <FormControlLabel
                            control={
                              <Checkbox
                                name="isPinOnCommunity"
                                checked={feedingState.isPinOnCommunity}
                                onChange={handleFeedingChange}
                                color="primary"
                              />
                            }
                            label="Épingler cet article sur la page d’accueil de la communauté"
                          />
                        )}
                      </FormGroup>
                    </Collapse>
                  </Paper>
                </Grid>
                {(type === 'article' || type === 'grandArticle') && (
                  <Grid item xs={12}>
                    <Typography>
                      Automated Translation/Translate on demand
                    </Typography>
                    {!contentUid && !_.isEmpty(languages) && (
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={5}>
                          <TextField
                            variant="outlined"
                            fullWidth
                            select
                            size="small"
                            value={language}
                            onChange={e => {
                              setLanguage(e.target.value);
                              setTranslatedLanguages([]);
                            }}
                          >
                            {_.map(
                              languages,
                              lang =>
                                lang.active && (
                                  <MenuItem key={lang.code} value={lang.name}>
                                    {lang.name}
                                  </MenuItem>
                                ),
                            )}
                          </TextField>
                        </Grid>
                        <Grid item>to</Grid>
                        <Grid item xs={5}>
                          <TextField
                            variant="outlined"
                            fullWidth
                            select
                            size="small"
                            SelectProps={{
                              multiple: true,
                              value: translatedLanguages,
                              renderValue: selected => selected.join(', '),
                              onChange: e =>
                                setTranslatedLanguages(e.target.value),
                            }}
                          >
                            {_.map(
                              languages,
                              lang =>
                                lang.active &&
                                lang.name !== language && (
                                  <MenuItem key={lang.code} value={lang.name}>
                                    <Checkbox
                                      checked={_.includes(
                                        translatedLanguages,
                                        lang.name,
                                      )}
                                      color="primary"
                                    />
                                    <ListItemText primary={lang.name} />
                                  </MenuItem>
                                ),
                            )}
                          </TextField>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                )}
                {!contentUid && type && (
                  <Grid item xs={12}>
                    <Paper
                      elevation={0}
                      style={{ border: '1px solid rgba(0, 0, 0, 0.12)' }}
                    >
                      <Grid container alignItems="center">
                        <Grid item xs style={{ paddingLeft: 12 }}>
                          <Typography>Author</Typography>
                        </Grid>
                        <Grid item>
                          <IconButton
                            onClick={() => setAuthorExpanded(!authorExpanded)}
                          >
                            {authorExpanded ? (
                              <ExpandLess fontSize="small" />
                            ) : (
                              <ExpandMore fontSize="small" />
                            )}
                          </IconButton>
                        </Grid>
                      </Grid>
                      <Collapse
                        in={authorExpanded}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Divider />
                        <FormGroup style={{ padding: '0 12px' }}>
                          <RadioGroup
                            value={isOwner}
                            onChange={e => setIsOwner(e.target.value)}
                          >
                            <FormControlLabel
                              value="true"
                              control={<Radio />}
                              label={`Moi (${currentUser.displayName})`}
                            />
                            <FormControlLabel
                              value="false"
                              control={<Radio />}
                              label="Ecrire au nom de..."
                              disabled={_.isEmpty(selectedCommunities)}
                            />
                          </RadioGroup>
                          {!JSON.parse(isOwner) && userCommunity && (
                            <TextField
                              variant="outlined"
                              fullWidth
                              select
                              size="small"
                              value={writeForUserUid || ''}
                              onChange={e => {
                                setWriteForUserUid(e.target.value);
                              }}
                            >
                              {_.map(userCommunity, user => (
                                <MenuItem key={user.uid} value={user.uid}>
                                  {`${user.firstName} ${user.lastName}`}
                                </MenuItem>
                              ))}
                            </TextField>
                          )}
                        </FormGroup>
                      </Collapse>
                    </Paper>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Paper
                    elevation={0}
                    style={{ border: '1px solid rgba(0, 0, 0, 0.12)' }}
                  >
                    <Grid container alignItems="center">
                      <Grid item xs style={{ paddingLeft: 12 }}>
                        <Typography>
                          Manage publishing date &amp; time
                        </Typography>
                      </Grid>
                      <Grid item>
                        <IconButton
                          onClick={() =>
                            setPublishingExpanded(!publishingExpanded)
                          }
                        >
                          {publishingExpanded ? (
                            <ExpandLess fontSize="small" />
                          ) : (
                            <ExpandMore fontSize="small" />
                          )}
                        </IconButton>
                      </Grid>
                    </Grid>
                    <Collapse
                      in={publishingExpanded}
                      timeout="auto"
                      unmountOnExit
                    >
                      <Divider />
                      <FormGroup style={{ padding: 12 }}>
                        <Grid container spacing={1}>
                          <Grid item xs={12}>
                            <Typography>Publication Start</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              inputVariant="outlined"
                              format="MMM dd, yyyy"
                              value={publicationStartDate || null}
                              onChange={date => setPublicationStartDate(date)}
                              emptyLabel="Start Date"
                              autoOk
                              disablePast
                              maxDate={publicationEndDate}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <KeyboardTimePicker
                              disableToolbar
                              variant="inline"
                              inputVariant="outlined"
                              value={publicationStartDate || null}
                              onChange={date => setPublicationStartDate(date)}
                              emptyLabel="Start Time"
                              autoOk
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography>Publication End</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              inputVariant="outlined"
                              format="MMM dd, yyyy"
                              value={publicationEndDate || null}
                              onChange={date => setPublicationEndDate(date)}
                              emptyLabel="End Date"
                              autoOk
                              disablePast
                              minDate={publicationStartDate}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <KeyboardTimePicker
                              disableToolbar
                              variant="inline"
                              inputVariant="outlined"
                              value={publicationEndDate || null}
                              onChange={date => setPublicationEndDate(date)}
                              emptyLabel="End Time"
                              autoOk
                            />
                          </Grid>
                        </Grid>
                      </FormGroup>
                    </Collapse>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handlePublish('draft')}
            disabled={contentLoading}
          >
            Save Draft
          </Button>
          <Button variant="outlined" color="primary">
            Preview - TODO
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handlePublish('publish')}
            disabled={contentLoading}
          >
            Publish
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
      {imageCropOpen && (
        <ImageCrop
          image={
            (uploadedFiles.headerImage &&
              !_.isEmpty(uploadedFiles.headerImage) &&
              _.head(uploadedFiles.headerImage)) ||
            itemImage
          }
          handleClose={() => setImageCropOpen(false)}
          handleImageCrop={handleImageCrop}
          imageMap={imageDimensions}
        />
      )}
      {Boolean(pageId) && (
        <Paragraph
          open={Boolean(pageId)}
          grandArticlePage={_.find(grandArticlePages, { id: pageId })}
          setGrandArticlePage={handlePageChange}
          handleClose={() => setPageId(null)}
        />
      )}
      {addParagraphOpen && (
        <Paragraph
          open={addParagraphOpen}
          setGrandArticlePage={handlePageAdd}
          handleClose={() => setAddParagraphOpen(false)}
        />
      )}
    </>
  );
}

ContentCreation.propTypes = {
  open: PropTypes.bool,
  dispatchContentClose: PropTypes.func,
  currentUser: PropTypes.object,
  pinCommunityPost: PropTypes.object,
  lastThreeArticles: PropTypes.object,
  dispatchCommunityList: PropTypes.func,
  dispatchFilterCommunityList: PropTypes.func,
  communityList: PropTypes.array,
  communityListLoading: PropTypes.bool,
  dispatchUploadFile: PropTypes.func,
  dispatchCleanUploadFile: PropTypes.func,
  uploadFile: PropTypes.object,
  languages: PropTypes.array,
  dispatchUserCommunity: PropTypes.func,
  userCommunity: PropTypes.array,
  dispatchGetTemplateType: PropTypes.func,
  templateType: PropTypes.array,
  dispatchCreateEvent: PropTypes.func,
  dispatchCreateArticle: PropTypes.func,
  dispatchCreateGrandArticle: PropTypes.func,
  dispatchCreateImageGallery: PropTypes.func,
  dispatchCreateDocument: PropTypes.func,
  contentSuccess: PropTypes.bool,
  dispatchCleanContentCreation: PropTypes.func,
  uid: PropTypes.string,
  dispatchContentDetails: PropTypes.func,
  contentDetails: PropTypes.object,
  dispatchCleanContentDetails: PropTypes.func,
  dispatchCreateQuickPost: PropTypes.func,
  communityUid: PropTypes.string,
  communityTabUid: PropTypes.string,
  contentLoading: PropTypes.bool,
};

const mapStateToProps = (state, props) =>
  createStructuredSelector({
    currentUser: makeSelectCurrentUser(),
    pinCommunityPost: makeSelectPinCommunityPost(),
    lastThreeArticles: makeSelectLastThreeArticles(),
    communityList: makeSelectCommunityList(),
    communityListLoading: makeSelectCommunityListLoading(),
    uploadFile: makeSelectUploadFile(),
    userCommunity: makeSelectUserCommunity(),
    languages: makeSelectLanguage(),
    templateType: makeSelectTemplateType(),
    contentSuccess: makeSelectContentSuccess(),
    contentDetails: makeSelectFeed(props.uid),
    contentLoading: makeSelectContentLoading(),
  });

function mapDispatchToProps(dispatch) {
  return {
    dispatchCommunityList: options => dispatch(getCommunityList(options)),
    dispatchFilterCommunityList: options =>
      dispatch(filterCommunityList(options)),
    dispatchUploadFile: (field, options) =>
      dispatch(uploadFile(field, options)),
    dispatchCleanUploadFile: () => dispatch(cleanUploadFile()),
    dispatchUserCommunity: options => dispatch(getUserCommunity(options)),
    dispatchGetTemplateType: () => dispatch(getTemplateType()),
    dispatchCreateEvent: content => dispatch(createEvent(content)),
    dispatchCreateArticle: content => dispatch(createArticle(content)),
    dispatchCreateGrandArticle: content =>
      dispatch(createGrandArticle(content)),
    dispatchCreateImageGallery: content =>
      dispatch(createImageGallery(content)),
    dispatchCreateDocument: content => dispatch(createDocument(content)),
    dispatchCleanContentCreation: () => dispatch(cleanContentCreation()),
    dispatchContentDetails: options => dispatch(getContentDetails(options)),
    dispatchCleanContentDetails: () => dispatch(cleanContentDetails()),
    dispatchCreateQuickPost: () => dispatch(createQuickPost('faq')),
    dispatchContentClose: () => dispatch(contentClose('faq')),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(withRouter(ContentCreation));

/* eslint-disable indent */
/**
 *
 * CreateWidget
 *
 */

import React, { memo, useEffect, useState, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Grid,
  TextField,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Close, Image } from '@material-ui/icons';
import Skeleton from '@material-ui/lab/Skeleton';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import Dropzone from 'react-dropzone';
import { useSnackbar } from 'notistack';
import moment from 'moment';
import rgbHex from 'rgb-hex';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useEffectAfterMount } from 'utils/helpers/useEffectAfterMount';
import { transformImage, transformVideo } from 'utils/helpers/transformBlock';
import { Thumbnail } from 'components/FeedTypes/Wrapper';
import { BlockButton } from 'containers/ContentCreation/Wrapper';
import {
  closeCreateWidget,
  getCommunityList,
} from 'containers/AuthBase/actions';
import { makeSelectCommunityList } from 'containers/AuthBase/selectors';
import DocumentBlock from 'containers/DocumentBlock/Loadable';
import VideoBlock from 'containers/VideoBlock/Loadable';
import ArticleBlock from 'components/ArticleBlock';
import ColorPicker from 'components/ColorPicker/Loadable';
import { ColorPaper } from 'containers/CreateCarousel/Wrapper';
import {
  makeSelectDisplayOptions,
  makeSelectWidgetTypes,
  makeSelectSocialWallTypes,
  makeSelectUploadFile,
  makeSelectTypeformList,
  makeSelectTypeformListLoading,
  makeSelectCreateWidgetSuccess,
  makeSelectWidget,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import {
  displayOptions as displayOptionsAction,
  widgetTypes as widgetTypesAction,
  socialWallTypes as socialWallTypesAction,
  uploadFile as uploadFileAction,
  typeformList as typeformListAction,
  typeformListMore,
  filterTypeformList,
  createWidget,
  cleanCreateWidget,
  widget as widgetAction,
} from './actions';
import { CreateWidgetSchema } from './Schema';

const supportedWidgetTypes = [
  'FCKEditor',
  'AutomatedCalendar',
  'ImageGallery',
  'RegularCalendar',
  'Poll',
  'FoodTruck',
  'Birthday',
  'RSS',
  'NoteDeServices',
  'CountdownClock',
  'BikeBooking',
  'LivelyForm',
  'VideoGallery',
  'Newcomer',
  'LinkedIn',
  'Twitter',
  'LatestPost',
  'Youtube',
  'Instagram',
  'Facebook',
  'Dailymotion',
];

const eventItem = {
  eventLink: '',
  eventName: '',
  fromDate: null,
  toDate: null,
};
const answerItem = { answer: '', active: true };
const questionItem = {
  active: true,
  allowMultipleAnswers: false,
  answers: [],
  question: '',
};
const optionItem = { name: '', price: '', sequenceNumber: 1 };

const defaultColors = [
  '#FFD166',
  '#F17105',
  '#7CB518',
  '#150578',
  '#72DDF7',
  '#FF3E41',
];

export function CreateWidget(props) {
  useInjectReducer({ key: 'createWidget', reducer });
  useInjectSaga({ key: 'createWidget', saga });

  const { enqueueSnackbar } = useSnackbar();

  const {
    dispatchCloseCreateWidget,
    communityList,
    dispatchCommunityList,
    dispatchDisplayOptions,
    dispatchWidgetTypes,
    dispatchSocialWallTypes,
    displayOptions,
    widgetTypes,
    socialWallTypes,
    dispatchUploadFile,
    uploadFile,
    dispatchTypeformList,
    dispatchTypeformListMore,
    dispatchFilterTypeformList,
    typeformList,
    typeformListLoading,
    dispatchCreateWidget,
    createWidgetSuccess,
    dispatchCleanCreateWidget,
    uid,
    dispatchWidget,
    widget,
    communityUid: _communityUid,
  } = props;

  const [title, setTitle] = useState('');
  const [displayOption, setDisplayOption] = useState('');
  const [type, setType] = useState('');
  const [communityUid, setCommunityUid] = useState('');
  const [active, setActive] = useState(false);
  const [sequenceNumber, setSequenceNumber] = useState(0);
  const [content, setContent] = useState('');
  const [numberOfFeed, setNumberOfFeed] = useState(5);
  const [imageUids, setImageUids] = useState([]);
  const [videos, setVideos] = useState([]);
  const [path, setPath] = useState([]);
  const [events, setEvents] = useState([{ id: uuidv4(), ...eventItem }]);
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      ...questionItem,
      answers: [{ id: uuidv4(), ...answerItem }],
    },
  ]);
  const [twitterData, setTwitterData] = useState({
    associatedAccountName: '',
    numberOfCount: 3,
    screenName: '',
  });
  const [food, setFood] = useState({
    description: '',
    id: '',
    imageUid: '',
    options: [{ id: uuidv4(), ...optionItem }],
  });
  const [countdownClockData, setCountdownClockData] = useState({
    endDate: null,
    endMessage: '',
    startMessage: '',
    url: '',
  });
  const [bikeBooking, setBikeBooking] = useState({
    imageUid: '',
    title: '',
  });
  const [newcomerData, setNewcomerData] = useState({
    isShowAllUsers: true,
    isShowCommunityFollowers: false,
    numberOfUser: 1,
  });
  const [linkedinData, setLinkedinData] = useState({
    associatedAccountName: '',
    numberOfCount: 3,
  });
  const [youtubeData, setYoutubeData] = useState({
    associatedAccountName: '',
    channelId: '',
    numberOfCount: 3,
  });
  const [instagramData, setInstagramData] = useState({
    associatedAccountName: '',
    numberOfCount: 3,
  });
  const [facebookData, setFacebookData] = useState({
    associatedAccountName: '',
    hideCover: false,
    pageUrl: '',
    showFacepile: false,
    smallHeader: true,
  });
  const [dailymotionData, setDailymotionData] = useState({
    associatedAccountName: '',
    numberOfCount: 3,
    screenName: '',
  });
  const [link, setLink] = useState({
    formid: '',
    imageUid: '',
    title: '',
    url: '',
  });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [colors, setColors] = useState({});
  const [pickerAnchorEl, setPickerAnchorEl] = React.useState(null);
  const [colorId, setColorId] = React.useState(undefined);

  const handleSetColor = newColor => {
    setColors(
      _.map(colors, color =>
        color.id === colorId ? { ...color, color: newColor } : color,
      ),
    );
  };

  const handleEvents = (id, name, value) =>
    setEvents(
      _.map(events, event =>
        event.id === id ? { ...event, [name]: value } : event,
      ),
    );

  const handleDeleteEvent = id =>
    setEvents(_.filter(events, event => event.id !== id));

  const handleAddEvent = () =>
    setEvents([...events, { id: uuidv4(), ...eventItem }]);

  const handleQuestions = (id, name, value) =>
    setQuestions(
      _.map(questions, question =>
        question.id === id ? { ...question, [name]: value } : question,
      ),
    );

  const handleDeleteQuestion = id =>
    setQuestions(_.filter(questions, question => question.id !== id));

  const handleAddQuestion = () =>
    setQuestions([
      ...questions,
      {
        id: uuidv4(),
        ...questionItem,
        answers: [{ id: uuidv4(), ...answerItem }],
      },
    ]);

  const handleAddAnswers = id => {
    setQuestions(
      _.map(questions, question =>
        question.id === id
          ? {
              ...question,
              answers: [...question.answers, { id: uuidv4(), ...answerItem }],
            }
          : question,
      ),
    );
  };

  const handleAnswer = (questionId, answerId, value) =>
    setQuestions(
      _.map(questions, question =>
        question.id === questionId
          ? {
              ...question,
              answers: _.map(question.answers, answer =>
                answer.id === answerId ? { ...answer, answer: value } : answer,
              ),
            }
          : question,
      ),
    );

  const handleDeleteAnswer = (questionId, answerId) =>
    setQuestions(
      _.map(questions, question =>
        question.id === questionId
          ? {
              ...question,
              answers: _.filter(
                question.answers,
                answer => answer.id !== answerId,
              ),
            }
          : question,
      ),
    );

  const handleTwitterData = e =>
    setTwitterData({ ...twitterData, [e.target.name]: e.target.value });

  const handleLinkedinData = e =>
    setLinkedinData({ ...linkedinData, [e.target.name]: e.target.value });

  const handleYoutubeData = e =>
    setYoutubeData({ ...youtubeData, [e.target.name]: e.target.value });

  const handleInstagramData = e =>
    setInstagramData({ ...instagramData, [e.target.name]: e.target.value });

  const handleFacebookData = (name, value) =>
    setFacebookData({ ...facebookData, [name]: value });

  const handledailymotionData = e =>
    setDailymotionData({ ...dailymotionData, [e.target.name]: e.target.value });

  const handleFood = (name, value) => setFood({ ...food, [name]: value });

  const handleFoodOptions = id => e =>
    setFood({
      ...food,
      options: _.map(food.options, option =>
        option.id === id
          ? { ...option, [e.target.name]: e.target.value }
          : option,
      ),
    });

  const handleDeleteFoodOption = id =>
    setFood({
      ...food,
      options: _.filter(food.options, option => option.id !== id),
    });

  const handleAddFoodOption = () =>
    setFood({
      ...food,
      options: [...food.options, { id: uuidv4(), ...optionItem }],
    });

  const handleCountdownClockData = (name, value) =>
    setCountdownClockData({
      ...countdownClockData,
      [name]: value,
    });

  const handleLink = id => {
    const typeform = _.find(typeformList.items, { id });
    setLink({
      ...link,
      formid: id,
      title: typeform.title,
      // eslint-disable-next-line dot-notation
      url: typeform['_links'].display,
    });
  };

  useEffect(() => {
    if (_.isEmpty(displayOptions)) {
      dispatchDisplayOptions();
    }
    return dispatchCleanCreateWidget;
  }, []);

  useEffect(() => {
    if (!_.isEmpty(displayOptions)) {
      if (uid) {
        dispatchWidget({ uid });
      } else if (!uid && !_communityUid) {
        setDisplayOption(_.first(displayOptions));
      } else if (_communityUid) {
        setDisplayOption('Community');
      }
    }
  }, [displayOptions]);

  useEffect(() => {
    if (!_.isEmpty(widget)) {
      setDisplayOption(widget.displayOption);
    }
  }, [widget]);

  useEffect(() => {
    if (displayOption === 'Home' || displayOption === 'Community') {
      if (_.isEmpty(widgetTypes)) {
        dispatchWidgetTypes();
      }
    } else if (displayOption === 'SocialWall') {
      if (_.isEmpty(socialWallTypes)) {
        dispatchSocialWallTypes();
      }
    }
    if (displayOption === 'Community') {
      dispatchCommunityList({
        filter: 'lively',
        gplusCommunity: 'ALL',
      });
    }
  }, [displayOption]);

  useEffect(() => {
    if (!_.isEmpty(communityList)) {
      setCommunityUid(_communityUid);
    }
  }, [communityList]);

  const [foodTruckImage, setFoodTruckImage] = useState({});
  const [bikeBookingImage, setBikeBookingImage] = useState({});
  const [livelyFormImage, setLivelyFormImage] = useState({});
  const widgetRef = useRef(false);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (widgetRef.current) {
      return;
    }
    if (!_.isEmpty(widget)) {
      if (
        (!_.isEmpty(widgetTypes) &&
          (widget.displayOption === 'Home' ||
            (widget.displayOption === 'Community' &&
              !_.isEmpty(communityList)))) ||
        (!_.isEmpty(socialWallTypes) && widget.displayOption === 'SocialWall')
      ) {
        widgetRef.current = true;
        setTitle(widget.title);
        setType(widget.type);
        setSequenceNumber(widget.sequenceNumber);
        setActive(widget.active);
        if (widget.type === 'FCKEditor') {
          setContent(widget.content);
        }
        if (widget.type === 'ImageGallery') {
          setImageUids(widget.imageGallery);
        }
        if (widget.type === 'VideoGallery') {
          setVideos(widget.videoGallery);
        }
        if (widget.type === 'AutomatedCalendar') {
          setPath(widget.content);
        }
        if (widget.type === 'RegularCalendar' && !widget.defaultWidget) {
          setEvents(
            _.map(widget.events, event => ({
              id: uuidv4(),
              uid: event.uid,
              eventLink: event.eventLink,
              eventName: event.eventName,
              fromDate: event.fromDate,
              toDate: event.toDate,
            })),
          );
        }
        if (widget.type === 'RegularCalendar' && widget.defaultWidget) {
          if (widget.calendarData && !_.isEmpty(widget.calendarData.colors)) {
            setColors(
              _.map(widget.calendarData.colors, color => ({
                id: uuidv4(),
                color: _.startsWith(color, 'rgb') ? `#${rgbHex(color)}` : color,
              })),
            );
          } else {
            setColors(
              _.map(defaultColors, color => ({
                id: uuidv4(),
                color,
              })),
            );
          }
        }
        if (widget.type === 'Poll') {
          setQuestions(
            _.map(
              widget.questions,
              ({
                id: questionId,
                active: questionActive,
                allowMultipleAnswers,
                answers,
                question,
              }) => ({
                id: questionId,
                active: questionActive,
                allowMultipleAnswers,
                question,
                answers: _.map(
                  answers,
                  ({ id: answerId, answer, active: answerActive }) => ({
                    id: answerId,
                    answer,
                    active: answerActive,
                  }),
                ),
              }),
            ),
          );
        }
        if (widget.type === 'Twitter') {
          const {
            associatedAccountName,
            numberOfCount,
            screenName,
          } = widget.twitterData;
          setTwitterData({ associatedAccountName, numberOfCount, screenName });
        }
        if (widget.type === 'RSS') {
          const [_content, _numberOfFeed] = _.split(widget.content, '---');
          setContent(_content);
          setNumberOfFeed(_numberOfFeed);
        }
        if (widget.type === 'FoodTruck') {
          const { description, id, image, options } = widget.food;
          setFood({ description, id, options, imageUid: image.uid });
          setFoodTruckImage(image);
        }
        if (widget.type === 'CountdownClock') {
          setCountdownClockData(widget.countdownClockData);
        }
        if (widget.type === 'BikeBooking') {
          const { image, ...rest } = widget.bikeBookingData;
          setBikeBooking({ ...rest, imageUid: image.uid });
          setBikeBookingImage(image);
        }
        if (widget.type === 'LivelyForm' && !_.isEmpty(typeformList)) {
          const {
            formid,
            imageThumbGalleryUrl,
            imageUid,
            imageUrl,
            url,
          } = widget.link;
          setLink({ formid, imageUid, title, url });
          setLivelyFormImage({
            url: imageUrl,
            uid: imageUid,
            imageThumbGalleryUrl,
          });
        }
        if (widget.type === 'Newcomer') {
          setNewcomerData(widget.newcomerData);
        }
        if (widget.type === 'LinkedIn') {
          const { associatedAccountName, numberOfCount } = widget.linkedInData;
          setLinkedinData({ associatedAccountName, numberOfCount });
        }
        if (widget.type === 'Youtube') {
          const {
            associatedAccountName,
            channelId,
            numberOfCount,
          } = widget.youtubeData;
          setYoutubeData({
            associatedAccountName,
            channelId,
            numberOfCount,
          });
        }
        if (widget.type === 'Instagram') {
          const { associatedAccountName, numberOfCount } = widget.instagramData;
          setInstagramData({ associatedAccountName, numberOfCount });
        }
        if (widget.type === 'Facebook') {
          const {
            associatedAccountName,
            hideCover,
            pageUrl,
            showFacepile,
            smallHeader,
          } = widget.facebookData;
          setFacebookData({
            associatedAccountName,
            hideCover,
            pageUrl,
            showFacepile,
            smallHeader,
          });
        }
        if (widget.type === 'Dailymotion') {
          const {
            associatedAccountName,
            numberOfCount,
            screenName,
          } = widget.dailymotionData;
          setDailymotionData({
            associatedAccountName,
            numberOfCount,
            screenName,
          });
        }
      }
    }
  }, [widget, widgetTypes, socialWallTypes, communityList, typeformList]);

  useEffect(() => {
    if (type === 'LivelyForm') {
      dispatchTypeformList({ page: 1, page_size: 10 });
    }
  }, [type]);

  useEffect(() => {
    if (page > 1) {
      dispatchTypeformListMore({ page, page_size: 10 });
    }
  }, [page]);

  useEffectAfterMount(() => {
    if (page > 1) {
      setPage(1);
    }
    dispatchFilterTypeformList({ search, page, page_size: 10 });
  }, [search]);

  const handleOnDrop = useCallback((widgetType, files) => {
    const file = _.head(files);
    const formData = new FormData();
    formData.append('fileName', file.name);
    formData.append('file', file);
    dispatchUploadFile(widgetType, formData);
  }, []);

  useEffect(() => {
    if (!_.isEmpty(uploadFile)) {
      if (!_.isEmpty(uploadFile.FoodTruck) && type === 'FoodTruck') {
        handleFood('imageUid', _.head(uploadFile.FoodTruck).uid);
      }
      if (!_.isEmpty(uploadFile.BikeBooking) && type === 'BikeBooking') {
        setBikeBooking({
          ...bikeBooking,
          imageUid: _.head(uploadFile.BikeBooking).uid,
        });
      }
      if (!_.isEmpty(uploadFile.LivelyForm) && type === 'LivelyForm') {
        setLink({
          ...link,
          imageUid: _.head(uploadFile.LivelyForm).uid,
        });
      }
    }
  }, [uploadFile]);

  useEffect(() => {}, []);

  const handlePublish = () => {
    let payload = {
      uid,
      title,
      type,
      sequenceNumber,
      active,
      communityUid: _communityUid,
      displayOption,
    };
    if (type === 'FCKEditor') {
      payload = { ...payload, content };
    }
    if (type === 'ImageGallery') {
      payload = {
        ...payload,
        imageUids: _.map(imageUids, imageUid => ({
          ...transformImage(imageUid),
          mediumUrl: imageUid.mediumUrl,
        })),
      };
    }
    if (type === 'VideoGallery') {
      payload = {
        ...payload,
        videos: _.map(videos, video => transformVideo(video)),
      };
    }
    if (type === 'AutomatedCalendar') {
      payload = { ...payload, path };
    }
    if (
      type === 'RegularCalendar' &&
      !_.isEmpty(widget) &&
      widget.defaultWidget
    ) {
      payload = {
        ...payload,
        calendarData: {
          colors: _.map(colors, ({ color }) => color),
        },
      };
    }
    if (
      type === 'RegularCalendar' &&
      (_.isEmpty(widget) || (!_.isEmpty(widget) && !widget.defaultWidget))
    ) {
      payload = {
        ...payload,
        events: _.map(events, ({ id, fromDate, toDate, ...rest }) => ({
          fromDate: parseFloat(moment(fromDate).format('x')),
          toDate: parseFloat(moment(toDate).format('x')),
          ...rest,
        })),
      };
    }
    if (type === 'Poll') {
      payload = {
        ...payload,
        questions: _.map(
          questions,
          ({ id: questionId, answers, ...questionContent }) => ({
            answers: _.map(answers, ({ id: answerId, ...rest }) => ({
              id: uuidValidate(answerId) ? undefined : answerId,
              ...rest,
            })),
            id: uuidValidate(questionId) ? undefined : questionId,
            ...questionContent,
          }),
        ),
      };
    }
    if (type === 'Twitter') {
      payload = { ...payload, twitterData };
    }
    if (type === 'RSS') {
      payload = { ...payload, content: `${content}---${numberOfFeed}` };
    }
    if (type === 'FoodTruck') {
      payload = {
        ...payload,
        food: {
          ...food,
          options: _.map(food.options, ({ id, ...rest }, index) => ({
            id: uuidValidate(id) ? undefined : id,
            ...rest,
            sequenceNumber: index,
          })),
        },
      };
    }
    if (type === 'CountdownClock') {
      payload = {
        ...payload,
        countdownClockData: {
          ...countdownClockData,
          endDate: parseFloat(moment(countdownClockData.endDate).format('x')),
        },
      };
    }
    if (type === 'BikeBooking') {
      payload = { ...payload, bikeBooking: { ...bikeBooking, title } };
    }
    if (type === 'LivelyForm') {
      payload = { ...payload, link: { ...link, title } };
    }
    if (type === 'Newcomer') {
      payload = { ...payload, newcomerData };
    }
    if (type === 'LinkedIn') {
      payload = { ...payload, linkedinData };
    }
    if (type === 'Youtube') {
      payload = { ...payload, youtubeData };
    }
    if (type === 'Instagram') {
      payload = { ...payload, instagramData };
    }
    if (type === 'Facebook') {
      payload = { ...payload, facebookData };
    }
    if (type === 'Dailymotion') {
      payload = { ...payload, dailymotionData };
    }
    const result = CreateWidgetSchema.validate(payload, {
      context: {
        defaultWidget: type === 'RegularCalendar' && widget.defaultWidget,
      },
    });
    if (result.error) {
      enqueueSnackbar(`${result.error}`, {
        variant: 'error',
      });
    }
    if (!result.error) {
      dispatchCreateWidget(payload);
    }
  };

  useEffect(() => {
    if (createWidgetSuccess) {
      enqueueSnackbar('Success', { variant: 'success' });
      dispatchCloseCreateWidget();
    }
  }, [createWidgetSuccess]);

  return (
    <>
      <Dialog
        open
        onClose={dispatchCloseCreateWidget}
        scroll="paper"
        fullWidth
        maxWidth="md"
        disableEnforceFocus
      >
        <DialogTitle>
          Create Widget
          <IconButton
            aria-label="close"
            onClick={dispatchCloseCreateWidget}
            style={{ position: 'absolute', top: 5, right: 5 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                variant="outlined"
                fullWidth
                size="small"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </Grid>
            {(_.isEmpty(widget) ||
              (!_.isEmpty(widget) && !widget.defaultWidget)) && (
              <>
                <Grid item xs={12}>
                  <TextField
                    label="Display Option"
                    variant="outlined"
                    fullWidth
                    size="small"
                    select
                    value={displayOption}
                    onChange={e => setDisplayOption(e.target.value)}
                  >
                    {_.map(displayOptions, option => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Widget Type"
                    variant="outlined"
                    fullWidth
                    size="small"
                    select
                    value={type}
                    onChange={e => setType(e.target.value)}
                  >
                    {(displayOption === 'Home' ||
                      displayOption === 'Community') &&
                      _.map(
                        widgetTypes,
                        widgetType =>
                          _.includes(supportedWidgetTypes, widgetType) && (
                            <MenuItem key={widgetType} value={widgetType}>
                              {widgetType}
                            </MenuItem>
                          ),
                      )}
                    {displayOption === 'SocialWall' &&
                      _.map(socialWallTypes, socialWallType => (
                        <MenuItem key={socialWallType} value={socialWallType}>
                          {socialWallType}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
              </>
            )}
            {displayOption === 'Community' && (
              <Grid item xs={12}>
                <TextField
                  label="Select Community"
                  variant="outlined"
                  fullWidth
                  size="small"
                  select
                  value={communityUid}
                  onChange={e => setCommunityUid(e.target.value)}
                >
                  {_.map(communityList, community => (
                    <MenuItem key={community.uid} value={community.uid}>
                      {community.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={active}
                    onChange={e => setActive(e.target.checked)}
                    color="primary"
                  />
                }
                label="Active"
              />
            </Grid>
            <Grid item xs={12}>
              {type === 'FCKEditor' && (
                <ArticleBlock data={content} onChangeCKEditor={setContent} />
              )}
              {type === 'ImageGallery' && (
                <DocumentBlock
                  type="Images"
                  id="CreateWidgetDocumentBlock"
                  items={imageUids}
                  setItems={setImageUids}
                  handleClose={() => {}}
                />
              )}
              {type === 'VideoGallery' && (
                <VideoBlock
                  videos={videos}
                  setVideos={setVideos}
                  handleClose={() => {}}
                />
              )}
              {type === 'AutomatedCalendar' && (
                <TextField
                  label="Path"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={path}
                  onChange={e => setPath(e.target.value)}
                />
              )}
              {type === 'RegularCalendar' &&
                !_.isEmpty(widget) &&
                widget.defaultWidget && (
                  <Grid container spacing={2}>
                    {_.map(colors, color => (
                      <Grid item xs={4} key={color.id}>
                        <Paper
                          variant="outlined"
                          style={{ flex: 1, cursor: 'pointer' }}
                          onClick={e => {
                            setPickerAnchorEl(e.currentTarget);
                            setColorId(color.id);
                          }}
                        >
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={2}>
                              <ColorPaper
                                variant="outlined"
                                background={color.color}
                              />
                            </Grid>
                            <Grid item xs>
                              <Typography>{color.color}</Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                )}
              {type === 'RegularCalendar' &&
                (_.isEmpty(widget) ||
                  (!_.isEmpty(widget) && !widget.defaultWidget)) && (
                  <Grid container spacing={2}>
                    {_.map(events, event => (
                      <Grid item xs={12} key={event.id}>
                        <Paper variant="outlined" square style={{ padding: 8 }}>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <Grid container alignItems="center">
                                <Grid item xs>
                                  <Typography variant="h6">
                                    {event.eventName || 'Event Title'}
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <IconButton
                                    onClick={() => handleDeleteEvent(event.id)}
                                  >
                                    <Close fontSize="small" />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label="Title"
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={event.eventName}
                                onChange={e =>
                                  handleEvents(
                                    event.id,
                                    'eventName',
                                    e.target.value,
                                  )
                                }
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                label="Link"
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={event.eventLink}
                                onChange={e =>
                                  handleEvents(
                                    event.id,
                                    'eventLink',
                                    e.target.value,
                                  )
                                }
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <Grid container spacing={2}>
                                <Grid item xs={6}>
                                  <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    inputVariant="outlined"
                                    format="MMM dd, yyyy"
                                    value={event.fromDate}
                                    onChange={date =>
                                      handleEvents(event.id, 'fromDate', date)
                                    }
                                    autoOk
                                    disablePast
                                    fullWidth
                                    maxDate={event.toDate}
                                    TextFieldComponent={textFieldProps => (
                                      <TextField
                                        {...textFieldProps}
                                        size="small"
                                        variant="outlined"
                                        InputProps={{
                                          ...textFieldProps.InputProps,
                                          style: { paddingRight: 0 },
                                        }}
                                        placeholder="Start Date"
                                      />
                                    )}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <KeyboardTimePicker
                                    disableToolbar
                                    variant="inline"
                                    inputVariant="outlined"
                                    value={event.fromDate}
                                    onChange={date =>
                                      handleEvents(event.id, 'fromDate', date)
                                    }
                                    autoOk
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
                                        placeholder="Start Time"
                                      />
                                    )}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid container spacing={2}>
                                <Grid item xs={6}>
                                  <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    inputVariant="outlined"
                                    format="MMM dd, yyyy"
                                    value={event.toDate}
                                    onChange={date =>
                                      handleEvents(event.id, 'toDate', date)
                                    }
                                    autoOk
                                    disablePast
                                    fullWidth
                                    minDate={event.fromDate}
                                    TextFieldComponent={textFieldProps => (
                                      <TextField
                                        {...textFieldProps}
                                        size="small"
                                        variant="outlined"
                                        InputProps={{
                                          ...textFieldProps.InputProps,
                                          style: { paddingRight: 0 },
                                        }}
                                        placeholder="End Date"
                                      />
                                    )}
                                  />
                                </Grid>
                                <Grid item xs={6}>
                                  <KeyboardTimePicker
                                    disableToolbar
                                    variant="inline"
                                    inputVariant="outlined"
                                    value={event.toDate}
                                    onChange={date =>
                                      handleEvents(event.id, 'toDate', date)
                                    }
                                    autoOk
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
                                        placeholder="End Time"
                                      />
                                    )}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleAddEvent}
                      >
                        Add Event
                      </Button>
                    </Grid>
                  </Grid>
                )}
              {type === 'Poll' && (
                <Grid container spacing={2}>
                  {_.map(questions, question => (
                    <Grid item xs={12} key={question.id}>
                      <Paper variant="outlined" square style={{ padding: 8 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Grid container alignItems="center">
                              <Grid item xs>
                                <Typography variant="h6">
                                  {question.question || 'Question'}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <IconButton
                                  edge="end"
                                  onClick={() =>
                                    handleDeleteQuestion(question.id)
                                  }
                                >
                                  <Close fontSize="small" />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              label="Question"
                              variant="outlined"
                              fullWidth
                              size="small"
                              value={question.question}
                              onChange={e =>
                                handleQuestions(
                                  question.id,
                                  'question',
                                  e.target.value,
                                )
                              }
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container spacing={2} alignItems="center">
                              <Grid item>
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  onClick={() => handleAddAnswers(question.id)}
                                >
                                  Add Answer
                                </Button>
                              </Grid>
                              <Grid item>
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={question.allowMultipleAnswers}
                                      onChange={e =>
                                        handleQuestions(
                                          question.id,
                                          'allowMultipleAnswers',
                                          e.target.checked,
                                        )
                                      }
                                      color="primary"
                                    />
                                  }
                                  label="Allow multiple answers"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            {_.map(question.answers, answer => (
                              <Grid
                                container
                                spacing={2}
                                key={answer.id}
                                alignItems="center"
                              >
                                <Grid item xs>
                                  <TextField
                                    label="Answer"
                                    variant="outlined"
                                    fullWidth
                                    size="small"
                                    value={answer.answer}
                                    onChange={e =>
                                      handleAnswer(
                                        question.id,
                                        answer.id,
                                        e.target.value,
                                      )
                                    }
                                  />
                                </Grid>
                                <Grid item>
                                  <IconButton
                                    onClick={() =>
                                      handleDeleteAnswer(question.id, answer.id)
                                    }
                                  >
                                    <Close fontSize="small" />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  ))}
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleAddQuestion}
                    >
                      Add Question
                    </Button>
                  </Grid>
                </Grid>
              )}
              {type === 'Twitter' && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Associated Name"
                      variant="outlined"
                      fullWidth
                      size="small"
                      name="associatedAccountName"
                      value={twitterData.associatedAccountName}
                      onChange={handleTwitterData}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Compte Twitter"
                      variant="outlined"
                      fullWidth
                      size="small"
                      name="screenName"
                      value={twitterData.screenName}
                      onChange={handleTwitterData}
                      helperText="Ce widget affichera les tweets du compte Twitter mentionné."
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Nombre de tweets à afficher"
                      variant="outlined"
                      fullWidth
                      size="small"
                      type="number"
                      InputProps={{
                        inputProps: { min: 1, max: 200 },
                      }}
                      name="numberOfCount"
                      value={twitterData.numberOfCount}
                      onChange={handleTwitterData}
                      helperText="Le nombre doit être compris entre 1 et 200"
                    />
                  </Grid>
                </Grid>
              )}
              {type === 'RSS' && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="RSS Link"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={content}
                      onChange={e => setContent(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Number of Feed"
                      variant="outlined"
                      fullWidth
                      size="small"
                      type="number"
                      value={numberOfFeed}
                      onChange={e => setNumberOfFeed(e.target.value)}
                    />
                  </Grid>
                </Grid>
              )}
              {type === 'FoodTruck' && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Thumbnail style={{ color: 'inherit' }}>
                          <Dropzone
                            accept="image/png, image/jpg, image/gif, image/jpeg"
                            maxFiles={1}
                            onDrop={acceptedFiles =>
                              handleOnDrop('FoodTruck', acceptedFiles)
                            }
                          >
                            {({ getRootProps, getInputProps }) => (
                              <BlockButton
                                style={
                                  _.isEmpty(foodTruckImage) &&
                                  _.isEmpty(uploadFile.FoodTruck)
                                    ? {
                                        backgroundColor: '#eceeef',
                                        border: '1px solid rgba(0, 0, 0, 0.12)',
                                      }
                                    : {}
                                }
                                {...getRootProps()}
                              >
                                <input {...getInputProps()} />
                                {_.isEmpty(foodTruckImage) &&
                                _.isEmpty(uploadFile.FoodTruck) ? (
                                  <>
                                    <Image fontSize="large" />
                                    <Typography>Upload Image</Typography>
                                  </>
                                ) : (
                                  <img
                                    src={
                                      (!_.isEmpty(uploadFile.FoodTruck) &&
                                        _.head(uploadFile.FoodTruck)
                                          .mediumUrl) ||
                                      foodTruckImage.mediumUrl
                                    }
                                    alt=""
                                    width="100%"
                                  />
                                )}
                              </BlockButton>
                            )}
                          </Dropzone>
                        </Thumbnail>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          label="Description"
                          variant="outlined"
                          fullWidth
                          size="small"
                          multiline
                          rows={4}
                          value={food.description}
                          onChange={e =>
                            handleFood('description', e.target.value)
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    {_.map(food.options, option => (
                      <Grid
                        container
                        spacing={2}
                        key={option.id}
                        alignItems="center"
                      >
                        <Grid item xs>
                          <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            size="small"
                            name="name"
                            value={option.name}
                            onChange={handleFoodOptions(option.id)}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <TextField
                            label="Price"
                            variant="outlined"
                            fullWidth
                            size="small"
                            type="number"
                            name="price"
                            value={option.price}
                            onChange={handleFoodOptions(option.id)}
                          />
                        </Grid>
                        <Grid item>
                          <IconButton
                            onClick={() => handleDeleteFoodOption(option.id)}
                          >
                            <Close fontSize="small" />
                          </IconButton>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleAddFoodOption}
                    >
                      Add Food
                    </Button>
                  </Grid>
                </Grid>
              )}
              {type === 'CountdownClock' && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Start Message"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={countdownClockData.startMessage}
                      onChange={e =>
                        handleCountdownClockData('startMessage', e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="End Message"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={countdownClockData.endMessage}
                      onChange={e =>
                        handleCountdownClockData('endMessage', e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="URL"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={countdownClockData.url}
                      onChange={e =>
                        handleCountdownClockData('url', e.target.value)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <KeyboardDatePicker
                          disableToolbar
                          variant="inline"
                          inputVariant="outlined"
                          format="MMM dd, yyyy"
                          value={countdownClockData.endDate}
                          onChange={date =>
                            handleCountdownClockData('endDate', date)
                          }
                          autoOk
                          disablePast
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
                              placeholder="End Date"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <KeyboardTimePicker
                          disableToolbar
                          variant="inline"
                          inputVariant="outlined"
                          value={countdownClockData.endDate}
                          onChange={date =>
                            handleCountdownClockData('endDate', date)
                          }
                          autoOk
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
                              placeholder="End Time"
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {type === 'BikeBooking' && (
                <Grid container spacing={2} justify="center">
                  <Grid item xs={4}>
                    <Thumbnail style={{ color: 'inherit' }}>
                      <Dropzone
                        accept="image/png, image/jpg, image/gif, image/jpeg"
                        maxFiles={1}
                        onDrop={acceptedFiles =>
                          handleOnDrop('BikeBooking', acceptedFiles)
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <BlockButton
                            style={
                              _.isEmpty(bikeBookingImage) &&
                              _.isEmpty(uploadFile.BikeBooking)
                                ? {
                                    backgroundColor: '#eceeef',
                                    border: '1px solid rgba(0, 0, 0, 0.12)',
                                  }
                                : {}
                            }
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            {_.isEmpty(bikeBookingImage) &&
                            _.isEmpty(uploadFile.BikeBooking) ? (
                              <>
                                <Image fontSize="large" />
                                <Typography>Upload Image</Typography>
                              </>
                            ) : (
                              <img
                                src={
                                  (!_.isEmpty(uploadFile.BikeBooking) &&
                                    _.head(uploadFile.BikeBooking).mediumUrl) ||
                                  bikeBookingImage.thumbGalleryUrl
                                }
                                alt=""
                                width="100%"
                              />
                            )}
                          </BlockButton>
                        )}
                      </Dropzone>
                    </Thumbnail>
                  </Grid>
                </Grid>
              )}
              {type === 'LivelyForm' && (
                <Grid container spacing={2} justify="center">
                  <Grid item xs={4}>
                    <Thumbnail style={{ color: 'inherit' }}>
                      <Dropzone
                        accept="image/png, image/jpg, image/gif, image/jpeg"
                        maxFiles={1}
                        onDrop={acceptedFiles =>
                          handleOnDrop('LivelyForm', acceptedFiles)
                        }
                      >
                        {({ getRootProps, getInputProps }) => (
                          <BlockButton
                            style={
                              _.isEmpty(livelyFormImage) &&
                              _.isEmpty(uploadFile.LivelyForm)
                                ? {
                                    backgroundColor: '#eceeef',
                                    border: '1px solid rgba(0, 0, 0, 0.12)',
                                  }
                                : {}
                            }
                            {...getRootProps()}
                          >
                            <input {...getInputProps()} />
                            {_.isEmpty(livelyFormImage) &&
                            _.isEmpty(uploadFile.LivelyForm) ? (
                              <>
                                <Image fontSize="large" />
                                <Typography>Upload Image</Typography>
                              </>
                            ) : (
                              <img
                                src={
                                  (!_.isEmpty(uploadFile.LivelyForm) &&
                                    _.head(uploadFile.LivelyForm).mediumUrl) ||
                                  livelyFormImage.imageThumbGalleryUrl
                                }
                                alt=""
                                width="100%"
                              />
                            )}
                          </BlockButton>
                        )}
                      </Dropzone>
                    </Thumbnail>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper variant="outlined" square style={{ padding: 8 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                              <Typography variant="h6">
                                Select one of the forms
                              </Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <TextField
                                label="Search"
                                variant="outlined"
                                fullWidth
                                size="small"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          {!_.isEmpty(typeformList) && (
                            <RadioGroup
                              value={link.formid}
                              onChange={e => handleLink(e.target.value)}
                            >
                              {_.map(typeformList.items, item => (
                                <FormControlLabel
                                  key={item.id}
                                  value={item.id}
                                  control={<Radio />}
                                  label={item.title}
                                />
                              ))}
                            </RadioGroup>
                          )}
                          {typeformListLoading &&
                            _.map(_.range(2), index => (
                              <Skeleton
                                key={index}
                                variant="rect"
                                height={42}
                                style={{ marginBottom: 5 }}
                              />
                            ))}
                        </Grid>
                        {typeformList.totalItems >
                          _.size(typeformList.items) && (
                          <Grid item xs={12}>
                            <Button
                              onClick={() => setPage(page + 1)}
                              variant="outlined"
                              color="primary"
                            >
                              View More
                            </Button>
                          </Grid>
                        )}
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              )}
              {type === 'Newcomer' && (
                <TextField
                  label="Number of Users"
                  variant="outlined"
                  fullWidth
                  size="small"
                  type="number"
                  value={newcomerData.numberOfUser}
                  onChange={e =>
                    setNewcomerData({
                      ...newcomerData,
                      numberOfUser: e.target.value,
                    })
                  }
                />
              )}
              {type === 'LinkedIn' && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Associated Name"
                      variant="outlined"
                      fullWidth
                      size="small"
                      name="associatedAccountName"
                      value={linkedinData.associatedAccountName}
                      onChange={handleLinkedinData}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Nombre de derniers posts à afficher"
                      variant="outlined"
                      fullWidth
                      size="small"
                      type="number"
                      InputProps={{
                        inputProps: { min: 1, max: 200 },
                      }}
                      name="numberOfCount"
                      value={linkedinData.numberOfCount}
                      onChange={handleLinkedinData}
                      helperText="Le nombre doit être compris entre 1 et 200"
                    />
                  </Grid>
                </Grid>
              )}
              {type === 'Youtube' && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Associated Name"
                      variant="outlined"
                      fullWidth
                      size="small"
                      name="associatedAccountName"
                      value={youtubeData.associatedAccountName}
                      onChange={handleYoutubeData}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Youtube Channel ID"
                      variant="outlined"
                      fullWidth
                      size="small"
                      name="channelId"
                      value={youtubeData.channelId}
                      onChange={handleYoutubeData}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Number of latest videos to show"
                      variant="outlined"
                      fullWidth
                      size="small"
                      type="number"
                      InputProps={{
                        inputProps: { min: 1, max: 50 },
                      }}
                      name="numberOfCount"
                      value={youtubeData.numberOfCount}
                      onChange={handleYoutubeData}
                      helperText="Le nombre doit être compris entre 1 et 50"
                    />
                  </Grid>
                </Grid>
              )}
              {type === 'Instagram' && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Associated Name"
                      variant="outlined"
                      fullWidth
                      size="small"
                      name="associatedAccountName"
                      value={instagramData.associatedAccountName}
                      onChange={handleInstagramData}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Nombre de derniers posts à afficher"
                      variant="outlined"
                      fullWidth
                      size="small"
                      type="number"
                      InputProps={{
                        inputProps: { min: 1, max: 10000 },
                      }}
                      name="numberOfCount"
                      value={instagramData.numberOfCount}
                      onChange={handleInstagramData}
                      helperText="Le nombre doit être compris entre 1 et 10000"
                    />
                  </Grid>
                </Grid>
              )}
              {type === 'Facebook' && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Associated Name"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={facebookData.associatedAccountName}
                      onChange={e =>
                        handleFacebookData(
                          'associatedAccountName',
                          e.target.value,
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="URL de la page Facebook"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={facebookData.pageUrl}
                      onChange={e =>
                        handleFacebookData('pageUrl', e.target.value)
                      }
                      helperText="Ne pas mettre le domaine principal Facebook, mais seulement ce qui se trouve après https://www.facebook.com/"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={facebookData.smallHeader}
                              onChange={e =>
                                handleFacebookData(
                                  'smallHeader',
                                  e.target.checked,
                                )
                              }
                              color="primary"
                            />
                          }
                          label="Réduire la taille du header"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={facebookData.hideCover}
                              onChange={e =>
                                handleFacebookData(
                                  'hideCover',
                                  e.target.checked,
                                )
                              }
                              color="primary"
                            />
                          }
                          label="Ne pas afficher la photo de couverture"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={facebookData.showFacepile}
                              onChange={e =>
                                handleFacebookData(
                                  'showFacepile',
                                  e.target.checked,
                                )
                              }
                              color="primary"
                            />
                          }
                          label="Afficher les photos des personnes suivant la page"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              {type === 'Dailymotion' && (
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Associated Name"
                      variant="outlined"
                      fullWidth
                      size="small"
                      name="associatedAccountName"
                      value={dailymotionData.associatedAccountName}
                      onChange={handledailymotionData}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Dailymotion Name"
                      variant="outlined"
                      fullWidth
                      size="small"
                      name="screenName"
                      value={dailymotionData.screenName}
                      onChange={handledailymotionData}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Number of latest videos to show"
                      variant="outlined"
                      fullWidth
                      size="small"
                      type="number"
                      InputProps={{
                        inputProps: { min: 1, max: 100 },
                      }}
                      name="numberOfCount"
                      value={dailymotionData.numberOfCount}
                      onChange={handledailymotionData}
                      helperText="Le nombre doit être compris entre 1 et 100"
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handlePublish}>
            Publish
          </Button>
        </DialogActions>
      </Dialog>
      {pickerAnchorEl && colorId && (
        <ColorPicker
          anchorEl={pickerAnchorEl}
          handleClose={() => {
            setPickerAnchorEl(null);
            setColorId(undefined);
          }}
          color={_.find(colors, { id: colorId }).color}
          setColor={handleSetColor}
        />
      )}
    </>
  );
}

CreateWidget.propTypes = {
  dispatchCloseCreateWidget: PropTypes.func,
  dispatchCommunityList: PropTypes.func,
  communityList: PropTypes.array,
  dispatchDisplayOptions: PropTypes.func,
  dispatchWidgetTypes: PropTypes.func,
  dispatchSocialWallTypes: PropTypes.func,
  displayOptions: PropTypes.array,
  widgetTypes: PropTypes.array,
  socialWallTypes: PropTypes.array,
  dispatchUploadFile: PropTypes.func,
  uploadFile: PropTypes.object,
  dispatchTypeformList: PropTypes.func,
  dispatchTypeformListMore: PropTypes.func,
  dispatchFilterTypeformList: PropTypes.func,
  typeformList: PropTypes.object,
  typeformListLoading: PropTypes.bool,
  dispatchCreateWidget: PropTypes.func,
  createWidgetSuccess: PropTypes.bool,
  dispatchCleanCreateWidget: PropTypes.func,
  uid: PropTypes.string,
  dispatchWidget: PropTypes.func,
  widget: PropTypes.object,
  communityUid: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  communityList: makeSelectCommunityList(),
  displayOptions: makeSelectDisplayOptions(),
  widgetTypes: makeSelectWidgetTypes(),
  socialWallTypes: makeSelectSocialWallTypes(),
  uploadFile: makeSelectUploadFile(),
  typeformList: makeSelectTypeformList(),
  typeformListLoading: makeSelectTypeformListLoading(),
  createWidgetSuccess: makeSelectCreateWidgetSuccess(),
  widget: makeSelectWidget(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCloseCreateWidget: () => dispatch(closeCreateWidget()),
    dispatchCommunityList: options => dispatch(getCommunityList(options)),
    dispatchDisplayOptions: () => dispatch(displayOptionsAction()),
    dispatchWidgetTypes: () => dispatch(widgetTypesAction()),
    dispatchSocialWallTypes: () => dispatch(socialWallTypesAction()),
    dispatchUploadFile: (widgetType, formData) =>
      dispatch(uploadFileAction(widgetType, formData)),
    dispatchTypeformList: options => dispatch(typeformListAction(options)),
    dispatchTypeformListMore: options => dispatch(typeformListMore(options)),
    dispatchFilterTypeformList: options =>
      dispatch(filterTypeformList(options)),
    dispatchCreateWidget: options => dispatch(createWidget(options)),
    dispatchCleanCreateWidget: () => dispatch(cleanCreateWidget()),
    dispatchWidget: options => dispatch(widgetAction(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CreateWidget);

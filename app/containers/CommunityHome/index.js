/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
/**
 *
 * CommunityHome
 *
 */

import React, { useEffect, useState, useRef, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Sticky from 'react-stickynode';
import SwiperCore, { Pagination, Virtual } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import {
  Container,
  Divider,
  Grid,
  Typography,
  TextField,
  Avatar,
} from '@material-ui/core';
import {
  Edit,
  Call,
  StarBorder,
  Star,
  Add,
  Remove,
  FilterList,
  ViewList,
  ViewModule,
} from '@material-ui/icons';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Popover from '@material-ui/core/Popover';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Crown from 'images/comm_crown.png';
import CommunityTab from 'containers/CommunityTab/Loadable';
import { FeedCard } from 'components/FeedP2V8/Wrapper';
import FeedBlocksP2V8 from 'components/FeedBlocksP2V8';
import { editCommunity, editCommunityImage } from 'containers/AuthBase/actions';
import { initials } from 'utils/helpers/avatarInitials';
import { ColorPaper } from 'containers/CreateCarousel/Wrapper';
import {
  makeSelectCommunity,
  makeSelectAuthorList,
  makeSelectCarouselList,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import {
  community as getCommunity,
  like,
  deleteLike,
  follow,
  unfollow,
  getAuthorList,
  carouselList,
} from './actions';
import { Header, CoverBottom } from './Wrapper';
import './pagination.scss';

SwiperCore.use([Pagination, Virtual]);

function LinkTab(props) {
  return <Tab component={Link} {...props} />;
}

const CommunityTabLink = memo(LinkTab);

export function CommunityHome(props) {
  useInjectReducer({ key: 'communityHome', reducer });
  useInjectSaga({ key: 'communityHome', saga });

  const {
    match,
    history,
    dispatchCommunity,
    community,
    dispatchLike,
    dispatchDeleteLike,
    dispatchFollow,
    dispatchUnfollow,
    dispatchGetAuthorList,
    authorList,
    dispatchCarouselList,
    sliderLevel1,
    dispatchEditCommunity,
    dispatchEditCommunityImage,
  } = props;

  useEffect(() => {
    dispatchCommunity({ uid: match.params.uid });
    dispatchGetAuthorList({ communityUid: match.params.uid });
    dispatchCarouselList({ communityUid: match.params.uid });
  }, [match.params.uid]);

  const [activeTab, setActiveTab] = useState('');

  const [communityTab, setCommunityTab] = useState({});

  useEffect(() => {
    setCommunityTab(_.find(community.tabs, { uid: activeTab }));
    setAuthorFilters([]);
    setDateFromFilter(undefined);
    setDateToFilter(undefined);
  }, [community, activeTab]);

  useEffect(() => {
    if (
      match.isExact === true &&
      community.uid === match.params.uid &&
      community.tabs
    ) {
      let homeTab = _.find(community.tabs, { tabType: 'home' });
      if (!homeTab) {
        homeTab = _.head(community.tabs);
      }
      setActiveTab(homeTab.uid);
      history.replace({
        pathname: `${match.url}/${homeTab.uid}/communitytab/${homeTab.tabType}`,
      });
    }
  }, [community, match.isExact]);

  const [viewMode, setViewMode] = useState('grid');

  const changeViewMode = () => {
    if (viewMode === 'grid') {
      setViewMode('list');
    } else {
      setViewMode('grid');
    }
  };

  const CommunityHeaderRef = useRef(null);

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (CommunityHeaderRef.current) {
      setOffset(CommunityHeaderRef.current.clientHeight - 72 - 71);
    }
  }, [CommunityHeaderRef]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [authorFilters, setAuthorFilters] = useState([]);
  const [dateFromFilter, setDateFromFilter] = useState(undefined);
  const [dateToFilter, setDateToFilter] = useState(undefined);
  const [searchQuestion, setSearchQuestion] = useState('');
  const [isAnswered, setIsAnswered] = useState(undefined);

  return (
    <>
      <Sticky top={-offset} innerZ={1099}>
        <Header ref={CommunityHeaderRef}>
          <Swiper
            slidesPerView={1}
            pagination={{ clickable: true }}
            virtual
            watchOverflow
            className="community-swiper-container"
          >
            <SwiperSlide virtualIndex={0}>
              <Header url={community.headerBannerUrl}>
                {community.canEditImage && (
                  <Fab
                    size="small"
                    style={{ position: 'absolute', left: 10, top: 10 }}
                    onClick={() => dispatchEditCommunityImage(community.uid)}
                  >
                    <Edit />
                  </Fab>
                )}
                <Container fixed>
                  <Typography
                    variant="h4"
                    style={{
                      color: '#fff',
                      position: 'absolute',
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  >
                    {community.description}
                  </Typography>
                </Container>
                <CoverBottom>
                  <Container
                    fixed
                    style={{ paddingTop: 10, paddingBottom: 10 }}
                  >
                    <Grid container spacing={1} alignItems="center">
                      <Grid item xs>
                        <Typography variant="h4">{community.label}</Typography>
                      </Grid>
                      <Grid item>
                        <Fab size="small">
                          <Call />
                        </Fab>
                      </Grid>
                      <Grid item>
                        {community.isLikedCommunity ? (
                          <Fab
                            size="small"
                            onClick={() =>
                              dispatchDeleteLike({
                                communityUid: community.uid,
                              })
                            }
                          >
                            <Star />
                          </Fab>
                        ) : (
                          <Fab
                            size="small"
                            onClick={() =>
                              dispatchLike({ communityUid: community.uid })
                            }
                          >
                            <StarBorder />
                          </Fab>
                        )}
                      </Grid>
                      {community.statusOfCurrentUser === 'CommunityManager' ? (
                        <Grid item>
                          <img
                            style={{ display: 'block' }}
                            src={Crown}
                            alt="Crown"
                            width={40}
                            height={40}
                          />
                        </Grid>
                      ) : (
                        <Grid item>
                          {community.statusOfCurrentUser === 'NotFollower' ? (
                            <Fab
                              size="small"
                              onClick={() =>
                                dispatchFollow({
                                  action: 'follow',
                                  uid: community.uid,
                                })
                              }
                            >
                              <Add />
                            </Fab>
                          ) : (
                            <Fab
                              size="small"
                              onClick={() =>
                                dispatchUnfollow({
                                  action: 'unfollow',
                                  uid: community.uid,
                                })
                              }
                            >
                              <Remove />
                            </Fab>
                          )}
                        </Grid>
                      )}
                      <Grid item>
                        <Typography variant="h6" align="center">
                          {community.followerCount || 0}
                        </Typography>
                        Follower
                      </Grid>
                      <Divider
                        flexItem
                        orientation="vertical"
                        style={{
                          backgroundColor: '#fff',
                          marginLeft: 8,
                          marginRight: 8,
                        }}
                      />
                      <Grid item>
                        <Typography variant="h6" align="center">
                          {community.contributorCount || 0}
                        </Typography>
                        Contributor
                      </Grid>
                    </Grid>
                  </Container>
                </CoverBottom>
              </Header>
            </SwiperSlide>
            {_.map(sliderLevel1, (slide, index) => (
              <SwiperSlide virtualIndex={index + 1} key={index}>
                <Header url={slide.imageLevel1.sliderUrl}>
                  {slide.displayTitle && (
                    <ColorPaper
                      elevation={1}
                      background={
                        slide.displayBackgroundColor
                          ? slide.backgroundColor
                          : '#fff'
                      }
                      title={
                        slide.displayBackgroundColor
                          ? slide.titleColor
                          : 'unset'
                      }
                      style={{
                        width: '90%',
                        padding: 20,
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <Typography variant="h5" align="left" noWrap gutterBottom>
                        {slide.title}
                      </Typography>
                      <Typography variant="body1" align="left" noWrap>
                        {slide.subTitle}
                      </Typography>
                    </ColorPaper>
                  )}
                </Header>
              </SwiperSlide>
            ))}
          </Swiper>
        </Header>
        <Paper square>
          <Container fixed>
            <Grid container alignItems="center">
              {community.canEdit && (
                <Grid item>
                  <IconButton
                    onClick={() => dispatchEditCommunity(community.uid)}
                  >
                    <Edit />
                  </IconButton>
                </Grid>
              )}
              <Grid item xs={10}>
                <Tabs
                  variant="scrollable"
                  scrollButtons="auto"
                  value={activeTab}
                  onChange={(e, val) => setActiveTab(val)}
                >
                  {activeTab &&
                    _.map(community.tabs, tab => (
                      <CommunityTabLink
                        key={tab.uid}
                        to={`${match.url}/${tab.uid}/communitytab/${
                          tab.tabType
                        }`}
                        label={tab.tabName}
                        value={tab.uid}
                      />
                    ))}
                </Tabs>
              </Grid>
              {communityTab &&
                (communityTab.tabType === 'home' ||
                  communityTab.tabType === 'collection' ||
                  communityTab.tabType === 'quickpost' ||
                  communityTab.tabType === 'article' ||
                  communityTab.tabType === 'search' ||
                  communityTab.tabType === 'document' ||
                  communityTab.tabType === 'imagegallery' ||
                  communityTab.tabType === 'media' ||
                  communityTab.tabType === 'joboffer' ||
                  communityTab.tabType === 'event') && (
                  <>
                    <Grid item>
                      <IconButton onClick={e => setAnchorEl(e.currentTarget)}>
                        <FilterList />
                      </IconButton>
                      <IconButton onClick={changeViewMode}>
                        {viewMode === 'grid' ? (
                          <ViewList fontSize="small" />
                        ) : (
                          <ViewModule fontSize="small" />
                        )}
                      </IconButton>
                    </Grid>
                    <Popover
                      open={Boolean(anchorEl)}
                      anchorEl={anchorEl}
                      onClose={() => setAnchorEl(null)}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                    >
                      <div style={{ padding: 8 }}>
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              inputVariant="outlined"
                              format="MMM dd, yyyy"
                              value={dateFromFilter || null}
                              onChange={date => setDateFromFilter(date)}
                              autoOk
                              disableFuture
                              fullWidth
                              placeholder="From"
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              inputVariant="outlined"
                              format="MMM dd, yyyy"
                              value={dateToFilter || null}
                              onChange={date => setDateToFilter(date)}
                              autoOk
                              disableFuture
                              fullWidth
                              placeholder="To"
                            />
                          </Grid>
                          <Grid item xs={4}>
                            <Autocomplete
                              disableCloseOnSelect
                              multiple
                              onChange={(event, newValue) =>
                                setAuthorFilters(
                                  _.map(newValue, ({ uid }) => uid),
                                )
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
                                      {initials([
                                        option.firstName,
                                        option.lastName,
                                      ])}
                                    </Avatar>
                                  )}
                                  {`${option.firstName} ${option.lastName}`}
                                </>
                              )}
                              renderTags={() => null}
                              renderInput={inputProps => (
                                <TextField
                                  placeholder="Select Author"
                                  variant="outlined"
                                  {...inputProps}
                                />
                              )}
                            />
                          </Grid>
                        </Grid>
                      </div>
                    </Popover>
                  </>
                )}
            </Grid>
          </Container>
        </Paper>
      </Sticky>
      <Container fixed style={{ paddingTop: 20, paddingBottom: 20 }}>
        <Grid container spacing={3}>
          {communityTab && communityTab.descriptionBlocks && (
            <Grid item xs={12}>
              <FeedCard>
                <Grid container spacing={2}>
                  {_.map(communityTab.descriptionBlocks, (block, index) => (
                    <Grid item xs={12} key={index}>
                      <FeedBlocksP2V8 block={block} />
                    </Grid>
                  ))}
                </Grid>
              </FeedCard>
            </Grid>
          )}
          {communityTab && communityTab.tabType === 'faq' && (
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={searchQuestion}
                    onChange={e => setSearchQuestion(e.target.value)}
                    placeholder="Search Question"
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    fullWidth
                    variant={
                      isAnswered !== undefined && isAnswered === false
                        ? 'contained'
                        : 'outlined'
                    }
                    onClick={() =>
                      setIsAnswered(
                        isAnswered === undefined
                          ? false
                          : isAnswered === false
                          ? undefined
                          : !isAnswered,
                      )
                    }
                  >
                    Sans réponse
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    fullWidth
                    variant={
                      isAnswered !== undefined && isAnswered
                        ? 'contained'
                        : 'outlined'
                    }
                    onClick={() =>
                      setIsAnswered(
                        isAnswered === undefined
                          ? true
                          : isAnswered === true
                          ? undefined
                          : !isAnswered,
                      )
                    }
                  >
                    Répondu
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          )}
          <Grid item xs={12}>
            <Route
              exact
              path={`${match.path}/:tab/:track/:referer`}
              render={routeProps => (
                <CommunityTab
                  {...routeProps}
                  authorFilters={authorFilters}
                  dateFromFilter={
                    dateFromFilter &&
                    moment(dateFromFilter).format('DD/MM/YYYY')
                  }
                  dateToFilter={
                    dateToFilter && moment(dateToFilter).format('DD/MM/YYYY')
                  }
                  searchQuestion={searchQuestion}
                  isAnswered={isAnswered}
                  setActiveTab={setActiveTab}
                />
              )}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

CommunityHome.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  dispatchCommunity: PropTypes.func,
  community: PropTypes.object,
  dispatchLike: PropTypes.func,
  dispatchDeleteLike: PropTypes.func,
  dispatchFollow: PropTypes.func,
  dispatchUnfollow: PropTypes.func,
  dispatchGetAuthorList: PropTypes.func,
  authorList: PropTypes.array,
  dispatchCarouselList: PropTypes.func,
  sliderLevel1: PropTypes.array,
  dispatchEditCommunity: PropTypes.func,
  dispatchEditCommunityImage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  community: makeSelectCommunity(),
  authorList: makeSelectAuthorList(),
  sliderLevel1: makeSelectCarouselList('sliderLevel1'),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCommunity: options => dispatch(getCommunity(options)),
    dispatchLike: options => dispatch(like(options)),
    dispatchDeleteLike: options => dispatch(deleteLike(options)),
    dispatchFollow: options => dispatch(follow(options)),
    dispatchUnfollow: options => dispatch(unfollow(options)),
    dispatchGetAuthorList: options => dispatch(getAuthorList(options)),
    dispatchCarouselList: options => dispatch(carouselList(options)),
    dispatchEditCommunity: options => dispatch(editCommunity(options)),
    dispatchEditCommunityImage: options =>
      dispatch(editCommunityImage(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CommunityHome);

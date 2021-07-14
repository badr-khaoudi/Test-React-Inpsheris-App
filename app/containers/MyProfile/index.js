/**
 *
 * MyProfile
 *
 */

import React, { memo, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Sticky from 'react-stickynode';
import {
  Container,
  Grid,
  Typography,
  Avatar,
  TextField,
  ListItemText,
  FormGroup,
  FormControlLabel,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import {
  SyncAlt,
  Call,
  Edit,
  FilterList,
  ViewList,
  ViewModule,
  PersonAdd,
  Message,
  ArrowDropDown,
} from '@material-ui/icons';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker } from '@material-ui/pickers';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'containers/HomeFeed/navigation.scss';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { initials } from 'utils/helpers/avatarInitials';
import { useEffectAfterMount } from 'utils/helpers/useEffectAfterMount';
import { Header, CoverBottom } from 'containers/CommunityHome/Wrapper';
import {
  makeSelectCurrentUser,
  makeSelectLivelyCall,
  makeSelectLivelyTransfer,
  makeSelectLivelyTransferButtonName,
  makeSelectFollowingUser,
  makeSelectProfileProject,
  makeSelectProfileExperience,
  makeSelectPinnedPostOfUser,
  makeSelectPrivateMessageConfig,
  makeSelectModerationWorkflowLevel,
} from 'containers/AuthBase/selectors';
import { openDirectoryPrivateMessage } from 'containers/AuthBase/actions';
import Activities from 'containers/Activities/Loadable';
import About from 'containers/About/Loadable';
import MyDraft from 'containers/MyDraft/Loadable';
import MyPublish from 'containers/MyPublish/Loadable';
import MyBoard from 'containers/MyBoard/Loadable';
import { makeSelectUser } from 'containers/GlobalEntities/selectors';
import EditMyProfile from 'containers/EditMyProfile/Loadable';
import { makeSelectAuthorList, makeSelectCommunityList } from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  user as userAction,
  authorList as authorListAction,
  communityList as communityListAction,
  follow,
} from './actions';
// import messages from './messages';

const statusTypes = [
  'Archived',
  'Draft',
  'publish',
  'Publication scheduled',
  'Pending For Validation',
];

const useStyles = makeStyles(() => ({
  wrapper: {
    flexDirection: 'row-reverse',
  },
  labelIcon: {
    minHeight: 'unset',
  },
}));

const draftFilters = [
  { value: 'myDrafts', label: 'My Drafts' },
  {
    value: 'draftsOfOtherUsers',
    label: 'Drafts Of Users (who are in the community where I am the CM)',
  },
];

export function MyProfile(props) {
  useInjectReducer({ key: 'myProfile', reducer });
  useInjectSaga({ key: 'myProfile', saga });

  const classes = useStyles();

  const {
    dispatchUser,
    // user,
    match,
    history,
    dispatchAuthorList,
    dispatchCommunityList,
    authorList,
    communityList,
    dispatchFollow,
    currentUser,
    livelyCall,
    livelyTransfer,
    livelyTransferButtonName,
    followingUser,
    profileProject,
    profileExperience,
    pinnedPostOfUser,
    privateMessageConfig,
    moderationWorkflowLevel,
    dispatchOpenDirectoryPrivateMessage,
  } = props;

  const user = useSelector(makeSelectUser(match.params.uid));

  useEffect(() => {
    dispatchUser({ uid: match.params.uid });
    dispatchAuthorList({ authorUid: match.params.uid, isProfile: true });
    dispatchCommunityList({
      filter: 'lively',
      format: 'list',
      gplusCommunity: 'ALL',
    });
  }, [match.params.uid]);

  const headerRef = useRef(null);

  const [offset, setOffset] = useState(0);
  const [activeTab, setActiveTab] = useState(_.toLower(match.params.tab));
  const [anchorEl, setAnchorEl] = useState(null);
  const [statusFilters, setStatusFilters] = useState([]);
  const [communityFilters, setCommunityFilters] = useState([]);
  const [authorFilters, setAuthorFilters] = useState([]);
  const [dateFromFilter, setDateFromFilter] = useState(undefined);
  const [dateToFilter, setDateToFilter] = useState(undefined);
  const [viewMode, setViewMode] = useState('grid');
  const [editMyProfileOpen, setEditMyProfileOpen] = useState(false);
  const [darftFilter, setDarftFilter] = useState('allDrafts');
  const [draftAnchorEl, setDraftAnchorEl] = useState(null);

  const changeViewMode = () => {
    if (viewMode === 'grid') {
      setViewMode('list');
    } else {
      setViewMode('grid');
    }
  };

  useEffectAfterMount(() => {
    history.push(`/myprofile/${match.params.uid}/${activeTab}`);
  }, [activeTab]);

  useEffect(() => {
    if (headerRef.current) {
      setOffset(headerRef.current.clientHeight - 72 - 71);
    }
  }, [headerRef]);

  // eslint-disable-next-line consistent-return
  const handleMyDrafts = e => {
    const [otherFilter] = _.filter(
      draftFilters,
      filter => filter.value !== e.target.value,
    );
    if (e.target.checked) {
      if (darftFilter === otherFilter.value) {
        return setDarftFilter('allDrafts');
      }
      return setDarftFilter(e.target.value);
    }
    if (darftFilter === 'allDrafts') {
      return setDarftFilter(otherFilter.value);
    }
    if (darftFilter === e.target.value) {
      return setDarftFilter('allDrafts');
    }
  };

  return (
    <>
      <Helmet>
        <title>MyProfile</title>
        <meta name="description" content="Description of MyProfile" />
      </Helmet>
      <Sticky top={-offset} innerZ={1099}>
        <Header ref={headerRef} url={user.headerBannerUrl}>
          <CoverBottom>
            <Container
              fixed
              style={{
                paddingTop: 15,
                paddingBottom: 15,
              }}
            >
              <div style={{ marginLeft: 200, position: 'relative' }}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs>
                    <Typography variant="h4">{user.displayName}</Typography>
                  </Grid>
                  {livelyTransfer.value && (
                    <Grid item>
                      <Button
                        style={{
                          color: '#ffffff',
                          borderColor: '#ffffff',
                          borderRadius: 25,
                        }}
                        startIcon={<SyncAlt />}
                        variant="outlined"
                        disableElevation
                      >
                        {livelyTransferButtonName.value}
                      </Button>
                    </Grid>
                  )}
                  {livelyCall.value && (
                    <Grid item>
                      <Button
                        style={{
                          color: '#ffffff',
                          borderColor: '#ffffff',
                          borderRadius: 25,
                        }}
                        startIcon={<Call />}
                        variant="outlined"
                        disableElevation
                      >
                        Lively Call
                      </Button>
                    </Grid>
                  )}
                  {currentUser.uid !== match.params.uid && followingUser.value && (
                    <Grid item>
                      <Fab
                        size="small"
                        onClick={() => {
                          dispatchFollow({
                            action: user.followed ? 'unfollow' : 'follow',
                            personUid: match.params.uid,
                          });
                        }}
                      >
                        <PersonAdd fontSize="small" />
                      </Fab>
                    </Grid>
                  )}
                  {currentUser.uid !== match.params.uid && (
                    <Grid item>
                      <Fab
                        size="small"
                        onClick={() => {
                          dispatchOpenDirectoryPrivateMessage({
                            uid: user.uid,
                            displayName: user.displayName,
                          });
                        }}
                      >
                        <Message fontSize="small" />
                      </Fab>
                    </Grid>
                  )}
                </Grid>
                <div
                  style={{
                    position: 'absolute',
                    left: -150,
                    top: 10,
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    {(currentUser.role === 'GlobalCommunityManager' ||
                      currentUser.uid === match.params.uid) && (
                      <ButtonBase
                        style={{
                          position: 'absolute',
                          right: -10,
                          top: -10,
                          width: 25,
                          height: 25,
                          borderRadius: '50%',
                          fontSize: 16,
                          backgroundColor: '#e0e0e0',
                        }}
                        onClick={() => setEditMyProfileOpen(true)}
                      >
                        <Edit fontSize="inherit" color="primary" />
                      </ButtonBase>
                    )}
                    <Avatar
                      src={user.headerLogoUrl}
                      style={{
                        width: 95,
                        height: 95,
                        border: '5px solid #dddddd',
                      }}
                    >
                      {initials(user.displayName)}
                    </Avatar>
                  </div>
                </div>
              </div>
            </Container>
          </CoverBottom>
        </Header>
        <Paper square>
          <Container fixed>
            <div style={{ marginLeft: 200 }}>
              <Grid container alignItems="center">
                <Grid item xs={10}>
                  <Tabs
                    variant="scrollable"
                    scrollButtons="auto"
                    value={activeTab}
                    onChange={(e, val) => setActiveTab(val)}
                  >
                    <Tab label="Activities" value="activities" />
                    {privateMessageConfig.value && (
                      <Tab label="Private Messages" value="privatemessage" />
                    )}
                    <Tab label="About" value="about" />
                    {(profileProject.value ||
                      profileExperience.value ||
                      pinnedPostOfUser.value) && (
                      <Tab label="My Board" value="myboard" />
                    )}
                    {(currentUser.uid === match.params.uid ||
                      (moderationWorkflowLevel.value > 0 &&
                        (currentUser.role === 'GlobalCommunityManager' ||
                          (currentUser.memberUids &&
                            _.includes(
                              currentUser.memberUids,
                              match.params.uid,
                            ))))) && [
                      <Tab
                        label="My Draft"
                        value="draft"
                        key="draft"
                        classes={{
                          wrapper: classes.wrapper,
                          labelIcon: classes.labelIcon,
                        }}
                        icon={
                          activeTab === 'draft' && currentUser.manager ? (
                            <ArrowDropDown
                              fontSize="small"
                              onClick={e => {
                                e.stopPropagation();
                                setDraftAnchorEl(e.currentTarget);
                              }}
                              style={{ margin: 0, marginLeft: 6 }}
                            />
                          ) : null
                        }
                      />,
                      <Tab label="My Publish" value="publish" key="publish" />,
                    ]}
                  </Tabs>
                </Grid>
                {(activeTab === 'activities' ||
                  activeTab === 'privatemessage' ||
                  activeTab === 'draft' ||
                  activeTab === 'publish') && (
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
                      disableEnforceFocus
                    >
                      <div style={{ width: '90vw', padding: 8 }}>
                        <Grid container spacing={2}>
                          <Grid item xs>
                            <TextField
                              variant="outlined"
                              fullWidth
                              placeholder="Select Status"
                              select
                              SelectProps={{
                                multiple: true,
                                renderValue: selected => selected.join(', '),
                                value: statusFilters,
                                onChange: e => setStatusFilters(e.target.value),
                              }}
                            >
                              {_.map(statusTypes, status => (
                                <MenuItem key={status} value={status} dense>
                                  <Checkbox
                                    checked={
                                      _.indexOf(statusFilters, status) > -1
                                    }
                                    color="primary"
                                  />
                                  <ListItemText primary={status} />
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid>
                          <Grid item xs>
                            <Autocomplete
                              disableCloseOnSelect
                              multiple
                              onChange={(event, newValue) =>
                                setCommunityFilters(
                                  _.map(newValue, ({ uid }) => uid),
                                )
                              }
                              options={communityList}
                              getOptionLabel={option => option.label}
                              renderOption={(option, { selected }) => (
                                <>
                                  <Checkbox checked={selected} />
                                  {option.label}
                                </>
                              )}
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
                          <Grid item xs>
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
                          <Grid item xs>
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
                          <Grid item xs>
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
            </div>
          </Container>
        </Paper>
      </Sticky>
      <Container fixed style={{ paddingTop: 20, paddingBottom: 20 }}>
        {activeTab === 'activities' && (
          <Activities
            author={match.params.uid}
            activityFilter="myActivities"
            statusFilters={statusFilters}
            communityFilters={communityFilters}
            authorFilters={authorFilters}
            dateFromFilter={dateFromFilter}
            dateToFilter={dateToFilter}
            viewMode={viewMode}
          />
        )}
        {activeTab === 'privatemessage' && (
          <Activities
            author={match.params.uid}
            activityFilter="privateMessage"
            statusFilters={statusFilters}
            communityFilters={communityFilters}
            authorFilters={authorFilters}
            dateFromFilter={dateFromFilter}
            dateToFilter={dateToFilter}
            viewMode={viewMode}
          />
        )}
        {activeTab === 'about' && <About userUid={match.params.uid} />}
        {activeTab === 'myboard' && <MyBoard userUid={match.params.uid} />}
        {activeTab === 'draft' && (
          <MyDraft
            author={match.params.uid}
            statusFilters={statusFilters}
            communityFilters={communityFilters}
            authorFilters={authorFilters}
            dateFromFilter={dateFromFilter}
            dateToFilter={dateToFilter}
            viewMode={viewMode}
            darftFilter={darftFilter}
          />
        )}
        {activeTab === 'publish' && (
          <MyPublish
            author={match.params.uid}
            statusFilters={statusFilters}
            communityFilters={communityFilters}
            authorFilters={authorFilters}
            dateFromFilter={dateFromFilter}
            dateToFilter={dateToFilter}
            viewMode={viewMode}
          />
        )}
      </Container>
      {editMyProfileOpen && (
        <EditMyProfile
          open={editMyProfileOpen}
          handleClose={() => setEditMyProfileOpen(false)}
          user={user}
        />
      )}
      <Popover
        open={Boolean(draftAnchorEl)}
        anchorEl={draftAnchorEl}
        onClose={() => setDraftAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <FormGroup style={{ padding: 12 }}>
          {_.map(draftFilters, filter => (
            <FormControlLabel
              key={filter.value}
              control={
                <Checkbox
                  value={filter.value}
                  checked={
                    darftFilter === 'allDrafts' || darftFilter === filter.value
                  }
                  onChange={handleMyDrafts}
                  color="primary"
                />
              }
              label={filter.label}
            />
          ))}
        </FormGroup>
      </Popover>
    </>
  );
}

MyProfile.propTypes = {
  dispatchUser: PropTypes.func,
  // user: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  dispatchAuthorList: PropTypes.func,
  dispatchCommunityList: PropTypes.func,
  authorList: PropTypes.array,
  communityList: PropTypes.array,
  dispatchFollow: PropTypes.func,
  currentUser: PropTypes.object,
  livelyCall: PropTypes.object,
  livelyTransfer: PropTypes.object,
  livelyTransferButtonName: PropTypes.object,
  followingUser: PropTypes.object,
  profileProject: PropTypes.object,
  profileExperience: PropTypes.object,
  pinnedPostOfUser: PropTypes.object,
  privateMessageConfig: PropTypes.object,
  moderationWorkflowLevel: PropTypes.object,
  dispatchOpenDirectoryPrivateMessage: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // user: makeSelectUser(),
  authorList: makeSelectAuthorList(),
  communityList: makeSelectCommunityList(),
  currentUser: makeSelectCurrentUser(),
  livelyCall: makeSelectLivelyCall(),
  livelyTransfer: makeSelectLivelyTransfer(),
  livelyTransferButtonName: makeSelectLivelyTransferButtonName(),
  followingUser: makeSelectFollowingUser(),
  profileProject: makeSelectProfileProject(),
  profileExperience: makeSelectProfileExperience(),
  pinnedPostOfUser: makeSelectPinnedPostOfUser(),
  privateMessageConfig: makeSelectPrivateMessageConfig(),
  moderationWorkflowLevel: makeSelectModerationWorkflowLevel(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchUser: options => dispatch(userAction(options)),
    dispatchAuthorList: options => dispatch(authorListAction(options)),
    dispatchCommunityList: options => dispatch(communityListAction(options)),
    dispatchFollow: options => dispatch(follow(options)),
    dispatchOpenDirectoryPrivateMessage: options =>
      dispatch(openDirectoryPrivateMessage(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(MyProfile);

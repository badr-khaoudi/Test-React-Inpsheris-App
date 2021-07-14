/* eslint-disable indent */
/**
 *
 * LivelyHeader
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Textfit } from 'react-textfit';
import moment from 'moment';
import { Link, useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Container from '@material-ui/core/Container';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import ButtonBase from '@material-ui/core/ButtonBase';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import {
  createQuickPost,
  contentCreation,
  openStatistics,
  openDigest,
  openCarouselManager,
  openWidgetManager,
  createCommunity,
  openDocumentBar,
} from 'containers/AuthBase/actions';
import ErrorBoundary from 'components/ErrorBoundary';
import NotificationList from 'components/NotificationList';
import Notification from 'components/LivelyDropdownMenu/Notification';

import { makeSelectNotificationCount } from 'containers/NotificationSupplier/selectors';

import {
  makeSelectLanguage,
  makeSelectCommunityListPageDesign,
  makeSelectMicrosoftIntegration,
  makeSelectDocumentBar,
  makeSelectLanguageTranslationControl,
  makeSelectAllowChangePassword,
  makeSelectQuickSharingOfLinkLikeQuickpost,
  makeSelectAlertModule,
  makeSelectNoteTheService,
  makeSelectCurrentUser,
} from 'containers/AuthBase/selectors';

import { changeLocale } from 'containers/LanguageProvider/actions';

import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import { getNotificationList } from 'containers/NotificationSupplier/actions';

import logo from 'images/logo.png';
import { ReactComponent as BellIcon } from 'images/svg/bell.svg';
import { ReactComponent as CogIcon } from 'images/svg/cog.svg';
import { ReactComponent as HomeIcon } from 'images/svg/home.svg';
import { ReactComponent as LinkIcon } from 'images/svg/link.svg';
import { ReactComponent as PlusIcon } from 'images/svg/plus.svg';
import { ReactComponent as FolderIcon } from 'images/svg/folder.svg';
import { ReactComponent as SearchIcon } from 'images/svg/search.svg';
import { ReactComponent as LanguageIcon } from 'images/svg/language.svg';
import { ReactComponent as DashboardIcon } from 'images/svg/dashboard.svg';
import { ReactComponent as DirectoryIcon } from 'images/svg/directory.svg';
import { ReactComponent as HamburgerIcon } from 'images/svg/hamburger.svg';
import { ReactComponent as CommunityIcon } from 'images/svg/communities.svg';

import UsefulLinksPage from 'containers/UsefulLinksPage';
import ApplicationLinksPage from 'containers/ApplicationLinksPage';
import {
  LivelyAppBar,
  LivelyHeaderLogo,
  LivelyHamburgerIconContainer,
  LivelyDropLink,
  LivelyRightMenuItem,
  LivelyNavLink,
  LivelyAvatarContainer,
} from './wrapper';
import LivelyDropdownMenu from '../LivelyDropdownMenu';
import messages from './messages';
import LivelyDrawer from './drawer';

function LivelyHeader({
  user,
  language,
  dispatch,
  notificationCount,
  communityListPageDesign,
  microsoftIntegration,
  documentBar,
  languageTranslationControl,
  allowChangePassword,
  quickSharingOfLinkLikeQuickpost,
  alertModule,
  noteTheService,
  selectedLanguage,
}) {
  const location = useLocation();
  const [languageEl, setLanguageEl] = React.useState(false);
  const [profileEl, setProfileEl] = React.useState(false);
  const [notificationEl, setNotificationEl] = React.useState(false);
  const [usefulLinksEl, setUsefulLinksEl] = React.useState(false);
  const [leftUsefulLinksEl, setLeftUsefulLinksEl] = React.useState(false);
  const [applicationLinksEl, setApplicationLinksEl] = React.useState(false);
  const [settingsEl, setSettingsEl] = React.useState(false);
  const [contentCreationEl, setContentCreationEl] = React.useState(false);
  const shouldChangeFontSize = useMediaQuery('(max-width:1096px)');
  const shouldHideLeftAndRightMenu = useMediaQuery('(max-width:1000px)');

  const [mobileNavActive, setMobileNavActive] = React.useState(false);

  const variantClassName = shouldChangeFontSize && 'variant-small';

  const headerRef = React.useRef(null);

  const handleLanguageClick = e => {
    setLanguageEl(e.currentTarget);
  };
  const handleProfileClick = e => {
    setProfileEl(e.currentTarget);
  };
  const handleNotificationClick = e => {
    dispatch(getNotificationList());
    setNotificationEl(e.currentTarget);
  };
  const handleUsefulLinksClick = () => {
    setUsefulLinksEl(headerRef.current);
  };
  const handleLeftUsefulLinksClick = e => {
    setLeftUsefulLinksEl(e.currentTarget);
  };
  const handleApplicationLinksClick = () => {
    setApplicationLinksEl(headerRef.current);
  };
  const handleSettingsClick = e => {
    setSettingsEl(e.currentTarget);
  };
  const handleContentCreationClick = e => {
    setContentCreationEl(e.currentTarget);
  };
  const handleLanguageClose = () => {
    setLanguageEl(null);
  };
  const handleProfileClose = () => {
    setProfileEl(null);
  };
  const handleNotificationClose = () => {
    setNotificationEl(null);
  };
  const handleUsefulLinksClose = () => {
    setUsefulLinksEl(null);
  };
  const handleApplicationLinksClose = () => {
    setApplicationLinksEl(null);
  };
  const handleSettingsClose = () => {
    setSettingsEl(null);
  };
  const handleContentCreationClose = () => {
    setContentCreationEl(null);
  };

  const handleLocaleChange = e => {
    const { locale } = e.currentTarget.dataset;
    dispatch(changeLocale(locale));
    moment.locale(locale);
    handleLanguageClose();
  };

  const handleListKeyDown = event => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setLanguageEl(null);
    }
  };

  const toggleDrawer = () => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setMobileNavActive(!mobileNavActive);
  };

  return (
    <LivelyAppBar
      position="fixed"
      ref={headerRef}
      color="transparent"
      id="lively-header-nav"
    >
      <Container>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify={`${
            shouldHideLeftAndRightMenu ? 'space-between' : 'space-around'
          }`}
        >
          {shouldHideLeftAndRightMenu ? (
            <>
              {/* Lively Mobile Drawer */}

              <LivelyDrawer
                mobileNavActive={mobileNavActive}
                toggleDrawer={toggleDrawer}
              />
              <Grid item>
                <LivelyHamburgerIconContainer onClick={toggleDrawer()}>
                  <HamburgerIcon />
                </LivelyHamburgerIconContainer>
              </Grid>
              <Grid item>
                <LivelyHeaderLogo src={logo} alt="lively software" />
              </Grid>
              <Grid item>
                <LivelyRightMenuItem>
                  <SearchIcon title="search" />
                </LivelyRightMenuItem>
                <LivelyRightMenuItem>
                  <BellIcon title="check notifications" />
                </LivelyRightMenuItem>
              </Grid>
            </>
          ) : (
            <>
              {/* Lively Desktop Navigation */}

              <Grid item sm={8}>
                <Toolbar>
                  <LivelyHeaderLogo src={logo} alt="lively software" />
                  <>
                    <LivelyNavLink
                      exact
                      className={`${variantClassName}`}
                      to="/"
                    >
                      <HomeIcon title="go to home page" />
                      <Textfit mode="single" forceSingleModeWidth={false}>
                        <FormattedMessage {...messages.home} />
                      </Textfit>
                    </LivelyNavLink>
                    {microsoftIntegration.value ? (
                      <LivelyNavLink
                        className={`${variantClassName}`}
                        to="/my-dashboard"
                      >
                        <DashboardIcon title="go to my dashboard page" />
                        <Textfit mode="single" forceSingleModeWidth={false}>
                          <FormattedMessage {...messages.myDashboard} />
                        </Textfit>
                      </LivelyNavLink>
                    ) : (
                      <>
                        <LivelyNavLink
                          onClick={handleLeftUsefulLinksClick}
                          className={`${variantClassName}`}
                          to="/usefullinks"
                        >
                          <LinkIcon title="useful links" />
                          <Textfit mode="single" forceSingleModeWidth={false}>
                            <FormattedMessage {...messages.usefulLinks} />
                          </Textfit>
                        </LivelyNavLink>
                        <LivelyDropdownMenu
                          anchorRef={leftUsefulLinksEl}
                          handleClose={handleUsefulLinksClose}
                        >
                          <MenuList
                            autoFocusItem={Boolean(leftUsefulLinksEl)}
                            id="menu-list-grow"
                            onKeyDown={handleListKeyDown}
                          >
                            {language.map(item => (
                              <MenuItem
                                onClick={handleLocaleChange}
                                key={item.code}
                                data-locale={item.code}
                              >
                                {item.name}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </LivelyDropdownMenu>
                      </>
                    )}

                    <LivelyNavLink
                      className={`${variantClassName}`}
                      to={{
                        pathname: '/communities',
                        state: {
                          background:
                            communityListPageDesign.value === 'Favorite'
                              ? location
                              : undefined,
                        },
                      }}
                    >
                      <CommunityIcon title="go to community page" />
                      <Textfit mode="single" forceSingleModeWidth={false}>
                        <FormattedMessage {...messages.communities} />
                      </Textfit>
                    </LivelyNavLink>
                    <LivelyNavLink
                      className={`${variantClassName}`}
                      to="/search/directory/all/random"
                    >
                      <DirectoryIcon title="go to directory page" />
                      <Textfit mode="single" forceSingleModeWidth={false}>
                        <FormattedMessage {...messages.directory} />
                      </Textfit>
                    </LivelyNavLink>
                  </>
                </Toolbar>
              </Grid>
              <Grid item style={{ display: 'flex', alignItems: 'center' }}>
                <LivelyRightMenuItem
                  className={`${variantClassName}`}
                  size="small"
                  onClick={handleUsefulLinksClick}
                >
                  <LinkIcon />
                </LivelyRightMenuItem>
                <LivelyDropdownMenu
                  anchorRef={usefulLinksEl}
                  handleClose={handleUsefulLinksClose}
                >
                  <UsefulLinksPage noTitle maxHeight />
                </LivelyDropdownMenu>
                <LivelyRightMenuItem
                  className={`${variantClassName}`}
                  size="small"
                  onClick={handleApplicationLinksClick}
                >
                  <LinkIcon />
                </LivelyRightMenuItem>
                <LivelyDropdownMenu
                  anchorRef={applicationLinksEl}
                  handleClose={handleApplicationLinksClose}
                >
                  <ApplicationLinksPage noTitle maxHeight />
                </LivelyDropdownMenu>

                {documentBar.value && (
                  <LivelyRightMenuItem
                    onClick={() => dispatch(openDocumentBar())}
                    className={variantClassName}
                    size="small"
                  >
                    <FolderIcon />
                  </LivelyRightMenuItem>
                )}

                <Link to="/search/general/all">
                  <LivelyRightMenuItem
                    className={variantClassName}
                    size="small"
                  >
                    <SearchIcon />
                  </LivelyRightMenuItem>
                </Link>
                {!user.readOnly && user.contentCreation && (
                  <>
                    <LivelyRightMenuItem
                      data-testid="content-creation-toggle"
                      onClick={handleContentCreationClick}
                      className={variantClassName}
                      aria-controls={
                        Boolean(contentCreationEl) && 'menu-list-grow'
                      }
                      aria-haspopup="true"
                      size="small"
                    >
                      <PlusIcon />
                    </LivelyRightMenuItem>
                    <LivelyDropdownMenu
                      data-testid="content-creation-dropdown"
                      anchorRef={contentCreationEl}
                      handleClose={handleContentCreationClose}
                    >
                      <MenuList
                        autoFocusItem={Boolean(contentCreationEl)}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem
                          onClick={() => {
                            handleContentCreationClose();
                            dispatch(contentCreation());
                          }}
                        >
                          Content creation
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleContentCreationClose();
                            dispatch(createQuickPost('quickpost'));
                          }}
                        >
                          Create quickpost
                        </MenuItem>
                        {quickSharingOfLinkLikeQuickpost.value && (
                          <MenuItem
                            onClick={() => {
                              handleContentCreationClose();
                              dispatch(
                                createQuickPost('quickSharingOfTheLink'),
                              );
                            }}
                          >
                            Share a link
                          </MenuItem>
                        )}
                        {alertModule.value &&
                          user.role === 'GlobalCommunityManager' && (
                            <MenuItem>
                              <LivelyDropLink to="/test">
                                Create an alert
                              </LivelyDropLink>
                            </MenuItem>
                          )}
                        {noteTheService.value &&
                          (user.role === 'GlobalCommunityManager' ||
                            user.communityRoles) && (
                            <MenuItem>
                              <LivelyDropLink to="/test">
                                Create note de service
                              </LivelyDropLink>
                            </MenuItem>
                          )}
                      </MenuList>
                    </LivelyDropdownMenu>
                  </>
                )}
                <LivelyRightMenuItem
                  onClick={handleNotificationClick}
                  aria-controls={Boolean(notificationEl) && 'menu-list-grow'}
                  aria-haspopup="true"
                  className={variantClassName}
                  size="small"
                >
                  <Badge
                    color="secondary"
                    invisible={!(notificationCount.count > 0)}
                    badgeContent={notificationCount.count}
                    max={9}
                  >
                    <BellIcon />
                  </Badge>
                </LivelyRightMenuItem>
                <Notification
                  anchorRef={notificationEl}
                  handleClose={handleNotificationClose}
                >
                  <ErrorBoundary>
                    <NotificationList handleClose={handleNotificationClose} />
                  </ErrorBoundary>
                </Notification>
                {languageTranslationControl.value && (
                  <>
                    <LivelyRightMenuItem
                      onClick={handleLanguageClick}
                      aria-controls={Boolean(languageEl) && 'menu-list-grow'}
                      aria-haspopup="true"
                      className={variantClassName}
                      size="small"
                    >
                      <LanguageIcon />
                    </LivelyRightMenuItem>
                    <LivelyDropdownMenu
                      anchorRef={languageEl}
                      handleClose={handleLanguageClose}
                    >
                      <MenuList
                        autoFocusItem={Boolean(languageEl)}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        {language.map(item => (
                          <MenuItem
                            onClick={handleLocaleChange}
                            key={item.code}
                            data-locale={item.code}
                            selected={selectedLanguage === item.code}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </LivelyDropdownMenu>
                  </>
                )}
                {(user.role === 'GlobalCommunityManager' ||
                  user.userType === 'GlobalCommunityManager') && (
                  <>
                    <LivelyRightMenuItem
                      onClick={handleSettingsClick}
                      className={`${shouldChangeFontSize && 'variant-small'}`}
                      size="small"
                    >
                      <CogIcon />
                    </LivelyRightMenuItem>
                    <LivelyDropdownMenu
                      anchorRef={settingsEl}
                      handleClose={handleSettingsClose}
                    >
                      <MenuList
                        autoFocusItem={Boolean(settingsEl)}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem
                          onClick={() => {
                            handleSettingsClose();
                            dispatch(openWidgetManager());
                          }}
                        >
                          Widget manager
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleSettingsClose();
                            dispatch(openWidgetManager('SocialWall'));
                          }}
                        >
                          Social wall manager
                        </MenuItem>
                        <MenuItem>
                          <LivelyDropLink to="/">
                            Community Group Management
                          </LivelyDropLink>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleSettingsClose();
                            dispatch(createCommunity());
                          }}
                        >
                          Create Community
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleSettingsClose();
                            dispatch(openCarouselManager());
                          }}
                        >
                          Carousel Manager
                        </MenuItem>
                        <MenuItem>
                          <LivelyDropLink to="/">
                            Useful links and footer manager
                          </LivelyDropLink>
                        </MenuItem>
                        <MenuItem>
                          <LivelyDropLink to="/">
                            Footer menu manager
                          </LivelyDropLink>
                        </MenuItem>
                        <MenuItem>
                          <LivelyDropLink to="/">
                            Applications menu manager
                          </LivelyDropLink>
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleSettingsClose();
                            dispatch(openStatistics());
                          }}
                        >
                          Statistics
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            handleSettingsClose();
                            dispatch(openDigest());
                          }}
                        >
                          Digest
                        </MenuItem>
                        <MenuItem>
                          <LivelyDropLink to="/">
                            Template manager
                          </LivelyDropLink>
                        </MenuItem>
                      </MenuList>
                    </LivelyDropdownMenu>
                  </>
                )}
                <LivelyAvatarContainer onClick={handleProfileClick}>
                  <Avatar src={user.thumbLogoUrl} alt={user.displayName}>
                    OP
                  </Avatar>
                  <ButtonBase>
                    <i className="arrow down" />
                  </ButtonBase>
                </LivelyAvatarContainer>
                <LivelyDropdownMenu
                  open={Boolean(profileEl)}
                  anchorRef={profileEl}
                  handleClose={handleProfileClose}
                >
                  <MenuList
                    autoFocusItem={Boolean(profileEl)}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                    onClick={handleProfileClose}
                  >
                    <LivelyDropLink to={`/myprofile/${user.uid}/activities`}>
                      <MenuItem>My Profile</MenuItem>
                    </LivelyDropLink>
                    <MenuItem>My Links</MenuItem>

                    {allowChangePassword.value && (
                      <MenuItem>Change My Password</MenuItem>
                    )}
                    <MenuItem>Logout</MenuItem>
                  </MenuList>
                </LivelyDropdownMenu>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </LivelyAppBar>
  );
}

LivelyHeader.propTypes = {
  language: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  notificationCount: PropTypes.object.isRequired,
  communityListPageDesign: PropTypes.object.isRequired,
  microsoftIntegration: PropTypes.object.isRequired,
  documentBar: PropTypes.object.isRequired,
  languageTranslationControl: PropTypes.object.isRequired,
  allowChangePassword: PropTypes.object.isRequired,
  quickSharingOfLinkLikeQuickpost: PropTypes.object.isRequired,
  alertModule: PropTypes.object.isRequired,
  noteTheService: PropTypes.object.isRequired,
  selectedLanguage: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  language: makeSelectLanguage(),
  user: makeSelectCurrentUser(),
  communityListPageDesign: makeSelectCommunityListPageDesign(),
  microsoftIntegration: makeSelectMicrosoftIntegration(),
  documentBar: makeSelectDocumentBar(),
  languageTranslationControl: makeSelectLanguageTranslationControl(),
  allowChangePassword: makeSelectAllowChangePassword(),
  quickSharingOfLinkLikeQuickpost: makeSelectQuickSharingOfLinkLikeQuickpost(),
  alertModule: makeSelectAlertModule(),
  noteTheService: makeSelectNoteTheService(),
  notificationCount: makeSelectNotificationCount(),
  selectedLanguage: makeSelectLocale(),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LivelyHeader);

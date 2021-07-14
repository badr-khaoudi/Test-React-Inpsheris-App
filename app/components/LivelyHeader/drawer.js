/* eslint-disable indent */
import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

// Import redux vitals
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import {
  makeSelectLanguage,
  makeSelectDocumentBar,
  makeSelectLanguageTranslationControl,
  makeSelectCurrentUser,
} from '../../containers/AuthBase/selectors';

// Import all the icons needed
import { ReactComponent as HomeIcon } from '../../images/svg/home.svg';
import { ReactComponent as LogoutIcon } from '../../images/svg/logout.svg';
import { ReactComponent as DirectoryIcon } from '../../images/svg/directory.svg';
import { ReactComponent as ArrowLeftIcon } from '../../images/svg/arrow-left.svg';
import { ReactComponent as CommunityIcon } from '../../images/svg/communities.svg';
import { ReactComponent as CogIcon } from '../../images/svg/cog.svg';
import { ReactComponent as LinkIcon } from '../../images/svg/link.svg';
import { ReactComponent as FolderIcon } from '../../images/svg/folder.svg';
import { ReactComponent as LanguageIcon } from '../../images/svg/language.svg';
import { ReactComponent as PlusIcon } from '../../images/svg/plus.svg';

import {
  LivelyDrawerTopHeaderBar,
  LivelyBox,
  LivelyMobileNavLink,
  LivelyListItemIcon,
} from './wrapper';

// Drawer menu for small devices
function LivelyDrawer({
  mobileNavActive,
  toggleDrawer,
  // configs,
  documentBar,
  languageTranslationControl,
  user,
}) {
  const {
    thumbLogoUrl,
    displayName,
    readOnly,
    contentCreation,
    role,
    userType,
  } = user;

  return (
    <Drawer anchor="left" open={mobileNavActive} onClose={toggleDrawer()}>
      <LivelyDrawerTopHeaderBar
        p={3}
        role="presentation"
        onClick={toggleDrawer()}
        onKeyDown={toggleDrawer()}
      >
        <Grid container alignItems="center" spacing={1}>
          <Grid item>
            <Avatar
              src={thumbLogoUrl}
              alt={`${displayName} in lively software`}
            />
          </Grid>
          <Grid item>
            <Typography>{`${displayName}`}</Typography>
          </Grid>
          <Grid item>
            <ArrowLeftIcon />
          </Grid>
        </Grid>
      </LivelyDrawerTopHeaderBar>
      <List>
        <ListItem disableGutters>
          <LivelyMobileNavLink exact to="/" onClick={toggleDrawer()}>
            <LivelyBox component="span" paddingLeft={3}>
              <LivelyListItemIcon>
                <HomeIcon title="go to home page" />
              </LivelyListItemIcon>
              <ListItemText primary="Home" />
            </LivelyBox>
          </LivelyMobileNavLink>
        </ListItem>
        <ListItem disableGutters>
          <LivelyMobileNavLink to="/communities" onClick={toggleDrawer()}>
            <LivelyBox component="span" paddingLeft={3}>
              <LivelyListItemIcon>
                <CommunityIcon title="go to community page" />
              </LivelyListItemIcon>
              <ListItemText primary="Communities" />
            </LivelyBox>
          </LivelyMobileNavLink>
        </ListItem>
        <ListItem disableGutters>
          <LivelyMobileNavLink
            to="/search/directory/all/random"
            onClick={toggleDrawer()}
          >
            <LivelyBox component="span" paddingLeft={3}>
              <LivelyListItemIcon>
                <DirectoryIcon title="go to directory page" />
              </LivelyListItemIcon>
              <ListItemText primary="Directory" />
            </LivelyBox>
          </LivelyMobileNavLink>
        </ListItem>
        <ListItem disableGutters>
          <LivelyMobileNavLink to="/useful-links" onClick={toggleDrawer()}>
            <LivelyBox component="span" paddingLeft={3}>
              <LivelyListItemIcon>
                <LinkIcon />
              </LivelyListItemIcon>
              <ListItemText primary="Useful Links" />
            </LivelyBox>
          </LivelyMobileNavLink>
        </ListItem>
        <ListItem disableGutters>
          <LivelyMobileNavLink to="/application-links" onClick={toggleDrawer()}>
            <LivelyBox component="span" paddingLeft={3}>
              <LivelyListItemIcon>
                <LinkIcon />
              </LivelyListItemIcon>
              <ListItemText primary="Application Links" />
            </LivelyBox>
          </LivelyMobileNavLink>
        </ListItem>

        {documentBar.value && (
          <>
            <ListItem disableGutters>
              <LivelyMobileNavLink to="/documents" onClick={toggleDrawer()}>
                <LivelyBox component="span" paddingLeft={3}>
                  <LivelyListItemIcon>
                    <FolderIcon />
                  </LivelyListItemIcon>
                  <ListItemText primary="Documents" />
                </LivelyBox>
              </LivelyMobileNavLink>
            </ListItem>
          </>
        )}
        {!readOnly && contentCreation && (
          <>
            <ListItem disableGutters>
              <LivelyMobileNavLink
                to="/content-creation"
                onClick={toggleDrawer()}
              >
                <LivelyBox component="span" paddingLeft={3}>
                  <LivelyListItemIcon>
                    <PlusIcon />
                  </LivelyListItemIcon>
                  <ListItemText primary="Content Creation" />
                </LivelyBox>
              </LivelyMobileNavLink>
            </ListItem>
          </>
        )}
        {languageTranslationControl && (
          <>
            <ListItem disableGutters>
              <LivelyMobileNavLink to="/language" onClick={toggleDrawer()}>
                <LivelyBox component="span" paddingLeft={3}>
                  <LivelyListItemIcon>
                    <LanguageIcon />
                  </LivelyListItemIcon>
                  <ListItemText primary="Language" />
                </LivelyBox>
              </LivelyMobileNavLink>
            </ListItem>
          </>
        )}

        {(role === 'GlobalCommunityManager' ||
          userType === 'GlobalCommunityManager') && (
          <>
            <ListItem disableGutters>
              <LivelyMobileNavLink to="/settings" onClick={toggleDrawer()}>
                <LivelyBox component="span" paddingLeft={3}>
                  <LivelyListItemIcon>
                    <CogIcon title="go to settings page" />
                  </LivelyListItemIcon>
                  <ListItemText primary="Settings" />
                </LivelyBox>
              </LivelyMobileNavLink>
            </ListItem>
          </>
        )}
        <ListItem disableGutters>
          <LivelyMobileNavLink to="/logout" onClick={toggleDrawer()}>
            <LivelyBox component="span" paddingLeft={3}>
              <LivelyListItemIcon>
                <LogoutIcon title="log out" />
              </LivelyListItemIcon>
              <ListItemText primary="Logout" />
            </LivelyBox>
          </LivelyMobileNavLink>
        </ListItem>
      </List>
    </Drawer>
  );
}

LivelyDrawer.propTypes = {
  mobileNavActive: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  languageTranslationControl: PropTypes.object.isRequired,
  documentBar: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  language: makeSelectLanguage(),
  user: makeSelectCurrentUser(),
  languageTranslationControl: makeSelectLanguageTranslationControl(),
  documentBar: makeSelectDocumentBar(),
});

const mapDispatchToProps = dispatch => ({
  dispatch,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(LivelyDrawer);

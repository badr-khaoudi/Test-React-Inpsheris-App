/* eslint-disable indent */
/**
 *
 * AuthBase
 *
 */

import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useLayoutEffect,
  memo,
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import { ArrowBack } from '@material-ui/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Switch, Route } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import DialogContentText from '@material-ui/core/DialogContentText';
import HomePage from 'containers/HomePage/Loadable';
import Community, { CommunityModal } from 'containers/Community/Loadable';
import UsefulLinksPage from 'containers/UsefulLinksPage/Loadable';
import ApplicationLinksPage from 'containers/ApplicationLinksPage/Loadable';
import ContentCreationPage from 'containers/ContentCreationPage/Loadable';
import DocumentsPage from 'containers/DocumentsPage/Loadable';
import LanguagePage from 'containers/LanguagePage/Loadable';
import SettingsPage from 'containers/SettingsPage/Loadable';
import HomeFeed from 'containers/HomeFeed/Loadable';
import CommunityHome from 'containers/CommunityHome/Loadable';
import FeedModal from 'containers/FeedModal/Loadable';
import WidgetPage from 'containers/WidgetPage/Loadable';
import GlobalEntities from 'containers/GlobalEntities';
import ErrorBoundary from 'components/ErrorBoundary';
import Notifications from 'containers/Notifications/Loadable';
import Directory from 'containers/Directory/Loadable';
import MySearch from 'containers/MySearch/Loadable';
import MyProfile from 'containers/MyProfile/Loadable';
import DigestList from 'containers/DigestList/Loadable';
import DigestPreview from 'containers/DigestPreview/Loadable';
import Dialogs from 'components/Dialogs';
import Tab from 'containers/Tab/Loadable';
import SplashScreen from 'components/SplashScreen';
import logo from 'images/logo.png';
import LivelyHeader from 'components/LivelyHeader';
import Footer from 'containers/Footer';
import DocumentBarPage from 'components/DocumentBarPage/Loadable';
import GrandArticle from 'containers/GrandArticle/Loadable';
import QuickLinks from 'components/QuickLinks/Loadable';
import ProtectedRoute from './protectedRoute';
import { LivelyContainer } from './wrapper';

import {
  makeSelectSession,
  makeSelectMicrosoftIntegration,
  makeSelectConfigLoading,
  makeSelectConfigError,
  makeSelectCurrentUser,
  makeSelectGetCurrentUserLoading,
  makeSelectGetCurrentUserError,
  makeSelectOpenFeedModal,
  makeSelectDigestModule,
} from './selectors';

import reducer from './reducer';
import saga from './saga';

import {
  getLanguage,
  getConfig,
  getCurrentUser,
  openFeedModal as openFeedModalAction,
  customTemplateList,
} from './actions';
import NotificationSupplier from '../NotificationSupplier';

function FeedModalTab({ match, dispatchOpenFeedModal }) {
  useEffect(() => {
    dispatchOpenFeedModal(match.params.content);
  }, []);

  return null;
}

const renderBody = (
  hasCriticalErrors,
  handleRetry,
  handleReloadPage,
  navbarConfigsLoading,
  currentUserLoading,
  microsoftIntegration,
  shouldRenderMobileSpecificPages,
  location,
  background,
  match,
  dispatchOpenFeedModal,
  digestModule,
) => {
  if (hasCriticalErrors) {
    return (
      <Dialog
        open={hasCriticalErrors}
        disableBackdropClick
        disableEscapeKeyDown
        onClose={handleRetry}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <img src={logo} alt="lively software" />
          <DialogContentText>Something went wrong!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRetry} color="primary">
            Retry
          </Button>
          <Button onClick={handleReloadPage} color="primary" autoFocus>
            Reload Page
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  if (navbarConfigsLoading || currentUserLoading) {
    return <SplashScreen />;
  }
  return (
    <>
      <QuickLinks />
      <LivelyHeader />
      <LivelyContainer>
        <Switch location={background || location}>
          <Route exact path="/communities" component={Community} />
          <ProtectedRoute
            hasAccess={microsoftIntegration.value || false}
            path="/dashboard"
            component={Community}
          />
          <Route exact path="/" component={HomePage} />
          <Route path="/useful-links" component={UsefulLinksPage} />
          <Route path="/application-links" component={ApplicationLinksPage} />
          <Route path="/documents" component={DocumentsPage} />
          <Route path="/content-creation" component={ContentCreationPage} />
          <Route path="/language" component={LanguagePage} />
          <Route path="/settings" component={SettingsPage} />
          <Route exact path="/homefeed" component={HomeFeed} />
          {digestModule.value && (
            <Route exact path="/digest" component={DigestList} />
          )}
          {digestModule.value && (
            <Route exact path="/digest/:id" component={DigestPreview} />
          )}
          <Route exact path="/myprofile/:uid/:tab" component={MyProfile} />
          <Route exact path="/notifications">
            <ErrorBoundary>
              <Notifications />
            </ErrorBoundary>
          </Route>
          <Route
            exact
            path="/search/general/:filter/:scope?//:isInternal?/:isExternal?/:otherFilters?"
            component={MySearch}
          />
          <Route
            exact
            path="/search/general/:filter/:scope?/:searchText?/:isInternal?/:isExternal?/:otherFilters?"
            component={MySearch}
          />
          <Route
            path="/search/directory/:filters/:scope?/:searchText?"
            component={Directory}
          />
          <Route
            exact
            path="/community/:label/:uid/:tab/:content/:track/:referer"
            render={routeProps => (
              <FeedModalTab
                {...routeProps}
                dispatchOpenFeedModal={dispatchOpenFeedModal}
              />
            )}
          />
          <Route
            exact
            path="/community/:label/:uid/:tab/:content/viewdetail"
            render={routeProps => (
              <FeedModalTab
                {...routeProps}
                dispatchOpenFeedModal={dispatchOpenFeedModal}
              />
            )}
          />
          <Route
            exact
            path="/community/:label/:uid/:tab/:content/:track/:referer/:template"
            component={GrandArticle}
          />
          <Route path="/community/:label/:uid" component={CommunityHome} />
          <Route exact path="/widget/:uid/:commuid?" component={WidgetPage} />
          <Route exact path="/my-documents" component={DocumentBarPage} />
        </Switch>
        {background && (
          <Switch>
            <Route
              exact
              path="/community/:label/:uid/:tab/:content/:track/:referer"
              component={FeedModal}
            />
            <Route exact path="/communities" component={CommunityModal} />
          </Switch>
        )}
      </LivelyContainer>
      <Footer />
    </>
  );
};
export function AuthBase({
  dispatchGetLanguage,
  dispatchGetConfig,
  dispatchGetCurrentUser,
  navbarConfigsLoading,
  currentUserLoading,
  currentUserError,
  adminConfigError,
  microsoftIntegration,
  history,
  location,
  match,
  dispatchOpenFeedModal,
  digestModule,
  dispatchCustomTemplateList,
}) {
  const [hasCriticalErrors, setHasCriticalErrors] = useState(false);
  const shouldRenderMobileSpecificPages = useMediaQuery('(max-width:1000px)');

  const background = useMemo(
    () => location.state && location.state.background,
    [location],
  );

  const pathname = useRef(null);

  useLayoutEffect(() => {
    if (!background) {
      if (pathname.current === null) {
        pathname.current = location.pathname;
        return;
      }
      if (pathname.current !== location.pathname) {
        pathname.current = null;
        window.scrollTo(0, 0);
      }
    }
  }, [location]);

  useInjectReducer({ key: 'authBase', reducer });
  useInjectSaga({ key: 'authBase', saga });

  const checkCriticalErrors = () => {
    if (!hasCriticalErrors) {
      if (
        currentUserError.name === 'Error' ||
        adminConfigError.name === 'Error'
      ) {
        setHasCriticalErrors(true);
      }
    }
  };

  const criticalFetches = () => {
    dispatchGetConfig();
    dispatchGetCurrentUser();
  };

  useEffect(() => {
    dispatchGetLanguage();
    dispatchCustomTemplateList();
    criticalFetches();
  }, []);

  useEffect(() => {
    checkCriticalErrors();
  }, [currentUserError, adminConfigError]);

  const handleReloadPage = () => {
    history.go(0);
  };

  const handleRetry = () => {
    setHasCriticalErrors(false);
    criticalFetches();
  };

  if (window.parent !== window.self) {
    return (
      <>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          style={{ marginBottom: 20 }}
          onClick={() => {
            history.goBack();
          }}
        >
          Go Back
        </Button>
        <Switch>
          <Route exact path="/tab" component={Tab} />
        </Switch>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>AuthBase</title>
        <meta name="description" content="Description of AuthBase" />
      </Helmet>
      <NotificationSupplier />
      <GlobalEntities />
      {renderBody(
        hasCriticalErrors,
        handleRetry,
        handleReloadPage,
        navbarConfigsLoading,
        currentUserLoading,
        microsoftIntegration,
        shouldRenderMobileSpecificPages,
        location,
        background,
        match,
        dispatchOpenFeedModal,
        digestModule,
      )}
      <Dialogs />
    </>
  );
}

AuthBase.propTypes = {
  adminConfigError: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.object.isRequired,
  ]),
  navbarConfigsLoading: PropTypes.bool,
  currentUserError: PropTypes.object,
  currentUserLoading: PropTypes.bool,
  microsoftIntegration: PropTypes.object,
  dispatchGetLanguage: PropTypes.func,
  dispatchGetConfig: PropTypes.func,
  dispatchGetCurrentUser: PropTypes.func,
  history: PropTypes.object,
  location: PropTypes.object,
  dispatchOpenFeedModal: PropTypes.func,
  match: PropTypes.object,
  digestModule: PropTypes.object,
  dispatchCustomTemplateList: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  session: makeSelectSession(),
  navbarConfigsLoading: makeSelectConfigLoading(),
  adminConfigError: makeSelectConfigError(),
  currentUser: makeSelectCurrentUser(),
  microsoftIntegration: makeSelectMicrosoftIntegration(),
  currentUserLoading: makeSelectGetCurrentUserLoading(),
  currentUserError: makeSelectGetCurrentUserError(),
  openFeedModal: makeSelectOpenFeedModal(),
  digestModule: makeSelectDigestModule(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatchGetConfig: () => dispatch(getConfig()),
    dispatchGetLanguage: () => dispatch(getLanguage()),
    dispatchGetCurrentUser: () => dispatch(getCurrentUser()),
    dispatchCustomTemplateList: () => dispatch(customTemplateList()),
    dispatchOpenFeedModal: options => dispatch(openFeedModalAction(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AuthBase);

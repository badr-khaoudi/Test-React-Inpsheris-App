/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { EventType } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import Login from 'containers/Login';
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
} from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import { SnackbarProvider } from 'notistack';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import CssBaseline from '@material-ui/core/CssBaseline';
import DateFnsUtils from '@date-io/date-fns';
import { ConfirmProvider } from 'material-ui-confirm';
import AuthBase from 'containers/AuthBase';
import PrivateRoute from 'containers/PrivateRoute';
import { msalInstance } from 'utils/msalInstance';
import MuiTheme from '../../themes';
import GlobalStyle from '../../global-styles';

const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback(event => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const { account } = event.payload;
    msalInstance.setActiveAccount(account);
  }
});

export default function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <MuiThemeProvider theme={MuiTheme}>
        <ThemeProvider theme={MuiTheme}>
          <>
            <CssBaseline />
            <StylesProvider injectFirst>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <SnackbarProvider
                  maxSnack={3}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  preventDuplicate
                >
                  <ConfirmProvider>
                    <Switch>
                      <Route exact path="/login" component={Login} />
                      <PrivateRoute path="/" component={AuthBase} />
                      <Route>
                        <Redirect to="/" />
                      </Route>
                    </Switch>
                  </ConfirmProvider>
                </SnackbarProvider>
              </MuiPickersUtilsProvider>
              <GlobalStyle />
            </StylesProvider>
          </>
        </ThemeProvider>
      </MuiThemeProvider>
    </MsalProvider>
  );
}

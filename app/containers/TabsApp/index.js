/**
 *
 * TabsApp
 *
 */

import React from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import { Switch, Route } from 'react-router-dom';
import AuthBase from 'containers/AuthBase';
import TabConfig from 'components/TabConfig/Loadable';
import GlobalStyle from '../../global-styles';

export default function TabsApp() {
  if (microsoftTeams) {
    microsoftTeams.initialize();
    return (
      <>
        <Switch>
          <Route exact path="/tabconfig" component={TabConfig} />
          <Route path="/" component={AuthBase} />
        </Switch>
        <GlobalStyle />
      </>
    );
  }
  return <h3>Microsoft Teams SDK not found.</h3>;
}

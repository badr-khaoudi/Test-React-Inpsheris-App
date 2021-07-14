/* eslint-disable react/no-unescaped-entities */
/**
 *
 * TabConfig
 *
 */

import React from 'react';
import * as microsoftTeams from '@microsoft/teams-js';
import { Container, Typography } from '@material-ui/core';

function TabConfig() {
  microsoftTeams.settings.setSettings({
    contentUrl: 'https://6544fb8cdbc9.ngrok.io/customtabs#!/tab',
  });
  microsoftTeams.settings.setValidityState(true);
  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Lively Custom Tab
      </Typography>
      <Typography variant="body1">Please click "Save" to continue.</Typography>
    </Container>
  );
}

TabConfig.propTypes = {};

export default TabConfig;

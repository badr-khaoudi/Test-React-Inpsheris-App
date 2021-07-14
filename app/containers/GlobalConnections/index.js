/**
 *
 * GlobalConnections
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  TotalConnections,
  ConnectionsPerDepartment,
  ConnectionPerStatus,
  SessionsByStatus,
} from 'components/GlobalConnectionsComponents/Loadable';
// import {} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

const tabs = [
  { label: 'Total connections', value: 'count-total' },
  { label: 'Connections per department', value: 'count-by-department' },
  { label: 'Connection per status', value: 'count-by-status' },
  { label: 'Sessions by status', value: 'count-by-community-status' },
];

export function GlobalConnections() {
  useInjectReducer({ key: 'globalConnections', reducer });
  useInjectSaga({ key: 'globalConnections', saga });

  const [activeTab, setActiveTab] = useState(_.first(tabs).value);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper square>
          <Tabs
            variant="scrollable"
            scrollButtons="auto"
            value={activeTab}
            onChange={(e, val) => setActiveTab(val)}
          >
            {_.map(tabs, tab => (
              <Tab label={tab.label} key={tab.value} value={tab.value} />
            ))}
          </Tabs>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        {activeTab === 'count-total' && <TotalConnections />}
        {activeTab === 'count-by-department' && <ConnectionsPerDepartment />}
        {activeTab === 'count-by-status' && <ConnectionPerStatus />}
        {activeTab === 'count-by-community-status' && <SessionsByStatus />}
      </Grid>
    </Grid>
  );
}

GlobalConnections.propTypes = {};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(GlobalConnections);

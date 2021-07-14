/**
 *
 * CommunityStatistics
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
  ContentPerCommunities,
  ContentViewedByCommunity,
  ActivityOnACommunity,
} from 'components/CommunityStatisticsComponents/Loadable';
// import makeSelectCommunityStatistics from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

const tabs = [
  {
    label: 'Content per communities',
    value: 'count-content-created-by-community',
  },
  {
    label: 'Content viewed by community',
    value: 'analyze-content-viewed-by-community',
  },
  { label: 'Activity on a community', value: 'view-activity-community' },
];

export function CommunityStatistics() {
  useInjectReducer({ key: 'communityStatistics', reducer });
  useInjectSaga({ key: 'communityStatistics', saga });

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
        {activeTab === 'count-content-created-by-community' && (
          <ContentPerCommunities />
        )}
        {activeTab === 'analyze-content-viewed-by-community' && (
          <ContentViewedByCommunity />
        )}
        {activeTab === 'view-activity-community' && <ActivityOnACommunity />}
      </Grid>
    </Grid>
  );
}

CommunityStatistics.propTypes = {};

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
)(CommunityStatistics);

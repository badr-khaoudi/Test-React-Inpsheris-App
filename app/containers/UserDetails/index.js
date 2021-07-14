/**
 *
 * UserDetails
 *
 */

import React, { memo, useState } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  User,
  UsersNeverConnected,
  AllUsersConnected,
  UsersConnectedLessOrEqualTenTimes,
  LoginByUser,
} from 'components/UserDetailsComponents/Loadable';
// import makeSelectUserDetails from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

const tabs = [
  { label: 'User', value: 'list-user-details-and-actions' },
  { label: 'Users never connected', value: 'list-user-never-connect' },
  { label: 'All users connected', value: 'list-user-connect' },
  {
    label: 'Users connected less or equal 10 times',
    value: 'list-user-connect-less-equal-10-times',
  },
  { label: 'Login by user', value: 'list-user-connection-summary' },
];

export function UserDetails() {
  useInjectReducer({ key: 'userDetails', reducer });
  useInjectSaga({ key: 'userDetails', saga });

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
        {activeTab === 'list-user-details-and-actions' && <User />}
        {activeTab === 'list-user-never-connect' && <UsersNeverConnected />}
        {activeTab === 'list-user-connect' && <AllUsersConnected />}
        {activeTab === 'list-user-connect-less-equal-10-times' && (
          <UsersConnectedLessOrEqualTenTimes />
        )}
        {activeTab === 'list-user-connection-summary' && <LoginByUser />}
      </Grid>
    </Grid>
  );
}

UserDetails.propTypes = {};

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
)(UserDetails);

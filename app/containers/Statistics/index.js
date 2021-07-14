/**
 *
 * Statistics
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Prompt } from 'react-router-dom';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import Highcharts from 'highcharts';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  List,
  ListItemText,
  Typography,
  CircularProgress,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Close, NavigateNext } from '@material-ui/icons';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useCloseEffect } from 'utils/helpers/useCloseEffect';
import { closeStatistics } from 'containers/AuthBase/actions';
import { makeSelectLocale } from 'containers/LanguageProvider/selectors';
import GlobalConnections from 'containers/GlobalConnections/Loadable';
import SessionsByOrigin from 'containers/SessionsByOrigin/Loadable';
import GlobalContent from 'containers/GlobalContent/Loadable';
import CommunityStatistics from 'containers/CommunityStatistics/Loadable';
import UsersNavigation from 'containers/UsersNavigation/Loadable';
import InteractionStatistics from 'containers/InteractionStatistics/Loadable';
import WidgetVideoViewedByUser from 'containers/WidgetVideoViewedByUser/Loadable';
import UserDetails from 'containers/UserDetails/Loadable';
import FlexdeskReport from 'containers/FlexdeskReport/Loadable';
import {
  makeSelectLastUpdatedDate,
  makeSelectJobListLoading,
  makeSelectJobListSuccess,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  lastUpdatedDate as lastUpdatedDateAction,
  exportAll,
  cancelJobList,
} from './actions';
// import messages from './messages';

require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);

const listItems = [
  { value: 'globalConnections', text: 'Global connections' },
  { value: 'sessionsByOrigin', text: 'Sessions by origin' },
  { value: 'globalContent', text: 'Global content' },
  { value: 'community', text: 'Community' },
  { value: 'usersNavigation', text: 'Users navigation' },
  {
    value: 'commentsMentionsLikesShares',
    text: 'Comments, mentions, likes, shares',
  },
  { value: 'userDetails', text: 'User details' },
  { value: 'widgetVideoViewedByUser', text: 'Widget video viewed by user' },
  { value: 'flexdeskReport', text: 'Flexdesk report' },
];

export function Statistics(props) {
  useInjectReducer({ key: 'statistics', reducer });
  useInjectSaga({ key: 'statistics', saga });

  const {
    dispatchCloseStatistics,
    dispatchLastUpdatedDate,
    lastUpdatedDate,
    dispatchExportAll,
    language,
    jobListLoading,
    dispatchCancelJobList,
  } = props;

  const [selectedItem, setSelectedItem] = useState('globalConnections');

  useEffect(() => {
    dispatchLastUpdatedDate();
    return () => dispatchCancelJobList();
  }, []);

  useCloseEffect(dispatchCloseStatistics);

  return (
    <>
      <Helmet>
        <title>Statistics</title>
        <meta name="description" content="Description of Statistics" />
      </Helmet>
      <Dialog
        open
        onClose={dispatchCloseStatistics}
        scroll="body"
        fullWidth
        maxWidth="lg"
        disableEnforceFocus
      >
        <DialogTitle>
          Statistics
          <IconButton
            aria-label="close"
            onClick={dispatchCloseStatistics}
            style={{ position: 'absolute', top: 5, right: 5 }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item style={{ width: 320 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Paper variant="outlined" square style={{ width: '100%' }}>
                    <List>
                      {_.map(listItems, listItem => (
                        <ListItem
                          button
                          key={listItem.value}
                          selected={selectedItem === listItem.value}
                          onClick={() => setSelectedItem(listItem.value)}
                        >
                          <ListItemText primary={listItem.text} />
                          <NavigateNext />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={() =>
                      dispatchExportAll({ language }, 'export_all_reports.xlsx')
                    }
                    variant="outlined"
                    color="primary"
                    fullWidth
                    disabled={jobListLoading}
                  >
                    {jobListLoading ? (
                      <CircularProgress size={25} color="primary" />
                    ) : (
                      'Download All Reports'
                    )}
                  </Button>
                </Grid>
                {lastUpdatedDate && (
                  <Grid item xs={12}>
                    <Typography>
                      <strong>Last updated: </strong>
                      {moment(lastUpdatedDate).format('DD MMM YYYY, HH:mm')}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid
              item
              xs
              style={{
                maxWidth: 'calc(100% - 320px)',
                maxHeight: '80vh',
                overflowY: 'auto',
              }}
            >
              {selectedItem === 'globalConnections' && <GlobalConnections />}
              {selectedItem === 'sessionsByOrigin' && <SessionsByOrigin />}
              {selectedItem === 'globalContent' && <GlobalContent />}
              {selectedItem === 'community' && <CommunityStatistics />}
              {selectedItem === 'usersNavigation' && <UsersNavigation />}
              {selectedItem === 'commentsMentionsLikesShares' && (
                <InteractionStatistics />
              )}
              {selectedItem === 'userDetails' && <UserDetails />}
              {selectedItem === 'widgetVideoViewedByUser' && (
                <WidgetVideoViewedByUser />
              )}
              {selectedItem === 'flexdeskReport' && <FlexdeskReport />}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
      <Prompt when={jobListLoading} message="Are you sure you want to leave?" />
    </>
  );
}

Statistics.propTypes = {
  dispatchCloseStatistics: PropTypes.func,
  dispatchLastUpdatedDate: PropTypes.func,
  lastUpdatedDate: PropTypes.string,
  dispatchExportAll: PropTypes.func,
  language: PropTypes.string,
  jobListLoading: PropTypes.bool,
  dispatchCancelJobList: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  lastUpdatedDate: makeSelectLastUpdatedDate(),
  jobListLoading: makeSelectJobListLoading(),
  jobListSuccess: makeSelectJobListSuccess(),
  language: makeSelectLocale(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchCloseStatistics: () => dispatch(closeStatistics()),
    dispatchLastUpdatedDate: () => dispatch(lastUpdatedDateAction()),
    dispatchExportAll: (options, fileName) =>
      dispatch(exportAll(options, fileName)),
    dispatchCancelJobList: () => dispatch(cancelJobList()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Statistics);

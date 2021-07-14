/**
 *
 * NotificationList
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, Chip, List, Divider } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import _ from 'lodash';
import { useSelector } from 'react-redux';
import NotificationItem from 'components/NotificationItem';
import NotificationItemSkeleton from 'components/NotificationItem/Skeleton';
import {
  makeSelectNotificationListLoading,
  makeSelectNotificationList,
} from 'containers/NotificationSupplier/selectors';
import { Settings } from '@material-ui/icons';

function NotificationList({ handleClose }) {
  const notificationListLoading = useSelector(
    makeSelectNotificationListLoading(),
  );
  const notificationList = useSelector(makeSelectNotificationList());

  const history = useHistory();

  const notViewed = _.reduce(
    notificationList,
    (sum, notification) => {
      if (!notification.viewed) {
        return sum + 1;
      }
      return sum;
    },
    0,
  );

  return (
    <div style={{ width: 400, maxWidth: 400 }}>
      <div style={{ padding: 8 }}>
        <Grid container spacing={2}>
          <Grid item xs style={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="h6"
              display="inline"
              style={{ paddingLeft: 8, paddingRight: 5 }}
            >
              Notifications
            </Typography>
            {notViewed > 0 && (
              <Chip
                color="primary"
                size="small"
                label={_.padStart(notViewed, 2, 0)}
              />
            )}
          </Grid>
          <Grid item>
            <IconButton>
              <Settings />
            </IconButton>
          </Grid>
        </Grid>
      </div>
      {notificationListLoading &&
        _.isEmpty(notificationList) &&
        _.map(_.range(5), index => (
          <React.Fragment key={index}>
            <NotificationItemSkeleton />
            {index + 1 !== 5 && <Divider />}
          </React.Fragment>
        ))}
      <List style={{ padding: 0 }}>
        {_.map(notificationList, (notification, index) => (
          <React.Fragment key={notification.uid}>
            <NotificationItem notification={notification} />
            {index + 1 !== _.size(notificationList) && (
              <Divider variant="middle" component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
      <div style={{ padding: 8, paddingLeft: 16, paddingRight: 16 }}>
        <Button
          variant="outlined"
          onClick={() => {
            handleClose();
            history.push({ pathname: '/notifications' });
          }}
        >
          View All
        </Button>
      </div>
    </div>
  );
}

NotificationList.propTypes = { handleClose: PropTypes.func };

export default memo(NotificationList);

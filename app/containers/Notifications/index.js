/**
 *
 * Notifications
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import _ from 'lodash';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { List, Divider, Container } from '@material-ui/core';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import NotificationItem from 'components/NotificationItem';
import NotificationItemSkeleton from 'components/NotificationItem/Skeleton';
import {
  makeSelectNotificationList,
  makeSelectNotificationListLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  notificationList as notificationListAction,
  notificationListMore,
} from './actions';
// import messages from './messages';

export function Notifications(props) {
  useInjectReducer({ key: 'notifications', reducer });
  useInjectSaga({ key: 'notifications', saga });

  const {
    dispatchNotificationList,
    dispatchNotificationListMore,
    notificationList,
    notificationListLoading,
  } = props;

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page === 1) {
      dispatchNotificationList({ itemsPerPage: 18, page });
    } else if (page > 1) {
      dispatchNotificationListMore({ itemsPerPage: 18, page });
    }
  }, [page]);

  return (
    <>
      <Helmet>
        <title>Notifications</title>
        <meta name="description" content="Description of Notifications" />
      </Helmet>
      <Container fixed style={{ paddingTop: 20, paddingBottom: 20 }}>
        <InfiniteScroll
          dataLength={_.size(notificationList)}
          next={() => setPage(page + 1)}
          hasMore={page * 18 === _.size(notificationList)}
        >
          <List style={{ padding: 0 }}>
            {_.map(notificationList, (notification, index) => (
              <React.Fragment key={notification.uid}>
                <NotificationItem notification={notification} />
                {index + 1 !== _.size(notificationList) && (
                  <Divider component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        </InfiniteScroll>
        {notificationListLoading &&
          _.map(_.range(10), index => (
            <React.Fragment key={index}>
              <NotificationItemSkeleton />
              {index + 1 !== 10 && <Divider />}
            </React.Fragment>
          ))}
      </Container>
    </>
  );
}

Notifications.propTypes = {
  dispatchNotificationList: PropTypes.func,
  dispatchNotificationListMore: PropTypes.func,
  notificationList: PropTypes.array,
  notificationListLoading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  notificationList: makeSelectNotificationList(),
  notificationListLoading: makeSelectNotificationListLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchNotificationList: options =>
      dispatch(notificationListAction(options)),
    dispatchNotificationListMore: options =>
      dispatch(notificationListMore(options)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Notifications);

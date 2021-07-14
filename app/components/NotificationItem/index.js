/* eslint-disable indent */
/**
 *
 * NotificationItem
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import _ from 'lodash';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { ListItemAvatar, ListItemText } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import { initials } from 'utils/helpers/avatarInitials';
// import { FormattedMessage } from 'react-intl';
import NotificationItemText from 'components/NotificationItemText';
import { makeSelectViewNotificationByCommunity } from 'containers/AuthBase/selectors';
import { ReactComponent as Accept } from 'images/notification/Accept.svg';
import { ReactComponent as Archive } from 'images/notification/Archive.svg';
import { ReactComponent as Booked } from 'images/notification/Booked.svg';
import { ReactComponent as Cancel } from 'images/notification/Cancel.svg';
import { ReactComponent as Comment } from 'images/notification/Comment.svg';
import { ReactComponent as Conference } from 'images/notification/Conference.svg';
import { ReactComponent as Copy } from 'images/notification/Copy.svg';
import { ReactComponent as Create } from 'images/notification/Create.svg';
import { ReactComponent as Follow } from 'images/notification/Follow.svg';
import { ReactComponent as Like } from 'images/notification/Like.svg';
import { ReactComponent as Mentioned } from 'images/notification/Mentioned.svg';
import { ReactComponent as Modify } from 'images/notification/Modify.svg';
import { ReactComponent as Participate } from 'images/notification/Participate.svg';
import { ReactComponent as Password } from 'images/notification/Password.svg';
import { ReactComponent as Preview } from 'images/notification/Preview.svg';
import { ReactComponent as Remind } from 'images/notification/Remind.svg';
import { ReactComponent as Requested } from 'images/notification/Requested.svg';
import { ReactComponent as Revalidate } from 'images/notification/Revalidate.svg';
import { ReactComponent as Share } from 'images/notification/Share.svg';
import { ReactComponent as Subscribe } from 'images/notification/Subscribe.svg';
import { ReactComponent as Suggest } from 'images/notification/Suggest.svg';
import { ReactComponent as Unfollow } from 'images/notification/Unfollow.svg';
// import messages from './messages';
import { NotificationAction, NotificationAvatar } from './Wrapper';

const NotificationIcon = ({ action }) => {
  if (action === 'participate') {
    return (
      <NotificationAction>
        <Participate />
      </NotificationAction>
    );
  }
  if (action === 'change password') {
    return (
      <NotificationAction>
        <Password />
      </NotificationAction>
    );
  }
  if (action === 'preview digest') {
    return (
      <NotificationAction>
        <Preview />
      </NotificationAction>
    );
  }
  if (action === 'remind event happens') {
    return (
      <NotificationAction>
        <Remind />
      </NotificationAction>
    );
  }
  if (action === 'requested community') {
    return (
      <NotificationAction>
        <Requested />
      </NotificationAction>
    );
  }
  if (action === 'follow to user') {
    return (
      <NotificationAction>
        <Follow />
      </NotificationAction>
    );
  }
  if (action === 'cancel') {
    return (
      <NotificationAction>
        <Cancel />
      </NotificationAction>
    );
  }
  if (action === 'comment') {
    return (
      <NotificationAction>
        <Comment />
      </NotificationAction>
    );
  }
  if (action === 'follow to community' || action === 'subscribe to community') {
    return (
      <NotificationAction>
        <Subscribe />
      </NotificationAction>
    );
  }
  if (action === 'suggest a hobby') {
    return (
      <NotificationAction>
        <Suggest />
      </NotificationAction>
    );
  }
  if (action === 'unfollow to user') {
    return (
      <NotificationAction>
        <Unfollow />
      </NotificationAction>
    );
  }
  if (_.split(action, ' ')[0] === 'accept') {
    return (
      <NotificationAction>
        <Accept />
      </NotificationAction>
    );
  }
  if (_.split(action, ' ')[0] === 'archive') {
    return (
      <NotificationAction>
        <Archive />
      </NotificationAction>
    );
  }
  if (_.split(action, ' ')[0] === 'booked') {
    return (
      <NotificationAction>
        <Booked />
      </NotificationAction>
    );
  }
  if (_.split(action, ' ')[0] === 'meeting') {
    return (
      <NotificationAction>
        <Conference />
      </NotificationAction>
    );
  }
  if (_.split(action, ' ')[0] === 'copy') {
    return (
      <NotificationAction>
        <Copy />
      </NotificationAction>
    );
  }
  if (
    _.split(action, ' ')[0] === 'create' ||
    _.split(action, ' ')[0] === 'write'
  ) {
    return (
      <NotificationAction>
        <Create />
      </NotificationAction>
    );
  }
  if (_.split(action, ' ')[0] === 'like') {
    return (
      <NotificationAction>
        <Like />
      </NotificationAction>
    );
  }
  if (_.split(action, ' ')[0] === 'mentioned') {
    return (
      <NotificationAction>
        <Mentioned />
      </NotificationAction>
    );
  }
  if (_.split(action, ' ')[0] === 'modify') {
    return (
      <NotificationAction>
        <Modify />
      </NotificationAction>
    );
  }
  if (_.split(action, ' ')[2] === 'revalidate') {
    return (
      <NotificationAction>
        <Revalidate />
      </NotificationAction>
    );
  }
  if (_.split(action, ' ')[0] === 'share') {
    return (
      <NotificationAction>
        <Share />
      </NotificationAction>
    );
  }
  return null;
};

NotificationIcon.propTypes = { action: PropTypes.string };

function NotificationItem({ notification }) {
  const viewNotificationByCommunity = useSelector(
    makeSelectViewNotificationByCommunity(),
  );
  return (
    <>
      <ListItem
        button
        style={
          !notification.viewed
            ? {
                backgroundColor: '#F3FDFF',
              }
            : {}
        }
        alignItems="flex-start"
      >
        <ListItemAvatar
          style={{ position: 'relative', marginTop: 8, minWidth: 66 }}
        >
          <>
            <NotificationAvatar
              src={
                viewNotificationByCommunity.value && notification.community
                  ? notification.community.headerLogoUrl
                  : notification.sourceUser.headerLogoUrl
              }
            >
              {initials(
                viewNotificationByCommunity.value && notification.community
                  ? notification.community.label
                  : notification.sourceUser.displayName,
              )}
            </NotificationAvatar>
            <NotificationIcon action={notification.action} />
          </>
        </ListItemAvatar>
        <ListItemText
          primary={<NotificationItemText notification={notification} />}
          secondary={
            moment().diff(moment(notification.creationDate), 'days') > 1
              ? moment(notification.creationDate).format('DD MMM, HH:mm')
              : moment(notification.creationDate).fromNow()
          }
        />
      </ListItem>
    </>
  );
}

NotificationItem.propTypes = { notification: PropTypes.object };

export default memo(NotificationItem);

/**
 *
 * Admin
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { List, ListItemText, Divider } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import {
  openWidgetManager,
  openDigest,
  openStatistics,
  openCarouselManager,
} from 'containers/AuthBase/actions';

function Admin({ community }) {
  const dispatch = useDispatch();
  return (
    <List>
      <ListItem
        button
        onClick={() => dispatch(openWidgetManager('Community', community.uid))}
      >
        <ListItemText primary="Widget Manager" />
      </ListItem>
      <Divider component="li" />
      <ListItem button onClick={() => {}}>
        <ListItemText primary="User Manager" />
      </ListItem>
      <Divider component="li" />
      <ListItem
        button
        onClick={() => dispatch(openCarouselManager(community.uid))}
      >
        <ListItemText primary="Carousel Manager" />
      </ListItem>
      <Divider component="li" />
      <ListItem button onClick={() => dispatch(openStatistics())}>
        <ListItemText primary="Statistics" />
      </ListItem>
      <Divider component="li" />
      <ListItem button onClick={() => dispatch(openDigest())}>
        <ListItemText primary="Digest" />
      </ListItem>
    </List>
  );
}

Admin.propTypes = {
  community: PropTypes.object,
};

export default memo(Admin);

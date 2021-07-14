/**
 *
 * LivelyMenuList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { List } from '@material-ui/core';
import Link from '@material-ui/core/Link';

import {
  LivelyMenuItem,
  LivelyMenuLinkHeader,
  LivelyMenuLinkItem,
} from './wrapper';

function LivelyMenuList({ menuData }) {
  return (
    <LivelyMenuItem>
      <LivelyMenuLinkHeader>{menuData.heading}</LivelyMenuLinkHeader>
      <List>
        {menuData.links.map(link => (
          <LivelyMenuLinkItem key={link.id}>
            <Link
              target="_blank"
              href={link.link}
              variant="body2"
              rel="noreferer noopener"
            >
              {link.title}
            </Link>
          </LivelyMenuLinkItem>
        ))}
      </List>
    </LivelyMenuItem>
  );
}

LivelyMenuList.propTypes = {
  menuData: PropTypes.object.isRequired,
};

export default LivelyMenuList;

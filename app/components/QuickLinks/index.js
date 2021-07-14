/**
 *
 * QuickLinks
 *
 */

import React, { memo, useState, useEffect, useRef, useCallback } from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import Sticky from 'react-stickynode';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { animateScroll as scroll } from 'react-scroll';
import _ from 'lodash';
import { List, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import Collapse from '@material-ui/core/Collapse';
import {
  ChevronRight,
  Settings,
  ExpandLess,
  ExpandMore,
} from '@material-ui/icons';
// import { FormattedMessage } from 'react-intl';
import { makeSelectDigitalWorkplaceList } from 'containers/AuthBase/selectors';
import {
  digitalWorkplaceList as digitalWorkplaceListAction,
  openSocialWall,
} from 'containers/AuthBase/actions';
import { Birthday, SocialWall } from 'components/Icons';
// import messages from './messages';
import {
  QuickLinksWrapper,
  QuickLinksCard,
  QuickLinksContainer,
  CollapseFab,
} from './Wrapper';
import NestedList from './NestedList';

function QuickLinks() {
  const [offset, setOffset] = useState(-320);
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useDispatch();
  const digitalWorkplaceList = useSelector(makeSelectDigitalWorkplaceList());
  const [digitalWorkplaceOpen, setDigitalWorkplaceOpen] = useState(false);

  useEffect(() => {
    if (digitalWorkplaceOpen && _.isEmpty(digitalWorkplaceList)) {
      dispatch(digitalWorkplaceListAction());
    }
  }, [digitalWorkplaceOpen]);

  const handlescrollMore = useCallback(top => {
    if (top - quickLinksCardRef.current.getBoundingClientRect().top > 112) {
      scroll.scrollMore(112, { duration: 300, containerId: 'quickLinksCard' });
    }
  }, []);

  useEffect(() => {
    if (digitalWorkplaceOpen && !_.isEmpty(digitalWorkplaceList)) {
      scroll.scrollMore(112, { duration: 300, containerId: 'quickLinksCard' });
    }
  }, [digitalWorkplaceOpen, digitalWorkplaceList]);

  const handleMouseLeave = _.debounce(() => setCollapsed(true), 1000);

  useEffect(() => () => handleMouseLeave.cancel(), [handleMouseLeave]);

  const handleMouseEnter = () => {
    if (collapsed) {
      return;
    }
    handleMouseLeave.cancel();
  };

  const location = useLocation();

  const pathRef = useRef(null);

  useEffect(() => {
    const pathname = _.head(_.compact(_.split(location.pathname, '/')));
    if ((!pathname && !pathRef.current) || pathRef.current === pathname) {
      return;
    }
    pathRef.current = pathname;
    if (pathname === 'community' || pathname === 'myprofile') {
      setOffset(-200);
    } else if (pathname === 'search') {
      setOffset(-272);
    } else {
      setOffset(-320);
    }
  }, [location.pathname]);

  const quickLinksCardRef = useRef(null);

  return (
    <Sticky top={offset} innerZ={1300}>
      <QuickLinksWrapper
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <QuickLinksCard id="quickLinksCard" ref={quickLinksCardRef}>
          <QuickLinksContainer $collapsed={collapsed}>
            <List>
              <ListItem button>
                <ListItemAvatar>
                  <Badge color="primary" overlap="circle" badgeContent="1">
                    <Tooltip
                      disableFocusListener={!collapsed}
                      disableHoverListener={!collapsed}
                      disableTouchListener={!collapsed}
                      placement="right"
                      title="Birthdays"
                    >
                      <Avatar>
                        <Birthday />
                      </Avatar>
                    </Tooltip>
                  </Badge>
                </ListItemAvatar>
                <ListItemText primary="Birthdays" />
              </ListItem>
              <ListItem button onClick={() => dispatch(openSocialWall())}>
                <ListItemAvatar>
                  <Tooltip
                    disableFocusListener={!collapsed}
                    disableHoverListener={!collapsed}
                    disableTouchListener={!collapsed}
                    placement="right"
                    title="Social Wall"
                  >
                    <Avatar>
                      <SocialWall />
                    </Avatar>
                  </Tooltip>
                </ListItemAvatar>
                <ListItemText primary="Social Wall" />
              </ListItem>
              <ListItem
                button
                selected={digitalWorkplaceOpen}
                onClick={() => setDigitalWorkplaceOpen(!digitalWorkplaceOpen)}
              >
                <ListItemAvatar>
                  <Tooltip
                    disableFocusListener={!collapsed}
                    disableHoverListener={!collapsed}
                    disableTouchListener={!collapsed}
                    placement="right"
                    title="Digital Workplace"
                  >
                    <Avatar>
                      <Settings />
                    </Avatar>
                  </Tooltip>
                </ListItemAvatar>
                <ListItemText primary="Digital Workplace" />
                {digitalWorkplaceOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={digitalWorkplaceOpen} timeout="auto">
                {_.map(digitalWorkplaceList, item => (
                  <NestedList
                    key={item.id}
                    collapsed={collapsed}
                    item={item}
                    handlescrollMore={handlescrollMore}
                  />
                ))}
              </Collapse>
            </List>
          </QuickLinksContainer>
        </QuickLinksCard>
        <CollapseFab
          size="small"
          color="secondary"
          onClick={() => setCollapsed(!collapsed)}
          $collapsed={collapsed}
        >
          <ChevronRight />
        </CollapseFab>
      </QuickLinksWrapper>
    </Sticky>
  );
}

QuickLinks.propTypes = {};

export default memo(QuickLinks);

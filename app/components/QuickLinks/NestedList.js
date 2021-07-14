import React, { memo, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { List, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Tooltip from '@material-ui/core/Tooltip';
import Collapse from '@material-ui/core/Collapse';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { initials } from 'utils/helpers/avatarInitials';

function NestedList(props) {
  const { collapsed, item, color, handlescrollMore } = props;
  const [open, setOpen] = useState(false);
  const handleClick = e => {
    if (item.itemType === 'Section') {
      e.preventDefault();
      setOpen(!open);
    }
  };

  const listItemRef = useRef(null);

  useEffect(() => {
    if (open) {
      handlescrollMore(listItemRef.current.getBoundingClientRect().top);
    }
  }, [open]);

  return (
    <>
      <ListItem
        button
        component="a"
        href={item.link}
        target="_blank"
        selected={open}
        onClick={handleClick}
        ref={listItemRef}
      >
        <ListItemAvatar>
          <Tooltip
            disableFocusListener={!collapsed}
            disableHoverListener={!collapsed}
            disableTouchListener={!collapsed}
            placement="right"
            title={item.name}
          >
            <Avatar
              style={{
                backgroundColor: item.color || color || 'initial',
                padding: 6,
              }}
              src={item.icon.thumbUrl}
            >
              {initials(item.name)}
            </Avatar>
          </Tooltip>
        </ListItemAvatar>
        <ListItemText primary={item.name} />
        {item.itemType === 'Section' && (
          <>{open ? <ExpandLess /> : <ExpandMore />}</>
        )}
      </ListItem>
      {item.itemType === 'Section' && (
        <Collapse in={open} timeout="auto">
          <List component="div" disablePadding>
            {_.map(item.applications, application => (
              <NestedList
                key={application.id}
                item={application}
                collapsed={collapsed}
                color={item.color}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

NestedList.propTypes = {
  collapsed: PropTypes.bool,
  item: PropTypes.object,
  color: PropTypes.string,
  handlescrollMore: PropTypes.func,
};

export default memo(NestedList);

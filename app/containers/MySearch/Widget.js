import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ListItem from '@material-ui/core/ListItem';
import {
  ListItemAvatar,
  ListItemText,
  Typography,
  Avatar,
} from '@material-ui/core';
import { Widgets } from '@material-ui/icons';
import { createMarkup } from 'utils/helpers/createMarkup';

const WIdget = ({ widget }) => (
  <ListItem button alignItems="flex-start">
    <ListItemAvatar style={{ marginTop: 8, marginRight: 20 }}>
      <Avatar>
        <Widgets />
      </Avatar>
    </ListItemAvatar>
    <ListItemText
      primary={<Link to={`/widget/${widget.uid}`}>{widget.title}</Link>}
      secondary={
        <>
          {widget.type === 'FCKEditor' && (
            // eslint-disable-next-line react/no-danger
            <span dangerouslySetInnerHTML={createMarkup(widget.content)} />
          )}
          <Typography variant="body1" component="span" display="block">
            {moment(widget.creationDate).format('DD MMM YYYY[,] HH:mm')}
          </Typography>
          <Typography component="span">
            {`Published in `}
            {widget.community ? (
              <Link
                onClick={e => e.stopPropagation()}
                to={`/community/${encodeURIComponent(widget.community.label)}/${
                  widget.community.uid
                }`}
              >
                {widget.community.label}
              </Link>
            ) : (
              <Link onClick={e => e.stopPropagation()} to="/">
                Home
              </Link>
            )}
          </Typography>
        </>
      }
    />
  </ListItem>
);

WIdget.propTypes = {
  widget: PropTypes.object,
};

export default memo(WIdget);

/**
 *
 * Dailymotion
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import {
  List,
  ListItemText,
  ListItemAvatar,
  Typography,
} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import abbreviate from 'number-abbreviate';

function Dailymotion({ dailymotionData }) {
  if (dailymotionData.error) {
    return <Alert severity="error">Error</Alert>;
  }
  return (
    <>
      <List>
        {_.map(dailymotionData.videos, video => (
          <a
            key={video.id}
            href={video.url}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <ListItem button>
              <ListItemAvatar style={{ minWidth: 116 }}>
                <img
                  src={video.thumbnail_180_url}
                  alt={video.title}
                  width={100}
                />
              </ListItemAvatar>
              <ListItemText
                primary={video.title}
                secondary={
                  <>
                    <Typography component="span" display="block">{`${abbreviate(
                      video.views_total,
                      2,
                    )} views`}</Typography>
                    <Typography component="span">
                      {moment().diff(moment.unix(video.created_time), 'days') >
                      1
                        ? moment.unix(video.created_time).format('LL')
                        : moment.unix(video.created_time).fromNow()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          </a>
        ))}
      </List>
      <Button
        target="_blank"
        rel="nofollow noopener noreferrer"
        href={dailymotionData.url}
        color="primary"
      >
        Voir sur Dailymotion
      </Button>
    </>
  );
}

Dailymotion.propTypes = {
  dailymotionData: PropTypes.object,
};

export default memo(Dailymotion);

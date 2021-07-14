/**
 *
 * Youtube
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

function Youtube({ youtubeData }) {
  if (youtubeData.error) {
    return <Alert severity="error">Error</Alert>;
  }
  return (
    <>
      <List>
        {_.map(youtubeData.videos, video => (
          <a
            key={video.id.videoId}
            href={video.id.videoUrl}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <ListItem button>
              <ListItemAvatar style={{ minWidth: 116 }}>
                <img
                  src={video.snippet.thumbnails.defaultThumb.url}
                  alt={video.snippet.title}
                  width={100}
                />
              </ListItemAvatar>
              <ListItemText
                primary={video.snippet.title}
                secondary={
                  <>
                    <Typography component="span" display="block">{`${abbreviate(
                      video.statistics.viewCount,
                      2,
                    )} views`}</Typography>
                    <Typography component="span">
                      {moment().diff(
                        moment(video.snippet.publishTime),
                        'days',
                      ) > 1
                        ? moment(video.snippet.publishTime).format('LL')
                        : moment(video.snippet.publishTime).fromNow()}
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
        href={`https://www.youtube.com/channel/${youtubeData.channelId}`}
        color="primary"
      >
        Voir sur Youtube
      </Button>
    </>
  );
}

Youtube.propTypes = {
  youtubeData: PropTypes.object,
};

export default memo(Youtube);

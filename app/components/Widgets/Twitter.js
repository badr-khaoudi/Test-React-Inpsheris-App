/**
 *
 * Twitter
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import {
  List,
  ListItemText,
  ListItemAvatar,
  Typography,
} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import { createMarkup } from 'utils/helpers/createMarkup';

const range = [
  '\ud83c[\udf00-\udfff]',
  '\ud83d[\udc00-\ude4f]',
  '\ud83d[\ude80-\udeff]',
];

const linkifyEntities = tweet => {
  let emojis = [];
  const indexMap = {};
  let emojiIndex = -1;
  let lastIndex = 0;
  let i = 0;
  let result = '';
  const text = _.unescape(
    _.replace(
      tweet.full_text.substring(0, tweet.display_text_range[1] || 140),
      new RegExp(_.join(range, '|'), 'g'),
      match => {
        emojis = [...emojis, match];
        return '\u0091';
      },
    ),
  );
  if (!_.isEmpty(tweet.entities.urls)) {
    _.forEach(tweet.entities.urls, url => {
      indexMap[url.indices[0]] = {
        end: url.indices[1],
        render: `<a target='_blank' href='${url.url}'>${url.display_url}</a>`,
      };
    });
  }
  if (!_.isEmpty(tweet.entities.hashtags)) {
    _.forEach(tweet.entities.hashtags, hashtag => {
      indexMap[hashtag.indices[0]] = {
        end: hashtag.indices[1],
        render: `<a target='_blank' href='http://twitter.com/search?q=#${
          hashtag.text
        }'>${hashtag.text}</a>`,
      };
    });
  }
  if (!_.isEmpty(tweet.entities.user_mentions)) {
    _.forEach(tweet.entities.user_mentions, mention => {
      indexMap[mention.indices[0]] = {
        end: mention.indices[1],
        render: `<a target='_blank' href='http://twitter.com/${
          mention.screen_name
        }'>${mention.screen_name}</a>`,
      };
    });
  }
  for (i; i < text.length; i += 1) {
    const index = indexMap[i];
    if (index) {
      if (i > lastIndex) {
        result += text.substring(lastIndex, i);
      }
      result += index.render;
      i = index.end - 1;
      lastIndex = index.end;
    }
  }
  if (i > lastIndex) {
    result += text.substring(lastIndex, i);
  }
  return _.replace(result, /\u0091/g, () => {
    emojiIndex += 1;
    return emojis[emojiIndex];
  });
};

function Twitter({ twitterData }) {
  return (
    <List>
      {_.map(twitterData.tweets, tweet => (
        <a
          key={tweet.id}
          href={`https://twitter.com/i/web/status/${tweet.id_str}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          style={{ color: 'inherit', wordBreak: 'break-word' }}
        >
          <ListItem button>
            {!_.isEmpty(tweet.entities.media) && (
              <ListItemAvatar style={{ minWidth: 116 }}>
                <img
                  src={`${_.head(tweet.entities.media).media_url_https}:thumb`}
                  alt=""
                  width={100}
                />
              </ListItemAvatar>
            )}
            <ListItemText
              primary={
                <Typography
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={createMarkup(linkifyEntities(tweet))}
                />
              }
            />
          </ListItem>
        </a>
      ))}
    </List>
  );
}

Twitter.propTypes = {
  twitterData: PropTypes.object,
};

export default memo(Twitter);

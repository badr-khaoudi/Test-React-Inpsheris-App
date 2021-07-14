/* eslint-disable indent */
/**
 *
 * LinkedIn
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

const linkifyEntities = feed => {
  let emojis = [];
  const indexMap = {};
  let emojiIndex = -1;
  let lastIndex = 0;
  let i = 0;
  let result = '';
  const text = _.unescape(
    _.replace(
      feed.specificContent[
        'com.linkedin.ugc.ShareContent'
      ].shareCommentary.text.substring(0, 140) +
        feed.specificContent[
          'com.linkedin.ugc.ShareContent'
        ].shareCommentary.text
          .substring(140)
          .split(' ')[0],
      new RegExp(_.join(range, '|'), 'g'),
      match => {
        emojis = [...emojis, match];
        return '\u0091';
      },
    ),
  );
  const { attributes } = feed.specificContent[
    'com.linkedin.ugc.ShareContent'
  ].shareCommentary;
  if (!_.isEmpty(attributes)) {
    _.forEach(attributes, attribute => {
      indexMap[attribute.start] = {
        end: attribute.start + attribute.length,
        render: hashtag =>
          attribute.value['com.linkedin.common.HashtagAttributedEntity']
            ? `<a target='_blank' href='https://www.linkedin.com/feed/hashtag/?keywords=${hashtag}'>${hashtag}</a>`
            : null,
      };
    });
  }
  for (i; i < text.length; i += 1) {
    const index = indexMap[i];
    if (index) {
      if (i > lastIndex) {
        result += text.substring(lastIndex, i);
      }
      result += index.render(text.substring(i, index.end));
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

function LinkedIn({ linkedInData }) {
  return (
    <List>
      {_.map(linkedInData.feeds, feed => (
        <a
          key={feed.id}
          href={`https://www.linkedin.com/feed/update/${feed.id}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          style={{ color: 'inherit', wordBreak: 'break-word' }}
        >
          <ListItem button>
            {!_.isEmpty(
              feed.specificContent['com.linkedin.ugc.ShareContent'].media,
            ) &&
              !_.isEmpty(
                _.head(
                  feed.specificContent['com.linkedin.ugc.ShareContent'].media,
                ).thumbnails,
              ) && (
                <ListItemAvatar style={{ minWidth: 116 }}>
                  <img
                    src={
                      _.head(
                        _.head(
                          feed.specificContent['com.linkedin.ugc.ShareContent']
                            .media,
                        ).thumbnails,
                      ).url
                    }
                    alt=""
                    width={100}
                  />
                </ListItemAvatar>
              )}
            <ListItemText
              primary={
                <Typography
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={createMarkup(linkifyEntities(feed))}
                />
              }
            />
          </ListItem>
        </a>
      ))}
    </List>
  );
}

LinkedIn.propTypes = {
  linkedInData: PropTypes.object,
};

export default memo(LinkedIn);

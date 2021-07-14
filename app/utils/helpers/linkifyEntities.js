import _ from 'lodash';

const range = [
  '\ud83c[\udf00-\udfff]',
  '\ud83d[\udc00-\ude4f]',
  '\ud83d[\ude80-\udeff]',
];

const linkifyTwitterEntities = tweet => {
  let emojis = [];
  const indexMap = {};
  let emojiIndex = -1;
  let lastIndex = 0;
  let i = 0;
  let result = '';
  const text = _.unescape(
    _.replace(
      tweet.full_text.substring(0, tweet.display_text_range[1]),
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

const linkifyLinkedInEntities = feed => {
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

export { linkifyTwitterEntities, linkifyLinkedInEntities };

import { schema } from 'normalizr';
const templateSchema = new schema.Entity(
  'template',
  {},
  { idAttribute: 'uid' },
);
const userSchema = new schema.Entity('user', {}, { idAttribute: 'uid' });
const commentsSchema = new schema.Entity(
  'comments',
  { author: userSchema },
  { idAttribute: 'uid' },
);
const communityTabSchema = new schema.Entity(
  'communityTab',
  {},
  { idAttribute: 'uid' },
);
const communitySchema = new schema.Entity(
  'community',
  { tabs: [communityTabSchema] },
  { idAttribute: 'uid' },
);
const feedSchema = new schema.Entity(
  'feed',
  {
    template: templateSchema,
    author: userSchema,
    lastActivityUser: userSchema,
    lastUpdatedUser: userSchema,
    comments: [commentsSchema],
    community: communitySchema,
    communityTab: communityTabSchema,
    sharedCommunity: communitySchema,
    sharedCommunityTab: communityTabSchema,
    sharedContentAuthor: userSchema,
    sharedContentLastActivityUser: userSchema,
  },
  { idAttribute: 'uid' },
);
export {
  templateSchema,
  userSchema,
  commentsSchema,
  communitySchema,
  communityTabSchema,
  feedSchema,
};

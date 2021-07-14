import { schema } from 'normalizr';
import {
  communitySchema,
  communityTabSchema,
  feedSchema,
  userSchema,
} from 'utils/normalizrSchema/feed';

const digestSchema = new schema.Entity(
  'digest',
  {
    communities: [communitySchema],
    communityTabs: [communityTabSchema],
    contents: [feedSchema],
    users: [userSchema],
  },
  { idAttribute: 'id' },
);

export { digestSchema };

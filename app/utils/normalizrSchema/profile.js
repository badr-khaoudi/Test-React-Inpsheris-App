import { schema } from 'normalizr';
import { userSchema } from './feed';

const profileSchema = new schema.Entity(
  'user',
  {
    coworkers: [userSchema],
    followings: [userSchema],
    followers: [userSchema],
    userPartners: [userSchema],
  },
  { idAttribute: 'uid' },
);

export { profileSchema };

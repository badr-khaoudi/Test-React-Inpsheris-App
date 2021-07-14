import { schema } from 'normalizr';
import { communitySchema } from './feed';

const carouselSchema = new schema.Entity(
  'carousel',
  { community: communitySchema },
  { idAttribute: 'uid' },
);

export { carouselSchema };

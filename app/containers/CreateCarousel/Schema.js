import Joi from 'joi';

const CreateCarouselSchema = Joi.object({
  backgroundColor: Joi.string(),
  communityUid: Joi.string().when('type', {
    is: Joi.string().valid('community-carousel'),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  displayBackgroundColor: Joi.boolean(),
  displayOption: Joi.string().required(),
  displayTitle: Joi.boolean(),
  embedVideo: Joi.string().when('type', {
    is: Joi.string().valid('video'),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  thumbUrl: Joi.string().when('type', {
    is: Joi.string().valid('video'),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  imageLevel1: Joi.string().when('level', {
    is: Joi.number().valid(1),
    then: Joi.when('type', {
      is: Joi.string().valid(
        'image',
        'lively-call',
        'document-bar',
        'lively-transfer',
      ),
      then: Joi.required(),
    }),
    otherwise: Joi.optional(),
  }),
  imageLevel2: Joi.string().when('level', {
    is: Joi.number().valid(2),
    then: Joi.when('type', {
      is: Joi.string().valid(
        'image',
        'lively-call',
        'document-bar',
        'lively-transfer',
        'community-carousel',
      ),
      then: Joi.required(),
    }),
    otherwise: Joi.optional(),
  }),
  level: Joi.number().required(),
  openSameTab: Joi.boolean(),
  subTitle: Joi.string().allow(''),
  title: Joi.string().required(),
  titleColor: Joi.string().required(),
  type: Joi.string().required(),
  uid: Joi.string().optional(),
  url: Joi.string()
    .allow('')
    .optional(),
});

export { CreateCarouselSchema };

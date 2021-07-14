import Joi from 'joi';

const CreatePinSchema = Joi.object({
  pinType: Joi.string().required(),
  link: Joi.when('pinType', {
    is: Joi.string().valid('Link'),
    then: Joi.object({
      description: Joi.string(),
      favicon: Joi.string(),
      location: Joi.string().required(),
      path: Joi.string().required(),
      subTitle: Joi.string(),
      thumbnail_height: Joi.number(),
      thumbnail_url: Joi.string(),
      thumbnail_width: Joi.number(),
      title: Joi.string().required(),
      type: Joi.string(),
      version: Joi.string(),
    }).required(),
    otherwise: Joi.optional(),
  }),
  title: Joi.string().when('pinType', [
    {
      is: Joi.string().valid('Text'),
      then: Joi.required(),
    },
    {
      is: Joi.string().valid('ImageGallery'),
      then: Joi.required(),
      otherwise: Joi.optional(),
    },
  ]),
  description: Joi.string().allow(''),
  imageUid: Joi.string().when('pinType', {
    is: Joi.string().valid('Text'),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  images: Joi.array().when('pinType', {
    is: Joi.string().valid('ImageGallery'),
    then: Joi.array().min(1),
    otherwise: Joi.optional(),
  }),
  video: Joi.when('pinType', {
    is: Joi.string().valid('Video'),
    then: Joi.object({
      description: Joi.string(),
      embedVideo: Joi.string().required(),
      embedVideoTitle: Joi.string().required(),
      thumbUrl: Joi.string(),
      url: Joi.string().required(),
    }).required(),
    otherwise: Joi.optional(),
  }),
});

export { CreatePinSchema };

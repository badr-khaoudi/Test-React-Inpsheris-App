import Joi from 'joi';

export const QuickPostSchema = Joi.object({
  uid: Joi.string().optional(),
  status: Joi.string().required(),
  quickpostDescription: Joi.when('type', {
    is: Joi.string().valid('quickSharingOfTheLink'),
    then: Joi.optional(),
    otherwise: Joi.string()
      .max(500)
      .required(),
  }),
  type: Joi.string().optional(),
  language: Joi.string().required(),
  hashtag: Joi.string()
    .allow('')
    .optional(),
  textDetail: Joi.when('type', {
    is: Joi.string().valid('quickSharingOfTheLink'),
    then: Joi.optional(),
    otherwise: Joi.string().allow(''),
  }),
  title: Joi.string().when('type', {
    is: Joi.string().valid('quickSharingOfTheLink'),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  communityTabUids: Joi.array()
    .min(1)
    .required(),
  links: Joi.when('type', [
    {
      is: Joi.string().valid('quickSharingOfTheLink'),
      then: Joi.array().min(1),
    },
    {
      is: Joi.string().valid('link'),
      then: Joi.array().min(1),
      otherwise: Joi.optional(),
    },
  ]),
  documents: Joi.when('type', {
    is: Joi.string().valid('document'),
    then: Joi.array().min(1),
    otherwise: Joi.optional(),
  }),
  images: Joi.when('type', {
    is: Joi.string().valid('image'),
    then: Joi.array().min(1),
    otherwise: Joi.optional(),
  }),
  videos: Joi.when('type', {
    is: Joi.string().valid('video'),
    then: Joi.array().min(1),
    otherwise: Joi.optional(),
  }),
  publicationStartDate: Joi.date().optional(),
  publicationEndDate: Joi.date().optional(),
});

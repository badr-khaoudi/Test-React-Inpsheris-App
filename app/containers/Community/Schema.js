import Joi from 'joi';

export const RequestCommunitySchema = Joi.object({
  label: Joi.string().required(),
  description: Joi.string().required(),
  reason: Joi.string().required(),
});

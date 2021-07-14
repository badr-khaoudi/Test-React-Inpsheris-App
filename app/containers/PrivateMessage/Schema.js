import Joi from 'joi';

export const PrivateMessageSchema = Joi.object({
  contentSourceType: Joi.string().required(),
  title: Joi.string().required(),
  contentUid: Joi.string().required(),
  userUids: Joi.array()
    .items(Joi.string())
    .min(1)
    .required(),
});

import Joi from 'joi';

export const DirectoryPrivateMessageSchema = Joi.object({
  quickpostDescription: Joi.string().required(),
  type: Joi.string().optional(),
  items: Joi.when('type', {
    is: Joi.exist(),
    then: Joi.array().min(1),
  }),
});

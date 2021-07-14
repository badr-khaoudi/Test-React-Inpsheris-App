import Joi from 'joi';

const CommentSchema = Joi.object({
  commentUid: Joi.string().optional(),
  content: Joi.string().optional(),
  followerQuickpostUid: Joi.string().optional(),
  images: Joi.array().min(1),
  documents: Joi.array().min(1),
  videos: Joi.array().min(1),
  links: Joi.array().min(1),
  language: Joi.string(),
  text: Joi.string().required(),
  textDetail: Joi.string().allow(''),
});

export { CommentSchema };

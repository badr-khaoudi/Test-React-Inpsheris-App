import Joi from 'joi';

export const PinnedCommunitySchema = Joi.object({
  id: Joi.number().optional(),
  title: Joi.string().required(),
  communityUid: Joi.string().required(),
  communityTabUid: Joi.string().when('$showLastThreeArticles', {
    is: Joi.boolean()
      .valid(false)
      .required(),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
});

import Joi from 'joi';

const CreateDigestSchema = Joi.object({
  id: Joi.number().optional(),
  active: Joi.boolean().required(),
  automatedDigestDetails: Joi.when('digestType', {
    is: Joi.string().valid('Automatic'),
    then: Joi.object({
      digestContentType: Joi.string().required(),
      repeatDigest: Joi.string().required(),
      days: Joi.array()
        .items(Joi.string())
        .optional(),
      startDate: Joi.date().required(),
      endDate: Joi.date().min(Joi.ref('startDate')),
    }),
    otherwise: Joi.optional(),
  }),
  communityUids: Joi.array()
    .items(Joi.string())
    .min(1),
  contentUids: Joi.when('digestType', {
    is: Joi.string().valid('Custom'),
    then: Joi.array()
      .items(Joi.string())
      .min(1),
    otherwise: Joi.array().optional(),
  }),
  digestDesign: Joi.string().required(),
  digestType: Joi.string().required(),
  emailSubject: Joi.string().allow(''),
  isSchedule: Joi.boolean().required(),
  sendDate: Joi.when('digestType', {
    is: Joi.string().valid('Custom'),
    then: Joi.when('isSchedule', {
      is: Joi.boolean().valid(true),
      then: Joi.date().required(),
      otherwise: Joi.optional(),
    }),
    otherwise: Joi.optional(),
  }),
  status: Joi.string().required(),
  tabUids: Joi.array()
    .items(Joi.string())
    .min(1),
  title: Joi.string().required(),
});

export { CreateDigestSchema };

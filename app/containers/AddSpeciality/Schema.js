import Joi from 'joi';

export const AddSpecialitySchema = Joi.object({
  active: Joi.boolean().optional(),
  content: Joi.object({
    description: Joi.string().allow(''),
    link: Joi.string()
      .uri()
      .allow(''),
    numberOfYearsExperience: Joi.string().allow(''),
    position: Joi.string().allow(''),
    projectCode: Joi.string().allow(''),
    location: Joi.string().allow(''),
    type: Joi.string().allow(''),
  }).optional(),
  dateFrom: Joi.date().allow(''),
  dateTo: Joi.date().allow(''),
  title: Joi.string().required(),
  imageUid: Joi.string().allow(''),
  specialityType: Joi.string().required(),
});

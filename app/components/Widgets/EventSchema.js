import Joi from 'joi';

export const EventSchema = Joi.object({
  uid: Joi.string().optional(),
  eventName: Joi.string().required(),
  location: Joi.string().required(),
  eventLink: Joi.string()
    .uri()
    .required(),
  fromDate: Joi.date().required(),
  toDate: Joi.date().required(),
});

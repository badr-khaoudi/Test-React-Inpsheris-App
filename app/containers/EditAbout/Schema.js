import Joi from 'joi';

const MyProfileSchema = Joi.object({
  telephone: Joi.string().allow(''),
  town: Joi.string().allow(''),
  department: Joi.string().allow(''),
  serviceFilterList: Joi.array()
    .items(Joi.string())
    .min(0),
  positionName: Joi.string().allow(''),
  dateOfBirth: Joi.date().optional(),
  showDateOfBirth: Joi.bool(),
  hobbies: Joi.array()
    .items(Joi.object())
    .min(0),
  hashTag: Joi.array()
    .items(Joi.string())
    .min(0),
  speciality: Joi.string().allow(''),
});

const TextSchema = Joi.string().allow('');
const NumberSchema = Joi.number().optional();
const DateSchema = Joi.date().optional();
const LinkSchema = Joi.string()
  .uri()
  .allow('');

export { MyProfileSchema, TextSchema, NumberSchema, DateSchema, LinkSchema };

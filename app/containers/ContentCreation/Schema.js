import Joi from 'joi';

import {
  HeadingSchema,
  ArticleSchema,
  VideoSchema,
  ImageSchema,
  DocumentSchema,
  LinkSchema,
  EventSchema,
} from 'containers/Paragraph/Schema';

const TopImageSchema = Joi.object({
  largeUrl: Joi.string(),
  topImage: Joi.string(),
  type: Joi.string()
    .required()
    .valid('topImage'),
});

const BottomImageSchema = Joi.object({
  largeUrl: Joi.string(),
  bottomImage: Joi.string(),
  type: Joi.string()
    .required()
    .valid('bottomImage'),
});

export const ContentSchema = Joi.object({
  allowComment: Joi.boolean(),
  authorizeLike: Joi.boolean(),
  authorizeShare: Joi.boolean(),
  blocks: Joi.when('mode', {
    is: Joi.string()
      .exist()
      .valid('Zen Mode'),
    then: Joi.array()
      .items(
        HeadingSchema,
        TopImageSchema,
        BottomImageSchema,
        ArticleSchema,
        VideoSchema,
        ImageSchema,
        DocumentSchema,
        LinkSchema,
        EventSchema,
      )
      .min(4),
  }).when('type', {
    is: Joi.string()
      .exist()
      .valid('event'),
    then: Joi.array()
      .items(EventSchema)
      .min(1),
    otherwise: Joi.array()
      .items(
        HeadingSchema,
        ArticleSchema,
        VideoSchema,
        ImageSchema,
        DocumentSchema,
        LinkSchema,
        EventSchema,
      )
      .min(2),
  }),
  ctyTabUids: Joi.array()
    .items(Joi.string())
    .min(1),
  hashtag: Joi.string().allow(''),
  isOwner: Joi.boolean(),
  isPin: Joi.boolean(),
  isPinOnCommunity: Joi.boolean(),
  displayInCommunityCalendar: Joi.boolean(),
  displayEventOnCommunity: Joi.boolean(),
  displayEventOnHomePage: Joi.boolean(),
  title: Joi.string()
    .allow('')
    .optional(),
  language: Joi.string().optional(),
  newsFeed: Joi.boolean(),
  publicationStartDate: Joi.date(),
  publicationEndDate: Joi.date().min(Joi.ref('publicationStartDate')),
  status: Joi.string().optional(),
  translatedLanguages: Joi.array().items(Joi.string()),
  type: Joi.string().optional(),
  writeForUserUid: Joi.string()
    .allow('')
    .optional(),
  templateUid: Joi.string()
    .allow('')
    .optional(),
  grandArticlePages: Joi.when('type', {
    is: Joi.string()
      .exist()
      .valid('grandArticle'),
    then: Joi.array().min(1),
    otherwise: Joi.array().optional(),
  }),
  mode: Joi.string().optional(),
  uid: Joi.string().optional(),
});

import Joi from 'joi';

import {
  ArticleSchema,
  ImageSchema,
  VideoSchema,
  LinkSchema,
  DocumentSchema,
} from 'containers/Paragraph/Schema';

export const AddDescriptionSchema = Joi.array()
  .items(ArticleSchema, ImageSchema, VideoSchema, LinkSchema, DocumentSchema)
  .min(1);

export const CommunityTabSchema = Joi.object({
  uid: Joi.string().optional(),
  tabName: Joi.string().required(),
  tabType: Joi.string().required(),
  tabSelected: Joi.boolean().required(),
  privated: Joi.boolean().required(),
  tabOrder: Joi.number().required(),
  tabSize: Joi.string().optional(),
  defaultSelected: Joi.boolean().required(),
  authorizeShare: Joi.boolean().required(),
  authorizeComment: Joi.boolean().required(),
  authorizeLike: Joi.boolean().required(),
  descriptionCreationBlocks: Joi.array().optional(),
  displayMode: Joi.string().required(),
  isMicrosoftChannel: Joi.boolean().required(),
  microsoftChannelId: Joi.string().when('isMicrosoftChannel', {
    is: Joi.boolean().valid(true),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  microsoftChannelSharedDocument: Joi.string().when('isMicrosoftChannel', {
    is: Joi.boolean().valid(true),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  documentOnNfs: Joi.boolean().when('tabType', {
    is: Joi.string().valid('collection', 'document'),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  nfsRoot: Joi.string().when('tabType', {
    is: Joi.string().valid('collection', 'document'),
    then: Joi.when('documentOnNfs', {
      is: Joi.boolean().valid(true),
      then: Joi.required(),
      otherwise: Joi.allow(''),
    }),
    otherwise: Joi.optional(),
  }),
  folderGDrive: Joi.string().when('tabType', {
    is: Joi.string().valid('gdrive'),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  keyFile: Joi.string().when('tabType', {
    is: Joi.string().valid('gdrive', 'joboffer'),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  folderSharepoint: Joi.string().when('tabType', {
    is: Joi.string().valid('sharepoint'),
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  translations: Joi.array().optional(),
  searchKeys: Joi.when('tabType', {
    is: Joi.valid('search'),
    then: Joi.array()
      .items(Joi.string())
      .min(1),
    otherwise: Joi.optional(),
  }),
  pinnedTab: Joi.boolean().optional(),
});

export const CreateCommunitySchema = Joi.object({
  communityUid: Joi.string().optional(),
  label: Joi.string().required(),
  groupUid: Joi.string().required(),
  communityType: Joi.string().required(),
  description: Joi.string().allow(''),
  privated: Joi.boolean().required(),
  isPrivateShareable: Joi.boolean(),
  logo: Joi.string().allow(''),
  banner: Joi.string().allow(''),
  isLinkMicrosoftTeam: Joi.boolean().required(),
  microsoftTeamId: Joi.string().when('isLinkMicrosoftTeam', {
    is: Joi.boolean().valid(true),
    then: Joi.required(),
    otherwise: Joi.allow(''),
  }),
  isGplusCommunity: Joi.boolean().required(),
  gplusCommunityLink: Joi.string().when('isGplusCommunity', {
    is: Joi.boolean().valid(true),
    then: Joi.required(),
    otherwise: Joi.allow(''),
  }),
  isAddAutoExternalCalendar: Joi.boolean().required(),
  externalCalendarId: Joi.string().when('isAddAutoExternalCalendar', {
    is: Joi.boolean().valid(false),
    then: Joi.required(),
    otherwise: Joi.allow(''),
  }),
  authorizeShare: Joi.string().required(),
  authorizeComment: Joi.string().required(),
  authorizeLike: Joi.string().required(),
  tabs: Joi.array()
    .items(CommunityTabSchema)
    .min(1),
});

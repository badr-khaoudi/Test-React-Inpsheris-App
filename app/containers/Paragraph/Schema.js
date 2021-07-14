import Joi from 'joi';

export const HeadingSchema = Joi.object({
  uid: Joi.string().optional(),
  title: Joi.string().required(),
  subTitle: Joi.string().allow(''),
  modifiedBlock: Joi.boolean().optional(),
  headerImageColor: Joi.string().optional(),
  imageGridviewSmallThumb: Joi.string().optional(),
  imageGridviewSmallThumbAngle: Joi.number().optional(),
  imageGridviewSmallThumbBackgroundColor: Joi.string().optional(),
  imageGridviewSmallThumbPosX: Joi.number().optional(),
  imageGridviewSmallThumbPosY: Joi.number().optional(),
  imageGridviewThumb: Joi.string().optional(),
  imageGridviewThumbAngle: Joi.number().optional(),
  imageGridviewThumbBackgroundColor: Joi.string().optional(),
  imageGridviewThumbPosX: Joi.number().optional(),
  imageGridviewThumbPosY: Joi.number().optional(),
  imageHeader: Joi.string().optional(),
  imageHeaderAngle: Joi.number().optional(),
  imageHeaderBackgroundColor: Joi.string().optional(),
  imageHeaderPosX: Joi.number().optional(),
  imageHeaderPosY: Joi.number().optional(),
  smallImage: Joi.boolean().optional(),
  type: Joi.string()
    .required()
    .valid('heading'),
});

export const ArticleSchema = Joi.object({
  uid: Joi.string().optional(),
  content: Joi.string().required(),
  modifiedBlock: Joi.boolean().optional(),
  type: Joi.string()
    .required()
    .valid('richText'),
});

export const VideoSchema = Joi.object({
  uid: Joi.string().optional(),
  videos: Joi.array().min(1),
  type: Joi.string()
    .required()
    .valid('videoGallery'),
});

export const ImageSchema = Joi.object({
  uid: Joi.string().optional(),
  images: Joi.array().min(1),
  type: Joi.string()
    .required()
    .valid('ImageGallery'),
});

export const DocumentSchema = Joi.object({
  uid: Joi.string().optional(),
  documents: Joi.array().min(1),
  type: Joi.string()
    .required()
    .valid('documentGallery'),
});

export const LinkSchema = Joi.object({
  uid: Joi.string().optional(),
  links: Joi.array().min(1),
  type: Joi.string()
    .required()
    .valid('linkEmbed'),
});

export const EventSchema = Joi.object({
  uid: Joi.string().optional(),
  conferenceSolutionType: Joi.string().required(),
  content: Joi.string()
    .allow('')
    .optional(),
  dateFrom: Joi.date().required(),
  dateTo: Joi.date()
    .min(Joi.ref('dateFrom'))
    .required(),
  description: Joi.string().allow(''),
  eventSourceType: Joi.string().optional(),
  googleCalendarPersonalInvitationEmails: Joi.when(
    'isSendGoogleCalendarPersonalInvitation',
    {
      is: Joi.boolean().valid(true),
      then: Joi.array()
        .items(Joi.string())
        .min(1),
      otherwise: Joi.array().items(Joi.string()),
    },
  ),
  invitedPeopleUids: Joi.array().items(Joi.string()),
  isActivateDoNotParticipate: Joi.boolean(),
  isAssociateConferenceCall: Joi.boolean(),
  isSendGoogleCalendarInvitation: Joi.boolean(),
  isSendGoogleCalendarPersonalInvitation: Joi.boolean(),
  limitSeatOfEvent: Joi.boolean(),
  location: Joi.string(),
  modifiedBlock: Joi.boolean(),
  participateEventExtension: Joi.boolean(),
  title: Joi.string(),
  totalNumberOfSeat: Joi.number().min(1),
  totalNumberOfWaitingSeat: Joi.when('limitSeatOfEvent', {
    is: Joi.boolean().valid(true),
    then: Joi.number().greater(Joi.ref('totalNumberOfSeat')),
    otherwise: Joi.number().optional(),
  }),
  type: Joi.string()
    .required()
    .valid('event'),
  eventAuthor: Joi.object().optional(),
  isDisplayOnCommunity: Joi.bool().optional(),
  isDisplayOnHomePage: Joi.bool().optional(),
  isEventFullSeats: Joi.bool().optional(),
  isParticipatedEvent: Joi.bool().optional(),
  isStopParticipation: Joi.bool().optional(),
});

export const ParagraphSchema = Joi.object({
  id: Joi.any().optional(),
  sequenceNumber: Joi.number().optional(),
  title: Joi.string()
    .max(110)
    .required(),
  subTitle: Joi.string().required(),
  blocks: Joi.array()
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
});
